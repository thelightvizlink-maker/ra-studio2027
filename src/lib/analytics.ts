import ReactGA from "react-ga4";

const MEASUREMENT_ID = "G-1L3M4MGR9E";

let isInitialized = false;

export const initGA = () => {
  if (!isInitialized) {
    ReactGA.initialize(MEASUREMENT_ID, {
      gaOptions: {
        anonymize_ip: true, // GDPR compliance
      },
    });
    isInitialized = true;
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