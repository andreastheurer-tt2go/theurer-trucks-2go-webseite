# DETAILS.md

Ergänzende Details zur TheurerTrucks 2GO Webseite — alles was nicht in CLAUDE.md passt.

## Zielgruppe (Kundenavatar "Julia")

Basierend auf `Kundenavatar/TT2Go _ Kundenavatar - Google Docs.pdf`:

- **Name:** Julia (166x in Nutzerliste)
- **Geschlecht:** 90% weiblich
- **Alter:** Durchschnitt 37
- **Wohnort:** Stadt
- **Bildung:** Gut (Abitur, Studium)
- **Beziehungsstatus:** In einer Beziehung
- **Meilenstein:** Eigenes Pferd
- **Interessen:** Pferde, Reiten, Turniere, Hunde, Natur

### Ängste und Bedenken

- Angst vor Verletzungen des Pferdes beim Transport
- Verladeprobleme ("Was wenn mein Pferd nicht verladen wird?")
- Kein Anhängerführerschein / kein Zugfahrzeug
- Unerfahrenheit im Pferdetransport
- Stress bei Mensch und Tier
- Kaputter/nicht verfügbarer Anhänger
- Streit beim Leihen im Freundeskreis

### Kernwünsche

- Entspannt mit dem Pferd verreisen
- Sicher ans Ziel kommen
- Erfolg auf dem Turnier
- Spass bei Ausflug oder Reise

### Sprache

- "TheurerTruck" als Synonym für den kleinen Transporter
- Normale Sprache, nicht zu abgehoben
- "du"-Form durchgängig

### Was sie gut findet (Pro)

- Einfachheit der Miete/Abholung
- Verfügbarkeit deutschlandweit und 24/7
- Pferde können viel entspannter transportiert werden
- Tolle Fahrzeuge

### Was sie kritisiert (Contra)

- Nächste Station manchmal zu weit entfernt
- Maximal ein Pferd transportierbar (Zuladung ~950kg)

## Wettbewerb

- TheurerTrucks 2GO ist der **einzige** Carsharing-Anbieter für Pferdetransporter
- Konkurrenz: herkömmlicher Pferdeanhänger (Kauf/Miete), klassische Vermietung, Transportunternehmen
- Vorteil: Kein eigener Anhänger nötig, kein Zugfahrzeug, kein BE-Führerschein, kein TÜV-Stress

## Conversion-Strategie

### Empathie-Hybrid-Ansatz

Die Seite kombiniert emotionalen Einstieg mit starkem Produkt-Showcase:
1. Empathischer Hook (Vertrauens-Sektion mit echten Zitaten aus dem Kundenavatar)
2. Starker Produkt-Showcase (Infografik, Fahrzeug-Galerie)
3. Mehrere CTAs entlang des Scroll-Funnels

### CTA-Positionen (alle → weiterleitung-registrierung.html → fleetster)

| Position | GTM-Label | Zweck |
|---|---|---|
| Navbar | `navbar` | Dauerhaft sichtbar |
| Hero | `hero_cta` | Fängt Entschlossene sofort |
| Vorteile-Showcase | `video_cta` | Nach emotionalem Höhepunkt |
| Standortkarte | scrollt zu #verfuegbarkeit | Standort gefunden = Verfügbarkeit prüfen |
| CTA-Band | `final_cta` | Letzter Push am Ende |
| Sticky Mobile | `mobile_sticky` | Immer sichtbar auf Mobile |
| Fahrt-Rechner | `trip_calculator` | Nach Preisberechnung |
| Preiskarten | `preise_tag/wochenende/woche` | Direkt bei den Preisen |

### Conversion-Funnel (2-stufig)

1. **Soft-Conversion:** CTA-Klick → `weiterleitung-registrierung.html` → GTM Event `generate_lead` → 3s Countdown → Redirect zu fleetster
2. **Finale Conversion:** Nach Registrierung bei fleetster → Redirect zu `registrierung-erfolgreich.html` → GTM Event `sign_up`

In GTM konfigurieren:
- Trigger auf `generate_lead` → Meta Pixel "Lead", Google Ads "Klick-Conversion"
- Trigger auf `sign_up` → Meta Pixel "CompleteRegistration", Google Ads "Registrierungs-Conversion"

### Tracking-Hinweise

- Facebook-Lead-Qualität ist schlechter als Google, Google lässt sich nicht weiter skalieren
- Scroll-Depth und CTA-Performance über GTM konfigurierbar
- Jeder CTA hat ein eindeutiges `cta_location` Label für A/B-Analyse

## Fahrzeug-Details (STX Pferdetransporter)

### Bestätigte Features (auf der Seite verwenden)

- Rückfahr- und Pferdeüberwachungskamera
- LED-Beleuchtung
- Dachluke mit Ventilator
- Komfortable Federung (NICHT Luftfederung!)
- Rutschfester Softgummiboden
- Hengstausstattung mit hoher Trennwand
- Sattelkammer mit Haltern für Sättel & Trensen
- 3 Sitzplätze (NICHT 5!)
- Klimaanlage + Navi
- Anhängerkupplung (2.500 kg)
- Unter 3,5t → Führerschein Klasse B

### NICHT behaupten

- ~~Luftfederung~~ → "komfortable Federung"
- ~~5 Sitzplätze~~ → 3 Sitzplätze
- ~~Vollgetankt~~ → Dieselkosten trägt der Mieter
- ~~Keine 80 km/h Beschränkung~~ → wurde entfernt
- ~~1 Großpferd oder 2 kleinere~~ → aus Fahrzeug-Specs entfernt (bleibt nur im FAQ)

## Preise — Vollständige Tarifstruktur

### Tarife (Stand 15.01.2024)

| Tarif | Preis (brutto) | Freikilometer |
|---|---|---|
| 1 Tag (24h) | 165,00 € | 150 km |
| 2 Tage (48h) | 324,00 € | 300 km |
| 3 Tage (72h) | 466,00 € | 450 km |
| 4 Tage (96h) | 590,00 € | 600 km |
| 5 Tage (120h) | 698,00 € | 750 km |
| 6 Tage (144h) | 788,00 € | 900 km |
| 7 Tage / Woche (168h) | 860,00 € | 1.050 km |

Längere Mietzeiträume nach Rücksprache möglich.

### Sonstige Kosten & Gebühren

| Position | Kosten |
|---|---|
| Mehrkilometer | 0,46 €/km |
| Verspätungen ab 1h | voller Tagespreis |
| Stornierung bis 72h vor Mietbeginn | kostenfrei |
| Stornierung < 72h vor Mietbeginn | ½ Mietpreis |
| Langzeitmiete Storno > 7 Tage vorher | kostenfrei |
| Langzeitmiete Storno < 7 Tage vorher | 50% |
| Ablauf ohne Stornierung | voller Mietpreis |
| Reinigungspauschale | 100,00 € |
| Verkehrsverstöße Bearbeitung | 15,00 € |
| Lastschrift-Rückläufer | Bank-Konditionen + 10 € |
| Mahngebühren pro Mahnung | 5,00 € |
| Schadensabwicklung | 100,00 € |
| Selbstbeteiligung Teilkasko | 150,00 € |
| Selbstbeteiligung Vollkasko | 1.000,00 € |

### Fahrt-Rechner Logik

Der Fahrt-Rechner auf der Webseite berechnet:
1. Nutzer gibt Gesamtstrecke ein (km, Default: 150)
2. Nutzer wählt Tage (1-7)
3. Wenn Gesamtstrecke > Freikilometer: Mehrkilometer × 0,46 € = Aufpreis
4. Gesamtkosten = Tarif + Aufpreis
5. Hinweis unter Tagesauswahl: "Längere Buchungszeiträume auf Anfrage möglich — info@theurer-trucks-2go.de"

## JavaScript-Funktionen

| Funktion | Zweck |
|---|---|
| Navbar scroll toggle | `.scrolled` Klasse ab 60px |
| Mobile menu | Burger-Toggle, Escape-Handler |
| `setMinDates()` | Datum-Validierung für Verfügbarkeitsprüfung |
| `checkAvailability()` | Verfügbarkeits-Stub mit Loading-Spinner |
| `switchImage()` / `startGalleryAutoplay()` | Fahrzeug-Bildergalerie, 5s Auto-Rotate |
| `toggleFaq()` | FAQ-Akkordeon (nur eins gleichzeitig offen) |
| `searchLocation()` | PLZ → Nominatim Geocoding → Karte zoomt + nächster Marker |
| `selectTripDay()` / `updateTripCalc()` | Fahrt-Rechner |
| Counter-Animation | IntersectionObserver, Zahlen zählen hoch |
| Hotspot Touch-Support | Tap öffnet/schließt Tooltips (falls reaktiviert) |
| Scroll-Reveal | IntersectionObserver auf `.reveal` Elemente |

## Responsive Breakpoints

| Breakpoint | Zielgerät | Hauptänderungen |
|---|---|---|
| Basis (< 769px) | Mobile | 1 Spalte, gestapelt, Burger-Menü, Sticky CTA |
| `min-width: 769px` | Tablet | 2 Spalten, Buttons nebeneinander |
| `min-width: 1025px` | Desktop | Volle Layouts, Desktop-Nav, kein Sticky CTA |

## Schema.org Structured Data

Im `<head>` als JSON-LD:
- **FAQPage** — 8 SEO-relevante Fragen für Google Rich Snippets
- **Organization** — TheurerTrucks Renting GmbH mit Adresse und Social Links

Noch nicht implementiert (optional):
- LocalBusiness (für Standorte)
- Product (für den STX Pferdetransporter)

## FAQ-Kategorien (31 Fragen)

| Kategorie | Anzahl | Themen |
|---|---|---|
| Buchung & Registrierung | 6 | Ablauf, Registrierung, Führerscheinverifizierung, zweiter Fahrer, Mindestalter |
| Fahrzeug & Ausstattung | 13 | Führerschein, Maße, Zuladung, Anhängelast, Lüfter, Einstreuen, Heunetz, Wasser |
| Während der Fahrt | 8 | Schlüssel, App-Öffnung, Verladen, Seite, Pferdeabteil, Tanken, AdBlue |
| Kosten & Versicherung | 4 | Preise, Versicherung, Selbstbeteiligung, Kaution |
| Rückgabe & Notfälle | 5 | Rückgabe, One-Way, Schadenfall, Notfallnummer, Kontakt |

## Standortkarte → Verfügbarkeitsprüfer Integration

Popup-Links in der Karte zeigen "Verfügbarkeit prüfen" statt "Jetzt buchen". Beim Klick:
1. `selectStation(value)` wird aufgerufen
2. Das Stations-Dropdown im Verfügbarkeitsprüfer wird auf den gewählten Standort gesetzt
3. Seite scrollt smooth zum Verfügbarkeitsprüfer (#verfuegbarkeit)

## Bildoptimierung

| Bild | Vorher | Nachher | Methode |
|---|---|---|---|
| Infografik | 7.200 KB (PNG) | 240 KB (JPG) | Skaliert auf 1200px, Qualität 80% |
| Hero | 900 KB | 826 KB | Skaliert auf 1920px, Qualität 80% |
| Dashboard | 532 KB | 105 KB | Skaliert auf 800px, Qualität 75% |
| STX-Fotos | 140-500 KB | Unverändert | Bereits optimiert (1200px) |
| **img/ Gesamt** | **16 MB** | **8,6 MB** | (inkl. 3,9 MB Video) |

Alle Bilder haben SEO-optimierte Alt-Texte mit Keywords.

## Design-Entscheidungen aus den Sessions

1. **Statisches Hero-Bild statt Video-Loop** — bessere Performance + Mobile-freundlicher
2. **Stilles MP4-Video in Vertrauens-Sektion** — links neben den Karten im Hochformat, unterstützt die empathische Botschaft visuell
3. **Infografik-Bild statt interaktiver Hotspots** — Hotspot-Version wurde getestet und verworfen, statisches Bild wirkt besser
4. **Fahrt-Rechner statt Tarif-Rechner** — Gesamtstrecke eingeben statt einfache Strecke, spricht Julias Sprache
5. **Zahlen-Banner mit blauem Gradient** — als optische Trennung zwischen Sektionen
6. **5 statt 4 Schritte** — "App downloaden" als eigener Schritt hinzugefügt
7. **Trustpilot-Sterne im Hero** — Glasmorphismus-Pill, klickbar → scrollt zu Bewertungen
8. **Trustpilot direkt vor Preisen** — Social Proof vor der Preis-Entscheidung
9. **Standorte direkt nach Preisen** — Preis gesehen → nächsten Standort finden
10. **Erklärvideo in So-geht's integriert** — keine eigene Sektion mehr, unter den 5 Schritten
11. **2-stufiger Conversion-Funnel** — Interstitial-Seite für Soft-Conversion-Tracking
12. **Trustpilot Mobile-Höhe begrenzt** — 480px max-height verhindert endloses Scrollen
13. **Footer-Logo weiß invertiert** — `filter: brightness(0) invert(1)` für Sichtbarkeit auf dunklem Hintergrund
14. **Vertrauens-Karte 4 geändert** — "Lohnt sich ein Anhänger?" → "Wie schnell bekomme ich ein Fahrzeug?" (24/7 Verfügbarkeit)

## Fleetster-API-Integration (Live)

Architektur: **n8n auf Hostinger VPS** (Docker + Traefik) statt Cloudflare Workers — VPS war schon vorhanden (Führerschein-/Bonitätsprüfung).

### Fleetster API Details

- **Base URL:** `https://my.fleetster.net`
- **Auth:** `POST /users/auth` mit `{ email, password }` → Top-Level `_id` ist der Token (UUID, nicht die User-ID!)
- **Account:** `tt2go-kontakt@theurer-trucks.de` (Credentials in `.env` auf VPS)
- **Swagger:** `https://my.fleetster.net/swagger/` (Spec unter `../swagger.yaml`)

### n8n VPS

- **URL:** `https://n8n.srv1381541.hstgr.cloud`
- **Docker:** n8n + Traefik Container unter `/docker/n8n/`
- **Environment-Variablen:** In `/docker/n8n/.env` (FLEETSTER_EMAIL, FLEETSTER_PASSWORD, GITHUB_TOKEN)
- **Achtung:** `$`-Zeichen in Passwörtern müssen als `$$` escaped werden in Docker `.env`
- **Neustart:** `cd /docker/n8n && docker compose down && docker compose up -d`

### Workflow 1: Standorte → GitHub (Cron)

| Node | Funktion |
|---|---|
| Täglich um 6 Uhr | Cron-Trigger |
| Fleetster Login | Auth-Token holen |
| Token extrahieren | Top-Level `_id` aus Response |
| Standorte abrufen | `GET /locations?deleted=false` |
| JSON formatieren | Standorte mit Koordinaten formatieren, `api/data.json` erzeugen |
| Bestehende Datei SHA holen | GitHub API: SHA der aktuellen data.json (nötig für Update) |
| Push vorbereiten | Content Base64-encoden, SHA mitgeben |
| Nach GitHub pushen | `PUT /repos/.../contents/api/data.json` → committed automatisch |

**Hinweis:** GitHub Token muss direkt in den Nodes eingetragen werden (nicht über `$env` — funktioniert nicht zuverlässig in n8n HTTP-Nodes).

**Output (`api/data.json`):**
```json
{
  "stations": [
    { "id": "61488...", "name": "23816 Leezen - Hauptstation", "city": "Leezen", "postcode": "23816", "lat": 53.86, "lng": 10.24, "comment": "" }
  ],
  "updated": "2026-04-08T06:00:00.000Z"
}
```

### Workflow 2: Verfügbarkeitsprüfung (Webhook)

**URL:** `POST https://n8n.srv1381541.hstgr.cloud/webhook/tt2go-availability`

| Node | Funktion |
|---|---|
| Webhook | POST empfangen (HTTP Method muss auf POST stehen, NICHT `*`) |
| Parameter validieren | stationId, startDate, endDate prüfen |
| Fleetster Login | Auth-Token holen |
| Token + Parameter | Token + Request-Parameter zusammenführen |
| Fahrzeuge am Standort | `GET /vehicles?locationId=X&deleted=false&fields[_id]=1&fields[locationId]=1` |
| Fahrzeuge auswerten | Vehicle-IDs sammeln |
| Buchungen im Zeitraum | `GET /bookings?state=created&state=keyreleased&startDate[$lte]=END&endDate[$gte]=START` |
| Verfügbarkeit berechnen | Fahrzeuge minus gebuchte = verfügbar |
| Response senden | JSON zurück an Frontend |

**Request:** `{ "stationId": "61488...", "startDate": "2026-04-10T08:00:00Z", "endDate": "2026-04-10T18:00:00Z" }`
**Response:** `{ "available": true, "availableCount": 2, "totalAtStation": 3 }`

### Technische Erkenntnisse (n8n + Fleetster)

- **Parallele Nodes vermeiden** — n8n gibt Fehler wenn ein nachfolgender Code-Node Daten von parallel laufenden Nodes referenziert. Alle API-Calls sequentiell verketten.
- **`$env` in HTTP-Nodes unzuverlässig** — Environment-Variablen funktionieren in Code-Nodes, aber nicht immer in HTTP-Node Headern. Workaround: Token in Code-Node lesen und als `$json`-Property durchreichen, oder direkt im Node eintragen.
- **Fleetster gibt Arrays als Items zurück** — bei vielen Ergebnissen liefert n8n einzelne Items statt ein Array. Im Code-Node prüfen: `if (length === 1 && Array.isArray(items[0])) items = items[0]`
- **Vehicles-Endpoint ist langsam** — `GET /vehicles` ohne Filter gibt 5000+ Items zurück (inkl. historischer Einträge). Immer `deleted=false` und `fields`-Filter nutzen.
- **Users-Endpoint zu langsam** — 16.000+ Nutzer, Timeout bei Abruf. Nutzer-Zahlen daher manuell pflegen.
- **Webhook HTTP Method `*` nicht supported** in n8n v2.7.5 — explizit `POST` wählen.
- **Docker `.env` Sonderzeichen** — `$` in Passwörtern wird als Variable interpretiert → `$$` verwenden.

### Frontend-Integration

```javascript
var TT2GO_API = {
    dataUrl:  'api/data.json',  // Standorte (aus GitHub, täglich aktualisiert)
    availUrl: 'https://n8n.srv1381541.hstgr.cloud/webhook/tt2go-availability'
};
```

- `loadStationData()` — lädt `api/data.json`, befüllt Karte + Dropdown
- `populateStations()` — erstellt Marker + Dropdown-Options aus API-Daten (nur `s.name`, kein doppelter City-Prefix)
- `checkAvailability()` — POST an n8n Webhook, zeigt Ergebnis
- **Fallback:** Wenn API nicht erreichbar → 5 Demo-Standorte + Stub-Verfügbarkeit

### Archiviert-Filter in Workflows

Beide n8n-Workflows filtern Einträge mit dem Label "Archiviert" aus:

**Fleetster Entity-Labels System:**
- **API-Endpunkt:** `GET https://my.fleetster.net/entitylabels` → Array aller Labels
- **Feld auf Locations/Vehicles:** `extended.EntityLabels.labels` (Array von Label-IDs)
- **Label "Archiviert":** ID `69d64b9011fe02d420b21789`, Farbe `#85015a`
- **Gleiche Struktur wie bei Users** — `extended.EntityLabels.labels` ist einheitlich

**Alle bekannten Entity-Labels (Stand 09.04.2026):**

| Label-ID | Name | Farbe | Kontext |
|---|---|---|---|
| `69d64b9011fe02d420b21789` | Archiviert | #85015a | Standorte/Fahrzeuge ausblenden |
| `66598ad048da8295e6385ef8` | Zusatzinfo vorhanden | #007db6 | Standorte mit Zusatzinfo |
| `65c1debc5bd6fda2a161409c` | Bonität (1-3) | #4ba003 | User: Bonität OK |
| `65c0fa1ca649f1fd7fc7478b` | negative Bonität (3-6) | #f38400 | User: Bonität schlecht |
| `65c0fab1bb85e00a524ae130` | Nichtzahler | #b50d17 | User: offene Rechnungen |
| `69a5fecc32185cdefa9202aa` | Bonitaet unklar | #b50d17 | User: Score 0.0 |
| `69b6acdb4d17f06ac8b0ed8b` | Ausland | #0066cc | User: nicht-deutsche Adresse |
| `69b6d7618ed7ece1603386b0` | Eskalation Führerschein | #f38400 | User: FS-Prüfung offen |
| `66211a316285865070036b02` | Fehlender Personalausweis | #13477b | User |
| `667fa4fd29c30e02f0d429b6` | Stationsbetreiber | #9013fe | User |
| `667be69432ed8db614845a88` | Sommerreifen | #e9009c | Fahrzeug |
| `66bdb7fbf0af4a65dbd62a98` | Bremsen | #474747 | Fahrzeug |
| `66bdb80a1c179d101121f7c9` | TÜV | #e9009c | Fahrzeug |
| `686cfb0f0262e2c81bd665c5` | L2 Hengstausstattung | #91bd6d | Fahrzeug |
| `686cfb3c098fe3e7a43f8116` | L2 Chestbar | #f8e71c | Fahrzeug |
| `686cfb590262e2c81bd66895` | L3 Hengstausstattung | #548c26 | Fahrzeug |

**Filter-Implementierung (Standorte-Workflow):**
```javascript
const LABEL_ARCHIVIERT = '69d64b9011fe02d420b21789';
const labels = (loc.extended && loc.extended.EntityLabels && loc.extended.EntityLabels.labels) || [];
if (labels.includes(LABEL_ARCHIVIERT)) return false;
```

**Verfügbarkeits-Workflow:** Fahrzeuge-Abfrage holt zusätzlich `fields[extended.EntityLabels]=1`, dann gleicher Filter.

### Mobile Hero-Bild

Desktop und Mobile nutzen separate Hintergrundbilder im Hero:
- **Mobile (Basis-CSS):** `img/Mobil_Banner_3.jpg` — Hochformat-Foto mit Transporter im oberen Drittel
- **Desktop (ab 1025px):** `img/truck-front.jpg` — Querformat-Original
- Umschaltung via Media Query in der Desktop-Breakpoint-Regel (`background-image` Override)
- Das Mobile-Bild wurde von Gemini generiert (Outpainting nach unten, mehr Straße)

### Sticky Mobile CTA Logik

Der Sticky-CTA am unteren Bildschirmrand hat besondere Logik:
- **Nur Mobile:** `display: none` ab 1025px (Desktop-Breakpoint)
- **IntersectionObserver:** Blendet CTA aus wenn Hero sichtbar ist (threshold 0.15)
- **Wichtig:** Observer prüft `window.innerWidth < 1025` bevor er `style.display` setzt — sonst überschreibt der Inline-Style die Desktop-Media-Query

### Preiskarten Flexbox-Layout

Die Pricing-Cards nutzen Flexbox für gleichmäßige Button-Ausrichtung:
- `.pricing-card` → `display: flex; flex-direction: column`
- `.pricing-card__list` → `flex-grow: 1` (füllt verfügbaren Platz)
- `.pricing-card .btn` → `margin-top: auto` (klebt am unteren Rand)

### Unterseiten-Footer

Footer auf allen Unterseiten identisch mit Hauptseite:
- Logo: 52px, `filter: brightness(0) invert(1)` (weiß)
- Text: "Car-Sharing für Pferdetransporter — sichere Mobilität für Pferd und Reiter."

### GitHub Token in n8n

Der GitHub Token für den Standorte-Workflow muss **direkt in den n8n-Nodes** eingetragen werden (nicht über `$env.GITHUB_TOKEN`). Bei Token-Erneuerung beide Nodes aktualisieren:
- "Bestehende Datei SHA holen" → Authorization Header
- "Nach GitHub pushen" → Authorization Header

### Verfügbarkeits-Workflow: Nur aktive Fahrzeuge

Die Fahrzeug-Abfrage filtert mit `active=true` direkt in der API-URL. Inaktive Fahrzeuge (z.B. in Leezen 34 Stück, nur 2 aktiv) werden nicht mitgezählt. Der Label-Filter im Code-Node wurde entfernt (redundant).

### n8n Code-Node Einschränkungen

In n8n v2.7.5 Code-Nodes sind folgende Module/Funktionen **nicht verfügbar**:
- `fetch` — nicht definiert
- `require('https')` — "Module 'https' is disallowed"
- `require('http')` — ebenfalls blockiert
- Externe HTTP-Requests nur über separate HTTP-Request Nodes möglich

**Workaround für Geocoding:** Manuelle Koordinaten-Tabelle (`GEO_FALLBACK`) im Code-Node statt API-Calls.

### Enddatum Zeitzonenfix

`new Date().toISOString().slice(0, 16)` konvertiert in UTC — bei deutscher Sommerzeit (UTC+2) sind das 2 Stunden weniger. Fix: Manuelle Formatierung mit `getHours()`/`getMinutes()` (lokale Zeit). JavaScript `setDate(+1)` berücksichtigt Sommer-/Winterzeitumstellung automatisch.

### Domain-Konfiguration

| Domain | Typ | Wo konfiguriert |
|---|---|---|
| `theurer-trucks-2go.de` | Hauptdomain | Strato DNS → A-Record `185.199.108.153`, CNAME www → `andreastheurer-tt2go.github.io` |
| `theurer-trucks-2go.com` | Zweitdomain | GitHub Pages Custom Domain |
| `andreastheurer-tt2go.github.io` | GitHub Pages Default | Automatisch |

**Canonical-URL** zeigt auf `https://www.theurer-trucks-2go.de` (in `index.html` und `sitemap.xml`).

**Wichtig bei Strato:** MX-Records (Google Mail) nicht ändern! Nur A-Record und CNAME für www.

### GTM Setup (Neuer Container)

**Container:** `GTM-KZDXGB75` (ersetzt alten WordPress-Container `GTM-P4D6Z66`)

**Eingebaut auf allen Seiten:**
- `index.html` (Head-Script + noscript-iframe)
- `weiterleitung-registrierung.html`
- `registrierung-erfolgreich.html`
- Unterseiten (impressum, agb, datenschutz) haben noch den alten Container — TODO bei Bedarf aktualisieren

**Trigger (Seitenaufruf-basiert):**

| Trigger | Typ | Bedingung |
|---|---|---|
| Hauptseite besucht | Seitenaufruf | Page Path gleich `/` |
| Weiterleitung Registrierung | Seitenaufruf | Page Path enthält `weiterleitung-registrierung` |
| Registrierung erfolgreich | Seitenaufruf | Page Path enthält `registrierung-erfolgreich` |

**Meta Pixel Tags (via benutzerdefiniertes HTML):**

| Tag | Trigger | Code |
|---|---|---|
| Meta Pixel - Seitenaufruf | All Pages | `fbq('init', '914203592639470'); fbq('track', 'PageView');` |
| Meta Pixel - Lead | Weiterleitung Registrierung | `fbq('track', 'Lead');` |
| Meta Pixel - Registrierung | Registrierung erfolgreich | `fbq('track', 'CompleteRegistration');` |

**Noch einzurichten:**
- Google Ads Conversion Tags (braucht Conversion-ID `AW-XXX` + Label)
- GA4 Tag (braucht Mess-ID `G-XXX`)
