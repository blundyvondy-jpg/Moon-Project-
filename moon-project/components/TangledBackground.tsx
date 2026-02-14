import React, { useState, useEffect, useMemo } from 'react';

// Moon Component that cycles phases every minute
export const Moon = () => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // Change phase every minute (60000ms)
    const interval = setInterval(() => {
      setPhase((prev) => (prev + 1) % 4);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-6 left-6 md:top-12 md:left-12 w-20 h-20 md:w-32 md:h-32 pointer-events-none z-0 transition-opacity duration-1000">
      {/* Outer Glow */}
      <div className="absolute inset-0 bg-amber-100 rounded-full blur-[50px] opacity-30 animate-pulse-slow"></div>
      
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(253,224,71,0.6)]">
        {/* 
            Phases:
            0: Crescent
            1: Half
            2: Gibbous
            3: Full
        */}
        {phase === 0 && (
           // Crescent
           <path d="M 45 15 A 35 35 0 1 1 45 85 A 25 35 0 1 0 45 15 Z" fill="#fef3c7" />
        )}
        {phase === 1 && (
           // Half Moon
           <path d="M 50 10 A 40 40 0 0 0 50 90 Z" fill="#fef3c7" />
        )}
        {phase === 2 && (
           // Gibbous
           <path d="M 35 10 A 40 40 0 1 1 35 90 A 50 40 0 0 0 35 10 Z" fill="#fef3c7" />
        )}
        {phase === 3 && (
           // Full
           <circle cx="50" cy="50" r="40" fill="#fef3c7" />
        )}
      </svg>
    </div>
  );
};

// Tangled Theme Components
export const Lantern = ({ delay, duration, left, size }: { delay: number, duration: number, left: number, size: number }) => (
  <div 
    className="absolute bottom-0 opacity-0 animate-lantern-float"
    style={{
      left: `${left}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
      width: `${size}px`,
      height: `${size * 1.4}px`,
      zIndex: 0
    }}
  >
    {/* Lantern Body */}
    <div className="w-full h-full relative">
       {/* Main Glow */}
       <div className="absolute inset-0 bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-200 opacity-90 rounded-t-lg rounded-b-md shadow-[0_0_30px_rgba(251,191,36,0.6)]"></div>
       {/* Inner Light Core */}
       <div className="absolute inset-x-2 bottom-2 top-4 bg-yellow-100 blur-md opacity-60"></div>
       {/* Rim/Detail */}
       <div className="absolute bottom-0 inset-x-0 h-1 bg-orange-700 opacity-30"></div>
    </div>
  </div>
);

export const Star = ({ top, left, delay }: { top: number, left: number, delay: number }) => (
  <div 
    className="absolute bg-white rounded-full animate-twinkle shadow-[0_0_4px_white]"
    style={{
      top: `${top}%`,
      left: `${left}%`,
      width: '2px',
      height: '2px',
      animationDelay: `${delay}s`,
      zIndex: 0
    }}
  />
);

const TangledBackground = () => {
  // Generate static random data for stars and lanterns to prevent re-renders causing jumps
  // Increased to 60 lanterns for denser, more magical effect
  const lanterns = useMemo(() => Array.from({ length: 60 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * -30, // Negative delay for immediate presence
    duration: 15 + Math.random() * 20,
    size: 15 + Math.random() * 25
  })), []);

  const stars = useMemo(() => Array.from({ length: 70 }).map((_, i) => ({
    id: i,
    top: Math.random() * 70, // Keep stars mostly in upper sky
    left: Math.random() * 100,
    delay: Math.random() * 5
  })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Deep Night Sky Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#1e1b4b] to-[#312e81]"></div>
      
      {/* Stars */}
      {stars.map(s => <Star key={s.id} {...s} />)}

      {/* Moon */}
      <Moon />

      {/* Floating Lanterns */}
      {lanterns.map(l => <Lantern key={l.id} {...l} />)}
      
      {/* Bottom Glow (Lake/Reflection Effect) to help Roses stand out */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-indigo-900/50 to-transparent"></div>
      
      {/* Subtle Spotlight behind bouquet */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-purple-500/10 blur-[80px] rounded-full"></div>
    </div>
  );
};

export default TangledBackground;