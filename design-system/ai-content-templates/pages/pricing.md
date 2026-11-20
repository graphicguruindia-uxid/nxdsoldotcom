# Page: Pricing

> This file overrides MASTER.md rules for `/pricing`.
> Conversion-focused but transparent — no fake countdowns or social-proof padding.

---

## Layout

| Section | Content |
|---------|---------|
| Navbar | Standard app nav |
| Hero | "Simple pricing for serious content", subtitle, plan toggle (Monthly / Yearly, 20% savings) |
| Tier Cards | 3 cards side-by-side (Free / Pro / Team), Pro highlighted |
| Feature Comparison | Collapsible table: 3 columns, 12+ rows of features |
| Usage Details | "What counts as a generation?" — 3–4 bullet examples |
| FAQ | Accordion: 5 items (billing, limits, refunds, upgrade, API access) |
| Final CTA | "Start free — no credit card" + secondary "Talk to us" |
| Footer | Standard |

---

## Plan Tiers

| Feature | Free | Pro ($29/mo) | Team ($79/mo) |
|---------|------|-------------|---------------|
| Generations/mo | 100 | Unlimited | Unlimited |
| Workspaces | 1 | 3 | 10 |
| Team seats | — | — | Up to 10 |
| Templates | Core (20) | All (20+) | All + custom |
| Block regeneration | ✅ | ✅ | ✅ |
| Export formats | Markdown, HTML | + PDF | + DOCX |
| Brand voice presets | — | ✅ | ✅ |
| Priority support | — | — | ✅ |

- **Free card:** `border: 1px solid var(--color-border)`, ghost CTA "Sign Up"
- **Pro card (highlighted):** `border: 2px solid var(--color-primary)`, `box-shadow: var(--shadow-lg)`, "Most Popular" pill badge above, solid primary CTA "Start Free Trial"
- **Team card:** `border: 1px solid var(--color-border)`, ghost CTA "Contact Sales"

## Toggle (Monthly / Yearly)

- shadcn Switch, 0.875rem labels, primary ring on toggle
- Yearly prices show: "$216/yr (save 20%)" below the monthly-equivalent price
- Toggle is `aria-pressed` state, not a link

## Comparison Table

- Collapsible below the cards: "See all features compared"
- Alternating row bg (white / surface-muted)
- Feature names left-aligned, checkmark icons (Lucide `check`) centered, gray dash "—" for unavailable
- Row highlighting on hover: `background: var(--color-muted)`

---

## Accessibility Notes

- Plan cards: `role="region"`, `aria-label="{Plan} plan — ${price}/month"`
- Toggle: `aria-labelledby` pointing to "Monthly" / "Yearly" label
- Comparison table: `caption` element ("Feature comparison"), `scope` on headers
- Price numbers: `aria-label="{amount} per month"` (not just "$29")
- CTA buttons: distinct `aria-label` per tier ("Sign up for Free plan", etc.)

---

## Anti-Patterns

- ❌ "Most popular" on more than one card
- ❌ Fake countdown or "X people viewing" urgency
- ❌ Hiding feature limitations in tooltips
- ❌ Annual price shown without the savings calculation
- ❌ No way to upgrade mid-plan (always show "Upgrade anytime" below each card)
