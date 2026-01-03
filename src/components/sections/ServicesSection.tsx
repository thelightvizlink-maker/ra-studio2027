import { Link } from 'react-router-dom';
import NeomorphicCard from '@/components/NeomorphicCard';
import { useLanguage } from '@/i18n/LanguageContext';
import { 
  Code2, 
  Palette, 
  Bot, 
  Video, 
  Music, 
  Box, 
  Image,
  ArrowUpRight
} from 'lucide-react';

const ServicesSection = () => {
  const { t } = useLanguage();
  
  const services = [
    {
      icon: Code2,
      title: t.services.items.customSoftware.title,
      description: t.services.items.customSoftware.description,
      color: 'text-studio',
      glowColor: 'hsl(193 55% 69% / 0.2)',
    },
    {
      icon: Palette,
      title: t.services.items.brandIdentity.title,
      description: t.services.items.brandIdentity.description,
      color: 'text-primary',
      glowColor: 'hsl(193 55% 69% / 0.2)',
    },
    {
      icon: Bot,
      title: t.services.items.automation.title,
      description: t.services.items.automation.description,
      color: 'text-labs',
      glowColor: 'hsl(340 84% 60% / 0.2)',
    },
    {
      icon: Video,
      title: t.services.items.video.title,
      description: t.services.items.video.description,
      color: 'text-motion',
      glowColor: 'hsl(22 100% 64% / 0.2)',
    },
    {
      icon: Music,
      title: t.services.items.music.title,
      description: t.services.items.music.description,
      color: 'text-sound',
      glowColor: 'hsl(184 59% 30% / 0.2)',
    },
    {
      icon: Box,
      title: t.services.items.modeling.title,
      description: t.services.items.modeling.description,
      color: 'text-motion',
      glowColor: 'hsl(22 100% 64% / 0.2)',
    },
    {
      icon: Image,
      title: t.services.items.rendering.title,
      description: t.services.items.rendering.description,
      color: 'text-gold',
      glowColor: 'hsl(42 57% 59% / 0.2)',
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-primary/5 to-transparent blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block neo-card px-4 py-2 text-sm text-primary mb-4">
            {t.services.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">{t.services.title}</span>
            <span className="text-gradient-primary">{t.services.titleHighlight}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.services.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <NeomorphicCard
              key={service.title}
              className="p-6 group"
              glowColor={service.glowColor}
            >
              <div className="flex flex-col h-full">
                <div className="neo-inset w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:shadow-glow transition-shadow duration-500">
                  <service.icon className={`w-7 h-7 ${service.color}`} />
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
                  {service.description}
                </p>

                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 text-primary text-sm font-medium mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <span>{t.services.learnMore}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </NeomorphicCard>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 neo-button interactive text-primary hover:bg-primary/10"
          >
            <span>{t.services.viewAll}</span>
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;