import Marquee from '@/components/Marquee';
import { Zap, Code, Palette, Cpu, Sparkles, Music } from 'lucide-react';

const MarqueeSection = () => {
  const marqueeItems = [
    { icon: Zap, text: 'Digital Power for Creators', color: 'text-primary' },
    { icon: Code, text: 'Where Code Meets Creativity', color: 'text-accent' },
    { icon: Palette, text: 'Tech Meets Imagination', color: 'text-motion' },
    { icon: Cpu, text: 'AI-Powered Solutions', color: 'text-labs' },
    { icon: Sparkles, text: 'Premium Design Systems', color: 'text-gold' },
    { icon: Music, text: 'Broadcast-Quality Audio', color: 'text-sound' },
  ];

  return (
    <section className="relative py-8 border-y border-border/30 bg-card/50 overflow-hidden">
      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
      <Marquee speed={40} pauseOnHover>
        {marqueeItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 px-8 py-2 group interactive"
          >
            <div className="neo-inset p-3 rounded-xl group-hover:shadow-glow transition-shadow duration-500">
              <item.icon className={`w-6 h-6 ${item.color}`} />
            </div>
            <span className="text-lg md:text-xl font-semibold text-foreground whitespace-nowrap">
              {item.text}
            </span>
            <span className="text-primary text-2xl">•</span>
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default MarqueeSection;
