# Page: My Library (Output History)

> This file overrides MASTER.md rules for `/library`.
> Shows all previously generated outputs so users can find, reuse, and manage their content.

---

## Layout

```
┌───────────────────────────────────────────────────────────┐
│  Top Nav (Logo | Templates | My Library | Usage | Avatar) │
├───────────────────────────────────────────────────────────┤
│  Title "My Library" (h1, 2rem weight 700)                │
│  Subtitle "23 generations this month" (0.875rem muted)    │
│  ───────────────────────────────────────────────────────  │
│  [Search outputs…]  [Filter ▾]  [Sort ▾]  [Select All]   │
│  ───────────────────────────────────────────────────────  │
│                                                           │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ Blog Post: 10 Tips for Remote Teams        2h ago    │ │
│  │  AI Content Templates · Blog · 820 words · $0.03    │ │
│  │  [Open] [Duplicate] [Delete] …  │ │
│  ├──────────────────────────────────────────────────────┤ │
│  │ LinkedIn Thread: AI in Marketing             1d ago  │ │
│  │  AI Content Templates · Social · 450 words · $0.02  │ │
│  │  [Open] [Duplicate] [Delete] …  │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                           │
│  Pagination / Load more                                   │
└───────────────────────────────────────────────────────────┘
```

---

## Output List Item (Table/Card Hybrid)

- **Format:** Vertical card list (not a data table) for readability of content previews
- **Card:** White bg, 8px radius, `border: 1px solid var(--color-border)`, padding 20px 24px
- **Hover:** `background: var(--color-muted)`, no lift (density matters here)

| Element | Style |
|---------|-------|
| Title | 1rem weight 600, primary color (links to open output) |
| Meta line | 0.8125rem muted-foreground, separated by `·`: template name · category · word count · cost |
| Timestamp | Right-aligned, 0.8125rem muted, relative ("2h ago") |
| Actions | Appear on hover (desktop) / always visible (mobile): "Open" (primary link), "Duplicate" (ghost), "Delete" (destructive text) |
| Selection | Checkbox (left side) for bulk actions; `aria-label="Select {title}"` |

---

## Search & Filter

- **Search:** Full-text across output title, template name, and generated content preview (first 200 chars). Debounced 300ms.
- **Filter dropdown:** Date range (Today / This Week / This Month / Custom), Template, Category
- **Sort dropdown:** Newest first (default) / Oldest / Most used / Most expensive
- **Active filters:** Display as chips below the search bar; each chip has `×` to remove

---

## Bulk Actions

- **Select All:** Checkbox in the filter bar header
- **Selected state:** Card gets `border-left: 3px solid var(--color-primary)`, `background: rgba(37,99,235,0.05)`
- **Action bar (appears when ≥1 selected):** Floating bottom bar, glass background, left: "N selected", right: "Export selected" | "Delete selected"
- **Delete confirmation:** shadcn Dialog with title "Delete {N} outputs?", body lists titles, "Cancel" + "Delete (destructive)"

---

## Output Detail View (click "Open")

- Opens in the same workspace layout as the Generation Workspace
- **Read-only mode by default** — each block shows the saved content
- **Edit button** (top-right): switches to inline-editable mode per block
- **Regenerate** is available on each block (uses current template version, may differ from original)
- **Version badge:** "Generated v2.1 · 2026-11-20" (0.75rem, muted, top-right)

---

## Empty State

- **Never generated:** Centered illustration (Lucide `bookmark` icon, large muted), headline "Your generated content will appear here", sub-text "Browse templates to create your first content", primary CTA "Browse Templates"
- **No matching search:** "No outputs match '{query}'" + suggestions: "Try browsing templates" or "Clear filters"

---

## Responsive Behavior

| Breakpoint | Changes |
|-----------|---------|
| **< 768px** | Cards stack single column, actions always visible (no hover needed), search + filter collapse into a single row, bulk action bar full-width |
| **768–1024px** | Same as mobile, search bar full-width |
| **≥ 1024px** | Card list with hover actions, max-width 900px centered |

---

## Accessibility Notes

- List items: `role="listitem"`, container `role="list"`
- Search input: `aria-label="Search your library"`
- Filter chips: `role="group"`, `aria-label="Active filters"`
- Bulk selection: `aria-selected` on each checkbox
- Delete dialog: `role="alertdialog"`, `aria-labelledby` pointing to title
- Timestamps: `datetime` attribute with ISO format alongside relative text

---

## Anti-Patterns

- ❌ Table layout (content previews need vertical space)
- ❌ Hidden delete without confirmation
- ❌ Loading full generation history at once (paginate 20 per page)
- ❌ No way to see what template was used (always show template name)
- ❌ Editing the output opens a separate page (edit inline in the same view)
