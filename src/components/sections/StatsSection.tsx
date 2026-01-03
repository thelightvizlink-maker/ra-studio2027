import AnimatedCounter from '@/components/AnimatedCounter';
import NeomorphicCard from '@/components/NeomorphicCard';
import { useLanguage } from '@/i18n/LanguageContext';
import { Code, Users, Zap, Clock, Globe } from 'lucide-react';

const StatsSection = () => {
  const { t } = useLanguage();
  
  const stats = [
    {
      icon: Code,
      value: 1000000,
      suffix: '+',
      label: t.stats.items.code.label,
      description: t.stats.items.code.description,
    },
    {
      icon: Users,
      value: 200,
      suffix: '+',
      label: t.stats.items.clients.label,
      description: t.stats.items.clients.description,
    },
    {
      icon: Zap,
      value: 3,
      suffix: 's',
      label: t.stats.items.loadTime.label,
      description: t.stats.items.loadTime.description,
    },
    {
      icon: Clock,
      value: 24,
      suffix: '/7',
      label: t.stats.items.support.label,
      description: t.stats.items.support.description,
    },
    {
      icon: Globe,
      value: 50,
      suffix: '+',
      label: t.stats.items.countries.label,
      description: t.stats.items.countries.description,
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/50 to-transparent" />
      
      <div className="relative container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block neo-card px-4 py-2 text-sm text-accent mb-4">
            {t.stats.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">{t.stats.title}</span>
            <span className="text-gradient-accent">{t.stats.titleHighlight}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.stats.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {stats.map((stat) => (
            <NeomorphicCard
              key={stat.label}
              className="p-6 text-center group"
            >
              <div className="neo-inset w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-glow transition-shadow duration-500">
                <stat.icon className="w-7 h-7 text-primary" />
              </div>
              
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                <AnimatedCounter 
                  end={stat.value} 
                  suffix={stat.suffix}
                  className="text-gradient-primary"
                />
              </div>
              
              <h3 className="text-sm font-semibold text-foreground mb-1">
                {stat.label}
              </h3>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </NeomorphicCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
