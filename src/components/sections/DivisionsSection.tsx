import { useState } from 'react';
import { Link } from 'react-router-dom';
import NeomorphicCard from '@/components/NeomorphicCard';
import { useLanguage } from '@/i18n/LanguageContext';
import { ArrowUpRight } from 'lucide-react';

import raStudioLogo from '@/assets/ra-studio-logo.png';
import raLabsLogo from '@/assets/ra-labs-logo.png';
import raMotionLogo from '@/assets/ra-motion-logo.png';
import raPressLogo from '@/assets/ra-press-logo.png';
import raSoundLogo from '@/assets/ra-sound-logo.jpg';

const DivisionsSection = () => {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const divisions = [
    {
      name: 'RA Studio',
      subtitle: t.divisions.items.studio.subtitle,
      description: t.divisions.items.studio.description,
      logo: raStudioLogo,
      color: 'studio',
      services: t.divisions.items.studio.services,
    },
    {
      name: 'RA Labs',
      subtitle: t.divisions.items.labs.subtitle,
      description: t.divisions.items.labs.description,
      logo: raLabsLogo,
      color: 'labs',
      services: t.divisions.items.labs.services,
    },
    {
      name: 'RA Motion',
      subtitle: t.divisions.items.motion.subtitle,
      description: t.divisions.items.motion.description,
      logo: raMotionLogo,
      color: 'motion',
      services: t.divisions.items.motion.services,
    },
    {
      name: 'RA Press',
      subtitle: t.divisions.items.press.subtitle,
      description: t.divisions.items.press.description,
      logo: raPressLogo,
      color: 'press',
      services: t.divisions.items.press.services,
    },
    {
      name: 'RA Sound',
      subtitle: t.divisions.items.sound.subtitle,
      description: t.divisions.items.sound.description,
      logo: raSoundLogo,
      color: 'sound',
      services: t.divisions.items.sound.services,
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-accent/5 to-transparent blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block neo-card px-4 py-2 text-sm text-gold mb-4">
            {t.divisions.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">{t.divisions.title}</span>
            <span className="text-gradient-gold">{t.divisions.titleHighlight}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.divisions.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {divisions.map((division, index) => (
            <NeomorphicCard
              key={division.name}
              className={`division-${division.color} p-6 group relative overflow-hidden ${
                index === 4 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
              glowColor={`hsl(var(--${division.color}) / 0.3)`}
            >
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at center, hsl(var(--${division.color}) / 0.1) 0%, transparent 70%)`,
                }}
              />
              
              <div className="relative z-10">
                <div className="relative w-full h-40 mb-4 rounded-xl overflow-hidden neo-inset">
                  <img
                    src={division.logo}
                    alt={division.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                </div>

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
                        +{division.services.length - 3} {t.divisions.more}
                      </span>
                    )}
                  </div>
                </div>

                <Link
                  to="/services"
                  className={`inline-flex items-center gap-2 text-${division.color} text-sm font-medium mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                >
                  <span>{t.divisions.exploreDivision}</span>
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