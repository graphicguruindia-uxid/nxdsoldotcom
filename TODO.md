# NXDSOL Site Elevation - Implementation Todo

## Phase 1: HTML - index.html
- [ ] Update `<head>` with SEO meta tags, OG/Twitter cards, canonical, preload/preconnect, SRI
- [ ] Add JSON-LD Organization + WebSite schema
- [ ] Add skip-to-content link
- [ ] Update navbar: logo from images/, active-section highlighting, ARIA
- [ ] Hero: fix 100vh+padding overflow, dark scrim/gradient, proper heading order, eyebrow + value prop + CTAs
- [ ] Services: h3 cards, tightened copy
- [ ] About: keep checklist + add "How we work" 3-step strip
- [ ] Contact: Formspree form with honeypot, fetch submit, success/error states; email copy-to-clipboard
- [ ] Footer: logo, quick links, email, Hyderabad, © 2026
- [ ] Sticky mobile CTA bar
- [ ] Restore Statcounter + goal tracking listeners

## Phase 2: CSS - css/style.css
- [ ] CSS custom properties: palette, type scale, spacing, radius, shadow, focus ring
- [ ] Layered structure: tokens → base → components → sections → responsive
- [ ] Consistent buttons, card hover (lift+shadow), :focus-visible rings
- [ ] Light/dark section rhythm via surface tokens
- [ ] Responsive: svh units, hero type scaling, card stacking, ≥44px touch targets
- [ ] Hero background preload optimization

## Phase 3: JS - js/main.js
- [ ] Guard #scrollTopBtn listener
- [ ] Replace window.onscroll with addEventListener
- [ ] Merge duplicate scroll handlers
- [ ] Formspree fetch submit with pending/success/error states
- [ ] Copy-to-clipboard for email
- [ ] Active-section highlighting for navbar
- [ ] Sticky mobile CTA bar show/hide
- [ ] Statcounter goal tracking on CTA clicks + form submit

## Phase 4: Assets & Files
- [ ] Create robots.txt (allow all + sitemap ref)
- [ ] Create sitemap.xml (single URL, structured for future)
- [ ] Generate favicon + apple-touch-icon from NXDSOLicon.png
- [ ] Create single optimized navbar/footer logo (<30KB)
- [ ] Replace Font Awesome CDN with inline SVGs (8 icons)

## Phase 5: Cleanup (disk only, no commit)
- [ ] Delete fonts/
- [ ] Delete ggcss*.css, ggscripts*, js/bootstrap.js, jquery-ui.css, bootstrap-datepicker.css, FontAwesome_400.font.js
- [ ] Delete large original logo PNGs (keep only optimized logo + NXDSOLicon.png)
- [ ] Delete index-0.html (after Statcounter port)

## Phase 6: Verification
- [ ] HTML validation (Nu Html Checker)
- [ ] Manual test: all anchors, form submit, hamburger, scroll-top, 3 viewports, keyboard tab-through, clean console
- [ ] Write change summary (files added/modified/deleted)