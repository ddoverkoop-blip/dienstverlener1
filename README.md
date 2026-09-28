# Thijs van Geenen – de excellente dienstverlener

Eenvoudige, statische website (HTML + CSS + JavaScript, geen build-stap) die automatisch wordt gepubliceerd via GitHub Pages.

**Live:** https://ddoverkoop-blip.github.io/dienstverlener1/

## Structuur

```
index.html            Home
over-thijs/index.html Over Thijs
aanpak/index.html     Aanpak (drie niveaus, ankers #niveau-1/2/3)
contact/index.html    Contact + formulier
404.html              Foutpagina
assets/css/style.css  Alle styling – kleuren en fonts staan als variabelen bovenaan (:root)
assets/js/main.js     Mobiel menu, jaartal in footer, contactformulier
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

## Nog te doen

- [ ] Echt telefoonnummer en e-mailadres (nu `06 12 34 56 78` / `thijs@voorbeeld.nl`, in alle pagina's + `data-mailto` op het contactformulier)
- [ ] Portretfoto in hogere resolutie (nu 248×248 px)
- [ ] KvK-nummer, privacyverklaring
- [ ] Eventueel: echt contactformulier (bv. Formspree), eigen domein
