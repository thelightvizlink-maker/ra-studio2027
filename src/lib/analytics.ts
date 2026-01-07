import ReactGA from "react-ga4";

const MEASUREMENT_ID = "G-1L3M4MGR9E";

let isInitialized = false;

// Wait for Cookiebot consent before initializing
const waitForCookiebot = (): Promise<void> => {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && (window as any).Cookiebot) {
      resolve();
    } else {
      window.addEventListener('CookiebotOnLoad', () => resolve());
    }
  });
};

export const initGA = async () => {
  if (!isInitialized) {
    await waitForCookiebot();
    
    // Check if statistics cookies are consented
    const cookiebot = (window as any).Cookiebot;
    if (cookiebot && cookiebot.consent && cookiebot.consent.statistics) {
      ReactGA.initialize(MEASUREMENT_ID, {
        gaOptions: {
          anonymize_ip: true, // GDPR compliance
        },
      });
      isInitialized = true;
      console.log('✅ Google Analytics initialized with Cookiebot consent');
    } else {
      console.log('⚠️  Analytics not initialized - user declined statistics cookies');
    }
  }
};

export const logPageView = () => {
  if (isInitialized) {
    ReactGA.send({ 
      hitType: "pageview", 
      page: window.location.pathname + window.location.search 
    });
  }
};

export const logEvent = (category: string, action: string, label?: string) => {
  if (isInitialized) {
    ReactGA.event({ category, action, label });
  }
};

export const isAnalyticsEnabled = () => isInitialized;

// Listen for consent changes
if (typeof window !== 'undefined') {
  window.addEventListener('CookiebotOnAccept', () => {
    const cookiebot = (window as any).Cookiebot;
    if (cookiebot && cookiebot.consent && cookiebot.consent.statistics) {
      initGA();
    }
  });

  window.addEventListener('CookiebotOnDecline', () => {
    console.log('⚠️  User declined cookies');
  });
}