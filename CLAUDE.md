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
- Alles in einer Datei: `index.html`

## Seite starten

```bash
npx serve .
# Dann http://localhost:3000 öffnen
```

## Dateistruktur

```
TT2GO_Neue_WEBSEITE/
├── index.html              # Die komplette Webseite (~3400 Zeilen)
├── img/                    # Bilder + Video
│   ├── truck-front.jpg     # Hero-Hintergrundbild + Galerie
│   ├── Pferdetransporter_auf_Abruf.png  # Infografik Vorteile (7,2 MB — komprimieren!)
│   ├── truck-video.mp4     # Stiller Loop (Hochformat)
│   ├── horse-stall.jpg, interior-corridor.jpg, dashboard.jpg,
│   │   rearview-camera.jpg, ventilation-lights.jpg, skylight.jpg, navigation.jpg
├── Logo/
│   └── TT2GO-Logo-rgb_56-182-255 (Website).png
├── robots.txt
├── sitemap.xml
├── docs/superpowers/
│   ├── specs/2026-04-06-tt2go-webseite-design.md
│   └── plans/2026-04-06-tt2go-webseite-implementierung.md
├── Testprojekt/            # Altes Testprojekt (Referenz)
├── Kundenavatar/           # Zielgruppenanalyse PDF
├── Screenshots/            # Referenz-Screenshots
└── TT2GO Preisblatt Stand 15.01.2024.pdf
```

## Seitenstruktur (Reihenfolge der Sektionen)

1. **Navbar** — fixiert, Scroll-Effekt, CTA "Jetzt registrieren"
2. **Hero** — truck-front.jpg Hintergrund, Headline, Trustpilot-Sterne, 2 CTAs, Stat-Bar
3. **Verfügbarkeitsprüfung** — Datum + Stations-Dropdown (Stub, Fleetster-API kommt)
4. **Vertrauens-Sektion** — Video (Hochformat) links + 4 Angst-zu-Lösung-Karten rechts
5. **Deine Vorteile** — Infografik-Bild (Pferdetransporter_auf_Abruf.png) + CTA
6. **Zahlen-Banner** — 63 Fahrzeuge | 51 Standorte | 15.677 Nutzer (blauer Gradient)
7. **Preise & Tarife** — 3 Karten + Fahrt-Rechner + Preisblatt-Link
8. **So geht's** — 5 Schritte
9. **Standortkarte** — Leaflet/OpenStreetMap, PLZ-Suche mit Nominatim Geocoding + CTA
10. **Fahrzeug-Detail** — Bildergalerie (8 Thumbnails, Auto-Rotate) + 5 Specs
11. **Trustpilot-Bewertungen** — Widget (Platzhalter-IDs)
12. **Erklärvideo** — Vimeo Embed (1019195471) + CTA
13. **FAQ** — 8 Fragen, Akkordeon, Schema.org FAQPage JSON-LD
14. **CTA-Band** — Finaler Push, blauer Gradient
15. **Sticky Mobile CTA** — fixiert am unteren Bildschirmrand (nur Mobile)
16. **Footer** — 4 Spalten + Footer-Bar

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

- **GTM:** Container-ID `GTM-P4D6Z66` (einziger Script-Tag)
- **Cookiebot:** Platzhalter `DEINE-COOKIEBOT-ID` — muss ersetzt werden
- **Trustpilot:** Platzhalter `DEINE-TEMPLATE-ID` und `DEINE-BUSINESS-ID`
- **CTA-Events:** Jeder CTA feuert `dataLayer.push({'event':'cta_click','cta_location':'...'})` mit eindeutigem Label
- **Conversion:** Facebook Pixel auf fleetster-Dankeseite trackt Registrierungen

## Fleetster-API (deferred)

Drei Stubs die noch API-Anbindung brauchen:
1. **Verfügbarkeitsprüfung** — Bookings + Cars Endpoints
2. **Standortkarte** — Stationsdaten dynamisch laden
3. **Zahlen-Banner** — Fahrzeuge/Standorte/Nutzer 1x monatlich aktualisieren

API-Docs: `https://www.fleetster.net/mobility-api`
Swagger: `https://my.fleetster.net/swagger/` (Credentials nötig)

## Offene Punkte vor Go-Live

- [ ] Impressum/Datenschutz/AGB-Seiten erstellen (Footer-Links sind `#`)
- [ ] Cookiebot-ID eintragen
- [ ] Trustpilot Widget-IDs eintragen
- [ ] Bilder optimieren (PNG 7,2 MB → WebP komprimieren)
- [ ] Trustpilot-Score im Hero an echten Wert anpassen
- [ ] YouTube-Link im Footer eintragen
- [ ] Domain & Hosting einrichten
- [ ] Canonical-URL + Sitemap-URL auf finale Domain anpassen

## Externe Links

- Buchungsplattform: `https://theurer-trucks-2go.fleetster.de`
- Facebook: `https://www.facebook.com/theurertrucks2go`
- Instagram: `https://www.instagram.com/theurer_trucks_2go/`
- App Store: `https://apps.apple.com/us/app/theurertrucks-2go/id1589088586`
- Google Play: `https://play.google.com/store/apps/details?id=theurertrucks2go.fleetster.de`
