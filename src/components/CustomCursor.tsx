import { useEffect, useState, useCallback } from 'react';

interface CursorPosition {
  x: number;
  y: number;
}

const CustomCursor = () => {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
    if (!isVisible) setIsVisible(true);
  }, [isVisible]);

  const handleMouseEnter = useCallback(() => setIsVisible(true), []);
  const handleMouseLeave = useCallback(() => setIsVisible(false), []);
  const handleMouseDown = useCallback(() => setIsClicking(true), []);
  const handleMouseUp = useCallback(() => setIsClicking(false), []);

  useEffect(() => {
    const handleHoverElements = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, .interactive, .neo-card, .neo-button'
      );
      
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovering(true));
        el.addEventListener('mouseleave', () => setIsHovering(false));
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    handleHoverElements();
    
    // Re-check for interactive elements periodically
    const observer = new MutationObserver(handleHoverElements);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      observer.disconnect();
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor dot */}
      <div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className={`
            transition-all duration-200 ease-out rounded-full
            ${isHovering ? 'w-5 h-5 bg-sky-400 shadow-lg shadow-sky-400/60' : 'w-4 h-4 bg-sky-300 shadow-md shadow-sky-300/50'}
            ${isClicking ? 'scale-75' : 'scale-100'}
          `}
        />
      </div>
      
      {/* Trailing ring */}
      <div
        className="fixed pointer-events-none z-[9998]"
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
          transition: 'left 0.15s ease-out, top 0.15s ease-out, width 0.3s ease-out, height 0.3s ease-out, border-color 0.3s ease-out',
        }}
      >
        <div
          className={`
            border-4 transition-all duration-300 ease-out rounded-full
            ${isHovering 
              ? 'w-16 h-16 border-sky-400 opacity-90 shadow-lg shadow-sky-400/40' 
              : 'w-12 h-12 border-sky-300/70 opacity-70'
            }
            ${isClicking ? 'scale-90 border-sky-200' : 'scale-100'}
          `}
        />
      </div>
      
      {/* Glow effect on hover */}
      {isHovering && (
        <div
          className="fixed pointer-events-none z-[9997]"
          style={{
            left: position.x,
            top: position.y,
            transform: 'translate(-50%, -50%)',
            transition: 'left 0.2s ease-out, top 0.2s ease-out',
          }}
        >
          <div className="w-24 h-24 rounded-full bg-sky-400/20 blur-xl animate-pulse" />
        </div>
      )}
    </>
  );
};

export default CustomCursor;
