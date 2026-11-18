# Design System for NXDSOL

## Pattern
- **Hero + Features + CTA**
- Conversion focused hero with sticky CTA
- Sections: Hero, Value Prop, Key Features (3‑5), CTA, Footer

## Style: Glassmorphism
- Light & Dark mode support
- Frosted glass, blurred backgrounds, layered depth
- Accessibility: ensure text contrast ≥ 4.5:1, visible focus, respect `prefers-reduced‑motion`

## Colors (CSS custom properties)
```css
:root {
  --color-primary: #2563EB;
  --color-on-primary: #FFFFFF;
  --color-secondary: #3B82F6;
  --color-on-secondary: #000000;
  --color-accent: #EA580C; /* CTA */
  --color-on-accent: #000000;
  --color-background: #F8FAFC;
  --color-foreground: #1E293B;
  --color-card: #FFFFFF;
  --color-card-foreground: #1E293B;
  --color-muted: #E9EFF8;
  --color-muted-foreground: #475569;
  --color-border: #E2E8F0;
  --color-destructive: #DC2626;
  --color-on-destructive: #FFFFFF;
  --color-ring: #2563EB;
}
```

## Typography
- **Font:** Plus Jakarta Sans (weights 300‑700)
- Import via Google Fonts:
```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
```
- Base font‑size: 16 px, line‑height: 1.5

## Key Effects
- Backdrop blur 10‑20 px on glass cards
- Subtle 1 px border (rgba(255,255,255,0.2))
- Light reflection, Z‑depth shadows

## Avoid
- Excessive animation, especially in dark mode
- Emoji icons – use SVGs (Heroicons / Lucide)

## Pre‑Delivery Checklist
- [ ] No emojis as icons (use SVG)
- [ ] `cursor: pointer` on all interactive elements
- [ ] Hover transitions 150‑300 ms
- [ ] Text contrast ≥ 4.5:1 (light mode)
- [ ] Visible focus states for keyboard navigation
- [ ] Respect `prefers-reduced-motion`
- [ ] Responsive breakpoints: 375 px, 768 px, 1024 px, 1440 px

## Notes
- Generated 2026-11-18 via ui-ux-pro-max (`--design-system`, query: "AI consulting B2B SaaS professional modern").
- Accent adjusted from #F97316 to #EA580C for stronger CTA contrast.
- Primary #2563EB replaces legacy Bootstrap #0d6efd.
