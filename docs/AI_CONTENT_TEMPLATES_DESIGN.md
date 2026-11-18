# AI Content Templates — Technical Design

**Version:** 1.0
**Date:** 2026-11-18
**Author:** CTO (78e65bc7-8ce0-479f-aab6-365de3a8198b)
**Issue:** NEX-3
**Status:** Draft — awaiting CEO approval

---

## 1. Product Scope

### What It Is
A SaaS platform where users browse a curated library of AI-powered content templates, fill in variables (audience, tone, product, key points), generate content via LLMs, iterate per section, and export in multiple formats.

### Target Users
- **Primary:** Digital entrepreneurs, content marketers, small business owners who need quality content but lack time or expertise
- **Secondary:** Marketing agencies managing content for multiple clients
- **Tertiary:** Solopreneurs and freelancers who produce content regularly

### Core User Workflow
1. Browse or search template library → pick a template
2. Fill in variables (audience, tone, product description, key messages)
3. Click "Generate" → content streams live (section by section)
4. Review output → regenerate any section without touching the rest
5. Export (Markdown, HTML, PDF, DOCX) or copy to clipboard
6. Save to personal library for future reuse

### Template Categories (MVP)
| Category | Examples |
|----------|----------|
| Blog Posts | How-to guides, thought leadership, listicles, case studies |
| Social Media | LinkedIn posts, Twitter threads, Instagram captions |
| Email Marketing | Welcome sequences, newsletters, cold outreach, nurturing |
| Landing Pages | Hero copy, features section, social proof, CTA |
| Ad Copy | Facebook ads, Google ads, programmatic creative |

---

## 2. Architecture

### 2.1 High-Level Architecture

```
┌─────────────────────────────────────────────┐
│            Clients                          │
│  Next.js Web App (SSR)  │  Future: Mobile   │
└──────────┬──────────────┴───────────────────┘
           │ HTTPS (tRPC)
┌──────────▼──────────────────────────────────┐
│         API Layer (Fastify, Node 20)        │
│  ┌─────────┐ ┌──────────┐ ┌─────────────┐  │
│  │ Auth    │ │Templates │ │Generation  │  │
│  │ (tRPC)  │ │CRUD      │ │(tRPC+SSE)  │  │
│  └─────────┘ └──────────┘ └─────────────┘  │
│  ┌─────────┐ ┌──────────┐ ┌─────────────┐  │
│  │Outputs  │ │Usage/     │ │Public API   │  │
│  │History  │ │Billing    │ │(REST+ISR)   │  │
│  └─────────┘ └──────────┘ └─────────────┘  │
└───┬───────────────┬────────────────────────┘
    │               │
┌───▼────┐    ┌────▼────────────────────────┐
│Postgres│    │ AI Orchestration Service    │
│+pgvector│   │ ┌────────────────────────┐  │
│(Neon)   │   │ │ Provider Abstraction   │  │
└─────────┘   │ │ ├─ OpenAI (gpt-4o)    │  │
              │ │ ├─ Anthropic (sonnet)  │  │
┌─────────┐   │ │ └─ Ollama (local dev) │  │
│Redis    │   │ │ Prompt Compiler       │  │
│(cache,  │   │ │ Cost Meter            │  │
│ rate)   │   │ │ Parallel block gen    │  │
└─────────┘   │ └────────────────────────┘  │
              │ BullMQ (async exports)      │
              └─────────────────────────────┘
```

**Decision: Modular Monolith** (not microservices)
- Rationale: 2–4 engineers, single product domain. The `ai/` package boundary keeps extraction cheap if/when AI orchestration needs to scale independently.

### 2.2 Technology Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Frontend | Next.js 14 (App Router) + React + TypeScript | SSR for SEO, streaming for generation UX |
| Styling | Tailwind CSS + shadcn/ui | Consistent design system, fast iteration |
| Backend API | Fastify + Node 20 | High performance, schema validation, streaming |
| Client API | tRPC | End-to-end type safety, streaming subscriptions |
| Database | PostgreSQL 16 (Neon) | Relational integrity, ACID, Neon branch-per-PR |
| ORM | Prisma | Type-safe queries, migrations, relationship mapping |
| Cache/Queue | Redis (Upstash) | Rate limiting, BullMQ async jobs |
| AI Gateway | Vercel AI SDK (wrapped) | Streaming primitives, provider-agnostic |
| Auth | Auth.js (NextAuth) v5 | Email+password + OAuth, session in DB |
| Hosting | Vercel (web) + Fly.io (API) | Best DX, PR previews, cheap at our scale |
| CI/CD | GitHub Actions | Lint, test, build, deploy on every PR |
| Monitoring | Sentry + OpenTelemetry | Error tracking + distributed tracing |

### 2.3 LLM Provider Integration

#### Provider Abstraction Layer

```typescript
interface AIProvider {
  id: string; // "openai" | "anthropic" | "ollama"
  complete(req: CompletionRequest): AsyncIterable<CompletionChunk>;
  embed?(req: EmbedRequest): Promise<Embedding>;
  models: string[];
  pricing: { inputPerM: number; outputPerM: number };
}
```

#### Fallback Strategy

Every generation goes through `generateWithFallback()`:
1. **Primary provider** fires → streams tokens
2. If primary errors (timeout, rate limit, 5xx) → **secondary provider** takes over with same prompt
3. If both fail → return error to client with partial output preserved
4. **Never fail silently** — user sees what happened and can retry

#### Model Routing

| Tier | Model | Use Case |
|------|-------|----------|
| `quality` | Anthropic Claude Sonnet | Marketing copy, thought leadership (default) |
| `fast` | OpenAI gpt-4o-mini | Volume drafts, bulk generation (lower cost) |
| `local` | Ollama qwen2.5 | Development only (free iteration) |
| `budget` | gpt-4o-mini with low tokens | When user near daily cap (auto-downgrade) |

### 2.4 Prompt Engineering Strategy

#### Template Syntax

Templates use a **hybrid of static text and AI blocks**:

```markdown
# {{title}}

{{intro}}

<AI block="body" tone="{{tone}}" audience="{{audience}}">
Write a 3-paragraph blog post body about {{topic}}.
</AI>

## Conclusion
<AI block="cta" style="gentle">
Generate a closing CTA for {{cta_goal}}.
</AI>
```

This gives users:
- **Deterministic structure** — they control layout, headings, flow
- **AI-generated content** — LLM fills `<AI>` blocks
- **Block-level regeneration** — click "Regenerate" on any section without regenerating the whole document (saves cost + time)

#### Prompt Compiler Pipeline

1. Load template body + variables schema
2. Validate user inputs against Zod schema (type safety, required fields, length limits)
3. Substitute `{{variable}}` tokens (escaped — user text is data, never code)
4. Extract `<AI>` blocks in order
5. Build per-block prompts with shared context (one system prompt carrying tone/audience/brand voice)
6. Call providers — independent blocks generated **in parallel** (bounded concurrency = 2)
7. Reassemble blocks into final document
8. If output must be JSON, validate schema; retry once with error context on parse failure

#### Cost Control

- **Per-user daily budget:** configurable cap (default $5/day)
- **Per-request token caps:** from template `aiConfig.maxTokens`
- **Redis rate limiting:** 20 generations/hour/user (MVP)
- **Auto-downgrade:** budget near cap → `quality` → `fast` tier with notice
- **Nightly aggregation job:** dashboard + alert on cost anomalies (>2σ)

#### Evaluation Pipeline

- **Golden test set:** 20 prompts with expected properties (length bounds, contains topic, no placeholder leakage, brand-safety)
- **CI gate:** run on every prompt template change
- **Production sampling:** 2% of generations scored by LLM-as-judge (relevance, tone match)

---

## 3. Data Model

### Core Entities

```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  passwordHash  String?
  name          String?
  emailVerified DateTime?
  createdAt     DateTime  @default(now())

  workspace     Workspace?
  usageLedger   UsageLedger[]
}

model Workspace {
  id        String   @id @default(cuid())
  name      String
  ownerId   String   @unique
  owner     User     @relation(fields: [ownerId], references: [id])
  templates Template[]
  outputs   Output[]
}

model Template {
  id              String       @id @default(cuid())
  workspaceId     String
  authorId        String
  name            String
  slug            String
  description     String?
  category        TemplateCategory
  bodyTemplate    String       // text with {{vars}} + <AI> blocks
  variables       Json         // Zod schema as JSON
  aiConfig        Json         // {model, temperature, maxTokens, systemPrompt}
  version         Int          @default(1)
  isPublic        Boolean      @default(false)
  workspace       Workspace    @relation
  versions        TemplateVersion[]
  outputs         Output[]

  @@unique([workspaceId, slug])
}

model TemplateVersion {
  id            String   @id @default(cuid())
  templateId    String
  version       Int
  bodyTemplate  String
  variables     Json
  aiConfig      Json
  createdAt     DateTime @default(now())

  @@unique([templateId, version])
}

model Output {
  id              String       @id @default(cuid())
  workspaceId     String
  templateId      String
  templateVersion Int
  inputs          Json         // variable values used
  content         String       // generated markdown
  status          OutputStatus @default(DRAFT)
  modelUsed       String
  tokensIn        Int
  tokensOut       Int
  costCents       Int
  createdAt       DateTime     @default(now())
}

model UsageLedger {
  id          String   @id @default(cuid())
  userId      String
  date        DateTime @db.Date
  modelUsed   String
  tokensIn    Int
  tokensOut   Int
  costCents   Int
  source      String   // "generation" | "embedding" | "evaluation"

  @@unique([userId, date, modelUsed, source])
}
```

### Template Versioning Strategy

- Each save creates an immutable `TemplateVersion` row
- Current version lives on the `Template` row
- Users can view history and revert to any version
- Outputs store `templateVersion` so generated content is reproducible

### Storage Strategy

| Data | Location | Rationale |
|------|----------|-----------|
| Templates, outputs | PostgreSQL (text) | Searchable, versioned, relational |
| PDF/DOCX exports | S3-compatible (Cloudflare R2) | Large binary files |
| User uploads | S3-compatible | Future: user brand assets |
| Semantic search | pgvector (PostgreSQL extension) | Post-MVP: "find templates like this" |

---

## 4. API Design

### 4.1 tRPC (Authenticated)

```
user.me, user.update
template.list, template.get, template.create, template.update, template.duplicate
template.archive
templateVersion.list (history)
output.list, output.get, output.update, output.delete
generate.start  → returns jobId
generate.stream → SSE chunks per AI block
generate.cancel
usage.today, usage.range
export.download  → signed URL (format: md | html | pdf | docx)
```

### 4.2 REST (Public)

```
GET /api/public/templates          # template gallery
GET /api/public/templates/:slug    # template detail
GET /api/public/outputs/:id        # shared output (future)
GET /health
```

### 4.3 Error Convention

- tRPC errors with `code` + retryability flag
- Generation failures are never silent — surface provider status, fallback taken, partial output

---

## 5. MVP Definition

### Phase 1: Core (Weeks 1-4)
- 10–20 seed templates across 5 categories
- Email+password auth + Google OAuth
- Template CRUD (create, read, update, duplicate, archive)
- Generate → stream → preview → export (Markdown + HTML)
- Save generated outputs to user library
- Usage dashboard (cost, generations)

**Exit criteria:** Single user can browse templates, generate content, and export it.

### Phase 2: Polish (Weeks 5-6)
- Block-level regeneration (per-`<AI>` block retry)
- Template versioning with history viewer
- PDF export (basic)
- Template categories + search
- Mobile responsive editor

**Exit criteria:** Internal beta with 10 users generating content independently.

### Phase 3: Scale (Weeks 7-12)
- Team workspaces + roles (owner, editor, viewer)
- Public template sharing / marketplace
- DOCX export
- API access for developers
- Subscription billing (Stripe)
- Analytics dashboard

**Exit criteria:** Public launch with 100+ active users, paid plans available.

---

## 6. Cost Considerations

### LLM API Usage Model

| Scenario | Tokens per gen | Cost (Sonnet) | Cost (gpt-4o-mini) | Daily limit |
|----------|---------------|---------------|--------------------|-------------|
| Blog post | ~4,000 in / 2,000 out | ~$0.02 | ~$0.003 | 200 gens |
| Social post | ~500 in / 800 out | ~$0.003 | ~$0.0004 | 1,500 gens |
| Email sequence | ~1,500 in / 1,500 out | ~$0.01 | ~$0.001 | 500 gens |
| Landing page | ~2,000 in / 3,000 out | ~$0.015 | ~$0.002 | 333 gens |

### Caching Strategy

| What | How | TTL |
|------|-----|-----|
| Completed generation | Redis hash (templateId + inputs hash → output) | 24h |
| Template rendering | In-memory LRU cache | 1h |
| Provider pricing | Config fetch at startup | 12h |
| User session | Auth.js session store | 30d |

**Cache invalidation:**
- On template update → clear that template's cache
- On user budget reset (daily) → clear usage counters
- Cache miss → generate fresh, cache result

### Monthly Cost Estimates

| Users | Gens/month | Avg cost/gen | Total API cost | Infra cost | Total |
|-------|-----------|--------------|----------------|------------|-------|
| 100 | 5,000 | $0.01 | $50 | $30 (Neon + Vercel + Fly) | $80 |
| 1,000 | 50,000 | $0.01 | $500 | $50 | $550 |
| 10,000 | 200,000 | $0.008* | $1,600 | $200 | $1,800 |

*At scale, 40% cache hit rate + `fast` tier routing reduces avg cost

### Cost Safeguards
1. **Per-user daily budget** — hard cap with auto-downgrade
2. **Per-request token cap** — template-level `maxTokens`
3. **Global budget alert** — Slack/Email alert when daily spend > $X
4. **Model routing** — auto-route to cheaper model when budget near cap
5. **Cache-first** — identical inputs return cached output

---

## 7. Shared Infrastructure with Digital Business Planner

Both products will share:
- **Auth** (Auth.js, same User model)
- **Workspace system** (same Workspace model, multi-tenant)
- **Usage ledger** (same UsageLedger model, cross-product metering)
- **AI provider abstraction** (same `AIProvider` interface, shared cost metering)
- **Monorepo structure** (shared UI components, TypeScript configs, ESLint)
- **CI/CD** (same GitHub Actions pipelines)
- **Monitoring** (same Sentry + OpenTelemetry instance)

This shared foundation reduces development cost and maintenance burden for both products.

---

## 8. Open Questions

| # | Question | Impact |
|---|----------|--------|
| 1 | Freemium (generation credits) vs flat subscription? | Usage-ledger design, pricing UI |
| 2 | Template content authored by us or by CMO/marketing? | Sprint 1 seed library ownership |
| 3 | Community template marketplace in MVP or post-launch? | Phase scope |
| 4 | Real-time collaboration (multi-cursor editing) in MVP? | WebSocket infra complexity |

---

**End of Document**
