# Digital Business Planner — Technical Design

**Version:** 1.0
**Date:** 2026-11-18
**Author:** CTO (78e65bc7-8ce0-479f-aab6-365de3a8198b)
**Issue:** NEX-4
**Status:** Draft — awaiting CEO approval
**Cross-reference:** `docs/AI_CONTENT_TEMPLATES_DESIGN.md` (shared infrastructure)

---

## 1. Product Scope

### What It Is
A web application that helps digital business owners turn vague ambitions into structured, executable plans — with AI-assisted planning, milestone tracking, and progress analytics.

### Target Users
- **Primary:** Digital entrepreneurs and solopreneurs (e-commerce, services, creators) who lack a structured planning process
- **Secondary:** Small agencies and consultants planning client engagements or their own growth
- **Tertiary:** Coaches and consultants who run guided planning with clients (future: shared workspaces)

### Planning Capabilities (MVP)
1. **Business planning:** vision → goals → objectives → initiatives → tasks (OKR-flavored structure)
2. **Goal tracking:** KPIs per goal, target values, progress over time
3. **Milestones:** dated checkpoints on initiatives, status tracking
4. **Task execution:** simple task list per initiative (no full project-management depth)
5. **AI-assisted planning:**
   - Generate a plan draft from a business description ("Here's my business, help me plan the next 90 days")
   - Suggest objectives from goals
   - Summarize progress in weekly review notes
6. **Business ops (lightweight):** business profile (services, pricing, customers), recurring weekly reviews

### Non-Goals (explicit)
- Not a full project management tool (no Gantt, no resource planning)
- Not an accounting/ERP system (no invoicing, no accounting integration in MVP)
- Not a CRM (no contact management)

### Core User Workflow
1. Onboard: answer 5–8 questions about the business (or paste existing description)
2. AI drafts a 90-day plan (goals → objectives → milestones → tasks)
3. User edits/approves the plan (drag-drop, inline edit)
4. Weekly: mark tasks done, update KPI values
5. AI generates weekly review summary + suggests next-week focus
6. Share/plan PDF export for accountability or clients

---

## 2. Architecture

### 2.1 High-Level

```
┌─────────────────────────────────────────────┐
│  Next.js Web App (SSR + client-rendered     │
│  planning canvas)                          │
└──────────────────┬──────────────────────────┘
                   │ tRPC (streaming for AI features)
┌──────────────────▼──────────────────────────┐
│  API Layer (Fastify, Node 20)              │
│  ┌──────────┐ ┌───────────┐ ┌────────────┐ │
│  │ Plans    │ │ Goals/    │ │ AI Planning│ │
│  │ CRUD     │ │ Milestones│ │ (gateway)  │ │
│  └──────────┘ └───────────┘ └────────────┘ │
│  ┌──────────┐ ┌───────────┐                │
│  │ Reviews  │ │ Business  │                │
│  │ + KPIs   │ │ Profile   │                │
│  └──────────┘ └───────────┘                │
└──────┬─────────────────────┬───────────────┘
       │                     │
┌──────▼─────┐        ┌──────▼───────────────┐
│ PostgreSQL │        │ Shared AI Gateway    │
│ (Neon)     │        │ (same as AI Content  │
│ + Prisma   │        │ Templates: provider  │
└────────────┘        │ abstraction, cost    │
                      │ metering, fallback)  │
┌────────────┐        └──────────────────────┘
│ Redis      │
│ (rate lim) │
└────────────┘
```

**Decision: Same modular monolith, second product module.**
The Planner is a separate Next.js app (`apps/planner`) in the same monorepo, sharing the AI gateway, auth, and workspace packages. It does NOT share the content-template engine — the domains differ — but reuses the provider abstraction, prompt-compiler patterns, and cost metering verbatim.

### 2.2 Technology Stack (shared with AI Content Templates)

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 + TypeScript + Tailwind + shadcn/ui |
| Planning canvas | DnD via `@dnd-kit` (lightweight, no heavy canvas lib) |
| Charts (KPI progress) | Recharts |
| API | tRPC on Fastify, same server as AI Content Templates initially (routed by path) |
| DB | PostgreSQL (Neon), Prisma, separate schema namespace `planner` |
| AI | Shared LLM gateway (provider abstraction + cost metering) |
| PDF export | `pdf-lib` (server-side) — same approach as content templates |

### 2.3 AI Feature Integration

| Feature | Trigger | Model tier | Cost control |
|---------|---------|-----------|--------------|
| Plan draft from business description | Onboarding | `quality` (Sonnet) | 1x per user per session (cached) |
| Objective suggestions | Per-goal button | `fast` (gpt-4o-mini) | Rate-limited 10/day |
| Weekly review summary | Auto (Mondays) + manual button | `fast` | 1x/user/week, cached |
| "What should I focus on next week?" | Button | `fast` | 5/day |

All AI features:
- Go through the **shared LLM gateway** → same fallback, metering, evals
- Are **progressive enhancement** — the planner is fully usable with zero AI (user can type everything manually)
- Store AI outputs as first-class editable rows (users own and can edit AI output)

### 2.4 Prompt Strategy

- **Plan-draft prompt:** structured JSON output schema (goals[] → objectives[] → milestones[] → tasks[]) with Zod validation; on parse failure, retry once
- **Context window management:** business profile + current plan state injected as structured context (not raw chat history)
- **No multi-turn chat in MVP** — single-shot generation with regenerate. Chat-based planning is a Phase 3 candidate

---

## 3. Data Model

```prisma
// Schema namespace: planner

model BusinessProfile {
  id          String  @id @default(cuid())
  workspaceId String  @unique
  workspace   Workspace @relation   // SHARED with AI Content Templates
  name        String
  description String  @db.Text       // free text, feeds AI context
  services    Json                     // [{name, description, price}]
  targetCustomers String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Plan {
  id            String   @id @default(cuid())
  workspaceId   String
  businessProfileId String
  title         String                       // "Q1 2027 Growth Plan"
  horizonDays   Int      @default(90)
  status        PlanStatus @default(DRAFT)
  aiDrafted     Boolean  @default(false)
  createdAt     DateTime @default(now())
  goals         Goal[]
  reviews       PlanReview[]
}

model Goal {
  id        String  @id @default(cuid())
  planId    String
  title     String
  description String?
  sortOrder Int
  kpis      Kpi[]
  objectives Objective[]
}

model Objective {
  id        String  @id @default(cuid())
  goalId    String
  title     String
  description String?
  sortOrder Int
  milestones Milestone[]
}

model Milestone {
  id          String   @id @default(cuid())
  objectiveId String
  title       String
  dueDate     DateTime
  status      MilestoneStatus @default(PENDING)
  sortOrder   Int
  tasks       Task[]
}

model Task {
  id          String   @id @default(cuid())
  milestoneId String
  title       String
  done        Boolean  @default(false)
  doneAt      DateTime?
  sortOrder   Int
}

model Kpi {
  id        String  @id @default(cuid())
  goalId    String
  name      String                     // "Monthly revenue"
  unit      String                     // "USD" | "count" | "%"
  baseline  Float?
  target    Float
  readings  KpiReading[]
}

model KpiReading {
  id     String   @id @default(cuid())
  kpiId  String
  date   DateTime @db.Date
  value  Float
  source KpiSource @default(MANUAL)     // MANUAL | IMPORTED (later)

  @@unique([kpiId, date])
}

model PlanReview {
  id        String   @id @default(cuid())
  planId    String
  weekStart DateTime @db.Date
  summary   String?  @db.Text           // AI-generated (editable)
  highlights Json?                        // [{type: win|risk|blocker, text}]
  nextFocus Json?                        // suggested focuses
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([planId, weekStart])
}
```

**Design notes:**
- **Workspace is shared** — a user's planner lives in the same workspace as their content templates (one account, one home base)
- **Progress is computed, not stored** — milestone % complete = done tasks / total tasks; goal progress = avg of objective progress (computed at read time; no denormalized status columns to drift)
- **KPI readings are append-only** — progress charts read from raw values

---

## 4. MVP Definition & Phased Roadmap

### MVP (8 weeks, post AI Content Templates MVP)
- Onboarding flow (business profile questions)
- AI plan draft + manual plan builder (both paths)
- Goals → objectives → milestones → tasks with drag-drop
- KPI tracking with progress charts
- Weekly review (manual + AI summary)
- Plan PDF export
- Same auth/workspace as AI Content Templates

**Exit criteria:** A user can go from signup to a complete 90-day plan in <30 minutes and track it for 4 weeks.

### Phase 2 (post-MVP)
- Client-facing shared plan views (read-only links for accountability partners)
- Template plans ("e-commerce growth plan", "service business launch")
- Notifications (milestone due, weekly review ready)
- CSV export of KPI history

### Phase 3
- Chat-based planning assistant (multi-turn)
- Coaching mode (consultant works on client's plan with them)
- Integrations (calendar reminders, Stripe for pricing validation)

---

## 5. Shared Infrastructure (Cross-reference with AI Content Templates)

| Component | Shared? | How |
|-----------|---------|-----|
| Auth (Auth.js) | ✅ Yes | Same User, same session store |
| Workspace model | ✅ Yes | Same Workspace rows; both products read/write under it |
| LLM gateway | ✅ Yes | Same `AIProvider` abstraction, fallback, cost metering, evals — Planner uses `fast` tier mostly |
| Cost metering | ✅ Yes | UsageLedger rows with `source` distinguishing product (`"planner.draft"`, `"planner.review"`) |
| Monorepo | ✅ Yes | `apps/ai-templates`, `apps/planner`, shared `packages/*` |
| CI/CD | ✅ Yes | Same pipelines, separate deploy units |
| Template engine | ❌ No | Content Templates' `<AI>` block engine is domain-specific |
| Prompt compiler | ⚠️ Partial | JSON-output validation pattern reused; block syntax not |

**Shared package boundaries:**
```
packages/
├── shared/
│   ├── auth/          # Auth.js config, session middleware
│   ├── database/      # Prisma (one schema, both products)
│   ├── ai/            # Provider abstraction, metering, evals
│   ├── ui/            # shadcn/ui components
│   └── types/         # Zod schemas
├── apps/
│   ├── ai-templates/  # Next.js app
│   └── planner/       # Next.js app
└── server/
    └── api/           # Fastify + tRPC (routers per product)
```

---

## 6. Cost Considerations

Planner AI features are **lower-volume, higher-structure** than content generation:

| Feature | Volume/user/week | Model | Est. cost/user/month |
|---------|-----------------|-------|---------------------|
| Plan draft | 1 | Sonnet | ~$0.02 |
| Objective suggestions | 4 | gpt-4o-mini | ~$0.005 |
| Weekly reviews | 1 | gpt-4o-mini | ~$0.01 |
| Focus suggestions | 2 | gpt-4o-mini | ~$0.01 |

**~$0.05/user/month** — negligible at MVP scale; same safeguards as content templates (daily budget, cache, rate limits).

---

## 7. Open Questions

| # | Question | Impact |
|---|----------|--------|
| 1 | Separate product (own pricing/brand) or feature of AI Content Templates (same subscription)? | Architecture is shared either way; affects GTM + routing |
| 2 | Is KPI data ever imported (analytics, Stripe)? Changes KpiReading source design slightly | Phase 2 integration surface |
| 3 | Coaches/consultants use case: MVP or Phase 3? | Shared-workspace complexity |

---

**End of Document**