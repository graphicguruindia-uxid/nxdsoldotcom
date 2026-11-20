# SEED_TEMPLATES.md — AI Content Templates Seed Library

**Version:** 1.0
**Date:** 2026-11-20
**Author:** CMO (059aecb9-3c6b-4456-8b34-5adb24e581a5)
**Product:** AI Content Templates (NEX-3)
**Status:** Ready for Sprint 1 ingestion
**Template syntax:** Hybrid static text + `<AI>` blocks per `docs/AI_CONTENT_TEMPLATES_DESIGN.md` §2.4

---

## Format

Each seed template follows the data model in the design doc:

- **name** — human-readable template name
- **slug** — URL-safe identifier (unique per workspace)
- **category** — `blog` | `social` | `email` | `ads` | `seo` | `sales`
- **description** — one-line value prop shown in the gallery
- **variables** — user inputs (all `{{variable}}` tokens are validated via Zod before generation)
- **bodyTemplate** — document body: static text + `<AI>` blocks

Shared variables used across templates: `tone` (professional | friendly | bold | warm), `audience` (target audience description), `brand_voice` (short brand personality note).

---

## Index

| # | Name | Slug | Category |
|---|------|------|----------|
| 1 | Blog Post Outline | `blog-post-outline` | blog |
| 2 | Blog Intro Generator | `blog-intro` | blog |
| 3 | Blog Conclusion Writer | `blog-conclusion` | blog |
| 4 | Listicle Builder | `listicle-builder` | blog |
| 5 | LinkedIn Post | `linkedin-post` | social |
| 6 | Twitter Thread | `twitter-thread` | social |
| 7 | Instagram Caption | `instagram-caption` | social |
| 8 | Facebook Ad | `facebook-ad` | social |
| 9 | Welcome Sequence | `welcome-sequence` | email |
| 10 | Nurture Email | `nurture-email` | email |
| 11 | Promo Email | `promo-email` | email |
| 12 | Re-engagement Email | `re-engagement-email` | email |
| 13 | Google Search Ad | `google-search-ad` | ads |
| 14 | Facebook Ad Variants | `facebook-ad-variants` | ads |
| 15 | LinkedIn Sponsored Content | `linkedin-sponsored` | ads |
| 16 | Meta Description | `meta-description` | seo |
| 17 | Title Tags | `title-tags` | seo |
| 18 | Product Description | `product-description` | seo |
| 19 | Cold Outreach | `cold-outreach` | sales |
| 20 | Sales Follow-up | `sales-followup` | sales |
| 21 | Proposal Intro | `proposal-intro` | sales |

> Note: 21 templates delivered (20 committed + Proposal Intro included in the Sales track per the 2026-11-19 CMO update). All 20+ slugs are ready for ingestion.

---

## Blog / Content (4)

### 1. Blog Post Outline — `blog-post-outline`

**Description:** Structured, scannable outline with H2/H3 hierarchy and word-count targets for each section.

**Variables:** `topic`, `audience`, `tone`, `goal` (educate | persuade | convert)

```markdown
<AI block="title" tone="{{tone}}">
Write 3 candidate blog post titles (under 60 characters) for a post about {{topic}} aimed at {{audience}}. The goal is to {{goal}}.
</AI>

# {{title}}

<AI block="intro-brief" tone="{{tone}}">
In 2 sentences, state the reader's current problem with {{topic}} and promise a specific outcome by the end of the post. Audience: {{audience}}.
</AI>

## <AI block="section-1" tone="{{tone}}">
Section 1 heading and 3-5 bullet points covering the foundational concepts of {{topic}}. Keep bullets under 15 words each.
</AI>

## <AI block="section-2" tone="{{tone}}">
Section 2 heading and 3-5 bullet points: the step-by-step process or framework. Audience: {{audience}}.
</AI>

## <AI block="section-3" tone="{{tone}}">
Section 3 heading and 3-5 bullet points: common mistakes, edge cases, or advanced considerations.
</AI>

## <AI block="conclusion" tone="{{tone}}">
Conclusion with a single clear call to action aligned to the goal: {{goal}}.
</AI>
```

---

### 2. Blog Intro Generator — `blog-intro`

**Description:** Three distinct opening angles (pattern-interrupt, story, data) so you pick the hook that fits.

**Variables:** `topic`, `audience`, `tone`, `key_message`

```markdown
<AI block="hook-data" tone="{{tone}}">
Option A — Data-led intro (3-4 sentences): open with a striking statistic or fact about {{topic}} relevant to {{audience}}, then pivot to why it matters now.
</AI>

<AI block="hook-story" tone="{{tone}}">
Option B — Story intro (3-4 sentences): a brief, realistic scenario where {{audience}} struggles with {{topic}}, then the turning point.
</AI>

<AI block="hook-interrupt" tone="{{tone}}">
Option C — Pattern-interrupt intro (2-3 sentences): challenge a common belief about {{topic}} in one bold line, then state {{key_message}} as the counterpoint.
</AI>
```

---

### 3. Blog Conclusion Writer — `blog-conclusion`

**Description:** Tight closing paragraph with a single CTA — no fluff, no restating everything.

**Variables:** `topic`, `key_takeaway`, `cta_goal`, `tone`

```markdown
<AI block="conclusion" tone="{{tone}}">
Write a blog post conclusion (4-5 sentences) about {{topic}}. Summarize in one sentence: {{key_takeaway}}. End with a single, specific call to action: {{cta_goal}}. Do not list all previous points.
</AI>
```

---

### 4. Listicle Builder — `listicle-builder`

**Description:** Full listicle with a promise-driven title and consistent item structure (bold lead + 2-sentence expansion).

**Variables:** `topic`, `audience`, `tone`, `item_count` (5-10)

```markdown
<AI block="title" tone="{{tone}}">
Write a listicle title in the format "{{number}} {{noun}}s That {{outcome}}" or similar, using {{item_count}} items, about {{topic}} for {{audience}}. Under 65 characters.
</AI>

# {{title}}

<AI block="intro" tone="{{tone}}">
Intro paragraph (2-3 sentences): who this is for and what they'll be able to do after reading.
</AI>

<AI block="items" tone="{{tone}}">
Generate {{item_count}} list items about {{topic}}. Each item: bold one-line headline (max 12 words) + 2-sentence expansion with a concrete example. Items must be distinct — no near-duplicates.
</AI>

<AI block="recap" tone="{{tone}}">
One-sentence wrap-up naming the single most important item and why.
</AI>
```

---

## Social Media (4)

### 5. LinkedIn Post — `linkedin-post`

**Description:** Hook-first LinkedIn post with short lines and a conversation starter in the closing line.

**Variables:** `topic`, `audience`, `tone`, `insight`, `cta_goal`

```markdown
<AI block="hook" tone="{{tone}}">
Write the first line of a LinkedIn post about {{topic}}. It must stop the scroll in under 12 words. No hashtag, no "I'm excited to announce."
</AI>

<AI block="body" tone="{{tone}}">
Write the body of the post (5-8 short lines, each under 15 words). Central insight: {{insight}}. Audience: {{audience}}. Use line breaks for rhythm. No corporate jargon.
</AI>

<AI block="closer" tone="{{tone}}">
Closing line that invites a specific reply from {{audience}} — a question or prompt tied to {{cta_goal}}.
</AI>
```

---

### 6. Twitter Thread — `twitter-thread`

**Description:** 8-12 tweet thread with a hook tweet, value ladder, and loop-back close.

**Variables:** `topic`, `audience`, `tone`, `key_points` (3-5 takeaways, semicolon-separated)

```markdown
<AI block="tweet-1" tone="{{tone}}">
Thread hook tweet (under 240 chars): bold claim or question about {{topic}} that earns a "read more." Include "(Thread 🧵)".
</AI>

<AI block="body-tweets" tone="{{tone}}">
Write 6-9 tweets, one idea each (under 240 chars each), walking through: {{key_points}}. Each tweet should stand alone but build on the previous one. No hashtags in body tweets.
</AI>

<AI block="tweet-final" tone="{{tone}}">
Closing tweet: one-line summary + CTA (follow / reply / link) for {{audience}}. Under 240 chars.
</AI>
```

---

### 7. Instagram Caption — `instagram-caption`

**Description:** Caption with a strong first line (shows before "...more"), natural hashtags, and a comment prompt.

**Variables:** `topic`, `audience`, `tone`, `goal` (engagement | save | share | click)

```markdown
<AI block="first-line" tone="{{tone}}">
First line of an Instagram caption about {{topic}} — this is all that shows before the "...more" fold. Make it count. Under 60 characters.
</AI>

<AI block="body" tone="{{tone}}">
Caption body (3-6 short sentences) expanding on: {{topic}}. Audience: {{audience}}. Conversational, not salesy.
</AI>

<AI block="prompt" tone="{{tone}}">
One-line comment prompt that pushes toward the goal: {{goal}}.
</AI>

<AI block="hashtags" tone="neutral">
8-12 relevant hashtags about {{topic}} for {{audience}}. Mix of high- and mid-volume. Plain list, no commentary.
</AI>
```

---

### 8. Facebook Ad — `facebook-ad`

**Description:** Primary text + headline + description combo that passes ad-policy tone and hooks in the first line.

**Variables:** `product`, `audience`, `benefit`, `offer`, `tone`, `cta_goal`

```markdown
<AI block="primary-text" tone="{{tone}}">
Facebook ad primary text (400-800 characters). Product: {{product}}. Core benefit: {{benefit}}. Audience: {{audience}}. First line must hook. End with CTA: {{cta_goal}}. Avoid superlatives like "best" or "guaranteed" that trip ad policies.
</AI>

<AI block="headline" tone="{{tone}}">
Ad headline (under 40 characters) for {{product}} emphasizing {{benefit}}.
</AI>

<AI block="description" tone="{{tone}}">
Ad description (under 90 characters) reinforcing the offer: {{offer}}.
</AI>
```

---

## Email (4)

### 9. Welcome Sequence — `welcome-sequence`

**Description:** 3-email welcome series (value → proof → pitch) for new subscribers.

**Variables:** `product`, `audience`, `brand_voice`, `cta_goal`

```markdown
## Email 1 (sends immediately)
Subject: <AI block="welcome-subject" tone="warm">
Subject line (under 50 chars) that sets expectations for what subscribers get, for {{audience}}. No clickbait.
</AI>

<AI block="welcome-body" tone="warm">
Body (120-180 words): introduce {{product}} in one line, deliver one piece of immediate value (tip or resource), and tell them what's coming in the next two emails. Sign off warmly.
</AI>

## Email 2 (sends day 2)
Subject: <AI block="value-subject" tone="warm">
Subject line (under 50 chars) previewing a specific useful tip for {{audience}}.
</AI>

<AI block="value-body" tone="warm">
Body (120-180 words): one concrete, actionable tip related to {{product}}. No pitch. End with a light question to invite replies.
</AI>

## Email 3 (sends day 4)
Subject: <AI block="pitch-subject" tone="warm">
Subject line (under 50 chars) introducing the offer without pressure.
</AI>

<AI block="pitch-body" tone="warm">
Body (120-180 words): one real use case or customer-style example of {{product}} in action, then a single clear CTA: {{cta_goal}}. Brand voice: {{brand_voice}}.
</AI>
```

---

### 10. Nurture Email — `nurture-email`

**Description:** Mid-funnel email that deepens a specific objection or use case without hard-selling.

**Variables:** `product`, `audience`, `objection`, `tone`, `cta_goal`

```markdown
Subject: <AI block="subject" tone="{{tone}}">
Subject line (under 50 chars) that acknowledges a real situation {{audience}} faces, tied to: {{objection}}.
</AI>

<AI block="body" tone="{{tone}}">
Email body (150-250 words). Open by naming the situation honestly. Spend most of the email addressing: {{objection}} — with evidence, a mini-example, or a framework. Product context: {{product}}. End with one soft CTA: {{cta_goal}}. No exclamation-point stacking, no "act now" pressure.
</AI>
```

---

### 11. Promo Email — `promo-email`

**Description:** Direct, time-boxed promotion with the offer above the fold.

**Variables:** `product`, `offer`, `deadline`, `audience`, `tone`, `cta_goal`

```markdown
Subject: <AI block="subject" tone="{{tone}}">
Subject line (under 50 chars) stating the offer plainly: {{offer}}. Include urgency from: {{deadline}} — without fake scarcity.
</AI>

<AI block="body" tone="{{tone}}">
Promo email body (80-150 words). First two lines must state the offer: {{offer}} for {{audience}}. Then 2-3 benefit bullets tied to {{product}}. One deadline mention: {{deadline}}. One CTA: {{cta_goal}}.
</AI>

<AI block="ps" tone="{{tone}}">
P.S. line (under 30 words) adding one reassurance (e.g., what's included, what's not required).
</AI>
```

---

### 12. Re-engagement Email — `re-engagement-email`

**Description:** For inactive subscribers — low-pressure, honest, one-click path back (or polite unsubscribe).

**Variables:** `product`, `audience`, `last_activity` (e.g., "3 months"), `tone`, `value_update` (what's new)

```markdown
Subject: <AI block="subject" tone="{{tone}}">
Subject line (under 50 chars) that is honest about the reader being quiet for {{last_activity}}. Curious, not accusatory.
</AI>

<AI block="body" tone="{{tone}}">
Body (100-150 words): acknowledge the silence in one line, share one genuinely new thing: {{value_update}}. Offer two paths — keep getting these (link) or unsubscribe with one click, framed respectfully. Product: {{product}}.
</AI>
```

---

## Ads (3)

### 13. Google Search Ad — `google-search-ad`

**Description:** Headline set + descriptions within Google's character limits, built around intent keywords.

**Variables:** `product`, `keywords` (3-5 search terms), `benefit`, `offer`, `cta_goal`

```markdown
<AI block="headlines" tone="neutral">
Generate 5 Google Search ad headlines, each 30 characters max, for {{product}} targeting these search terms: {{keywords}}. Each headline must include one of the keywords or the benefit: {{benefit}}.
</AI>

<AI block="descriptions" tone="neutral">
Generate 2 Google ad descriptions, each 90 characters max, for {{product}}. Description 1: benefit-led ({{benefit}}). Description 2: offer-led ({{offer}}) with CTA: {{cta_goal}}.
</AI>
```

---

### 14. Facebook Ad Variants — `facebook-ad-variants`

**Description:** Three angle variants (pain, outcome, social proof) of the same offer for A/B testing.

**Variables:** `product`, `audience`, `offer`, `tone`, `pain_point`, `outcome`

```markdown
## Variant A — Pain-led
<AI block="variant-a" tone="{{tone}}">
Facebook ad primary text (300-500 chars) for {{product}}: open with the pain — {{pain_point}} — as {{audience}} experiences it daily, then present the offer: {{offer}}.
</AI>

## Variant B — Outcome-led
<AI block="variant-b" tone="{{tone}}">
Facebook ad primary text (300-500 chars) for {{product}}: open with the desired outcome — {{outcome}} — then explain how {{offer}} gets {{audience}} there.
</AI>

## Variant C — Social proof-led
<AI block="variant-c" tone="{{tone}}">
Facebook ad primary text (300-500 chars) for {{product}}: open with a believable customer-style result statement (generic, no invented named testimonials), then present {{offer}} for {{audience}}.
</AI>

<AI block="headlines" tone="{{tone}}">
One ad headline (under 40 chars) per variant, matching each angle.
</AI>
```

---

### 15. LinkedIn Sponsored Content — `linkedin-sponsored`

**Description:** B2B ad copy that reads like a native insight post, not an ad.

**Variables:** `product`, `audience`, `insight`, `cta_goal`, `tone`

```markdown
<AI block="hook" tone="{{tone}}">
First line of LinkedIn sponsored ad (under 60 chars): an insight about {{audience}}'s industry that feels native, not promotional. Based on: {{insight}}.
</AI>

<AI block="body" tone="{{tone}}">
Ad body (3-5 short lines): extend {{insight}} into why it matters, then name {{product}} as the tool that addresses it. No buzzword stacking.
</AI>

<AI block="cta" tone="{{tone}}">
CTA line (under 20 chars) + 10-character button label for: {{cta_goal}}.
</AI>
```

---

## SEO (3)

### 16. Meta Description — `meta-description`

**Description:** Three meta description variants at 140-160 characters with keyword placement and a CTA.

**Variables:** `page_topic`, `primary_keyword`, `audience`, `tone`, `cta_goal`

```markdown
<AI block="meta-1" tone="{{tone}}">
Meta description (140-160 characters) for a page about {{page_topic}}. Include the keyword "{{primary_keyword}}" in the first 80 characters. End with a CTA tied to: {{cta_goal}}. Audience: {{audience}}.
</AI>

<AI block="meta-2" tone="{{tone}}">
Alternative meta description (140-160 characters) for the same page — benefit-led, keyword "{{primary_keyword}}" present, different angle from variant 1.
</AI>

<AI block="meta-3" tone="{{tone}}">
Third variant (140-160 characters) — question or curiosity angle, keyword present, no CTA.
</AI>
```

---

### 17. Title Tags — `title-tags`

**Description:** Five title tag options at 50-60 characters, keyword-first, with brand slot.

**Variables:** `page_topic`, `primary_keyword`, `brand_name`, `tone`

```markdown
<AI block="titles" tone="{{tone}}">
Generate 5 title tags for a page about {{page_topic}}. Each: 50-60 characters, keyword "{{primary_keyword}}" near the start, distinct angle (benefit, list, how-to, comparison, curiosity). Append " | {{brand_name}}" to each. Number them 1-5.
</AI>
```

---

### 18. Product Description — `product-description`

**Description:** SEO-aware product copy: lead paragraph, feature-to-benefit bullets, and closing line.

**Variables:** `product`, `features` (comma-separated), `audience`, `tone`, `differentiator`

```markdown
<AI block="lead" tone="{{tone}}">
Opening product description paragraph (40-70 words) for {{product}}. Lead with the differentiator: {{differentiator}}. Weave in the top feature naturally for readers and search.
</AI>

<AI block="benefits" tone="{{tone}}">
Convert these features into benefit bullets for {{audience}}: {{features}}. Each bullet: bold feature name + one sentence on what it means for the user. No feature left unexplained.
</AI>

<AI block="close" tone="{{tone}}">
Closing line (under 25 words) that states who {{product}} is for and what to do next.
</AI>
```

---

## Sales (3)

### 19. Cold Outreach — `cold-outreach`

**Description:** 3-4 sentence cold email built on a specific trigger — no generic praise, no walls of text.

**Variables:** `prospect_company`, `prospect_name`, `trigger` (recent news, role change, post, tech stack), `product`, `outcome`, `tone`, `cta_goal`

```markdown
Subject: <AI block="subject" tone="{{tone}}">
Cold email subject line (under 45 chars) referencing the trigger: {{trigger}} — for {{prospect_company}}. Specific, not spammy.
</AI>

<AI block="body" tone="{{tone}}">
Cold email body (60-100 words) to {{prospect_name}} at {{prospect_company}}. Open with the specific trigger: {{trigger}} (1 sentence, no flattery). Bridge to why it matters: the outcome {{outcome}}. Mention {{product}} in one line only. Close with a low-friction CTA: {{cta_goal}}. Total under 100 words.
</AI>
```

---

### 20. Sales Follow-up — `sales-followup`

**Description:** Short bump that adds value instead of "just checking in."

**Variables:** `context` (what was discussed / sent before), `product`, `value_add` (article, case, tip, data point), `tone`, `cta_goal`

```markdown
Subject: <AI block="subject" tone="{{tone}}">
Follow-up subject line (under 40 chars) referencing the prior conversation: {{context}}. No "re:" unless threading.
</AI>

<AI block="body" tone="{{tone}}">
Follow-up email (40-80 words). Do NOT say "just checking in." Instead deliver one piece of value related to: {{value_add}}, tied back to {{context}}. One CTA: {{cta_goal}}.
</AI>
```

---

### 21. Proposal Intro — `proposal-intro`

**Description:** First page of a proposal — situational awareness, agreed goal, and what the document contains.

**Variables:** `client`, `situation` (their current state), `goal` (agreed objective), `scope`, `tone`

```markdown
<AI block="opener" tone="{{tone}}">
Proposal opening (60-100 words) for {{client}}. Acknowledge their situation: {{situation}}. Frame the objective as: {{goal}}. Confident, partner-tone, no sales superlatives.
</AI>

<AI block="scope-summary" tone="{{tone}}">
"What this proposal covers" paragraph (40-60 words) summarizing scope: {{scope}} — in plain language, three to four lines max.
</AI>
```

---

## Ingestion Checklist

- [ ] All 21 templates validated against Zod variable schemas (Sprint 1, `packages/server`)
- [ ] Golden test set (§2.4 of design doc) updated: one generation per template category with length + placeholder-leakage checks
- [ ] Slugs loaded into seed migration (`templates.seed.ts`)
- [ ] Gallery copy reviewed against `docs/marketing/` landing page copy (Dec 1 deliverable)

**Open items:**
- Template pricing/tier gating (Free vs Pro) — pending CEO pricing decision
- `aiConfig` per template (model tier, temperature, maxTokens) — recommended defaults: quality tier for blog/email/sales, fast tier for social/seo/ads

---

**End of Document**
