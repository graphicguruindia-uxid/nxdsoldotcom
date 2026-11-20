# Page: Dashboard / Template Library

> This file overrides MASTER.md rules for the authenticated template library at `/templates`.
> Primary screen after login. Users browse, search, and select templates here.

---

## Layout

```
┌─────────────────────────────────────────────────────────────┐
│  Top Nav (shadcn Navbar: Logo | Templates | My Library | Usage | Avatar) │
├────────────┬────────────────────────────────────────────────┤
│            │  Search (input + icon, 100% width, 12px radius)│
│  Sidebar   ├────────────────────────────────────────────────┤
│  (220px)   │  Filter Chips: All | Blog | Social | Email | Ads | SEO | Sales │
│            ├────────────────────────────────────────────────┤
│            │  Sort dropdown ▸ "Most Popular" | "Newest" | "Recently Used" │
│            ├────────────────────────────────────────────────┤
│            │                                               │
│            │  ┌─────────┐  ┌─────────┐  ┌─────────┐        │
│            │  │Card 1   │  │Card 2   │  │Card 3   │        │
│            │  │ Blog Post│  │ Thread  │  │ Email   │        │
│            │  │ (tag)   │  │ (tag)   │  │ (tag)   │        │
│            │  └─────────┘  └─────────┘  └─────────┘        │
│            │                                               │
│            │  ┌─────────┐  ┌─────────┐  ┌─────────┐        │
│            │  │Card 4   │  │Card 5   │  │Card 6   │        │
│            │  └─────────┘  └─────────┘  └─────────┘        │
│            │                                               │
│            │  Pagination / "Load more"                      │
│            └────────────────────────────────────────────────┘
└─────────────────────────────────────────────────────────────┘
```

---

## Sidebar Filters

- **Category list** (vertical, radio-group style):
  - Icon (Lucide, 18px) + Label (0.875rem, weight 500)
  - Active state: `background: rgba(37, 99, 235, 0.1)`, `color: var(--color-primary)`, left border `3px solid var(--color-primary)`
  - Inactive: `color: var(--color-muted-foreground)`
  - Hover: `background: var(--color-muted)`
  - Count badge (right-aligned, 0.75rem, weight 600, muted bg)

- **Collapse behavior (mobile):** Sidebar becomes a horizontal scrollable chip bar above the grid; `position: sticky`, `z-index: 10`

- **Width:** 220px desktop, collapses to 0 on mobile (off-canvas drawer on toggle)

---

## Search Bar

- **Input:** 100% width, 48px height, 12px radius, `border: 1px solid var(--color-border)`
- **Placeholder:** "Search templates..." (0.9375rem, muted)
- **Icon:** Lucide `search`, left-aligned, 20px
- **Behavior:** Debounced 300ms, shows autocomplete suggestions from top 5 matches
- **Active:** `border-color: var(--color-primary)`, `box-shadow: 0 0 0 3px rgba(37,99,235,0.15)`
- **Clear button:** Lucide `x`, appears when query > 0

---

## Filter Chips

- **Layout:** Flex row, wrap, 8px gap
- **Style:** Pill shape (8px radius), 36px height, 0.875rem weight 500
- **Active chip:** `background: var(--color-primary)`, `color: white`
- **Inactive chip:** `background: var(--color-muted)`, `color: var(--color-foreground)`, `border: 1px solid var(--color-border)`
- **Hover (inactive):** `border-color: var(--color-primary)`, `color: var(--color-primary)`

---

## Template Cards (Grid)

- **Grid:** `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))`, 24px gap
- **Card:** White bg, 12px radius, `border: 1px solid var(--color-border)`, `box-shadow: var(--shadow-sm)`
- **Hover:** `translateY(-2px)`, `box-shadow: var(--shadow-md)`, 200ms ease
- **Padding:** 24px

**Card content:**
| Element | Style |
|---------|-------|
| Category tag | Pill, 8px radius, 0.75rem weight 600, category color bg (e.g., Blog → blue, Social → purple) |
| Title | 1.125rem, weight 700, `--color-foreground` |
| Description | 0.875rem, weight 400, `--color-muted-foreground`, max 2 lines (text-overflow) |
| Meta row | 0.75rem, muted-foreground, separated by `·`, Lucide icons 14px inline: `<Clock/> 3 min · <FileText/> 500 words` |
| Action | Right-aligned Lucide `arrow-right` that rotates 90° on hover |

---

## Empty States

- **No results:** Illustration (Lucide feather icon, large, muted), headline "No templates found", sub-text "Try a different search or browse all categories", primary CTA "Clear Filters"
- **First-time user (no library):** Hero card "Pick a template to get started" with arrow to popular templates

---

## My Library Tab

- **Tab switcher:** "All Templates" | "My Library" (shadcn Tabs, 1rem weight 500)
- **My Library cards:** Same card style, adds:
  - Last used timestamp (0.75rem, muted, bottom-right)
  - Usage count badge (0.75rem, primary bg, white text, top-right)
  - Delete/duplicate actions on hover (shadcn DropdownMenu)

---

## Responsive Behavior

| Breakpoint | Changes |
|-----------|---------|
| **< 768px** | Sidebar → horizontal scrollable chips, grid 1-col, search above chips |
| **768–1024px** | Sidebar → collapsible toggle (hamburger icon), grid 2-col |
| **≥ 1024px** | Full sidebar 220px, grid 3-col |
| **≥ 1440px** | Grid 4-col, max-width 1440px centered |

---

## Accessibility Notes

- Search input: `aria-label="Search templates"`, autocomplete suggestions have `role="listbox"`
- Filter chips: `role="group"`, `aria-label="Filter by category"`
- Active category: `aria-selected="true"`
- Card: `role="link"`, `tabindex="0"`, keyboard Enter/Space navigates to template
- Count badges: `aria-label="{N} templates"`
- Sort dropdown: `aria-haspopup="listbox"`

---

## Anti-Patterns

- ❌ More than 8 categories in sidebar (group into 6 max)
- ❌ Cards without a visible category tag
- ❌ Search that requires Enter key (use debounce)
- ❌ Horizontal scroll on mobile category chips (use flex-wrap with 2-row max)
- ❌ Hidden filter state (always show active filters as chips)
