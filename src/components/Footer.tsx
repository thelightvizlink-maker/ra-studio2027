import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: 'Web Development', path: '/services#web' },
      { name: 'UI/UX Design', path: '/services#design' },
      { name: 'AI & Automation', path: '/services#ai' },
      { name: 'Video Production', path: '/services#video' },
      { name: 'Music Production', path: '/services#music' },
    ],
    company: [
      { name: 'About', path: '/about' },
      { name: 'FAQ', path: '/faq' },
      { name: 'Contact', path: '/contact' },
    ],
    divisions: [
      { name: 'RA Studio', color: 'text-studio' },
      { name: 'RA Labs', color: 'text-labs' },
      { name: 'RA Motion', color: 'text-motion' },
      { name: 'RA Press', color: 'text-press' },
      { name: 'RA Sound', color: 'text-sound' },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:contact@rastudio.dev', label: 'Email' },
  ];

  return (
    <footer className="relative mt-32 border-t border-border/50">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background to-transparent pointer-events-none" />
      
      <div className="relative container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="inline-block interactive">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 neo-inset rounded-xl flex items-center justify-center">
                  <span className="text-2xl font-bold text-gradient-primary">RA</span>
                </div>
                <div>
                  <p className="font-bold text-xl text-foreground">RA Studio</p>
                  <p className="text-xs text-muted-foreground tracking-widest">DESIGNS ENGINEERED</p>
                </div>
              </div>
            </Link>
            
            <p className="text-muted-foreground text-sm leading-relaxed">
              Where art meets engineering. Premium creative-tech solutions for founders, creators, and innovators worldwide.
            </p>
            
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="interactive neo-card p-3 rounded-xl text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="font-semibold text-foreground mb-6">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="interactive text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Divisions Column */}
          <div>
            <h3 className="font-semibold text-foreground mb-6">Divisions</h3>
            <ul className="space-y-3">
              {footerLinks.divisions.map((division) => (
                <li key={division.name}>
                  <span className={`text-sm ${division.color}`}>
                    {division.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-semibold text-foreground mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted-foreground text-sm">
                <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>contact@rastudio.dev</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground text-sm">
                <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>Available 24/7</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground text-sm">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>Global Remote Studio</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {currentYear} RA Studio. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span className="cursor-default">
              Privacy Policy
            </span>
            <span className="cursor-default">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
