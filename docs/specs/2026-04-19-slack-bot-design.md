# Design: Slack-Bot für Rückfragen zu Ads-Wochenberichten

**Datum:** 2026-04-19
**Status:** Design genehmigt, bereit für Implementation-Plan
**Autor:** Andreas Theurer + Claude

---

## 1. Problem & Ziel

**Problem:** Der automatische KI-Wochenbericht (Google Ads → n8n → Claude → Slack, jeden Sonntag 09:00) liefert kompakte Analysen, aber keine Möglichkeit für Rückfragen. Wenn der Bericht z.B. "Impression Share fällt wegen Budget" erwähnt, muss Andreas manuell recherchieren oder in Google Ads nachschauen.

**Ziel:** Ein Slack-Bot, der Rückfragen zum Wochenbericht (und später auch Meta Ads) im Thread oder per DM beantwortet, mit Zugriff auf die historischen Reports der letzten Wochen.

**Nicht-Ziel (V1):** Live-Zugriff auf die Google Ads API für Ad-hoc-Queries. Das würde Developer-Token-Approval und OAuth-Setup erfordern (1-3 Tage Wartezeit, Prompt-Injection-Risiken). Stattdessen reicht der Zugriff auf die wöchentlich gespeicherten Report-Daten.

---

## 2. User Stories

1. **Rückfrage im Thread:** Als Andreas möchte ich im Thread des Wochenberichts @mentionen können, um Detail-Rückfragen zu stellen ("Warum waren die Kosten bei Pferdeanhänger so hoch?"), damit ich Kontext direkt bekomme ohne Google-Ads-UI zu öffnen.

2. **Ad-hoc-Fragen per DM:** Als Andreas möchte ich dem Bot eine DM schicken können ("Wie war Brand die letzten 4 Wochen?"), damit ich unabhängig vom letzten Report Fragen stellen kann.

3. **Historische Vergleiche:** Als Andreas möchte ich fragen können "Entwickelt sich Brand besser als Pferdetransporter?", und der Bot soll über mehrere Wochen hinweg reasonen.

4. **Multi-Plattform (später):** Wenn Meta Ads eingerichtet ist, möchte ich dieselben Fragen für Meta stellen können, ohne den Bot-Code zu ändern.

5. **Conversational Memory:** Im selben Thread soll der Bot an vorherige Fragen/Antworten erinnern ("Und bei Desktop?" nach einer Mobile-Frage).

---

## 3. Scope

**In Scope (V1):**
- Postgres-Datenbank auf Hostinger VPS (neuer Docker-Container)
- Bestehender Google-Ads-Wochenbericht-Workflow schreibt Raw-Data + KI-Bericht zusätzlich in Postgres
- Neuer n8n-Workflow für Slack-Events (app_mention + message.im)
- Slack-App erweitert (Bot Token, Event Subscriptions, neue Scopes)
- Bot lädt die letzten 8 Reports pro Plattform beim Beantworten (Option 1 aus Brainstorming)
- User-Whitelist (nur Andreas darf fragen)
- Slack Signature Verification

**Out of Scope (V1):**
- Meta-Ads-Wochenbericht-Workflow (wird separat gebaut, Schema ist aber bereits vorbereitet)
- Tool-Calling für gezielte DB-Queries (Option 2 aus Brainstorming) — erst V2 falls nötig
- Multi-User-Support über Andreas hinaus
- Admin-Commands (Reports löschen, Cache leeren etc.)
- Nutzungs-Analytics / Metriken zum Bot selbst

---

## 4. Architektur

### 4.1 Übersicht

```
┌─────────────────────────────────────────────────────────────┐
│ Bestehender Flow (Wochenbericht, Sonntag 09:00 — angepasst) │
│                                                             │
│  Google Ads Script                                          │
│       │                                                     │
│       ▼                                                     │
│  n8n Workflow                                               │
│       ├─ Prompt aufbereiten                                 │
│       ├─ Claude API (Sonnet 4.6) → KI-Bericht               │
│       ├─ NEU: Postgres INSERT (raw_data + ai_report)        │
│       └─ Slack chat.postMessage (Incoming Webhook)          │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Neuer Flow (Rückfragen, ad-hoc)                             │
│                                                             │
│  User @mention oder DM                                      │
│       │                                                     │
│       ▼                                                     │
│  Slack Event (HTTP POST)                                    │
│       │                                                     │
│       ▼                                                     │
│  n8n Webhook `tt2go-slack-events`                           │
│       ├─ Signature verifizieren (HMAC-SHA256)               │
│       ├─ Sofort 200 OK zurück (< 3s)                        │
│       ├─ URL-Verification Challenge handhaben               │
│       ├─ User-Whitelist prüfen                              │
│       ├─ Thread-History holen (falls im Thread)             │
│       ├─ Postgres SELECT: letzte 16 Reports                 │
│       │   (8 pro Plattform × 2 Plattformen)                 │
│       ├─ Prompt zusammenbauen                               │
│       ├─ Claude API (Sonnet 4.6)                            │
│       └─ Slack chat.postMessage (in Thread)                 │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 Stack-Entscheidungen

| Komponente | Wahl | Begründung |
|---|---|---|
| Datenbank | PostgreSQL 16 (Docker-Container auf VPS) | n8n-nativer Support, JSONB für flexible Raw-Data |
| Claude-Modell | Sonnet 4.6 (wie bestehender Workflow) | Ausreichend für Analyse, günstig (~0,06 $/Frage) |
| Access-Pattern | Bot lädt N Reports automatisch (Option 1) | Einfacher Code, negligible Kosten bei Solo-Nutzung |
| Slack-App | Bestehende App erweitern | Keine zweite App nötig |
| Authentifizierung | Slack Signature + User-Whitelist | Solo-User, simple Liste reicht |
| Hosting | Bestehende Hostinger-VPS (Traefik + Docker) | Keine neue Infrastruktur |

---

## 5. Datenbank-Schema

**Ein Tabelle für alle Plattformen:**

```sql
CREATE TABLE ads_reports (
  id              SERIAL PRIMARY KEY,
  platform        VARCHAR(50)  NOT NULL,
  week_start      DATE         NOT NULL,
  week_end        DATE         NOT NULL,
  raw_data        JSONB        NOT NULL,
  ai_report       TEXT         NOT NULL,
  slack_message_ts VARCHAR(50),
  created_at      TIMESTAMPTZ  DEFAULT NOW(),
  UNIQUE(platform, week_start)
);

CREATE INDEX idx_platform_week ON ads_reports(platform, week_start DESC);
```

**Erläuterungen:**

| Feld | Zweck |
|---|---|
| `platform` | Diskriminator: `'google_ads'` oder `'meta_ads'` |
| `week_start` / `week_end` | Berichtszeitraum (nicht `created_at`, da Reports rückwirkend möglich) |
| `raw_data` (JSONB) | Komplette Daten vom Google-Ads-Script (10 Datenpunkte). JSONB erlaubt künftig Filter/Index auf einzelnen Feldern falls nötig. |
| `ai_report` | Der von Claude generierte Wochenbericht (Markdown für Slack) |
| `slack_message_ts` | Optional: ts des ursprünglichen Slack-Posts (für spätere Verlinkung) |
| `UNIQUE(platform, week_start)` | Verhindert Duplikate bei doppelten Workflow-Runs |

**Volumen:**
- ~200 KB pro Wochen-Report
- ~10 MB/Jahr pro Plattform
- Kein Retention-Limit in V1 (Daten sind klein, behalten wir alle)

---

## 6. Slack-App Konfiguration

### 6.1 Bestehende App erweitern
**App-Name:** `TT2GO Google Ads Report` → Umbenennen in `TT2GO Report Bot`

### 6.2 OAuth Scopes (Bot Token Scopes)

| Scope | Zweck |
|---|---|
| `app_mentions:read` | Events empfangen wenn Bot @mentioned wird |
| `chat:write` | Antworten im Thread/Channel posten |
| `channels:history` | Thread-History aus Public Channels lesen |
| `groups:history` | Thread-History aus Private Channels lesen |
| `im:history` | DM-History lesen |
| `im:write` | Auf DMs antworten |
| `incoming-webhook` | (bestehend — Wochenbericht) |

### 6.3 Event Subscriptions

**Request URL:** `https://n8n.srv1381541.hstgr.cloud/webhook/tt2go-slack-events`

**Subscribed Bot Events:**
| Event | Trigger |
|---|---|
| `app_mention` | Bot wird irgendwo @mentioned |
| `message.im` | Jemand schreibt dem Bot direkt |

### 6.4 Re-Installation
Nach Scope-Änderungen muss die App neu im Workspace installiert werden, um neuen Bot-Token zu bekommen.

---

## 7. Workflow-Details

### 7.1 Bestehender Workflow — Erweiterung

**Datei:** `n8n/workflow-google-ads-report.json`

**Änderung:** Nach dem Node "Claude API Analyse" wird ein neuer Postgres-Node eingefügt, **bevor** die Nachricht an Slack geschickt wird.

```
[Google Ads Daten empfangen]
         ↓
[Prompt aufbereiten]
         ↓
[Claude API Analyse]
         ↓
[NEU: Postgres INSERT ads_reports]
         ↓
[Slack Nachricht formatieren]
         ↓
[An Slack senden]
```

**Postgres-Node Config:**
- Operation: `Insert`
- Table: `ads_reports`
- Columns:
  - `platform`: `'google_ads'` (hartcodiert)
  - `week_start`: aus Script-Daten (`dateRange.start`)
  - `week_end`: aus Script-Daten (`dateRange.end`)
  - `raw_data`: kompletter Input-JSON
  - `ai_report`: Claude-Output-Text
- Bei Conflict auf `(platform, week_start)`: `DO UPDATE SET ai_report = EXCLUDED.ai_report, raw_data = EXCLUDED.raw_data` (Idempotenz)

### 7.2 Neuer Workflow — Rückfragen

**Datei:** `n8n/workflow-slack-bot.json`

**Nodes (in Reihenfolge):**

1. **Webhook Trigger**
   - Path: `tt2go-slack-events`
   - Method: POST
   - Response Mode: `responseNode` (manuelle Antwort, damit wir zuerst die URL-Verification handhaben können)

2. **Code: Signature Verification**
   - Headers: `x-slack-signature`, `x-slack-request-timestamp`
   - Body: raw body
   - HMAC-SHA256(signing_secret, `v0:${timestamp}:${body}`) vergleichen mit Signature
   - Bei Fail: `{ statusCode: 401 }` → Response-Node → Workflow-Ende

3. **Code: Event-Typ prüfen**
   - `body.type === 'url_verification'` → Challenge zurück, Ende
   - `body.event.bot_id` gesetzt → Bot-eigene Nachricht, ignorieren
   - `body.event.type === 'app_mention'` oder `message` (im) → weiter

4. **Response-Node: 200 OK sofort zurück** (Slack-3s-Regel)

5. **Code: User-Whitelist prüfen**
   - `body.event.user` in `SLACK_ALLOWED_USERS` (ENV, comma-separated)?
   - Nein → Slack-Post: "Sorry, dafür bin ich nicht berechtigt" → Ende

6. **HTTP: Thread-History holen (bedingt)**
   - Nur wenn `body.event.thread_ts` existiert
   - Slack API: `GET conversations.replies?channel={channel}&ts={thread_ts}&limit=50`
   - Auth: `Bearer ${SLACK_BOT_TOKEN}`

7. **Postgres SELECT: Letzte 8 Reports pro Plattform laden**
   ```sql
   (SELECT platform, week_start, week_end, raw_data, ai_report
      FROM ads_reports
      WHERE platform = 'google_ads'
      ORDER BY week_start DESC
      LIMIT 8)
   UNION ALL
   (SELECT platform, week_start, week_end, raw_data, ai_report
      FROM ads_reports
      WHERE platform = 'meta_ads'
      ORDER BY week_start DESC
      LIMIT 8);
   ```
   Grund für UNION ALL statt einfachem `LIMIT 16`: garantiert pro Plattform bis zu 8 Reports, auch wenn eine Plattform deutlich mehr Reports hat als die andere.

8. **Code: Prompt zusammenbauen**
   - System-Prompt (TT2GO-Kontext, verfügbare Plattformen, Anweisung zur Slack-Markdown-Formatierung)
   - Raw-Data und AI-Reports chronologisch in den User-Prompt
   - Thread-History (falls vorhanden) als vorherige Konversation
   - Aktuelle Frage (mit @mention entfernt)

9. **HTTP: Claude API**
   - POST `https://api.anthropic.com/v1/messages`
   - Model: `claude-sonnet-4-6`
   - `max_tokens: 4096`
   - Auth: Header-Auth-Credential "Anthropic API Key" (bestehend)

10. **HTTP: Slack chat.postMessage**
    - POST `https://slack.com/api/chat.postMessage`
    - Auth: `Bearer ${SLACK_BOT_TOKEN}`
    - Body: `{ channel: event.channel, thread_ts: event.thread_ts || event.ts, text: claude_response }`

### 7.3 Prompt-Struktur (für neuen Workflow)

**System-Prompt (skizziert):**
```
Du bist ein Performance-Marketing-Analyst für TheurerTrucks 2GO
(Car-Sharing für Pferdetransporter in Deutschland).

Verfügbare Plattformen:
- Google Ads: aktiv seit [erstes week_start]
- Meta Ads: [nicht aktiv / aktiv seit ...]

Du bekommst die letzten 8 Wochen-Reports pro Plattform (raw_data + KI-Bericht)
sowie die aktuelle Frage des Users.

Antworte:
- Auf Deutsch
- Formatiere für Slack (Slack-Markdown: *fett*, _kursiv_, • Bullets)
- Max 2000 Zeichen
- Konkret und actionable, nicht generisch
- Wenn die Daten für die Frage nicht ausreichen: klar sagen
```

---

## 8. Security & Fehlerbehandlung

### 8.1 Secrets (alle in n8n als ENV, nichts im Git)
- `POSTGRES_HOST`, `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`
- `SLACK_SIGNING_SECRET`
- `SLACK_BOT_TOKEN`
- `SLACK_ALLOWED_USERS` (comma-separated User-IDs, z.B. `U07XXX123`)
- `ANTHROPIC_API_KEY` (bestehend)

### 8.2 Angriffsflächen & Abwehr

| Szenario | Schutz |
|---|---|
| Jemand simuliert Slack-Events auf den Webhook | Signature-Verification (HMAC) |
| Jemand in Slack @mentioned Bot ohne Berechtigung | User-Whitelist |
| Postgres von außen erreichbar | Container-Port nicht gepublished, nur im Docker-Network |
| Prompt Injection via User-Frage | System-Prompt mit klaren Boundaries, keine SQL-Execution durch Claude |
| Bot antwortet auf eigene Nachrichten (Loop) | `body.event.bot_id` Check |

### 8.3 Fehler-Responses

| Fehlerfall | Bot-Verhalten |
|---|---|
| User nicht in Whitelist | Slack-Post: "Sorry, dafür bin ich nicht berechtigt" |
| Postgres nicht erreichbar | Slack-Post: "Datenbank gerade nicht erreichbar, versuch es gleich nochmal" |
| Claude API Timeout (>60s) | Slack-Post: "Claude hat gerade Zeitprobleme, versuch es nochmal" |
| Claude API Fehler | Slack-Post: "Fehler bei der Analyse: [error message]" |
| Keine Reports in DB | Slack-Post: "Noch keine Reports gespeichert. Erster kommt Sonntag 09:00" |
| Slack Signature ungültig | HTTP 401, kein Slack-Post |
| Bot-eigene Nachricht (Echo) | Silent ignore |

---

## 9. Rollout-Plan

1. **Postgres-Container aufsetzen** (Hostinger-VPS)
   - docker-compose.yml erweitern (neuer Service `postgres`)
   - Volume für Persistenz
   - Im Docker-Network, kein Port-Publishing
   - Schema anlegen (ads_reports)

2. **Bestehender Workflow erweitern**
   - Postgres-Node einfügen
   - Postgres-Credential in n8n anlegen
   - Mit manuellem Trigger testen → Datensatz prüfen

3. **Slack-App erweitern**
   - Scopes hinzufügen (siehe 6.2)
   - Event Subscriptions konfigurieren (6.3)
   - App re-installieren → Bot-Token kopieren

4. **Neuer Rückfragen-Workflow in n8n**
   - Workflow nach Design 7.2 bauen
   - Event Subscriptions URL verifizieren (einmaliger Challenge-Response)
   - ENV-Variablen setzen

5. **Testing (manuell)**
   - @mention im Report-Thread — erwartet: Bot antwortet im Thread
   - DM an Bot — erwartet: Bot antwortet in DM
   - @mention von anderem User (nicht Whitelist) — erwartet: Berechtigungs-Hinweis
   - Frage ohne DB-Inhalt — erwartet: freundlicher Hinweis
   - Historische Vergleichsfrage — erwartet: Claude nutzt ältere Reports

6. **Dokumentation**
   - CLAUDE.md: Abschnitt "Slack Bot" mit Architektur + Commands
   - n8n/README.md: neuer Workflow beschreiben
   - Neue ENV-Variablen in `.env.example` dokumentieren (ohne Werte)

7. **Go Live**
   - Nächsten Sonntag Wochenbericht beobachten (→ DB-Insert funktioniert?)
   - Erste Rückfragen stellen (Thread + DM)

---

## 10. Offene Punkte / V2

Nicht Teil dieser Iteration, für später notiert:

- **Meta-Ads-Wochenbericht-Workflow:** Separates Projekt wenn Meta Ads live geht. Bot-Code unverändert, weil multi-plattform im Schema vorgesehen.
- **Tool-Calling (Option 2):** Falls Bot-Nutzung sehr hoch wird, auf gezielte DB-Queries umstellen, um Kosten zu senken.
- **Live-Zugriff auf Google Ads API:** Falls Fragen zu intra-day Performance aufkommen. Erfordert Developer-Token-Approval.
- **Backup-Strategie für Postgres:** Täglicher Dump auf separates Volume oder GitHub. Sinnvoll sobald >3 Monate Daten drin.
- **Bot-Nutzungsstatistik:** Zählt Fragen/Woche, beliebteste Themen — für späteres Tuning.
