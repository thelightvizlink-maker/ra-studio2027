import { Link } from 'react-router-dom';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';
import { useLanguage } from '@/i18n/LanguageContext';

const HeroSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(``)` }}
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      </div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Floating Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 neo-card px-4 py-2 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">{t.hero.badge}</span>
          </div>

          {/* Headline */}
          <h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
            style={{ animationDelay: '0.1s' }}
          >
            <span className="text-foreground">{t.hero.title1}</span>
            <span className="text-gradient-primary">{t.hero.titleArt}</span>
            <br />
            <span className="text-foreground">{t.hero.title2}</span>
            <span className="text-gradient-accent">{t.hero.titleEng}</span>
          </h1>

          {/* Subheadline */}
          <p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            {t.hero.subtitle}
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in"
            style={{ animationDelay: '0.3s' }}
          >
            <Link
              to="/services"
              className="group neo-button interactive flex items-center gap-3 bg-primary/10 text-primary hover:bg-primary/20"
            >
              <span>{t.hero.exploreWork}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <button className="group neo-button interactive flex items-center gap-3 text-muted-foreground hover:text-foreground">
              <div className="w-10 h-10 rounded-full neo-inset flex items-center justify-center">
                <Play className="w-4 h-4 text-primary" />
              </div>
              <span>{t.hero.watchShowreel}</span>
            </button>
          </div>

          {/* Stats Preview */}
          <div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 animate-fade-in"
            style={{ animationDelay: '0.4s' }}
          >
            {[
              { label: t.hero.stats.linesOfCode, value: '1M+' },
              { label: t.hero.stats.globalClients, value: '200+' },
              { label: t.hero.stats.loadTime, value: '3s' },
              { label: t.hero.stats.support, value: '24/7' },
            ].map((stat, index) => (
              <div 
                key={stat.label} 
                className="neo-card p-4 text-center interactive"
                style={{ animationDelay: `s` }}
              >
                <p className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
