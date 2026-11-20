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
$$('section[id]').forEach(s => {
  const id = s.id;
  const obs = new IntersectionObserver(err => {
    err.forEach(entry => {
      const link = $(`.nav-link[data-section="${id}"]`);
      if (entry.isIntersecting) link.classList.add('active'); else link.classList.remove('active');
    });
  }, { threshold: 0.4 });
  obs.observe(s);
});

// Formspree integration
const form = $('#contactForm');
const statusEl = $('#form-status');

// CTA & goal tracking
// Statcounter's free plan has no client-side event API. Goals are configured
// in the Statcounter dashboard (conversion goal URL) and external/mailto link
// clicks are auto-tracked as exit links by the standard snippet.
// This module wires the hooks so the goals are measurable and future
// analytics (GA4/Plausible) drop in without rewiring.
function trackGoal(name) {
  // Future-proof: push to dataLayer if GA4/Firebase tag is present
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: 'goal', goal: name });
  }
  // Local session tally for debugging (inspect in DevTools: window.goals)
  window.goals = window.goals || {};
  window.goals[name] = (window.goals[name] || 0) + 1;

  // Statcounter custom event tracking
  if (typeof _statcounter !== 'undefined') {
    _statcounter.push({ 'sc_event': name });
  }
}

['hero-primary', 'hero-secondary', 'contact-submit', 'mobile-cta'].forEach(name => {
  $$(`[data-cta="${name}"]`).forEach(el => {
    el.addEventListener('click', () => trackGoal(name));
  });
});

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
        trackGoal('contact-form-success');
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
