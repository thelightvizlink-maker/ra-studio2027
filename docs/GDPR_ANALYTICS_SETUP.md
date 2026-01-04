# 🍪 GDPR COMPLIANCE & ANALYTICS SETUP GUIDE

**Date:** 4-JAN-2026 00:30 (Sweden Time)  
**Author:** RovoDev  
**For:** ai.rastudio.se (Worldwide audience with EU visitors)

---

## 🎯 YOUR REQUIREMENTS

✅ **Google Analytics 4 (GA4)** - Track website visitors  
✅ **GDPR Compliance** - Required for EU visitors  
✅ **Cookie Consent Banner** - Need to implement  
✅ **Worldwide audience** - Including Sweden/EU

---

## 📋 IMPLEMENTATION PLAN

### **Phase 1: Choose Cookie Consent Solution** ⏱️ 30 minutes
### **Phase 2: Install GA4 with Consent Mode** ⏱️ 20 minutes  
### **Phase 3: Test & Verify** ⏱️ 10 minutes

**Total Time:** ~1 hour

---

## 🍪 PHASE 1: COOKIE CONSENT BANNER OPTIONS

### **OPTION A: CookieYes** ✅ RECOMMENDED (Best Free Tier)

**Free Tier:**
- ✅ Up to 100 pages scanned
- ✅ Up to 25,000 pageviews/month
- ✅ Multi-language support (EN, SV, NL, IT - your 4 languages!)
- ✅ Google Consent Mode v2 built-in
- ✅ Auto-blocking of cookies
- ✅ GDPR + ePrivacy compliant

**Price:** FREE for your site size

**Setup Time:** 15 minutes

**Implementation:**
```html
<!-- Add to index.html <head> -->
<script id="cookieyes" type="text/javascript" 
  src="https://cdn-cookieyes.com/client_data/YOUR_ID/script.js">
</script>
```

**Dashboard:** https://www.cookieyes.com

---

### **OPTION B: Cookie Consent by Osano** (Simple, Privacy-First)

**Free Tier:**
- ✅ Unlimited pageviews
- ✅ Basic consent banner
- ✅ Open source

**Price:** FREE forever

**Setup Time:** 10 minutes

**Implementation:**
```html
<!-- Add to index.html -->
<script src="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.js"></script>
<script>
window.cookieconsent.initialise({
  palette: { popup: { background: "#1d1d1d" }, button: { background: "#6dbfad" } },
  content: { message: "This website uses cookies...", dismiss: "Got it!", link: "Learn more" }
});
</script>
```

**Dashboard:** None (configure in code)

---

### **OPTION C: Termly** (Most Professional)

**Free Tier:**
- ✅ Up to 100 monthly active users
- ✅ Cookie consent banner
- ✅ Privacy policy generator
- ✅ Google Consent Mode v2

**Price:** FREE (limited), $10/month for more features

**Setup Time:** 20 minutes

**Dashboard:** https://termly.io

---

### **COMPARISON TABLE**

| Feature | CookieYes | Osano | Termly |
|---------|-----------|-------|--------|
| **Free Pageviews** | 25,000/mo | Unlimited | 100 users |
| **Multi-language** | ✅ Auto | ⚠️ Manual | ✅ Auto |
| **Consent Mode v2** | ✅ Yes | ❌ No | ✅ Yes |
| **Auto Cookie Blocking** | ✅ Yes | ❌ Manual | ✅ Yes |
| **Dashboard** | ✅ Yes | ❌ No | ✅ Yes |
| **GDPR Compliant** | ✅ Yes | ✅ Yes | ✅ Yes |
| **Setup Difficulty** | Easy | Medium | Easy |
| **Best For** | ✅ Your site | Developers | Enterprise |

**RECOMMENDATION:** Use **CookieYes** (easiest + best free tier)

---

## 📊 PHASE 2: GOOGLE ANALYTICS 4 SETUP

### **Step 1: Create GA4 Property**

1. Go to https://analytics.google.com
2. Click **Admin** (gear icon)
3. Click **Create Property**
4. Fill in:
   - **Property name:** RA Studio Website
   - **Time zone:** (GMT+01:00) Stockholm
   - **Currency:** Swedish Krona (SEK)
5. Click **Next**
6. Choose **Business category:** Design & Creative Services
7. Choose **Business size:** Small (1-10 employees)
8. Click **Create**
9. Accept Terms of Service

### **Step 2: Set Up Data Stream**

1. Click **Web** under Data Streams
2. Enter:
   - **Website URL:** https://ai.rastudio.se
   - **Stream name:** RA Studio Main Site
3. Click **Create stream**
4. **Copy your Measurement ID** (looks like `G-XXXXXXXXXX`)

### **Step 3: Configure Consent Mode**

In GA4 Admin:
1. Go to **Data Settings** → **Data Collection**
2. Enable **Google signals data collection** ✅
3. Go to **Admin** → **Data Settings** → **Data Retention**
4. Set to **14 months** (default, GDPR-friendly)

---

## 🔧 PHASE 3: IMPLEMENT ON YOUR WEBSITE

### **Installation Method: Using react-ga4 Library**

#### **Step 1: Install Dependencies**

```bash
npm install react-ga4 react-cookie-consent
```

#### **Step 2: Create Analytics Component**

**File:** `src/lib/analytics.ts`

```typescript
import ReactGA from "react-ga4";

const MEASUREMENT_ID = "G-XXXXXXXXXX"; // Replace with your ID

export const initGA = () => {
  ReactGA.initialize(MEASUREMENT_ID, {
    gaOptions: {
      anonymize_ip: true, // GDPR requirement
    },
    gtagOptions: {
      send_page_view: false, // We'll send manually after consent
    },
  });
};

export const logPageView = () => {
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
};

export const logEvent = (category: string, action: string, label?: string) => {
  ReactGA.event({ category, action, label });
};
```

#### **Step 3: Add Cookie Consent Banner**

**File:** `src/components/CookieConsent.tsx`

```typescript
import { useState, useEffect } from 'react';
import CookieConsent from "react-cookie-consent";
import { initGA, logPageView } from '@/lib/analytics';
import { useLanguage } from '@/i18n/LanguageContext';

const CookieConsentBanner = () => {
  const { t } = useLanguage();
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    // Check if user already consented
    const consent = localStorage.getItem('cookie-consent');
    if (consent === 'accepted') {
      initGA();
      logPageView();
      setAnalyticsEnabled(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    initGA();
    logPageView();
    setAnalyticsEnabled(true);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
  };

  return (
    <CookieConsent
      location="bottom"
      buttonText={t.cookie.accept || "Accept"}
      declineButtonText={t.cookie.decline || "Decline"}
      enableDeclineButton
      onAccept={handleAccept}
      onDecline={handleDecline}
      style={{
        background: "hsl(var(--card))",
        borderTop: "1px solid hsl(var(--border))",
        padding: "20px",
      }}
      buttonStyle={{
        background: "hsl(var(--primary))",
        color: "hsl(var(--primary-foreground))",
        fontSize: "14px",
        borderRadius: "8px",
        padding: "10px 24px",
      }}
      declineButtonStyle={{
        background: "transparent",
        color: "hsl(var(--muted-foreground))",
        fontSize: "14px",
        borderRadius: "8px",
        padding: "10px 24px",
        border: "1px solid hsl(var(--border))",
      }}
    >
      <span style={{ fontSize: "14px", color: "hsl(var(--foreground))" }}>
        {t.cookie.message || 
          "This website uses cookies to enhance your experience and analyze site traffic. " +
          "By clicking 'Accept', you consent to our use of cookies."}
      </span>
      <a 
        href="/privacy" 
        style={{ 
          marginLeft: "10px", 
          color: "hsl(var(--primary))",
          textDecoration: "underline" 
        }}
      >
        {t.cookie.learnMore || "Learn more"}
      </a>
    </CookieConsent>
  );
};

export default CookieConsentBanner;
```

#### **Step 4: Add Translations**

Update your translation files:

**File:** `src/i18n/translations/en.ts`

```typescript
export const en = {
  // ... existing translations
  cookie: {
    message: "This website uses cookies to enhance your experience and analyze site traffic. By clicking 'Accept', you consent to our use of cookies.",
    accept: "Accept",
    decline: "Decline",
    learnMore: "Learn more",
  },
};
```

**Repeat for:** `sv.ts`, `nl.ts`, `it.ts`

#### **Step 5: Add to App.tsx**

```typescript
import CookieConsentBanner from './components/CookieConsent';

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <LanguageProvider>
        <TooltipProvider>
          <BrowserRouter>
            <CustomCursor />
            <Navigation />
            <Routes>
              {/* ... your routes */}
            </Routes>
            <Footer />
            <CookieConsentBanner /> {/* Add this */}
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </HelmetProvider>
  </QueryClientProvider>
);
```

#### **Step 6: Track Page Views on Route Change**

**File:** `src/App.tsx`

```typescript
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { logPageView } from './lib/analytics';

const App = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if analytics is enabled
    const consent = localStorage.getItem('cookie-consent');
    if (consent === 'accepted') {
      logPageView();
    }
  }, [location]);

  // ... rest of component
};
```

---

## ⚙️ GOOGLE CONSENT MODE V2 CONFIGURATION

### **What You Saw in Google Tag Manager**

Those settings control **default consent state** before user interacts with banner.

### **Best Practice Setup:**

**For EU/EEA/UK visitors:**
```javascript
gtag('consent', 'default', {
  'ad_storage': 'denied',          // No ads tracking until consent
  'analytics_storage': 'denied',    // No analytics until consent
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'wait_for_update': 500            // Wait 500ms for CMP to load
});
```

**After user accepts:**
```javascript
gtag('consent', 'update', {
  'ad_storage': 'granted',
  'analytics_storage': 'granted',
  'ad_user_data': 'granted',
  'ad_personalization': 'granted'
});
```

**With react-ga4, this is handled automatically when you call `initGA()`**

---

## ✅ TESTING CHECKLIST

### **After Implementation:**

1. **Clear browser cookies** (Ctrl+Shift+Delete)
2. **Visit your site** - Banner should appear
3. **Click "Decline"** - Check no GA cookies are set
4. **Refresh page** - Banner should not appear again
5. **Clear cookies again**
6. **Visit site, click "Accept"** - GA cookies should be set
7. **Check GA Real-Time report** - Should see your visit

### **Verify in Browser DevTools:**

1. Press **F12** → **Application** tab → **Cookies**
2. After accepting, you should see:
   - `_ga` cookie
   - `_ga_XXXXXXXXXX` cookie
3. After declining, cookies should be empty

### **Verify in GA4:**

1. Go to **Reports** → **Realtime**
2. Open your site in incognito
3. Accept cookies
4. Navigate a few pages
5. Should see your activity in GA4 dashboard

---

## 🔒 GDPR COMPLIANCE CHECKLIST

- [ ] Cookie consent banner implemented ✅
- [ ] "Decline" option available ✅
- [ ] Cookies only set after consent ✅
- [ ] Analytics anonymizes IP addresses ✅
- [ ] Privacy policy page created (need to add)
- [ ] Data retention set to 14 months ✅
- [ ] Consent stored in localStorage ✅
- [ ] Multi-language consent messages ✅

---

## 📝 NEED TO CREATE: PRIVACY POLICY PAGE

**File:** `src/pages/Privacy.tsx`

You need to create a privacy policy page explaining:
- What cookies you use (Google Analytics)
- Why you use them (improve user experience)
- How to opt-out
- Data retention period
- Contact information

**Tools to generate:**
- https://termly.io/products/privacy-policy-generator/ (Free)
- https://www.privacypolicies.com/privacy-policy-generator/ (Free)

---

## 💰 COST SUMMARY

| Service | Price | What It Does |
|---------|-------|--------------|
| **CookieYes** | FREE | Cookie consent banner |
| **Google Analytics 4** | FREE | Website analytics |
| **Hosting (Vercel)** | FREE | Already have |
| **Total** | **$0/month** | Full GDPR compliance! |

---

## 🚀 IMPLEMENTATION TIME

| Task | Time | Difficulty |
|------|------|------------|
| Sign up for CookieYes | 5 min | Easy |
| Create GA4 property | 10 min | Easy |
| Install npm packages | 2 min | Easy |
| Create analytics.ts | 5 min | Easy |
| Create CookieConsent component | 10 min | Medium |
| Add translations | 10 min | Easy |
| Update App.tsx | 5 min | Easy |
| Test everything | 15 min | Easy |
| **TOTAL** | **~1 hour** | ✅ Doable |

---

## 📊 WHAT YOU'LL GET

### **Analytics Dashboard Will Show:**
- 📈 Pageviews per page
- 👥 Number of visitors (daily/weekly/monthly)
- 🌍 Geographic location of visitors
- 💻 Device type (mobile/desktop/tablet)
- 🌐 Browser used
- ⏱️ Time spent on site
- 🔄 Bounce rate
- 🎯 Most popular pages
- 📱 Screen resolution
- 🗣️ Language preference

### **User Experience:**
- First visit: Cookie banner appears at bottom
- Click "Accept": Analytics starts, banner disappears forever
- Click "Decline": No tracking, banner disappears
- Return visit: No banner (choice remembered)

---

## 🎯 RECOMMENDED NEXT STEPS

**RIGHT NOW:**
1. ✅ Sign up for CookieYes (5 minutes)
2. ✅ Create GA4 property (10 minutes)
3. ✅ Get Measurement ID

**THEN:**
Tell me the Measurement ID and I'll implement the full solution in your codebase!

Or do you want me to:
- **A) Guide you step-by-step** through manual implementation?
- **B) Implement it all for you** (give me GA4 Measurement ID)?
- **C) Use simpler solution** (just basic analytics, no GDPR banner yet)?

---

**Document Created:** 4-JAN-2026 00:30 (Sweden Time) by RovoDev  
**Status:** Waiting for user to create GA4 property and provide Measurement ID

**Next:** Implementation in codebase (~30 minutes)