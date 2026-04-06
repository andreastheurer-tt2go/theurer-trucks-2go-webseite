# TheurerTrucks 2GO — Neue Webseite Implementierungsplan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Conversion-optimierter One-Pager für TheurerTrucks 2GO, der Besucher zur fleetster-Registrierung führt — basierend auf dem Testprojekt, erweitert um neue Sektionen und SEO-Optimierung.

**Architecture:** Statische Single-File HTML/CSS/JS-Seite. Das bestehende Testprojekt (`Testprojekt/TT2Go HTML Webseite/index.html`) dient als Referenz für Design-Tokens, CSS-Patterns und JS-Logik. Die neue Seite wird im Projektroot als `index.html` erstellt. Assets (Bilder, Video, Logo) werden aus dem Testprojekt kopiert. Fleetster-API-Integrationen starten als Stubs.

**Tech Stack:** HTML5, CSS3 (Custom Properties), Vanilla JavaScript, Google Fonts (Montserrat + Open Sans), Font Awesome 6.5, Vimeo Embed, Google Maps/Leaflet, Trustpilot Widget, Cookiebot, GTM.

**Spec:** `docs/superpowers/specs/2026-04-06-tt2go-webseite-design.md`

**Referenz-Code:** `Testprojekt/TT2Go HTML Webseite/index.html` — CSS-Variablen, Button-Styles, responsive Breakpoints, JS-Funktionen können übernommen werden.

---

## Dateistruktur

```
TT2GO_Neue_WEBSEITE/
├── index.html              # Neue Webseite (einzige Code-Datei)
├── img/                    # Bilder (kopiert aus Testprojekt)
│   ├── truck-front.jpg
│   ├── horse-stall.jpg
│   ├── interior-corridor.jpg
│   ├── dashboard.jpg
│   ├── rearview-camera.jpg
│   ├── ventilation-lights.jpg
│   ├── skylight.jpg
│   ├── navigation.jpg
│   └── truck-video.mp4
├── Logo/
│   └── TT2GO-Logo-rgb_56-182-255 (Website).png
├── robots.txt
├── sitemap.xml
└── docs/                   # Design-Dokumente (bereits vorhanden)
```

---

### Task 1: Projekt-Setup und Assets kopieren

**Files:**
- Create: `img/` (Verzeichnis mit kopierten Bildern)
- Create: `Logo/` (Verzeichnis mit kopiertem Logo)
- Create: `index.html` (Grundgerüst)

- [ ] **Step 1: Assets aus dem Testprojekt kopieren**

```bash
cp -r "Testprojekt/TT2Go HTML Webseite/img" ./img
cp -r "Testprojekt/TT2Go HTML Webseite/Logo" ./Logo
cp "Testprojekt/TT2Go HTML Webseite/2ZgvgJlvB328b7948a-24c0-434f-bf18-01f1345542a0.mp4" ./img/truck-video.mp4
```

Prüfe: `ls img/` sollte 9 Dateien zeigen (8 JPGs + 1 MP4). `ls Logo/` sollte das PNG-Logo enthalten.

- [ ] **Step 2: HTML-Grundgerüst erstellen**

Erstelle `index.html` mit folgendem Inhalt:

```html
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TheurerTrucks 2GO | Pferdetransporter mieten — Car-Sharing deutschlandweit</title>
    <meta name="description" content="Pferdetransporter mieten ab 149€/Tag. Car-Sharing an Reitställen in ganz Deutschland. Führerschein Klasse B genügt. Jetzt kostenlos registrieren!">
    <meta name="keywords" content="Pferdetransporter mieten, Pferdetransporter Car-Sharing, Pferd transportieren Klasse B, Pferdetransporter ohne Anhängerführerschein, Pferdetransporter tageweise mieten">
    <link rel="canonical" href="https://www.theurer-trucks-2go.de">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Open+Sans:wght@400;500;600&display=swap" rel="stylesheet">

    <!-- Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

    <!-- Preload Hero Image -->
    <link rel="preload" as="image" href="img/truck-front.jpg">

    <!-- Cookiebot -->
    <script id="Cookiebot" src="https://consent.cookiebot.com/uc.js" data-cbid="DEINE-COOKIEBOT-ID" data-blockingmode="auto" type="text/javascript"></script>

    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-P4D6Z66');</script>

    <style>
        /* CSS wird in den folgenden Tasks eingefügt */
    </style>
</head>
<body>
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P4D6Z66"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>

    <!-- Sektionen werden in den folgenden Tasks eingefügt -->

    <script>
        // JavaScript wird in den folgenden Tasks eingefügt
    </script>
</body>
</html>
```

- [ ] **Step 3: Seite im Browser öffnen und prüfen**

```bash
open index.html
```

Erwartung: Leere weiße Seite, keine Konsolenfehler. Fonts und Font Awesome laden (prüfe Network-Tab).

- [ ] **Step 4: Commit**

```bash
git add index.html img/ Logo/
git commit -m "feat: Projekt-Setup mit Assets und HTML-Grundgerüst"
```

---

### Task 2: CSS-Basis — Custom Properties, Reset, Layout-Helper, Buttons

**Files:**
- Modify: `index.html` (CSS innerhalb `<style>`)

- [ ] **Step 1: CSS Custom Properties einfügen**

Übernimm die CSS Custom Properties aus dem Testprojekt (`Testprojekt/TT2Go HTML Webseite/index.html`, Zeilen 25-65) — die komplette `:root`-Deklaration mit allen Farben, Schatten, Radien, Transitions.

- [ ] **Step 2: Reset, Base-Styles und Layout-Helper einfügen**

Übernimm aus dem Testprojekt:
- Reset (`*, *::before, *::after` Box-Sizing, `html` Scroll-Behavior, `body` Font-Family, `h1-h5` Styling, `a`, `img`, `button` Resets)
- `body::before` Top-Accent-Line (3px Gradient-Linie)
- `.container` (max-width 1200px, padding 28px)
- `.section` (padding 110px), `.section--light`, `.section--dark`
- `.section-header`, `.section-tag`, `.section-title`, `.section-subtitle`

- [ ] **Step 3: Button-Klassen einfügen**

Übernimm aus dem Testprojekt die kompletten Button-Styles:
- `.btn` Basis
- `.btn--primary` (blau mit Schatten)
- `.btn--ghost` (transparent mit Blur)
- `.btn--outline` (transparent mit blauer Border)
- `.btn--white` (weiß mit blauem Text)
- `.btn--lg`, `.btn--full`
- Alle `:hover`-States und Transitions

- [ ] **Step 4: Prüfen**

```bash
open index.html
```

Erwartung: Leere weiße Seite mit 3px blauer Gradient-Linie am oberen Rand. Keine Konsolenfehler.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: CSS-Basis mit Design-Tokens, Reset und Button-Styles"
```

---

### Task 3: Navbar

**Files:**
- Modify: `index.html` (HTML + CSS + JS)

- [ ] **Step 1: Navbar-CSS einfügen**

Übernimm die Navbar-Styles aus dem Testprojekt:
- `.navbar` (fixed, z-index 900, transparent)
- `.navbar.scrolled` (weiß, Blur, Schatten)
- `.navbar__inner`, `.navbar__logo`, `.navbar__nav`, `.navbar__cta`, `.navbar__burger`
- `.mobile-menu`, `.mobile-menu.open`, `.mobile-menu__close`, `.mobile-menu__nav`, `.mobile-menu__cta`
- Hover-Underline-Animation für Nav-Links

- [ ] **Step 2: Navbar-HTML einfügen**

Füge nach dem GTM-noscript-Tag ein:

```html
<nav class="navbar" id="navbar">
    <div class="container navbar__inner">
        <a href="#" class="navbar__logo">
            <img src="Logo/TT2GO-Logo-rgb_56-182-255 (Website).png" alt="TheurerTrucks 2GO Logo" height="38">
        </a>
        <div class="navbar__nav">
            <a href="#so-gehts">So geht's</a>
            <a href="#fahrzeug">Fahrzeug</a>
            <a href="#standorte">Standorte</a>
            <a href="#preise">Preise</a>
            <a href="#faq">FAQ</a>
        </div>
        <a href="https://theurer-trucks-2go.fleetster.de" target="_blank" rel="noopener"
           class="btn btn--primary navbar__cta"
           onclick="dataLayer.push({'event':'cta_click','cta_location':'navbar'})">
            Jetzt registrieren
        </a>
        <button class="navbar__burger" id="burgerBtn" aria-label="Menü öffnen">
            <i class="fas fa-bars"></i>
        </button>
    </div>
</nav>

<div class="mobile-menu" id="mobileMenu">
    <button class="mobile-menu__close" id="mobileClose" aria-label="Menü schließen">
        <i class="fas fa-times"></i>
    </button>
    <div class="mobile-menu__nav">
        <a href="#so-gehts">So geht's</a>
        <a href="#fahrzeug">Fahrzeug</a>
        <a href="#standorte">Standorte</a>
        <a href="#preise">Preise</a>
        <a href="#faq">FAQ</a>
    </div>
    <a href="https://theurer-trucks-2go.fleetster.de" target="_blank" rel="noopener"
       class="btn btn--primary btn--full mobile-menu__cta"
       onclick="dataLayer.push({'event':'cta_click','cta_location':'navbar_mobile'})">
        Jetzt registrieren
    </a>
</div>
```

- [ ] **Step 3: Navbar-JavaScript einfügen**

Füge im `<script>`-Block ein:

```javascript
// Navbar Scroll-Effekt
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// Mobile Menu
const burgerBtn = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');

burgerBtn.addEventListener('click', () => mobileMenu.classList.add('open'));
mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
mobileMenu.querySelectorAll('a').forEach(link =>
    link.addEventListener('click', () => mobileMenu.classList.remove('open'))
);
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        burgerBtn.focus();
    }
});
```

- [ ] **Step 4: Prüfen**

Im Browser: Navbar sichtbar mit Logo und Links. Scroll-Effekt (transparent → weiß). Mobile-Menü bei schmalem Fenster. Alle Links funktionieren (scrollen zu noch nicht existierenden Sektionen ist OK).

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: Navbar mit Scroll-Effekt und Mobile-Menü"
```

---

### Task 4: Hero-Sektion

**Files:**
- Modify: `index.html` (HTML + CSS)

- [ ] **Step 1: Hero-CSS einfügen**

Übernimm Hero-Styles aus dem Testprojekt:
- `.hero` (min-height 100vh, Hintergrundbild mit Gradient-Overlay)
- `.hero__content`, `.hero__pill`, `.live-dot`, `@keyframes livepulse`
- `.hero__title` (mit `em` Gradient-Styling für farbigen Text)
- `.hero__lead`, `.hero__license`, `.hero__actions`
- `.hero__statbar`, `.hero__stats`, `.hero__stat`, `.hero__stat-val`, `.hero__stat-lbl`

- [ ] **Step 2: Hero-HTML einfügen**

Füge nach dem Mobile-Menu-Div ein:

```html
<section class="hero">
    <div class="container">
        <div class="hero__content">
            <div class="hero__pill">
                <span class="live-dot"></span> Car-Sharing für Pferdetransporter
            </div>
            <h1 class="hero__title">
                Entspannt transportieren.<br>
                <em>Sicher ankommen.</em>
            </h1>
            <p class="hero__lead">
                Premium-Pferdetransporter an Reitställen in ganz Deutschland. Einfach per App buchen — Führerschein Klasse B genügt.
            </p>
            <p class="hero__license">
                <i class="fas fa-check-circle"></i> Unter 3,5t — kein Anhängerführerschein nötig
            </p>
            <div class="hero__actions">
                <a href="https://theurer-trucks-2go.fleetster.de" target="_blank" rel="noopener"
                   class="btn btn--primary btn--lg"
                   onclick="dataLayer.push({'event':'cta_click','cta_location':'hero'})">
                    Jetzt kostenlos registrieren <i class="fas fa-arrow-right"></i>
                </a>
                <a href="#so-gehts" class="btn btn--ghost btn--lg">So funktioniert's</a>
            </div>
        </div>
    </div>
    <div class="hero__statbar">
        <div class="container">
            <div class="hero__stats">
                <div class="hero__stat">
                    <div class="hero__stat-val">100%</div>
                    <div class="hero__stat-lbl">Versichert</div>
                </div>
                <div class="hero__stat">
                    <div class="hero__stat-val">24/7</div>
                    <div class="hero__stat-lbl">Online buchbar</div>
                </div>
                <div class="hero__stat">
                    <div class="hero__stat-val">Klasse B</div>
                    <div class="hero__stat-lbl">Führerschein</div>
                </div>
                <div class="hero__stat">
                    <div class="hero__stat-val">1–2</div>
                    <div class="hero__stat-lbl">Pferde pro Fahrt</div>
                </div>
            </div>
        </div>
    </div>
</section>
```

- [ ] **Step 3: Prüfen**

Im Browser: Fullscreen Hero mit Truck-Bild-Hintergrund, Gradient-Overlay, Headline, zwei Buttons, Statistik-Bar am unteren Rand. Responsive testen (Desktop + Mobile).

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: Hero-Sektion mit Headline, CTAs und Statistik-Bar"
```

---

### Task 5: Verfügbarkeitsprüfung

**Files:**
- Modify: `index.html` (HTML + CSS + JS)

- [ ] **Step 1: Verfügbarkeits-CSS einfügen**

Übernimm Verfügbarkeits-Styles aus dem Testprojekt:
- `.avail` (Gradient-Hintergrund mit dekorativen Pseudo-Elementen)
- `.avail__card`, `.avail__form`, `.form-group`, `.form-label`, `.form-input`
- `.avail__btn`, `.avail__result`, `.avail__result.visible`
- `@keyframes shake` für Validierungsfehler

**Änderung gegenüber Testprojekt:** Das Formular bekommt ein drittes Feld — ein Stations-Dropdown. Passe das Grid an: `grid-template-columns: 1fr 1fr 1fr auto` (4 Spalten: Start, Ende, Station, Button).

Zusätzliches CSS für das Dropdown:

```css
.form-select {
    width: 100%;
    padding: 14px 18px;
    border: 2px solid var(--border);
    border-radius: var(--radius);
    font-family: 'Open Sans', sans-serif;
    font-size: 0.95rem;
    color: var(--text-dark);
    background: var(--white);
    transition: var(--transition);
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23718096' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 16px center;
    cursor: pointer;
}
.form-select:focus {
    border-color: var(--primary);
    outline: none;
    box-shadow: 0 0 0 4px rgba(0, 136, 207, 0.1);
}
```

- [ ] **Step 2: Verfügbarkeits-HTML einfügen**

Füge nach der Hero-Sektion ein:

```html
<section class="avail" id="verfuegbarkeit">
    <div class="container">
        <div class="avail__card" id="availCard">
            <h2 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 4px; color: var(--text-dark);">Wann brauchst du einen Transporter?</h2>
            <p style="color: var(--text-light); margin-bottom: 24px;">Prüfe in Sekunden, ob ein Fahrzeug an deinem Wunschstandort frei ist.</p>
            <div class="avail__form" id="availForm">
                <div class="form-group">
                    <label class="form-label"><i class="fas fa-calendar"></i> Abholung</label>
                    <input type="datetime-local" class="form-input" id="startDate" required>
                </div>
                <div class="form-group">
                    <label class="form-label"><i class="fas fa-calendar-check"></i> Rückgabe</label>
                    <input type="datetime-local" class="form-input" id="endDate" required>
                </div>
                <div class="form-group">
                    <label class="form-label"><i class="fas fa-location-dot"></i> Station</label>
                    <select class="form-select" id="stationSelect" required>
                        <option value="">Station wählen...</option>
                        <option value="hamburg">Hamburg – Reitstall Müller</option>
                        <option value="berlin">Berlin – Pferdehof am See</option>
                        <option value="muenchen">München – Reitanlage Süd</option>
                        <option value="koeln">Köln – Gestüt Rheinland</option>
                        <option value="hannover">Hannover – Reitstall Nordheide</option>
                    </select>
                </div>
                <button class="btn btn--primary avail__btn" onclick="checkAvailability()">
                    <span>Verfügbarkeit prüfen</span>
                    <i class="fas fa-spinner fa-spin" style="display:none"></i>
                </button>
            </div>
            <div class="avail__result" id="availResult">
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                    <i class="fas fa-check-circle" style="color: var(--primary-bright); font-size: 1.3rem;"></i>
                    <strong style="color: var(--text-dark);">Transporter verfügbar!</strong>
                </div>
                <p style="color: var(--text-light); margin-bottom: 16px;">Ein STX Pferdetransporter ist an deinem gewählten Standort im Wunschzeitraum frei.</p>
                <a href="https://theurer-trucks-2go.fleetster.de" target="_blank" rel="noopener"
                   class="btn btn--primary"
                   onclick="dataLayer.push({'event':'cta_click','cta_location':'availability_result'})">
                    Jetzt buchen <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </div>
    </div>
</section>
```

Hinweis: Die Stationsliste ist ein Stub. In Zukunft werden die Stationen dynamisch aus der Fleetster-API geladen.

- [ ] **Step 3: Verfügbarkeits-JavaScript einfügen**

Füge im `<script>`-Block ein:

```javascript
// Verfügbarkeitsprüfung — Datum-Min-Logik
(function setMinDates() {
    const now = new Date();
    now.setSeconds(0, 0);
    const pad = n => String(n).padStart(2, '0');
    const localISO = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;

    const startDate = document.getElementById('startDate');
    const endDate = document.getElementById('endDate');
    startDate.min = localISO;
    endDate.min = localISO;

    startDate.addEventListener('change', () => {
        endDate.min = startDate.value;
        if (!endDate.value || endDate.value <= startDate.value) {
            const next = new Date(startDate.value);
            next.setDate(next.getDate() + 1);
            endDate.value = `${next.getFullYear()}-${pad(next.getMonth() + 1)}-${pad(next.getDate())}T${pad(next.getHours())}:${pad(next.getMinutes())}`;
        }
    });
})();

// Verfügbarkeit prüfen (Stub)
function checkAvailability() {
    const startDate = document.getElementById('startDate');
    const endDate = document.getElementById('endDate');
    const station = document.getElementById('stationSelect');
    const card = document.getElementById('availCard');
    const result = document.getElementById('availResult');
    const btn = document.querySelector('.avail__btn');

    if (!startDate.value || !endDate.value || !station.value) {
        card.classList.add('shake');
        setTimeout(() => card.classList.remove('shake'), 500);
        return;
    }
    if (new Date(endDate.value) <= new Date(startDate.value)) {
        alert('Das Rückgabedatum muss nach dem Abholdatum liegen.');
        return;
    }

    // Loading-State
    btn.querySelector('span').style.display = 'none';
    btn.querySelector('i').style.display = 'inline-block';
    btn.disabled = true;

    setTimeout(() => {
        btn.querySelector('span').style.display = 'inline';
        btn.querySelector('i').style.display = 'none';
        btn.disabled = false;
        result.classList.add('visible');
        result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 1200);
}
```

- [ ] **Step 4: Prüfen**

Im Browser: Formular mit 3 Feldern + Button. Datum-Validierung testen. Leere Felder → Shake-Animation. Korrekte Eingabe → Loading → Ergebnis-Karte erscheint.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: Verfügbarkeitsprüfung mit Stations-Dropdown (Stub)"
```

---

### Task 6: Vertrauens-Sektion

**Files:**
- Modify: `index.html` (HTML + CSS)

- [ ] **Step 1: Vertrauens-CSS einfügen**

```css
/* Vertrauens-Sektion */
.trust-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    max-width: 880px;
    margin: 0 auto;
}

.trust-card {
    background: var(--light);
    border-radius: var(--radius-lg);
    padding: 32px;
    border: 1px solid var(--border);
    transition: var(--transition);
}

.trust-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow);
    border-color: var(--primary);
}

.trust-card__quote {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
}

.trust-card__icon {
    width: 44px;
    height: 44px;
    background: var(--primary-ghost);
    border-radius: var(--radius);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    flex-shrink: 0;
}

.trust-card__cite {
    font-family: 'Open Sans', sans-serif;
    font-size: 0.88rem;
    color: var(--text-light);
    font-style: italic;
}

.trust-card__title {
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    font-size: 1.05rem;
    color: var(--text-dark);
    margin-bottom: 8px;
}

.trust-card__text {
    font-size: 0.92rem;
    color: var(--text);
    line-height: 1.7;
}
```

Responsive-Ergänzung (in den bestehenden Media Queries):
```css
/* @media (max-width: 768px) */
.trust-grid { grid-template-columns: 1fr; }
```

- [ ] **Step 2: Vertrauens-HTML einfügen**

Füge nach der Verfügbarkeitssektion ein:

```html
<section class="section" id="vertrauen">
    <div class="container">
        <div class="section-header">
            <span class="section-tag"><i class="fas fa-shield-heart"></i> Warum TheurerTrucks 2GO</span>
            <h2 class="section-title">Entspannt transportieren statt Stress</h2>
            <p class="section-subtitle">Wir kennen die Herausforderungen beim Pferdetransport — und haben sie gelöst.</p>
        </div>
        <div class="trust-grid">
            <div class="trust-card reveal">
                <div class="trust-card__quote">
                    <div class="trust-card__icon"><i class="fas fa-id-card"></i></div>
                    <span class="trust-card__cite">"Ich hab keinen Anhängerführerschein..."</span>
                </div>
                <div class="trust-card__title">Führerschein Klasse B reicht</div>
                <p class="trust-card__text">Unser STX Transporter wiegt unter 3,5t. Du fährst ihn mit deinem normalen PKW-Führerschein — kein BE, kein C1 nötig.</p>
            </div>
            <div class="trust-card reveal delay-1">
                <div class="trust-card__quote">
                    <div class="trust-card__icon"><i class="fas fa-heart-pulse"></i></div>
                    <span class="trust-card__cite">"Hoffentlich verletzt sich mein Pferd nicht..."</span>
                </div>
                <div class="trust-card__title">Sicherheit auf höchstem Niveau</div>
                <p class="trust-card__text">Pferdeüberwachungskamera, rutschfester Gummiboden, LED-Beleuchtung und komfortable Federung. Dein Pferd reist sicher und stressfrei.</p>
            </div>
            <div class="trust-card reveal delay-2">
                <div class="trust-card__quote">
                    <div class="trust-card__icon"><i class="fas fa-horse"></i></div>
                    <span class="trust-card__cite">"Was ist, wenn sich mein Pferd nicht verladen lässt?"</span>
                </div>
                <div class="trust-card__title">Einfaches Verladen — ohne Stress</div>
                <p class="trust-card__text">Breite Rampe, niedriger Einstieg und viel Platz machen das Verladen deutlich einfacher als beim klassischen Anhänger.</p>
            </div>
            <div class="trust-card reveal delay-3">
                <div class="trust-card__quote">
                    <div class="trust-card__icon"><i class="fas fa-piggy-bank"></i></div>
                    <span class="trust-card__cite">"Lohnt sich ein eigener Anhänger?"</span>
                </div>
                <div class="trust-card__title">Nur zahlen wenn du fährst</div>
                <p class="trust-card__text">Kein Kauf, keine Stellplatzkosten, kein TÜV. Ab 149€/Tag mietest du einen Premium-Transporter — inklusive Vollkasko-Versicherung.</p>
            </div>
        </div>
    </div>
</section>
```

- [ ] **Step 3: Prüfen**

Im Browser: 4 Karten im 2x2 Grid (Desktop), gestapelt auf Mobile. Hover-Effekt (Anhebung + Schatten). Zitate kursiv, Lösungen fett.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: Vertrauens-Sektion mit 4 Angst-zu-Lösung-Karten"
```

---

### Task 7: Video-Showcase (Stiller MP4-Loop)

**Files:**
- Modify: `index.html` (HTML + CSS)

- [ ] **Step 1: Video-Showcase-CSS einfügen**

Übernimm die Video-Showcase-Styles aus dem Testprojekt:
- `.video-showcase` (dunkler Hintergrund)
- `.video-showcase__inner` (2-spaltige Grid)
- `.video-showcase__media` (Video-Container mit object-fit cover)
- `.video-showcase__content` (Text-Seite mit Padding)
- `.video-showcase__tag`, `.video-showcase__title`, `.video-showcase__text`

- [ ] **Step 2: Video-Showcase-HTML einfügen**

Füge nach der Vertrauens-Sektion ein:

```html
<section class="video-showcase">
    <div class="video-showcase__inner">
        <div class="video-showcase__media">
            <video autoplay muted loop playsinline poster="img/truck-front.jpg">
                <source src="img/truck-video.mp4" type="video/mp4">
            </video>
        </div>
        <div class="video-showcase__content">
            <div class="video-showcase__tag"><i class="fas fa-play-circle"></i> Erlebe unseren Transporter</div>
            <h2 class="video-showcase__title">Professionell gebaut — für dein Pferd</h2>
            <p class="video-showcase__text">
                Unser STX Pferdetransporter auf Renault Master Basis vereint Sicherheit, Komfort und einfache Handhabung. Überzeuge dich selbst.
            </p>
            <ul style="list-style: none; padding: 0; margin: 0 0 32px 0; display: flex; flex-direction: column; gap: 12px;">
                <li style="display: flex; align-items: center; gap: 10px; color: rgba(255,255,255,0.8); font-size: 0.95rem;">
                    <i class="fas fa-check" style="color: var(--primary-bright);"></i> Pferde-Überwachungskamera während der Fahrt
                </li>
                <li style="display: flex; align-items: center; gap: 10px; color: rgba(255,255,255,0.8); font-size: 0.95rem;">
                    <i class="fas fa-check" style="color: var(--primary-bright);"></i> Komfortable Federung für stressfreien Transport
                </li>
                <li style="display: flex; align-items: center; gap: 10px; color: rgba(255,255,255,0.8); font-size: 0.95rem;">
                    <i class="fas fa-check" style="color: var(--primary-bright);"></i> Platz für 1 Großpferd oder 2 kleinere Pferde
                </li>
                <li style="display: flex; align-items: center; gap: 10px; color: rgba(255,255,255,0.8); font-size: 0.95rem;">
                    <i class="fas fa-check" style="color: var(--primary-bright);"></i> Sattelkammer &amp; 5 Sitzplätze inklusive
                </li>
            </ul>
            <a href="https://theurer-trucks-2go.fleetster.de" target="_blank" rel="noopener"
               class="btn btn--primary btn--lg"
               onclick="dataLayer.push({'event':'cta_click','cta_location':'video_showcase'})">
                Jetzt kostenlos registrieren <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    </div>
</section>
```

- [ ] **Step 3: Prüfen**

Im Browser: Dunkle Sektion, Video links (autoplay, stumm, Loop), Text rechts mit Checkliste und blauem CTA-Button. Responsive: Video oben, Text unten auf Mobile.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: Video-Showcase mit stummem MP4-Loop und CTA #2"
```

---

### Task 8: Fahrzeug-Detail und Ausstattungs-Galerie

**Files:**
- Modify: `index.html` (HTML + CSS + JS)

- [ ] **Step 1: Fahrzeug-CSS einfügen**

Übernimm aus dem Testprojekt:
- `.vehicle` Sektion-Styles (dunkler Hintergrund mit radial-gradient Akzenten)
- `.vehicle__showcase` (2-spaltige Grid)
- `.vehicle__gallery`, `.vehicle__main`, `.vehicle__thumbs`, `.vehicle__thumb`, `.vehicle__thumb.active`
- `.vehicle__info`, `.vehicle__name`, `.vehicle__tagline`, `.vehicle__desc`
- `.vehicle__specs`, `.vehicle__spec`, `.vehicle__spec-icon`

- [ ] **Step 2: Fahrzeug-HTML einfügen**

Übernimm die Fahrzeug-Sektion aus dem Testprojekt (Zeilen ca. 1853-1976) — die komplette Sektion mit Bildergalerie und Feature-Liste. Behalte `id="fahrzeug"`.

- [ ] **Step 3: Ausstattungs-CSS einfügen**

Übernimm aus dem Testprojekt:
- `.gallery-grid` (4-spaltige Grid)
- `.gallery-grid__item`, `.gallery-grid__item--wide`
- `.gallery-grid__label`
- Hover-Effekte (Zoom + Overlay)

- [ ] **Step 4: Ausstattungs-HTML einfügen**

Übernimm die Ausstattungs-Sektion aus dem Testprojekt (Zeilen ca. 1978-2017) mit `id="ausstattung"`.

- [ ] **Step 5: Galerie-JavaScript einfügen**

Übernimm die Galerie-Logik aus dem Testprojekt:

```javascript
// Fahrzeug-Bildergalerie
const mainImg = document.getElementById('mainVehicleImg');
const thumbs = document.querySelectorAll('.vehicle__thumb');
let galleryInterval;

function switchImage(thumb) {
    mainImg.style.opacity = '0';
    setTimeout(() => {
        mainImg.src = thumb.dataset.src;
        mainImg.alt = thumb.dataset.alt || 'STX Pferdetransporter';
        mainImg.style.opacity = '1';
    }, 300);
    thumbs.forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
}

function startGalleryAutoplay() {
    galleryInterval = setInterval(() => {
        const current = document.querySelector('.vehicle__thumb.active');
        const next = current.nextElementSibling || thumbs[0];
        switchImage(next);
    }, 5000);
}

function stopGalleryAutoplay() {
    clearInterval(galleryInterval);
}

thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
        stopGalleryAutoplay();
        switchImage(thumb);
        startGalleryAutoplay();
    });
});

startGalleryAutoplay();
```

- [ ] **Step 6: Prüfen**

Im Browser: Dunkle Fahrzeug-Sektion mit Bildergalerie (Hauptbild + 8 Thumbnails, Auto-Rotate). Darunter helle Ausstattungs-Galerie mit Hover-Effekten. Responsive testen.

- [ ] **Step 7: Commit**

```bash
git add index.html
git commit -m "feat: Fahrzeug-Detail mit Bildergalerie und Ausstattungs-Grid"
```

---

### Task 9: So geht's (4 Schritte)

**Files:**
- Modify: `index.html` (HTML + CSS)

- [ ] **Step 1: Steps-CSS einfügen**

Übernimm aus dem Testprojekt:
- `.steps` (4-spaltige Grid mit gepunkteter Linie via `::before`)
- `.step`, `.step__num`, `.step__title`, `.step__text`
- Hover-Effekte (Icon-Background füllt sich)

- [ ] **Step 2: Steps-HTML einfügen**

Füge nach der Ausstattungs-Sektion ein:

```html
<section class="section section--light" id="so-gehts">
    <div class="container">
        <div class="section-header">
            <span class="section-tag"><i class="fas fa-list-ol"></i> So einfach geht's</span>
            <h2 class="section-title">In 4 Schritten zum Pferdetransport</h2>
            <p class="section-subtitle">Von der Registrierung bis zur Rückgabe — schnell, einfach und komplett digital.</p>
        </div>
        <div class="steps">
            <div class="step reveal">
                <div class="step__num"><i class="fas fa-user-plus"></i></div>
                <h3 class="step__title">Kostenlos registrieren</h3>
                <p class="step__text">Erstelle deinen Account bei fleetster — kostenlos und in unter 2 Minuten.</p>
            </div>
            <div class="step reveal delay-1">
                <div class="step__num"><i class="fas fa-location-dot"></i></div>
                <h3 class="step__title">Standort wählen</h3>
                <p class="step__text">Finde den nächsten Reitstall-Parkplatz mit einem verfügbaren Transporter.</p>
            </div>
            <div class="step reveal delay-2">
                <div class="step__num"><i class="fas fa-calendar-check"></i></div>
                <h3 class="step__title">Online buchen</h3>
                <p class="step__text">Reserviere deinen Wunschzeitraum direkt über die App oder im Browser.</p>
            </div>
            <div class="step reveal delay-3">
                <div class="step__num"><i class="fas fa-truck-ramp-box"></i></div>
                <h3 class="step__title">Losfahren</h3>
                <p class="step__text">Öffne das Fahrzeug per App, Schlüssel liegt im Handschuhfach — fertig!</p>
            </div>
        </div>
    </div>
</section>
```

- [ ] **Step 3: Prüfen**

Im Browser: 4 Schritte nebeneinander (Desktop), gestapelt auf Mobile. Gepunktete Verbindungslinie. Hover-Effekt auf Icons.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: So-geht's-Sektion mit 4 Schritten"
```

---

### Task 10: Standortkarte

**Files:**
- Modify: `index.html` (HTML + CSS + JS)

- [ ] **Step 1: Standort-CSS einfügen**

```css
/* Standortkarte */
.locations__search {
    max-width: 480px;
    margin: 0 auto 40px;
    display: flex;
    gap: 12px;
}

.locations__search .form-input {
    flex: 1;
}

.locations__map {
    width: 100%;
    height: 500px;
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow);
    border: 1px solid var(--border);
}

.locations__cta {
    text-align: center;
    margin-top: 40px;
}
```

Responsive:
```css
/* @media (max-width: 768px) */
.locations__map { height: 350px; }
.locations__search { flex-direction: column; }
```

- [ ] **Step 2: Standort-HTML einfügen**

Füge nach der So-geht's-Sektion ein:

```html
<section class="section" id="standorte">
    <div class="container">
        <div class="section-header">
            <span class="section-tag"><i class="fas fa-map-location-dot"></i> Unsere Standorte</span>
            <h2 class="section-title">Transporter in deiner Nähe</h2>
            <p class="section-subtitle">Unsere STX Pferdetransporter stehen an Reitställen in ganz Deutschland für dich bereit.</p>
        </div>
        <div class="locations__search">
            <input type="text" class="form-input" id="plzInput" placeholder="PLZ eingeben..." maxlength="5" inputmode="numeric">
            <button class="btn btn--primary" onclick="searchLocation()">Suchen</button>
        </div>
        <div class="locations__map" id="locationsMap">
            <!-- Karte wird per JS initialisiert -->
        </div>
        <div class="locations__cta reveal">
            <p style="color: var(--text-light); margin-bottom: 16px;">Standort in deiner Nähe gefunden?</p>
            <a href="https://theurer-trucks-2go.fleetster.de" target="_blank" rel="noopener"
               class="btn btn--primary btn--lg"
               onclick="dataLayer.push({'event':'cta_click','cta_location':'standortkarte'})">
                Jetzt registrieren und buchen <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    </div>
</section>
```

- [ ] **Step 3: Karten-JavaScript einfügen (Stub mit Leaflet/OpenStreetMap)**

Füge im `<head>` hinzu:
```html
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
```

Füge im `<script>`-Block ein:

```javascript
// Standortkarte (Stub — Standorte später aus Fleetster-API)
const stations = [
    { name: 'Reitstall Müller', city: 'Hamburg', lat: 53.5511, lng: 9.9937 },
    { name: 'Pferdehof am See', city: 'Berlin', lat: 52.5200, lng: 13.4050 },
    { name: 'Reitanlage Süd', city: 'München', lat: 48.1351, lng: 11.5820 },
    { name: 'Gestüt Rheinland', city: 'Köln', lat: 50.9375, lng: 6.9603 },
    { name: 'Reitstall Nordheide', city: 'Hannover', lat: 52.3759, lng: 9.7320 }
];

const map = L.map('locationsMap').setView([51.1657, 10.4515], 6);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap'
}).addTo(map);

const markerIcon = L.divIcon({
    html: '<i class="fas fa-location-dot" style="color:#0088CF;font-size:28px;"></i>',
    iconSize: [28, 36],
    iconAnchor: [14, 36],
    className: ''
});

stations.forEach(s => {
    L.marker([s.lat, s.lng], { icon: markerIcon })
     .addTo(map)
     .bindPopup(`<strong>${s.name}</strong><br>${s.city}<br><a href="https://theurer-trucks-2go.fleetster.de" target="_blank" style="color:#0088CF;font-weight:700;">Jetzt buchen →</a>`);
});

function searchLocation() {
    const plz = document.getElementById('plzInput').value.trim();
    if (!plz || plz.length < 5) {
        alert('Bitte gib eine gültige PLZ ein.');
        return;
    }
    // Stub: Zentriere auf Deutschland-Mitte und zeige alle Marker
    map.setView([51.1657, 10.4515], 7);
    // In Zukunft: Geocoding der PLZ und Zoom auf nächsten Standort
}
```

- [ ] **Step 4: Prüfen**

Im Browser: Interaktive Karte mit 5 Markern. PLZ-Suchfeld vorhanden. Marker-Popups mit Standortname und "Jetzt buchen"-Link. CTA-Button unterhalb.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: Standortkarte mit Leaflet/OpenStreetMap und PLZ-Suche (Stub)"
```

---

### Task 11: Trustpilot-Bewertungen

**Files:**
- Modify: `index.html` (HTML + CSS)

- [ ] **Step 1: Trustpilot-CSS einfügen**

```css
/* Trustpilot */
.trustpilot-section {
    text-align: center;
}

.trustpilot-widget-container {
    max-width: 900px;
    margin: 0 auto;
    min-height: 200px;
}
```

- [ ] **Step 2: Trustpilot-HTML einfügen**

Füge nach der Standort-Sektion ein:

```html
<section class="section section--light" id="bewertungen">
    <div class="container trustpilot-section">
        <div class="section-header">
            <span class="section-tag"><i class="fas fa-star"></i> Kundenstimmen</span>
            <h2 class="section-title">Das sagen unsere Nutzerinnen</h2>
            <p class="section-subtitle">Echte Bewertungen von echten Pferdemenschen.</p>
        </div>
        <div class="trustpilot-widget-container">
            <!-- Trustpilot Widget — ersetze data-templateid und data-businessunitid mit euren Werten aus dem Trustpilot Business-Dashboard -->
            <div class="trustpilot-widget" data-locale="de-DE" data-template-id="DEINE-TEMPLATE-ID" data-businessunit-id="DEINE-BUSINESS-ID" data-style-height="300px" data-style-width="100%" data-theme="light">
                <a href="https://de.trustpilot.com/review/theurer-trucks-2go.de" target="_blank" rel="noopener">
                    Bewertungen auf Trustpilot ansehen
                </a>
            </div>
        </div>
    </div>
</section>
```

Füge vor `</body>` das Trustpilot-Script ein:
```html
<script type="text/javascript" src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js" async></script>
```

Hinweis: `data-template-id` und `data-businessunit-id` müssen mit den echten Werten aus dem Trustpilot Business-Dashboard ersetzt werden.

- [ ] **Step 3: Prüfen**

Im Browser: Sektion sichtbar mit Überschrift und Fallback-Link. Widget zeigt Platzhalter bis echte IDs eingetragen werden.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: Trustpilot-Bewertungen Sektion (Widget-IDs als Platzhalter)"
```

---

### Task 12: Erklärvideo (Vimeo Einwandbehandlung)

**Files:**
- Modify: `index.html` (HTML + CSS)

- [ ] **Step 1: Erklärvideo-CSS einfügen**

```css
/* Erklärvideo */
.explainer {
    text-align: center;
}

.explainer__video {
    position: relative;
    width: 100%;
    max-width: 800px;
    margin: 0 auto 40px;
    padding-bottom: 56.25%; /* 16:9 */
    height: 0;
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-lg);
}

.explainer__video iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
}
```

- [ ] **Step 2: Erklärvideo-HTML einfügen**

Füge nach der Trustpilot-Sektion ein:

```html
<section class="section" id="erklaervideo">
    <div class="container explainer">
        <div class="section-header">
            <span class="section-tag"><i class="fas fa-film"></i> Video</span>
            <h2 class="section-title">Schau dir an, wie einfach es funktioniert</h2>
            <p class="section-subtitle">In wenigen Minuten erfährst du alles Wichtige über TheurerTrucks 2GO.</p>
        </div>
        <div class="explainer__video">
            <iframe src="https://player.vimeo.com/video/1019195471?title=0&byline=0&portrait=0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowfullscreen
                    title="TheurerTrucks 2GO Erklärvideo"
                    loading="lazy"></iframe>
        </div>
        <a href="https://theurer-trucks-2go.fleetster.de" target="_blank" rel="noopener"
           class="btn btn--primary btn--lg"
           onclick="dataLayer.push({'event':'cta_click','cta_location':'explainer_video'})">
            Jetzt kostenlos registrieren <i class="fas fa-arrow-right"></i>
        </a>
    </div>
</section>
```

- [ ] **Step 3: Prüfen**

Im Browser: Responsive Vimeo-Player (16:9), abspielbar. CTA-Button darunter. Kein Autoplay — Nutzerin klickt bewusst auf Play.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: Vimeo-Erklärvideo mit CTA #4"
```

---

### Task 13: Preise & Tarife

**Files:**
- Modify: `index.html` (HTML + CSS)

- [ ] **Step 1: Pricing-CSS einfügen**

Übernimm aus dem Testprojekt:
- `.pricing-grid` (3-spaltige Grid, max-width 980px)
- `.pricing-card` (weiße Card mit Border, Hover-Effekt)
- `.pricing-card.featured` (blauer Border, Schatten, Ribbon)
- `.pricing-card__ribbon` ("Meistgebucht" Label)
- `.pricing-card__icon`, `__name`, `__price`, `__unit`, `__list`, Button
- `.pricing-note` (Zusatzinfos unter den Karten)

- [ ] **Step 2: Pricing-HTML einfügen**

Übernimm die Preis-Sektion aus dem Testprojekt (Zeilen ca. 2068-2135) mit `id="preise"`. Stelle sicher, dass die CTA-Buttons in den Karten auf `https://theurer-trucks-2go.fleetster.de` verlinken und GTM-Events feuern:

```html
onclick="dataLayer.push({'event':'cta_click','cta_location':'pricing_TAG'})"
```

Wobei TAG je nach Karte `daily`, `weekend` oder `weekly` ist.

- [ ] **Step 3: Prüfen**

Im Browser: 3 Preis-Karten nebeneinander (Desktop), mittlere hervorgehoben mit "Meistgebucht"-Badge. Responsive: gestapelt auf Mobile.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: Preise & Tarife Sektion"
```

---

### Task 14: FAQ mit Schema.org Markup

**Files:**
- Modify: `index.html` (HTML + CSS + JSON-LD)

- [ ] **Step 1: FAQ-CSS einfügen**

Übernimm aus dem Testprojekt:
- `.faq-wrap` (max-width 780px, zentriert)
- `.faq-item`, `.faq-item.open`
- `.faq-q`, `.faq-toggle`
- `.faq-a` (max-height 0 → 500px Transition)

- [ ] **Step 2: FAQ-HTML einfügen**

Füge nach der Preis-Sektion ein:

```html
<section class="section section--light" id="faq">
    <div class="container">
        <div class="section-header">
            <span class="section-tag"><i class="fas fa-circle-question"></i> Häufige Fragen</span>
            <h2 class="section-title">Deine Fragen — unsere Antworten</h2>
            <p class="section-subtitle">Alles Wichtige für deine erste Buchung auf einen Blick.</p>
        </div>
        <div class="faq-wrap">
            <div class="faq-item">
                <button class="faq-q" onclick="toggleFaq(this)">
                    <span>Brauche ich einen speziellen Führerschein?</span>
                    <span class="faq-toggle"><i class="fas fa-plus"></i></span>
                </button>
                <div class="faq-a">
                    <p>Nein! Unser STX Pferdetransporter wiegt unter 3,5 Tonnen. Du brauchst nur den ganz normalen Führerschein Klasse B — keinen BE oder C1.</p>
                </div>
            </div>
            <div class="faq-item">
                <button class="faq-q" onclick="toggleFaq(this)">
                    <span>Wie funktioniert die Buchung?</span>
                    <span class="faq-toggle"><i class="fas fa-plus"></i></span>
                </button>
                <div class="faq-a">
                    <p>Registriere dich kostenlos bei fleetster, wähle deinen Wunschstandort und Zeitraum, und buche direkt online. Am Abholtag öffnest du das Fahrzeug per App — der Schlüssel liegt im Handschuhfach.</p>
                </div>
            </div>
            <div class="faq-item">
                <button class="faq-q" onclick="toggleFaq(this)">
                    <span>Wo stehen die Transporter?</span>
                    <span class="faq-toggle"><i class="fas fa-plus"></i></span>
                </button>
                <div class="faq-a">
                    <p>Unsere Fahrzeuge stehen auf Reitstall-Parkplätzen in ganz Deutschland. Die Standorte findest du auf unserer Karte oder in der fleetster-App.</p>
                </div>
            </div>
            <div class="faq-item">
                <button class="faq-q" onclick="toggleFaq(this)">
                    <span>Was kostet die Miete?</span>
                    <span class="faq-toggle"><i class="fas fa-plus"></i></span>
                </button>
                <div class="faq-a">
                    <p>Ab 149€ pro Tag (inkl. MwSt. und Vollkasko-Versicherung). Das Wochenende kostet 420€, eine ganze Woche 775€. Freie Kilometer sind je nach Tarif inklusive, Zusatzkilometer kosten 0,42€. Diesel geht auf eigene Rechnung.</p>
                </div>
            </div>
            <div class="faq-item">
                <button class="faq-q" onclick="toggleFaq(this)">
                    <span>Ist das Fahrzeug versichert?</span>
                    <span class="faq-toggle"><i class="fas fa-plus"></i></span>
                </button>
                <div class="faq-a">
                    <p>Ja, zu 100%. Jeder Transporter ist vollkasko-versichert. Die Versicherung ist bereits im Mietpreis enthalten.</p>
                </div>
            </div>
            <div class="faq-item">
                <button class="faq-q" onclick="toggleFaq(this)">
                    <span>Wie viele Pferde passen in den Transporter?</span>
                    <span class="faq-toggle"><i class="fas fa-plus"></i></span>
                </button>
                <div class="faq-a">
                    <p>Der STX Pferdetransporter bietet Platz für 1 Großpferd oder 2 kleinere Pferde. Die maximale Zuladung beträgt ca. 950 kg.</p>
                </div>
            </div>
            <div class="faq-item">
                <button class="faq-q" onclick="toggleFaq(this)">
                    <span>Wie funktioniert das Verladen?</span>
                    <span class="faq-toggle"><i class="fas fa-plus"></i></span>
                </button>
                <div class="faq-a">
                    <p>Über eine breite, rutschfeste Rampe mit niedrigem Einstieg. Die großzügigen Maße machen das Verladen deutlich einfacher als bei einem herkömmlichen Anhänger. Eine Pferdeüberwachungskamera zeigt dir während der Fahrt, wie es deinem Pferd geht.</p>
                </div>
            </div>
            <div class="faq-item">
                <button class="faq-q" onclick="toggleFaq(this)">
                    <span>Was passiert bei einer Panne?</span>
                    <span class="faq-toggle"><i class="fas fa-plus"></i></span>
                </button>
                <div class="faq-a">
                    <p>Im Falle einer Panne erreichst du unseren Support. Die Kontaktdaten findest du in der App und im Fahrzeug. Wir kümmern uns schnellstmöglich um eine Lösung.</p>
                </div>
            </div>
        </div>
    </div>
</section>
```

- [ ] **Step 3: FAQ-JavaScript einfügen**

```javascript
// FAQ Akkordeon
function toggleFaq(el) {
    const item = el.closest('.faq-item');
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
}
```

- [ ] **Step 4: Schema.org FAQPage JSON-LD einfügen**

Füge vor `</head>` ein:

```html
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Brauche ich einen speziellen Führerschein?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Nein! Unser STX Pferdetransporter wiegt unter 3,5 Tonnen. Du brauchst nur den ganz normalen Führerschein Klasse B — keinen BE oder C1."
            }
        },
        {
            "@type": "Question",
            "name": "Wie funktioniert die Buchung?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Registriere dich kostenlos bei fleetster, wähle deinen Wunschstandort und Zeitraum, und buche direkt online. Am Abholtag öffnest du das Fahrzeug per App — der Schlüssel liegt im Handschuhfach."
            }
        },
        {
            "@type": "Question",
            "name": "Was kostet die Miete?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Ab 149€ pro Tag (inkl. MwSt. und Vollkasko-Versicherung). Das Wochenende kostet 420€, eine ganze Woche 775€."
            }
        },
        {
            "@type": "Question",
            "name": "Wie viele Pferde passen in den Transporter?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Der STX Pferdetransporter bietet Platz für 1 Großpferd oder 2 kleinere Pferde. Die maximale Zuladung beträgt ca. 950 kg."
            }
        }
    ]
}
</script>
```

- [ ] **Step 5: Prüfen**

Im Browser: 8 FAQ-Items, nur eins gleichzeitig offen. Klick öffnet/schließt. JSON-LD im Quelltext sichtbar (DevTools → Elements → `<head>`).

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "feat: FAQ-Sektion mit Akkordeon und Schema.org FAQPage Markup"
```

---

### Task 15: Finaler CTA-Band + Footer

**Files:**
- Modify: `index.html` (HTML + CSS)

- [ ] **Step 1: CTA-Band-CSS einfügen**

Übernimm aus dem Testprojekt:
- `.cta-band` (dunkler Hintergrund mit radialem Gradient)
- `.cta-band__inner`, `.cta-band__title`, `.cta-band__sub`, `.cta-band__actions`

- [ ] **Step 2: Footer-CSS einfügen**

Übernimm aus dem Testprojekt:
- `.footer` (sehr dunkler Hintergrund)
- `.footer__grid` (4-spaltige Grid)
- `.footer__logo`, `.footer__desc`, `.footer__social`
- `.footer__col-title`, `.footer__links`, `.footer__contact-row`
- `.footer__bar`, `.footer__bar-links`

- [ ] **Step 3: CTA-Band-HTML einfügen**

Füge nach der FAQ-Sektion ein:

```html
<section class="cta-band">
    <div class="cta-band__inner container">
        <h2 class="cta-band__title">Bereit für deinen ersten Transport?</h2>
        <p class="cta-band__sub">Registriere dich jetzt kostenlos und buche unseren STX Pferdetransporter direkt online.</p>
        <div class="cta-band__actions">
            <a href="https://theurer-trucks-2go.fleetster.de" target="_blank" rel="noopener"
               class="btn btn--white btn--lg"
               onclick="dataLayer.push({'event':'cta_click','cta_location':'final_cta'})">
                Jetzt kostenlos registrieren <i class="fas fa-arrow-right"></i>
            </a>
            <a href="#verfuegbarkeit" class="btn btn--outline btn--lg">Verfügbarkeit prüfen</a>
        </div>
    </div>
</section>
```

- [ ] **Step 4: Footer-HTML einfügen**

Übernimm den Footer aus dem Testprojekt (Zeilen ca. 2245-2314). Stelle sicher:
- Logo korrekt verlinkt
- Social Icons (Instagram, Facebook, YouTube) mit korrekten URLs
- App Store Links korrekt
- Kontaktdaten: TheurerTrucks Renting GmbH, Hamburger Str. 65, 23816 Leezen
- Footer-Bar: Links zu Impressum, Datenschutz, AGB (vorerst `href="#"`)

- [ ] **Step 5: Prüfen**

Im Browser: Blauer CTA-Band mit weißem Button. Footer mit 4 Spalten, Social Icons, Kontakt. Responsive: gestapelt auf Mobile.

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "feat: Finaler CTA-Band und Footer"
```

---

### Task 16: Scroll-Reveal, Responsive-Feinschliff und Accessibility

**Files:**
- Modify: `index.html` (CSS + JS)

- [ ] **Step 1: Scroll-Reveal CSS einfügen**

Übernimm aus dem Testprojekt:
- `.reveal` (opacity 0, translateY 30px)
- `.reveal.in` (opacity 1, translateY 0)
- `.delay-1` bis `.delay-5`
- Focus-Styles (`:focus-visible` Outlines)
- `@media (prefers-reduced-motion: reduce)` Query

- [ ] **Step 2: Responsive Media Queries vervollständigen**

Stelle sicher, dass alle Responsive-Breakpoints aus dem Testprojekt übernommen sind:
- `@media (max-width: 1024px)` — Tablet
- `@media (max-width: 768px)` — Mobile
- `@media (max-width: 480px)` — Klein-Mobile

Ergänze die Breakpoints um die neuen Sektionen:
- `.trust-grid` → 1 Spalte auf Mobile
- `.locations__map` → reduzierte Höhe auf Mobile
- `.locations__search` → gestapelt auf Mobile
- `.explainer__video` → bleibt 16:9 (responsiv durch padding-bottom)

- [ ] **Step 3: Scroll-Reveal JavaScript einfügen**

```javascript
// Scroll-Reveal
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
```

- [ ] **Step 4: Prüfen**

Im Browser: Scroll-Reveal-Animationen testen (Elemente faden beim Scrollen ein). Responsive bei allen Breakpoints testen. `prefers-reduced-motion` testen (DevTools → Rendering → Emulate CSS media feature).

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: Scroll-Reveal, Responsive-Feinschliff und Accessibility"
```

---

### Task 17: SEO — Structured Data, robots.txt, sitemap.xml

**Files:**
- Modify: `index.html` (JSON-LD im Head)
- Create: `robots.txt`
- Create: `sitemap.xml`

- [ ] **Step 1: Organization + LocalBusiness Schema.org einfügen**

Füge vor `</head>` ein (zusätzlich zum bereits vorhandenen FAQPage):

```html
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "TheurerTrucks Renting GmbH",
    "url": "https://www.theurer-trucks-2go.de",
    "logo": "https://www.theurer-trucks-2go.de/Logo/TT2GO-Logo-rgb_56-182-255%20(Website).png",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "Hamburger Str. 65",
        "addressLocality": "Leezen",
        "postalCode": "23816",
        "addressCountry": "DE"
    },
    "sameAs": [
        "https://www.facebook.com/theurertrucks2go",
        "https://www.instagram.com/theurer_trucks_2go/"
    ]
}
</script>
```

- [ ] **Step 2: robots.txt erstellen**

```
User-agent: *
Allow: /
Sitemap: https://www.theurer-trucks-2go.de/sitemap.xml
```

- [ ] **Step 3: sitemap.xml erstellen**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://www.theurer-trucks-2go.de/</loc>
        <lastmod>2026-04-06</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
    </url>
</urlset>
```

- [ ] **Step 4: Prüfen**

Öffne `robots.txt` und `sitemap.xml` im Browser (via `npx serve .`). JSON-LD im Quelltext prüfen. Google Rich Results Test: https://search.google.com/test/rich-results (URL oder Code-Snippet eingeben).

- [ ] **Step 5: Commit**

```bash
git add index.html robots.txt sitemap.xml
git commit -m "feat: SEO — Schema.org Structured Data, robots.txt, sitemap.xml"
```

---

### Task 18: Finaler Test und Cleanup

**Files:**
- Modify: `index.html` (Feinschliff)

- [ ] **Step 1: Vollständiger visueller Test**

```bash
npx serve .
```

Öffne `http://localhost:3000` und prüfe:
- [ ] Alle 13 Sektionen sichtbar und in korrekter Reihenfolge
- [ ] Alle 5 CTAs verlinken auf `https://theurer-trucks-2go.fleetster.de`
- [ ] Navbar-CTA verlinkt korrekt
- [ ] Verfügbarkeitsprüfung: Datum-Validierung, Stations-Dropdown, Ergebnis-Anzeige
- [ ] Video-Showcase: MP4-Loop spielt stumm
- [ ] Erklärvideo: Vimeo-Player abspielbar
- [ ] Bildergalerie: Thumbnails klickbar, Auto-Rotate
- [ ] Standortkarte: Marker sichtbar, Popups klickbar
- [ ] FAQ: Akkordeon öffnet/schließt
- [ ] Responsive: Desktop (1200px+), Tablet (768-1024px), Mobile (375px)
- [ ] Scroll-Reveal-Animationen

- [ ] **Step 2: HTML-Validierung**

Öffne https://validator.w3.org/#validate_by_input und füge den HTML-Code ein. Behebe alle Fehler.

- [ ] **Step 3: GTM-Events prüfen**

Öffne DevTools → Console. Klicke jeden CTA und prüfe, dass `dataLayer.push` aufgerufen wird:
```javascript
// In Console eingeben:
window.dataLayer
```

Erwartung: Array mit GTM-Events, jedes mit `event: 'cta_click'` und unterschiedlichem `cta_location`.

- [ ] **Step 4: Lighthouse-Score prüfen**

DevTools → Lighthouse → Generate Report (Mobile + Desktop). Zielwerte:
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

Behebe kritische Findings.

- [ ] **Step 5: Finaler Commit**

```bash
git add -A
git commit -m "chore: Finaler Test, Validierung und Cleanup"
```

---

## Zusammenfassung der Platzhalter (müssen vor Go-Live ersetzt werden)

| Platzhalter | Wo | Was einsetzen |
|---|---|---|
| `DEINE-COOKIEBOT-ID` | `<head>`, Cookiebot Script | Cookiebot Dashboard → Settings → Domain → Script-ID |
| `DEINE-TEMPLATE-ID` | Trustpilot-Widget | Trustpilot Business → Widgets → Template-ID |
| `DEINE-BUSINESS-ID` | Trustpilot-Widget | Trustpilot Business → Widgets → Business-Unit-ID |
| Stations-Liste | Verfügbarkeits-Dropdown + Karte | Durch Fleetster-API-Daten ersetzen |
| `href="#"` | Footer (Impressum/Datenschutz/AGB) | Separate HTML-Seiten erstellen |
| Canonical URL | `<head>` | Finale Domain einsetzen |
| Sitemap URL | robots.txt + sitemap.xml | Finale Domain einsetzen |
