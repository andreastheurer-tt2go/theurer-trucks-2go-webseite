# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static single-file One-Pager website for **TheurerTrucks 2GO** — a car-sharing service for a single vehicle type: the **STX Pferdetransporter** (horse transporter) on Renault Master basis, for 1 Großpferd or 2 smaller horses. The booking platform is hosted externally at `https://theurer-trucks-2go.fleetster.de`. The official company website is `https://www.theurer-trucks-2go.de`.

**Key facts about the service:**
- Only ONE vehicle type (STX Pferdetransporter, under 3.5t, Führerschein Klasse B)
- Vehicles are parked at riding stable locations (Reitstallparkplätze) across Germany
- Vehicle is opened via app, key in glove compartment
- Pricing: 149€/day, 420€/weekend, 775€/week (brutto, inkl. MwSt.)
- Free km included per tariff; extra km at 0.42€; diesel costs separate
- Company: TheurerTrucks Renting GmbH, Hamburger Str. 65, 23816 Leezen

## Stack

- Pure HTML5 / CSS3 / Vanilla JavaScript — no build tools, no bundler, no dependencies
- Google Fonts (Montserrat + Open Sans) via CDN
- Font Awesome 6.5 via CDN
- All code lives in a single file: `index.html`

## Running the site

Open `index.html` directly in a browser. No server required. For live-reload during development:

```bash
npx serve .
# or
python3 -m http.server 8080
```

## Architecture

Everything is in `index.html`, structured in order:

1. **`<head>`** — meta tags, Google Fonts, Font Awesome, hero image preload, inline `<style>` block
2. **CSS** (inside `<style>`) — organised top-to-bottom matching DOM order:
   - CSS custom properties (`:root`) — colours, shadows, radii, transitions
   - Reset & base
   - Layout helpers (`.container`, `.section`, `.section-header`, `.section--dark`, `.section--light`)
   - Buttons (`.btn`, modifiers: `--primary`, `--ghost`, `--outline`, `--white`, `--lg`, `--full`)
   - Component blocks in DOM order: navbar → hero → availability checker → steps → video showcase → vehicle showcase (with image gallery) → equipment gallery → benefits → pricing → FAQ → CTA band → footer
   - Focus & accessibility styles, shake animation keyframe
   - Scroll-reveal animation (`.reveal` / `.in`, `.delay-1` through `.delay-5`)
   - Responsive media queries (`≤1024px`, `≤768px`, `≤480px`)
   - `prefers-reduced-motion` query
3. **HTML body** — semantic sections each with an `id` matching navbar anchor links
4. **`<script>`** (inline, at end of body):
   - Navbar scroll effect (adds `.scrolled` class)
   - Mobile menu open/close + Escape key handler
   - Datetime min-date logic (local timezone) + auto-advance end date
   - `checkAvailability()` — currently static/demo; shows result card after 1.2s delay; **API integration deferred**
   - Vehicle image gallery with thumbnail switching + auto-rotate (5s interval)
   - FAQ accordion (`toggleFaq()`)
   - IntersectionObserver scroll-reveal

## Key design tokens (CSS variables)

| Variable | Value | Usage |
|---|---|---|
| `--primary` | `#0088CF` | Brand blue, buttons, accents |
| `--primary-bright` | `#38B6FF` | Logo blue, gradient endpoints, light accents |
| `--primary-dark` | `#006fa8` | Hover states |
| `--primary-grad` | `linear-gradient(135deg, #0088CF, #38B6FF)` | Gradient fills |
| `--dark` | `#0f1419` | Dark section backgrounds |
| `--text-dark` | `#1a202c` | Heading colour |

## Assets

- **Logo:** `Logo/TT2GO-Logo-rgb_56-182-255 (Website).png` — used in navbar (CSS filter inverts to white on hero, original on scroll) and footer
- **Images (img/):** truck-front.jpg, horse-stall.jpg, interior-corridor.jpg, dashboard.jpg, rearview-camera.jpg, ventilation-lights.jpg, skylight.jpg, navigation.jpg
- **Video:** `img/truck-video.mp4` (also duplicated as root-level `2ZgvgJlvB328b7948a-24c0-434f-bf18-01f1345542a0.mp4`)
- **Logo variants:** Logo/ folder contains PNG, JPG, EPS, PDF in RGB and CMYK

## Remaining placeholders

- Impressum / Datenschutz / AGB pages — `href="#"` in footer bar (need separate pages or content)
- YouTube link — `href="#"` in footer social icons (not yet confirmed)

## Fleetster API (deferred)

`checkAvailability()` in the script block is a stub. When integrating:
- API docs: `https://www.fleetster.net/mobility-api`
- Swagger UI: `https://my.fleetster.net/swagger/` (requires credentials)
- Relevant endpoints: **Bookings** (availability periods), **Cars** (vehicle list)
- Authentication: Bearer token (credentials needed from fleetster partner portal)

## Content guidelines

- The service offers exactly ONE vehicle type — never reference multiple vehicle categories
- Vehicle features that are confirmed standard: rearview + horse monitoring camera, LED lighting, roof hatch (Dachluke) with ventilator, comfortable suspension (NOT air suspension), soft rubber floor, stallion equipment with high partition, saddle chamber, 5 seats, climate control, tow bar (2,500 kg)
- Do NOT claim "Luftfederung" (air suspension) — the vehicle has comfortable standard suspension
- Diesel costs are always separate (never say "vollgetankt")
- All prices are brutto (inkl. MwSt.), never "zzgl. MwSt."
