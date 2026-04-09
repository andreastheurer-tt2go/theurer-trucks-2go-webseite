# CLAUDE.md

Projektanleitung für Claude Code — TheurerTrucks 2GO Neue Webseite.

## Projektübersicht

Statischer One-Pager für **TheurerTrucks 2GO** — Car-Sharing für Pferdetransporter. Die Seite ist ein **Conversion-Funnel**, der Besucher zur Registrierung im fleetster-Carsharing-System führt. Buchungsplattform: `https://theurer-trucks-2go.fleetster.de`. Firma: TheurerTrucks Renting GmbH, Hamburger Str. 65, 23816 Leezen.

**Geschäftsmodell:** Einziger Carsharing-Anbieter für Pferdetransporter in Deutschland. Nur EIN Fahrzeugtyp (STX Pferdetransporter auf Renault Master Basis, unter 3,5t, Führerschein Klasse B). Fahrzeuge stehen an Reitstall-Parkplätzen deutschlandweit.

## Stack

- Reines HTML5 / CSS3 / Vanilla JavaScript — kein Build-Tool, kein Bundler
- Google Fonts (Montserrat + Open Sans) via CDN
- Font Awesome 6.5 via CDN
- Leaflet + OpenStreetMap für Standortkarte
- Vimeo Embed für Erklärvideo
- Fleetster API via n8n Workflows auf Hostinger VPS
- Alles in einer Datei: `index.html`

## Seite starten

```bash
npx serve .
# Dann http://localhost:3000 öffnen
```

## Dateistruktur

```
TT2GO_Neue_WEBSEITE/
├── index.html                      # Hauptseite (~3500 Zeilen)
├── impressum.html                  # Impressum-Unterseite
├── agb.html                        # AGB-Unterseite (§1-§23)
├── datenschutz.html                # Datenschutz mit PDF-Link
├── weiterleitung-registrierung.html # Tracking-Interstitial (3s Countdown → fleetster)
├── registrierung-erfolgreich.html  # Danke-Seite nach Registrierung
├── img/
│   ├── truck-front.jpg             # Hero-Hintergrundbild Desktop (optimiert, 826 KB)
│   ├── Mobil_Banner_3.jpg          # Hero-Hintergrundbild Mobile (Hochformat, 1,3 MB)
│   ├── Pferdetransporter_auf_Abruf.jpg  # Infografik Vorteile (optimiert, 240 KB)
│   ├── truck-video.mp4             # Stiller Loop (Hochformat, 3,9 MB)
│   ├── STX-Transporter/            # 11 Profi-Fotos (Exterior + Interior)
│   └── horse-stall.jpg, interior-corridor.jpg, dashboard.jpg, ...
├── Logo/
│   └── TT2GO-Logo-rgb_56-182-255 (Website).png
├── robots.txt
├── sitemap.xml
├── api/
│   └── data.json                   # Standortdaten (täglich via n8n aus Fleetster aktualisiert)
├── n8n/
│   ├── workflow-static-data.json   # Standorte → GitHub (Cron täglich 6:00)
│   ├── workflow-availability.json  # Live-Verfügbarkeit (POST Webhook)
│   └── README.md                   # n8n Setup-Anleitung
├── .env                            # API-Keys (NICHT im Repo, in .gitignore)
├── .env.example                    # Vorlage für .env
├── .gitignore
├── CLAUDE.md / DETAILS.md / HISTORY.md
└── README.md
```

## GitHub Repository

- **Repo:** `https://github.com/andreastheurer-tt2go/theurer-trucks-2go-webseite`
- **Hosting:** GitHub Pages (Deploy from branch `main`, root `/`)
- **Live-URL:** `https://andreastheurer-tt2go.github.io/theurer-trucks-2go-webseite/`

## Seitenstruktur (Reihenfolge der Sektionen)

1. **Navbar** — fixiert, Scroll-Effekt, CTA "Jetzt registrieren"
2. **Hero** — Mobile: Mobil_Banner_3.jpg / Desktop: truck-front.jpg, Headline, Trustpilot 4,6 Sterne (klickbar → #bewertungen), 2 CTAs, Stat-Bar
3. **Verfügbarkeitsprüfung** — Datum + Stations-Dropdown (Live via Fleetster-API/n8n)
4. **Vertrauens-Sektion** — Video (Hochformat) links + 4 Angst-zu-Lösung-Karten rechts
5. **Deine Vorteile** — Infografik-Bild (Pferdetransporter_auf_Abruf.jpg) + CTA
6. **Zahlen-Banner** — 63 Fahrzeuge | 51 Standorte | 15.677 Nutzer (blauer Gradient)
7. **Trustpilot-Bewertungen** — Grid-Widget (4 Spalten Desktop, Höhe begrenzt auf Mobile)
8. **Preise & Tarife** — 3 Karten + Fahrt-Rechner (Gesamtstrecke) + Preisblatt-Link
9. **Standortkarte** — Leaflet/OpenStreetMap, 57 echte Standorte aus Fleetster-API, PLZ-Suche mit Nominatim, Popup → Verfügbarkeitsprüfer mit Vorauswahl
10. **So geht's** — 5 Schritte + Erklärvideo (Vimeo 1019195471) eingebettet
11. **Fahrzeug-Detail** — Bildergalerie (11 STX-Profifotos, 6 Spalten Desktop, Auto-Rotate) + 5 Specs
12. **FAQ** — 31 Fragen in 5 Kategorien mit Tabs, Schema.org FAQPage JSON-LD (8 Fragen)
13. **CTA-Band** — Finaler Push, blauer Gradient
14. **Sticky Mobile CTA** — fixiert am unteren Bildschirmrand (nur Mobile, ausgeblendet wenn Hero sichtbar via IntersectionObserver)
15. **Footer** — 4 Spalten, Logo weiß invertiert + Footer-Bar

## Unterseiten

- **impressum.html** — Impressum (TheurerTrucks Renting GmbH, HRB 23518 KI)
- **agb.html** — AGB §1-§23 (Stand 28.01.2024)
- **datenschutz.html** — Datenschutz-Übersicht + PDF-Link auf Google Drive
- **weiterleitung-registrierung.html** — Tracking-Interstitial: 3s Countdown, GTM Event `generate_lead`, dann Redirect zu fleetster
- **registrierung-erfolgreich.html** — Danke-Seite: GTM Event `sign_up`, App-Download-Links

## CSS-Architektur

**Mobile-First** — Basis = Mobile, progressive Enhancement via `min-width`:
- Basis: 1-spaltige Layouts, gestapelte Buttons, Touch-Targets 48px+
- `@media (min-width: 769px)`: Tablet
- `@media (min-width: 1025px)`: Desktop
- `@media (prefers-reduced-motion: reduce)`: Barrierefreiheit

**Design-Tokens (CSS Custom Properties):**

| Variable | Wert | Verwendung |
|---|---|---|
| `--primary` | `#0088CF` | Brand-Blau, Buttons, Akzente |
| `--primary-bright` | `#38B6FF` | Logo-Blau, Gradients |
| `--primary-dark` | `#006fa8` | Hover-States |
| `--dark` | `#0f1419` | Dunkle Sektionen |

## Aktuelle Preise (Stand 15.01.2024)

| Tarif | Preis (brutto) | Freikilometer |
|---|---|---|
| 1 Tag | 165 € | 150 km |
| 2 Tage | 324 € | 300 km |
| 3 Tage | 466 € | 450 km |
| 4 Tage | 590 € | 600 km |
| 5 Tage | 698 € | 750 km |
| 6 Tage | 788 € | 900 km |
| 7 Tage / Woche | 860 € | 1.050 km |
| Mehrkilometer | 0,46 €/km | — |

Dieselkosten trägt der Mieter — Fahrzeug muss vollgetankt zurückgebracht werden.
Preisblatt: `https://drive.google.com/file/d/1KmHVFORjlvv-oRDJltwKop7fPJp1_b5k/view`

## Inhaltliche Regeln — IMMER EINHALTEN

- Nur EIN Fahrzeugtyp (STX Pferdetransporter) — nie mehrere Kategorien
- **KEINE** "Luftfederung" behaupten — komfortable Standardfederung
- Alle Preise **brutto** (inkl. MwSt.) — niemals "zzgl. MwSt."
- Dieselkosten: Mieter übernimmt, vollgetankt zurückbringen
- Fahrzeug hat **3 Sitzplätze** (nicht 5!)
- Sprache: Persönlich, "du"-Form, nicht abgehoben
- Code-Kommentare auf Deutsch

## Tracking & Consent

- **GTM:** Container-ID `GTM-KZDXGB75` (neuer Container, auf allen Seiten inkl. Unterseiten)
- **GTM alt:** `GTM-P4D6Z66` war der WordPress-Container — nicht mehr verwenden
- **Cookiebot:** Domain-ID `3d40de5d-ceaa-46b5-97af-cc86c9aed0fd` (auf allen Seiten)
- **Meta Pixel:** `914203592639470` — via GTM (3 Tags: PageView, Lead, CompleteRegistration)
- **Trustpilot Hero:** Statische Sterne (Glasmorphismus-Pill), klickbar → scrollt zu Bewertungen
- **Trustpilot Bewertungen:** Grid-Widget (Template `539adbd6dec7e10e686debee`, Business `6295331e310b02c5d3124dd4`)
- **CTA-Events:** Jeder CTA feuert `dataLayer.push({'event':'cta_click','cta_location':'...'})` mit eindeutigem Label
- **Conversion-Funnel:** Alle CTAs → `weiterleitung-registrierung.html` (GTM `generate_lead`) → fleetster → `registrierung-erfolgreich.html` (GTM `sign_up`)

### GTM Trigger (Seitenaufruf-basiert)

| Trigger | Bedingung | Zweck |
|---|---|---|
| Hauptseite besucht | Page Path gleich `/` | Basis-Traffic |
| Weiterleitung Registrierung | Page Path enthält `weiterleitung-registrierung` | Soft Conversion |
| Registrierung erfolgreich | Page Path enthält `registrierung-erfolgreich` | Finale Conversion |

## Fleetster-API (Live)

**Auth:** `POST https://my.fleetster.net/users/auth` → Top-Level `_id` = Token (UUID)
**Swagger:** `https://my.fleetster.net/swagger/`

### n8n Workflows auf Hostinger VPS

| Workflow | Trigger | Funktion |
|---|---|---|
| Standorte → GitHub | Cron täglich 6:00 | Holt Locations aus Fleetster, filtert archivierte aus, pusht `api/data.json` nach GitHub |
| Verfügbarkeitsprüfung | POST Webhook | Prüft Live-Verfügbarkeit am gewählten Standort/Zeitraum (archivierte Fahrzeuge ausgeschlossen) |

**VPS:** `n8n.srv1381541.hstgr.cloud` (Hostinger, Docker mit Traefik)
**Webhook-URL:** `https://n8n.srv1381541.hstgr.cloud/webhook/tt2go-availability`

### Frontend-API-Konfiguration (index.html)

```javascript
var TT2GO_API = {
    dataUrl:  'api/data.json',  // Standorte (täglich aus GitHub)
    availUrl: 'https://n8n.srv1381541.hstgr.cloud/webhook/tt2go-availability'
};
```

Das Frontend hat Fallback-Daten falls die API nicht erreichbar ist.

### Archiviert-Filter (Label)

Beide Workflows filtern Standorte/Fahrzeuge mit dem Label **"Archiviert"** aus:
- **Feld:** `extended.EntityLabels.labels` (Array von Label-IDs)
- **Label-ID:** `69d64b9011fe02d420b21789`
- **API-Endpunkt für Labels:** `GET https://my.fleetster.net/entitylabels`

### Zahlen-Banner

Zahlen werden manuell gepflegt (API-Abruf für Users/Vehicles zu langsam):
- Fahrzeuge: aktuell 87 (auf der Seite noch 63 — TODO aktualisieren)
- Standorte: ~49 aktiv (9 archivierte ausgefiltert), auf der Seite noch 51 — TODO aktualisieren
- Nutzer: aktuell 16.545 (auf der Seite: 16.545)

## Erledigte Go-Live-Punkte

- [x] Impressum/Datenschutz/AGB-Seiten erstellt
- [x] Cookiebot-ID eingetragen (`3d40de5d-ceaa-46b5-97af-cc86c9aed0fd`)
- [x] Trustpilot Widget-IDs eingetragen (Hero + Grid)
- [x] Bilder optimiert (PNG 7,2 MB → JPG 240 KB)
- [x] YouTube-Link im Footer eingetragen
- [x] GitHub Pages Hosting eingerichtet
- [x] Tracking-Seiten erstellt (Soft-Conversion + Conversion)
- [x] FAQ komplett überarbeitet (31 Fragen, 5 Kategorien)
- [x] Fleetster-API angebunden (n8n auf Hostinger VPS)
- [x] 57 echte Standorte auf Karte + Dropdown (täglich aktualisiert)
- [x] Live-Verfügbarkeitsprüfung funktioniert

## Erledigte Punkte (Session 4)

- [x] Zahlen-Banner aktualisiert
- [x] .com Domain verbunden (GitHub Pages → Custom Domain)
- [x] Mobile Layout-Fixes (Hero-Bild, Sticky CTA, Verfügbarkeitsformular)
- [x] Footer Unterseiten vereinheitlicht
- [x] Archiviert-Filter in n8n Workflows
- [x] Verfügbarkeitsprüfung: nur aktive Fahrzeuge, Webhook auf POST
- [x] Enddatum-Zeitzonenfix (UTC → lokale Zeit)

## Erledigte Punkte (Session 4, Fortsetzung)

- [x] .de Domain verbunden (DNS bei Strato → GitHub Pages, A-Record `185.199.108.153`)
- [x] Canonical-URL + Sitemap-URL zeigen auf `theurer-trucks-2go.de`
- [x] In fleetster Redirect-URL auf `registrierung-erfolgreich.html` gesetzt
- [x] GTM neuer Container `GTM-KZDXGB75` auf allen Seiten eingebaut
- [x] GTM Trigger erstellt (3 Seitenaufruf-Trigger)
- [x] Meta Pixel `914203592639470` via GTM eingerichtet (PageView + Lead + CompleteRegistration)

## Offene Punkte

- [ ] Google Ads Conversions einrichten (Lead + Registrierung) — Conversion-ID + Label nötig
- [ ] GA4 einrichten (Mess-ID nötig)

## Externe Links

- Buchungsplattform: `https://theurer-trucks-2go.fleetster.de`
- GitHub Repo: `https://github.com/andreastheurer-tt2go/theurer-trucks-2go-webseite`
- Facebook: `https://www.facebook.com/theurertrucks2go`
- Instagram: `https://www.instagram.com/theurer_trucks_2go/`
- YouTube: `https://www.youtube.com/@theurertrucks`
- App Store: `https://apps.apple.com/us/app/theurertrucks-2go/id1589088586`
- Google Play: `https://play.google.com/store/apps/details?id=theurertrucks2go.fleetster.de`
- Preisblatt: `https://drive.google.com/file/d/1KmHVFORjlvv-oRDJltwKop7fPJp1_b5k/view`
- AGB PDF: `https://drive.google.com/file/d/129aQ5Sidqh6mkAiQgQuYl9M7R8Zg6HaI/view`
