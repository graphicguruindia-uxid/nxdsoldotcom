# Page: Landing (AI Content Templates)

> This file overrides MASTER.md rules for the marketing landing page at `/`.
> All other pages follow MASTER.md unless they have their own override.
> Final copy sourced from `docs/marketing/LANDING_PAGE_COPY.md` (CMO, 2026-11-20).

---

## Layout & Section Order

| # | Section | Purpose |
|---|---------|---------|
| 1 | Navbar (sticky glass) | Logo, nav links, "Sign in" ghost, "Start Free" CTA |
| 2 | Hero | Eyebrow, H1, subhead, 2 CTAs, trust line, product mock |
| 3 | Problem Strip | "The blank page is expensive" — pain statement |
| 4 | Features | 6 feature cards (structures, streaming, block regen, brand voice, export, cost transparency) |
| 5 | How It Works | 4 steps: Pick → Fill → Generate & refine → Export & ship |
| 6 | Template Showcase | 6 categories, 21 templates at launch, "Browse all templates" CTA |
| 7 | Pricing | 3 tiers: Free ($0), Pro ($29/mo), Team ($79/mo) |
| 8 | FAQ | 7 accordion items |
| 9 | Final CTA | Full-width glass card, primary + secondary CTAs |
| 10 | Footer | Logo, links, © 2026 |

---

## Hero (final copy from CMO)

- **Background:** Vibrant gradient (Trust Blue → Secondary, 135°) with subtle glass overlay
- **Scrim:** `rgba(15, 23, 42, 0.55)` to guarantee 4.5:1 contrast on headline
- **Eyebrow:** "AI Content Templates" — uppercase, `letter-spacing: 0.12em`, 0.875rem, `rgba(255,255,255,0.7)`
- **H1:** "Great content, on demand." — `clamp(2.5rem, 6vw, 4rem)`, weight 800, white
- **Subhead:** "Pick a proven template, fill in your audience, tone, and key points — and get a finished, on-brand draft in minutes. Regenerate any section, export in the format you need, and get back to strategy." — 1.25rem, weight 400, `rgba(255,255,255,0.85)`
- **CTAs:**
  - Primary: "Start free — no credit card" (accent `#EA580C`, white text)
  - Secondary: "See the template library" (ghost, white border)
- **Trust line:** "Free tier: 100 generations/month · No credit card · Cancel anytime" — 0.875rem, `rgba(255,255,255,0.6)`
- **Product mock:** Centered, `max-width: 720px`, glass-card border, subtle float animation (disabled under `prefers-reduced-motion`)

---

## Problem Strip

- **H2:** "The blank page is expensive." — 2rem weight 700, centered, dark section
- **Copy block:** 3 sentences, 1.125rem, max-width 640px, centered, glass-card with light bg
- **Pull quote card (accent):** "Every hour spent fighting the blank page is an hour not spent selling." — italic, primary color, left border 4px accent

---

## Features (6 cards)

- **H2:** "Built for the way content actually gets made." — 2rem weight 700
- Grid: 3 columns desktop, 2 tablet, 1 mobile — `gap: 24px`
- **Glass card:** `background: rgba(255,255,255,0.7)`, `backdrop-filter: blur(12px)`, `border: 1px solid rgba(255,255,255,0.2)`, 16px radius, 32px padding
- **Hover:** `translateY(-4px)`, `box-shadow: var(--shadow-lg)`, 200ms ease
- **Icon:** 48px Lucide SVG, primary color
- **Title:** 1.25rem weight 700
- **Body:** 1rem weight 400 muted-foreground

| # | Icon | Title | Copy |
|---|------|-------|------|
| 1 | `layout-grid` | Proven structures, not raw prompts | 21+ templates across blog, social, email, ads, SEO, and sales — each one a battle-tested structure... |
| 2 | `zap` | Generate in minutes, watch it stream | Click Generate and watch each section appear live. No 90-second spinner... |
| 3 | `refresh-cw` | Regenerate one block, keep the rest | The intro is right; the conclusion is weak. Regenerate just the conclusion... |
| 4 | `palette` | Your brand voice, built in | Tell the engine your brand voice once. Every generation writes in your register... |
| 5 | `download` | Export wherever it needs to go | Markdown, HTML, PDF, or DOCX... |
| 6 | `wallet` | Costs you can see | Per-generation token cost, daily budget caps, and automatic downgrade... |

---

## How It Works (4 steps)

- **H2:** "Four steps. That's the whole workflow."
- Horizontal flow on desktop (4 equal cards), vertical stack on mobile
- Step number badge: 48px circle, primary bg, white text, weight 800
- **Step 1:** Pick a template — "Browse by category or search..."
- **Step 2:** Fill in your details — "Audience, tone, product, key points..."
- **Step 3:** Generate & refine — "Sections stream in live..."
- **Step 4:** Export & ship — "Markdown, HTML, PDF, or DOCX..."
- Arrow connectors between steps (Lucide `arrow-right`, muted)

---

## Template Showcase

- **H2:** "A library that covers your whole content calendar."
- **Intro line:** "21 templates at launch — and every category your calendar actually touches."
- **6 category cards:** 2-row × 3-col grid; each shows: category icon + color chip, count, 4 example template names
- **Category colors** (from DESIGN.md): Blog `#2563EB`, Social `#7C3AED`, Email `#0D9488`, Ads `#EA580C`, SEO `#0369A1`, Sales `#DB2777`
- **CTA:** "Browse all templates →" (primary link, right-aligned)

---

## Pricing (3 tiers — final copy from CMO)

| Feature | Free ($0) | Pro ($29/mo) | Team ($79/mo) |
|---------|-----------|-------------|---------------|
| Generations | 100/mo | Unlimited | Unlimited |
| Workspaces | 1 | 3 | — |
| Templates | All 21 | All (launch + new) | Custom templates |
| Team seats | — | Up to 5 | 10 + SSO |
| Brand voice | — | ✅ | ✅ |
| Export | Markdown, HTML | + PDF, DOCX | + PDF, DOCX |
| Block regen | ✅ | ✅ | ✅ |
| Support | — | — | Priority |

- **Free card:** `border: 1px solid var(--color-border)`, ghost CTA "Start free"
- **Pro card (highlighted):** `border: 2px solid var(--color-primary)`, shadow-lg, "Most Popular" pill, solid primary CTA "Get Pro"
- **Team card:** `border: 1px solid var(--color-border)`, ghost CTA "Talk to us"
- Fine print below CTAs per CMO copy

---

## FAQ (7 items)

- Accordion: glass-card, 16px radius
- **Q:** How is this different from ChatGPT?
- **Q:** Can I really regenerate just one section?
- **Q:** What formats can I export to?
- **Q:** What does "generation" mean for usage caps?
- **Q:** What happens if I hit my monthly limit on Free?
- **Q:** Can my team collaborate?
- **Q:** What happens to my data?
- Header: 1rem weight 600, cursor pointer, `+` icon rotates 45° on open
- Body: 0.9375rem weight 400, max-height transition 300ms
- Open state: `border-color: var(--color-primary)`

---

## Final CTA

- **Background:** Gradient (same as Hero), full-width
- **H2:** "Ship your next post in four minutes." — 2.5rem weight 800, white
- **Subhead:** "Join the beta. 100 free generations a month, 21 launch templates, no credit card." — 1.25rem, `rgba(255,255,255,0.85)`
- **CTAs:** "Start free" (accent) + "Browse the template library" (ghost)
- **Trust line:** "Free tier forever · No credit card · Cancel anytime"

---

## Responsive Behavior

| Breakpoint | Changes |
|-----------|---------|
| **< 768px** | Hero CTAs stack vertical, feature cards 1-col, how-it-works vertical, pricing stacks, nav hamburger |
| **768–1024px** | Feature cards 2-col, pricing 2-col (Free + Pro side by side, Team below), showcase 2-col |
| **≥ 1024px** | Full 3-col feature grid, 3-col pricing, 2-row × 3-col showcase |

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

- Auto-playing video in hero (use static mock with subtle float)
- More than 2 CTAs in hero
- Testimonials with fake names/logos
- Countdown timers or fake urgency
- Animated backgrounds that distract from headline
