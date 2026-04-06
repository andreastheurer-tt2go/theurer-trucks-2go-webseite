# TheurerTrucks 2GO — Neue Webseite Design-Spec

## Zusammenfassung

Conversion-optimierter One-Pager für TheurerTrucks 2GO, der Besucher zur Registrierung im fleetster-Carsharing-System führt. Statische HTML/CSS/JS-Seite ohne Build-Tools. Empathie-Hybrid-Strategie: empathischer Einstieg + starker Produkt-Showcase + 5 strategisch platzierte CTAs.

## Ziel

Maximierung der fleetster-Registrierungen. Jeder CTA verlinkt auf die fleetster-Registrierungsseite. Erfolgreiche Registrierungen werden über Facebook Pixel auf der fleetster-Dankeseite getrackt.

## Zielgruppe

Basierend auf dem Kundenavatar ("Julia"):

- **Demografie:** Weiblich (90%), Durchschnittsalter 37, gut gebildet (Abitur/Studium), städtisch, in Beziehung
- **Hauptemotion:** Angst und Unsicherheit (Verletzung des Pferdes, Verladen, Unerfahrenheit, kein Anhängerführerschein)
- **Kernwunsch:** Entspannt und sicher mit dem Pferd reisen
- **Sprache:** Normal, nicht abgehoben. "TheurerTruck" als bekannter Begriff.
- **Interessen:** Pferde, Reiten, Turniere, Hunde, Natur
- **Frustrationen:** Kein Anhängerführerschein, kein Zugfahrzeug, Pferd lässt sich nicht verladen, Anhänger immer kaputt

## Wettbewerb

TheurerTrucks 2GO ist der einzige Carsharing-Anbieter für Pferdetransporter in Deutschland. Die Konkurrenz besteht aus:
- Herkömmlichen Pferdeanhängern (Kauf/Miete)
- Klassischen Vermietungsfirmen für Pferdetransporter
- Transportunternehmen

## Technischer Stack

- Reines HTML5 / CSS3 / Vanilla JavaScript
- Keine Build-Tools, kein Bundler, keine Dependencies
- Google Fonts (Montserrat + Open Sans) via CDN
- Font Awesome 6.5 via CDN
- Alles in einer einzelnen `index.html` Datei (wie Testprojekt)

## Design-Tokens (CSS-Variablen)

Übernommen vom Testprojekt:

| Variable | Wert | Verwendung |
|---|---|---|
| `--primary` | `#0088CF` | Brand-Blau, Buttons, Akzente |
| `--primary-bright` | `#38B6FF` | Logo-Blau, Gradient-Endpunkt |
| `--primary-dark` | `#006fa8` | Hover-States |
| `--primary-grad` | `linear-gradient(135deg, #0088CF, #38B6FF)` | Gradient-Flächen |
| `--dark` | `#0f1419` | Dunkle Sektions-Hintergründe |
| `--text-dark` | `#1a202c` | Überschriften |

## Seitenstruktur (Scroll-Funnel)

### 1. Navbar

- Fixiert am oberen Rand, transparent über Hero, weiß nach Scroll
- Logo links (TT2GO-Logo-rgb), Navigation rechts
- Menüpunkte: So geht's, Fahrzeug, Standorte, Preise, FAQ
- CTA-Button "Jetzt registrieren" in der Navbar (blau, pill-shape)
- Mobile: Burger-Menü mit Slide-in-Overlay

### 2. Hero

- **Hintergrund:** Statisches Bild `truck-front.jpg` mit dunklem Overlay
- **Pill-Badge:** "Car-Sharing für Pferdetransporter"
- **Headline:** "Entspannt transportieren. Sicher ankommen." — adressiert die zwei Kernwünsche (Entspannung + Sicherheit)
- **Subtext:** "Premium-Pferdetransporter an Reitställen in ganz Deutschland. Einfach per App buchen — Führerschein Klasse B genügt."
- **Primärer CTA (CTA #1):** "Jetzt kostenlos registrieren →" — blauer Button, Box-Shadow. "kostenlos" senkt Hemmschwelle.
- **Sekundärer CTA:** "So funktioniert's" — Ghost-Button, scrollt zu Sektion 7
- **Statistik-Bar:** Am unteren Rand des Hero, halbtransparent. 4 Werte:
  - 100% Versichert
  - 24/7 Online buchbar
  - Klasse B Führerschein
  - 1–2 Pferde pro Fahrt

### 3. Verfügbarkeitsprüfung

- Heller Hintergrund (`--light`)
- **Überschrift:** "Wann brauchst du einen Transporter?"
- **Formular:** 3 Felder nebeneinander (Desktop), vertikal gestapelt (Mobile):
  - Abholdatum/-zeit (datetime-local)
  - Rückgabedatum/-zeit (datetime-local)
  - Stations-Dropdown (Standorte aus Fleetster-API, zunächst statische Liste als Stub)
- **Button:** "Verfügbarkeit prüfen"
- **Ergebnis-Karte:** Zeigt Verfügbarkeit am gewählten Standort. "Buchen"-Button leitet zu fleetster-Registrierung.
- **API-Integration:** Zunächst Stub mit Demo-Daten. Fleetster-API-Anbindung (Bookings + Cars Endpoints) wird später implementiert.
- **Mindset-Design:** Micro-Commitment — wer ein Datum eingibt, ist mental näher an der Buchung.

### 4. Vertrauens-Sektion ("Entspannt transportieren statt Stress")

- Weißer Hintergrund
- **Überschrift:** "Entspannt transportieren statt Stress"
- **Unterzeile:** "Wir kennen die Herausforderungen beim Pferdetransport — und haben sie gelöst."
- **4 Karten** im 2x2-Grid (Desktop), gestapelt (Mobile). Jede Karte:
  - Icon + kursives Zitat aus dem Kundenavatar (Identifikation)
  - Fette Lösung als Überschrift
  - 2 Sätze Erklärung

**Karte 1:** "Ich hab keinen Anhängerführerschein..." → Führerschein Klasse B reicht (unter 3,5t)
**Karte 2:** "Hoffentlich verletzt sich mein Pferd nicht..." → Sicherheit auf höchstem Niveau (Kamera, Gummiboden, LED, Federung)
**Karte 3:** "Was ist, wenn sich mein Pferd nicht verladen lässt?" → Breite Rampe, niedriger Einstieg, stressfreies Verladen
**Karte 4:** "Lohnt sich ein eigener Anhänger?" → Nur zahlen wenn du fährst (ab 149€/Tag, inkl. Versicherung)

- Kein CTA in dieser Sektion (baut Vertrauen auf, CTA kommt nach Video)

### 5. Video-Showcase

- **Dunkler Hintergrund** (`--dark`) — visuelle Pause, Premium-Feeling
- **Layout:** Split-View (Desktop). Links: Stiller MP4-Video-Loop als Fullscreen-Hintergrund-Element (autoplay, muted, loop, playsinline). Rechts: Text-Content.
- **Tag:** "Erlebe unseren Transporter"
- **Überschrift:** "Professionell gebaut — für dein Pferd"
- **Features-Checkliste** (blaue Häkchen):
  - Pferde-Überwachungskamera während der Fahrt
  - Komfortable Federung für stressfreien Transport
  - Platz für 1 Großpferd oder 2 kleinere Pferde
  - Sattelkammer & 5 Sitzplätze inklusive
- **CTA #2:** "Jetzt kostenlos registrieren →"

### 6. Fahrzeug-Detail ("Der STX Pferdetransporter")

- **Dunkler Hintergrund** (`--dark`), Fortsetzung der dunklen Zone
- **Überschrift:** "Der STX Pferdetransporter"
- **Unterzeile:** "Premium-Transport für 1 Großpferd oder 2 kleinere Pferde auf Renault Master Basis — fahrbar mit Führerschein Klasse B."
- **Bildergalerie:** Hauptbild + Thumbnails zum Durchklicken (wie Testprojekt). Auto-Rotate alle 5 Sekunden.
- **Bilder:** truck-front.jpg, horse-stall.jpg, interior-corridor.jpg, dashboard.jpg, rearview-camera.jpg, ventilation-lights.jpg, skylight.jpg, navigation.jpg
- **Feature-Liste** neben der Galerie mit allen technischen Details

### 7. Ausstattung im Detail

- Heller Hintergrund
- **Überschrift:** "Komfort & Sicherheit auf höchstem Niveau"
- **Foto-Grid:** Bilder der Ausstattungsdetails mit kurzen Beschriftungen (Rückfahrkamera, Dachluke mit Ventilator, LED-Beleuchtung, Gummiboden, Sattelkammer, etc.)

### 8. So geht's ("In 4 Schritten zum Pferdetransport")

- Heller Hintergrund (`--light`)
- **4 Schritte** als nummerierte Karten:
  1. Kostenlos registrieren — Account bei fleetster erstellen
  2. Standort wählen — Nächsten Reitstall-Parkplatz finden
  3. Online buchen — Wunschzeitraum reservieren
  4. Losfahren — Fahrzeug per App öffnen, Schlüssel im Handschuhfach

### 9. Standortkarte

- Weißer Hintergrund
- **Überschrift:** "Unsere Standorte"
- **Interaktive Karte** (Google Maps oder Leaflet/OpenStreetMap) mit Markern für jeden Standort
- **PLZ-Suche:** Nutzer gibt PLZ ein, Karte zentriert auf nächsten Standort
- **Standortdaten:** Dynamisch aus Fleetster-API (zunächst statisch als Stub). Neue Standorte erscheinen automatisch.
- **CTA #3:** "Registriere dich und buche an deinem nächsten Standort"

### 10. Trustpilot-Bewertungen

- Heller Hintergrund (`--light`)
- **Trustpilot-Widget** eingebettet — zeigt Sterne-Rating und echte Bewertungen
- Automatisch aktuell über Trustpilot-Integration
- Fokus auf Bewertungen von Erstnutzerinnen (falls filterbar)

### 11. Erklärvideo (Einwandbehandlung)

- Weißer Hintergrund
- **Vimeo-Video eingebettet:** `https://vimeo.com/1019195471`
- Responsive Vimeo-Embed (16:9 Aspect-Ratio)
- **Kurzer Text:** Kontextualisiert das Video ("Schau dir an, wie einfach es funktioniert")
- **CTA #4:** "Jetzt kostenlos registrieren →"
- **Position:** Direkt vor den Preisen — räumt letzte Zweifel aus bevor die Nutzerin den Preis sieht

### 12. Preise & Tarife

- Weißer Hintergrund
- **Überschrift:** "Transparente Preise — kein Kleingedrucktes"
- **3 Tarif-Karten** nebeneinander (Desktop):
  - Tagestarif: 149€ (inkl. 200 Frei-km)
  - Wochenendtarif: 420€ (inkl. 500 Frei-km)
  - Wochentarif: 775€ (inkl. 1.000 Frei-km)
- Alle Preise brutto (inkl. MwSt.)
- Zusatz-km: 0,42€/km
- Diesel: Kosten separat
- Versicherung: inklusive (Vollkasko)
- Wie im Testprojekt gestaltet

### 13. FAQ

- Heller Hintergrund (`--light`)
- **Akkordeon** mit klickbaren Fragen
- SEO-optimierte Fragen basierend auf echten Suchanfragen und Kundenavatar:
  - "Brauche ich einen speziellen Führerschein?"
  - "Wie funktioniert die Buchung?"
  - "Wo stehen die Transporter?"
  - "Was kostet die Miete?"
  - "Ist das Fahrzeug versichert?"
  - "Wie viele Pferde passen in den Transporter?"
  - "Wie funktioniert das Verladen?"
  - "Was passiert bei einer Panne?"
- **Schema.org FAQPage-Markup** im HTML für Google Rich Snippets

### 14. Finaler CTA-Band

- **Gradient-Hintergrund** (`--primary-grad`)
- **Überschrift:** "Bereit für deinen ersten Transport?"
- **Unterzeile:** "Registriere dich jetzt kostenlos und buche unseren STX Pferdetransporter direkt online."
- **CTA #5:** Weißer Button "Jetzt kostenlos registrieren →"
- Kompakt, klar, letzte Chance vor dem Footer

### 15. Footer

- Dunkler Hintergrund (`--dark`)
- **4 Spalten** (Desktop):
  1. Logo + Kurzbeschreibung + Social Icons (Instagram, Facebook, YouTube)
  2. Navigation (Schnelllinks zu Sektionen)
  3. Konto & App (Registrieren, Anmelden, App Download)
  4. Kontakt (Adresse, Telefon, E-Mail)
- **Footer-Bar:** Copyright + Links zu Impressum, Datenschutz, AGB
- **Impressum/Datenschutz/AGB:** Werden als separate HTML-Seiten erstellt (nicht als Platzhalter)

## SEO-Strategie

### On-Page SEO

- **Title-Tag:** "TheurerTrucks 2GO | Pferdetransporter mieten — Car-Sharing deutschlandweit"
- **Meta-Description:** "Pferdetransporter mieten ab 149€/Tag. Car-Sharing an Reitställen in ganz Deutschland. Führerschein Klasse B genügt. Jetzt kostenlos registrieren!"
- **H1:** "Entspannt transportieren. Sicher ankommen." (nur einmal auf der Seite)
- **H2s:** Jede Sektion hat eine eigene H2 mit relevantem Keyword
- **Semantisches HTML:** `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>`
- **Alt-Texte:** Beschreibende Alt-Attribute für alle Bilder
- **Structured Data (JSON-LD):**
  - Organization (TheurerTrucks Renting GmbH)
  - LocalBusiness (Standorte)
  - FAQPage (FAQ-Sektion)
  - Product (STX Pferdetransporter)

### Technisches SEO

- Schnelle Ladezeit durch statisches HTML (kein Server-Rendering)
- Preload für Hero-Bild
- Lazy-Loading für Bilder unterhalb des Folds
- Responsive Design (Mobile-First)
- Canonical-URL
- Sitemap.xml
- Robots.txt

### Keyword-Fokus

- Primär: "Pferdetransporter mieten", "Pferdetransporter Car-Sharing"
- Sekundär: "Pferdetransporter ohne Anhängerführerschein", "Pferd transportieren Klasse B"
- Long-Tail: "Pferdetransporter mieten in der Nähe", "Pferdetransporter tageweise mieten"
- Die FAQ-Sektion und Vertrauens-Karten enthalten natürliche Long-Tail-Keywords

## Tracking & Analytics

### Google Tag Manager (GTM)

- Einziger Script-Tag im HTML: GTM-Container (bestehende ID: GTM-P4D6Z66)
- Alle weiteren Tracking-Tools werden über GTM konfiguriert:
  - Google Analytics 4 (GA4)
  - Facebook Pixel
  - Weitere Tools nach Bedarf (Smartlook, HubSpot etc.)

### Conversion-Tracking

- **Primäre Conversion:** Klick auf "Jetzt kostenlos registrieren" (alle 5 CTAs + Navbar)
- **Sekundäre Conversion:** Erfolgreiche Registrierung bei fleetster (Facebook Pixel auf Dankeseite)
- **GTM-Events** für jeden CTA-Button (unterschiedliche Event-Labels: hero_cta, video_cta, map_cta, explainer_cta, final_cta) zur Analyse welcher CTA am besten konvertiert
- **Scroll-Depth-Tracking** über GTM (wie weit scrollen Nutzer?)

### Cookie-Consent

- **Cookiebot (Usercentrics CMP)** — ein Script-Tag
- Kostenlos für One-Pager
- DSGVO-konform, blockiert/erlaubt Scripts basierend auf Consent
- Integration mit GTM für Consent-Mode

## Fleetster-API-Integrationen (deferred)

Beide Integrationen starten als Stub mit statischen Demo-Daten. API-Anbindung wird separat implementiert.

### Verfügbarkeitsprüfung

- API: `https://www.fleetster.net/mobility-api`
- Endpoints: Bookings (Verfügbarkeitszeiträume), Cars (Fahrzeugliste)
- Authentifizierung: Bearer Token (aus fleetster Partner-Portal)

### Standortkarte

- Standortdaten (Name, Adresse, Koordinaten) aus Fleetster-API
- Automatische Aktualisierung bei neuen Standorten
- Kein manuelles Pflegen nötig

## Assets

### Vorhanden (aus Testprojekt)

- **Logo:** `Logo/TT2GO-Logo-rgb_56-182-255 (Website).png`
- **Bilder:** `img/` — truck-front.jpg, horse-stall.jpg, interior-corridor.jpg, dashboard.jpg, rearview-camera.jpg, ventilation-lights.jpg, skylight.jpg, navigation.jpg
- **Video (Loop):** `img/truck-video.mp4` (auch als Root-Level-Datei vorhanden)
- **Zusätzliche Fahrzeugbilder:** `drive-download-*/` — STX Trucks Pressefotos

### Extern

- **Erklärvideo:** Vimeo Embed `https://vimeo.com/1019195471`
- **Trustpilot:** Widget-Code aus Trustpilot Business-Account
- **Standortkarte:** Google Maps API oder Leaflet/OpenStreetMap

## Responsive Design

- **Desktop:** ab 1025px — volle Layouts, Grid-Spalten, Split-Views
- **Tablet:** 769px – 1024px — reduzierte Spalten, angepasste Abstände
- **Mobile:** bis 768px — Single-Column, gestapelte Elemente, Burger-Menü
- **Klein-Mobile:** bis 480px — kompaktere Abstände, kleinere Schriftgrößen
- `prefers-reduced-motion` Media-Query für Barrierefreiheit

## Inhaltliche Richtlinien

- Nur EIN Fahrzeugtyp (STX Pferdetransporter) — nie mehrere Kategorien referenzieren
- KEINE "Luftfederung" behaupten — komfortable Standardfederung
- Dieselkosten immer separat erwähnen
- Alle Preise brutto (inkl. MwSt.)
- Sprache: Persönlich, empathisch, "du"-Form, nicht zu abgehoben
- Texte auf Deutsch, Code-Kommentare auf Deutsch

## Firmeninformationen

- **Firma:** TheurerTrucks Renting GmbH
- **Adresse:** Hamburger Str. 65, 23816 Leezen
- **Buchungsplattform:** https://theurer-trucks-2go.fleetster.de
- **Webseite (aktuell):** https://www.theurer-trucks-2go.de
