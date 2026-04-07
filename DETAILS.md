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

### CTA-Positionen (alle → fleetster-Registrierung)

| Position | GTM-Label | Zweck |
|---|---|---|
| Navbar | `navbar` | Dauerhaft sichtbar |
| Hero | `hero_cta` | Fängt Entschlossene sofort |
| Vorteile-Showcase | `video_cta` | Nach emotionalem Höhepunkt |
| Standortkarte | `map_cta` | Standort gefunden = Handlungsimpuls |
| Erklärvideo | `explainer_cta` | Letzte Zweifel ausgeräumt |
| CTA-Band | `final_cta` | Letzter Push am Ende |
| Sticky Mobile | `mobile_sticky` | Immer sichtbar auf Mobile |
| Fahrt-Rechner | `trip_calculator` | Nach Preisberechnung |
| Preiskarten | `preise_tag/wochenende/woche` | Direkt bei den Preisen |

### Tracking

- **Primäre Conversion:** Klick auf "Jetzt kostenlos registrieren" (alle CTAs)
- **Sekundäre Conversion:** Erfolgreiche Registrierung bei fleetster (Facebook Pixel auf Dankeseite)
- **Scroll-Depth, CTA-Performance:** Über GTM konfigurierbar
- Facebook-Lead-Qualität ist schlechter als Google, Google lässt sich nicht weiter skalieren

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
1. Nutzer gibt Entfernung zum Ziel ein (einfache Strecke)
2. Gesamtstrecke = Entfernung × 2 (Hin + Rück)
3. Nutzer wählt Tage (1-7)
4. Wenn Gesamtstrecke > Freikilometer: Mehrkilometer × 0,46 € = Aufpreis
5. Gesamtkosten = Tarif + Aufpreis

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
- **FAQPage** — 6 Fragen für Google Rich Snippets
- **Organization** — TheurerTrucks Renting GmbH mit Adresse und Social Links

Noch nicht implementiert (optional):
- LocalBusiness (für Standorte)
- Product (für den STX Pferdetransporter)

## Design-Entscheidungen aus der Session

1. **Statisches Hero-Bild statt Video-Loop** — bessere Performance + Mobile-freundlicher
2. **Stilles MP4-Video in Vertrauens-Sektion** — links neben den Karten im Hochformat, unterstützt die empathische Botschaft visuell
3. **Infografik-Bild statt interaktiver Hotspots** — Hotspot-Version wurde getestet und verworfen, statisches Bild wirkt besser
4. **Fahrt-Rechner statt Tarif-Rechner** — denkt in Fahrten ("Wie weit ist dein Ziel?") statt in Tarifen, spricht Julias Sprache
5. **Zahlen-Banner mit blauem Gradient** — als optische Trennung zwischen dunklen Sektionen
6. **5 statt 4 Schritte** — "App downloaden" als eigener Schritt hinzugefügt
7. **Trustpilot-Sterne im Hero** — Glasmorphismus-Pill als Trust-Element
8. **Preise früh in der Seite** — direkt nach Vertrauens-Sektion statt erst am Ende
