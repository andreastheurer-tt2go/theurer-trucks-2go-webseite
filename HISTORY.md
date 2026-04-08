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

### Offene Punkte

- [ ] Eigene Domain verbinden
- [ ] Fleetster-API anbinden (Cloudflare Worker als Proxy)
- [ ] GTM Trigger konfigurieren (`generate_lead` + `sign_up`)
- [ ] In fleetster Redirect-URL auf Erfolgsseite setzen
