# n8n Workflows für TheurerTrucks 2GO

## Übersicht

| Workflow | Trigger | Zweck |
|---|---|---|
| `workflow-static-data.json` | Cron (täglich 6:00) | Standorte + Zahlen → JSON nach GitHub pushen |
| `workflow-availability.json` | POST Webhook | Live-Verfügbarkeitsprüfung |
| `workflow-google-ads-report.json` | POST Webhook (Google Ads Script, So 09:00) | Wochenbericht: Google Ads Rohdaten → Claude → Postgres + Slack |
| `workflow-slack-bot.json` | POST Webhook (Slack Events) | Rückfragen zu Ads-Berichten via @mention oder DM |

## Setup

### 1. Environment-Variablen in docker-compose.yml

```yaml
environment:
  - FLEETSTER_EMAIL=tt2go-kontakt@theurer-trucks.de
  - FLEETSTER_PASSWORD=... (mit $$ statt $ bei Sonderzeichen)
  - GITHUB_TOKEN=ghp_... (GitHub Personal Access Token)
```

### 2. GitHub Personal Access Token erstellen

1. GitHub → Settings → Developer Settings → Personal Access Tokens → Fine-grained tokens
2. "Generate new token"
3. Repository access: **Only select repositories** → `theurer-trucks-2go-webseite`
4. Permissions: **Contents** → Read and Write
5. Token kopieren → als `GITHUB_TOKEN` in docker-compose.yml eintragen
6. n8n neu starten: `cd /docker/n8n && docker compose down && docker compose up -d`

### 3. Workflows importieren

1. In n8n: Workflows → Import from File
2. `workflow-static-data.json` importieren + aktivieren
3. `workflow-availability.json` importieren + aktivieren

## Workflow 1: Statische Daten (täglich → GitHub)

**Ablauf:**
```
Cron 6:00 → Fleetster Login → Token → Standorte → Fahrzeuge → Nutzer
→ JSON formatieren → SHA der bestehenden Datei holen → nach GitHub pushen
```

**Was passiert:**
- n8n holt täglich alle Daten von Fleetster
- Formatiert sie als JSON
- Pusht `api/data.json` ins GitHub Repo
- GitHub Pages aktualisiert sich automatisch
- Das Frontend lädt `api/data.json` beim Seitenaufruf

**Die JSON enthält:**
```json
{
  "stations": [
    { "id": "...", "name": "...", "city": "...", "lat": 53.86, "lng": 10.24, "vehicleCount": 3 }
  ],
  "stats": { "vehicles": 87, "stations": 58, "users": 16484 },
  "updated": "2026-04-08T06:00:00.000Z"
}
```

## Workflow 2: Live-Verfügbarkeit (Webhook)

**Webhook-URL:** `https://n8n.srv1381541.hstgr.cloud/webhook/tt2go-availability`

**Request (POST):**
```json
{
  "stationId": "61488363b67ef95fb3934229",
  "startDate": "2026-04-10T10:00:00.000Z",
  "endDate": "2026-04-11T10:00:00.000Z"
}
```

**Response:**
```json
{
  "available": true,
  "availableCount": 2,
  "totalAtStation": 3
}
```

## Workflow 3: Google Ads Wochenbericht (Sonntag 09:00)

**Webhook-URL:** `https://n8n.srv1381541.hstgr.cloud/webhook/tt2go-ads-report`

**Trigger:** Google Ads Script (`Google_Ads/weekly-report-script.js`) feuert jeden Sonntag 09:00 mit allen Performance-Daten der letzten 7 Tage.

**Ablauf:**
```
Webhook → Prompt aufbereiten → Claude API → Postgres INSERT (ads_reports)
  → Slack-Nachricht formatieren → An Slack senden
```

**Was der Workflow leistet:**
- Claude analysiert die Rohdaten und erstellt einen Mobile-first-Wochenbericht (max 1500 Zeichen, Slack-formatiert)
- Kompletter Raw-Datensatz + KI-Bericht werden in Postgres (`ads_reports` Tabelle) archiviert — für historische Vergleiche und Rückfragen via Bot
- Bericht wird per Incoming Webhook in den Slack-Channel gepostet

**Idempotenz:** `ON CONFLICT (platform, week_start) DO UPDATE` — doppelte Runs überschreiben dieselbe Woche statt zu duplizieren.

## Workflow 4: Slack-Bot (Rückfragen zu Ads-Berichten)

**Webhook-URL:** `https://n8n.srv1381541.hstgr.cloud/webhook/tt2go-slack-events`
(in Slack App → Event Subscriptions eingetragen)

**Trigger:** Slack Events API — `app_mention` (Bot im Channel @mentioned) oder `message.im` (DM an Bot).

**Ablauf:**
```
Slack Event (POST) → Signatur-Verifikation (HMAC-SHA256)
  → Event-Klassifikation (url_verification / ignore / process)
  → 200 OK zurück (Slack 3s-Regel)
  → Thread-History + Whitelist-Check
  → Postgres SELECT (letzte 8 Reports pro Plattform via UNION ALL)
  → Prompt bauen (Multi-Plattform Kontext)
  → Claude API (Sonnet 4.6)
  → Slack chat.postMessage (Thread bei Channel, flat bei DM)
```

**Error-Pfade:**
- Invalid Signature → 401
- User nicht in Whitelist → ":no_entry: Sorry, dafür bin ich nicht berechtigt"
- Postgres-Fehler → ":rotating_light: Datenbank gerade nicht erreichbar"
- DB leer → ":warning: Noch keine Reports in der DB"
- Claude-Fehler → Fehler-Text im Slack-Post

**Benötigte ENV-Variablen (in docker-compose.yml für n8n):**
```
SLACK_SIGNING_SECRET=...          # aus Slack App → Basic Information
SLACK_BOT_TOKEN=xoxb-...          # aus Slack App → Install App
SLACK_ALLOWED_USERS=U07XXXXX      # comma-separated Whitelist
NODE_FUNCTION_ALLOW_BUILTIN=crypto # Task-Runner darf crypto-Modul nutzen
```

Die Vars müssen auch in `N8N_RESTRICT_ENVIRONMENT_VARIABLES` aufgelistet sein (Whitelist), sonst sind sie in Nodes nicht lesbar.

**Mobile-first Output:** Sowohl Wochenbericht als auch Bot-Antworten nutzen strenge Slack-Markdown-Regeln (keine Tabellen, keine `##` Headings, keine `**fett**`, nur `*fett*` und `• Bullets`), max ~1500 Zeichen.

**Multi-Plattform:** Schema + Bot sind bereits auf Meta Ads vorbereitet. Wenn Meta-Ads-Workflow ergänzt wird (analog zu Google Ads mit `platform='meta_ads'`), zieht der Bot Meta-Reports automatisch mit in seine Antworten — keine Bot-Code-Änderungen nötig.

## Postgres (ads_reports Tabelle)

Setup: siehe `postgres/README.md`

| Feld | Typ | Zweck |
|---|---|---|
| `platform` | VARCHAR(50) | `google_ads` \| `meta_ads` |
| `week_start`, `week_end` | DATE | Berichtszeitraum |
| `raw_data` | JSONB | Komplette Script-Rohdaten |
| `ai_report` | TEXT | Claude-generierter Bericht |
| `created_at` | TIMESTAMPTZ | Insert-Zeitpunkt |

Unique: `(platform, week_start)` — idempotent.

## Fleetster API Referenz

- **Base URL:** `https://my.fleetster.net`
- **Auth:** `POST /users/auth` → Top-Level `_id` ist der Token (UUID)
- **Locations:** `GET /locations` mit Header `Authorization: {token}`
- **Vehicles:** `GET /vehicles` mit Header `Authorization: {token}`
- **Bookings:** `GET /bookings?startDate[$lte]=X&endDate[$gte]=Y`
- **Users:** `GET /users?limit=0`
- **Swagger:** `https://my.fleetster.net/swagger/`
