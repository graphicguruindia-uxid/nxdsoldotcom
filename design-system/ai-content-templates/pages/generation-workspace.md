# Page: Generation Workspace (Template Detail)

> This file overrides MASTER.md rules for the template detail + generation screen at `/templates/[slug]`.
> This is the core product flow: pick variables → generate → stream → regenerate blocks → export.

---

## Layout (Desktop ≥ 1024px)

```
┌────────────────────────────────────────────────────────────────┐
│ Top Nav (Logo | Templates | My Library | Usage | Avatar)       │
├─────────────────────────────┬──────────────────────────────────┤
│  Variable Panel (380px)     │  Preview Canvas (fluid)           │
│                             │                                  │
│  Template title (h1)       │  Breadcrumb: Templates / Blog     │
│  Category tag              │  Template subtitle                │
│  ─────────────────────────  │  ──────────────────────────────   │
│  Field: Audience            │                                  │
│  [input]                    │  Generated content (markdown)    │
│  Field: Tone                │  streams in block-by-block      │
│  [select: Professional…]   │  with per-block "Regenerate"     │
│  Field: Product             │                                  │
│  [textarea]                 │  Each block:                     │
│  Field: Key Points          │  ┌──────────────────────┐        │
│  [textarea, 3 lines]        │  │ <AI block: intro>    │        │
│                             │  │ streams here…        │        │
│  ─────────────────────────  │  │ [Regenerate] [Copy]  │        │
│  [ Generate  → ]  (accent)  │  └──────────────────────┘        │
│  Usage: 87/100 remaining   │                                  │
└─────────────────────────────┴──────────────────────────────────┘
```

- **Split:** Left panel 380px fixed, right canvas fluid, 1px divider `var(--color-border)`
- **Mobile (< 1024px):** Stacked — variables collapse into an accordion above the canvas; "Generate" button is sticky at viewport bottom

---

## Variable Panel

- **Fields render from template `variables` Zod schema** — never hardcode fields
- **Field label:** 0.875rem, weight 600, margin-bottom 8px
- **Required indicator:** `*` in accent color, `aria-required="true"`
- **Helper text:** 0.75rem, muted-foreground, below label (e.g., "Who is this for? Be specific.")

**Input types:**

| Zod type | Component |
|----------|-----------|
| string (short) | shadcn Input, 44px height |
| string (long) | shadcn Textarea, auto-resize 1–5 lines |
| enum | shadcn Select (dropdown) |
| boolean | shadcn Switch |

- **Validation:** On blur; inline error 0.875rem destructive color + Lucide `circle-alert` icon, connected via `aria-describedby`
- **Error summary:** On failed Generate click, summary at top of panel (`role="alert"`, `tabindex="-1"`, focus moved to it), each item links to its field

---

## Generate Button

- **State: idle** — accent `#EA580C`, white text, 48px height, full panel width, weight 700, Lucide `sparkles` icon + "Generate"
- **State: generating** — disabled, primary blue, animated pulse on icon, "Generating… (2 of 4 blocks)" — NEVER a bare spinner (UX rule: stream, don't spin)
- **State: success** — primary blue, "Regenerate All" (secondary affordance)
- **State: failed** — destructive `#DC2626`, "Retry Generation"
- **Usage meter:** Below button, 0.75rem: "87 / 100 generations left this month" + thin progress bar (primary, 4px height, 8px radius)

---

## Preview Canvas

- **Background:** White, `padding: 48px`, max-width 720px centered
- **Typography (content):** 1.125rem body, line-height 1.7, headings weight 700 — content-first, generous whitespace
- **Empty state (pre-generation):** Centered ghost of the template structure — each AI block shown as a placeholder card with its name and a dotted border (Lucide `sparkles`, muted). Communicates the shape of what's coming.
- **Block card:**
  - `border: 1px solid var(--color-border)`, 12px radius, `margin-bottom: 24px`
  - Header bar: block name (0.75rem, uppercase, letter-spacing 0.08em, muted) + right-aligned actions
  - **Streaming state:** block card has animated left border (2px, primary, 1.2s pulse) + shimmer text; block is NOT editable while streaming
  - **Done state:** left border solid primary (2px), actions enabled
  - **Regenerate:** Lucide `refresh-cw` + "Regenerate" ghost button — only this block regenerates; others stay (the product's core differentiator — make it obvious)
  - **Copy:** copies block markdown to clipboard, toast "Block copied"
- **Toolbar (top-right of canvas):**
  - Export dropdown: Markdown / HTML / PDF / Copy All
  - "Save to Library" (primary ghost, Lucide `bookmark`)
  - Word count + estimated cost per generation: "620 words · $0.02" (0.75rem, muted)

---

## Error & Fallback States

- **Provider failure:** Block card turns `border-color: var(--color-destructive)`; inline note inside block: "Claude failed — switched to GPT (fallback). [Retry with Claude]" — never silent (architecture doc: "never fail silently")
- **Budget exhausted:** Modal (shadcn Dialog): "You've used your free generations", Pro upgrade CTA, "Back to templates" secondary
- **Generation cancelled:** Blocks show partial content with a "Cancelled — [Resume]" banner

---

## Responsive Behavior

| Breakpoint | Changes |
|-----------|---------|
| **< 768px** | Single column; variables accordion on top; Generate button sticky bottom bar (above mobile CTA zone, safe-area aware); canvas full-width with 24px padding; block actions in overflow menu |
| **768–1024px** | Same single column; Generate button inline below panel |
| **≥ 1024px** | Split layout (380px + fluid) |

---

## Accessibility Notes

- Variable panel: `role="form"`, `aria-label="Template variables"`
- Streaming progress: `aria-live="polite"` region announces "Generating block 2 of 4: intro"
- Regenerate buttons: `aria-label="Regenerate {block name} block"`
- Focus management: after generation completes, focus moves to first block
- Canvas text is real selectable text — never render generated content as an image

---

## Anti-Patterns

- ❌ Spinner with no content for 10+ seconds (stream tokens instead)
- ❌ All-or-nothing regeneration (block-level is the differentiator)
- ❌ Hiding cost ("$0.02 this generation" must be visible)
- ❌ Auto-save without a visible "Saved" confirmation
- ❌ Editing generated text in a separate tab (edit inline in the block)
- ❌ Disabling the Regenerate button after generation (user should always be able to retry a block)
