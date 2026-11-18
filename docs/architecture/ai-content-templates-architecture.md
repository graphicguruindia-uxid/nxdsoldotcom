# AI Content Templates Platform — Technical Architecture

**Version:** 1.0  
**Date:** 2026-11-18  
**Author:** CTO  
**Status:** Draft — For Review

---

## 1. Executive Summary

The AI Content Templates Platform is NXDSOL's first commercial product: a SaaS application that lets marketing teams create, customize, and deploy AI-generated content at scale. Users select from 50+ pre-built templates, inject their brand context, and generate production-ready content (blog posts, LinkedIn posts, email sequences, ad copy, etc.) via generative AI.

**Target Launch:** Month 6 (Q2 2027)  
**Core Value Prop:** Reduce content creation time from hours to minutes while maintaining brand voice consistency.

---

## 2. Product Requirements

### 2.1 Core Features (MVP)

| Feature | Description | Priority |
|---------|-------------|----------|
| Template Engine | Variable substitution, conditional blocks, loops | P0 |
| AI Generation | OpenAI/Anthropic integration with prompt templates | P0 |
| Template Marketplace | Browse, search, filter 50+ templates by category | P0 |
| User Auth & Subscriptions | Clerk/NextAuth + Stripe billing | P0 |
| Brand Context | Persistent brand voice, tone, audience profiles | P0 |
| Generation History | Versioned outputs, re-generation, comparison | P1 |
| Export/Sharing | Copy to clipboard, Markdown, PDF, direct publish | P1 |
| Team Workspaces | Multi-user, role-based access, shared brand context | P2 |

### 2.2 Non-Functional Requirements

- **Latency:** Generation < 15s (streaming), template render < 200ms
- **Availability:** 99.9% uptime SLA
- **Scale:** 10k concurrent users, 1M generations/month by Month 12
- **Security:** SOC 2 Type II ready, data encryption at rest/in transit
- **Cost Control:** AI API spend < 30% of revenue, per-user quotas

---

## 3. High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                                 │
│  Next.js 14 (App Router) + React 18 + TypeScript + Tailwind CSS    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌───────────┐  │
│  │  Marketing  │  │  Template   │  │  Generation │  │  Account  │  │
│  │  Landing    │  │  Marketplace│  │  Studio     │  │  Dashboard│  │
│  └─────────────┘  └─────────────┘  └─────────────┘  └───────────┘  │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        API LAYER (Next.js API Routes)               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌───────────┐  │
│  │  /api/auth  │  │/api/templates│  │/api/generate│  │/api/billing│  │
│  └─────────────┘  └─────────────┘  └─────────────┘  └───────────┘  │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    ▼               ▼               ▼
┌─────────────────┐ ┌────────────────┐ ┌─────────────────────────┐
│  PostgreSQL     │ │  Redis         │ │  AI Providers           │
│  (Supabase/Neon)│ │  (Upstash)     │ │  • OpenAI GPT-4o        │
│  • Users        │ │  • Rate limit  │ │  • Anthropic Claude 3.5 │
│  • Templates    │ │  • Cache       │ │  • Fallback chain       │
│  • Generations  │ │  • Sessions    │ │  • Cost tracking        │
│  • Subscriptions│ │  • Queue       │ └─────────────────────────┘
└─────────────────┘ └────────────────┘
```

---

## 4. Data Models

### 4.1 Prisma Schema (Core)

```prisma
// User & Auth
model User {
  id            String    @id @default(cuid())
  clerkId       String    @unique
  email         String    @unique
  name          String?
  avatarUrl     String?
  role          Role      @default(MEMBER)
  workspaceId   String?
  workspace     Workspace? @relation(fields: [workspaceId], references: [id])
  brandContext  BrandContext?
  generations   Generation[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

enum Role { ADMIN MEMBER VIEWER }

// Multi-tenant workspace
model Workspace {
  id           String   @id @default(cuid())
  name         String
  slug         String   @unique
  ownerId      String   @unique
  owner        User     @relation(fields: [ownerId], references: [id], onDelete: Cascade)
  members      User[]
  brandContext BrandContext?
  subscription Subscription?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

// Brand voice persistence
model BrandContext {
  id            String   @id @default(cuid())
  userId        String?  @unique
  workspaceId   String?  @unique
  user          User?    @relation(fields: [userId], references: [id], onDelete: Cascade)
  workspace     Workspace? @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
  companyName   String
  industry      String
  targetAudience String
  tone          Tone     @default(PROFESSIONAL)
  voiceAttributes Json    // { formality, enthusiasm, technicality, ... }
  bannedWords   String[]
  preferredTerms Json    // { "AI": "artificial intelligence" }
  examples      String[] // few-shot examples
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

enum Tone { PROFESSIONAL CASUAL AUTHORITATIVE FRIENDLY TECHNICAL CONVERSATIONAL }

// Template definition
model Template {
  id          String   @id @default(cuid())
  slug        String   @unique
  name        String
  description String
  category    Category
  tags        String[]
  // Template structure: variables, blocks, conditionals, loops
  schema      Json     // Zod schema for variables
  promptTemplate String  // System + user prompt with {{variables}}
  modelConfig Json     // { provider, model, temperature, maxTokens }
  version     Int      @default(1)
  isPublic    Boolean  @default(true)
  authorId    String
  author      User     @relation(fields: [authorId], references: [id])
  generations Generation[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

enum Category {
  BLOG_POST
  LINKEDIN_POST
  TWITTER_THREAD
  EMAIL_SEQUENCE
  AD_COPY
  LANDING_PAGE
  CASE_STUDY
  WHITEPAPER
  NEWSLETTER
  PRODUCT_DESCRIPTION
  SEO_ARTICLE
  PRESS_RELEASE
}

// Generation record
model Generation {
  id           String   @id @default(cuid())
  templateId   String
  template     Template @relation(fields: [templateId], references: [id])
  userId       String
  user         User     @relation(fields: [userId], references: [id])
  workspaceId  String
  inputVars    Json     // Resolved variables used
  output       String   // Generated content (Markdown)
  modelUsed    String   // e.g., "gpt-4o-2024-08-06"
  tokensIn     Int
  tokensOut    Int
  costUsd      Float
  status       GenStatus @default(COMPLETED)
  feedback     Feedback? // thumb up/down + comment
  createdAt    DateTime @default(now())
}

enum GenStatus { STREAMING COMPLETED FAILED CANCELLED }

// Stripe subscription
model Subscription {
  id                   String   @id @default(cuid())
  workspaceId          String   @unique
  workspace            Workspace @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
  stripeCustomerId     String   @unique
  stripeSubscriptionId String   @unique
  stripePriceId        String
  status               SubStatus @default(ACTIVE)
  currentPeriodEnd     DateTime
  cancelAtPeriodEnd    Boolean  @default(false)
  createdAt            DateTime @default(now())
  updatedAt            DateTime @updatedAt
}

enum SubStatus { ACTIVE PAST_DUE CANCELED INCOMPLETE TRIALING }
```

---

## 5. Template Engine Design

### 5.1 Template Structure (JSON Schema)

```json
{
  "id": "linkedin-thought-leadership",
  "name": "LinkedIn Thought Leadership Post",
  "category": "LINKEDIN_POST",
  "description": "Authority-building post with hook, insight, and CTA",
  "variables": {
    "topic": { "type": "string", "description": "Main topic", "required": true },
    "audience": { "type": "string", "enum": ["founders", "ctos", "marketers", "investors"], "required": true },
    "keyInsight": { "type": "string", "description": "Your unique perspective", "required": true },
    "proofPoint": { "type": "string", "description": "Data, anecdote, or result", "required": false },
    "cta": { "type": "string", "enum": ["comment", "connect", "newsletter", "none"], "default": "comment" }
  },
  "promptTemplate": {
    "system": "You are a LinkedIn ghostwriter for {{brand.companyName}}. Write in {{brand.tone}} tone. Voice attributes: {{brand.voiceAttributes}}. Avoid: {{brand.bannedWords}}. Use: {{brand.preferredTerms}}.",
    "user": "Write a LinkedIn post about {{topic}} for {{audience}}.\n\nKey insight: {{keyInsight}}\n{{#if proofPoint}}Proof: {{proofPoint}}{{/if}}\n\nStructure:\n1. Hook (1 line, <150 chars)\n2. Context (2-3 lines)\n3. Insight (3-4 lines)\n4. Proof (if provided)\n5. Question/CTA ({{cta}})\n\nFormatting: Line breaks between sections. 3-5 relevant hashtags at end."
  },
  "modelConfig": {
    "provider": "openai",
    "model": "gpt-4o-2024-08-06",
    "temperature": 0.7,
    "maxTokens": 1500
  }
}
```

### 5.2 Rendering Pipeline

```
User Input → Validate against Zod Schema → Merge with Brand Context → 
Render Prompt (Handlebars) → Stream from AI → Parse/Format Output → 
Persist Generation → Return to Client
```

### 5.3 Variable Resolution Priority

1. User-provided input (highest)
2. Workspace brand context defaults
3. User brand context defaults
4. Template defaults
5. System defaults (lowest)

---

## 6. AI Provider Strategy

### 6.1 Provider Abstraction Layer

```typescript
// lib/ai/providers.ts
interface AIProvider {
  name: string;
  generateStream(params: GenerationParams): AsyncIterable<string>;
  generate(params: GenerationParams): Promise<GenerationResult>;
  estimateTokens(prompt: string): number;
  calculateCost(tokensIn: number, tokensOut: number): number;
}

interface GenerationParams {
  systemPrompt: string;
  userPrompt: string;
  model: string;
  temperature: number;
  maxTokens: number;
  onChunk?: (chunk: string) => void;
}

interface GenerationResult {
  content: string;
  tokensIn: number;
  tokensOut: number;
  costUsd: number;
  model: string;
}
```

### 6.2 Provider Chain (Fallback Strategy)

| Priority | Provider | Model | Use Case |
|----------|----------|-------|----------|
| 1 | OpenAI | gpt-4o-2024-08-06 | Primary — best quality/speed |
| 2 | Anthropic | claude-3-5-sonnet-20241022 | Fallback — better reasoning |
| 3 | OpenAI | gpt-4o-mini | Cost-optimized — simple templates |
| 4 | Anthropic | claude-3-haiku-20240307 | Emergency — cheapest fallback |

### 6.3 Cost Controls

- **Per-user monthly quota:** $10 (Free), $50 (Pro), $200 (Team), Custom (Enterprise)
- **Per-generation hard limit:** $0.50
- **Auto-downgrade model** when workspace spend > 80% of quota
- **Real-time cost display** in generation studio
- **Admin dashboard** with spend alerts at 50%, 80%, 95%

---

## 7. API Design

### 7.1 REST Endpoints

```
POST   /api/auth/sync              # Clerk webhook sync
GET    /api/templates              # List (paginated, filtered)
GET    /api/templates/:slug        # Get template + schema
POST   /api/templates              # Create (admin/author)
PATCH  /api/templates/:slug        # Update (author)
DELETE /api/templates/:slug        # Delete (author)

POST   /api/generate               # Start generation (returns stream)
GET    /api/generations            # List user's generations
GET    /api/generations/:id        # Get generation detail
POST   /api/generations/:id/regenerate
POST   /api/generations/:id/feedback

GET    /api/brand-context          # Get brand context
PUT    /api/brand-context          # Update brand context

GET    /api/workspace              # Get workspace + members
POST   /api/workspace/invite       # Invite member
PATCH  /api/workspace/members/:id  # Update role
DELETE /api/workspace/members/:id  # Remove member

GET    /api/billing/portal         # Stripe customer portal URL
GET    /api/billing/usage          # Current period usage
```

### 7.2 Streaming Generation (Server-Sent Events)

```typescript
// POST /api/generate
// Request: { templateSlug, variables, stream: true }
// Response: text/event-stream

// Events:
data: {"type": "start", "generationId": "gen_abc123"}
data: {"type": "chunk", "content": "Transform"}
data: {"type": "chunk", "content": " your"}
data: {"type": "chunk", "content": " business"}
data: {"type": "complete", "tokensIn": 450, "tokensOut": 890, "costUsd": 0.0234}
data: {"type": "error", "message": "Rate limited"} // on failure
```

---

## 8. Frontend Architecture (Next.js 14 App Router)

### 8.1 Route Structure

```
/                           # Marketing landing page
/templates                  # Template marketplace (public)
/templates/[slug]           # Template detail + generation studio
/generate/[slug]            # Dedicated generation view (shareable)
/dashboard                  # User dashboard (protected)
/dashboard/generations      # Generation history
/dashboard/generations/[id] # Generation detail + version compare
/dashboard/brand            # Brand context editor
/dashboard/workspace        # Workspace settings, members
/dashboard/billing          # Subscription management
/api/...                    # API routes
```

### 8.2 Key Components

| Component | Purpose |
|-----------|---------|
| `TemplateCard` | Marketplace grid item |
| `VariableForm` | Dynamic form from Zod schema |
| `GenerationStudio` | Split view: form + streaming output |
| `OutputEditor` | Markdown editor with copy/export |
| `BrandContextWizard` | Multi-step brand setup |
| `UsageMeter` | Quota visualization |
| `TemplateVersionDiff` | Side-by-side generation comparison |

### 8.3 State Management

- **Server State:** TanStack Query (caching, invalidation, optimistic updates)
- **Client State:** Zustand (UI state: sidebar, modals, active template)
- **Auth State:** Clerk React SDK
- **Form State:** React Hook Form + Zod resolver

---

## 9. Development Workflow

### 9.1 Sprint Structure (2 weeks)

| Ceremony | When | Duration |
|----------|------|----------|
| Sprint Planning | Monday 9:00 | 1 hr |
| Daily Standup | Daily 9:30 | 15 min |
| Backlog Refinement | Wednesday | 30 min |
| Sprint Review | Friday 15:00 | 1 hr |
| Retrospective | Friday 16:00 | 30 min |

### 9.2 Definition of Done

- [ ] Code reviewed (1 approval minimum)
- [ ] Unit tests pass (>80% coverage on lib/)
- [ ] Integration tests pass (API routes)
- [ ] E2E tests pass (critical paths)
- [ ] Linting/formatting passes
- [ ] Deployed to staging (Vercel preview)
- [ ] Documentation updated (API, components)
- [ ] No console errors/warnings

### 9.3 Branching Strategy

```
main ──────────────────────────────────────────────►
  │
  ├── develop (integration branch)
  │     │
  │     ├── feat/template-engine
  │     ├── feat/ai-providers
  │     ├── feat/brand-context
  │     └── fix/...
  │
  └── release/v1.0.0 (release branches)
```

- Feature branches off `develop`
- PRs target `develop`
- Release branch cut from `develop` → `main` (tagged)
- Hotfixes off `main` → backport to `develop`

---

## 10. Infrastructure & Deployment

### 10.1 Environments

| Environment | URL | Purpose | Auto-deploy |
|-------------|-----|---------|-------------|
| Local | localhost:3000 | Development | — |
| Preview | *.vercel.app | PR previews | On PR |
| Staging | staging.nxdsol.com | QA/Stakeholder review | On merge to develop |
| Production | app.nxdsol.com | Live customers | On merge to main (manual) |

### 10.2 Vercel Configuration

```json
// vercel.json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm ci",
  "framework": "nextjs",
  "regions": ["iad1"],
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 60
    }
  },
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Origin", "value": "https://app.nxdsol.com" },
        { "key": "Access-Control-Allow-Methods", "value": "GET, POST, OPTIONS" }
      ]
    }
  ]
}
```

### 10.3 Database (Supabase/Neon)

- **Primary:** PostgreSQL 16 (Neon serverless)
- **Connection pooling:** PgBouncer (Neon built-in)
- **Migrations:** Prisma Migrate (CI gate)
- **Backups:** Daily automated + point-in-time recovery
- **Read replicas:** For analytics queries (Month 6+)

### 10.4 Redis (Upstash)

- **Rate limiting:** 60 req/min per IP, 20 gen/min per user
- **Caching:** Template list (5 min), brand context (1 hr)
- **Queue:** BullMQ for async generation (Month 4+)
- **Sessions:** Clerk handles auth, Redis for supplementary

---

## 11. Security

### 11.1 Authentication & Authorization

- **Auth Provider:** Clerk (SSO, MFA, device tracking)
- **Session:** JWT in HttpOnly cookie (Clerk managed)
- **API Auth:** Clerk middleware on all `/api/*` routes
- **RBAC:** Workspace roles (Admin > Member > Viewer)

### 11.2 Data Protection

- **Encryption at rest:** Neon/Supabase managed (AES-256)
- **Encryption in transit:** TLS 1.3 everywhere
- **PII handling:** Email, name only — no content stored without consent
- **Data retention:** Generations kept 1 year (configurable), purge on request
- **GDPR/CCPA:** Delete endpoint, data export

### 11.3 AI-Specific Security

- **Prompt injection defense:** Input sanitization, delimiter-based prompt construction
- **Output validation:** Length limits, markdown sanitization (DOMPurify)
- **API key rotation:** Quarterly, automated via Vercel env
- **Audit logging:** All generations logged with user, template, cost

---

## 12. Observability

### 12.1 Metrics (PostHog + Custom)

| Metric | Target | Alert |
|--------|--------|-------|
| Generation latency (p50) | < 8s | > 15s |
| Generation latency (p95) | < 15s | > 30s |
| Error rate | < 1% | > 5% |
| Streaming disconnect rate | < 2% | > 10% |
| Cost per generation | < $0.10 | > $0.25 |
| Daily active users | — | Drop > 20% WoW |

### 12.2 Error Tracking

- **Sentry:** Frontend + API errors, release tracking
- **LogRocket:** Session replay for generation failures
- **Custom:** AI provider errors categorized by type (rate limit, context window, content filter)

### 12.3 Logging

```typescript
// Structured logging (pino)
logger.info({
  event: "generation.completed",
  generationId: "gen_abc",
  userId: "user_123",
  templateId: "tmpl_linkedin",
  model: "gpt-4o",
  tokensIn: 450,
  tokensOut: 890,
  costUsd: 0.0234,
  latencyMs: 7200
});
```

---

## 13. Testing Strategy

### 13.1 Test Pyramid

```
                    ┌─────────────┐
                    │   E2E (10)  │  ← Playwright: critical paths
                    ├─────────────┤
                ┌───│Integration  │───┐
                │   │   (50)      │   │  ← API routes, DB, AI mock
                │   ├─────────────┤   │
                │   │   Unit (200)│   │  ← lib/, components, utils
                └───┴─────────────┴───┘
```

### 13.2 Key Test Scenarios

- Template variable validation (Zod)
- Brand context merge priority
- AI provider fallback chain
- Streaming chunk assembly
- Rate limiting enforcement
- Subscription gating
- RBAC on workspace actions
- Prompt injection attempts

### 13.3 AI Testing

- **Golden prompts:** Fixed inputs → expected output patterns (regex)
- **Cost regression:** Track tokens/generation per template
- **Quality eval:** Monthly human eval of 50 generations per template
- **A/B testing:** Model config variants (temperature, model)

---

## 14. Milestones & Timeline

| Milestone | Target | Deliverable |
|-----------|--------|-------------|
| M1: Foundation | Month 2 | Next.js + Clerk + Supabase + CI/CD |
| M2: Template Engine | Month 3 | Variable resolution, Handlebars renderer, Zod schemas |
| M3: AI Integration | Month 4 | Provider abstraction, streaming, fallback chain |
| M4: Marketplace | Month 5 | Browse, search, 20 seed templates |
| M5: Brand Context | Month 5 | Wizard, persistence, merge logic |
| M6: Billing & Auth | Month 5 | Stripe subscriptions, workspace RBAC |
| M7: Polish & Launch | Month 6 | 50 templates, docs, landing page, GA |

---

## 15. Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| AI API cost overrun | High | Medium | Quotas, fallback to cheaper models, caching |
| Prompt injection | High | Low | Sanitization, delimiters, output validation |
| Model quality regression | Medium | Medium | Golden prompt tests, monthly eval, pin model versions |
| Supplier lock-in | Medium | Low | Provider abstraction, multi-provider support |
| Template maintenance burden | Medium | High | Versioning, community contributions, deprecation policy |
| Slow generation UX | Medium | Medium | Streaming, perceived latency optimization, queue for heavy |

---

## 16. Open Questions

1. **Pricing model:** Per-seat + usage vs. pure usage-based?
2. **Template versioning:** Semantic versioning or date-based?
3. **Public template submissions:** Open marketplace or curated only?
4. **Fine-tuning vs. prompt engineering:** When to invest in fine-tunes?
5. **Enterprise features:** SSO (SAML/OIDC), audit logs, data residency — Phase 2?
6. **Mobile app:** React Native wrapper or PWA sufficient?

---

## 17. Appendix: Seed Template Categories (50 Target)

| Category | Count | Examples |
|----------|-------|----------|
| Blog Posts | 10 | How-to, Listicle, Case Study, Opinion, SEO Pillar |
| LinkedIn | 8 | Thought Leadership, Milestone, Lesson Learned, Hiring, Event |
| Twitter/X | 6 | Thread, Single Tweet, Announcement, Tip, Quote |
| Email | 8 | Cold Outreach, Nurture Sequence, Newsletter, Re-engagement |
| Ad Copy | 8 | Facebook, Google, LinkedIn, Retargeting |
| Landing Page | 5 | Hero, Features, Pricing, FAQ, Testimonial |
| Other | 5 | Case Study, Whitepaper, Press Release, Product Desc, Newsletter |

---

*End of Architecture Document*