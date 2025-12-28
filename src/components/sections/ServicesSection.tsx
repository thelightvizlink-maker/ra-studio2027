import { Link } from 'react-router-dom';
import NeomorphicCard from '@/components/NeomorphicCard';
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
  const services = [
    {
      icon: Code2,
      title: 'Custom Software Development',
      description: 'Bespoke solutions tailored to your specific business needs. Full-stack web apps, dashboards, and enterprise systems.',
      color: 'text-studio',
      glowColor: 'hsl(193 55% 69% / 0.2)',
    },
    {
      icon: Palette,
      title: 'Brand Identity Design',
      description: 'Eye-catching visual identities that resonate. From logo design to complete brand systems.',
      color: 'text-primary',
      glowColor: 'hsl(193 55% 69% / 0.2)',
    },
    {
      icon: Bot,
      title: 'Workflow Automation & AI',
      description: 'Intelligent automation and AI-powered solutions. Reduce waste, accelerate processes, and scale efficiently.',
      color: 'text-labs',
      glowColor: 'hsl(340 84% 60% / 0.2)',
    },
    {
      icon: Video,
      title: 'Video Production',
      description: 'Cinematic storytelling at its finest. Social clips, promotional videos, and broadcast-ready content.',
      color: 'text-motion',
      glowColor: 'hsl(22 100% 64% / 0.2)',
    },
    {
      icon: Music,
      title: 'Music Production',
      description: 'Professional audio production. Brand jingles, track production, and album collaboration.',
      color: 'text-sound',
      glowColor: 'hsl(184 59% 30% / 0.2)',
    },
    {
      icon: Box,
      title: '3D Modeling',
      description: 'Detailed 3D models and visualizations. Product renders, architectural visualization, and animations.',
      color: 'text-motion',
      glowColor: 'hsl(22 100% 64% / 0.2)',
    },
    {
      icon: Image,
      title: 'Photorealistic Rendering',
      description: 'High-quality renders for architecture and products. Print-ready stills and animated sequences.',
      color: 'text-gold',
      glowColor: 'hsl(42 57% 59% / 0.2)',
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-primary/5 to-transparent blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block neo-card px-4 py-2 text-sm text-primary mb-4">
            What We Do
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Services </span>
            <span className="text-gradient-primary">Overview</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive creative-tech ecosystem. Premium design meets technical excellence.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <NeomorphicCard
              key={service.title}
              className="p-6 group"
              glowColor={service.glowColor}
            >
              <div className="flex flex-col h-full">
                {/* Icon */}
                <div className="neo-inset w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:shadow-glow transition-shadow duration-500">
                  <service.icon className={`w-7 h-7 ${service.color}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
                  {service.description}
                </p>

                {/* Link */}
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 text-primary text-sm font-medium mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <span>Learn more</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </NeomorphicCard>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 neo-button interactive text-primary hover:bg-primary/10"
          >
            <span>View All Services</span>
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
