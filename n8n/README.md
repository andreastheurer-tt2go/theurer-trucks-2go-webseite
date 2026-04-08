# n8n Workflows für TheurerTrucks 2GO

## Übersicht

| Workflow | Trigger | Zweck |
|---|---|---|
| `workflow-static-data.json` | Cron (täglich 6:00) | Standorte + Zahlen → JSON nach GitHub pushen |
| `workflow-availability.json` | POST Webhook | Live-Verfügbarkeitsprüfung |

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

## Fleetster API Referenz

- **Base URL:** `https://my.fleetster.net`
- **Auth:** `POST /users/auth` → Top-Level `_id` ist der Token (UUID)
- **Locations:** `GET /locations` mit Header `Authorization: {token}`
- **Vehicles:** `GET /vehicles` mit Header `Authorization: {token}`
- **Bookings:** `GET /bookings?startDate[$lte]=X&endDate[$gte]=Y`
- **Users:** `GET /users?limit=0`
- **Swagger:** `https://my.fleetster.net/swagger/`
