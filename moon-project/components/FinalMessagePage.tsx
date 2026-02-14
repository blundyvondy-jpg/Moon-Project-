import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const FloatingHearts = () => {
  const hearts = useMemo(() => Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    animationDuration: 4 + Math.random() * 6,
    delay: Math.random() * 5,
    scale: 0.5 + Math.random() * 1.5,
    opacity: 0.2 + Math.random() * 0.6,
    rotation: Math.random() * 360
  })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-pink-400 drop-shadow-sm"
          style={{
            left: `${heart.left}%`,
            top: `${heart.top}%`,
            fontSize: `${heart.scale}rem`,
            transform: `rotate(${heart.rotation}deg)`,
            animation: `float ${heart.animationDuration}s ease-in-out infinite`,
            animationDelay: `${heart.delay}s`,
            opacity: heart.opacity
          }}
        >
          ♥
        </div>
      ))}
    </div>
  );
};

const FinalMessagePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-pink-100 flex flex-col items-center justify-center relative overflow-hidden px-6 text-center">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-rose-100 to-pink-200"></div>
      
      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] pointer-events-none"></div>
      
      <FloatingHearts />

      <div className="z-10 max-w-4xl animate-fade-in p-8 border-4 border-white/50 rounded-3xl backdrop-blur-sm bg-white/20 shadow-xl">
        <h1 className="text-4xl md:text-6xl font-script text-rose-600 leading-tight drop-shadow-sm mb-4">
          This isn't much,
        </h1>
        <h2 className="text-3xl md:text-5xl font-script text-rose-500 leading-tight drop-shadow-sm">
           but I hope you really like this website I made for you.
        </h2>
        
        {/* Interactive Heart Section */}
        <div className="mt-16 relative inline-block group cursor-pointer" onClick={() => navigate('/i-love-you')}>
            
            {/* The Heart */}
            <div className="text-8xl animate-pulse filter drop-shadow-lg transition-transform duration-300 group-hover:scale-110 relative z-10">
              ❤️
            </div>

            {/* Hand-drawn Circle and Arrow SVG Overlay */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] pointer-events-none z-20">
                <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
                    <defs>
                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#e11d48" />
                        </marker>
                    </defs>
                    
                    {/* Circle around the heart */}
                    <path 
                        d="M 100 65 C 130 60, 150 80, 150 100 C 150 130, 120 145, 100 145 C 70 145, 50 120, 50 100 C 50 75, 70 60, 95 62"
                        fill="none"
                        stroke="#e11d48"
                        strokeWidth="3"
                        strokeLinecap="round"
                        className="opacity-80"
                        strokeDasharray="1000"
                        strokeDashoffset="1000"
                        style={{ animation: 'draw 2s ease-out forwards' }}
                    />

                    {/* Arrow pointing from bottom text to circle */}
                    <path 
                        d="M 100 180 Q 90 160 100 152" 
                        fill="none"
                        stroke="#e11d48"
                        strokeWidth="3"
                        markerEnd="url(#arrowhead)"
                        strokeDasharray="100"
                        strokeDashoffset="100"
                        style={{ animation: 'draw 0.5s ease-out 1.5s forwards' }}
                    />
                </svg>
            </div>

            {/* Text Label */}
            <div className="absolute top-[130%] left-1/2 -translate-x-1/2 w-80">
                <p className="font-script text-4xl text-rose-600 font-bold animate-bounce drop-shadow-md">
                    Click on this, my love
                </p>
            </div>

        </div>
      </div>
      
      <style>{`
          @keyframes draw {
            to { stroke-dashoffset: 0; }
          }
      `}</style>
    </div>
  );
};

export default FinalMessagePage;
