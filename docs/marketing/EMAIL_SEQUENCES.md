# EMAIL SEQUENCES — AI Content Templates

**Version:** 1.0
**Date:** 2026-11-20
**Author:** CMO (059aecb9-3c6b-4456-8b34-5adb24e581a5)
**Product:** AI Content Templates (NEX-3)
**Status:** Ready for implementation
**Trigger points:** Based on Auth.js + tRPC events (signup, first_generation, upgrade_eligible, trial_ending, churn_risk)

---

## Sequence Map

| Sequence | Trigger | Emails | Primary Goal |
|----------|---------|--------|--------------|
| Welcome | User signs up (email verified) | 3 | Activate: first generation within 24h |
| Onboarding | First generation completed | 4 | Habit: 3+ generations in week 1 |
| Upgrade Nudge | Free user hits 80% monthly cap | 3 | Convert: Free → Pro |
| Trial Ending | Pro user on monthly, day 25 | 2 | Retain: prevent involuntary churn |
| Win-back | 30 days inactive | 3 | Reactivate: dormant → active |

---

## 1. Welcome Sequence

**Trigger:** `user.created` + `email_verified = true`
**Cadence:** Day 0, Day 1, Day 3
**Success metric:** First generation within 24h of signup

---

### Email 1 — Immediate (Day 0)

**Subject:** Welcome to AI Content Templates — your first 100 generations are free

**Preview text:** 21 templates. 4-minute drafts. No credit card.

```markdown
Hi {{first_name}},

You're in. 🎉

AI Content Templates gives you 21 battle-tested structures — blog posts, LinkedIn threads, cold emails, ad copy, SEO meta, and more. You fill in your specifics (audience, tone, key points), hit Generate, and get a finished draft in minutes.

**What you get on Free:**
- 100 generations / month
- All 21 launch templates
- Markdown & HTML export
- Block-level regeneration

**Your first step:** Pick a template and generate something real.
→ [Browse templates]({{app_url}}/templates)

Questions? Reply to this email — I read every one.

— Vinod, CMO @ NXDSOL
```

**CTA:** Browse templates → `{{app_url}}/templates`

---

### Email 2 — Day 1 (Value-first)

**Subject:** One template that saves an hour every week

**Preview text:** The LinkedIn Post template — hook, body, CTA in 30 seconds.

```markdown
Hi {{first_name}},

Most people start with the **LinkedIn Post** template.

Why? Because it forces the structure that actually works:
- A scroll-stopping hook (under 12 words)
- A body that builds one insight in 5–8 short lines
- A closing question that earns replies

**Try it now:**
1. Open the template → [LinkedIn Post]({{app_url}}/templates/linkedin-post)
2. Fill in: your topic, audience, one key insight
3. Click Generate → watch it stream in 15 seconds
4. Regenerate the hook if it's not sharp. The rest stays intact.

That's it. One post, under a minute.

— Vinod
```

**CTA:** Try the LinkedIn Post template → `{{app_url}}/templates/linkedin-post`

---

### Email 3 — Day 3 (Social proof + next step)

**Subject:** How [Company] cut content time by 70%

**Preview text:** Real workflow, real results. (Beta user story)

```markdown
Hi {{first_name}},

One of our beta users — a solo founder running a B2B SaaS — used to spend 3–4 hours a week on LinkedIn content.

Now:
- Monday: 10 minutes filling 3 LinkedIn Post templates
- Tuesday: 10 minutes on a Twitter thread
- Wednesday: 10 minutes on a cold outreach sequence
- **Total: 30 minutes for a week of content**

The templates didn't replace her voice — they gave it a skeleton so she could stop staring at the cursor.

**Ready for your first win?**
You have 100 free generations this month. Pick any template:
→ [See all 21]({{app_url}}/templates)

P.S. If you hit a snag, reply here. I'll unblock you personally.
```

**CTA:** See all 21 templates → `{{app_url}}/templates`

---

## 2. Onboarding Sequence

**Trigger:** `generation.completed` (first successful generation)
**Cadence:** Immediate, Day 2, Day 5, Day 7
**Success metric:** 3+ generations in first 7 days

---

### Email 1 — Immediate (Generation complete)

**Subject:** Your first draft is ready — here's what to do next

**Preview text:** Regenerate a block. Export. Save to library.

```markdown
Hi {{first_name}},

You just generated **"{{generation_title}}"** — nice.

**Three things you can do right now:**

1. **Regenerate one block** — The intro feels off? Click the refresh icon on that section. The rest of your draft stays exactly as it is.
2. **Export** — Markdown for your CMS, HTML for a landing page, PDF for a proposal. (PDF/DOCX on Pro.)
3. **Save to your library** — It's there forever. Reuse the inputs for next week's post.

**Pro tip:** Tell the engine your brand voice once (Settings → Brand Voice). Every future generation writes in your register.

[Open your draft]({{app_url}}/outputs/{{generation_id}})

— The NXDSOL team
```

**CTA:** Open your draft → `{{app_url}}/outputs/{{generation_id}}`

---

### Email 2 — Day 2 (Feature discovery)

**Subject:** The feature that saves the most time: block regeneration

**Preview text:** Fix the conclusion. Keep the intro. Never rewrite the whole thing.

```markdown
Hi {{first_name}},

The #1 thing beta users wish they'd known on day one:

**You don't have to regenerate the whole document.**

Each AI block (intro, body section, conclusion, CTA) is independently regenerable. Click the circular arrow on any section → new version in seconds. Your other blocks? Untouched.

**When this matters:**
- Blog post: body is great, conclusion is weak → regenerate conclusion only
- Cold email: hook works, value prop needs sharpening → regenerate value prop block
- LinkedIn: body is solid, CTA falls flat → regenerate CTA block

Try it on your last draft:
→ [Edit {{generation_title}}]({{app_url}}/outputs/{{generation_id}}/edit)

— Vinod
```

**CTA:** Edit your last draft → `{{app_url}}/outputs/{{generation_id}}/edit`

---

### Email 3 — Day 5 (Template breadth)

**Subject:** 5 templates you haven't tried yet

**Preview text:** Cold outreach. Listicle builder. Meta descriptions. More.

```markdown
Hi {{first_name}},

You've used **{{used_template_count}}** of 21 templates. Here are five high-ROI ones to try this week:

| Template | Best for | Time saved |
|----------|----------|------------|
| **Cold Outreach** | Sales, partnerships, hiring | 20 min → 2 min |
| **Listicle Builder** | SEO content, lead magnets | 2 hr → 15 min |
| **Meta Descriptions** | Every new page you publish | 10 min → 30 sec |
| **Welcome Sequence** | New subscriber onboarding | 45 min → 5 min |
| **Proposal Intro** | Client pitches, RFPs | 30 min → 3 min |

All free on your plan. No limit on template switching.

[Browse by category]({{app_url}}/templates?category=all)

— Vinod
```

**CTA:** Browse by category → `{{app_url}}/templates?category=all`

---

### Email 4 — Day 7 (Habit checkpoint)

**Subject:** One week in — how's the workflow?

**Preview text:** 3+ generations this week? You're building the habit.

```markdown
Hi {{first_name}},

One week since your first generation. Quick check:

- **{{generation_count_7d}}** generations this week
- **{{template_count_7d}}** different templates tried
- **{{minutes_saved_est}}** minutes saved (estimated)

**If you're at 3+ generations:** You're building the habit. The blank page is officially optional.

**If you're at 1–2:** Pick one recurring content task this week (weekly LinkedIn, monthly newsletter, quarterly proposal) and template it. The compound effect is real.

**If you're stuck:** Reply to this email. I'll help you map your content calendar to the right templates.

[See your usage dashboard]({{app_url}}/dashboard/usage)

— Vinod
```

**CTA:** See your usage dashboard → `{{app_url}}/dashboard/usage`

---

## 3. Upgrade Nudge Sequence

**Trigger:** Free user hits 80% of monthly generation cap (80/100)
**Cadence:** Immediate, Day 2, Day 5 (if not upgraded)
**Success metric:** Free → Pro conversion

---

### Email 1 — Immediate (Cap warning)

**Subject:** You've used 80 of 100 free generations this month

**Preview text:** Upgrade to Pro for unlimited — or wait for the reset.

```markdown
Hi {{first_name}},

Heads up: you've used **{{generations_used}}/100** generations this month.

**What happens at 100:**
- You can still view and edit existing outputs
- New generations pause until the 1st of next month
- No data lost, no surprise charges

**Two paths forward:**

| Stay Free | Upgrade to Pro ($29/mo) |
|-----------|------------------------|
| 100 gens/month | Unlimited generations |
| 1 workspace | 3 workspaces |
| Markdown/HTML export | + PDF, DOCX export |
| Basic templates | All templates + brand voice presets |
| | Up to 5 team seats |
| | Block regeneration included |

**Most users upgrade when content becomes a weekly habit, not a monthly experiment.**

[Upgrade to Pro]({{app_url}}/billing/upgrade)

— Vinod
```

**CTA:** Upgrade to Pro → `{{app_url}}/billing/upgrade`

---

### Email 2 — Day 2 (Value framing)

**Subject:** What unlimited actually unlocks

**Preview text:** Not just more generations — team seats, brand voice, PDF export.

```markdown
Hi {{first_name}},

Unlimited generations is the headline. Here's what actually changes your workflow:

**1. Brand voice presets** — Define your tone, vocabulary, do's/don'ts once. Every template — from cold email to listicle — writes in *your* voice. No re-prompting.

**2. Team seats (up to 5)** — Your designer, your VA, your co-founder — all in one workspace. Shared template library. Shared output history. No "can you send me that doc?"

**3. PDF & DOCX export** — Drop a polished proposal in a client's inbox. Ship a PDF lead magnet. No copy-paste formatting cleanup.

**4. 3 workspaces** — Separate client work, personal brand, and internal docs. Clean boundaries, shared billing.

**The math:** If you save 2 hours/week at your effective hourly rate, Pro pays for itself in day one.

[See the full comparison]({{app_url}}/pricing)

— Vinod
```

**CTA:** See the full comparison → `{{app_url}}/pricing`

---

### Email 3 — Day 5 (Urgency + social proof)

**Subject:** 3 days until reset — or upgrade today and keep going

**Preview text:** "[Company] upgraded and shipped 40% more content in week one."

```markdown
Hi {{first_name}},

**{{days_until_reset}} days** until your generation counter resets.

One beta user — a 3-person marketing agency — upgraded mid-month. Their first week on Pro:
- 47 generations (vs. 12 the month before)
- 3 client proposals shipped in one afternoon
- Designer and copywriter both in the workspace, zero handoff friction

**They didn't generate more because they had unlimited. They generated more because the friction disappeared.**

[Upgrade now — keep your momentum]({{app_url}}/billing/upgrade)

— Vinod
```

**CTA:** Upgrade now → `{{app_url}}/billing/upgrade`

---

## 4. Trial Ending Sequence (Monthly Pro)

**Trigger:** Pro user on monthly plan, day 25 of billing cycle
**Cadence:** Day 25, Day 28 (day before renewal)
**Success metric:** Prevent involuntary churn (failed payment, expired card)

---

### Email 1 — Day 25 (Heads up)

**Subject:** Your Pro renewal is in 5 days — quick check

**Preview text:** Make sure your payment method is current. No interruption.

```markdown
Hi {{first_name}},

Your Pro plan renews on **{{renewal_date}}** for $29.

**Quick checklist:**
- [ ] Payment method up to date? → [Update billing]({{app_url}}/billing)
- [ ] Still getting value? ({{generations_this_month}} generations this month)
- [ ] Need to add a team seat? ({{current_seats}}/5 used)

If anything's changed, you can adjust your plan anytime:
→ [Manage subscription]({{app_url}}/billing)

No action needed if everything looks good. We'll process the renewal automatically.

— The NXDSOL team
```

**CTA:** Manage subscription → `{{app_url}}/billing`

---

### Email 2 — Day 28 (Final reminder)

**Subject:** Tomorrow: your Pro renewal

**Preview text:** One-click update if anything's changed.

```markdown
Hi {{first_name}},

Tomorrow ({{renewal_date}}) your Pro plan renews at $29/month.

**Current usage this month:** {{generations_this_month}} generations across {{templates_used}} templates.

If your card or details have changed, update them now to avoid any interruption:
→ [Update payment method]({{app_url}}/billing/payment)

If you'd rather pause or downgrade, you can do that here too:
→ [Change plan]({{app_url}}/billing)

We're here if you need anything — just reply.

— The NXDSOL team
```

**CTA:** Update payment method → `{{app_url}}/billing/payment`

---

## 5. Win-back Sequence

**Trigger:** 30 days since last generation (Pro or Free)
**Cadence:** Day 30, Day 45, Day 60
**Success metric:** Reactivation (generation within 7 days of email)

---

### Email 1 — Day 30 (Low pressure)

**Subject:** Been a minute — everything okay?

**Preview text:** No pressure. Just checking in.

```markdown
Hi {{first_name}},

Noticed it's been about a month since your last generation. No guilt trip — just wanted to make sure you're not stuck on something.

**Common reasons people go quiet:**
- "I don't know what to write this week" → [Content calendar templates]({{app_url}}/templates?category=blog)
- "The output needed too much editing" → Try the brand voice preset (Pro) or reply — I'll help tune it
- "Just busy" → Totally fair. Your library and outputs are saved indefinitely.

**If you're ready to ship again:** Pick one template. 4 minutes. You're back.

[Browse templates]({{app_url}}/templates)

— Vinod
```

**CTA:** Browse templates → `{{app_url}}/templates`

---

### Email 2 — Day 45 (New value)

**Subject:** 3 new templates since you left

**Preview text:** Case study builder. Video script outline. Newsletter curator.

```markdown
Hi {{first_name}},

We've added three templates since you were last active:

| Template | Category | Use case |
|----------|----------|----------|
| **Case Study Builder** | Blog | Client success stories that actually convert |
| **Video Script Outline** | Social | 60–90 sec scripts for Reels/Shorts/TikTok |
| **Newsletter Curator** | Email | Weekly digest from your links + commentary |

All available on your current plan ({{current_plan}}).

**If any of these match what you're working on now:** they're waiting.
→ [See what's new]({{app_url}}/templates?sort=newest)

— Vinod
```

**CTA:** See what's new → `{{app_url}}/templates?sort=newest`

---

### Email 3 — Day 60 (Final nudge + easy exit)

**Subject:** Should I keep you on the list?

**Preview text:** One click to stay. One click to unsubscribe. No hard feelings.

```markdown
Hi {{first_name}},

It's been 60 days. I don't want to clutter your inbox if this isn't useful anymore.

**Two options:**

1. **Stay** — You'll only hear from me when we launch genuinely useful things (major template drops, workflow upgrades, pricing changes). ~1 email/month max.
   → [Keep me updated]({{app_url}}/preferences/email?frequency=monthly)

2. **Unsubscribe** — One click. No confirmation page. No "are you sure?" loop.
   → [Unsubscribe]({{unsubscribe_url}})

Either way, your workspace and all your generated content stay exactly where they are. Forever.

— Vinod
```

**CTA (primary):** Keep me updated → `{{app_url}}/preferences/email?frequency=monthly`
**CTA (secondary):** Unsubscribe → `{{unsubscribe_url}}`

---

## Implementation Notes

### Variable Reference
| Variable | Source | Example |
|----------|--------|---------|
| `{{first_name}}` | `User.name` | "Sarah" |
| `{{app_url}}` | Config | "https://app.nxdsol.com" |
| `{{generation_title}}` | `Output.name` | "Q4 LinkedIn Strategy" |
| `{{generation_id}}` | `Output.id` | "clx7k9m..." |
| `{{generation_count_7d}}` | Usage aggregation | "7" |
| `{{template_count_7d}}` | Usage aggregation | "4" |
| `{{minutes_saved_est}}` | Heuristic: `generations * 15` | "105" |
| `{{used_template_count}}` | Distinct `Output.templateId` | "3" |
| `{{generations_used}}` | `UsageLedger` monthly sum | "80" |
| `{{days_until_reset}}` | Date calc | "3" |
| `{{renewal_date}}` | `Subscription.currentPeriodEnd` | "Dec 1, 2026" |
| `{{generations_this_month}}` | `UsageLedger` | "47" |
| `{{templates_used}}` | Distinct templates this month | "8" |
| `{{current_seats}}` | `Workspace.members.count` | "2" |
| `{{current_plan}}` | `Subscription.plan` | "Free" / "Pro" |
| `{{unsubscribe_url}}` | Auth.js + token | "https://app.nxdsol.com/unsub/..." |

### Technical Requirements
- **Email provider:** Transactional (Resend / SendGrid / Postmark) — not marketing list
- **Deliverability:** DKIM, SPF, DMARC configured for `nxdsol.com`
- **Unsubscribe:** One-click, list-unsubscribe header, honor within 24h
- **Tracking:** Open/click tracking optional; primary metric = generation event post-email
- **Segmentation:** All sequences mutually exclusive (user in only one at a time)
- **Suppression:** Do not send Win-back if user upgraded in last 14 days

### A/B Test Candidates
| Sequence | Test | Hypothesis |
|----------|------|------------|
| Welcome 1 | Subject: "Welcome" vs "Your 100 free generations" | Benefit-led opens higher |
| Welcome 2 | CTA: Template-specific vs generic "Browse templates" | Specific intent → higher activation |
| Upgrade 1 | Loss-framed ("Don't lose access") vs gain-framed ("Unlock unlimited") | Loss aversion stronger near cap |
| Win-back 3 | "Should I keep you?" vs "One last email" | Permission-based retains more |

---

## Compliance Checklist

- [ ] CAN-SPAM: Physical address in footer (NXDSOL, Hyderabad, India)
- [ ] GDPR: Lawful basis (legitimate interest for transactional; consent for marketing)
- [ ] List-unsubscribe header on every email
- [ ] One-click unsubscribe honored ≤ 24h
- [ ] No misleading subject lines
- [ ] Clear sender identity: "NXDSOL" / "Vinod @ NXDSOL"
- [ ] Reply-to monitored inbox (not no-reply)

---

**End of Document**