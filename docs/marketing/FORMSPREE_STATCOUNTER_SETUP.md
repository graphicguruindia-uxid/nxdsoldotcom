# Formspree + Statcounter Setup Guide — NEX-15

**Owner:** CMO (requires human execution for account creation)  
**Blocker:** CI/CD deployment blocked until Formspree ID is configured

---

## 1. Formspree Setup (Required for Deployment)

### Step 1: Create Account
1. Go to https://formspree.io
2. Sign up (free tier works for now; Pro is $12/mo for custom domain)
3. Verify email

### Step 2: Create Contact Form
1. Dashboard → **New Form**
2. Name: "NXDSOL Contact Form"
3. Form type: **Email** (sends to your email)
4. Email: `info@nxdsol.com` (or your preferred inbox)
5. **Copy the Form ID** — looks like: `xaybqzr` or `mzvkwel`

### Step 3: Update index.html
**File:** `D:\Projects\nxdsoldotcom\index.html`  
**Line 223:** Replace `{FORM_ID}` with your actual form ID

```html
<!-- BEFORE -->
<form id="contactForm" action="https://formspree.io/f/{FORM_ID}" method="POST" novalidate>

<!-- AFTER (example) -->
<form id="contactForm" action="https://formspree.io/f/xaybqzr" method="POST" novalidate>
```

### Step 4: Test Locally
```bash
cd D:\Projects\nxdsoldotcom
# Serve locally (any static server)
npx serve .
# Open http://localhost:3000
# Fill contact form → submit
# Check email inbox for test submission
```

### Step 5: Commit & Push (triggers deploy)
```bash
cd D:\Projects\nxdsoldotcom
git add index.html
git commit -m "fix: Replace Formspree placeholder with real endpoint"
git push origin main
# GitHub Actions deploys to GitHub Pages
```

---

## 2. Statcounter Setup (Analytics + Goals)

### Step 1: Create Account
1. Go to https://statcounter.com
2. Sign up (Free tier: 500k pageviews/mo — sufficient)
3. Add project: **nxdsol.com**

### Step 2: Verify Existing Codes
**index.html already has** (lines 301-303):
```javascript
var sc_project=13204603;
var sc_invisible=1;
var sc_security="a3a63628";
```
**Confirm these match your new project.** If different, update.

### Step 3: Configure Conversion Goals
In Statcounter Dashboard → **Goals** → **New Goal** (create 4):

| Goal Name | Goal Type | Match Type | Value |
|-----------|-----------|------------|-------|
| `hero-primary` | **Page View** | URL contains | `#contact` (from hero CTA click) |
| `hero-secondary` | **Page View** | URL contains | `#services` (from services CTA) |
| `contact-form-success` | **Custom Event** | Event name | `contact-form-success` |
| `mobile-cta` | **Page View** | URL contains | `#contact` (from mobile CTA) |

**Note:** The JS in `js/main.js` already calls `trackGoal(name)` on CTA clicks. For Statcounter to record custom events, you need to add the Statcounter event tracking code to the `trackGoal` function.

### Step 4: Update js/main.js for Statcounter Events
**File:** `D:\Projects\nxdsoldotcom\js\main.js`  
**Function:** `trackGoal(name)` (around line 52)

Add this inside the function:
```javascript
function trackGoal(name) {
  // Existing code...
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: 'goal', goal: name });
  }
  window.goals = window.goals || {};
  window.goals[name] = (window.goals[name] || 0) + 1;
  
  // ADD THIS: Statcounter custom event
  if (typeof _statcounter !== 'undefined') {
    _statcounter.push({'sc_event': name});
  }
}
```

### Step 5: Test Goals
1. Deploy to staging (or local with Statcounter test mode)
2. Click hero CTA → check Statcounter real-time
3. Submit contact form → check for `contact-form-success` event

---

## 3. CI/CD Integration Check

The deploy workflow (`.github/workflows/deploy.yml`) blocks on `{FORM_ID}`:

```yaml
- name: Check Formspree ID
  run: |
    if grep -q "{FORM_ID}" index.html; then
      echo "::error::Formspree {FORM_ID} placeholder not replaced - deployment blocked"
      exit 1
    fi
```

**Once Formspree ID is replaced, push to main triggers auto-deploy.**

---

## 4. Quick Checklist for CEO/Human

- [ ] Create Formspree account
- [ ] Create "NXDSOL Contact Form" 
- [ ] Copy Form ID
- [ ] Replace `{FORM_ID}` in `index.html` line 223
- [ ] Test form locally
- [ ] Commit & push to main (or feature branch for review)
- [ ] Create Statcounter project
- [ ] Verify `sc_project` and `sc_security` codes match
- [ ] Add 4 conversion goals in Statcounter dashboard
- [ ] Update `js/main.js` trackGoal() with Statcounter event push
- [ ] Test goals on deployed site
- [ ] Confirm deployment successful on GitHub Pages

---

## 5. Budget Impact

| Item | Monthly | Annual |
|------|---------|--------|
| Formspree Pro (optional) | $12 | $144 |
| Statcounter Free | $0 | $0 |
| **Total** | **$12** | **$144** |

*Formspree Free tier works but has Formspree branding. Pro removes branding, adds file uploads, custom domain.*

---

*Created: 2026-11-20 by CMO for NEX-15 execution*