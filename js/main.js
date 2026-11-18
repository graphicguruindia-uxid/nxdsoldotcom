// Main JavaScript interactions for Nexds already updated

// Utility helpers
const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

// Feature: Scroll to Top button
const scrollBtn = $('#scrollTopBtn');
const header = $('#mainNav');
const mobileCta = $('#mobileCtaBar');

let debounceTimeout;

function onScroll() {
  const scrolled = pageYOffset > 300;
  scrollBtn.classList.toggle('visible', scrolled);
  header.classList.toggle('scrolled', scrolled);
  mobileCta.classList.toggle('visible', scrolled && window.innerWidth < 992);
}

window.addEventListener('scroll', () => {
  cancelAnimationFrame(debounceTimeout);
  debounceTimeout = requestAnimationFrame(onScroll);
});

scrollBtn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Active section highlighting on nav links
const sections = Array.from($$('section[id]')).map(s => {
  const id = s.id;
  const obs = new IntersectionObserver(err => {
    err.forEach(entry => {
      const link = $(`.nav-link[data-section="${id}"]`);
      if (entry.isIntersecting) link.classList.add('active'); else link.classList.remove('active');
    });
  }, { threshold: 0.4 });
  obs.observe(s);
});

// Statcounter goal tracking placeholder (would integrate analytics via event listeners)
// Example usage: data-cta="hero-primary"
['hero-primary','hero-secondary','contact-submit','mobile-cta'].forEach(name => {
  const els = $$(`[data-cta="${name}"]`);
  els.forEach(el => el.addEventListener('click', () => console.log(`Statcounter goal: ${name}`)));
});

// Formspree integration
const form = $('#contactForm');
const statusEl = $('#formStatus');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    statusEl.textContent = 'Sending…';
    statusEl.setAttribute('role', 'status');
    fetch(form.action, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: data
    })
      .then(r => r.ok ? r.json() : Promise.reject(r))
      .then(() => {
        statusEl.textContent = 'Thank you! Your message has been sent.';
        statusEl.setAttribute('role', 'status');
        form.reset();
      })
      .catch(() => {
        statusEl.textContent = 'Oops! Something went wrong. Please try again later.';
        statusEl.setAttribute('role', 'alert');
      });
  });
}

// Copy email to clipboard
const copyBtn = $('#copyEmail');
const emailLink = $('#emailLink');
if (copyBtn && emailLink) {
  copyBtn.addEventListener('click', e => {
    e.preventDefault();
    navigator.clipboard.writeText(emailLink.textContent.trim()).then(() => {
      const copied = copyBtn.querySelector('.copied-text');
      if (copied) {
        copied.classList.add('visible');
        setTimeout(() => copied.classList.remove('visible'), 2000);
      }
    });
  });
}

// Polyfill for requestAnimationFrame in older IE? (not needed for static site)
