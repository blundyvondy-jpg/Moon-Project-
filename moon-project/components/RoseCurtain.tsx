import React, { useEffect, useState } from 'react';

interface Props {
  mode: 'close' | 'open'; // 'close' = slides shut (exit). 'open' = slides open (enter).
  onComplete?: () => void;
}

const RoseCurtain: React.FC<Props> = ({ mode, onComplete }) => {
  const [active, setActive] = useState(mode === 'open'); // If mode is open, we start closed and animate to open

  useEffect(() => {
    // Trigger animation frame
    requestAnimationFrame(() => {
        setActive(mode === 'close');
    });

    const timer = setTimeout(() => {
      onComplete?.();
    }, 2000); // Duration of animation

    return () => clearTimeout(timer);
  }, [mode, onComplete]);

  // If mode is 'close', we want to go from 0% width to 50% width on each side.
  // Actually, easiest is translate.
  // Close: Starts at -100% (hidden), moves to 0% (visible).
  // Open: Starts at 0% (visible), moves to -100% (hidden).

  const getTransform = (side: 'left' | 'right') => {
    if (mode === 'close') {
        // We are closing.
        // Left panel moves from -100% to 0.
        // Right panel moves from 100% to 0.
        return active ? 'translateX(0)' : (side === 'left' ? 'translateX(-100%)' : 'translateX(100%)');
    } else {
        // We are opening.
        // We start at 0 (closed state).
        // We animate to -100%/100% (open state).
        // note: active starts at true (closed visuals) and becomes false (open visuals) ??
        // Let's simplify:
        // 'close' mode: We want to END with curtains on screen.
        // 'open' mode: We want to START with curtains on screen and animate them away.
        
        // Revised logic below in render.
        return '';
    }
  };

  const isClosing = mode === 'close';
  // If closing: start hidden, become visible.
  // If opening: start visible, become hidden.
  
  const leftTransform = isClosing
    ? (active ? 'translate-x-0' : '-translate-x-full')
    : (active ? '-translate-x-full' : 'translate-x-0');
    
  const rightTransform = isClosing
    ? (active ? 'translate-x-0' : 'translate-x-full')
    : (active ? 'translate-x-full' : 'translate-x-0');

  const opacity = isClosing
     ? (active ? 'opacity-100' : 'opacity-0')
     : (active ? 'opacity-0' : 'opacity-100');

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none flex overflow-hidden">
        {/* Left Curtain */}
        <div 
            className={`w-1/2 h-full bg-[#881337] relative transition-transform duration-[1500ms] ease-in-out shadow-[10px_0_50px_rgba(0,0,0,0.5)] z-20 ${leftTransform}`}
            style={{ willChange: 'transform' }}
        >
             {/* Velvet Texture */}
             <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')]"></div>
             {/* Rose Pattern Overlay */}
             <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fda4af 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
             
             {/* Gold Border Line */}
             <div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-b from-[#fbbf24] via-[#b45309] to-[#fbbf24]"></div>
        </div>

        {/* Right Curtain */}
        <div 
            className={`w-1/2 h-full bg-[#881337] relative transition-transform duration-[1500ms] ease-in-out shadow-[-10px_0_50px_rgba(0,0,0,0.5)] z-20 ${rightTransform}`}
            style={{ willChange: 'transform' }}
        >
             {/* Velvet Texture */}
             <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')]"></div>
             {/* Rose Pattern Overlay */}
             <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fda4af 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>

             {/* Gold Border Line */}
             <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-[#fbbf24] via-[#b45309] to-[#fbbf24]"></div>
        </div>

        {/* Center Seal - Golden Rose */}
        {/* It appears when curtains touch (or is always attached to one side, but let's float it for effect) */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-[1500ms] ${opacity} ${active ? 'scale-100 rotate-0' : 'scale-0 -rotate-180'}`}>
            <div className="relative w-32 h-32 md:w-48 md:h-48 drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]">
                {/* Gold Circle Background */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#fcd34d] to-[#b45309] border-4 border-[#fffbeb]"></div>
                {/* Inner Ring */}
                <div className="absolute inset-2 rounded-full border-2 border-[#78350f] border-dashed"></div>
                
                {/* Center Emblem Text/Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl md:text-6xl">🌹</span>
                </div>
            </div>
        </div>
    </div>
  );
};

export default RoseCurtain;