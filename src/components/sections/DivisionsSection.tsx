import { useState } from 'react';
import { Link } from 'react-router-dom';
import NeomorphicCard from '@/components/NeomorphicCard';
import { ArrowUpRight } from 'lucide-react';

// Import division logos
import raStudioLogo from '@/assets/ra-studio-logo.png';
import raLabsLogo from '@/assets/ra-labs-logo.png';
import raMotionLogo from '@/assets/ra-motion-logo.png';
import raPressLogo from '@/assets/ra-press-logo.png';
import raSoundLogo from '@/assets/ra-sound-logo.jpg';

const DivisionsSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const divisions = [
    {
      name: 'RA Studio',
      subtitle: 'Web & Product',
      description: 'Traditional digital art & apps production. Custom software, brand identity, UI/UX design, and SEO.',
      logo: raStudioLogo,
      color: 'studio',
      services: ['Front-End Development', 'Back-End Development', 'UI/UX Design', 'Brand Identity'],
    },
    {
      name: 'RA Labs',
      subtitle: 'AI & Prompt Engineering',
      description: 'AI-assisted production optimized for speed and cost. Workflow automation and intelligent solutions.',
      logo: raLabsLogo,
      color: 'labs',
      services: ['AI Front-End Sprint', 'Workflow Automation', 'AI 3D Products', 'Prompt Engineering'],
    },
    {
      name: 'RA Motion',
      subtitle: 'Video & Editing',
      description: 'Cinematic storytelling and motion design. Video production, 2D/3D animation, and photoreal rendering.',
      logo: raMotionLogo,
      color: 'motion',
      services: ['Video Editing', '2D Animation', '3D Modeling', 'Photoreal Rendering'],
    },
    {
      name: 'RA Press',
      subtitle: 'Docs & Books',
      description: 'Professional publishing solutions. Book design, ghostwriting, editing, and full publishing packages.',
      logo: raPressLogo,
      color: 'press',
      services: ['Book Cover Design', 'Interior Layout', 'Ghostwriting', 'Publishing Package'],
    },
    {
      name: 'RA Sound',
      subtitle: 'Music Production',
      description: 'Broadcast-quality audio production. Brand jingles, track production, and album collaboration.',
      logo: raSoundLogo,
      color: 'sound',
      services: ['Brand Jingles', 'Track Production', 'Album Collaboration', 'Audio Mixing'],
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-accent/5 to-transparent blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block neo-card px-4 py-2 text-sm text-gold mb-4">
            Our Ecosystem
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">5 Specialized </span>
            <span className="text-gradient-gold">Divisions</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A unified creative-tech ecosystem. Each division brings specialized expertise to deliver exceptional results.
          </p>
        </div>

        {/* Divisions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {divisions.map((division, index) => (
            <NeomorphicCard
              key={division.name}
              className={`division-${division.color} p-6 group relative overflow-hidden ${
                index === 4 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
              glowColor={`hsl(var(--${division.color}) / 0.3)`}
            >
              {/* Background glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at center, hsl(var(--${division.color}) / 0.1) 0%, transparent 70%)`,
                }}
              />
              
              <div className="relative z-10">
                {/* Logo */}
                <div className="relative w-full h-40 mb-4 rounded-xl overflow-hidden neo-inset">
                  <img
                    src={division.logo}
                    alt={division.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <div>
                    <h3 className={`text-xl font-bold text-${division.color}`}>
                      {division.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {division.subtitle}
                    </p>
                  </div>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {division.description}
                  </p>

                  {/* Services Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {division.services.slice(0, 3).map((service) => (
                      <span
                        key={service}
                        className="text-xs px-2 py-1 rounded-lg neo-inset text-muted-foreground"
                      >
                        {service}
                      </span>
                    ))}
                    {division.services.length > 3 && (
                      <span className="text-xs px-2 py-1 text-muted-foreground">
                        +{division.services.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Hover Link */}
                <Link
                  to="/services"
                  className={`inline-flex items-center gap-2 text-${division.color} text-sm font-medium mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                >
                  <span>Explore division</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </NeomorphicCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DivisionsSection;
