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

Finale Reihenfolge:
1. Hero → 2. Verfügbarkeit → 3. Vertrauen (mit Video) → 4. Vorteile (Infografik) → 5. Zahlen-Banner → 6. Preise → 7. So geht's → 8. Standorte → 9. Fahrzeug-Detail → 10. Trustpilot → 11. Erklärvideo → 12. FAQ → 13. CTA-Band → 14. Footer

### Commits (chronologisch)

1. `feat: Projekt-Setup mit Assets und HTML-Grundgerüst`
2. `feat: CSS-Basis, Navbar, Hero, Verfügbarkeit, Vertrauen, Video-Showcase`
3. `feat: Fahrzeug, Ausstattung, So-gehts, Standorte, Trustpilot, Erklärvideo, Preise, FAQ, CTA-Band, Footer`
4. `feat: SEO-Dateien und Accessibility-Feinschliff`
5. `fix: Spec-Abweichungen korrigiert`
6. `Entferne Ausstattungs-Galerie Sektion`
7. `refactor: CSS auf Mobile-First umgebaut + Sticky Mobile CTA`
8. `fix: 4 inhaltliche Korrekturen`
9. `fix: Preise aktualisiert gemäß Preisblatt Stand 15.01.2024`
10. `fix: Vorteile-Sektion — Infografik-Bild statt Kacheln`
11. `fix: Zahlen-Banner unter "So einfach geht's" verschoben`
12. `fix: Video neben Trustpilot-Bewertungen (Side-by-Side Layout)`
13. `fix: Dieselkosten-Hinweis angepasst`
14. `feat: Zahlen-Banner, Preisrechner und Fahrzeug-Features-Diagramm`
15. `fix: Deine Vorteile über Preise verschoben`
16. `Revert "feat: Interaktive Hotspot-Grafik"` (Nutzer-Feedback: nicht gut)
17. `fix: Sektionsreihenfolge optimiert`
18. `fix: Zahlen-Banner zwischen Vertrauen und Preise verschoben`
19. `feat: Video in Vertrauens-Sektion integriert`
20. `feat: 5 Schritte statt 4`
21. `feat: PLZ-Suche mit Nominatim Geocoding`
22. `fix: STX Fahrzeug-Specs angepasst`
23. `fix: Redundanten Fahrzeug-Header entfernt`
24. `fix: Zahlen-Banner blauer Gradient`
25. `feat: Trustpilot-Sterne im Hero`
26. `fix: Trustpilot Hero-Widget Glasmorphismus`
27. `feat: Fahrt-Rechner ersetzt Preisrechner`

### Offene Punkte

Siehe CLAUDE.md → "Offene Punkte vor Go-Live"
