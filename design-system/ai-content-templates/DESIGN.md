---
name: ai-content-templates-app
description: "Application design system for the NXDSOL AI Content Templates SaaS product. Adapts the NXDSOL glassmorphism brand (Trust Blue + Orange CTA, Plus Jakarta Sans) to a content-workspace app: clean white canvas, dense but breathable template library, and a block-based generation preview. Tokens map to Tailwind/shadcn CSS variables."
version: beta
colors:
  primary: "#2563EB"
  primary-hover: "#1d4ed8"
  on-primary: "#FFFFFF"
  secondary: "#3B82F6"
  accent: "#EA580C"
  accent-hover: "#c2410c"
  on-accent: "#FFFFFF"
  canvas: "#F8FAFC"
  surface: "#FFFFFF"
  surface-muted: "#F1F5F9"
  foreground: "#1E293B"
  muted-foreground: "#475569"
  faint-foreground: "#94A3B8"
  border: "#E2E8F0"
  border-strong: "#CBD5E1"
  destructive: "#DC2626"
  destructive-muted: "#FEF2F2"
  success: "#16A34A"
  success-muted: "#F0FDF4"
  warning: "#D97706"
  warning-muted: "#FFFBEB"
  ring: "#2563EB"
  ring-opacity: "0.35"
  glass-nav: "rgba(255, 255, 255, 0.8)"
category-tokens:
  blog: "#2563EB"
  social: "#7C3AED"
  email: "#0D9488"
  ads: "#EA580C"
  seo: "#0369A1"
  sales: "#DB2777"
font-family: "Plus Jakarta Sans"
typography:
  font-stack: "var(--font-sans)"
  fs-hero: "clamp(2.25rem, 5vw, 3.5rem)"
  fs-h1: "2rem"
  fs-h2: "1.5rem"
  fs-h3: "1.25rem"
  fs-body: "1rem"
  fs-small: "0.875rem"
  fs-caption: "0.75rem"
  lh-body: "1.5"
  lh-content: "1.7"
  tracking-eyebrow: "0.12em"
spacing:
  base: "16px"
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  3xl: "64px"
radius:
  sm: "6px"
  md: "8px"
  card: "12px"
  panel: "16px"
  pill: "999px"
shadow:
  sm: "0 1px 2px rgba(16, 24, 40, 0.05)"
  md: "0 4px 6px -1px rgba(16, 24, 40, 0.1)"
  lg: "0 10px 15px -3px rgba(16, 24, 40, 0.1)"
  xl: "0 20px 25px -5px rgba(16, 24, 40, 0.15)"
focus-ring: "0 0 0 3px rgba(37, 99, 235, 0.35)"
layout:
  nav-height: "56px"
  sidebar-width: "220px"
  workspace-panel-width: "380px"
  content-max-width: "720px"
  library-max-width: "900px"
touch-target-min: "44px"
---

# Design System: AI Content Templates (App)

## 1. Visual Theme & Atmosphere

The application is **content-first and calm**. Unlike the marketing site — which leads with glassmorphism — the app uses glass sparingly (top nav, floating bulk-action bar) and keeps the working surface white and distraction-free. The product's emotional promise: *your content, generated in minutes, without chaos*. Density is moderate: the library is scannable, the generation canvas is spacious. Trust Blue grounds the interface; Orange is reserved almost exclusively for the **Generate** action and pricing emphasis.

## 2. Color Palette & Roles

- **Primary** – `#2563EB` (Trust Blue) – navigation active state, links, selected states, streaming block border.
- **Primary Hover** – `#1d4ed8` – hover on primary fills.
- **Accent** – `#EA580C` (Signal Orange) – the **Generate** button only, "Most Popular" pricing badge, required-field markers. Never used decoratively.
- **Canvas** – `#F8FAFC` (Cloud White) – app background behind panels.
- **Surface** – `#FFFFFF` (Pure White) – cards, panels, canvas.
- **Foreground** – `#1E293B` (Slate Ink) – all body and heading text.
- **Muted Foreground** – `#475569` (Slate Gray) – secondary text, meta rows, placeholders.
- **Faint Foreground** – `#94A3B8` (Haze Gray) – timestamps, disabled.
- **Border** – `#E2E8F0` – default separators; **Border Strong** – `#CBD5E1` – focused/pressed.
- **Destructive** – `#DC2626` (Alert Red) – delete, generation failure, validation errors; `#FEF2F2` for tinted error backgrounds.
- **Success** – `#16A34A` – toasts, saved confirmation.
- **Category colors** – six semantic category chips (Blog blue, Social violet, Email teal, Ads orange, SEO sky, Sales pink). Used ONLY on category tags and filters, never on actions.

## 3. Typography Rules

- **Single family:** Plus Jakarta Sans (300–800), loaded via Google Fonts with `display=swap`.
- **Content canvas uses a larger size** (1.125rem, line-height 1.7) than UI chrome (1rem, 1.5) — generated content is the hero, UI recedes.
- **Eyebrows** (block names, section labels): 0.75rem, uppercase, `letter-spacing: 0.08em–0.12em`, muted-foreground.
- **Weights:** 800 hero/prices, 700 headings, 600 titles/labels/buttons, 500 nav, 400 body.
- **Code/variables:** `ui-monospace` stack, 0.875rem, `surface-muted` background, 4px padding — used for `{{variable}}` tokens and export snippets.

## 4. Component Stylings

- **Buttons:** 8px radius, 44px min height, weight 600. Primary = `#2563EB` fill; Accent = Generate-only; Ghost = transparent + primary text; Destructive = `#DC2626` text or `#FEF2F2` tint. 200ms ease transitions; active state `translateY(1px)`.
- **Template cards:** 12px radius, white, 1px border, `shadow-sm`; hover lift `translateY(-2px)` + `shadow-md`. Category tag pill top-left.
- **AI blocks (generation canvas):** 12px radius, 1px border; 2px left border as state — animated pulse while streaming (primary), solid primary when done, destructive on failure. Header bar with block name + Regenerate/Copy actions.
- **Inputs:** 8px radius, 44px height, 1px border `#E2E8F0`; focus = primary border + `ring` box-shadow. Inline errors below field in destructive with `circle-alert` icon, `aria-describedby` linked.
- **Filter chips:** pill, 36px height; active = primary fill white text; inactive = canvas bg + border.
- **Toasts:** bottom-right, 12px radius, `shadow-lg`, 4s auto-dismiss; success uses green check, error uses red alert icon.
- **Nav (top):** 56px, `rgba(255,255,255,0.8)` + `backdrop-filter: blur(10px)`, bottom 1px border `rgba(0,0,0,0.06)`. Active link = primary text + 2px primary underline.

## 5. Layout Principles

- **Breakpoints:** 375 / 768 / 1024 / 1440. App is desktop-first but fully usable at 375px.
- **Workspace:** split 380px variables panel + fluid canvas at ≥1024px; stacks below 1024px with sticky Generate bar.
- **Generated content:** max-width 720px, centered, 48px canvas padding — reading column width.
- **Library:** max-width 900px; cards 20px padding.
- **Spacing rhythm:** 8px base scale (4/8/16/24/32/48/64). Panel padding 24px; section gaps 32px.
- **Touch targets:** ≥44×44px everywhere including icon buttons (36px icons get 8px invisible padding).
- **Safe areas:** sticky bars respect `env(safe-area-inset-bottom)` on mobile.

## 6. Motion & Feedback

- **Streaming is the signature motion:** token-by-token text with a pulsing 2px primary left border. No full-page spinners. Block-level shimmer placeholder while waiting for the first token.
- **Transitions:** 150–300ms ease for hover/state; 300ms for accordions; 200ms for card lifts.
- **`prefers-reduced-motion`:** all streaming pulse, shimmer, and lift animations become static states (content still appears incrementally — that is feedback, not decoration).
- **State visibility:** every async action shows progress ("Generating block 2 of 4"), partial results on failure, and cost per generation ("620 words · $0.02").

## 7. Accessibility Contract

- WCAG AA: 4.5:1 text contrast, 3:1 for UI components.
- Skip-to-content link; single tab order; `:focus-visible` ring (`0 0 0 3px rgba(37,99,235,0.35)`) on every interactive element.
- Streaming progress announced via `aria-live="polite"` ("Generating block 2 of 4: intro").
- Form errors: inline per field + focusable summary with links to fields.
- Icons: Lucide set, consistent 1.5px stroke, decorative ones `aria-hidden="true"`, standalone icon buttons get `aria-label`.
- Generated content is real selectable text, never images.

## 8. Design System Notes for Agent Generation

- **Stack:** Next.js 14 + Tailwind + shadcn/ui. Map tokens to `tailwind.config`/CSS variables: `--color-primary`, `--color-accent`, etc.
- **Icon set:** Lucide only (1.5px stroke, currentColor). No emoji, no mixed sets.
- **Glass is for chrome, not content:** only the top nav and floating action bars use `backdrop-filter: blur()`. The canvas and cards stay solid white.
- **Orange discipline:** if you are about to use `#EA580C` anywhere other than Generate/pricing/required markers, stop — use Primary.
- **Category colors** appear only on tags/chips. They must never carry interactive meaning (don't style a destructive action with a category color).
- **Density:** this is a tool, not a landing page — prefer 16–24px gutters, compact meta rows (0.75rem), and visible state over whitespace theater.
- **Every generated output shows its cost.** Budget awareness is a trust feature, not a detail.
- **Block-level regeneration is the product's differentiator** — Regenerate buttons must be visible on every completed block, never buried in a menu, and the button must never be disabled after generation.
