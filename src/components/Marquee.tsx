import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MarqueeProps {
  children: ReactNode;
  speed?: number;
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  className?: string;
}

const Marquee = ({
  children,
  speed = 30,
  direction = 'left',
  pauseOnHover = true,
  className,
}: MarqueeProps) => {
  return (
    <div className={cn('marquee-container', className)}>
      <div
        className={cn(
          'marquee-content',
          pauseOnHover && 'hover:[animation-play-state:paused]'
        )}
        style={{
          animationDirection: direction === 'right' ? 'reverse' : 'normal',
          animationDuration: `${speed}s`,
        }}
      >
        {/* First copy */}
        <div className="flex shrink-0 items-center gap-8 pr-8">
          {children}
        </div>
        {/* Second copy for seamless loop */}
        <div className="flex shrink-0 items-center gap-8 pr-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
