# Google Ads Kampagnen-Blueprint

Erstellt am 12.04.2026 auf Basis der bestehenden Kampagne "DE - TT2GO-Suche Neue Conversion 03/25" (CSV-Export 12.03.–10.04.2026, 4.890 Klicks, 1.521 € Spend).

---

## Kampagne A: TT2GO - National - Search

### Kampagnen-Einstellungen

| Einstellung | Wert |
|---|---|
| **Kampagnenname** | `TT2GO - National - Search` |
| **Kampagnentyp** | Suchnetzwerk |
| **Marketingziel** | Leads |
| **Werbenetzwerke** | Nur Google Suchnetzwerk (**Suchnetzwerk-Partner DEAKTIVIEREN** — spart Streuverluste) |
| **Standort** | Deutschland (Land) |
| **Sprachen** | Deutsch |
| **Budget** | **55,00 €/Tag** |
| **Gebotsstrategie** | **Conversions maximieren** (ohne Ziel-CPA — erst setzen wenn genug Conversion-Daten da sind, ca. nach 30-50 Conversions) |
| **Conversion-Zielvorhaben** | Kampagnenspezifisch: **Registrierungen** (greift automatisch unsere `TT2GO - Registrierung erfolgreich` als Primary) |
| **Kundenakquisition** | Für Neu- und Bestandskunden dieselben Gebote |
| **AI Max** | Deaktiviert |
| **Automatisch erstellte Assets** | Deaktiviert |
| **Anzeigenrotation** | Optimieren: leistungsstärkste Anzeigen bevorzugt |
| **Start-/Enddatum** | Startdatum: heute, Enddatum: nicht festgelegt |

### Anzeigengruppen-Struktur (3 Gruppen)

Die alte Kampagne hatte alles in einer einzigen Anzeigengruppe ("AdSet 1"). Das ist suboptimal, weil Brand-Keywords (CTR 30-48%, CPC 0,09-0,21 €) und generische Keywords (CTR 0,1-2%, CPC 0,50-1,00 €) völlig unterschiedliches Verhalten haben und unterschiedliche Anzeigentexte brauchen.

---

#### Anzeigengruppe 1: Brand

**Zweck:** Eigene Markenbegriffe abfangen. Extrem günstig (CPC ~0,15 €), extrem hohe CTR (30-48%). Schützt vor Wettbewerbern, die auf euren Namen bieten.

**Keywords (Genau passend):**
```
[theurer trucks]
[theurer trucks to go]
[theurer trucks 2go]
[TheurerTrucks]
[theurer trucks mieten]
[theurer pferdetransporter]
[Theurer]
[tt2go]
[theurer trucks 2 go]
```

**Responsive Search Ad — Brand:**

Headlines (max. 30 Zeichen, mind. 10, ideal 15):
```
H1:  TheurerTrucks 2GO
H2:  Pferdetransporter mieten
H3:  Ab 165 € pro Tag
H4:  An 49 Standorten in DE
H5:  Führerschein Klasse B
H6:  24/7 Online buchbar
H7:  Kostenlos registrieren
H8:  STX Pferdetransporter
H9:  Carsharing für Pferde
H10: Jetzt Standort finden
H11: Einfach. Sicher. Flexibel.
H12: Ohne Anhängerführerschein
H13: Unter 3,5 Tonnen
H14: App + Online Buchung
H15: Über 16.500 Nutzer
```

Descriptions (max. 90 Zeichen, mind. 2, ideal 4):
```
D1: Miete dir deinen Pferdetransporter — an Reitställen deutschlandweit. Kostenlose Registrierung in 2 Min.
D2: Premium STX Pferdetransporter für 1-2 Pferde. Führerschein Klasse B reicht. Jetzt Standort finden!
D3: Car-Sharing für Pferdetransporter. Kein eigener Anhänger nötig. Buchung per App oder online, 24/7.
D4: Über 87 Fahrzeuge an 49 Standorten. Inkl. Kamera, Navi, Klimaanlage. Ab 165 €/Tag, 150 km frei.
```

Finale URL: `https://theurer-trucks-2go.de`

---

#### Anzeigengruppe 2: Pferdetransporter

**Zweck:** Nutzer, die aktiv nach Pferdetransporter-Miete suchen. Höchstes kommerzielles Volumen.

**Keywords (Mix aus Genau passend und Weitgehend passend):**
```
[Pferdetransporter mieten]
[Pferdetransporter leihen]
[Vermietung Pferdetransporter]
[Verleih Pferdetransporter]
[pferdetransporter mieten in der nähe]
[miete pferdetransporter]
pferdetransporter mieten
pferdetransporter leihen
Vermietung Pferdetransporter
Verleih Pferdetransporter
pferdetransporter mieten in der nähe
pferdetransporter selbstfahrer mieten
pferdetransporter 3 5t mieten
pferde transporter mieten
pferde lkw mieten
```

**Responsive Search Ad — Pferdetransporter:**

Headlines:
```
H1:  Pferdetransporter mieten
H2:  Ab 165 € pro Tag
H3:  TheurerTrucks 2GO
H4:  49 Standorte deutschlandweit
H5:  Führerschein Klasse B reicht
H6:  Für 1-2 Pferde
H7:  Kein Anhängerführerschein
H8:  Jetzt Standort finden
H9:  Kostenlos registrieren
H10: Unter 3,5t — Klasse B
H11: 150 km frei pro Tag
H12: STX Premium-Transporter
H13: 24/7 Online buchbar
H14: An Reitställen parken
H15: Einfach. Sicher. Flexibel.
```

Descriptions:
```
D1: Pferdetransporter mieten statt kaufen — an Reitställen in deiner Nähe. STX Transporter, Klasse B, ab 165 €/Tag.
D2: Car-Sharing für Pferdetransporter. Über 87 Fahrzeuge an 49 Standorten. Kostenlose Registrierung in 2 Min.
D3: Premium STX Pferdetransporter für 1-2 Pferde. Inkl. Kamera, Navi, Klimaanlage. Jetzt Verfügbarkeit prüfen!
D4: Kein eigener Anhänger nötig. Unter 3,5 Tonnen, Führerschein Klasse B reicht. Jetzt kostenlos registrieren.
```

Finale URL: `https://theurer-trucks-2go.de`

---

#### Anzeigengruppe 3: Pferdeanhänger

**Zweck:** Nutzer suchen mit dem Begriff "Pferdeanhänger" (technisch ein Anhänger, nicht ein Transporter — aber viele Nutzer verwechseln die Begriffe oder suchen beides). Zweithöchstes Volumen in der alten Kampagne.

**Keywords:**
```
[Pferdeanhänger mieten]
[pferdeanhänger leihen]
[Verleih Pferdeanhänger]
[Vermietung Pferdeanhänger]
[Pferdehänger mieten]
[pferdehänger leihen]
[anhänger pferde]
Pferdeanhänger mieten
pferdeanhänger leihen
Verleih Pferdeanhänger
Vermietung Pferdeanhänger
Pferdehänger mieten
pferdehänger leihen
pferdeanhänger mieten in der nähe
anhänger pferdeanhänger
```

**Responsive Search Ad — Pferdeanhänger:**

Headlines:
```
H1:  Pferdeanhänger mieten
H2:  Besser: Pferdetransporter
H3:  Ab 165 € pro Tag
H4:  TheurerTrucks 2GO
H5:  49 Standorte in DE
H6:  Kein Anhängerführerschein
H7:  Führerschein B reicht
H8:  Für 1-2 Pferde
H9:  Jetzt Standort finden
H10: Kostenlos registrieren
H11: STX Pferdetransporter
H12: An Reitställen parken
H13: 24/7 Online buchbar
H14: Sicherer als ein Hänger
H15: Unter 3,5t — Klasse B
```

Descriptions:
```
D1: Pferdetransporter statt Anhänger mieten — sicherer, komfortabler, Führerschein B reicht. Ab 165 €/Tag.
D2: TheurerTrucks 2GO: Premium STX Pferdetransporter an Reitställen in deiner Nähe. Kostenlos registrieren!
D3: Kein Anhängerführerschein nötig. Unter 3,5 Tonnen, inkl. Kamera und Navi. Jetzt Verfügbarkeit prüfen.
D4: Warum Anhänger, wenn es Transporter gibt? Car-Sharing für Pferdetransporter, über 87 Fahrzeuge deutschlandweit.
```

Finale URL: `https://theurer-trucks-2go.de`

---

### Negative Keywords (Kampagnenebene, für alle Anzeigengruppen)

Diese Keywords als **auszuschließende Keywords auf Kampagnenebene** hinzufügen (Typ: Weitgehend passend, damit alle Variationen erfasst werden):

```
reiturlaub
reiterferien
ferien mit pferd
urlaub mit pferd
pferdeurlaub
wanderritt
wanderreiten
reitferien
pferd verreisen
mit dem pferd verreisen
reiten urlaub
reiturlaub mit pferd
ferien mit eigenem pferd
urlaub mit dem eigenen pferd
urlaub eigenes pferd
pferdetransport buchen
pferd transportieren lassen
spedition pferd
pferdetransport unternehmen
pferdetransporter kaufen
pferdeanhänger kaufen
pferdetransporter gebraucht
pferdeanhänger gebraucht
pferdehänger kaufen
```

### Sitelinks (Kampagnen- oder Anzeigengruppenebene)

Aus der alten Kampagne übernehmen und anpassen:

| Sitelink-Text | Beschreibungszeile 1 | Beschreibungszeile 2 | URL |
|---|---|---|---|
| Die Preise | Ab 165 € pro Tag | 150 km frei, Mehrkilometer 0,46 € | `https://theurer-trucks-2go.de#preise` |
| Standorte finden | 49 Standorte deutschlandweit | An Reitställen in deiner Nähe | `https://theurer-trucks-2go.de#standorte` |
| So funktioniert es | In 5 Schritten zum Transporter | Kostenlose Registrierung | `https://theurer-trucks-2go.de#so-gehts` |
| Häufige Fragen | 31 Antworten zu Buchung & Co. | Alles was du wissen musst | `https://theurer-trucks-2go.de#faq` |
| Der STX Transporter | Für 1-2 Pferde, unter 3,5t | Klasse B, inkl. Kamera + Navi | `https://theurer-trucks-2go.de#fahrzeug` |
| Jetzt registrieren | Kostenlos in unter 2 Minuten | Sofort buchungsbereit | `https://theurer-trucks-2go.de/weiterleitung-registrierung.html` |

### Snippet-Erweiterungen

| Snippet-Header | Werte |
|---|---|
| Modelle | STX Pferdetransporter |
| Ausstattung | Pferdeüberwachungskamera, Navigationssystem, Klimaanlage, Sattelkammer, LED-Beleuchtung |
| Vorteile | In deiner Nähe, Stressfrei für dein Pferd, Kein Anhängerführerschein, Unter 3,5 Tonnen, 24/7 buchbar |

---

## Kampagne B: TT2GO - Neue Standorte - Search

### Kampagnen-Einstellungen

Identisch zu Kampagne A mit diesen Abweichungen:

| Einstellung | Wert |
|---|---|
| **Kampagnenname** | `TT2GO - Neue Standorte - Search` |
| **Budget** | **15,00 €/Tag** |
| **Standort** | **12 PLZ-Radien (je 50 km)** — siehe Standortliste unten |

### Standort-Targeting (12 Radien à 50 km)

In Google Ads unter Kampagnen-Einstellungen → Standorte → "Erweiterte Suche" → "Radius":

| # | PLZ | Ort | Radius |
|---|---|---|---|
| 1 | 40822 | Mettmann | 50 km |
| 2 | 14513 | Teltow | 50 km |
| 3 | 14624 | Dallgow-Döberitz | 50 km |
| 4 | 53501 | Grafschaft Birresdorf | 50 km |
| 5 | 32457 | Porta Westfalica | 50 km |
| 6 | 49439 | Steinfeld (Oldenburg) | 50 km |
| 7 | 53919 | Weilerswist | 50 km |
| 8 | 18279 | Lalendorf | 50 km |
| 9 | 73642 | Welzheim | 50 km |
| 10 | 24589 | Schülp bei Nortorf | 50 km |
| 11 | 08060 | Zwickau | 50 km |
| 12 | 01619 | Zeithain | 50 km |

**Hinweis:** PLZ 14513 (Teltow) und 14624 (Dallgow-Döberitz) liegen nur ~25 km auseinander — die 50-km-Radien überlappen sich. Das ist gewollt: Großraum Berlin wird mit doppelter Abdeckung beworben, weil dort zwei neue Standorte gleichzeitig eröffnen.

### Anzeigengruppen-Struktur

Gleiche 3 Gruppen (Brand, Pferdetransporter, Pferdeanhänger) mit denselben Keywords. Die Anzeigentexte werden leicht angepasst mit lokalerem Fokus:

**Angepasste Headlines (ersetze diese in den Anzeigen):**
```
H_lokal_1: Jetzt auch in deiner Nähe
H_lokal_2: Neuer Standort in der Region
H_lokal_3: Pferdetransporter vor Ort
H_lokal_4: Direkt am Reitstall
```

**Angepasste Description:**
```
D_lokal: Neu: Pferdetransporter jetzt auch in deiner Region verfügbar! STX Transporter am Reitstall abholen, Klasse B, ab 165 €/Tag.
```

### Negative Keywords

Identisch zu Kampagne A (gleiche Liste).

---

## Nach dem Launch: Checkliste für die erste Woche

- [ ] **Tag 1:** Beide Kampagnen aktiviert? Status "Aktiv" in Google Ads?
- [ ] **Tag 1:** Alte Kampagne `DE - TT2GO-Suche Neue Conversion 03/25` **pausiert** (erst NACHDEM die neuen auf "Aktiv" stehen)
- [ ] **Tag 2-3:** Google Ads → Conversions → Status der TT2GO-Conversions prüfen (sollte von "Falsch konfiguriert" zu "Aufzeichnung" wechseln)
- [ ] **Tag 3-5:** Suchbegriffe-Bericht prüfen (Kampagne → Keywords → Suchbegriffe). Zeigt, welche echten Suchanfragen die Anzeigen ausgelöst haben. Irrelevante Begriffe als negative Keywords hinzufügen.
- [ ] **Tag 7:** Budget-Verbrauch prüfen — werden 55 € (national) und 15 € (regional) täglich ausgeschöpft? Falls deutlich unter Budget: Keywords zu restriktiv oder Gebote zu niedrig.
- [ ] **Tag 7:** Erste Conversion-Daten prüfen. Falls 0 Conversions nach 7 Tagen: Tracking nochmal im GTM Preview-Modus verifizieren.
- [ ] **Tag 14:** Anzeigen-Performance prüfen. Welche Headlines/Descriptions hat Google am häufigsten kombiniert? Schwache Assets ersetzen.
- [ ] **Tag 30:** Gebotsstrategie evaluieren. Falls genug Conversions (>30): Optional Ziel-CPA testen.
