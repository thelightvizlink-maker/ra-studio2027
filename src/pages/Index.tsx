import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import HeroSection from '@/components/sections/HeroSection';
import MarqueeSection from '@/components/sections/MarqueeSection';
import ServicesSection from '@/components/sections/ServicesSection';
import StatsSection from '@/components/sections/StatsSection';
import DivisionsSection from '@/components/sections/DivisionsSection';
import SplashScreen from '@/components/SplashScreen';

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [hasVisited, setHasVisited] = useState(false);

  useEffect(() => {
    // Check if user has already seen splash this session
    const visited = sessionStorage.getItem('ra-splash-seen');
    if (visited) {
      setShowSplash(false);
      setHasVisited(true);
    }
  }, []);

  const handleSkipSplash = () => {
    setShowSplash(false);
    sessionStorage.setItem('ra-splash-seen', 'true');
  };

  return (
    <>
      <Helmet>
        <title>RA Studio | Designs Engineered - Where Art Meets Engineering</title>
        <meta 
          name="description" 
          content="RA Studio is a creative-tech ecosystem bridging design, automation, AI workflows, music production, publishing, and blockchain art. Premium web development and design solutions." 
        />
        <meta name="keywords" content="web development, UI/UX design, AI automation, video production, music production, brand identity, creative tech" />
        <link rel="canonical" href="https://rastudio.dev" />
      </Helmet>

      {showSplash && !hasVisited && <SplashScreen onSkip={handleSkipSplash} />}
      
      <main>
        <HeroSection />
        <MarqueeSection />
        <ServicesSection />
        <StatsSection />
        <DivisionsSection />
      </main>
    </>
  );
};

export default Index;
