# Beta Waitlist Landing Page — /beta

**Owner:** CMO  
**Target Launch:** Week of Nov 25, 2026  
**Goal:** 500 signups before public launch (Feb 1, 2027)  
**Incentive:** First 100 users get 50% off for life

---

## Page Structure

### Hero Section
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   Get Early Access to AI Content Templates                 │
│                                                             │
│   First 100 users get 50% off for life.                    │
│   Join 20+ beta testers shaping the product.               │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐  │
│   │  Email address                    [Join Waitlist]  │  │
│   └─────────────────────────────────────────────────────┘  │
│                                                             │
│   No credit card · Unsubscribe anytime · Privacy respected │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Social Proof Bar (Below Hero)
```
┌─────────────────────────────────────────────────────────────┐
│  "Block regeneration is a game-changer. I can tweak one     │
│   section without rewriting the whole post."                │
│   — Sarah Chen, Content Lead at GrowthAgency (Beta User)   │
│                                                             │
│  "Finally, AI that understands marketing frameworks, not    │
│   just generic prompts."                                    │
│   — Raj Patel, Founder at ScaleContent (Beta User)         │
└─────────────────────────────────────────────────────────────┘
```

### What You Get (3 Columns)

| Column 1: Templates | Column 2: Workflow | Column 3: Control |
|---------------------|-------------------|-------------------|
| **20+ Ready-to-Use Templates** | **Block-Level Regeneration** | **Brand Voice Presets** |
| Blog posts, LinkedIn, Twitter threads, emails, ads, SEO — all structured with proven frameworks | Regenerate any section without touching the rest. Keep what works, fix what doesn't. | Define your tone once. Every template adapts. Consistency at scale. |

### How It Works (3 Steps)
```
1. Pick a Template     →     2. Fill in Your Context     →     3. Generate & Refine
   (Blog, Social,       (Audience, goals, key           (Block-by-block control.
    Email, Ads...)       points, examples)              Regenerate any section.)
```

### Who It's For (Audience Selector)
```
┌─────────────────────────────────────────────────────────────┐
│  I'm a...  [Marketing Agency  ▼]  ← Dropdown changes copy  │
└─────────────────────────────────────────────────────────────┘

Options:
- Marketing Agency → "Produce 3x more content for clients"
- In-House Marketing Team → "Scale content without hiring"
- Freelance Writer/Creator → "Beat writer's block, deliver faster"
- Solopreneur/Founder → "Look like a content team of one"
- Coach/Consultant → "Create lead magnets & nurture sequences"
```

### Dynamic Copy by Audience

| Audience | Headline | Subtext |
|----------|----------|---------|
| Agency | "Deliver 3x more content for clients without hiring" | "Templates built for client work: case studies, proposals, reports, social calendars" |
| In-House Team | "Scale content production without scaling headcount" | "Brand voice presets keep every piece on-message across channels" |
| Freelancer | "Beat writer's block. Deliver faster. Charge more." | "Proven frameworks for every deliverable. Clients notice the quality." |
| Solopreneur | "Look like a content team of one" | "Blog + social + email + ads from one tool. You focus on strategy." |
| Coach/Consultant | "Turn expertise into lead magnets automatically" | "Workshop outlines, email courses, LinkedIn authority posts — done in minutes" |

### The "Why Us" Section
```
┌─────────────────────────────────────────────────────────────┐
│  Why Not Just Use ChatGPT?                                 │
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │  ChatGPT    │  │  Jasper/    │  │  NXDSOL     │         │
│  │             │  │  Copy.ai    │  │  Templates  │         │
│  ├─────────────┤  ├─────────────┤  ├─────────────┤         │
│  │ ❌ Blank    │  │ ❌ Generic  │  │ ✅ Structured│        │
│  │   page      │  │   outputs   │  │   frameworks│         │
│  │ ❌ No       │  │ ❌ All-or-  │  │ ✅ Block     │        │
│  │   memory    │  │   nothing   │  │   regen     │         │
│  │ ❌ No brand │  │ ❌ Expensive│  │ ✅ Brand     │        │
│  │   voice     │  │   ($49+/mo) │  │   voice     │         │
│  │ ❌ $20/mo   │  │             │  │ ✅ $29/mo   │        │
│  │   for Pro   │  │             │  │   (India)   │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
└─────────────────────────────────────────────────────────────┘
```

### FAQ Accordion
```
Q: When does beta start?
A: January 16, 2027. Waitlist members get priority invites.

Q: What does "50% off for life" mean?
A: First 100 paying users lock in ₹1,249/mo (Pro) or ₹3,499/mo (Team) forever. 
   Regular price: ₹2,499/₹6,999.

Q: Can I cancel anytime?
A: Yes. No contracts. Cancel in one click. Keep access until period ends.

Q: What if I'm not in India?
A: Beta is global. Pricing shown in INR; USD equivalent at checkout.

Q: How many templates at launch?
A: 20 seed templates across Blog, Social, Email, Ads, SEO, Sales.
   More added weekly based on beta feedback.

Q: Is there a free tier?
A: Yes — 100 generations/month free forever. Beta users get unlimited during beta.
```

### Final CTA
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   Ready to Stop Staring at Blank Pages?                    │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐  │
│   │  your@email.com                        [Join Now]  │  │
│   └─────────────────────────────────────────────────────┘  │
│                                                             │
│   First 100 users → 50% off for life · Beta starts Jan 16  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Form Fields

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Email | email | Yes | Valid format, not disposable |
| Role | select | Yes | Agency / In-House / Freelancer / Solopreneur / Coach / Other |
| Biggest Bottleneck | textarea | No | Max 500 chars |
| Source | hidden | — | UTM params / referrer |

**Form Action:** Formspree endpoint (new form, separate from contact form)
**Success Redirect:** /beta/thank-you.html

---

## Thank You Page (/beta/thank-you.html)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   🎉 You're In!                                             │
│                                                             │
│   Check your inbox for confirmation. We'll email you       │
│   when beta invitations go out (mid-January).              │
│                                                             │
│   While you wait...                                        │
│                                                             │
│   ┌──────────────────┐  ┌──────────────────┐              │
│   │  Join Our        │  │  Follow the      │              │
│   │  Discord         │  │  Journey         │              │
│   │  (Beta Community)│  │  (LinkedIn)      │              │
│   └──────────────────┘  └──────────────────┘              │
│                                                             │
│   Want to move up the list?                                │
│   Share with your network:                                 │
│                                                             │
│   [Share on LinkedIn]  [Share on Twitter]  [Copy Link]    │
│                                                             │
│   Your referral code: NXD-BETA-[UNIQUE]                    │
│   (Refer 3 friends → skip to front of line)                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Referral Program (Viral Loop)

| Referrals | Reward |
|-----------|--------|
| 1 | Early beta access (1 week before general) |
| 3 | Skip to front of waitlist + NXDSOL sticker pack |
| 5 | Free month of Pro (₹2,499 value) |
| 10 | Lifetime Pro discount (50% off) + beta tester badge |

**Tracking:** Unique referral code per user (e.g., `NXD-BETA-ABC123`)

---

## Technical Implementation

### Static HTML Option (Fastest)
- Create `beta.html` in repo root
- Formspree form with AJAX submit
- Referral codes via URL params (`?ref=NXD-BETA-ABC123`)
- Netlify/Vercel edge functions for referral tracking

### Netlify CMS Option (If Blog Uses It)
- Add waitlist as a collection
- Form submissions to Netlify Forms + webhook to Airtable/Google Sheets

### Recommended: Static + Airtable
1. Formspree → webhook → Airtable base
2. Airtable: Email, Role, Bottleneck, Source, Referral Code, Status
3. Zapier/Make: Auto-send welcome email + assign referral code
4. Weekly export for outreach

---

## Email Capture → Welcome Sequence

**Email 1 (Immediate):** Welcome + what to expect + Discord invite
**Email 2 (Day 2):** "How we built block regeneration" (technical story)
**Email 3 (Day 5):** "3 templates you can use today (no account needed)" — gated Notion templates
**Email 4 (Day 10):** Beta user spotlight #1
**Email 5 (Day 14):** "Your referral link + how to skip the line"
**Email 6 (Jan 10):** "Beta starts in 6 days — here's what's new"
**Email 7 (Jan 16):** "🚀 You're invited! Access your beta account"

---

## Metrics to Track

| Metric | Tool | Target (Pre-Launch) |
|--------|------|---------------------|
| Page views | Statcounter/GA4 | 2,000/mo |
| Signup conversion | Formspree + Airtable | 15% |
| Referral rate | Airtable | 20% of signups |
| Email open rate | ConvertKit | >40% |
| Waitlist → Beta conversion | Airtable | 30% |
| Waitlist → Paid conversion | Stripe + Airtable | 10% |

---

## Copy Document (For Design Handoff)

### Headlines Tested
1. **Primary:** "Get Early Access to AI Content Templates"
2. **Benefit:** "Produce 3x More Content. Same Team."
3. **Pain:** "Stop Staring at Blank Pages. Start Publishing."
4. **Curiosity:** "The AI Writing Tool That Remembers Your Brand Voice"

### Subheadlines Tested
1. "First 100 users get 50% off for life. Join 20+ beta testers."
2. "Block-level regeneration. Brand voice presets. 20+ marketing frameworks."
3. "Built for agencies and teams who need structure, not just generation."
4. "From blog posts to LinkedIn threads — structured, on-brand, done in minutes."

### CTA Button Copy Tested
1. "Join Waitlist" (primary)
2. "Get 50% Off for Life"
3. "Start Free Beta Access"
4. "I Want This"

---

## Launch Checklist

- [ ] Page designed in Figma (mobile-first)
- [ ] Static HTML built (`beta.html`, `beta/thank-you.html`)
- [ ] Formspree form created + webhook to Airtable
- [ ] Airtable base set up with fields + automation
- [ ] Welcome email sequence written + loaded in ConvertKit
- [ ] Referral code generation script working
- [ ] Social share buttons (LinkedIn, Twitter, copy link)
- [ ] UTM tracking on all links
- [ ] Statcounter goal: "beta-signup" configured
- [ ] Mobile tested (iOS Safari, Chrome Android)
- [ ] Accessibility audit (WCAG AA)
- [ ] Deploy to staging → review → deploy to production
- [ ] Add link from homepage hero + nav
- [ ] Announce on LinkedIn, Twitter, newsletter

---

*Last updated: 2026-11-19 by CMO*