// Interactie en animaties – zie DESIGN.md §7 (niveau L2, geen externe libraries).
// Motion effects inspired by vue-bits (https://github.com/DavidHDev/vue-bits) by DavidHDev (MIT).

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* ---------- Mobiel menu ---------- */
const toggle = document.querySelector('.nav-toggle');
const menu = document.getElementById('menu');

function setMenu(open) {
  menu.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', open);
  toggle.setAttribute('aria-label', open ? 'Menu sluiten' : 'Menu openen');
  document.body.classList.toggle('menu-open', open);
}

if (toggle && menu) {
  toggle.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
}

/* ---------- Header + voortgangsbalk ---------- */
const header = document.querySelector('.site-header');
const progress = document.querySelector('.progress');
let lastY = window.scrollY;
let ticking = false;

function onScroll() {
  const y = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (progress) progress.style.setProperty('--p', max > 0 ? (y / max).toFixed(4) : 0);
  if (header) {
    header.classList.toggle('is-scrolled', y > 40);
    const menuOpen = menu && menu.classList.contains('open');
    header.classList.toggle('is-hidden', !menuOpen && y > lastY && y > 400);
  }
  lastY = y;
  updateScrollEffects();
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
}, { passive: true });

/* ---------- SplitText / ScrollFloat: woorden in maskers ---------- */
function splitWords(el) {
  let i = 0;
  const walk = (node) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
          const outer = document.createElement('span');
          outer.className = 'split-word';
          const inner = document.createElement('span');
          inner.textContent = part;
          inner.style.setProperty('--i', i++);
          outer.appendChild(inner);
          frag.appendChild(outer);
        });
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE && child.tagName !== 'BR') {
        walk(child);
      }
    });
  };
  if (!el.getAttribute('aria-label')) el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim());
  walk(el);
  el.querySelectorAll('.split-word').forEach((w) => w.setAttribute('aria-hidden', 'true'));
}

document.querySelectorAll('[data-split]').forEach(splitWords);

/* ---------- ScrollReveal: woorden lichten op tijdens scrollen ---------- */
const srBlocks = [...document.querySelectorAll('[data-scroll-reveal]')].map((el) => {
  const words = [];
  const walk = (node, accent) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
          const span = document.createElement('span');
          span.className = 'sr-word' + (accent ? ' accent' : '');
          span.textContent = part;
          words.push(span);
          frag.appendChild(span);
        });
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        const isAccent = accent || child.tagName === 'EM';
        if (child.tagName === 'EM') {
          walk(child, true);
          child.replaceWith(...child.childNodes);
        } else {
          walk(child, isAccent);
        }
      }
    });
  };
  walk(el, false);
  return { el, words, visible: false };
});

/* ---------- Parallax ---------- */
const parallaxEls = [...document.querySelectorAll('[data-parallax]')];

/* ---------- Voortgang langs de drie niveaus ---------- */
const levelTracks = [...document.querySelectorAll('[data-track]')];

function updateScrollEffects() {
  const vh = window.innerHeight;

  if (!reduceMotion) {
    srBlocks.forEach(({ el, words, visible }) => {
      if (!visible) return;
      const r = el.getBoundingClientRect();
      const t = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
      const lit = Math.round(t * words.length);
      words.forEach((w, idx) => w.classList.toggle('lit', idx < lit));
    });

    if (window.innerWidth > 760) {
      parallaxEls.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        const speed = parseFloat(el.dataset.parallax) || 0.08;
        const offset = (r.top + r.height / 2 - vh / 2) * -speed;
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      });
    }
  }

  levelTracks.forEach((track) => {
    const r = track.getBoundingClientRect();
    const t = Math.min(1, Math.max(0, (vh * 0.6 - r.top) / r.height));
    track.style.setProperty('--lp', t.toFixed(3));
  });
}

/* ---------- Zichtbaarheid: reveals, koppen, pauzeren buiten beeld ---------- */
if ('IntersectionObserver' in window) {
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); revealObs.unobserve(e.target); }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });

  document.querySelectorAll('[data-reveal], [data-stagger], [data-split]:not([data-split="hero"])')
    .forEach((el) => revealObs.observe(el));

  const srObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      const block = srBlocks.find((b) => b.el === e.target);
      if (block) block.visible = e.isIntersecting;
    });
    updateScrollEffects();
  });
  srBlocks.forEach((b) => srObs.observe(b.el));

  const pauseObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => e.target.classList.toggle('is-paused', !e.isIntersecting));
  });
  document.querySelectorAll('[data-pause]').forEach((el) => pauseObs.observe(el));
} else {
  document.querySelectorAll('[data-reveal], [data-stagger], [data-split]').forEach((el) => el.classList.add('is-in'));
  srBlocks.forEach((b) => b.words.forEach((w) => w.classList.add('lit')));
}

// Hero-koppen starten direct na het laden (na de lettertypes, zodat niets verspringt)
function playHero() {
  document.querySelectorAll('[data-split="hero"]').forEach((el) => el.classList.add('is-in'));
}
if (document.fonts && document.fonts.ready) {
  Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 900))]).then(playHero);
} else {
  playHero();
}

/* ---------- Magnet: knoppen volgen de muis ---------- */
if (canHover && !reduceMotion) {
  document.querySelectorAll('[data-magnet]').forEach((el) => {
    let frame = null;
    const strength = 0.28;
    el.addEventListener('pointermove', (e) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * strength;
        const y = (e.clientY - r.top - r.height / 2) * strength;
        el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
        frame = null;
      });
    });
    el.addEventListener('pointerleave', () => {
      if (frame) { cancelAnimationFrame(frame); frame = null; }
      el.style.transform = '';
    });
  });
}

/* ---------- SpotlightCard: licht volgt de muis ---------- */
if (canHover) {
  document.querySelectorAll('.card').forEach((card) => {
    let frame = null;
    card.addEventListener('pointermove', (e) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
        frame = null;
      });
    });
  });
}

/* ---------- Aanpak: actief niveau in de navigatie ---------- */
const levelLinks = [...document.querySelectorAll('.level-nav a')];
if (levelLinks.length && 'IntersectionObserver' in window) {
  const levelObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      levelLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === `#${e.target.id}`));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  levelLinks.forEach((a) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) levelObs.observe(target);
  });
}

/* ---------- E-mailadres kopiëren ---------- */
document.querySelectorAll('[data-copy]').forEach((btn) => {
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy);
    } catch {
      const tmp = document.createElement('textarea');
      tmp.value = btn.dataset.copy;
      document.body.appendChild(tmp);
      tmp.select();
      document.execCommand('copy');
      tmp.remove();
    }
    btn.classList.add('copied');
    btn.setAttribute('data-label', 'Gekopieerd');
    setTimeout(() => btn.classList.remove('copied'), 2000);
  });
});

/* ---------- Jaartal in footer ---------- */
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

/* ---------- Contactformulier: opent voorlopig de mailclient ---------- */
const form = document.getElementById('contact-form');

if (form) form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const subject = encodeURIComponent(`Contactaanvraag van ${data.get('naam')}`);
  const body = encodeURIComponent(`${data.get('bericht')}\n\n${data.get('naam')}\n${data.get('organisatie') || ''}\n${data.get('email')}`);
  window.location.href = `mailto:${form.dataset.mailto}?subject=${subject}&body=${body}`;
  // Vangnet voor bezoekers zonder mailprogramma
  const status = document.getElementById('form-status');
  if (status) status.hidden = false;
});

/* ---------- Mobiele actiebalk: zichtbaar na de eerste sectie, verborgen bij het contactblok ---------- */
const mobileCta = document.querySelector('.mobile-cta');
if (mobileCta) {
  const heroEl = document.querySelector('.hero, .page-hero');
  const ctaEl = document.querySelector('.cta');
  const updateMobileCta = () => {
    const pastHero = heroEl ? heroEl.getBoundingClientRect().bottom < 0 : window.scrollY > 400;
    const atCta = ctaEl ? ctaEl.getBoundingClientRect().top < window.innerHeight : false;
    mobileCta.classList.toggle('is-visible', pastHero && !atCta);
  };
  window.addEventListener('scroll', () => requestAnimationFrame(updateMobileCta), { passive: true });
  updateMobileCta();
}

onScroll();
