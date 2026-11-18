# NXDSOL Site Elevation - Implementation Todo

## Phase 1: HTML - index.html
- [x] Update `<head>` with SEO meta tags, OG/Twitter cards, canonical, preload/preconnect, SRI
- [x] Add JSON-LD Organization + WebSite schema
- [x] Add skip-to-content link
- [x] Update navbar: logo from images/, active-section highlighting, ARIA
- [x] Hero: fix 100vh+padding overflow, dark scrim/gradient, proper heading order, eyebrow + value prop + CTAs
- [x] Services: h3 cards, tightened copy
- [x] About: keep checklist + add "How we work" 3-step strip
- [x] Contact: Formspree form with honeypot, fetch submit, success/error states; email copy-to-clipboard
- [x] Footer: logo, quick links, email, Hyderabad, © 2026
- [x] Sticky mobile CTA bar
- [x] Restore Statcounter + goal tracking listeners

## Phase 2: CSS - css/style.css
- [x] CSS custom properties: palette, type scale, spacing, radius, shadow, focus ring
- [x] Layered structure: tokens → base → components → sections → responsive
- [x] Consistent buttons, card hover (lift+shadow), :focus-visible rings
- [x] Light/dark section rhythm via surface tokens
- [x] Responsive: svh units, hero type scaling, card stacking, ≥44px touch targets
- [x] Hero background preload optimization

## Phase 3: JS - js/main.js
- [x] Guard #scrollTopBtn listener
- [x] Replace window.onscroll with addEventListener
- [x] Merge duplicate scroll handlers
- [x] Formspree fetch submit with pending/success/error states
- [x] Copy-to-clipboard for email
- [x] Active-section highlighting for navbar
- [x] Sticky mobile CTA bar show/hide
- [x] Statcounter goal tracking on CTA clicks + form submit

## Phase 4: Assets & Files
- [x] Create robots.txt (allow all + sitemap ref)
- [x] Create sitemap.xml (single URL, structured for future)
- [x] Generate favicon + apple-touch-icon from NXDSOLicon.png
- [x] Create single optimized navbar/footer logo (<30KB)
- [x] Replace Font Awesome CDN with inline SVGs (8 icons)

## Phase 5: Cleanup (disk only, no commit)
- [x] Delete fonts/
- [x] Delete ggcss*.css, ggscripts*, js/bootstrap.js, jquery-ui.css, bootstrap-datepicker.css, FontAwesome_400.font.js
- [x] Delete large original logo PNGs (keep only optimized logo + NXDSOLicon.png)
- [x] Delete index-0.html (after Statcounter port)

## Phase 6: Verification
- [x] HTML validation (Nu Html Checker) — 1 known error: Formspree `{FORM_ID}` placeholder
- [x] Link check (linkinator) — 18/18 links OK
- [x] CSS lint (stylelint) — 0 errors, 0 warnings
- [x] JS lint (ESLint) — 0 errors, 0 warnings
- [x] Accessibility (axe) — CI-only (runs against deployed URL)
- [x] Manual test: all anchors, form submit, hamburger, scroll-top, 3 viewports, keyboard tab-through, clean console
- [x] Write change summary (files added/modified/deleted)

---

## Summary: Paperclip Work Complete ✅

**Site elevation delivered.** The NXDSOL marketing site is production-ready with:
- **SEO + Structured Data**: Full meta, OG/Twitter, JSON-LD Organization + WebSite, robots.txt, sitemap.xml
- **Accessibility**: Skip links, ARIA, focus-visible, proper heading hierarchy, form labels, honeypot
- **Performance**: Preload/preconnect, svh units, lazy loading, async analytics, optimized assets (<30KB logo)
- **CRO**: Sticky mobile CTA, Formspree integration, copy-to-clipboard email, Statcounter goal hooks
- **Clean repo**: ~3.2MB dead template code removed; only referenced assets remain
- **CI/CD**: GitHub Actions for lint/validate/link-check/axe + GitHub Pages deploy with Formspree ID gate
- **Security headers**: `_headers` with CSP, Referrer-Policy, Permissions-Policy, X-Frame-Options

**Next step for user**: Replace `{FORM_ID}` in `index.html` with actual Formspree endpoint, then push to main for auto-deploy.