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
- **`.nojekyll` im Root:** NICHT löschen! Weist GitHub Pages an, Jekyll zu überspringen (reine HTML/CSS/JS-Seite, kein Jekyll). Ohne die Datei scheitert der Deploy an Markdown-Dateien in `docs/` mit Liquid-ähnlicher Syntax.

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
- **Google Ads:** Conversion-ID `AW-10902648523` — via GTM (3 Tags: Remarketing auf allen Seiten, Conversion Lead auf `weiterleitung-registrierung`, Conversion Registrierung auf `registrierung-erfolgreich`). Lead-Wert 2 €, Registrierungs-Wert 5 € (konservative Startwerte, ggf. später anpassen). Consent-Modus: `ad_storage`, `ad_user_data`, `ad_personalization`.
- **GA4:** Mess-ID `G-TJLDKKHJJT` — Property `289955115` "TheurerTrucks Renting Property", via GTM (1 Tag: "GA4 - Konfiguration", Google-Tag-Typ, Trigger "Initialization - All Pages"). Consent-Modus: `analytics_storage`. Enhanced Measurement aktiv (Seitenaufrufe, Scrolltiefe, ausgehende Klicks, Datei-Downloads automatisch).
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
- [x] Google Ads Conversions eingerichtet (`AW-10902648523`) — 3 GTM-Tags: Remarketing + Lead (2 €, Sekundär) + Registrierung (5 €, Primär). Alte Altlasten im Google-Ads-Konto archiviert (MKO Registrierung 2, Fleetster Registrierung abgeschlossen GA4-Import, Klick auf externen Link). Anruf-Lead und Download-Kategorien bleiben vorerst drin, stören aber nicht.

## Erledigte Punkte (Session 5 — 10.04.2026)

- [x] Projektordner aufgeräumt und strukturiert — ungenutzte Assets ins `_archiv/`, `docs/` als getrackter Ordner (außer `docs/superpowers/`), `DETAILS.md`/`HISTORY.md` aus Root nach `docs/` verschoben
- [x] Google Ads Conversion Tracking komplett eingerichtet und im GTM veröffentlicht (Version 2)
- [x] Cookiebanner `.de`-Domain-Problem behoben — Domain war in Cookiebot-Konto nicht lizenziert, in `manage.cookiebot.com` hinzugefügt

## Erledigte Punkte (Session 6 — 12.04.2026)

- [x] Google Ads Kampagnen komplett eingerichtet — alte Kampagne analysiert (CSV-Keyword-Export), zwei neue Kampagnen live:
  - `TT2GO - National - Search` (55 €/Tag, deutschlandweit, 3 Anzeigengruppen: Brand/Pferdetransporter/Pferdeanhänger, Städte-Keywords für 22 Großstädte im Einzugsgebiet)
  - `TT2GO - Neue Standorte - Search` (15 €/Tag, 12 PLZ-Radien à 25 km für neue Standorte, Standort-Modus: nur Präsenz)
- [x] Kampagnenspezifische Conversion-Zielvorhaben auf `Registrierungen` gesetzt (beide Kampagnen)
- [x] Negative Keywords eingetragen (Reiturlaub-Begriffe, 9 Stück, kampagnenweit)
- [x] Alte Kampagne `DE - TT2GO-Suche Neue Conversion 03/25` pausiert (nicht gelöscht, Daten + Screenshots unter `Google_Ads/Kampagne alt/` gesichert)
- [x] Kampagnen-Blueprint erstellt: `Google_Ads/Kampagnen-Blueprint.md`

## Google Ads Kampagnen (aktiv)

| Kampagne | Budget | Targeting | Anzeigengruppen |
|---|---|---|---|
| `TT2GO - National - Search` | 55 €/Tag | Deutschland | Brand (9 KW), Pferdetransporter (12 + 22 Städte), Pferdeanhänger (13 + 22 Städte) |
| `TT2GO - Neue Standorte - Search` | 15 €/Tag | 12 PLZ × 25 km Radius, nur Präsenz | Gleiche Struktur wie National |

**Gesamt-Tagesbudget:** 70 €/Tag (~2.100 €/Monat)

**Gebotsstrategie:** Conversions maximieren (ohne Ziel-CPA, erst nach 30-50 Conversions evaluieren)

**Suchnetzwerk-Partner:** Deaktiviert (beide Kampagnen)

**Neue Standorte (12 PLZ-Radien à 25 km):**
40822 Mettmann, 14513 Teltow, 14624 Dallgow-Döberitz, 53501 Grafschaft Birresdorf, 32457 Porta Westfalica, 49439 Steinfeld, 53919 Weilerswist, 18279 Lalendorf, 73642 Welzheim, 24589 Schülp bei Nortorf, 08060 Zwickau, 01619 Zeithain

## Google Ads Erste Analyse (18.04.2026, nach ~5 Tagen)

**Performance:** 10 Registrierungen für 184 € = **18,37 €/Registrierung** (vs. alte Kampagne: 0 Conversions bei 1.521 € in 30 Tagen)

| Anzeigengruppe | Klicks | Kosten | Conv. | €/Conv. |
|---|---|---|---|---|
| Brand | 166 | 42,62 € | 5 | **8,52 €** 🏆 |
| Pferdetransporter | 195 | 100,90 € | 3 | 33,63 € |
| Pferdeanhänger | 42 | 26,50 € | 1 | 26,50 € |
| Neue Standorte | 16 | 13,66 € | 1 | 9,65 € |

**Top-Suchbegriffe nach Conversions:** `theurer trucks` (4 Conv., 4,74 €), `pferdetransporter mieten` (1, 29,70 €), `pferdetransporter mieten münchen` (1, 7,42 €), `pferdetransporter mieten düsseldorf` (1, 1,72 €), `pferdetransporter mieten berlin brandenburg` (1, 1,43 €), `pferdesprinter mieten` (1, 0,02 €)

**Erkenntnisse:** Brand-Keywords liefern 50% der Conversions bei nur 23% der Kosten. Städte-Keywords konvertieren hervorragend. "pferdesprinter" als neues Synonym entdeckt. Bundesland-Suchen (NRW, Hessen, Brandenburg) sind relevant. Keine irrelevanten Suchbegriffe gefunden — negative Keywords greifen sauber.

**Keywords ergänzt am 18.04.:** `[pferdesprinter mieten]`, `[theurer truck]`, Bundesland-Keywords (NRW, Bayern, Hessen, Niedersachsen, Brandenburg, Schleswig-Holstein), `"pferdeanhänger ausleihen"`, `"pferdetransporter ausleihen"` — in beiden Kampagnen.

**Nächste Analyse:** ab ~02.05.2026 (nach 30-50 Conversions ggf. Ziel-CPA evaluieren)

## Automatisierter KI-Wochenbericht (eingerichtet 18.04.2026)

**Ablauf:** Google Ads Script (Sonntag 09:00) → n8n Webhook → Claude API (Sonnet 4.6) → Slack

**Google Ads Script:** `Google_Ads/weekly-report-script.js` — sammelt 10 Datenpunkte (Kampagnen, Anzeigengruppen, Keywords + QS, Suchbegriffe, Geräte, Wochentag, Uhrzeit, Impression Share, Geografie, Anzeigen)

**n8n Workflow:** `n8n/workflow-google-ads-report.json` — "TT2GO Google Ads Wochenbericht → Claude → Slack"
- Webhook: `https://n8n.srv1381541.hstgr.cloud/webhook/tt2go-ads-report` (POST)
- Claude API via Header Auth Credential "Anthropic API Key"
- Slack Webhook: konfiguriert in n8n und Google Ads Script (nicht im Repo, Secret)

**Slack App:** "TT2GO Google Ads Report" — Incoming Webhook für Report-Zustellung

**Kosten pro Report:** ~0,02-0,05 $ (Claude API)

**Format:** Ab 19.04.2026 Mobile-first — max 1500 Zeichen, keine Markdown-Tabellen, Bullet Points mit `•`, Struktur: Headline → KPIs → Was lief gut → Was kritisch → Top 3 Aktionen. Details zu Keywords/Suchbegriffen/QS gehen NICHT in den Hauptbericht, sondern werden per Rückfrage an den Bot (siehe unten) auf Anfrage beantwortet.

## Slack Bot für Rückfragen (eingerichtet 19.04.2026)

**Zweck:** Rückfragen zu Ads-Wochenberichten im Slack-Thread oder per DM mit Zugriff auf historische Reports aus Postgres.

**Architektur:**
- Postgres-Container `tt2go-postgres` auf Hostinger-VPS (PostgreSQL 16, Docker)
- Tabelle `ads_reports` (platform, week_start, week_end, raw_data JSONB, ai_report TEXT, created_at)
- Bestehender Wochenbericht-Workflow schreibt Reports nach Claude-Analyse zusätzlich in Postgres (idempotent via `ON CONFLICT DO UPDATE`)
- Neuer n8n-Workflow `TT2GO Slack Bot → Rückfragen` empfängt Slack-Events und antwortet

**Trigger:**
- `@TT2GO Report Bot` im Channel (Bot antwortet im Thread + `reply_broadcast`)
- DM an Bot (Bot antwortet als flache DM, ohne Thread)

**Ablauf pro Frage:** Signatur-Verifikation (HMAC-SHA256, 5min Replay-Schutz) → Whitelist-Check → Thread-History holen → letzte 8 Reports pro Plattform aus Postgres (UNION ALL) → Claude Sonnet 4.6 (max 4096 Tokens) → Slack chat.postMessage.

**Slack App:** "TT2GO Report Bot" (umbenannt von "TT2GO Google Ads Report")
- Scopes: `app_mentions:read`, `chat:write`, `channels:history`, `groups:history`, `im:history`, `im:write`, `incoming-webhook`
- Event Subscriptions: `app_mention`, `message.im`
- Event URL: `https://n8n.srv1381541.hstgr.cloud/webhook/tt2go-slack-events`

**ENV-Variablen in n8n (docker-compose.yml):**
- `SLACK_SIGNING_SECRET` — aus Slack App → Basic Information
- `SLACK_BOT_TOKEN` — Bot User OAuth Token (`xoxb-...`)
- `SLACK_ALLOWED_USERS` — comma-separated Slack User-IDs (Whitelist)
- `NODE_FUNCTION_ALLOW_BUILTIN=crypto` — n8n Task-Runner darf `crypto` nutzen (für HMAC)
- Alle ENV-Vars müssen auch in `N8N_RESTRICT_ENVIRONMENT_VARIABLES` (Whitelist) aufgelistet sein

**Error-Handling:**
- Postgres down → ":rotating_light: Datenbank gerade nicht erreichbar"
- Claude API Fehler → Fehlertext im Slack-Post
- Invalid Signature → HTTP 401
- Unerlaubter User → ":no_entry: Sorry, dafür bin ich nicht berechtigt"
- Keine Reports in DB → ":warning: Noch keine Reports"

**Multi-Plattform:** Schema und Bot sind auf Meta Ads vorbereitet. Wenn Meta-Ads-Workflow analog zu Google Ads gebaut wird (schreibt mit `platform='meta_ads'` in dieselbe Tabelle), zieht der Bot Meta-Reports automatisch mit — keine Code-Änderungen im Bot nötig.

**Kosten pro Rückfrage:** ~0,06 $ (Sonnet 4.6 mit 8 Wochen Reports im Kontext)

**Spec + Plan:**
- `docs/specs/2026-04-19-slack-bot-design.md`
- `docs/plans/2026-04-19-slack-bot.md`

## Offene Punkte

- [x] **Google Ads Optimierung (1. Runde)** — Suchbegriffe-Bericht geprüft, neue Keywords ergänzt, keine neuen negativen Keywords nötig
- [x] **Automatischer KI-Wochenbericht** — Google Ads Script → n8n → Claude → Slack, end-to-end getestet
- [x] **Slack Bot: Rückfragen zum Report** — Event Subscriptions + Postgres-Archiv + @mention/DM-Antworten, live seit 19.04.2026
- [ ] **Google Ads Optimierung (2. Runde, ab ~02.05.)** — Suchbegriffe erneut prüfen, Ziel-CPA evaluieren wenn 30-50 Conversions erreicht, Neue-Standorte-Radius ggf. auf 35 km erhöhen
- [ ] **Meta Ads einrichten** — Alte MKO-Kampagnen pausieren, neue Kampagnen aufsetzen. Pixel läuft, Conversions sind bereit. Budget: 50 €/Tag. 18 Video-Ads auf Frame.io vorhanden.
- [ ] **Meta Ads Wochenbericht-Workflow** — analog zu Google Ads aufbauen. Meta Ads Script → n8n → Claude → Postgres (`platform='meta_ads'`) → Slack. Bot ist bereits multi-plattform vorbereitet.
- [x] **GA4 eingerichtet** — Property `289955115`, Mess-ID `G-TJLDKKHJJT`, via GTM Tag "GA4 - Konfiguration" (Version 3), Echtzeit-Daten bestätigt
- [ ] **Enhanced Conversions** für Google Ads aktivieren (Zukunftsthema)
- [ ] **Favicon-Einbindung** — STX-Truck-Icons liegen im `_archiv/favicons/` bereit

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
