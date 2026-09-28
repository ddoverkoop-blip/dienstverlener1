// Mobiel menu
const toggle = document.querySelector('.nav-toggle');
const menu = document.getElementById('menu');

toggle.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});

menu.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
});

// Jaartal in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Contactformulier: opent voorlopig de mailclient (geen backend nodig)
const form = document.getElementById('contact-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const subject = encodeURIComponent(`Contactaanvraag van ${data.get('naam')}`);
  const body = encodeURIComponent(`${data.get('bericht')}\n\n${data.get('naam')}\n${data.get('email')}`);
  window.location.href = `mailto:${form.dataset.mailto}?subject=${subject}&body=${body}`;
});
