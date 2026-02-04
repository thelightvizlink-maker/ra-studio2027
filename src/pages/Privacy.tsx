import { useLanguage } from '@/i18n/LanguageContext';
import { Helmet } from 'react-helmet-async';

const Privacy = () => {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>Privacy Policy - RA Studio</title>
        <meta name="description" content="RA Studio Privacy Policy and Cookie Policy" />
      </Helmet>

      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">
            Privacy Policy
          </h1>
          
          <div className="neo-card p-8 space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Introduction</h2>
              <p className="leading-relaxed">
                RA Studio ("we", "our", or "us") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, and protect your personal information 
                when you visit ai.rastudio.se.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Information We Collect</h2>
              <h3 className="text-xl font-semibold text-foreground mb-2">1. Contact Form Data</h3>
              <p className="leading-relaxed mb-4">
                When you submit our contact form, we collect:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Your name</li>
                <li>Email address</li>
                <li>Company name and role</li>
                <li>Phone number (optional)</li>
                <li>Message content</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-foreground mb-2 mt-4">2. Analytics Data</h3>
              <p className="leading-relaxed">
                We use Google Analytics 4 to understand how visitors use our site. This includes:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Pages visited</li>
                <li>Time spent on site</li>
                <li>Browser and device information</li>
                <li>Geographic location (country/city level)</li>
                <li>Anonymized IP address</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mb-2 mt-4">3. Cookies</h3>
              <p className="leading-relaxed">
                We use cookies for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Language preference (necessary)</li>
                <li>Cookie consent choice (necessary)</li>
                <li>Analytics (optional - requires consent)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">How We Use Your Information</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Respond to your inquiries</li>
                <li>Improve our website and services</li>
                <li>Understand visitor behavior</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Data Retention</h2>
              <p className="leading-relaxed">
                - Contact form submissions: Retained until inquiry is resolved<br />
                - Analytics data: 14 months (Google Analytics default)<br />
                - Cookie consent: 12 months
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Your Rights (GDPR)</h2>
              <p className="leading-relaxed mb-2">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access your personal data</li>
                <li>Rectify inaccurate data</li>
                <li>Request data deletion</li>
                <li>Object to data processing</li>
                <li>Data portability</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Cookie Management</h2>
              <p className="leading-relaxed">
                You can manage your cookie preferences at any time using the cookie banner or by 
                adjusting your browser settings. Note that disabling certain cookies may affect 
                site functionality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Third-Party Services</h2>
              <p className="leading-relaxed mb-2">We use:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Google Analytics 4:</strong> Analytics and insights</li>
                <li><strong>Cookie consent banner:</strong> Custom implementation using react-cookie-consent</li>
                <li><strong>Vercel:</strong> Website hosting</li>
                <li><strong>Cloudflare:</strong> DNS and security</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
              <p className="leading-relaxed">
                For privacy-related questions or to exercise your rights:<br />
                Email: hello@rastudio.se<br />
                <br />
                Data Controller: RA Studio<br />
                Location: Global Remote Studio
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Updates</h2>
              <p className="leading-relaxed">
                This Privacy Policy was last updated: January 4, 2026<br />
                We may update this policy periodically. Check this page for the latest version.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Privacy;
