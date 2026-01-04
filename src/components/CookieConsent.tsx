import { useState, useEffect } from 'react';
import CookieConsent from "react-cookie-consent";
import { initGA, logPageView } from '@/lib/analytics';
import { useLanguage } from '@/i18n/LanguageContext';

const CookieConsentBanner = () => {
  const { t } = useLanguage();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Small delay to not interfere with splash screen
    const timer = setTimeout(() => {
      const consent = localStorage.getItem('cookie-consent');
      if (consent === 'accepted') {
        initGA();
        logPageView();
      } else if (!consent) {
        setShowBanner(true);
      }
    }, 2000); // Wait 2 seconds after page load

    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    initGA();
    logPageView();
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <CookieConsent
      location="bottom"
      buttonText={t.cookie?.accept || "Accept"}
      declineButtonText={t.cookie?.decline || "Decline"}
      enableDeclineButton
      onAccept={handleAccept}
      onDecline={handleDecline}
      cookieName="cookie-consent-banner"
      style={{
        background: "rgba(0, 0, 0, 0.95)",
        backdropFilter: "blur(10px)",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        padding: "20px 40px",
        alignItems: "center",
        zIndex: 9999,
      }}
      buttonStyle={{
        background: "hsl(193, 55%, 69%)",
        color: "#000",
        fontSize: "14px",
        fontWeight: "600",
        borderRadius: "8px",
        padding: "12px 28px",
        margin: "0 8px",
        cursor: "pointer",
        border: "none",
      }}
      declineButtonStyle={{
        background: "transparent",
        color: "#fff",
        fontSize: "14px",
        fontWeight: "500",
        borderRadius: "8px",
        padding: "12px 28px",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        cursor: "pointer",
      }}
      expires={365}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
        <span style={{ fontSize: "14px", color: "#fff", flex: "1", minWidth: "300px" }}>
          {t.cookie?.message || 
            "We use cookies to enhance your experience and analyze site traffic. By clicking 'Accept', you consent to our use of cookies."}
        </span>
      </div>
    </CookieConsent>
  );
};

export default CookieConsentBanner;