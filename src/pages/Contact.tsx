import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import NeomorphicCard from '@/components/NeomorphicCard';
import { Mail, MapPin, Send, Clock, MessageSquare, CheckCircle, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from 'react-google-recaptcha';

const MIN_FILL_MS = 1500;
const SUBMIT_COOLDOWN_MS = 15_000;
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_77l7n2o';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const RECAPTCHA_SITE_KEY =
  import.meta.env.VITE_RECAPTCHA_SITE_KEY ||
  '6Lc8-F4sAAAAAFlpj05x3aLXelBYtP6Hh34xIuPn';
const PHONE_FALLBACK_CODE = '+1';

// Input validation schema
const contactSchema = z.object({
  fullName: z.string().trim().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  companyRole: z.enum(
    [
      'Founder / CEO',
      'CTO / Technical Lead',
      'Product Manager',
      'Marketing Lead',
      'Operations Manager',
      'Engineer',
      'Designer',
      'Sales Lead',
      'Project Manager',
      'Other',
    ],
    { errorMap: () => ({ message: 'Please select a role' }) },
  ),
  productService: z.string().min(1, 'Please select a service'),
  inquiryDetails: z.string().trim().max(2000, 'Inquiry details must be less than 2000 characters').optional(),
  phoneNumber: z
    .string()
    .trim()
    .max(20, 'Phone number must be less than 20 characters')
    .regex(/^[\d\s+\-()]*$/, 'Invalid phone number format')
    .optional()
    .or(z.literal('')),
  phoneCountryCode: z.string().trim().min(1, 'Country code is required'),
  email: z.string().trim().email('Invalid email address').max(255, 'Email must be less than 255 characters'),
  message: z.string().trim().max(5000, 'Message must be less than 5000 characters').optional(),
  website: z.string().trim().max(200).optional(),
}).refine(
  (data) => (data.phoneNumber ? data.phoneCountryCode.trim().length > 0 : true),
  { path: ['phoneCountryCode'], message: 'Country code is required when a phone number is provided' }
);

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const pageLoadTimeRef = useRef(Date.now());
  const lastSubmitTimeRef = useRef(0);
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const [phoneCountryCode, setPhoneCountryCode] = useState(PHONE_FALLBACK_CODE);
  const [availableCountryCodes, setAvailableCountryCodes] = useState<string[]>([
    PHONE_FALLBACK_CODE,
    '+44',
    '+46',
    '+47',
    '+33',
    '+34',
    '+39',
    '+49',
    '+61',
    '+65',
  ]);
  const [formData, setFormData] = useState({
    fullName: '',
    companyRole: 'Founder / CEO',
    productService: '',
    inquiryDetails: '',
    phoneNumber: '',
    phoneCountryCode: PHONE_FALLBACK_CODE,
    email: '',
    message: '',
    website: '',
  });

  useEffect(() => {
    const detectCountryCode = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = window.setTimeout(() => controller.abort(), 4000);
        const res = await fetch('https://ipapi.co/json/', { signal: controller.signal });
        if (!res.ok) throw new Error('Failed to detect location');
        const data = await res.json();
        const code = data?.country_calling_code || PHONE_FALLBACK_CODE;
        setPhoneCountryCode(code);
        setFormData(prev => ({ ...prev, phoneCountryCode: code }));
        if (!availableCountryCodes.includes(code)) {
          setAvailableCountryCodes(prev => [code, ...prev]);
        }
        window.clearTimeout(timeoutId);
      } catch (error) {
        setPhoneCountryCode(PHONE_FALLBACK_CODE);
        setFormData(prev => ({ ...prev, phoneCountryCode: PHONE_FALLBACK_CODE }));
      }
    };
    detectCountryCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const now = Date.now();
    const filledTooFast = now - pageLoadTimeRef.current < MIN_FILL_MS;
    const isCoolingDown = now - lastSubmitTimeRef.current < SUBMIT_COOLDOWN_MS;
    const hasHoneypotValue = formData.website.trim().length > 0;

    // Silent success for obvious bot signals; avoid giving attackers feedback.
    if (filledTooFast || hasHoneypotValue) {
      setIsSubmitted(true);
      toast({
        title: 'Message sent!',
        description: "We'll get back to you within 24 hours.",
      });
      return;
    }

    if (isCoolingDown) {
      toast({
        title: 'Please wait a moment',
        description: 'Try submitting again in a few seconds.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY || !RECAPTCHA_SITE_KEY) {
        toast({
          title: 'Configuration error',
          description: 'Email service or reCAPTCHA is not set up. Please contact support.',
          variant: 'destructive',
        });
        return;
      }

      if (!recaptchaToken) {
        toast({
          title: 'Verify you are human',
          description: 'Please complete the reCAPTCHA before sending.',
          variant: 'destructive',
        });
        return;
      }

      // Validate input before submission
      const validatedData = contactSchema.parse({ ...formData, phoneCountryCode });

      const formattedPhone = validatedData.phoneNumber
        ? `${validatedData.phoneCountryCode} ${validatedData.phoneNumber}`.replace(/\s+/g, ' ').trim()
        : 'N/A';
      const cleanName = validatedData.fullName.replace(/\s+/g, ' ').trim();
      const cleanMessage = (validatedData.message || '').replace(/\s+/g, ' ').trim();
      const cleanTitle = (validatedData.productService || 'Contact Request').replace(/\s+/g, ' ').trim();

      const templateParams = {
        name: cleanName,
        email: validatedData.email,
        phone: formattedPhone,
        companyRole: validatedData.companyRole,
        productService: validatedData.productService,
        inquiryDetails: validatedData.inquiryDetails || 'N/A',
        message: cleanMessage || 'N/A',
        title: cleanTitle,
        time: new Date().toLocaleString(),
        recaptchaToken,
      };

      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY);
      recaptchaRef.current?.reset();
      setRecaptchaToken('');

      lastSubmitTimeRef.current = now;
      setIsSubmitted(true);
      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours.",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        toast({
          title: "Validation Error",
          description: firstError.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: 'Submission failed',
          description: 'Please try again or contact us directly via email.',
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (e.target.name === 'phoneCountryCode') {
      setPhoneCountryCode(e.target.value);
    }
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'hello@rastudio.se',
      href: 'mailto:hello@rastudio.se',
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp Business',
      value: '+46 792 012 862',
      href: 'https://wa.me/46792012862',
    },
    {
      icon: Send,
      label: 'Telegram',
      value: '+46 792 012 862',
      href: 'https://t.me/+46792012862',
    },
    {
      icon: Clock,
      label: 'Availability',
      value: '24/7 Global Support',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Global Remote Studio',
    },
  ];

  const services = [
    'Web Development',
    'UI/UX Design',
    'AI & Automation',
    'Video Production',
    'Music Production',
    'Publishing',
    'Brand Identity',
    'Other',
  ];
  const roles = [
    'Founder / CEO',
    'CTO / Technical Lead',
    'Product Manager',
    'Marketing Lead',
    'Operations Manager',
    'Engineer',
    'Designer',
    'Sales Lead',
    'Project Manager',
    'Other',
  ];

  if (isSubmitted) {
    return (
      <>
        <Helmet>
          <title>Thank You | RA Studio</title>
        </Helmet>
        
        <main className="pt-24 pb-16 min-h-screen flex items-center justify-center">
          <NeomorphicCard className="max-w-lg mx-4 p-8 md:p-12 text-center">
            <div className="w-20 h-20 neo-inset rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-lime" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">Message Received!</h1>
            <p className="text-muted-foreground mb-6">
              Thank you for reaching out. We'll review your inquiry and get back to you within 24 hours.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="neo-button interactive text-primary hover:bg-primary/10"
            >
              Send Another Message
            </button>
          </NeomorphicCard>
        </main>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Contact | RA Studio - Get in Touch</title>
        <meta 
          name="description" 
          content="Ready to start your project? Contact RA Studio for web development, design, AI automation, and creative services. Get a response within 24 hours." 
        />
      </Helmet>
      
      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block neo-card px-4 py-2 text-sm text-primary mb-4">
              Contact Us
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-foreground">Let's Build </span>
              <span className="text-gradient-primary">Together</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Ready to bring your vision to life? Tell us about your project.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              {contactInfo.map((item) => (
                <NeomorphicCard key={item.label} className="p-6 group">
                  <div className="flex items-start gap-4">
                    <div className="neo-inset w-12 h-12 rounded-xl flex items-center justify-center shrink-0 group-hover:shadow-glow transition-shadow duration-500">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-foreground hover:text-primary transition-colors interactive">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-foreground">{item.value}</p>
                      )}
                    </div>
                  </div>
                </NeomorphicCard>
              ))}

              <NeomorphicCard className="p-6" glowColor="hsl(var(--gold) / 0.2)">
                <MessageSquare className="w-8 h-8 text-gold mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Quick Response</h3>
                <p className="text-sm text-muted-foreground">
                  We typically respond within 24 hours. For urgent projects, mention it in your message.
                </p>
              </NeomorphicCard>
            </div>

            {/* Contact Form */}
            <NeomorphicCard className="lg:col-span-2 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot field: should remain empty for real users */}
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  autoComplete="off"
                  tabIndex={-1}
                  aria-hidden="true"
                  className="hidden"
                />
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full neo-inset bg-transparent px-4 py-3 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="companyRole" className="block text-sm font-medium text-foreground mb-2">
                      Company Role *
                    </label>
                    <select
                      id="companyRole"
                      name="companyRole"
                      required
                      value={formData.companyRole}
                      onChange={handleChange}
                      className="w-full neo-inset bg-transparent px-4 py-3 rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      {roles.map(role => (
                        <option key={role} value={role} className="bg-card">
                          {role}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone (auto-detected country code, optional) & Email *
                  </label>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex gap-3">
                      <select
                        name="phoneCountryCode"
                        value={phoneCountryCode}
                        onChange={(event) => {
                          setPhoneCountryCode(event.target.value);
                          setFormData(prev => ({ ...prev, phoneCountryCode: event.target.value }));
                        }}
                        className="w-28 neo-inset bg-transparent px-3 py-3 rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                        {availableCountryCodes.map(code => (
                          <option key={code} value={code} className="bg-card">
                            {code}
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="flex-1 neo-inset bg-transparent px-4 py-3 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="234 567 8900"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full neo-inset bg-transparent px-4 py-3 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="inquiryDetails" className="block text-sm font-medium text-foreground mb-2">
                    Details Of Your Inquiry
                  </label>
                  <textarea
                    id="inquiryDetails"
                    name="inquiryDetails"
                    rows={3}
                    value={formData.inquiryDetails}
                    onChange={handleChange}
                    className="w-full neo-inset bg-transparent px-4 py-3 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <div>
                  <label htmlFor="productService" className="block text-sm font-medium text-foreground mb-2">
                    Product or Service You Are Interested In *
                  </label>
                  <select
                    id="productService"
                    name="productService"
                    required
                    value={formData.productService}
                    onChange={handleChange}
                    className="w-full neo-inset bg-transparent px-4 py-3 rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="" className="bg-card">Select a service</option>
                    {services.map(service => (
                      <option key={service} value={service} className="bg-card">
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full neo-inset bg-transparent px-4 py-3 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    placeholder="Tell us about your project: goals, timeline, examples you like..."
                  />
                </div>

                {RECAPTCHA_SITE_KEY && (
                  <div className="flex justify-center">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={RECAPTCHA_SITE_KEY}
                      hl="en"
                      onChange={(token) => setRecaptchaToken(token || '')}
                      onExpired={() => setRecaptchaToken('')}
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full neo-button interactive flex items-center justify-center gap-2 bg-primary/10 text-primary hover:bg-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </NeomorphicCard>
          </div>
        </section>
      </main>
    </>
  );
};

export default Contact;
