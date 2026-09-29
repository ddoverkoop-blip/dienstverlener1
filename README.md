# Thijs van Geenen, de excellente dienstverlener

Eenvoudige, statische website (HTML + CSS + JavaScript, geen build-stap) die automatisch wordt gepubliceerd via GitHub Pages.

**Live:** https://ddoverkoop-blip.github.io/dienstverlener1/

## Structuur

```
index.html            Home
over-thijs/index.html Over Thijs
aanpak/index.html     Aanpak (drie niveaus, ankers #niveau-1/2/3)
contact/index.html    Contact + formulier
privacy/index.html    Privacyverklaring (concept, laten controleren)
404.html              Foutpagina (noindex)
sitemap.xml           Sitemap voor Google Search Console
robots.txt            Werkt pas op een eigen domein (zie opmerking in het bestand)
DESIGN.md             Stijlgids: kleuren, typografie, componenten, animaties, do's & don'ts
assets/css/style.css  Alle styling – kleuren/fonts als variabelen bovenaan (:root), volgens DESIGN.md
assets/js/main.js     Menu, scroll-animaties, spotlight/magneet-effecten, kopieerknop, formulier
assets/img/           Afbeeldingen en favicon
```

## Lokaal bekijken

Open `index.html` in je browser, of start een simpele server:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Samenwerken

- Werk in een eigen branch (`feature/...`) en open een pull request naar `main`.
- Elke push naar `main` wordt automatisch live gezet (GitHub Pages: "Deploy from a branch", `main` / root).
- Houd pull requests klein en per onderwerp (bv. één sectie of één pagina) om merge-conflicten te voorkomen.
- Header en footer staan in elke pagina; pas ze bij een wijziging in alle vier aan. Submappen gebruiken `../assets/...`.
- Opmaak volgens `.editorconfig` (2 spaties, UTF-8, LF).
- **Ontwerp:** volg `DESIGN.md`, inclusief de lijst "AI-kenmerken vermijden" in §8. Geen losse hex-kleuren buiten `:root`, geen nieuwe lettertypes, en bouw nieuwe secties uit de bestaande componenten (`card`, `service-row`, `bento`, `split`, `pains`, `pillars`, `expect`, `cta`).
- **Animaties via attributen:** `data-reveal` (infaden), `data-stagger` (kinderen na elkaar), `data-split` (kop woord voor woord; `data-split="hero"` start direct), `data-scroll-reveal` (woorden lichten op tijdens scrollen), `data-magnet` (knop volgt de muis), `data-parallax="0.06"`. Alles respecteert "minder beweging" in het besturingssysteem, en bezoekers kunnen animaties pauzeren (knop in de band op home en in de footer).
- **Toegankelijkheid:** nieuwe onderdelen checken met de `better-accessibility` skill. Koppen met `data-split` krijgen automatisch een onzichtbare leesbare versie voor schermlezers.

## Nog te doen

- [ ] Echt telefoonnummer en e-mailadres (nu `06 12 34 56 78` / `thijs@voorbeeld.nl`, in alle pagina's + `data-mailto` op het contactformulier)
- [ ] Portretfoto in hogere resolutie (nu 248×248 px)
- [ ] KvK-nummer
- [ ] Privacyverklaring (`privacy/`) laten controleren: het is een concept op basis van hoe de site nu werkt (formulier via mailprogramma, geen cookies, GitHub Pages en Google Fonts)
- [ ] Eventueel: echt contactformulier (bv. Formspree), eigen domein
- [ ] Sitemap aanmelden in Google Search Console: `https://ddoverkoop-blip.github.io/dienstverlener1/sitemap.xml`
- [ ] Google Bedrijfsprofiel aanmaken (Nuenen) met dezelfde naam, adres en telefoon als op de site
- [ ] Deelafbeelding van 1200×630 px (`og:image`), nu wordt het kleine portret gebruikt
- [ ] Na echte contactgegevens: `telephone` en `email` toevoegen aan de JSON-LD in `index.html`

## Credits

Ontworpen met de `web-design` skill (`.claude/skills/web-design`, xiaopu-ai/web-design, MIT).
Conversie, SEO en toegankelijkheid verbeterd met `page-cro`, `seo-audit` en `better-accessibility` (`.claude/skills/`, uit [boraoztunc/skills](https://github.com/boraoztunc/skills), MIT).
Opgeschoond met `taste-skill` en `redesign-skill` (`.claude/skills/`, uit [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill), MIT).
Motion effects inspired by [vue-bits](https://github.com/DavidHDev/vue-bits) by DavidHDev (MIT). Lettertypes: Plus Jakarta Sans en DM Sans (Google Fonts, OFL).
