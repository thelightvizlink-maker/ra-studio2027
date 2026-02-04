# Google Tag Manager + GA4 Tutorial (Vite + React)

This guide explains how to add Google Tag Manager (GTM) and GA4, what each tag does, how many tags you need, and how to read positive/negative signals in analytics. It is written for this codebase (React + Vite).

## 1) Choose One Tracking Method
Do NOT run both GTM GA4 and react-ga4 at the same time or you will double count.

Option A: Keep current react-ga4 (already installed).
Option B: Switch to GTM (recommended if you want more tags and marketing tools).

If you switch to GTM, remove or disable react-ga4 tracking in:
- `src/lib/analytics.ts`
- `src/components/CookieConsent.tsx`
- `src/App.tsx`

## 2) Create Your GTM Container
1. Go to https://tagmanager.google.com
2. Create a new container for your website.
3. Copy the GTM ID like `GTM-XXXXXXX`.

## 3) Add GTM Snippet to Your Site
Add this in `index.html`.

In the `<head>`:
```html
<!-- Google Tag Manager -->
<script>
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-XXXXXXX');
</script>
<!-- End Google Tag Manager -->
```

Right after `<body>`:
```html
<!-- Google Tag Manager (noscript) -->
<noscript>
  <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
  height="0" width="0" style="display:none;visibility:hidden"></iframe>
</noscript>
<!-- End Google Tag Manager (noscript) -->
```

## 4) Add GA4 in GTM (Tag + Trigger)
In GTM:
1. Tag: GA4 Configuration
2. Measurement ID: `G-XXXXXXXXXX`
3. Trigger: All Pages
4. Save and publish

This tag handles pageviews and basic data.

## 5) SPA Pageviews (React Router)
If you use a single page app, GTM needs a History Change trigger.

In GTM:
- Trigger: History Change
- Fire on: All History Changes
- Tag: GA4 Event
  - Event name: `page_view`
  - Parameters:
    - `page_location` = `{{Page URL}}`
    - `page_path` = `{{Page Path}}`
    - `page_title` = `{{Page Title}}`

## 6) Conversion Events (Calls, Emails, Forms)
These increase business calls and qualified leads.

### Call Clicks
Tag: GA4 Event
Event name: `call_click`
Trigger: Click - Just Links
Condition: Click URL starts with `tel:`

### Email Clicks
Tag: GA4 Event
Event name: `email_click`
Trigger: Click - Just Links
Condition: Click URL starts with `mailto:`

### Contact Form Submit
Tag: GA4 Event
Event name: `contact_submit`
Trigger: Form Submission

## 7) Consent Mode (GDPR)
If you use a cookie banner, you must control consent before GA loads.

Default consent (before accept):
```html
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('consent', 'default', {
    'ad_storage': 'denied',
    'analytics_storage': 'denied'
  });
</script>
```

When user accepts cookies:
```html
<script>
  gtag('consent', 'update', {
    'ad_storage': 'granted',
    'analytics_storage': 'granted'
  });
</script>
```

## 8) How Many Tags Per Page?
There is no fixed number. It depends on what you want to measure.
Typical setup:
- 1x GA4 Configuration tag (site-wide)
- 1x page_view event for SPA routes
- 2-4 conversion events (call, email, form, CTA)

If you add Ads or remarketing, you will add more tags.

## 9) Positive vs Negative Analytics Signals

Positive signals:
- Higher conversion rate for call clicks and form submits
- Higher engaged sessions per user
- Longer average engagement time
- More returning users and repeat visits
- Improved CTA click-through rate

Negative signals:
- High bounce / low engagement rate
- Short session duration
- High exit rate on key pages (home, services, contact)
- Low CTA clicks despite traffic
- High mobile drop-off (slow page or unclear CTA)

## 10) How to Improve Calls and Leads
Use analytics to optimize:
- Put Call and Contact CTAs above the fold
- Simplify contact form (fewer fields)
- Add proof: testimonials, logos, results
- Improve speed (especially mobile)
- Clarify value proposition in hero text
- Use short forms and clear pricing

## 11) Troubleshooting (GTM "Upset")
Common issues:
- GTM script missing or placed incorrectly
- Ad blockers or browser privacy settings
- Consent mode not granted
- Duplicate GA4 tags (double counting)
- Wrong Measurement ID
- No History Change trigger in SPA

Quick checks:
- GTM Preview Mode shows tag firing
- GA4 Realtime shows your visit
- No console errors

## 12) Next Steps (Recommended)
1. Decide if you want GTM or react-ga4.
2. Add GTM snippet to `index.html`.
3. Create GA4 Configuration tag in GTM.
4. Add conversion events (call, email, form).
5. Publish container.
6. Verify in GA4 Realtime.
