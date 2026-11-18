# NXDSOL.com Site Elevation — Design Spec

**Date:** 2026-10-18
**Status:** Approved (sections 1–4 reviewed in chat)
**Repo:** D:\Projects\nxdsoldotcom → GitHub Pages → nxdsol.com

## 1. Context & Current State

NXDSOL ("Next Experience Digital Solutions Pvt Ltd") is a Hyderabad-based IT consulting firm. The site is a **single-page static HTML site served by GitHub Pages** with a custom domain (`CNAME` → nxdsol.com). No build tooling, no package.json, no framework.

Key findings from audit:

- An uncommitted redesign pivots positioning from generic "coming soon" to an **AI/ML transformation consultancy** (`index.html`, 153 lines, Bootstrap 5 CDN + `css/style.css` + `js/main.js`). The live site still shows the old coming-soon page.
- **Critical gaps in the redesign:**
  - Contact form is inert (no `action`, no `method`, no `name` attributes) and the old `mailto:` was removed → zero lead capture.
  - Analytics removed (live page has Statcounter `sc_project=13204603`; new page has none).
  - SEO regression: no meta description, OG tags, canonical, favicon, robots.txt, sitemap, or JSON-LD.
  - Zero ARIA/labels; `outline: none` kills focus; heading skips h2→h4.
  - LCP is a CSS background image behind two render-blocking cross-origin stylesheets with no preload; `<img>` lacks dimensions (CLS risk).
  - Font Awesome full CSS loaded for 8 icons.
- ~95% of repo assets are dead template code (`fonts/`, `ggcss*`, `ggscripts*`, `bootstrap.js`, jQuery-era leftovers, 3.2 MB unused logos).
- Redesign files (`css/style.css`, `js/main.js`) are **untracked** — single-disk-loss risk.

## 2. Decisions (user-confirmed)

| Question | Decision |
|---|---|
| Stack/hosting | **Stay static HTML on GitHub Pages** — no build tooling |
| Contact form backend | **Formspree** (user creates form; ID left as placeholder) |
| Analytics | **Keep Statcounter** (reuse `sc_project=13204603`) |
| Available content | **Bare minimum:** logo PNGs in repo + email address. No testimonials/clients/case studies — no invented metrics. |
| Approach | **Option 1 — polish in place** + SEO groundwork (sitemap/robots/JSON-LD) |
| Git | **Do NOT commit.** All changes stay in the working tree. Final output includes a change summary. |

## 3. Scope

In scope: UX/visual polish, performance fixes, working lead capture, SEO head + structured data, accessibility remediation, CRO improvements, JS hardening, dead-asset cleanup (on disk).

Out of scope: stack migration, new pages (structure prepared for future), service workers/PWA, dark mode toggle, third-party content (testimonials), email/phone we don't have (phone = placeholder only if provided later; otherwise email only).

## 4. Design

### 4.1 UX & Interface Polish

**Navbar**
- Sticky; NXD logo (compressed, from `images/`) + company name replaces generic brain icon.
- Active-section highlighting on scroll; shadow/bg after scroll.
- Bootstrap hamburger retained with `aria-expanded` + `aria-label`.

**Hero**
- Fix `100vh` + `body padding-top` overflow (`style.css:4,13-14`): `min-height: 100svh`, no double offset.
- Structure: eyebrow → `h1` → value prop → primary CTA ("Book a free consultation" → `#contact`) + secondary CTA (visible `mailto:` email link).
- Dark scrim/gradient over hero photo to guarantee WCAG AA text contrast.

**Sections**
- Services: 3 cards (Process Automation, Predictive Analytics, NLP & Chatbots), tightened copy, `h3` not `h4`.
- About/Why-Choose: keep checklist; add "How we work" 3-step strip (Discover → Build → Scale).
- Contact: dark section — form (left), direct email block + copy-to-clipboard (right).
- Footer: logo, quick links, email, Hyderabad location line, © 2026.

**Visual system**
- CSS custom properties: palette (primary/accent/surfaces), type scale, spacing, radius, shadow, focus ring.
- Consistent buttons, card hover (lift + shadow), `:focus-visible` rings.
- Intentional light/dark section rhythm via two surface tokens.

**Responsive**
- Media queries for hero type, card stacking, ≥44 px touch targets, navbar.
- `svh` units to avoid mobile URL-bar jump.

### 4.2 Performance & Technical Optimization

- `<link rel="preload">` for hero background image (LCP); `preconnect` for jsdelivr + cdnjs.
- SRI (`integrity`, `crossorigin`) on all three CDN tags.
- Cache-busting query strings on `css/style.css` and `js/main.js`.
- `<img>`: explicit `width`/`height`, `loading="lazy"`, `decoding="async"`, Unsplash `srcset`/`sizes`.
- Hero bg: keep `auto=format` (AVIF/WebP); evaluate `image-set()` mobile variant.
- Logo: produce **one** optimized navbar/footer logo asset (compress the best-looking source PNG → <30 KB, or use an existing small file if quality suffices). The original large PNG sources (1.4 MB, 1.1 MB, and whichever alternates are unused) are deleted in cleanup — only the single optimized logo + `NXDSOLicon.png` (favicon source) remain.
- Favicon + `apple-touch-icon` generated from `NXDSOLicon.png` (fixes 404).
- **Remove Font Awesome CDN**; replace 8 icons with inline SVGs. Bootstrap JS stays (navbar).
- Restore Statcounter snippets (port from `index-0.html:29-43`).
- `js/main.js`: guard `#scrollTopBtn` listener, replace `window.onscroll =` with `addEventListener`, merge duplicate scroll handlers.
- Repo cleanup (disk only, no commit): delete `fonts/`, `ggcss*.css`, `ggscripts*`, `js/bootstrap.js`, `jquery-ui.css`, `bootstrap-datepicker.css`, `FontAwesome_400.font.js`, the large original logo PNGs (replaced by the single optimized logo), `index-0.html` (after Statcounter port).

### 4.3 Feature Enhancements & Business Value + CRO

**Contact form (Formspree)**
- `action="https://formspree.io/f/{FORM_ID}"`, `method="POST"` — `{FORM_ID}` clearly marked placeholder + setup instructions (user creates form at formspree.io, ~2 min).
- JS-enhanced submit via `fetch`: pending/success/error states; no-JS fallback = plain POST to Formspree's success page.
- `name` attributes on all inputs; honeypot `_gotcha`; hidden subject field ("NXDSOL website inquiry").
- Success/error messaging with `role="status"` / `role="alert"`.

**Contact redundancy**
- Visible email as `mailto:` link + copy-to-clipboard button beside form.
- Nav secondary CTA: `mailto:`.

**Trust (no invented content)**
- "How we work" 3-step strip; factual positioning lines ("Hyderabad-based · AI/ML specialists · End-to-end delivery"). **No fake stats/client counts.**

**CRO**
- Sticky mobile CTA bar ("Consultation →") appearing after hero scroll (minimal JS/CSS).
- CTA copy: benefit-framed, lower-commitment.
- Statcounter goal tracking: click listeners on primary CTAs + form-submit event recorded as custom links.

### 4.4 SEO & Accessibility + Maintainability

**SEO**
- Head: unique meta description (~155 chars), canonical `https://nxdsol.com/`, OpenGraph + Twitter card tags, theme-color.
- Title: `NXDSOL — AI & Machine Learning Consulting | Hyderabad`.
- JSON-LD: `Organization` (name, url, logo, email, location: Hyderabad) + `WebSite`. No fake review schema.
- `robots.txt` (allow all + sitemap ref), `sitemap.xml` (single URL, structured for future pages).
- Semantics: `<main id="main">`, `<header>` for navbar, `aria-label` on nav/sections, heading order h1→h2→h3.

**Accessibility**
- Form: `<label for>` on every input, `autocomplete` (`name`, `email`), `required`/`aria-required`.
- Remove `outline: none`; `:focus-visible` ring token everywhere.
- `aria-label` on scroll-top button + toggler; `aria-hidden="true"` on decorative icons.
- Skip-to-content link as first tab stop.
- Contrast: verify hero scrim ≥4.5:1; darken `text-primary` token if borderline on white.
- Image alt: informative or `alt=""` if decorative.

**Maintainability & verification**
- `style.css` layered: tokens → base → components → sections → responsive (section-header comments only).
- All `querySelector` calls guarded in `main.js`.
- HTML validation pass (Nu Html Checker if available, else manual review).
- Manual test checklist: all anchors, form submit (real Formspree endpoint), hamburger, scroll-top, 3 viewports (375/768/1440), keyboard tab-through, clean console, FA removal didn't break icons.
- Deliverable: full change summary (files added/modified/deleted) — **no commits**.

## 5. Error Handling

- Form submit failure → inline error message with fallback `mailto:` link.
- Missing JS elements → guards, no console errors.
- Missing Formspree ID → form degrades to `mailto:` fallback (documented in placeholder comment).

## 6. Success Criteria

- All 5 priority areas addressed with verifiable browser checks.
- Form reaches Formspree (user-supplied ID); Statcounter records traffic + CTA goals.
- SEO head + robots/sitemap/JSON-LD present; heading order valid.
- Zero console errors; keyboard-navigable; no dead links/assets on served page.
- Working tree contains only referenced assets; nothing committed.
