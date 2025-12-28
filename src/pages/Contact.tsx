import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import NeomorphicCard from '@/components/NeomorphicCard';
import { Mail, MapPin, Send, Clock, MessageSquare, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const FLEXSUBMIT_API = 'https://api.flexsubmit.com/api/forms/afa94b93-130a-4bb5-b9fd-54dd01fe0f03/submit';

// Input validation schema
const contactSchema = z.object({
  fullName: z.string().trim().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  companyRole: z.string().trim().max(150, 'Company/Role must be less than 150 characters').optional(),
  productService: z.string().min(1, 'Please select a service'),
  inquiryDetails: z.string().trim().max(2000, 'Inquiry details must be less than 2000 characters').optional(),
  phone: z.string().trim().max(20, 'Phone number must be less than 20 characters').regex(/^[\d\s+\-()]*$/, 'Invalid phone number format').optional().or(z.literal('')),
  email: z.string().trim().email('Invalid email address').max(255, 'Email must be less than 255 characters'),
  additionalServices: z.string().trim().max(500, 'Additional services must be less than 500 characters'),
  message: z.string().trim().max(5000, 'Message must be less than 5000 characters').optional(),
});

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    companyRole: '',
    productService: '',
    inquiryDetails: '',
    phone: '',
    email: '',
    additionalServices: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validate input before submission
      const validatedData = contactSchema.parse(formData);
      
      // Map to FlexSubmit field IDs with validated & sanitized data
      const payload = {
        'field_1763358633479_og0gmx0iz': validatedData.fullName,
        'field_1763358761274_zshgnuryz': validatedData.companyRole || '',
        'field_1763358935302_752wnf4ru': validatedData.productService,
        'field_1763505572085_zldwid56z': validatedData.inquiryDetails || '',
        'field_1763360341867_o06bnncyj': validatedData.phone || '',
        'field_1763360382011_tm7e73wyo': validatedData.email,
        'field_1763502052021_zbyphzc4f': validatedData.additionalServices,
        'field_1763505769466_t0qha8i8e': validatedData.message || '',
      };

      const response = await fetch(FLEXSUBMIT_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

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
          title: "Submission failed",
          description: "Please try again or contact us directly via email.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'contact@rastudio.dev',
      href: 'mailto:contact@rastudio.dev',
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
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
                      First Name & Last Name *
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
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email Address *
                    </label>
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

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="companyRole" className="block text-sm font-medium text-foreground mb-2">
                      Company Name & Role
                    </label>
                    <input
                      type="text"
                      id="companyRole"
                      name="companyRole"
                      value={formData.companyRole}
                      onChange={handleChange}
                      className="w-full neo-inset bg-transparent px-4 py-3 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Your Company - CEO"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full neo-inset bg-transparent px-4 py-3 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
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
                    <label htmlFor="additionalServices" className="block text-sm font-medium text-foreground mb-2">
                      Additional Products & Services *
                    </label>
                    <input
                      type="text"
                      id="additionalServices"
                      name="additionalServices"
                      required
                      value={formData.additionalServices}
                      onChange={handleChange}
                      className="w-full neo-inset bg-transparent px-4 py-3 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Any other services needed..."
                    />
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
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Leave us a message
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
