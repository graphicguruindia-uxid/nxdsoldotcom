# 20 Seed Templates — AI Content Templates MVP

**Owner:** CMO (marketing-owned template library)
**Target:** MVP launch (Sprint 1 deliverable)
**Format:** Hybrid syntax (static text + `<AI>` blocks) per CTO architecture
**Engine Spec:** `bodyTemplate` (String), `variables` (Zod JSON), `aiConfig` (JSON)

---

## Template Structure (Per the Architecture)

Each template includes:
1. `name` — Human-readable title
2. `slug` — URL-friendly identifier
3. `category` — One of: Blog, Social, Email, Ads, SEO, Sales
4. `variables` — Zod schema (field name, type, description, required)
5. `aiConfig` — Model tier, temperature, max tokens
6. `bodyTemplate` — The hybrid markdown (static + `<AI>` blocks)

---

## CATEGORY: BLOG/CONTENT (4 Templates)

---

### Template 1: Blog Post Outline

| Field | Value |
|-------|-------|
| name | Blog Post Outline |
| slug | blog-post-outline |
| category | Blog |
| variables | `{ topic: string (required), audience: string (required), angle: string (required), key_points: string (optional), estimated_length: string (optional, default: "1500 words") }` |
| aiConfig | `{ model: "quality", temperature: 0.7, maxTokens: 2000 }` |

**bodyTemplate:**
```markdown
# {{topic}}

<AI block="hook" tone="engaging" audience="{{audience}}">
Write a compelling 2-sentence hook/intro for a blog post about {{topic}}. 
Angle: {{angle}}. Target audience: {{audience}}.
Hook should: 1) Grab attention in 5 words, 2) Promise value, 3) Make them keep reading.
</AI>

## Table of Contents
<AI block="toc" tone="informative" audience="{{audience}}">
Generate 4-6 H2 section headings for a blog post about {{topic}}.
Angle: {{angle}}. Key points to cover: {{key_points}}.
Headings should be: Actionable, curious, benefit-driven. Number each section.
Estimated post length: {{estimated_length}}.
</AI>

## Key Takeaways
<AI block="takeaways" tone="clear" audience="{{audience}}">
Write 3-5 bullet-point takeaways for a blog post about {{topic}}.
These should be the most shareable, tweetable lines from the post.
Audience: {{audience}}.
</AI>

## CTA
<AI block="cta" tone="gentle" audience="{{audience}}">
Write a soft closing CTA for this blog post about {{topic}}.
Suggest: Newsletter signup, related resource, or next step.
Audience: {{audience}}.
</AI>
```

---

### Template 2: Intro Generator

| Field | Value |
|-------|-------|
| name | Intro Generator |
| slug | intro-generator |
| category | Blog |
| variables | `{ topic: string (required), audience: string (required), tone: string (enum: professional/conversational/authority/casual), hook_style: string (enum: question/statement/stat/story) }` |
| aiConfig | `{ model: "quality", temperature: 0.8, maxTokens: 500 }` |

**bodyTemplate:**
```markdown
<AI block="intro" tone="{{tone}}" audience="{{audience}}">
Write a {{hook_style}} opening paragraph for an article about {{topic}}.

Hook style: {{hook_style}}
- If question: Start with a provocative question the audience asks themselves
- If statement: Lead with a bold, counterintuitive claim
- If stat: Open with a surprising statistic related to {{topic}}
- If story: Start with a 2-sentence scenario the audience recognizes

Follow with 2-3 sentences that:
1) Establish why this matters to {{audience}}
2) Promise the value they'll get from reading
3) Create curiosity to keep scrolling

Tone: {{tone}}.
Keep it under 150 words.
</AI>
```

---

### Template 3: Conclusion + CTA Writer

| Field | Value |
|-------|-------|
| name | Conclusion + CTA Writer |
| slug | conclusion-cta-writer |
| category | Blog |
| variables | `{ topic: string (required), audience: string (required), article_summary: string (required), cta_goal: string (required), cta_style: string (enum: gentle/strong/direct) }` |
| aiConfig | `{ model: "quality", temperature: 0.6, maxTokens: 600 }` |

**bodyTemplate:**
```markdown
<AI block="summary" tone="encouraging" audience="{{audience}}">
Write a 3-sentence conclusion for an article about {{topic}}.
Summary of what was covered: {{article_summary}}.
Audience: {{audience}}.
The conclusion should: Recap the key insight, reframe the problem as solvable, transition to the CTA.
</AI>

---

<AI block="cta" style="{{cta_style}}" audience="{{audience}}">
Write a CTA section based on this goal: {{cta_goal}}.

Style: {{cta_style}}
- Gentle: Suggest without pressure ("If this helped...")
- Strong: Direct action ("Start today")
- Direct: Single clear step with no alternatives

Include:
1) A benefit-driven headline (H2)
2) 2-3 sentences explaining what happens next
3) The action step
Audience: {{audience}}.
</AI>
```

---

### Template 4: Listicle Builder

| Field | Value |
|-------|-------|
| name | Listicle Builder |
| slug | listicle-builder |
| category | Blog |
| variables | `{ topic: string (required), audience: string (required), number_of_items: number (default: 7), tone: string (enum: professional/conversational/authoritative/witty), format: string (enum: tips/tools/practices/mistakes/trends) }` |
| aiConfig | `{ model: "quality", temperature: 0.7, maxTokens: 3000 }` |

**bodyTemplate:**
```markdown
# {{number_of_items}} {{format}} for {{topic}}

<AI block="intro" tone="{{tone}}" audience="{{audience}}">
Write an engaging intro (100-150 words) for a listicle about {{topic}}.
Audience: {{audience}}. Tone: {{tone}}.
Intro should: 1) Acknowledge the pain point, 2) Promise value, 3) Set up the list.
</AI>

<AI block="items" tone="{{tone}}" audience="{{audience}}">
Generate {{number_of_items}} {{format}} for {{topic}}.

For each item, write:
- **{{number}}. [Title]:** One sentence hook
- 2-3 paragraphs explaining why, how, and the benefit
- One concrete example or action step

Items should be: Ordered from most important to least, specific (not generic), actionable.
Audience: {{audience}}. Tone: {{tone}}.
</AI>

<AI block="conclusion" tone="{{tone}}" audience="{{audience}}">
Write a brief conclusion (80-100 words) wrapping up the {{number_of_items}} {{format}}.
Key message: Start with the ones you can implement today.
Audience: {{audience}}.
</AI>
```

---

## CATEGORY: SOCIAL MEDIA (4 Templates)

---

### Template 5: LinkedIn Authority Post

| Field | Value |
|-------|-------|
| name | LinkedIn Authority Post |
| slug | linkedin-authority-post |
| category | Social |
| variables | `{ topic: string (required), contrarian_angle: string (required), your_credibility: string (required), target_audience: string (required), cta: string (enum: comment/share/visit_link/dm) }` |
| aiConfig | `{ model: "quality", temperature: 0.8, maxTokens: 800 }` |

**bodyTemplate:**
```markdown
<AI block="hook" tone="bold" audience="{{target_audience}}">
Write a single-line LinkedIn hook (under 15 words) about {{topic}}.
Contrarian angle: {{contrarian_angle}}.
The hook should stop the scroll. Use tension, not fluff.
</AI>

<AI block="body" tone="conversational" audience="{{target_audience}}">
Write a LinkedIn post body (150-300 words) following the hook.

Structure:
1) State the contrarian take ({{contrarian_angle}})
2) Back it up with your credibility ({{your_credibility}})
3) Explain why the common approach is wrong
4) Give 2-3 specific takeaways
5) End with an open question (not a CTA)

Format: Short paragraphs (1-2 lines), line breaks between ideas.
No hashtags. No emojis. Professional but conversational.
Audience: {{target_audience}}.
</AI>
```

---

### Template 6: Twitter/X Thread

| Field | Value |
|-------|-------|
| name | Twitter/X Thread |
| slug | twitter-thread |
| category | Social |
| variables | `{ topic: string (required), insight: string (required), audience: string (required), num_tweets: number (default: 7), goal: string (enum: educate/entertain/convert/engage) }` |
| aiConfig | `{ model: "quality", temperature: 0.8, maxTokens: 1200 }` |

**bodyTemplate:**
```markdown
<AI block="tweet1" tone="punchy" audience="{{audience}}">
Write the hook tweet (under 280 chars) for a thread about {{topic}}.
Insight: {{insight}}.
Must: Start with a pattern-breaking opening, promise value, end with "🧵".
</AI>

<AI block="tweets" tone="punchy" audience="{{audience}}">
Write {{num_tweets}} body tweets (2 through {{num_tweets}}).

Each tweet: Under 260 chars. One idea per tweet.
Structure:
- Tweet 2: Problem/context
- Tweet 3-{{num_tweets - 2}}: Key points (one per tweet)
- Tweet {{num_tweets}}: TL;DR summary + CTA

Goal: {{goal}}.
Audience: {{audience}}.
</AI>
```

---

### Template 7: Instagram Caption

| Field | Value |
|-------|-------|
| name | Instagram Caption |
| slug | instagram-caption |
| category | Social |
| variables | `{ brand: string (required), product_or_service: string (required), vibe: string (required), target_audience: string (required), key_message: string (required), include_cta: boolean (default: true), hashtags_count: number (default: 10) }` |
| aiConfig | `{ model: "quality", temperature: 0.9, maxTokens: 600 }` |

**bodyTemplate:**
```markdown
<AI block="caption" tone="{{vibe}}" audience="{{target_audience}}">
Write an Instagram caption for {{brand}} about {{product_or_service}}.

Vibe: {{vibe}}
Key message: {{key_message}}
Audience: {{target_audience}}

Structure:
1) Hook line (first line before "...more")
2) 2-3 short paragraphs with value/story
3) CTA (if {{include_cta}})
4) {{hashtags_count}} relevant hashtags (mix of niche + broad)

Keep it visual, conversational, not salesy.
</AI>
```

---

### Template 8: Facebook Ad Copy

| Field | Value |
|-------|-------|
| name | Facebook Ad Copy |
| slug | facebook-ad-copy |
| category | Social |
| variables | `{ product_or_service: string (required), target_audience: string (required), primary_benefit: string (required), pain_point: string (required), offer: string (optional), ad_format: string (enum: image/video/carousel) }` |
| aiConfig | `{ model: "quality", temperature: 0.7, maxTokens: 600 }` |

**bodyTemplate:**
```markdown
<AI block="headline" tone="direct" audience="{{target_audience}}">
Write a Facebook ad headline (under 40 chars) for {{product_or_service}}.
Primary benefit: {{primary_benefit}}. Audience: {{target_audience}}.
Must be: Benefit-driven, curiosity-inducing, under 40 characters.
</AI>

<AI block="primary_text" tone="conversational" audience="{{target_audience}}">
Write Facebook ad primary text (125-250 characters) for {{product_or_service}}.

Structure:
1) Call out the audience/pain point: {{pain_point}}
2) Present the benefit: {{primary_benefit}}
3) Social proof or urgency
4) CTA

Audience: {{target_audience}}. Offer: {{offer}}.
Ad format: {{ad_format}}.
</AI>
```

---

## CATEGORY: EMAIL (4 Templates)

---

### Template 9: Welcome Email Sequence

| Field | Value |
|-------|-------|
| name | Welcome Email Sequence |
| slug | welcome-email-sequence |
| category | Email |
| variables | `{ brand_name: string (required), product_or_service: string (required), audience: string (required), brand_voice: string (required), key_benefit: string (required), signup_trigger: string (required), num_emails: number (default: 3) }` |
| aiConfig | `{ model: "quality", temperature: 0.7, maxTokens: 1500 }` |

**bodyTemplate:**
```markdown
<AI block="emails" tone="{{brand_voice}}" audience="{{audience}}">
Write a {{num_emails}}-email welcome sequence for {{brand_name}}.

Product: {{product_or_service}}
Audience: {{audience}}
Brand voice: {{brand_voice}}
How they signed up: {{signup_trigger}}
Key benefit: {{key_benefit}}

Email 1 (Immediate): "Welcome! Here's what happens next."
- Subject line
- Quick welcome, set expectations
- What they get now

Email 2 (Day 2): "The story behind {{brand_name}}"
- Subject line
- Origin story or why this matters
- One quick win/tutorial

Email 3 (Day 5): "Here's how {{audience}} gets results"
- Subject line
- Case study/example
- Clear next step

Each email: Under 200 words. One clear action. Conversational, not corporate.
</AI>
```

---

### Template 10: Nurture Email

| Field | Value |
|-------|-------|
| name | Nurture Email |
| slug | nurture-email |
| category | Email |
| variables | `{ brand_name: string (required), topic: string (required), audience: string (required), brand_voice: string (required), value_proposition: string (required), cta_goal: string (required) }` |
| aiConfig | `{ model: "quality", temperature: 0.7, maxTokens: 800 }` |

**bodyTemplate:**
```markdown
<AI block="email" tone="{{brand_voice}}" audience="{{audience}}">
Write a nurture email for {{brand_name}}.

Subject line (pre-header + main): Under 50 chars, curiosity-driven, not clickbait.

Body (150-250 words):
1) Hook: Relatable scenario or insight about {{topic}}
2) Value: 2-3 actionable tips or perspectives
3) Soft pivot: How {{brand_name}} solves this at scale
4) CTA: {{cta_goal}} — gentle, no pressure

Audience: {{audience}}.
Brand voice: {{brand_voice}}.
Value prop: {{value_proposition}}.

Key: Give value first. Sell second. Always.
</AI>
```

---

### Template 11: Promo/Discount Email

| Field | Value |
|-------|-------|
| name | Promo/Discount Email |
| slug | promo-email |
| category | Email |
| variables | `{ brand_name: string (required), offer: string (required), audience: string (required), deadline: string (optional), brand_voice: string (required), product_benefit: string (required) }` |
| aiConfig | `{ model: "quality", temperature: 0.6, maxTokens: 600 }` |

**bodyTemplate:**
```markdown
<AI block="email" tone="{{brand_voice}}" audience="{{audience}}">
Write a promotional email for {{brand_name}}.

Offer: {{offer}}
Audience: {{audience}}
Deadline: {{deadline}}
Brand voice: {{brand_voice}}
Product benefit: {{product_benefit}}

Structure:
Subject: Benefit-driven, urgency without panic
Preview text: Tease the offer

Body:
1) Hook: Why this offer, for them, right now
2) The offer: Clear, specific, limited
3) Why it matters: {{product_benefit}}
4) Deadline/urgency: {{deadline}}
5) CTA: One button, clear action
6) P.S.: Reiterate value, soft close

Keep it under 150 words. Scannable. No walls of text.
</AI>
```

---

### Template 12: Re-engagement Email

| Field | Value |
|-------|-------|
| name | Re-engagement Email |
| slug | re-engagement-email |
| category | Email |
| variables | `{ brand_name: string (required), audience: string (required), days_inactive: number (default: 30), brand_voice: string (required), what_changed: string (optional), offer: string (optional) }` |
| aiConfig | `{ model: "quality", temperature: 0.7, maxTokens: 500 }` |

**bodyTemplate:**
```markdown
<AI block="email" tone="{{brand_voice}}" audience="{{audience}}">
Write a re-engagement email for {{brand_name}}.

Audience: {{audience}} who hasn't opened an email in {{days_inactive}} days.
Brand voice: {{brand_voice}}.
What's new: {{what_changed}}.
Special offer for returning: {{offer}}.

Structure:
Subject: Nostalgic but not needy ("We miss you" tone, not "Come back! Please!")

Body (under 120 words):
1) Acknowledge the gap without guilt
2) What they missed: 1-2 specific things
3) Why it matters to them now
4) One easy re-engagement step
5) "No?" option — make it easy to unsubscribe if they want

Tone: Warm, no guilt, zero pressure.
</AI>
```

---

## CATEGORY: ADS (3 Templates)

---

### Template 13: Google Search Ad

| Field | Value |
|-------|-------|
| name | Google Search Ad |
| slug | google-search-ad |
| category | Ads |
| variables | `{ product_or_service: string (required), target_keyword: string (required), audience: string (required), primary_benefit: string (required), differentiator: string (required), cta: string (required) }` |
| aiConfig | `{ model: "fast", temperature: 0.5, maxTokens: 400 }` |

**bodyTemplate:**
```markdown
<AI block="headlines" tone="direct" audience="{{audience}}">
Write 5 Google Search ad headlines for {{product_or_service}}.

Each headline: Under 30 characters.
Include: {{target_keyword}}, {{primary_benefit}}.
One should mention the differentiator: {{differentiator}}.
One should include the CTA: {{cta}}.
</AI>

<AI block="descriptions" tone="direct" audience="{{audience}}">
Write 3 Google Search ad descriptions for {{product_or_service}}.

Each description: Under 90 characters.
Include: {{primary_benefit}}, {{differentiator}}.
End with {{cta}}.
</AI>

<AI block="path" tone="direct" audience="{{audience}}">
Suggest 4 URL path prefixes (e.g., /solutions/ai-content) for the ad.
</AI>
```

---

### Template 14: Facebook Ad Variants (A/B Test)

| Field | Value |
|-------|-------|
| name | Facebook Ad Variants |
| slug | facebook-ad-variants |
| category | Ads |
| variables | `{ product_or_service: string (required), audience: string (required), pain_point: string (required), benefit: string (required), variant_a_focus: string (enum: pain/problem/fear), variant_b_focus: string (enum: desire/gain/dream) }` |
| aiConfig | `{ model: "quality", temperature: 0.7, maxTokens: 800 }` |

**bodyTemplate:**
```markdown
<AI block="variant_a" tone="direct" audience="{{audience}}">
Write Facebook ad copy (Variant A) focused on {{variant_a_focus}}.

Product: {{product_or_service}}
Audience: {{audience}}
Pain point: {{pain_point}}

Primary text: 100-150 characters
Headline: Under 40 characters
CTA: "Learn More"

Speak to the pain. Make them feel it. Then offer relief.
</AI>

<AI block="variant_b" tone="inspiring" audience="{{audience}}">
Write Facebook ad copy (Variant B) focused on {{variant_b_focus}}.

Product: {{product_or_service}}
Audience: {{audience}}
Benefit: {{benefit}}

Primary text: 100-150 characters
Headline: Under 40 characters
CTA: "Learn More"

Show the outcome. Make them want it. Then make it easy.
</AI>
```

---

### Template 15: LinkedIn Sponsored Content

| Field | Value |
|-------|-------|
| name | LinkedIn Sponsored Content |
| slug | linkedin-sponsored |
| category | Ads |
| variables | `{ company: string (required), product_or_service: string (required), target_audience: string (required), target_title: string (required), value_proposition: string (required), social_proof: string (optional), cta: string (enum: learn_more/register/download/request_demo) }` |
| aiConfig | `{ model: "quality", temperature: 0.6, maxTokens: 800 }` |

**bodyTemplate:**
```markdown
<AI block="headline" tone="professional" audience="{{target_audience}}">
Write a LinkedIn sponsored post headline (under 60 chars).
Company: {{company}}. Product: {{product_or_service}}.
Audience: {{target_audience}} (title: {{target_title}}).
Value: {{value_proposition}}.
Professional, benefit-driven, not salesy.
</AI>

<AI block="body" tone="professional" audience="{{target_audience}}">
Write LinkedIn sponsored post body (150-250 words).

Structure:
1) Start with a challenge {{target_title}}s face
2) Introduce {{company}}'s solution
3) Social proof: {{social_proof}}
4) Value: {{value_proposition}}
5) CTA: {{cta}}

Tone: Professional, credible, B2B-appropriate.
Audience: {{target_audience}}.
</AI>
```

---

## CATEGORY: SEO (3 Templates)

---

### Template 16: Meta Descriptions

| Field | Value |
|-------|-------|
| name | Meta Descriptions |
| slug | meta-descriptions |
| category | SEO |
| variables | `{ page_title: string (required), target_keyword: string (required), audience: string (required), page_purpose: string (required), brand: string (optional) }` |
| aiConfig | `{ model: "fast", temperature: 0.4, maxTokens: 300 }` |

**bodyTemplate:**
```markdown
<AI block="descriptions" tone="informative" audience="{{audience}}">
Write 3 meta descriptions for "{{page_title}}".

Target keyword: {{target_keyword}} — must appear in all variants.
Page purpose: {{page_purpose}}
Audience: {{audience}}
Brand: {{brand}}

Each meta description: 150-160 characters (Google limit).
Include: Primary keyword, benefit/CTA, brand mention.
Variations: Different hooks (question, statement, stat).
</AI>
```

---

### Template 17: SEO Title Tags

| Field | Value |
|-------|-------|
| name | SEO Title Tags |
| slug | seo-title-tags |
| category | SEO |
| variables | `{ page_topic: string (required), target_keyword: string (required), brand: string (required), audience: string (required) }` |
| aiConfig | `{ model: "fast", temperature: 0.4, maxTokens: 200 }` |

**bodyTemplate:**
```markdown
<AI block="titles" tone="professional" audience="{{audience}}">
Write 5 SEO title tag variations for a page about {{page_topic}}.

Target keyword: {{target_keyword}} — must appear in every title.
Brand: {{brand}}.
Audience: {{audience}}.

Each title: 50-60 characters (Google truncates at ~60).
Format: [Primary Keyword] | [Benefit/Modifier] - {{brand}}

Variations should test:
1) Keyword-first
2) Benefit-first
3) Question format
4) Number/list format
5) Year/trend format
</AI>
```

---

### Template 18: Product Description (E-commerce)

| Field | Value |
|-------|-------|
| name | Product Description |
| slug | product-description |
| category | SEO |
| variables | `{ product_name: string (required), product_category: string (required), target_keyword: string (required), features: string (required), benefits: string (required), audience: string (required), brand: string (optional), tone: string (enum: professional/friendly/technical/premium) }` |
| aiConfig | `{ model: "quality", temperature: 0.6, maxTokens: 1000 }` |

**bodyTemplate:**
```markdown
<AI block="description" tone="{{tone}}" audience="{{audience}}">
Write a product description for {{product_name}} ({{product_category}}).

Brand: {{brand}}
Target keyword: {{target_keyword}} — include naturally (2-3 times)
Features: {{features}}
Benefits: {{benefits}}
Audience: {{audience}}
Tone: {{tone}}

Structure:
1) Hook paragraph (2-3 sentences, emotional + rational appeal)
2) Key features as bullet points (3-5, benefit-focused, not spec-dump)
3) Use case scenario (1 paragraph, relatable scenario)
4) CTA (soft, benefit-driven)

SEO optimized but reads naturally. No keyword stuffing.
</AI>
```

---

## CATEGORY: SALES (2 Templates)

---

### Template 19: Cold Outreach Email

| Field | Value |
|-------|-------|
| name | Cold Outreach Email |
| slug | cold-outreach |
| category | Sales |
| variables | `{ your_company: string (required), your_product: string (required), prospect_company: string (required), prospect_name: string (required), prospect_role: string (required), pain_point: string (required), your_solution: string (required), social_proof: string (optional), cta: string (required) }` |
| aiConfig | `{ model: "quality", temperature: 0.5, maxTokens: 500 }` |

**bodyTemplate:**
```markdown
<AI block="email" tone="professional" audience="{{prospect_role}}">
Write a cold outreach email.

Sender: You from {{your_company}}
Recipient: {{prospect_name}}, {{prospect_role}} at {{prospect_company}}

Subject: Under 50 chars. Specific to them. Not generic.

Body (under 120 words):
1) Personal opener (1 line, relevant to their company/role)
2) The problem: {{pain_point}}
3) Your solution: {{your_solution}} (1 line, benefit-focused)
4) Social proof: {{social_proof}}
5) CTA: {{cta}} (low-friction, 10-minute call or reply)

Tone: Direct but not pushy. Confident but not arrogant.
No fluff. No "I hope you're doing well."
</AI>
```

---

### Template 20: Sales Follow-up Email

| Field | Value |
|-------|-------|
| name | Sales Follow-up Email |
| slug | sales-followup |
| category | Sales |
| variables | `{ your_company: string (required), prospect_name: string (required), context: string (required), value_to_add: string (required), cta: string (enum: schedule_call/send_info/no_response_ok) }` |
| aiConfig | `{ model: "quality", temperature: 0.5, maxTokens: 400 }` |

**bodyTemplate:**
```markdown
<AI block="email" tone="professional" audience="business prospects">
Write a sales follow-up email.

Recipient: {{prospect_name}}
Context: {{context}} (what happened in the last interaction)
Value to add: {{value_to_add}} (new insight, resource, or case study)
CTA: {{cta}}

Subject: Reference the previous conversation naturally.

Body (under 80 words):
1) Reference last touch (brief, not "just checking in")
2) Add value: {{value_to_add}}
3) CTA: {{cta}} — make it frictionless
4) P.S.: Optional extra value or humor

Tone: Helpful, persistent, not annoying. Every follow-up must add something new.
</AI>
```

---

## Template Summary

| # | Template | Category | Variables | Est. Tokens |
|---|----------|----------|-----------|-------------|
| 1 | Blog Post Outline | Blog | 5 | 2000 |
| 2 | Intro Generator | Blog | 4 | 500 |
| 3 | Conclusion + CTA | Blog | 5 | 600 |
| 4 | Listicle Builder | Blog | 5 | 3000 |
| 5 | LinkedIn Authority Post | Social | 5 | 800 |
| 6 | Twitter/X Thread | Social | 5 | 1200 |
| 7 | Instagram Caption | Social | 7 | 600 |
| 8 | Facebook Ad Copy | Social | 6 | 600 |
| 9 | Welcome Email Sequence | Email | 7 | 1500 |
| 10 | Nurture Email | Email | 6 | 800 |
| 11 | Promo/Discount Email | Email | 6 | 600 |
| 12 | Re-engagement Email | Email | 6 | 500 |
| 13 | Google Search Ad | Ads | 6 | 400 |
| 14 | Facebook Ad Variants | Ads | 6 | 800 |
| 15 | LinkedIn Sponsored Content | Ads | 7 | 800 |
| 16 | Meta Descriptions | SEO | 5 | 300 |
| 17 | SEO Title Tags | SEO | 4 | 200 |
| 18 | Product Description | SEO | 8 | 1000 |
| 19 | Cold Outreach Email | Sales | 9 | 500 |
| 20 | Sales Follow-up Email | Sales | 5 | 400 |

**Total estimated max tokens per generation:** ~14,900
**Average max tokens:** ~745/template
**Free tier (100 gens/mo):** ~74,500 avg tokens/month = ~$0.75/mo (GPT-4o-mini)
**Pro tier (unlimited):** Scales with usage, capped by daily budget

---

## Next Steps

1. **Review & approve** these 20 templates (CMO)
2. **CTO converts to JSON format** for database import (Prisma `Template` model)
3. **Create 2 more per week** (Post-MVP additions from beta feedback)
4. **Golden test set:** 20 prompts with expected outputs (CI gate per architecture spec)
5. **Template quality metrics:** Relevance score, tone match, placeholder leakage detection

---

*Created: 2026-11-20 by CMO per NEX-16 deliverable*