# Website zelfstandig adviseur / coach

Eenvoudige, statische website (HTML + CSS + JavaScript, geen build-stap) die automatisch wordt gepubliceerd via GitHub Pages.

**Live:** https://ddoverkoop-blip.github.io/dienstverlener1/

## Structuur

```
index.html            Homepage (alle secties: hero, diensten, werkwijze, over mij, ervaringen, contact)
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
- Nieuwe pagina's: kopieer de `<header>` en `<footer>` uit `index.html` en gebruik relatieve paden (`assets/...`).
- Opmaak volgens `.editorconfig` (2 spaties, UTF-8, LF).

## Nog te doen (placeholders)

Zoek in de code naar `[` om alle placeholders te vinden:

- [ ] Naam, KvK-nummer, plaats
- [ ] E-mailadres en telefoonnummer (`index.html` en `data-mailto` op het formulier)
- [ ] Portretfoto in `assets/img/` en vervangen in de hero
- [ ] Tekst "Over mij" en echte ervaringen/testimonials
- [ ] Kleuren/fonts afstemmen op huisstijl (`assets/css/style.css`)
- [ ] Eventueel: echt contactformulier (bv. Formspree), privacyverklaring, eigen domein
