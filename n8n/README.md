# n8n Workflows für TheurerTrucks 2GO

## Setup in n8n

### 1. Environment-Variablen setzen

In n8n unter **Settings → Environment Variables** diese Variablen anlegen:

| Variable | Wert |
|---|---|
| `FLEETSTER_EMAIL` | `tt2go-kontakt@theurer-trucks.de` |
| `FLEETSTER_PASSWORD` | (Passwort aus .env) |

### 2. Workflows importieren

1. In n8n auf **Workflows → Import from File** klicken
2. `workflow-static-data.json` importieren
3. `workflow-availability.json` importieren
4. Beide Workflows **aktivieren**

### 3. Webhook-URLs notieren

Nach dem Aktivieren zeigt n8n die Webhook-URLs an:
- **Statische Daten:** `https://DEIN-VPS/webhook/tt2go-data` (GET)
- **Verfügbarkeit:** `https://DEIN-VPS/webhook/tt2go-availability` (POST)

Diese URLs müssen in der `index.html` im `TT2GO_API` Konfigurationsobjekt eingetragen werden.

## Workflow 1: Statische Daten

**Trigger:** GET Webhook `/tt2go-data`
**Zweck:** Liefert Standorte + Zahlen für Karte, Dropdown und Zahlen-Banner
**Cache:** 24h (via Cache-Control Header)

**Ablauf:**
1. Fleetster Login → Token holen
2. Parallel: Locations + Vehicles + Users abrufen
3. Daten formatieren (Standorte mit Koordinaten, Fahrzeuge pro Standort, Gesamtzahlen)
4. JSON zurückgeben

**Response:**
```json
{
  "stations": [
    {
      "id": "61488363b67ef95fb3934229",
      "name": "23816 Leezen - Theurer Trucks 2 Go Hauptstation",
      "city": "Leezen",
      "postcode": "23816",
      "street": "Hamburger Strasse 65",
      "lat": 53.862175,
      "lng": 10.2488051,
      "comment": "",
      "vehicleCount": 3
    }
  ],
  "stats": {
    "vehicles": 87,
    "stations": 58,
    "users": 16484
  },
  "updated": "2026-04-08T12:00:00.000Z"
}
```

## Workflow 2: Verfügbarkeitsprüfung

**Trigger:** POST Webhook `/tt2go-availability`
**Zweck:** Prüft ob am gewählten Standort ein Fahrzeug im Zeitraum frei ist

**Request Body:**
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
  "totalAtStation": 3,
  "stationId": "61488363b67ef95fb3934229",
  "startDate": "2026-04-10T10:00:00.000Z",
  "endDate": "2026-04-11T10:00:00.000Z"
}
```

## Fleetster API Referenz

- **Base URL:** `https://my.fleetster.net`
- **Auth:** `POST /users/auth` mit `{ email, password }` → Top-Level `_id` ist der Token
- **Locations:** `GET /locations` mit Header `Authorization: {token}`
- **Vehicles:** `GET /vehicles` mit Header `Authorization: {token}`
- **Bookings:** `GET /bookings?startDate[$lte]=X&endDate[$gte]=Y` mit Header `Authorization: {token}`
- **Users:** `GET /users?limit=0` mit Header `Authorization: {token}`
- **Swagger:** `https://my.fleetster.net/swagger/`
