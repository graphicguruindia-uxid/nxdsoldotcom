# Page: Landing (AI Content Templates)

> This file overrides MASTER.md rules for the marketing landing page at `/`.
> All other pages follow MASTER.md unless they have their own override.

---

## Layout & Section Order

| # | Section | Purpose |
|---|---------|---------|
| 1 | **Navbar** (sticky glass) | Logo, nav links, "Sign in" ghost, "Get Started" CTA |
| 2 | **Hero** | Headline, sub, product screenshot/mock, dual CTA |
| 3 | **Value Prop Strip** | 3–4 icon + text items, glass-card row |
| 4 | **Features Grid** | 3 feature cards (block regen, export, templates) |
| 5 | **How It Works** | 3-step horizontal: Pick → Fill → Generate |
| 6 | **Pricing** | 3 tiers: Free / Pro / Team |
| 7 | **FAQ** | Accordion, 4–6 items |
| 8 | **Final CTA** | Full-width glass card, one button |
| 9 | **Footer** | Logo, links, © 2026 |

---

## Hero

- **Background:** Vibrant gradient (Trust Blue → Secondary, 135°) with subtle glass overlay
- **Scrim:** `rgba(15, 23, 42, 0.55)` to guarantee 4.5:1 contrast on headline
- **Headline:** `clamp(2.5rem, 6vw, 4rem)`, weight 800, white
- **Sub-headline:** 1.25rem, weight 400, `rgba(255,255,255,0.85)`
- **CTAs:**
  - Primary: "Start Free — No Card Required" (accent `#EA580C`, white text)
  - Secondary: "See Templates" (ghost, white border)
- **Product mock:** Centered, `max-width: 720px`, glass-card border, subtle float animation (disabled under `prefers-reduced-motion`)
- **Eyebrow:** Uppercase, `letter-spacing: 0.12em`, 0.875rem, `rgba(255,255,255,0.7)`

---

## Feature Cards

- 3 cards, equal width, `max-width: 1200px` grid
- **Glass card:** `background: rgba(255,255,255,0.7)`, `backdrop-filter: blur(12px)`, `border: 1px solid rgba(255,255,255,0.2)`
- **Radius:** 16px
- **Padding:** 32px
- **Hover:** `translateY(-4px)`, `box-shadow: var(--shadow-lg)`, 200ms ease
- **Icon:** 48px, Lucide SVG, primary color
- **Title:** 1.25rem, weight 700
- **Body:** 1rem, weight 400, muted-foreground

---

## Pricing Tiers

| Tier | Card Style | CTA Style |
|------|-----------|-----------|
| Free | `border: 1px solid var(--color-border)`, white bg | Ghost button, primary text |
| Pro (highlighted) | `border: 2px solid var(--color-primary)`, white bg, `box-shadow: var(--shadow-lg)` | Solid primary button |
| Team | `border: 1px solid var(--color-border)`, white bg | Ghost button, primary text |

- **Highlight badge:** "Most Popular" pill, accent bg, 0.75rem, centered above card
- **Feature list:** Checkmark icons (Lucide `check`), 0.875rem
- **Price:** 2.5rem, weight 800, with "/mo" suffix at 1rem muted

---

## FAQ Accordion

- Each item: glass-card, 16px radius
- **Header:** 1rem weight 600, cursor pointer, `+` icon rotates 45° on open
- **Body:** 0.9375rem, weight 400, max-height transition 300ms
- **Open state:** `border-color: var(--color-primary)`

---

## Responsive Behavior

| Breakpoint | Changes |
|-----------|---------|
| **< 768px** | Hero CTA stacks vertical, feature cards stack single column, pricing stacks, nav hamburger |
| **768–1024px** | Feature cards 2-col, pricing 2-col (Free + Pro side by side, Team below) |
| **≥ 1024px** | Full 3-col feature grid, 3-col pricing |

---

## Glassmorphism Specifics (Landing Only)

- **Navbar:** `background: rgba(255,255,255,0.8)`, `backdrop-filter: blur(10px)`, bottom border `1px solid rgba(0,0,0,0.06)`
- **Section rhythm:** Alternate white (`#FFFFFF`) and muted (`#F8FAFC`) backgrounds
- **Dark section (Hero, Final CTA):** Gradient bg, glass cards on top
- **Light sections (Features, Pricing, FAQ):** Standard white/muted, glass cards only on hover

---

## Accessibility Notes

- Hero scrim: verify headline contrast ≥ 4.5:1 against gradient
- Focus ring on all CTAs: `0 0 0 3px rgba(37, 99, 235, 0.35)`
- Skip-to-content link as first tab stop
- All icons: `aria-hidden="true"`
- Pricing cards: `role="region"`, `aria-label` per tier
- FAQ items: `aria-expanded`, `aria-controls`

---

## Anti-Patterns (Landing Specific)

- ❌ Auto-playing video in hero (use static mock with subtle float)
- ❌ More than 2 CTAs in hero
- ❌ Testimonials with fake names/logos
- ❌ Countdown timers or fake urgency
- ❌ Animated backgrounds that distract from headline
