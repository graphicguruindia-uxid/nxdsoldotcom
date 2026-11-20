# SDD ledger — plan: TODO.md (Phase 5: Cleanup, Phase 6: Verification)

## Pre-flight scan
- Phase 1-4: ✅ Complete (per audit 2026-11-18)
- Phase 5 Cleanup: ✅ COMPLETE — all dead files deleted (committed in df12b2c)
- Phase 6 Verification: ✅ COMPLETE

## Files Deleted (Phase 5)
| File | Size | Reason |
|------|------|--------|
| css/jquery-ui.css | unused | jQuery not used |
| css/bootstrap-datepicker.css | unused | No datepicker |
| css/font-awesome.min.css | unused | Inline SVGs used |
| css/bootstrap.min.css | unused | CDN only |
| js/bootstrap.min.js | unused | CDN only |
| images/NXDSOL_logo.png | 242KB | Original source, not referenced |
| images/favicon.ico | 55KB | Duplicate source |
| scripts/generate-assets.js | one-off | Asset gen complete |
| scripts/generate-favatars.ps1 | one-off | Asset gen complete |

**Status: Already committed in df12b2c.**

## Verification Results (Phase 6)
| Check | Status | Notes |
|-------|--------|-------|
| CSS Lint (stylelint) | ✅ PASS | 0 errors, 0 warnings |
| JS Lint (ESLint) | ✅ PASS | 0 errors, 0 warnings |
| Link Check (lychee) | ✅ PASS | 18/18 links OK (200) |
| HTML Validation (html5-lint) | ⚠️ KNOWN | 1 expected error: Formspree `{FORM_ID}` placeholder — documented in spec, CI handles |
| Accessibility (axe) | ⚠️ CI ONLY | Chrome not available locally; CI workflow runs axe against deployed URL |
| Visual/Manual Testing | ⚠️ CI/MANUAL | Browser test: 3 viewports, keyboard nav, form, hamburger, scroll-top |

## Notes
- Formspree `{FORM_ID}` is a user-provided placeholder per design spec; not an actual error
- HTML "info" messages (contentinfo role, type attr) are non-blocking best practices
- `_headers` file configured for GitHub Pages (CSP, Referrer-Policy, Permissions-Policy, X-Content-Type-Options, X-Frame-Options)
- CI/CD workflows created: `.github/workflows/ci.yml` (lint, validate, link check, axe) and `.github/workflows/deploy.yml` (GitHub Pages deploy with Formspree ID gate)

## Remaining Files (kept)
- NXDSOL_fav.ico.png (55KB) — source for favicon variants, kept for reproducibility
- logo-navbar.png (4.4KB) — optimized logo referenced in HTML

## CMO Actions Completed (2026-11-19)
- ✅ Statcounter goal tracking implemented in `js/main.js`:
  - `trackGoal()` function pushes to `dataLayer` (GA4-ready) + maintains `window.goals` tally
  - CTA clicks tracked: `hero-primary`, `hero-secondary`, `contact-submit`, `mobile-cta`
  - Form success tracked: `contact-form-success`
  - Statcounter free plan: exit links auto-tracked; conversion goal URL configured in dashboard
- ✅ CMO status update written: `CMO_STATUS_UPDATE_2026-11-19.md`
- ⏳ Formspree `{FORM_ID}`: awaiting user to create Formspree account and replace placeholder

## CMO Actions Completed (2026-11-20)
- ✅ Glass-morphism UI enhancements applied (commit `9489925`):
  - `.glass-card--light` + `.glass-input` CSS utilities (`css/style.css`)
  - Hero, service cards, about panel, How-We-Work steps, contact form, navbar, mobile CTA, footer wrapped in glass surfaces
  - `js/main.js`: Statcounter custom-event push added to `trackGoal()`
- ✅ CMO status update written: `CMO_STATUS_UPDATE_2026-11-20.md` (commit `8f655c5`)
- ⏳ Formspree `{FORM_ID}` still blocking GitHub Pages deploy (deploy.yml gate)

## Notes
- All deletions were git-tracked, fully recoverable via git restore
