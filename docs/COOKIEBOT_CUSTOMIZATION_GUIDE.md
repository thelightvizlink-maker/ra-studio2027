# 🍪 COOKIEBOT CUSTOMIZATION GUIDE

**Your Cookiebot ID:** 863abb98-455c-4cdd-a4fe-2dc30b36791d  
**Dashboard:** https://manage.cookiebot.com  
**Current Mode:** Opt-in (GDPR compliant) ✅

> Important: Cookiebot is **not** currently installed in this codebase.  
> The live implementation uses `react-cookie-consent` in `src/components/CookieConsent.tsx`.

---

## ✅ WHAT'S ALREADY CONFIGURED

1. **Custom Cookie Banner:** `src/components/CookieConsent.tsx`
2. **Google Analytics Integration:** GA4 waits for consent
3. **Consent Storage:** Uses `localStorage` key `cookie-consent`
4. **Consent Mode:** Opt-in (strict GDPR)

---

## 🎨 CUSTOMIZATION STEPS

### Step 1: Login to Cookiebot Dashboard

1. Go to: https://manage.cookiebot.com
2. Login with your credentials
3. Select domain: ai.rastudio.se

### Step 2: Customize Banner Design

**Navigation:** Domain Settings → Dialogue → Design

**Recommended Settings:**
- **Position:** Bottom
- **Layout:** Classic/Bar (non-intrusive)
- **Colors:** Match your site theme
  - Background: #1d1d1d (dark)
  - Text: #ffffff (white)
  - Accept button: #6dbfad (your primary color)
  - Decline button: Outlined/transparent

### Step 3: Customize Text per Language

**Navigation:** Domain Settings → Dialogue → Texts

Cookiebot auto-detects user language, but you can customize:

**English:**
- Headline: "We value your privacy"
- Message: "This website uses cookies to enhance your experience and analyze site traffic."
- Accept button: "Accept"
- Decline button: "Decline"

**Swedish:**
- Headline: "Vi värdesätter din integritet"
- Message: "Denna webbplats använder cookies för att förbättra din upplevelse."
- Accept: "Acceptera"
- Decline: "Avböj"

**Dutch:**
- Headline: "Wij waarderen uw privacy"
- Message: "Deze website gebruikt cookies om uw ervaring te verbeteren."
- Accept: "Accepteren"
- Decline: "Weigeren"

**Italian:**
- Headline: "Apprezziamo la tua privacy"
- Message: "Questo sito utilizza i cookie per migliorare la tua esperienza."
- Accept: "Accetta"
- Decline: "Rifiuta"

### Step 4: Configure Cookie Categories

**Navigation:** Domain Settings → Cookies → Cookie Declaration

Cookiebot auto-scans your site and categorizes:

**Necessary:**
- Session cookies
- Language preference

**Statistics (Google Analytics):**
- _ga, _ga_*, _gid
- These require consent

**Marketing:**
- None (you don't have marketing cookies yet)

**Preferences:**
- Language selection cookie

### Step 5: Consent Mode (Already Optimal)

**Current Setting:** Opt-in ✅ **KEEP THIS**

**Why:**
- GDPR compliant
- User MUST click Accept to enable tracking
- Cookies blocked until consent
- Legal for EU visitors

**Don't change to:**
- ❌ Opt-out (implied consent) - Not GDPR compliant for analytics
- ❌ Assumed consent - Illegal in EU

---

## 🎯 RECOMMENDED SETTINGS SUMMARY

| Setting | Value | Why |
|---------|-------|-----|
| **Mode** | Opt-in | GDPR compliant |
| **Position** | Bottom | Non-intrusive |
| **Design** | Match site theme | Professional |
| **Auto-block** | Enabled | Legal requirement |
| **Languages** | Auto-detect | Respects user preference |
| **GA4 Integration** | Waits for consent | Already configured ✅ |

---

## ✅ WHAT YOU DON'T NEED TO CHANGE

These are already optimal:
- ✅ Consent mode (opt-in)
- ✅ Cookie blocking (auto-enabled)
- ✅ Google Analytics integration
- ✅ Multi-language support

---

## 🎨 OPTIONAL: ADVANCED CUSTOMIZATION

### Match Your Site Colors

**Your site theme colors:**
- Primary: hsl(193, 55%, 69%) = #6dbfad
- Background: Dark
- Text: White

**In Cookiebot:**
1. Go to Design tab
2. Custom CSS option (if available in your plan)
3. Or use color pickers to match

### Add Privacy Policy Link

**In banner text, add:**
"Learn more in our [Privacy Policy](/privacy)"

---

## 🧪 TESTING

After customization:

1. **Clear cookies:** Ctrl + Shift + Delete
2. **Visit site:** https://ai.rastudio.se
3. **Check banner:** Should appear with your design
4. **Test Accept:** GA4 should start tracking
5. **Test Decline:** No tracking cookies set
6. **Test languages:** Switch site language, banner should translate

---

## 📊 MONITORING

**Cookiebot Dashboard shows:**
- Consent statistics
- Accept/decline rates
- Cookie scanning results
- Compliance reports

**Check monthly:** Ensure no new cookies need declaration

---

## 🎉 CURRENT STATUS

✅ **Opt-in mode (GDPR compliant)**  
✅ **Google Analytics integrated**  
✅ **Cookie banner implemented in code**  
⏳ **Cookiebot optional** (requires adding the script to `index.html`)

**If you want Cookiebot specifically, add its script first, then use this dashboard guide.**

---

**Next:** Test the site and verify banner appears!
