# HISTORY.md

Entwicklungshistorie der TheurerTrucks 2GO Webseite.

## Session 1 — 06./07.04.2026

### Brainstorming & Design

- Testprojekt analysiert (statischer One-Pager, reines HTML/CSS/JS)
- Aktuelle Webseite (theurer-trucks-2go.de) analysiert (WordPress, Brooklyn-Theme)
- Kundenavatar "Julia" ausgewertet (90% weiblich, Durchschnitt 37, Hauptemotion: Angst)
- 3 Strategieansätze vorgestellt: Angst-zu-Lösung, Produkt-First, Empathie-Hybrid
- **Empathie-Hybrid gewählt** — empathischer Einstieg + Produkt-Showcase + 5 CTAs
- Design abschnittsweise im Visual Companion präsentiert und genehmigt
- Design-Spec geschrieben: `docs/superpowers/specs/2026-04-06-tt2go-webseite-design.md`
- Implementierungsplan geschrieben: `docs/superpowers/plans/2026-04-06-tt2go-webseite-implementierung.md`

### Implementierung

- 18 Tasks via Subagent-Driven Development umgesetzt
- Alle Sektionen implementiert (Hero → Footer)
- Code-Review gegen Spec durchgeführt, Abweichungen korrigiert

### Anpassungen auf Nutzerwunsch

- **Ausstattungs-Galerie entfernt** — war redundant zum Fahrzeug-Detail
- **Mobile-First CSS Refactoring** — Basis = Mobile, min-width Queries
- **Sticky Mobile CTA hinzugefügt** — fixierter Button am unteren Bildschirmrand
- **"So funktioniert's" Button** — Play-Icon durch Pfeil-Icon ersetzt
- **5 Sitzplätze → 3 Sitzplätze** korrigiert (überall)
- **Hero-Stat** "1-2 Pferde" → "50+ Standorte deutschlandweit"
- **Video-Showcase → Vorteile-Infografik** — Bild `Pferdetransporter_auf_Abruf.png` statt Video+Kacheln
- **Stilles MP4-Video** in Vertrauens-Sektion verschoben (links neben Karten)
- **Interaktive Hotspots getestet und verworfen** — zurück zum statischen Infografik-Bild
- **Preise aktualisiert** gemäß Preisblatt Stand 15.01.2024 (149€→165€, 420€→466€, 775€→860€, 0,42→0,46€/km)
- **Preisblatt-Link** unter Preisbereich eingebettet (Google Drive PDF)
- **Dieselkosten-Text** angepasst: "Mieter übernimmt, vollgetankt zurückbringen"
- **Zahlen-Banner** hinzugefügt (63 Fahrzeuge, 51 Standorte, 15.677 Nutzer) mit Counter-Animation
- **Fahrt-Rechner** statt Tarif-Rechner — denkt in Fahrten statt Tarifen
- **PLZ-Suche** funktioniert jetzt mit Nominatim Geocoding
- **5 Schritte** statt 4 — "App downloaden" ergänzt
- **Fahrzeug-Specs** bereinigt: 3 Specs entfernt (Großpferd, Federung, 80km/h), Navi ergänzt
- **Redundanter Fahrzeug-Header** entfernt (war doppelt)
- **Zahlen-Banner Farbe** → blauer Gradient als optische Trennung
- **Trustpilot-Sterne im Hero** — Glasmorphismus-Pill als Trust-Element

### Sektionsreihenfolge mehrfach optimiert

Finale Reihenfolge (Stand 08.04.2026):
1. Hero → 2. Verfügbarkeit → 3. Vertrauen (mit Video) → 4. Vorteile (Infografik) → 5. Zahlen-Banner → 6. Trustpilot → 7. Preise → 8. Standorte → 9. So geht's (mit Erklärvideo) → 10. Fahrzeug-Detail → 11. FAQ → 12. CTA-Band → 13. Footer

---

## Session 2 — 07./08.04.2026

### Weitere Anpassungen

- **Vertrauens-Karte 4 geändert** — "Lohnt sich ein Anhänger?" → "Wie schnell bekomme ich ein Fahrzeug?" (24/7 Verfügbarkeit)
- **Preisrechner auf Gesamtstrecke** umgestellt (statt einfache Strecke × 2), Default 150 km
- **Preisrechner Aufpreis-Nachricht** entfernt, Hinweis für längere Buchungszeiträume ergänzt (mit mailto-Link)
- **Trustpilot Starter-Widget im Hero** → zurück zu statischen Sternen mit Glasmorphismus-Pill, klickbar → scrollt zu #bewertungen
- **Trustpilot Grid-Widget** eingebettet (Template `539adbd6dec7e10e686debee`), volle Containerbreite für 4 Spalten auf Desktop
- **Trustpilot direkt vor Preise** verschoben
- **Standortkarte unter Preise** verschoben
- **Erklärvideo in So-geht's** integriert (eigene Sektion entfernt), weiße Balken am iframe entfernt
- **Standortkarte Popup-Links** → "Verfügbarkeit prüfen" statt "Jetzt buchen", Standort wird im Dropdown vorausgewählt
- **Sektions-Hintergrundfarben** korrigiert (abwechselnd weiß ↔ hellgrau ↔ dunkel)
- **Fahrzeug-Specs** bereinigt: 3 entfernt (Großpferd, Federung, 80km/h), Navi ergänzt
- **Redundanter Fahrzeug-Header** entfernt
- **Footer** — Logo weiß invertiert (52px), Text gekürzt, YouTube-Link eingetragen

### FAQ komplett überarbeitet

- 31 Fragen in 5 Kategorien mit Tab-Navigation
- Kategorien: Buchung & Registrierung, Fahrzeug & Ausstattung, Während der Fahrt, Kosten & Versicherung, Rückgabe & Notfälle
- "Alle"-Tab entfernt, Default = Buchung & Registrierung
- Schriftgrößen vergrößert (Fragen 1.05rem, Antworten 0.95rem)
- Schema.org FAQPage JSON-LD auf 8 Fragen aktualisiert

### Unterseiten erstellt

- **impressum.html** — Vollständiges Impressum
- **agb.html** — Alle 23 Paragraphen (§1-§23, Stand 28.01.2024)
- **datenschutz.html** — Kerninformationen + PDF-Download-Link auf Google Drive
- **weiterleitung-registrierung.html** — 3s Countdown-Animation, GTM Event `generate_lead`, Redirect zu fleetster
- **registrierung-erfolgreich.html** — Danke-Seite mit App-Download-Links, GTM Event `sign_up`
- Footer-Links in index.html aktualisiert (# → .html)
- Alle CTA-Links in index.html → `weiterleitung-registrierung.html` (statt direkt fleetster)

### Neue Fahrzeugbilder

- 11 professionelle STX-Fotos eingebaut (5 Exterior, 6 Interior)
- Galerie: 6 Spalten auf Desktop, Auto-Rotate 5s
- Alle Alt-Texte SEO-optimiert mit Keywords

### Tracking & Consent

- Cookiebot-ID `3d40de5d-ceaa-46b5-97af-cc86c9aed0fd` eingetragen
- Trustpilot Widget-IDs eingetragen (Hero Starter + Bewertungen Grid)
- YouTube-Link im Footer eingetragen
- Instagram-Link verifiziert

### Bildoptimierung

- Infografik PNG (7,2 MB) → JPG (240 KB) — 97% Ersparnis
- Dashboard komprimiert (532 KB → 105 KB)
- Duplikat STX-Bild entfernt, altes PNG gelöscht
- Alle Alt-Texte SEO-optimiert
- Gesamt img/: 16 MB → 8,6 MB

### Mobile-Optimierung

- Trustpilot-Widget Höhe auf Mobile begrenzt (480px max-height)
- "Alle Bewertungen auf Trustpilot ansehen" Link ergänzt

### Deployment

- GitHub Repository erstellt: `andreastheurer-tt2go/theurer-trucks-2go-webseite`
- `.gitignore` erstellt (Testprojekt, PDFs, Screenshots, .DS_Store ausgeschlossen)
- Erfolgreich zu GitHub gepusht
- GitHub Pages aktiviert (Deploy from branch main, root /)
- **Seite ist live**

---

## Session 3 — 08.04.2026 (Fortsetzung)

### Fleetster-API-Integration

- **Architektur-Entscheidung:** n8n auf bestehendem Hostinger VPS statt Cloudflare Workers
- **Fleetster API erfolgreich getestet** — Login, Locations (58 Standorte), Vehicles (87), Users (16.484), Bookings
- **Wichtige Erkenntnis:** Auth-Token ist die Top-Level `_id` (UUID), nicht die User-ID aus dem `user`-Objekt

### n8n Workflow 1: Standorte → GitHub (Cron)

- Workflow mehrfach iteriert wegen n8n-spezifischer Probleme:
  - Parallele Nodes → Fehler "Node hasn't been executed" → auf sequentiell umgestellt
  - `$env` in HTTP-Nodes unzuverlässig → Token direkt in Nodes eingetragen
  - Vehicles-Endpoint zu langsam (5000+ Items) → aus Workflow entfernt
  - Users-Endpoint Timeout (16.000+ Einträge) → aus Workflow entfernt
- **Finale Version:** Login → Standorte → JSON → SHA holen → GitHub Push
- **57 echte Standorte** erfolgreich nach `api/data.json` in GitHub gepusht
- Standorte erscheinen auf der Karte und im Dropdown
- Docker `.env` Problem: `$`-Zeichen im Passwort → `$$` als Escape
- GitHub Token: `$env` funktioniert nicht → direkt in Nodes eingetragen

### n8n Workflow 2: Live-Verfügbarkeitsprüfung (Webhook)

- Webhook-URL: `https://n8n.srv1381541.hstgr.cloud/webhook/tt2go-availability`
- HTTP Method `*` nicht supported in n8n v2.7.5 → auf `POST` geändert
- **Erfolgreich getestet** — Frontend sendet Station + Datum → Workflow prüft echte Buchungen bei Fleetster → Response mit Verfügbarkeit
- Frontend `availUrl` eingetragen und gepusht

### Frontend-Anpassungen für API

- `TT2GO_API` Config-Objekt im Script
- `loadStationData()` — lädt Standorte aus `api/data.json`
- `populateStations()` — befüllt Karte + Dropdown dynamisch
- `checkAvailability()` — POST an n8n Webhook statt Stub
- Graceful Fallback bei API-Ausfall (5 Demo-Standorte + Fake-Ergebnis)

### Offene Punkte (Session 3)

- [ ] Zahlen-Banner aktualisieren (63→87, 51→~49)
- [ ] Eigene Domain verbinden
- [ ] GTM Trigger konfigurieren (`generate_lead` + `sign_up`)
- [ ] In fleetster Redirect-URL auf Erfolgsseite setzen

---

## Session 4 — 09.04.2026

### Mobile Layout-Fixes

- **Sticky Mobile CTA** — IntersectionObserver blendet CTA aus wenn Hero sichtbar ist (kein doppelter Button mehr)
- **Verfügbarkeitsformular** — `white-space: normal` auf Mobile für Avail-Button, `width: 100%` + `min-width: 0` auf form-input/form-select, `text-overflow: ellipsis` für lange Standortnamen
- **Verfügbarkeits-Ergebnis** — `flex-wrap` + Button volle Breite auf Mobile (war rechts abgeschnitten)
- **Hero-Hintergrundbild** — Separates Hochformat-Bild für Mobile (`Mobil_Banner_3.jpg`, via Gemini Outpainting generiert). Desktop lädt weiterhin `truck-front.jpg`. Umschaltung via Media Query ab 1025px.
- **Sticky CTA nur Mobile** — IntersectionObserver prüft `window.innerWidth < 1025` bevor Inline-Style gesetzt wird, da dieser sonst die Desktop-CSS-Regel überschrieb

### Footer Unterseiten vereinheitlicht

- **Impressum, AGB, Datenschutz:** Logo auf 52px + `filter: brightness(0) invert(1)` (weiß, wie Hauptseite)
- **Beschreibungstext** gekürzt auf: "Car-Sharing für Pferdetransporter — sichere Mobilität für Pferd und Reiter."

### Textänderungen

- **Trustpilot-Bewertung** im Hero: 4,5 → 4,6
- **Stat-Bar:** "24/7 Online buchbar" → "24/7 Verfügbar"
- **Hero-Lead:** "Premium-Pferdetransporter an Reitställen" → "Premium-Pferdetransporter-Vermietung an Reitställen und Tierkliniken"
- **Fahrzeug-Sektion:** Button-Text "Jetzt buchen" → "Jetzt kostenlos registrieren"
- **Standort-Dropdown:** Kein doppelter Ort mehr — nur `s.name` (enthält bereits PLZ + Ort + Name)

### Preiskarten-Layout

- Pricing-Cards auf Flexbox umgestellt (`display: flex; flex-direction: column`)
- Feature-Liste `flex-grow: 1`, Button `margin-top: auto` → Buttons auf gleicher Höhe

### Custom Button-Icon (versucht, zurückgesetzt)

- Versuch 1: Inline-SVG Silhouette (Pferd+Transporter) via CSS-Mask — Icon war zu grob
- Versuch 2: Gemini-generiertes Bild als SVG via CSS-Mask — SVG 1.1MB, zu groß/detailliert
- Versuch 3: User-bereitgestellte ICON_STX.svg — 1.1MB, nicht als kleines Icon geeignet
- **Ergebnis:** Komplett zurückgesetzt auf `fa-truck-ramp-box` (Font Awesome)
- **Favicon-Versuch** ebenfalls zurückgesetzt (war Teil des gleichen Commits)
- **Erkenntnis:** Komplexe Illustrationen funktionieren nicht als 20px Button-Icons. Für Favicon: Bild liegt bereit als `img/horse-truck-icon-square.png`

### n8n Workflows — Archiviert-Filter

- **Fleetster Entity-Labels API** entdeckt: `GET /entitylabels` gibt alle Labels zurück
- **Label "Archiviert"** identifiziert: ID `69d64b9011fe02d420b21789`
- **Feld:** `extended.EntityLabels.labels` (Array von Label-IDs) — gleiche Struktur wie bei Users
- **9 archivierte Standorte** gefunden und ausgefiltert
- **Standorte-Workflow:** Filter im "JSON formatieren" Node eingebaut
- **Verfügbarkeits-Workflow:** `fields[extended.EntityLabels]=1` zur Fahrzeug-Abfrage ergänzt, Filter im "Fahrzeuge auswerten" Node
- **GitHub Token Problem:** Token musste direkt in n8n-Nodes eingetragen werden (nicht via `$env`). Bei Token-Erneuerung → SHA-Abruf gab 401, Workflow schlug fehl. Fix: `throw new Error()` mit Response-Inhalt für bessere Diagnose.

### Weitere Fixes (Session 4, Fortsetzung)

- **Gut Bentgerhof** fehlte auf der Webseite — GeoPosition in Fleetster war leer. Geocoding-Fallback via Nominatim versucht (fetch + https in n8n nicht erlaubt), gelöst über manuelle Koordinaten-Tabelle im Code-Node
- **Verfügbarkeitsabfrage** gegen Excel-Buchungsliste getestet — 18/18 korrekt nach Fix
- **Inaktive Fahrzeuge** wurden mitgezählt (Leezen: 34 statt 2). Fix: `active=true` in der Fahrzeug-API-Query
- **Webhook HTTP Method** von `*` auf `POST` geändert (in Workflow-JSON und n8n)
- **Enddatum Zeitzonenversatz** — `toISOString()` konvertierte in UTC (−2h Sommerzeit). Fix: lokale Zeitformatierung
- **Zahlen-Banner** aktualisiert
- **.com Domain** verbunden (GitHub Pages → Custom Domain)

### Domain & Deployment

- **.com Domain** verbunden (GitHub Pages Custom Domain)
- **.de Domain** verbunden (Strato DNS: A-Record `185.199.108.153`, CNAME www → `andreastheurer-tt2go.github.io`)
- **MX-Records** unangetastet (Google Mail)
- **Canonical-URL + Sitemap** zeigen bereits auf `theurer-trucks-2go.de` — kein Änderungsbedarf
- **fleetster Redirect-URL** auf `registrierung-erfolgreich.html` gesetzt
- **Erkenntnis:** GitHub Pages braucht immer `.html` in URLs — kein automatisches Routing wie bei WordPress

### Tracking komplett neu aufgesetzt

- **Alter GTM Container** `GTM-P4D6Z66` (WordPress) ersetzt durch neuen Container `GTM-KZDXGB75`
- Container-ID auf allen Seiten ausgetauscht (index, weiterleitung, registrierung-erfolgreich)
- **3 Seitenaufruf-Trigger** erstellt: Hauptseite (`/`), Weiterleitung, Registrierung erfolgreich
- **Meta Pixel** `914203592639470` via GTM eingerichtet (3 Tags: PageView auf All Pages, Lead auf Weiterleitung, CompleteRegistration auf Erfolgsseite)
- Google Ads und GA4 stehen noch aus

### Textänderungen

- "So geht's" → Registrierung: "Erstelle dir deinen Account - kostenlos und in unter 2 min"
- "So geht's" → Standort: "Finde den nächsten verfügbaren Transporter in deiner Nähe"
- Fahrzeug-Specs → Anhängerkupplung: "Passt für einen normalen 2 Pferde Anhänger"

### Offene Punkte

- [ ] Google Ads Conversions einrichten (Lead + Registrierung)
- [ ] GA4 einrichten

---

## Session 5 — 10.04.2026

### Projektordner aufgeräumt und strukturiert

- **Ungenutzte Assets ins `_archiv/` verschoben** (lokal, gitignored): 11 unbenutzte Bilder aus `img/`, 5 Root-PDFs, 3 Favicon-Dateien (nirgends ins HTML verlinkt), Altprojekte (`Testprojekt/`, `Screenshots/`, `Kundenavatar/`), Excel-Booking-Datei, neu erhaltene Truck-Icons und Mobile-Banner-Varianten
- **`DETAILS.md` und `HISTORY.md`** aus dem Root nach `docs/` verschoben
- **`.gitignore` überarbeitet** — saubere Struktur: `_archiv/` ignoriert, `docs/superpowers/` statt dem ganzen `docs/` Ordner (damit Projekt-Dokumentation getrackt wird)
- **Alle `.DS_Store` Dateien gelöscht**
- Commit `cc6fe8d`

### Google Ads Conversion Tracking komplett eingerichtet

Erstmaliges Setup von Google Ads Conversions für den bestehenden Account. Beim Durchklicken der Google-Ads-Oberfläche wurden **Altlasten eines früheren Setups** gefunden (vermutlich von Agentur "MKO"), die zuerst aufgeräumt werden mussten.

**Alt-Conversions archiviert:**
- `MKO Registrierung 2` — alte Primary-Conversion, hätte mit der neuen parallel gezählt
- `Fleetster Registrierung abgeschlossen` — GA4-Import-Conversion (aus verknüpfter GA4-Property 289955115), verwässerte das Reporting
- `Klick auf externen Link` — alte unbenutzte Sekundär-Conversion

**Kategorien `Anruf-Lead` und `Download`** (Kontostandard-Zielvorhaben) bleiben vorerst in Ruhe, da sie nicht stören.

**Neue saubere Conversions angelegt:**

| Name | Kategorie | Aktionsoptimierung | Wert | GTM-Trigger |
|---|---|---|---|---|
| `TT2GO - Lead - Weiterleitung Registrierung` | Klick auf externen Link | Sekundär | 2 € | Weiterleitung Registrierung |
| `TT2GO - Registrierung erfolgreich` | Registrierung | Primär | 5 € | Registrierung erfolgreich |

**Conversion-ID:** `AW-10902648523` (kontoweit)

**3 neue GTM-Tags gebaut** (Container `GTM-KZDXGB75`, Version 2):
1. `Google Ads - Remarketing` — Trigger "All Pages" (Pendant zum Meta Pixel PageView)
2. `Google Ads - Conversion - Lead` — Trigger "Weiterleitung Registrierung", Label `h8MHCJeU4JkcEMvt5M4o`, 2 €
3. `Google Ads - Conversion - Registrierung` — Trigger "Registrierung erfolgreich", Label `mA5LCIHJ4JkcEMvt5M4o`, 5 €

**Consent-Modus** für alle drei Tags gesetzt: `ad_storage`, `ad_user_data`, `ad_personalization` (Cookiebot-Integration).

**Preview-Test im Tag Assistant erfolgreich**: Alle Tags feuern bei den korrekten Triggern, parallel zum Meta Pixel auf den entsprechenden Seiten.

**Veröffentlicht** als GTM Version 2 "GTM Neue TT-2Go Webseite V1" um 22:19.

Commit `cfbabcb`.

### Erkenntnisse zum Google-Ads-Setup (für zukünftige Referenz)

- **Die Conversion-ID im GTM-Feld wird OHNE `AW-`-Präfix eingetragen** (`10902648523`), anders als im direkten gtag.js-Einbau. Das GTM-Interface ergänzt den Präfix intern.
- **"Falsch konfiguriert"-Status** bei einer Conversion-Aktion kann harmlos sein: Es heißt oft nur "kein Tag bisher gefunden", nicht "defekt". Nach dem GTM-Publish und ersten echten Events wechselt der Status automatisch.
- **Die Warnung "Kein Google-Tag im Container gefunden"** im GTM-Conversion-Tag-Editor ist eine Best-Practice-Empfehlung, kein Blocker. Conversion-Tags funktionieren auch ohne den übergeordneten Google-Tag.
- **Enhanced Conversions** wurden bewusst nicht aktiviert, weil auf den Conversion-Seiten (`weiterleitung-registrierung.html` und `registrierung-erfolgreich.html`) keine Nutzerdaten im Frontend verfügbar sind. Das bräuchte Server-Side Tracking oder fleetster-Integration.
- **GA4-Verknüpfung im Google-Ads-Konto beim Anlegen von Conversion-Datenquellen abgewählt**, um Doppelzählungen via GA4-Import zu verhindern. Die GA4-Property selbst (`289955115`) bleibt unangetastet und wird beim GA4-Setup morgen geprüft.

### Cookiebanner .de-Domain Problem behoben

Nach Domain-Umzug auf `.de` funktionierte der Cookiebot-Banner nicht mehr. Ursache: Die neue `.de`-Domain war im Cookiebot-Konto nicht als lizenziert hinterlegt. Fix: Domain in `manage.cookiebot.com` → Domaingruppen hinzugefügt. Problem war in 30 Sekunden behoben.

**Erkenntnis:** Cookiebot-Lizenzen sind pro Domain. Bei Domain-Wechseln immer zuerst prüfen, ob die neue Domain im Cookiebot-Konto registriert ist.

### CLAUDE.md Aktualisierung

- Tracking-Sektion um Google Ads Block ergänzt
- Offene Punkte: Google-Ads-Conversions gestrichen, neue Punkte ergänzt (Kampagnen-Audit, Meta-Ads-Setup, GA4-Property-Check)

### Offene Punkte nach Session 5

- [x] **Google Ads Kampagnen einrichten** → erledigt in Session 6
- [ ] **Meta Ads einrichten** — Facebook/Instagram Werbekonto, Kampagnen-Setup, Zielgruppen, Creatives
- [ ] **GA4 einrichten** — Property `289955115` "TheurerTrucks Renting Property" prüfen (Wer hat Zugriff? Sammelt sie Daten? Weiterverwenden oder neu anlegen?)
- [ ] **Enhanced Conversions** für Google Ads (Zukunftsthema, braucht Server-Side Tracking)

---

## Session 6 — 12.04.2026

### Google Ads Kampagnen komplett eingerichtet

**Analyse der bestehenden Kampagne:**
- Alte Kampagne `DE - TT2GO-Suche Neue Conversion 03/25` analysiert (CSV-Export mit 60+ Keywords, 4.890 Klicks, 1.521 € Spend in 30 Tagen)
- Erkenntnis: 0 Conversions trotz gutem Traffic — Ursache war defektes Conversion-Tracking (alte archivierte Conversions), nicht schlechte Keywords
- Top-Performer identifiziert: Brand-Keywords (CTR 30-48%, CPC 0,09-0,21 €), Städte-Keywords (CTR 17-22%), generische Pferdetransporter-Keywords (Hauptvolumen)
- Problem-Keywords identifiziert: Reiturlaub-Begriffe (30.000+ verschwendete Impressionen/Monat)

**Zwei neue Kampagnen aufgebaut:**

#### Kampagne A: `TT2GO - National - Search` (55 €/Tag)
- 3 Anzeigengruppen: Brand (11 KW exact match), Pferdetransporter (12 KW exact+phrase + 22 Städte), Pferdeanhänger (13 KW exact+phrase + 22 Städte)
- Städte-Keywords für 22 Großstädte im Einzugsgebiet der Stationen (≤50 km) — ermittelt via Haversine-Distanzberechnung gegen `api/data.json`
- Je 1 Responsive Search Ad pro Anzeigengruppe (15 Headlines, 4 Descriptions)
- 6 Sitelinks (Preise, Standorte, So funktioniert es, FAQ, STX Transporter, Jetzt registrieren)
- 8 Callouts
- 9 Negative Keywords (Reiturlaub-Begriffe, kampagnenweit)
- Conversion-Zielvorhaben: Kampagnenspezifisch → Registrierungen
- Suchnetzwerk-Partner: deaktiviert
- AI Max: deaktiviert

#### Kampagne B: `TT2GO - Neue Standorte - Search` (15 €/Tag)
- Duplikat von Kampagne A mit angepasstem Targeting
- Standort: 12 PLZ-Radien à 25 km (statt 50 km — Begründung: 25 km one-way = 50 km Gesamtweg bis der Mieter mit dem Transporter am eigenen Stall ist)
- Standort-Modus: **nur Präsenz** (nicht "Interesse"), damit nur Nutzer im physischen Einzugsgebiet die Anzeigen sehen
- Budget: 15 €/Tag

**Alte Kampagne pausiert:**
- `DE - TT2GO-Suche Neue Conversion 03/25` auf Pausiert gesetzt
- Keine parallele Ausspielung, um Keyword-Kannibalisierung und gespaltene Lerndaten zu vermeiden
- Daten und Screenshots gesichert unter `Google_Ads/Kampagne alt/`

### Strategische Entscheidungen und Erkenntnisse

- **Keyword-Optionen konservativ gewählt:** Exact Match + Phrase Match statt Broad Match. Broad Match erst nach 2-3 Wochen mit Conversion-Daten ergänzen.
- **Brand-Keywords in eigener Anzeigengruppe:** CTR 30-48% vs. 0,1-2,5% bei generischen Keywords — braucht eigene Anzeigen und eigene Performance-Auswertung
- **Städte-Keywords als Phrase Match:** 22 Großstädte im Einzugsgebiet der Stationen, CTR in alter Kampagne 17-22% (beste Performance aller Keyword-Typen)
- **25 km Radius statt 50 km:** Nutzerperspektive — Mieter fährt 25 km zum Standort + 25 km zurück zum eigenen Stall = 50 km bevor die eigentliche Reise beginnt
- **Präsenz statt Interesse:** Bei Radius-Targeting nur Nutzer im physischen Einzugsgebiet, keine "Interessierten" aus anderen Regionen
- **Alte Kampagne nicht parallel weiterlaufen lassen:** Trotz Lernphase der neuen Kampagnen — alte hatte 0 Conversion-Daten, ihr Smart-Bidding-Modell war nur auf Klicks optimiert, nicht auf Conversions. Parallelbetrieb hätte Lerndaten gespalten.

### Kampagnen-Blueprint

Vollständiges Planungsdokument unter `Google_Ads/Kampagnen-Blueprint.md` — enthält alle Keywords, Anzeigentexte, Sitelinks, Callouts, Einstellungen und eine Launch-Checkliste für Tag 1-30.

### GA4 Tracking eingerichtet

- Bestehende Property `289955115` "TheurerTrucks Renting Property" wiederverwendet (statt neu angelegt)
- 3 Properties im Konto gefunden: `289955115` (Haupt), `339242918` und `366022881` (beides automatisch migrierte UA-Properties — Altlast, nicht verwendet)
- 2 Datenstreams in der Property: "TheurerTrucks 2Go Website" (aktiv, Mess-ID `G-TJLDKKHJJT`) und "MonsterInsights" (WordPress-Altlast, ignoriert)
- **GTM-Tag:** "GA4 - Konfiguration" (Typ: Google-Tag), Trigger "Initialization - All Pages", Consent `analytics_storage`
- **GTM-Version 3** veröffentlicht
- **Echtzeit-Daten bestätigt** — GA4 empfängt Live-Daten von der Webseite
- GA4 Enhanced Measurement trackt automatisch: Seitenaufrufe, Scrolltiefe, ausgehende Klicks, Datei-Downloads, Website-Suche

### Offene Punkte nach Session 6

- [x] **Google Ads Optimierung (1. Runde)** → erledigt am 18.04.2026, siehe unten

---

## Session 7 — 18.04.2026

### Webseite: Standortkarte verschoben

- Sektion "Standorte" (Karte + PLZ-Suche) von Position 8 nach Position 2 verschoben (direkt nach Hero, vor Verfügbarkeitsprüfung)
- CTA "Verfügbarkeit prüfen" unter der Karte zeigt weiterhin auf `#verfuegbarkeit`

### Google Ads: Erste Performance-Analyse (nach ~5 Tagen)

**Gesamtperformance:**
- 10 Registrierungen für 184 € = **18,37 €/Registrierung**
- 419 Klicks, CTR 22,69%, CPC 0,44 €
- Zum Vergleich: Alte Kampagne hatte 0 Conversions bei 1.521 € in 30 Tagen

**Conversion-Analyse nach Anzeigengruppe:**

| Anzeigengruppe | Klicks | Kosten | Conv. | €/Conv. |
|---|---|---|---|---|
| Brand | 166 | 42,62 € | 5 | 8,52 € 🏆 |
| Pferdetransporter | 195 | 100,90 € | 3 | 33,63 € |
| Pferdeanhänger | 42 | 26,50 € | 1 | 26,50 € |
| Neue Standorte | 16 | 13,66 € | 1 | 9,65 € |

**Suchbegriffe-Analyse:**
- 116 einzigartige Suchbegriffe ausgewertet
- **Keine irrelevanten Begriffe** — negative Keywords greifen sauber (kein einziger Reiturlaub-Treffer)
- **"pferdesprinter mieten"** als neues konvertierendes Synonym entdeckt (1 Klick, 0,02 €, 1 Conversion!)
- Bundesland-Suchen identifiziert (NRW, Hessen, Brandenburg) — neues Keyword-Muster
- "pferdeanhänger ausleihen" als weiteres Synonym entdeckt
- Brand-Variante "theurer truck" (ohne s) mit 7 Klicks entdeckt

**Keywords ergänzt (beide Kampagnen):**
- `[pferdesprinter mieten]`, `"pferdesprinter mieten"` — neues Synonym
- `[theurer truck]` — Brand-Variante ohne 's'
- Bundesland-Keywords: `"pferdetransporter mieten nrw/bayern/hessen/niedersachsen/brandenburg/schleswig-holstein"`
- `"pferdeanhänger ausleihen"`, `"pferdetransporter ausleihen"` — neue Synonyme

**Strategische Erkenntnisse:**
- Brand-Keywords liefern 50% aller Conversions bei nur 23% der Kosten → Markenbekanntheit ist der stärkste Conversion-Hebel
- Städte-Keywords konvertieren exzellent (München 7,42 €/Conv., Düsseldorf 1,72 €/Conv.)
- Budget wird nicht voll ausgeschöpft (National ~65-75%, Neue Standorte ~15-20%) — Nischen-typisch
- Nächste Analyse ab ~02.05. mit dann genug Daten für Ziel-CPA-Evaluierung

### Offene Punkte nach Session 7

- [ ] **Google Ads Optimierung (2. Runde, ab ~02.05.)** — Suchbegriffe erneut prüfen, Ziel-CPA evaluieren, Radius Neue Standorte ggf. erhöhen
- [ ] **Meta Ads einrichten** — Alte MKO-Kampagnen pausieren, neue aufsetzen. 50 €/Tag Budget. 18 Video-Ads auf Frame.io.
- [ ] **GA4 mit Google Ads verknüpfen**
- [ ] **GA4 Key Events definieren**
- [ ] **Enhanced Conversions** (Zukunftsthema)
- [ ] **Favicon-Einbindung**
