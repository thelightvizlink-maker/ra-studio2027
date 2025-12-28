import { Helmet } from 'react-helmet-async';
import NeomorphicCard from '@/components/NeomorphicCard';
import { Sparkles, Target, Users, Globe, Zap, Shield } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Precision Engineering',
      description: 'Every pixel, every line of code is crafted with intention. We build solutions that work in real products.',
    },
    {
      icon: Zap,
      title: 'AI as Multiplier',
      description: 'AI reduces waste, accelerates drafts, and raises consistency—but human judgment ensures quality.',
    },
    {
      icon: Users,
      title: 'Client Partnership',
      description: 'We\'re not just vendors; we\'re partners in your success. Your vision becomes our mission.',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Everything delivered digitally, adapted to your timezone and tools. Borderless creativity.',
    },
    {
      icon: Shield,
      title: 'Quality First',
      description: 'Premium doesn\'t mean expensive—it means exceptional. Every project receives craft-level attention.',
    },
    {
      icon: Sparkles,
      title: 'Innovation',
      description: 'We stay at the cutting edge, bringing the latest in design, technology, and AI to every project.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>About RA Studio | Our Story & Philosophy</title>
        <meta 
          name="description" 
          content="Learn about RA Studio's mission to bridge the divide between creative expression and technical rigour. Our story, values, and approach to creative-tech solutions." 
        />
      </Helmet>
      
      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block neo-card px-4 py-2 text-sm text-primary mb-4">
              About Us
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-foreground">The Story Behind </span>
              <span className="text-gradient-primary">RA Studio</span>
            </h1>
          </div>
        </section>

        {/* Story Section */}
        <section className="container mx-auto px-4 py-16">
          <NeomorphicCard className="max-w-4xl mx-auto p-8 md:p-12">
            <div className="prose prose-invert max-w-none">
              <p className="text-xl text-foreground leading-relaxed mb-6">
                "When I founded RA Studio, I set out to erase the false divide between creative expression and technical rigour."
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We are a creative-tech ecosystem bridging design, automation, AI workflows, music production, publishing, and blockchain art. What started as a vision to deliver premium experiences has evolved into a comprehensive platform serving founders, creators, small businesses, and teams worldwide.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our approach is simple: visuals that are not just pretty—they're built to work in real products. Scalable, consistent, fast to load, accessible, and ready for real users. This is what "Designs Engineered" truly means.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, RA Studio operates through five specialized divisions, each bringing unique expertise while sharing a common philosophy: deliver exceptional quality at accessible prices, powered by smart workflows and genuine care for every project.
              </p>
            </div>
          </NeomorphicCard>
        </section>

        {/* Values Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-foreground">Our </span>
              <span className="text-gradient-accent">Core Values</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {values.map((value) => (
              <NeomorphicCard key={value.title} className="p-6 group">
                <div className="neo-inset w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:shadow-glow transition-shadow duration-500">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </NeomorphicCard>
            ))}
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <NeomorphicCard className="p-8" glowColor="hsl(var(--studio) / 0.2)">
              <h3 className="text-2xl font-bold text-studio mb-4">RA Studio</h3>
              <p className="text-muted-foreground leading-relaxed">
                Craft-driven traditional production. High-touch projects where art direction, unique design, complex custom builds, and comprehensive brand systems require the full depth of human creativity and technical expertise.
              </p>
            </NeomorphicCard>
            
            <NeomorphicCard className="p-8" glowColor="hsl(var(--labs) / 0.2)">
              <h3 className="text-2xl font-bold text-labs mb-4">RA Labs</h3>
              <p className="text-muted-foreground leading-relaxed">
                AI-assisted production optimized for speed and cost. Fast front-end shipping, AI-assisted brand drafts, and rapid iterations. Same quality standards, accelerated delivery.
              </p>
            </NeomorphicCard>
          </div>
        </section>
      </main>
    </>
  );
};

export default About;
