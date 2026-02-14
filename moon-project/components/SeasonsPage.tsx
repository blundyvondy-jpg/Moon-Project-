import React, { useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// --- Sub-components for Effects ---

const FloatingHearts = () => {
  const hearts = useMemo(() => Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    animationDuration: 4 + Math.random() * 6,
    delay: Math.random() * 5,
    scale: 0.5 + Math.random() * 2,
    opacity: 0.2 + Math.random() * 0.6,
    rotation: Math.random() * 360
  })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-pink-500 drop-shadow-sm"
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

const Snowfall = () => {
  const snowflakes = useMemo(() => Array.from({ length: 150 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    animationDuration: 3 + Math.random() * 5,
    delay: Math.random() * 5,
    opacity: 0.4 + Math.random() * 0.6,
    size: 2 + Math.random() * 4
  })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
       <style>{`
        @keyframes snowfall {
            0% { transform: translateY(-10vh) translateX(0); }
            50% { transform: translateY(50vh) translateX(20px); }
            100% { transform: translateY(110vh) translateX(-20px); }
        }
      `}</style>
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute bg-white rounded-full blur-[1px]"
          style={{
            left: `${flake.left}%`,
            top: `-10px`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
            animation: `snowfall ${flake.animationDuration}s linear infinite`,
            animationDelay: `${flake.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

const SpringPetals = () => {
    const petals = useMemo(() => Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        animationDuration: 6 + Math.random() * 4,
        delay: Math.random() * 5,
        scale: 0.8 + Math.random() * 0.8,
    })), []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            <style>{`
                @keyframes petalFall {
                    0% { transform: translateY(-10vh) rotate(0deg) translateX(0); opacity: 0; }
                    10% { opacity: 1; }
                    50% { transform: translateY(50vh) rotate(180deg) translateX(20px); }
                    100% { transform: translateY(110vh) rotate(360deg) translateX(-20px); opacity: 0; }
                }
            `}</style>
            {petals.map((petal) => (
                <div
                    key={petal.id}
                    className="absolute text-pink-300 drop-shadow-sm"
                    style={{
                        left: `${petal.left}%`,
                        top: '-10px',
                        fontSize: `${petal.scale}rem`,
                        animation: `petalFall ${petal.animationDuration}s linear infinite`,
                        animationDelay: `${petal.delay}s`
                    }}
                >
                    🌸
                </div>
            ))}
        </div>
    );
};

const SummerSun = () => (
    <div className="absolute top-[-10%] right-[-10%] md:right-[10%] pointer-events-none select-none z-0">
         <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px]">
             {/* Glow */}
             <div className="absolute inset-0 bg-yellow-400 rounded-full blur-[80px] opacity-40 animate-pulse"></div>
             {/* Sun SVG */}
             <svg className="w-full h-full text-yellow-500 fill-current animate-[spin_60s_linear_infinite] opacity-80" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="20" />
                {Array.from({length: 12}).map((_, i) => (
                    <path key={i} d={`M50 10 L50 0`} stroke="currentColor" strokeWidth="4" transform={`rotate(${i * 30} 50 50)`} />
                ))}
             </svg>
         </div>
    </div>
);

const FallingLeaves = () => {
  const leaves = useMemo(() => Array.from({ length: 35 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    animationDuration: 8 + Math.random() * 4,
    delay: Math.random() * 5,
    scale: 0.5 + Math.random() * 1,
    color: ['#ea580c', '#d97706', '#b45309', '#78350f'][Math.floor(Math.random() * 4)]
  })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
       <style>{`
        @keyframes leafFall {
            0% { transform: translateY(-10vh) rotate(0deg) translateX(0); opacity: 0; }
            10% { opacity: 1; }
            100% { transform: translateY(110vh) rotate(360deg) translateX(50px); opacity: 1; }
        }
      `}</style>
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="absolute"
          style={{
            left: `${leaf.left}%`,
            top: `-20px`,
            color: leaf.color,
            fontSize: `${leaf.scale + 1}rem`,
            animation: `leafFall ${leaf.animationDuration}s linear infinite`,
            animationDelay: `${leaf.delay}s`,
          }}
        >
          🍁
        </div>
      ))}
    </div>
  );
};

const MonsoonRain = () => {
    const drops = useMemo(() => Array.from({ length: 150 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 0.5 + Math.random() * 0.3
    })), []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            <style>{`
                @keyframes rainDrop {
                    0% { transform: translateY(-10vh); }
                    100% { transform: translateY(110vh); }
                }
                @keyframes lightning {
                    0%, 90%, 93% { opacity: 0; }
                    91% { opacity: 0.1; }
                    92% { opacity: 0; }
                }
            `}</style>
            {/* Lightning Overlay */}
            <div className="absolute inset-0 bg-white pointer-events-none mix-blend-overlay" style={{ animation: 'lightning 5s infinite' }}></div>
            
            {drops.map(drop => (
                <div 
                    key={drop.id}
                    className="absolute bg-blue-300/40 w-[2px] h-[30px]"
                    style={{
                        left: `${drop.left}%`,
                        top: '-50px',
                        animation: `rainDrop ${drop.duration}s linear infinite`,
                        animationDelay: `${drop.delay}s`
                    }}
                />
            ))}
        </div>
    );
};

const SeasonsPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full relative overflow-x-hidden scroll-smooth">
      
      {/* --- SECTION 1: LOVE (Pink) --- */}
      <section className="relative min-h-screen w-full bg-pink-100 flex flex-col items-center justify-center overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-rose-100 to-pink-200"></div>
         <FloatingHearts />
         <div className="z-10 text-center px-4 mix-blend-multiply">
            <h1 className="font-script text-6xl md:text-9xl text-rose-600 drop-shadow-md animate-pulse-slow" style={{ lineHeight: 1.2 }}>
                I will love you<br/> always
            </h1>
         </div>
         <div className="absolute bottom-10 animate-bounce z-20 text-rose-400">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7"></path></svg>
         </div>
      </section>

      {/* --- SECTION 2: WINTER (Blue/Snow) --- */}
      <section className="relative min-h-screen w-full bg-slate-900 flex flex-col items-center justify-center overflow-hidden border-t-4 border-white/10">
         <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] to-[#1e3a8a]"></div>
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
         <Snowfall />
         
         <div className="z-20 text-center px-4">
            <h1 className="font-script text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-white drop-shadow-[0_0_25px_rgba(147,197,253,0.6)]" style={{ lineHeight: 1.2 }}>
                even in the<br/>winter
            </h1>
         </div>

         {/* Trees */}
         <div className="absolute bottom-0 w-full flex justify-between pointer-events-none opacity-40">
             <svg className="h-64 w-auto text-blue-950 fill-current transform -translate-x-10" viewBox="0 0 100 200">
                 <path d="M50 0 L90 150 L60 150 L60 200 L40 200 L40 150 L10 150 Z" />
             </svg>
             <svg className="h-48 w-auto text-blue-950 fill-current transform translate-x-10" viewBox="0 0 100 200">
                 <path d="M50 0 L90 150 L60 150 L60 200 L40 200 L40 150 L10 150 Z" />
             </svg>
         </div>
         
         <div className="absolute bottom-10 animate-bounce z-20 text-blue-200">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7"></path></svg>
         </div>
      </section>

      {/* --- SECTION 3: SPRING (Green/Flowers) --- */}
      <section className="relative min-h-screen w-full bg-emerald-50 flex flex-col items-center justify-center overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-emerald-200"></div>
         <SpringPetals />

         {/* Ground Flowers */}
         <div className="absolute bottom-0 w-full h-32 flex justify-around items-end opacity-80 pointer-events-none z-10">
             {Array.from({length: 10}).map((_, i) => (
                 <div key={i} className={`text-4xl transform -translate-y-${Math.random() * 20}px`} style={{ animation: `sway ${2 + Math.random()}s infinite` }}>
                     {['🌷', '🌻', '🪷', '🌹'][i % 4]}
                 </div>
             ))}
         </div>

         <div className="z-20 text-center px-4">
            <h1 className="font-script text-6xl md:text-9xl text-pink-600 drop-shadow-md" style={{ lineHeight: 1.2, textShadow: '2px 2px 0px #fff' }}>
                and Spring
            </h1>
         </div>
         
         <div className="absolute bottom-10 animate-bounce z-20 text-pink-500">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7"></path></svg>
         </div>
      </section>

      {/* --- SECTION 4: SUMMER (Yellow/Sun) --- */}
      <section className="relative min-h-screen w-full bg-sky-300 flex flex-col items-center justify-center overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-b from-sky-400 to-yellow-200"></div>
         <SummerSun />
         
         {/* Clouds */}
         <div className="absolute top-20 left-10 opacity-80 animate-drift-cloud">
             <div className="w-32 h-12 bg-white rounded-full blur-xl"></div>
         </div>
         <div className="absolute top-40 right-20 opacity-60 animate-drift-cloud" style={{ animationDelay: '5s' }}>
             <div className="w-48 h-16 bg-white rounded-full blur-xl"></div>
         </div>

         <div className="z-20 text-center px-4">
            <h1 className="font-script text-6xl md:text-8xl text-orange-600 drop-shadow-lg" style={{ lineHeight: 1.2, textShadow: '0px 0px 20px rgba(255,255,255,0.8)' }}>
                and the Summer
            </h1>
         </div>
         
         <div className="absolute bottom-10 animate-bounce z-20 text-orange-500">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7"></path></svg>
         </div>
      </section>

      {/* --- SECTION 5: FALL (Orange/Leaves) --- */}
      <section className="relative min-h-screen w-full bg-orange-50 flex flex-col items-center justify-center overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-amber-100 to-red-100"></div>
         <FallingLeaves />

         <div className="z-20 text-center px-4">
            <h1 className="font-script text-6xl md:text-9xl text-amber-900 drop-shadow-md" style={{ lineHeight: 1.2, textShadow: '2px 2px 0px #fcd34d' }}>
                and Fall
            </h1>
         </div>
         
         <div className="absolute bottom-10 animate-bounce z-20 text-amber-800">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7"></path></svg>
         </div>
      </section>

      {/* --- SECTION 6: MONSOON (Dark/Rain) --- */}
      <section className="relative min-h-screen w-full bg-gray-800 flex flex-col items-center justify-center overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-b from-gray-700 to-slate-900"></div>
         <MonsoonRain />
         
         {/* Dark Clouds at Top */}
         <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-black/50 to-transparent z-10"></div>

         <div className="z-20 text-center px-4 mb-20">
            <h1 className="font-script text-6xl md:text-9xl text-gray-200 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" style={{ lineHeight: 1.2 }}>
                and Monsoon
            </h1>
         </div>

         {/* Final Interactive Message */}
         <div className="absolute bottom-20 z-30 flex flex-col items-center">
            
             {/* Helper Text & Arrow (Pointing Down) */}
            <div className="flex flex-col items-center animate-bounce mb-6 text-pink-300">
                <span className="font-script text-2xl mb-1 shadow-black drop-shadow-md">Click on this, my love</span>
                <svg className="w-8 h-8 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 14l-7 7m0 0l-7-7"></path>
                </svg>
            </div>

            {/* The Main Button/Message */}
            <button 
                onClick={() => navigate('/promise')}
                className="group relative px-8 py-5 border-2 border-blue-200/60 rounded-full bg-slate-900/40 backdrop-blur-md text-blue-100 hover:text-white hover:border-pink-300 hover:bg-slate-800/60 hover:scale-105 hover:shadow-[0_0_30px_rgba(244,114,182,0.5)] transition-all duration-300"
            >
                 <span className="font-serif text-lg md:text-xl tracking-widest relative z-10">
                    I will love you through it all, I promise. ❤️
                 </span>
            </button>
            
         </div>
      </section>

    </div>
  );
};

export default SeasonsPage;