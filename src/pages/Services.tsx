import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import NeomorphicCard from '@/components/NeomorphicCard';
import { 
  Code2, 
  Palette, 
  Bot, 
  Video, 
  Music, 
  Box,
  Search,
  BookOpen,
  Layers,
  ArrowRight,
  Check
} from 'lucide-react';

const Services = () => {
  const divisions = [
    {
      id: 'studio',
      name: 'RA Studio',
      subtitle: 'Web & Product',
      color: 'studio',
      description: 'Traditional digital art & apps production',
      categories: [
        {
          name: 'Brand Identity',
          services: [
            { tier: 'Basic', price: '$0.99', features: ['2D logo / simple asset', 'PNG/SVG 1000×1000', '1–3 days'] },
            { tier: 'Standard', price: '$1.99', features: ['4000×4000', 'Up to 3 revisions', '2–5 days'] },
            { tier: 'Pro / 3D', price: '$4.99–$8.99', features: ['3D brand avatar', 'Detailed 3D mark', '4–14 days'] },
          ],
        },
        {
          name: 'Front-End Development',
          services: [
            { tier: 'Basic', price: '$299', promo: '$99', features: ['4 pages responsive', '3–5 days'] },
            { tier: 'Standard', price: '$549', promo: '$249', features: ['4 pages + CMS', 'Custom design + basic SEO', '5–10 days'] },
            { tier: 'Pro', price: '$999', promo: '$499', features: ['TypeScript', 'Advanced animation + full SEO', '10–20 days'] },
          ],
        },
        {
          name: 'Back-End Development',
          services: [
            { tier: 'Basic', price: '$799', promo: '$399', features: ['CRUD + database', '5–8 days'] },
            { tier: 'Standard', price: '$1,299', promo: '$649', features: ['Auth + data model', 'Admin dashboard', '8–15 days'] },
            { tier: 'Pro', price: '$2,499', promo: '$1,749', features: ['Microservices', 'Load testing + security audit', '15–30 days'] },
          ],
        },
        {
          name: 'UI/UX Design',
          services: [
            { tier: 'Basic', price: '$799', promo: '$199', features: ['1 module UI', 'Static prototype', '5–7 days'] },
            { tier: 'Standard', price: '$1,499', promo: '$550', features: ['5 screens', 'Interactive prototype + code', '10–14 days'] },
            { tier: 'Pro', price: '$3,299', promo: '$1,200', features: ['20+ screens', 'Design system + testing', '20–30 days'] },
          ],
        },
      ],
    },
    {
      id: 'labs',
      name: 'RA Labs',
      subtitle: 'AI & Prompt Engineering',
      color: 'labs',
      description: 'AI-assisted production optimized for speed',
      categories: [
        {
          name: 'AI Front-End Sprint',
          badge: '50% Less • Ships in 24h',
          services: [
            { tier: 'Basic', price: '$149', promo: '$49', features: ['4 pages template-to-custom', '24h first draft'] },
            { tier: 'Standard', price: '$275', promo: '$125', features: ['4 pages + CMS + SEO', '24h first draft'] },
            { tier: 'Pro', price: '$499', promo: '$249', features: ['TypeScript + animation', 'Full SEO', '24h first draft'] },
          ],
        },
        {
          name: 'Workflow Automation',
          services: [
            { tier: 'Basic', price: '$499', promo: '$180', features: ['1,000 inquiries/month', 'Attachments', '7–14 days'] },
            { tier: 'Standard', price: '$1,199', promo: '$399', features: ['5,000 inquiries', 'Multi-workflow', '14–26 days'] },
            { tier: 'Pro', price: '$2,799', promo: '$1,100', features: ['10k+ inquiries', 'Reporting + governance', '26–41 days'] },
          ],
        },
      ],
    },
    {
      id: 'motion',
      name: 'RA Motion',
      subtitle: 'Video & Editing',
      color: 'motion',
      description: 'Cinematic storytelling and motion design',
      categories: [
        {
          name: 'Video / Photo Editing',
          services: [
            { tier: 'Basic', price: '$599', promo: '$199', features: ['1–3 min social clip', 'Audio mix'] },
            { tier: 'Standard', price: '$1,299', promo: '$499', features: ['10–15 min', 'Motion graphics'] },
            { tier: 'Pro', price: '$2,799', promo: '$1,099', features: ['30–60 min promo', 'Multi-camera'] },
          ],
        },
        {
          name: '2D & 3D Animation',
          services: [
            { tier: 'Basic', price: '$1,200', promo: '$399', features: ['2D illustration', 'Simple motion (GIF)'] },
            { tier: 'Standard', price: '$2,800', promo: '$1,099', features: ['3D render', '5–10 sec animation'] },
            { tier: 'Pro', price: '$5,500', promo: '$2,350', features: ['30–60 sec', 'Broadcast-ready sequence'] },
          ],
        },
      ],
    },
    {
      id: 'press',
      name: 'RA Press',
      subtitle: 'Docs & Books',
      color: 'press',
      description: 'Professional publishing solutions',
      categories: [
        {
          name: 'Publishing Services',
          services: [
            { tier: 'Book Cover + Interior', price: '$210', features: ['120-page e-book design'] },
            { tier: 'Ghostwriting + Editing', price: '$395', features: ['5,000-word guide', 'Layout included'] },
            { tier: 'Full Publishing', price: '$799', features: ['ISBN + e-book + print', 'Marketing package'] },
          ],
        },
      ],
    },
    {
      id: 'sound',
      name: 'RA Sound',
      subtitle: 'Music Production',
      color: 'sound',
      description: 'Broadcast-quality audio production',
      categories: [
        {
          name: 'Audio Production',
          services: [
            { tier: 'Brand Jingle', price: '$799', promo: '$250', features: ['15–30 seconds'] },
            { tier: 'Track Production', price: '$1,499', promo: '$888', features: ['3–5 min mixed/mastered'] },
            { tier: 'Album Collaboration', price: '$4,999', promo: '$1,999', features: ['Full album', 'Distribution included'] },
          ],
        },
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Services & Pricing | RA Studio - Designs Engineered</title>
        <meta 
          name="description" 
          content="Explore RA Studio's comprehensive services: web development, AI automation, video production, music, and publishing. Premium quality at accessible prices." 
        />
      </Helmet>
      
      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <span className="inline-block neo-card px-4 py-2 text-sm text-primary mb-4">
              Services & Pricing
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="text-foreground">Premium Services, </span>
              <span className="text-gradient-primary">Accessible Prices</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Five specialized divisions. One unified ecosystem. First 100 clients get exclusive early-bird pricing.
            </p>
          </div>
        </section>

        {/* Divisions */}
        {divisions.map((division) => (
          <section 
            key={division.id} 
            id={division.id}
            className="container mx-auto px-4 py-16 border-t border-border/30"
          >
            <div className="mb-12">
              <h2 className={`text-3xl md:text-4xl font-bold text-${division.color} mb-2`}>
                {division.name}
              </h2>
              <p className="text-muted-foreground">{division.subtitle} — {division.description}</p>
            </div>

            <div className="space-y-12">
              {division.categories.map((category) => (
                <div key={category.name}>
                  <div className="flex items-center gap-3 mb-6">
                    <h3 className="text-xl font-semibold text-foreground">{category.name}</h3>
                    {category.badge && (
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-labs/20 text-labs">
                        {category.badge}
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {category.services.map((service, idx) => (
                      <NeomorphicCard 
                        key={idx} 
                        className="p-6 group"
                        glowColor={`hsl(var(--${division.color}) / 0.2)`}
                      >
                        <div className="flex flex-col h-full">
                          <h4 className="text-lg font-semibold text-foreground mb-2">
                            {service.tier}
                          </h4>
                          
                          <div className="mb-4">
                            {service.promo ? (
                              <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold text-primary">{service.promo}</span>
                                <span className="text-sm text-muted-foreground line-through">{service.price}</span>
                                <span className="text-xs px-2 py-0.5 rounded bg-lime/20 text-lime">First 100</span>
                              </div>
                            ) : (
                              <span className="text-2xl font-bold text-primary">{service.price}</span>
                            )}
                          </div>
                          
                          <ul className="space-y-2 flex-grow">
                            {service.features.map((feature, fidx) => (
                              <li key={fidx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <Check className={`w-4 h-4 text-${division.color} shrink-0 mt-0.5`} />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                          
                          <Link
                            to="/contact"
                            className={`mt-6 neo-button interactive text-center text-sm text-${division.color} hover:bg-${division.color}/10`}
                          >
                            Get Started
                          </Link>
                        </div>
                      </NeomorphicCard>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </>
  );
};

export default Services;
