import { useState, useEffect } from 'react';

interface SplashScreenProps {
  onSkip: () => void;
}

const SplashScreen = ({ onSkip }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Prevent body scroll while splash is visible
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isVisible]);

  const handleSkip = () => {
    setIsVisible(false);
    setTimeout(onSkip, 300);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-background transition-opacity duration-300">
      {/* YouTube Video Background */}
      <div className="absolute inset-0 overflow-hidden">
        <iframe
          src="https://www.youtube.com/embed/8koJ0B_RNRQ?autoplay=1&mute=1&loop=1&playlist=8koJ0B_RNRQ&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
          title="RA Studio Splash Video"
          className="absolute top-1/2 left-1/2 w-[177.78vh] min-w-full h-[56.25vw] min-h-full -translate-x-1/2 -translate-y-1/2"
          style={{ pointerEvents: 'none' }}
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/40" />

      {/* Logo Animation */}
      <div className="absolute bottom-24 right-12 md:bottom-28 md:right-20 text-right animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-wider mb-3">
          <span className="text-primary">RA</span> Studio
        </h1>
        <p className="text-muted-foreground text-base md:text-lg tracking-[0.3em] uppercase text-center">
          Designs Engineered
        </p>
      </div>

      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 px-8 py-4 
                   bg-foreground/10 hover:bg-foreground/20 
                   backdrop-blur-sm border border-foreground/20 
                   rounded-full text-foreground/70 hover:text-foreground 
                   text-lg tracking-widest uppercase
                   transition-all duration-300 hover:scale-105
                   focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        Skip Intro
      </button>

      {/* Pulse Indicator */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-1 h-8 rounded-full bg-gradient-to-b from-primary/60 to-transparent animate-pulse" />
      </div>
    </div>
  );
};

export default SplashScreen;
