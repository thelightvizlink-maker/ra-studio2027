# 🎨 COOKIEBOT COLOR CUSTOMIZATION - QUICK GUIDE

**Dashboard:** https://manage.cookiebot.com

## Your Site Colors (to match):
- **Primary:** #6dbfad (hsl(193, 55%, 69%))
- **Background:** #1d1d1d (dark)
- **Text:** #ffffff (white)
- **Border:** rgba(255, 255, 255, 0.1)

## Steps:
1. Login to Cookiebot dashboard
2. Select domain: ai.rastudio.se
3. Go to: **Dialogue → Design**
4. Set colors:
   - Background: #1d1d1d
   - Text: #ffffff
   - Accept button: #6dbfad
   - Accept button text: #000000
   - Decline button: transparent with 1px border #ffffff33

## Custom CSS (if available):
```css
.CookieConsent {
  background: rgba(0, 0, 0, 0.95) !important;
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll {
  background: #6dbfad !important;
  color: #000 !important;
}
```

Done! Takes 2 minutes.