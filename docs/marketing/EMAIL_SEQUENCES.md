# Email Sequences — NXDSOL

**Owner:** CMO  
**Platform:** ConvertKit / Beehiiv (TBD)  
**Goal:** Convert waitlist → beta users → paying customers  
**Segments:** Waitlist, Beta Users, Free Tier, Pro Trial, Customers

---

## Sequence Map

```
┌─────────────┐     ┌──────────────┐     ┌──────────────┐
│   WAITLIST  │ ──► │    BETA      │ ──► │   CUSTOMER   │
│  (7 emails) │     │  (8 emails)  │     │  (ongoing)   │
└─────────────┘     └──────────────┘     └──────────────┘
       │                    │                    │
       ▼                    ▼                    ▼
┌─────────────┐     ┌──────────────┐     ┌──────────────┐
│  FREE TIER  │     │  PRO TRIAL   │     │  EXPANSION   │
│  (5 emails) │     │  (6 emails)  │     │  (quarterly) │
└─────────────┘     └──────────────┘     └──────────────┘
```

---

## 1. WAITLIST SEQUENCE (Pre-Beta)

**Trigger:** Form submit on /beta page  
**Cadence:** 7 emails over 60 days (until beta launch Jan 16)  
**Goal:** Keep warm, build anticipation, encourage referrals

### Email 1 — Immediate: "You're In 🎉"
**Subject:** You're on the list (and here's what happens next)

```
Hi {first_name},

Welcome to the NXDSOL beta waitlist! 🎉

You're one of the first to get early access to AI Content Templates — 
the tool that gives marketing teams structured templates + block-level 
regeneration + brand voice memory.

**What happens next:**
1. Beta launches January 16, 2027
2. You'll get an invite email with your access link
3. First 100 users lock in 50% off for life (₹1,249/mo Pro)

**While you wait:**
• Join our Discord (beta community): [link]
• Follow the journey on LinkedIn: [link]
• Check out our blog: nxdsol.com/insights

**Want to move up the list?**
Share your referral link: {referral_link}
Refer 3 friends → skip to front of line

Questions? Just reply — I read every email.

Vinod
CMO, NXDSOL
```

**UTM:** `utm_source=waitlist&utm_medium=email&utm_campaign=welcome`

---

### Email 2 — Day 2: "How We Built Block Regeneration"
**Subject:** The technical reason your AI outputs feel generic

```
Hi {first_name},

Most AI writing tools work the same way: you prompt, they generate, 
you accept or rewrite. The problem? It's all-or-nothing.

If the intro is perfect but the middle section misses, you either:
• Accept the whole thing and edit manually
• Regenerate and lose the good parts

**We built it differently.**

Block regeneration lets you highlight any section — a paragraph, 
a bullet list, the CTA — and regenerate just that piece. 
The rest stays untouched. Your context, your structure, your brand voice 
all preserved.

It's the feature our CTO (ex-Enterprise AI) said "should have existed 
years ago."

**Watch the 2-min demo:** [Loom link]

See you in beta,
Vinod
```

**UTM:** `utm_source=waitlist&utm_medium=email&utm_campaign=tech-deep-dive`

---

### Email 3 — Day 5: "3 Templates You Can Use Today (No Account)"
**Subject:** Steal these 3 templates (no login required)

```
Hi {first_name},

Beta's still a few weeks out, but you don't have to wait to start 
using structured frameworks.

I've put 3 of our seed templates in a public Notion page — no 
account needed, just duplicate and use:

1. **LinkedIn Authority Post Template** — The "Contrarian Take" 
   framework that consistently hits 1k+ impressions

2. **Blog Post Outline Generator** — From keyword to structured 
   outline with H2s, bullet points, and CTAs in 30 seconds

3. **Cold Email Sequence (5 emails)** — Problem → Agitate → 
   Solution → Proof → Ask. Our highest-converting sales template.

**Get them here:** [Notion link]

(Pro tip: Duplicate to your Notion workspace, fill in your context, 
feed to your favorite AI tool. Same framework, instant structure.)

These are 3 of the 20 templates beta users will get with block 
regeneration built in.

Vinod
```

**UTM:** `utm_source=waitlist&utm_medium=email&utm_campaign=lead-magnet`

---

### Email 4 — Day 10: "Beta User Spotlight #1"
**Subject:** How {AgencyName} 3x'd content output (beta story)

```
Hi {first_name},

Meet Sarah Chen, Content Lead at GrowthAgency (Bangalore).

**Before beta:** 2 writers, 8 blog posts/month, constant revisions
**After 4 weeks beta:** Same 2 writers, 24 blog posts/month, 
first-draft approval rate 80%+

Her secret? The "Case Study Template" + block regeneration.

> "Client wants the results section rewritten? Highlight, regenerate, 
> done. The challenge/solution/results structure stays perfect."

She's one of 20 beta testers. We're adding 10 more in January.

**Want her workflow?** The case study template is in the Notion pack 
from Email 3. Try it with your next client project.

Vinod
```

**UTM:** `utm_source=waitlist&utm_medium=email&utm_campaign=social-proof`

---

### Email 5 — Day 14: "Your Referral Link + How to Skip the Line"
**Subject:** Your referral code: NXD-BETA-{CODE}

```
Hi {first_name},

Your unique referral code: **NXD-BETA-{CODE}**

**Referral rewards:**
• 1 referral → Early beta access (1 week before general)
• 3 referrals → Skip to front of waitlist + NXDSOL sticker pack
• 5 referrals → Free month of Pro (₹2,499 value)
• 10 referrals → Lifetime 50% off + "Founding Beta Tester" badge

**Your link:** {referral_link}

Share it on LinkedIn, Twitter, Slack communities, WhatsApp groups — 
wherever your marketing peers hang out.

Current leaderboard: [link to live board]

Vinod
```

**UTM:** `utm_source=waitlist&utm_medium=email&utm_campaign=referral`

---

### Email 6 — Jan 10: "Beta Starts in 6 Days — Here's What's New"
**Subject:** 6 days until beta 🚀

```
Hi {first_name},

Beta launches January 16. Here's what's been added since you joined:

✅ **12 new templates** (was 8): Added sales proposals, workshop 
outlines, webinar scripts, newsletter issues

✅ **Brand Voice Presets** — Define tone once (Professional / 
Conversational / Authority / Friendly), applies to every template

✅ **Team Workspaces** — Invite writers, assign templates, review 
before publish

✅ **Export to Notion/Markdown/HTML** — One click, clean output

✅ **Usage Dashboard** — See generations per template, per team member

**Your invite lands January 16 at 10 AM IST.** 
Check your inbox (and spam — add hello@nxdsol.com to contacts).

See you inside,
Vinod
```

**UTM:** `utm_source=waitlist&utm_medium=email&utm_campaign=launch-reminder`

---

### Email 7 — Jan 16 (Launch Day): "🚀 You're Invited!"
**Subject:** Your beta access is ready 🎉

```
Hi {first_name},

**Your beta account is live.**

👉 **Access here:** {beta_login_link}
👉 **Temp password:** {temp_password} (change on first login)
👉 **Expires:** February 15 (then converts to Free/Pro)

**First steps:**
1. Log in → you'll land on the Template Library
2. Try the "LinkedIn Authority Post" template first (quickest win)
3. Join #beta-feedback in Discord: [link]
4. Book your 15-min onboarding call: [Calendly link]

**What we need from you:**
• Weekly 15-min feedback call (Weeks 1-4)
• Honest takes: what's broken, what's missing, what's magic
• Permission to use your results as case study (anonymized if preferred)

**Your lifetime 50% discount is already applied.** 
When beta ends, you'll choose Free (100 gens/mo) or Pro (₹1,249/mo).

Welcome to the founding cohort.

Vinod
CMO, NXDSOL
```

**UTM:** `utm_source=waitlist&utm_medium=email&utm_campaign=beta-invite`

---

## 2. BETA USER SEQUENCE (During Beta: Jan 16 - Feb 15)

**Trigger:** Beta access granted  
**Cadence:** 8 emails over 4 weeks  
**Goal:** Activation, habit formation, feedback collection, conversion

### Email 1 — Day 0: "Welcome to Beta" (Same as Waitlist Email 7)

### Email 2 — Day 2: "Your First Template Walkthrough"
**Subject:** 5-min walkthrough: LinkedIn Authority Post template

```
Hi {first_name},

You've logged in. Now what?

**Start here:** The LinkedIn Authority Post template. Here's why:
• Fastest time-to-value (2 min to first post)
• Shows off block regeneration immediately
• You can post the result today

**Walkthrough (5 min):**
1. Click "LinkedIn Authority Post" in Template Library
2. Fill 4 fields: Topic, Contrarian Angle, Your Credibility, CTA
3. Hit Generate → watch the structure appear
4. Highlight the "Hook" paragraph → click Regenerate
5. Copy → paste to LinkedIn → post

**Pro tip:** Save your brand voice first (Settings → Brand Voice). 
Every template will use it automatically.

[Link to 3-min Loom walkthrough]

Questions? Reply or drop in #beta-feedback on Discord.

Vinod
```

---

### Email 3 — Day 5: "Block Regeneration Deep Dive"
**Subject:** The feature that changes everything (block regen)

```
Hi {first_name},

By now you've generated a few pieces. Let's talk about the feature 
that makes this different from ChatGPT/Jasper/Copy.ai.

**Block Regeneration = Surgical Editing**

Traditional AI: Regenerate entire output → lose the good parts
NXDSOL: Highlight any block → Regenerate just that block → keep everything else

**Real example from beta:**
> Generated a blog post. Intro was perfect. Section 3 was too technical. 
> Highlighted Section 3 → "Make this more accessible for non-technical readers" 
> → Regenerated. Done. Intro, Sections 1-2, 4-5, Conclusion all untouched.

**Try this today:**
1. Open your last generation
2. Find a paragraph that's "close but not quite"
3. Highlight → Regenerate with instruction: "More conversational" / "Add example" / "Shorten by 50%"
4. Watch only that block change

This is the workflow that turns AI from "toy" to "production tool."

Vinod
```

---

### Email 4 — Day 8: "Feedback Request #1"
**Subject:** Quick question: what's the one thing you'd change?

```
Hi {first_name},

You're a week into beta. Time for your first feedback pulse.

**3 questions (30 seconds):**
1. What's the ONE template you use most? [dropdown]
2. What's the ONE thing that frustrates you? [text]
3. What's missing that would make this indispensable? [text]

[Typeform link — 30 seconds]

Every response shapes the next sprint. We've already shipped 3 fixes 
from last week's feedback (keyboard shortcuts, template search, 
dark mode toggle).

Thanks for building this with us.

Vinod
```

---

### Email 5 — Day 12: "Advanced: Brand Voice + Team Workspaces"
**Subject:** Make it sound like YOU (brand voice + teams)

```
Hi {first_name},

Two features beta users ask about most:

**1. Brand Voice Presets** (Settings → Brand Voice)
Define once: Professional / Conversational / Authority / Friendly + 
custom examples. Every template inherits it.

**Pro move:** Create "Client A Voice" and "Client B Voice" workspaces. 
Switch per project.

**2. Team Workspaces** (Pro feature, free during beta)
• Invite writers/editors
• Assign templates per project
• Review → Approve → Publish workflow
• Usage analytics per team member

**Your beta includes Pro features free.** Set up a workspace for 
your team (or just you + a VA) and see the workflow.

[Link to setup guide]

Vinod
```

---

### Email 6 — Day 18: "Feedback Request #2 + Case Study Ask"
**Subject:** Your results so far? (and a small ask)

```
Hi {first_name},

Halfway through beta. Two quick asks:

**1. Feedback Pulse #2** (same 3 questions, evolved):
[Typeform link]

**2. Case Study Permission**
If you've had a win — time saved, output increased, client impressed — 
would you let us feature it? Anonymized or attributed, your call.

Format: "How {Company} {result} with AI Content Templates"
• Challenge (what was hard before)
• Solution (which templates, how used)
• Results (metrics: time, volume, quality)
• Quote (your words)

We'll write it, you approve, we publish. Great exposure for you, 
social proof for us.

Reply "yes" and I'll send a 5-question form.

Vinod
```

---

### Email 7 — Day 25: "Beta Ending Soon — Choose Your Plan"
**Subject:** Beta ends Feb 15 — choose your path

```
Hi {first_name},

Beta ends February 15. Your account converts automatically:

**Option A: Free Tier** (forever)
• 100 generations/month
• 1 workspace
• Basic templates (10 of 20+)
• No brand voice, no team features

**Option B: Pro — ₹1,249/mo (50% off for life)** 🔥
• Unlimited generations
• 3 workspaces
• All templates (20+ and growing)
• Brand voice presets
• Team seats (up to 5)
• Priority support
• **Locked in forever — price never increases**

**Option C: Team — ₹3,499/mo (50% off for life)**
• Everything in Pro
• 10 team seats
• SSO, custom templates, dedicated support

**Your discount code is already applied.** Just choose when prompted 
on Feb 15.

Questions? Book a 10-min call: [Calendly]

Vinod
```

---

### Email 8 — Day 30 (Feb 15): "Welcome to NXDSOL Pro 🎉"
**Subject:** You're officially a founding member

```
Hi {first_name},

Beta complete. You're now a **Founding Pro Member** of NXDSOL.

**Your locked-in price: ₹1,249/mo (50% off forever)**

What's next:
• Full template library (25+ templates, growing weekly)
• New: SEO cluster template, Webinar script, Podcast show notes
• Coming Q2: Template marketplace (community templates)
• Coming Q2: API access for custom integrations

**Your founding badge** is on your profile. Early beta testers get 
lifetime access to all future features at no extra cost.

**Referral program continues:** Your code NXD-BETA-{CODE} still works. 
Every referral = free month.

Welcome to the team. Let's build something great.

Vinod
CMO, NXDSOL
```

---

## 3. FREE TIER SEQUENCE (Post-Beta / Direct Signup)

**Trigger:** Free account created (no beta)  
**Cadence:** 5 emails over 14 days  
**Goal:** Activation → Pro upgrade

### Email 1 — Immediate: "Welcome to Free Tier"
**Subject:** Your free NXDSOL account is ready

```
Hi {first_name},

Welcome to NXDSOL Free! 🎉

**Your plan includes:**
✅ 100 generations/month
✅ 1 workspace  
✅ 10 core templates
✅ Export to Markdown/HTML

**Start here:** Try the LinkedIn Authority Post template — 
our most popular. 2 minutes to your first post.

[Link to template]

**When you're ready for more:**
• Unlimited generations
• All 25+ templates
• Brand voice + team features
• **Pro: ₹2,499/mo** (or ₹1,249/mo if you were in beta)

Questions? Reply or check our help center: [link]

Vinod
```

---

### Email 2 — Day 2: "Template Tour"
**Subject:** 3 templates to try this week

```
Hi {first_name},

Free tier gives you 10 templates. Here are the 3 highest-ROI ones:

1. **LinkedIn Authority Post** — Personal branding, thought leadership
2. **Blog Post Outline** — SEO-ready structure in 30 seconds  
3. **Cold Email Sequence** — 5-email framework that converts

**Pro templates you're missing:**
• Case Study (beta users' favorite)
• Sales Proposal
• Workshop Outline
• Webinar Script
• Newsletter Issue
• SEO Cluster Planner

[Link to template library]

Vinod
```

---

### Email 3 — Day 5: "The Block Regeneration Difference"
**Subject:** Why "regenerate all" is the wrong workflow

```
Hi {first_name},

You've probably noticed: most AI tools give you one shot. 
Accept or rewrite.

**We do it differently.**

Block regeneration = highlight any section → regenerate just that part.

**Try it now:**
1. Generate a blog outline
2. Highlight the "Introduction" block
3. Click Regenerate → "Make it punchier, add a hook"
4. Only the intro changes. Outline structure preserved.

This is the feature that moves AI from "writing assistant" to 
"production workflow."

[3-min Loom demo]

Vinod
```

---

### Email 4 — Day 9: "Usage Check-in"
**Subject:** You've used {X} of 100 generations this month

```
Hi {first_name},

Quick check: you've used **{X} of 100 generations** this month.

**If you're hitting the limit:** That's a good problem — means 
you're getting value.

**Pro removes the ceiling:** ₹2,499/mo for unlimited generations, 
all templates, brand voice, team seats.

**If you're not hitting the limit:** What would help you use it more?
• More template types?
• Better onboarding?
• Team collaboration?

Reply and let me know. I read every response.

Vinod
```

---

### Email 5 — Day 14: "Upgrade Nudge (Soft)"
**Subject:** Ready for unlimited? (founding discount inside)

```
Hi {first_name},

Two weeks in. If Free is working for you — awesome. Stay free forever.

**But if you're feeling the limits...**

**Pro: ₹2,499/mo** (was ₹1,249/mo for beta — that ship sailed)
• Unlimited generations
• All 25+ templates
• Brand voice presets
• 3 workspaces, 5 team seats

**Special for early free users:** Use code **EARLY20** for 20% off 
first 3 months (₹1,999/mo).

[Upgrade link with code applied]

No pressure. Free stays free. But Pro unlocks the full workflow.

Vinod
```

---

## 4. PRO TRIAL SEQUENCE (14-Day Trial)

**Trigger:** Pro trial started  
**Cadence:** 6 emails over 14 days  
**Goal:** Trial → Paid conversion

### Email 1 — Day 0: "Trial Started"
**Subject:** Your Pro trial is active 🎉 (14 days)

```
Hi {first_name},

**Pro trial activated.** 14 days of unlimited everything.

**What's unlocked now:**
✅ All 25+ templates
✅ Brand voice presets
✅ 3 workspaces
✅ 5 team seats
✅ Unlimited generations
✅ Priority support

**Day 1 challenge:** Generate 5 pieces today using 5 different 
templates. The variety shows you the range.

[Link to template library]

Your trial ends {date}. No auto-charge — we'll remind you 3 days before.

Vinod
```

---

### Email 2 — Day 3: "Power User Tips"
**Subject:** 3 pro tips from our beta users

```
Hi {first_name},

3 days in. Beta users discovered these workflows:

**1. Template Chaining**
Blog Outline → Blog Post → LinkedIn Thread → Newsletter Issue → 
Twitter Thread → Email Sequence
One topic, 6 assets, 15 minutes.

**2. Client Voice Workspaces**
Agency users: One workspace per client. Each has its own 
brand voice, templates, team. Switch in 2 clicks.

**3. Regeneration Instructions Library**
Save your favorite regen prompts:
• "More conversational, add analogy"
• "Cut 30%, keep key points"
• "Add specific example for {industry}"
• "Make CTA softer/harder"

[Link to instructions feature]

Vinod
```

---

### Email 3 — Day 7: "Mid-Trial Check-in"
**Subject:** Halfway through — how's it going?

```
Hi {first_name},

Day 7 of 14. Quick pulse:

**You've generated:** {X} pieces across {Y} templates
**Most used:** {Template name}
**Time saved (est.):** {Z} hours

**Blockers?** Reply and I'll help personally.

**If you're loving it:** Lock in now, avoid the "trial ended" friction.

[Upgrade link]

Vinod
```

---

### Email 4 — Day 10: "Advanced Features Tour"
**Subject:** Features you might have missed

```
Hi {first_name},

4 days left. Don't miss these Pro-only features:

📊 **Usage Analytics** — Generations by template, by team member, 
by week. Spot your highest-ROI content types.

🔄 **Version History** — Every generation saved. Compare versions, 
restore previous, never lose a good draft.

📤 **Bulk Export** — Select 10 pieces → Export all to Notion / 
Markdown / HTML / ZIP. Clean, organized, ready to publish.

🤝 **Team Review Workflow** — Writer drafts → Editor reviews → 
Approver publishes. Built-in comments, approval trail.

[Link to features guide]

Vinod
```

---

### Email 5 — Day 12: "3 Days Left"
**Subject:** 3 days until trial ends

```
Hi {first_name},

Trial ends {date}. 

**If you upgrade now:** Seamless continuation. No interruption.
**If you don't:** Account reverts to Free (100 gens/mo, 10 templates). 
Your Pro work is saved but locked until upgrade.

**Pro: ₹2,499/mo** (monthly) or **₹24,999/yr** (2 months free)

[Upgrade link]

Questions? Book 5-min call: [Calendly]

Vinod
```

---

### Email 6 — Day 14 (Trial End): "Trial Complete"
**Subject:** Your trial ended — what's next?

```
Hi {first_name},

Trial complete. Your account is now on **Free tier**.

**What you keep:** All your generations, workspaces, brand voices 
(saved but read-only on Free).

**What you lose:** Unlimited generations, 15+ templates, team features, 
brand voice on new generations.

**To restore Pro:** ₹2,499/mo or ₹24,999/yr
[Upgrade link]

**Not ready?** No worries. Free is free forever. Upgrade anytime.

**Feedback?** Reply — why didn't you convert? Helps us improve.

Vinod
```

---

## 5. CUSTOMER EXPANSION SEQUENCE (Quarterly)

**Trigger:** Paid customer (Pro/Team)  
**Cadence:** Quarterly + feature announcements  
**Goal:** Retention, expansion, referrals

### Quarterly Business Review Email (Template)
**Subject:** Your Q{X} NXDSOL Report 📊

```
Hi {first_name},

**Your Q{X} 2027 NXDSOL Report**

📝 **Generations:** {X} this quarter ({Y}% vs last quarter)
⏱️ **Time Saved:** ~{Z} hours (est. 15 min/generation vs manual)
🏆 **Top Template:** {Template Name} — {N} uses
👥 **Team Activity:** {M} active users this month

**New This Quarter:**
• {Feature 1}
• {Feature 2}
• {Template 1}, {Template 2}

**Your ROI:** At ₹{hourly_rate}/hr, that's ₹{savings} in time value 
vs your ₹{plan_cost} investment. **{ROI}x return.**

**What's Next Quarter:**
• {Upcoming feature}
• {Upcoming template}

**Referral Check:** Your code {CODE} has {N} referrals. 
{M} free months earned.

Questions? Reply or book a call: [Calendly]

Vinod
```

---

## Segmentation Rules

| Segment | Criteria | Entry Trigger |
|---------|----------|---------------|
| Waitlist | Form submit on /beta | Beta waitlist form |
| Beta User | Beta access granted | Manual tag / webhook |
| Free Tier | Free account created | Signup (non-beta) |
| Pro Trial | Trial started | Upgrade click → trial |
| Pro Customer | Paid Pro | Payment success |
| Team Customer | Paid Team | Payment success |
| Churned | Cancelled / expired | Stripe webhook |

---

## Suppression Rules

- Don't send Waitlist emails to Beta Users
- Don't send Free Tier emails to Pro Trial/Customers
- Don't send Trial emails to Customers
- Suppress unsubscribed / bounced / complained
- Max 1 email/day per user across all sequences

---

## A/B Test Plan

| Sequence | Test | Variant A | Variant B | Metric |
|----------|------|-----------|-----------|--------|
| Waitlist | Subject line | "You're on the list" | "Beta access confirmed" | Open rate |
| Waitlist | CTA | "Join Discord" | "Get 3 free templates" | Click rate |
| Beta | Subject | "Your first template" | "5-min walkthrough" | Open rate |
| Free | Timing | Day 2, 5, 9, 14 | Day 1, 3, 7, 14 | Activation rate |
| Trial | Subject | "3 days left" | "Trial ending soon" | Conversion rate |

---

## Metrics Dashboard

| Sequence | Key Metric | Target |
|----------|------------|--------|
| Waitlist | Open rate | >45% |
| Waitlist | Click rate | >8% |
| Waitlist → Beta | Conversion | >30% |
| Beta | Weekly active | >60% |
| Beta → Paid | Conversion | >25% |
| Free → Pro | Conversion | >5% |
| Trial → Paid | Conversion | >20% |
| Customer | Quarterly NPS | >50 |
| Customer | Annual retention | >80% |
| Customer | Expansion revenue | >20% |

---

## Tools & Implementation

| Tool | Purpose | Cost |
|------|---------|------|
| ConvertKit / Beehiiv | Email sequences, segmentation | $29-79/mo |
| Typeform | Feedback forms | $25/mo |
| Calendly | Demo/onboarding booking | $12/mo |
| Loom | Video walkthroughs | Free / $12/mo |
| Notion | Lead magnets, docs | $8/mo |
| Airtable | CRM, tracking | Free / $20/mo |

**Total: ~$100-150/mo** (within marketing budget)

---

## Next Actions

- [ ] Set up ConvertKit account + domain authentication
- [ ] Create all sequences in ConvertKit (visual builder)
- [ ] Build Typeform feedback forms (2 beta pulses)
- [ ] Record Loom walkthroughs (3 videos)
- [ ] Create Notion lead magnet pages (3 template packs)
- [ ] Set up webhook: Formspree → ConvertKit (waitlist tag)
- [ ] Set up webhook: Stripe → ConvertKit (customer tags)
- [ ] Test all sequences end-to-end
- [ ] Add UTM parameters to all links
- [ ] Set up Statcounter goals for email clicks

---

*Last updated: 2026-11-19 by CMO*