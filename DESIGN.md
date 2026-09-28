# DESIGN.md

> Rustig zelfvertrouwen: een site die voelt als een goed gesprek met iemand die precies weet waar hij het over heeft.

Stijlgids voor de site van Thijs van Geenen – *de excellente dienstverlener*. Alle pagina's (`index.html`, `over-thijs/`, `aanpak/`, `contact/`) volgen deze regels. Nieuwe onderdelen eerst hier toetsen.

## 1. Visual Theme & Atmosphere

**Style**: Warm Editorial Premium (mix van *Cream Editorial* voor kleur en typografie, *Warm Professional* voor dynamiek)
**Keywords**: warm, nuchter, betrouwbaar, redactioneel, ruim, vakmanschap, menselijk
**Tone**: zelfverzekerd en persoonlijk — NOT corporate, NOT flitsend, NOT startup-achtig
**Feel**: Een linnen notitieboek met een vulpen erop, op de tafel van een Brabantse boardroom.

**Interaction Tier**: L2 Vloeiende interactie (scroll-reveals, navigatiestatus, parallax, spotlight-hover)
**Dependencies**: Alleen CSS + vanilla JS (`assets/js/main.js`). Geen GSAP, geen Lenis, geen build-stap.

## 2. Color Palette & Roles

```css
:root {
  /* Backgrounds */
  --bg: #F6F1E9;               /* pagina: warm crème */
  --surface: #FFFDF9;          /* kaarten, formulier */
  --surface-alt: #EDE5D8;      /* afwisselende secties */
  --surface-hover: #FFFFFF;    /* kaart hover */
  --ink: #12312B;              /* donkere secties (diep woudgroen) */
  --ink-2: #1B443B;            /* donker hover / tweede laag */

  /* Borders */
  --border: #E2D8C8;
  --border-hover: #C7B79F;
  --border-on-ink: rgba(246, 241, 233, 0.14);

  /* Text */
  --text: #15201D;             /* koppen */
  --text-secondary: #4B5752;   /* lopende tekst */
  --text-tertiary: #5F6762;    /* labels, meta (AA-contrast op alle lichte vlakken) */
  --on-ink: #F6F1E9;           /* tekst op donker */
  --on-ink-secondary: rgba(246, 241, 233, 0.72);

  /* Accent */
  --accent: #C4693A;           /* koper: cursieve kernwoorden, lijnen, details */
  --accent-hover: #A9552B;
  --accent-ink: #98491F;       /* kleine accenttekst op licht (AA-contrast) */
  --accent-soft: #F0DCCB;      /* zachte vlakken */
  --sage: #A9C0B1;             /* accent op donkere vlakken */

  /* RGB-varianten voor rgba() */
  --bg-rgb: 246, 241, 233;
  --ink-rgb: 18, 49, 43;
  --accent-rgb: 196, 105, 58;
  --sage-rgb: 169, 192, 177;

  /* Semantic */
  --success: #3F7D5B;
  --error: #B3412F;
  --warning: #C9962B;
}
```

**Color Rules:**
- Alle kleuren via CSS-variabelen; buiten `:root` staat nergens een hex-waarde.
- Primaire knoppen zijn `--ink` met `--on-ink` tekst (hoog contrast). Koper is een detailkleur, nooit een groot vlak.
- Kleine tekst in accentkleur altijd `--accent-ink` (contrast ≥ 4,5:1 op `--bg`).
- Per sectie maximaal één accentkleur: koper op licht, salie (`--sage`) op donker.
- Donkere secties (`--ink`) spaarzaam: maximaal twee per pagina (dienstenband + afsluitende CTA).

## 3. Typography Rules

**Font Stack:**
```css
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300..600&family=DM+Sans:ital,opsz,wght@0,9..40,400..700;1,9..40,400..700&display=swap');

--font-display: "Fraunces", "Iowan Old Style", Georgia, serif;
--font-body: "DM Sans", system-ui, -apple-system, "Segoe UI", sans-serif;
```
(In de HTML geladen via `<link rel="preconnect">` + `<link rel="stylesheet">` voor snelheid.)

| Role | Font | Size | Weight | Line Height | Letter Spacing |
|------|------|------|--------|-------------|----------------|
| Hero H1 | Fraunces (opsz 144) | clamp(3rem, 7.2vw, 6.5rem) | 350 | 1.02 | -0.035em |
| Page H1 | Fraunces | clamp(2.6rem, 5.6vw, 5rem) | 350 | 1.05 | -0.03em |
| Section H2 | Fraunces | clamp(2.1rem, 4.2vw, 3.6rem) | 350 | 1.08 | -0.025em |
| H3 | Fraunces | 1.5rem | 450 | 1.2 | -0.01em |
| Body | DM Sans | 1.0625rem | 400 | 1.7 | — |
| Lead | DM Sans | 1.25rem | 400 | 1.6 | — |
| Label / Eyebrow | DM Sans | 0.78rem | 600 | 1.4 | 0.16em (uppercase) |
| Grote cijfers | Fraunces italic | 5–7rem | 300 | 1 | -0.04em |

**Typography Rules:**
- Koppen licht (300–450) en groot: luxe komt van schaal en lucht, niet van vet.
- Kernwoorden in koppen in *Fraunces italic* met `--accent` (`<em>`); max. één `<em>` per kop.
- Lopende tekst max. 65 tekens breed (`max-width: 36rem`).
- **NEVER use**: Inter, Roboto, Arial, Poppins, Montserrat, Comic Sans; geen tweede serif.

**Text Decoration** (uit `text-decoration-rules.md`, stijl = warm/redactioneel):
- Hero H1: geen verloop, geen schaduw — alleen italic koper op het kernwoord.
- Section H2: geen verloop, geen schaduw.
- Eyebrow: klein koperen streepje ervoor (`::before`, 24px).
- Links: onderstreping die van links naar rechts ingroeit bij hover.

## 4. Component Stylings

### Buttons
```css
.btn {
  --btn-bg: var(--ink); --btn-fg: var(--on-ink);
  display: inline-flex; align-items: center; gap: .6rem;
  min-height: 3.25rem; padding: 0 1.6rem;
  border-radius: 999px; border: 1px solid var(--btn-bg);
  background: var(--btn-bg); color: var(--btn-fg);
  font: 600 1rem/1 var(--font-body); text-decoration: none; cursor: pointer;
  transition: background .35s var(--ease), color .35s var(--ease), border-color .35s var(--ease), transform .35s var(--ease);
}
.btn .icon { transition: transform .35s var(--ease); }
.btn:hover { --btn-bg: var(--ink-2); }
.btn:hover .icon { transform: translateX(4px); }
.btn:active { transform: scale(.97); }
.btn:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
.btn:disabled, .btn[aria-disabled="true"] { opacity: .45; pointer-events: none; }

.btn-ghost { --btn-bg: transparent; --btn-fg: var(--text); border-color: var(--border-hover); }
.btn-ghost:hover { --btn-bg: var(--text); --btn-fg: var(--bg); border-color: var(--text); }
.btn-light { --btn-bg: var(--on-ink); --btn-fg: var(--ink); }
.btn-light:hover { --btn-bg: var(--accent-soft); }
```

### Cards (SpotlightCard)
```css
.card {
  position: relative; overflow: hidden; isolation: isolate;
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--radius-lg); padding: clamp(1.75rem, 3vw, 2.5rem);
  transition: border-color .4s var(--ease), transform .4s var(--ease), box-shadow .4s var(--ease);
}
.card::before {             /* spotlight volgt de muis via --mx/--my */
  content: ""; position: absolute; inset: 0; z-index: -1; opacity: 0;
  background: radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(var(--accent-rgb), .13), transparent 60%);
  transition: opacity .4s var(--ease);
}
.card:hover { border-color: var(--border-hover); transform: translateY(-4px); box-shadow: var(--shadow-lg); }
.card:hover::before { opacity: 1; }
.card:focus-within { border-color: var(--accent); }
```

### Navigation
```css
.site-header { position: fixed; inset: 0 0 auto; z-index: 50; transition: transform .5s var(--ease), background .4s, box-shadow .4s; }
.site-header.is-scrolled { background: rgba(var(--bg-rgb), .86); backdrop-filter: blur(12px); box-shadow: 0 1px 0 var(--border); }
.site-header.is-hidden { transform: translateY(-100%); }   /* verbergen bij omlaag scrollen */
.menu a[aria-current="page"]::after { transform: scaleX(1); }  /* actieve pagina */
```

### Links
```css
.link {
  color: var(--text); text-decoration: none;
  background: linear-gradient(currentColor, currentColor) 0 100% / 0 1px no-repeat;
  transition: background-size .4s var(--ease), color .3s;
}
.link:hover { background-size: 100% 1px; color: var(--accent-ink); }
.link:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; border-radius: 2px; }
```

### Tags / Badges
```css
.tag {
  display: inline-flex; align-items: center; gap: .5rem;
  padding: .45rem .9rem; border-radius: 999px;
  background: rgba(var(--ink-rgb), .05); border: 1px solid var(--border);
  font: 600 .78rem/1 var(--font-body); letter-spacing: .04em; color: var(--text-secondary);
}
.tag .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--success); box-shadow: 0 0 0 4px rgba(63,125,91,.15); }
```

### Dienstenlijst (service rows)
Genummerde rijen (01–04) met Fraunces-titel, omschrijving en pijl. Hover: vlak `--surface` schuift van links in (`transform: scaleX`), pijl draait 45°.

### Formulier
Velden met `--surface` achtergrond, 1px `--border`, radius 14px, min-hoogte 3.25rem. Focus: rand `--accent` + ring `0 0 0 4px rgba(var(--accent-rgb), .15)`. Ongeldig (na interactie): rand `--error`.

## 5. Layout Principles

**Container:**
- Max width: 1240px, padding `clamp(1.25rem, 4vw, 2.5rem)` per kant
- Narrow variant (lopende tekst): 44rem

**Spacing Scale:**
- Section padding: `clamp(5rem, 11vw, 9rem)` verticaal
- Component gap: 1.5rem (kaarten), 3–5rem (kolommen)
- Card internal padding: `clamp(1.75rem, 3vw, 2.5rem)`

**Grid:**
```css
.split { display: grid; grid-template-columns: 5fr 7fr; gap: clamp(2.5rem, 6vw, 6rem); }
.bento { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem;
         grid-template-areas: "intro intro a" "b c d"; }
```
- Asymmetrie boven symmetrie: 5/7-splitsingen, sticky linkerkolom, bento i.p.v. gelijke rasters.

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat | geen schaduw, 1px `--border` | standaard kaarten, formuliervelden |
| Subtle | `0 1px 2px rgba(var(--ink-rgb), .05), 0 8px 24px -12px rgba(var(--ink-rgb), .12)` | zwevende labels, header bij scroll |
| Elevated | `0 2px 4px rgba(var(--ink-rgb), .04), 0 24px 48px -20px rgba(var(--ink-rgb), .28)` | kaart hover, portret |
| Ink | donkere sectie met korrel-overlay | dienstenband, CTA |

## 7. Animation & Interaction

**Motion Philosophy**: Traag, zeker en zacht. Alleen `transform` en `opacity`; easing `cubic-bezier(.22, 1, .36, 1)`.
**Tier**: L2

### Dependencies
Geen. Alles in `assets/js/main.js` (IntersectionObserver + requestAnimationFrame).

### Base Setup
```html
<script>document.documentElement.classList.add('js')</script>  <!-- in <head>: verberg-states alleen als JS draait -->
```

### Entrance Animation (Hero H1 — SplitText)
```css
.split-word { display: inline-block; overflow: hidden; vertical-align: top; padding-bottom: .08em; }
.split-word > span { display: inline-block; transform: translateY(105%); transition: transform 1.1s var(--ease); transition-delay: calc(var(--i) * 60ms + var(--d, 0ms)); }
.is-in .split-word > span { transform: none; }
```

### Scroll Behavior
- `[data-reveal]`: fade-up 28px, 0.9s, drempel 15%; kinderen van `[data-stagger]` met 90ms vertraging.
- Section H2 `[data-split]` (ScrollFloat): woorden glijden omhoog uit een masker zodra de kop in beeld komt.
- Quote `[data-scroll-reveal]` (ScrollReveal): woorden lichten op van 15% naar 100% dekking, gekoppeld aan scrollpositie.
- `[data-parallax="0.08"]`: portret beweegt licht tegen de scroll in.
- Voortgangslijn bovenaan (koper, 2px) + voortgangslijn langs de drie niveaus.
- Header: transparant → crème met blur na 40px; verbergt bij omlaag scrollen, verschijnt bij omhoog.

### Hover & Focus States
```css
:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
.card:hover { transform: translateY(-4px); }
.service-row:hover::before { transform: scaleX(1); }
```

### Special Effects (signature moments)
| Categorie | Effect | Waar |
|-----------|--------|------|
| Text — Hero H1 | SplitText (woordmasker) | hero-koppen alle pagina's |
| Text — H2 | ScrollFloat | sectiekoppen |
| Text — Body | ScrollReveal | citaat "Excellente dienstverlening is geen toeval…" |
| Element | Magnet (knop volgt muis ±8px) | primaire CTA's |
| Component | SpotlightCard + bento | drie niveaus, "Wat het oplevert" |
| Background | Grainient (zwevende zachte kleurvelden + korrel) | hero, donkere secties |
| Extra | CircularText (draaiende badge rond portret), marquee-band | home |
| Detail | E-mailadres kopiëren met "Gekopieerd"-bevestiging | CTA-blok |

Performance: geen `filter: blur()` op bewegende elementen, `backdrop-filter` ≤ 12px, pointermove via rAF, animaties pauzeren buiten beeld, cursor-effecten alleen bij `(hover: hover)`.

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; scroll-behavior: auto !important; }
  .split-word > span, [data-reveal] { transform: none !important; opacity: 1 !important; }
  .marquee-track { animation: none !important; }
}
```
JS slaat magnet, parallax en scroll-reveal over bij `prefers-reduced-motion: reduce`.

## 8. Do's and Don'ts

### Do
- Veel witruimte; liever één sterke zin dan drie gemiddelde.
- Echte foto's van Thijs; portret altijd in de boogvorm of cirkel met zachte schaduw.
- Iconen als inline SVG (lucide-stijl, 1.5px lijn, `currentColor`).
- Elke interactieve component heeft hover + focus-visible.
- Teksten in de jij-vorm, kort en concreet, in lijn met "geen dikke rapporten".
- Nieuwe secties kiezen uit bestaande componenten (card, service-row, bento, split, cta).

### Don't
- ❌ Geen hex-kleuren buiten `:root`.
- ❌ Geen verloop-tekst of tekstschaduw op koppen.
- ❌ Geen emoji in de interface.
- ❌ Geen stockfoto's van handenschuddende zakenmensen.
- ❌ Geen verzonnen cijfers, logo's of testimonials: alleen echte gegevens.
- ❌ Geen `filter: blur()` op bewegende elementen of meer dan één donkere sectie direct na elkaar.
- ❌ Geen vette (700+) Fraunces-koppen; de luxe zit in lichte, grote letters.
- ❌ Geen gelijke 3×3-rasters met identieke kaarten; kies bento of split.
- ❌ Geen extra animatiebibliotheken (GSAP/Lenis) zonder dat een pin-scrub echt nodig is.
- ❌ Geen tekst smaller dan 44px aanraakdoel op mobiel.

## 9. Responsive Behavior

**Breakpoints:**
| Name | Width | Key Changes |
|------|-------|-------------|
| Desktop | > 1024px | split 5/7, sticky kolommen, bento 3 kolommen, portret rechts |
| Tablet | 761–1024px | split wordt 1 kolom, bento 2 kolommen, sticky uit |
| Mobile | ≤ 760px | fullscreen menu, 1 kolom, marquee kleiner, magnet/parallax uit |

**Touch Targets:** minimaal 44×44px (knoppen 52px hoog, menulinks 56px).
**Collapsing Strategy:** navigatie → fullscreen overlay met gestaffelde links; bento → gestapeld; draaiende badge verkleint; tijdlijn en niveaus blijven verticaal.

```css
@media (max-width: 1024px) { .split { grid-template-columns: 1fr; } .bento { grid-template-columns: 1fr 1fr; grid-template-areas: "intro intro" "a b" "c d"; } }
@media (max-width: 760px)  { .bento { grid-template-columns: 1fr; grid-template-areas: "intro" "a" "b" "c" "d"; } }
```
