# SDD ledger — plan: TODO.md (Phase 5: Cleanup, Phase 6: Verification)

## Pre-flight scan
- Phase 1-4: ✅ Complete (per audit 2026-11-18)
- Phase 5 Cleanup: ✅ COMPLETE — all dead files deleted
- Phase 6 Verification: IN PROGRESS

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

## Remaining Files (kept)
- NXDSOL_fav.ico.png (55KB) — source for favicon variants, kept for reproducibility
- logo-navbar.png (4.4KB) — optimized logo referenced in HTML

## Notes
- All deletions were git-tracked, fully recoverable via git restore
