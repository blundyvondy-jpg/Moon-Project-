import React, { useMemo, useState } from 'react';
import RoseCurtain from './RoseCurtain';

interface Props {
  onStart: () => void;
}

// --- Scene Components ---

const Bird = ({ delay, top, duration, scale }: { delay: number, top: number, duration: number, scale: number }) => (
  <div 
    className="absolute animate-bird-fly pointer-events-none z-30"
    style={{
      top: `${top}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
      left: '-50px', 
    }}
  >
    <div style={{ transform: `scale(${scale})` }}>
        <svg width="20" height="10" viewBox="0 0 20 10" className="fill-current text-indigo-950 animate-bird-flap">
        <path d="M0 5 Q5 10 10 5 T20 5" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
    </div>
  </div>
);

const Cloud = ({ top, delay, duration, opacity, scale }: any) => (
  <div
    className="absolute animate-drift-cloud opacity-60 pointer-events-none z-10"
    style={{
        top: `${top}%`,
        left: '-20%',
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        transform: `scale(${scale})`
    }}
  >
      <div className="w-48 h-16 bg-white blur-2xl rounded-full"></div>
  </div>
);

const GrassBlade = ({ delay, left, height, rotate }: any) => (
  <div 
    className="absolute bottom-0 origin-bottom animate-grass-sway"
    style={{
      left: `${left}%`,
      height: `${height}px`,
      width: '4px',
      background: 'linear-gradient(to top, #022c22, #15803d)', // Deep green to match shadow
      borderRadius: '100% 100% 0 0',
      animationDelay: `${delay}s`,
      transform: `rotate(${rotate}deg)`,
      zIndex: 40
    }}
  />
);

const TreeSilhouette = ({ side, className }: { side: 'left' | 'right', className?: string }) => (
    <svg viewBox="0 0 200 400" className={`absolute bottom-0 ${side === 'left' ? 'left-0' : 'right-0'} h-[80vh] w-auto z-30 pointer-events-none ${className}`} preserveAspectRatio="none">
        <defs>
            <radialGradient id={`treeGrad-${side}`} cx="50%" cy="100%" r="80%">
                <stop offset="0%" stopColor="#022c22" />
                <stop offset="100%" stopColor="#0f172a" />
            </radialGradient>
        </defs>
        {side === 'left' ? (
            <path d="M-50 400 L-50 100 Q 0 50 50 120 Q 120 80 150 180 Q 180 250 120 300 Q 150 350 100 400 Z" fill={`url(#treeGrad-${side})`} />
        ) : (
            <path d="M250 400 L250 150 Q 200 100 150 180 Q 80 200 100 280 Q 50 320 120 400 Z" fill={`url(#treeGrad-${side})`} />
        )}
        {/* Leaf details */}
        <g fill="#0f172a" opacity="0.6">
            <circle cx={side === 'left' ? 60 : 140} cy="150" r="40" filter="blur(5px)" />
            <circle cx={side === 'left' ? 100 : 100} cy="250" r="50" filter="blur(8px)" />
        </g>
    </svg>
);

// High-fidelity Tower based on Tangled reference
const TowerSVG = () => (
  <svg viewBox="0 0 300 900" className="w-full h-full drop-shadow-2xl">
    <defs>
      <linearGradient id="stoneGradient" x1="0" x2="1" y1="0" y2="0">
         <stop offset="0%" stopColor="#a8a29e" /> {/* shadow side */}
         <stop offset="40%" stopColor="#e7e5e4" /> {/* highlight */}
         <stop offset="100%" stopColor="#d6d3d1" /> {/* mid */}
      </linearGradient>
    </defs>

    {/* --- The Tower Shaft --- */}
    {/* Distinctive shape: Wide base, very thin neck, flares at top */}
    <path 
      d="M 85 900 
         Q 135 600 138 450 
         L 138 340
         C 138 310 125 290 115 280
         L 185 280
         C 175 290 162 310 162 340
         L 162 450
         Q 165 600 215 900
         Z" 
      fill="url(#stoneGradient)"
    />
    
    {/* Brick Textures */}
    <path d="M138 400 L162 400" stroke="#78716c" strokeWidth="1" opacity="0.4" />
    <path d="M139 500 L161 500" stroke="#78716c" strokeWidth="1" opacity="0.4" />
    <path d="M130 600 L170 600" stroke="#78716c" strokeWidth="1" opacity="0.4" />

    {/* --- Heavy Ivy / Greenery Base --- */}
    {/* Climbing much higher on the left side like the reference */}
    <path d="M80 900 C 80 700, 130 650, 138 500 C 120 450, 145 400, 138 350" 
          stroke="#15803d" strokeWidth="14" fill="none" strokeLinecap="round" opacity="0.9"/>
    <path d="M220 900 C 220 750, 170 700, 162 600" 
          stroke="#166534" strokeWidth="12" fill="none" strokeLinecap="round" opacity="0.9"/>
    {/* Highlights on Ivy */}
    <path d="M85 900 C 85 700, 135 650, 140 500" 
          stroke="#4ade80" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.3" strokeDasharray="10 20"/>

    {/* --- The House (Cottage) on Top --- */}
    
    {/* Wooden Support Beams (Corbels) */}
    <path d="M 115 280 L 100 250 L 200 250 L 185 280 Z" fill="#3f2c22" /> 
    
    {/* Main Circular Room - Cream Plaster */}
    <rect x="110" y="190" width="80" height="60" fill="#fefce8" /> 
    
    {/* Timber Framing */}
    <rect x="108" y="190" width="4" height="60" fill="#3f2c22" />
    <rect x="148" y="190" width="4" height="60" fill="#3f2c22" />
    <rect x="188" y="190" width="4" height="60" fill="#3f2c22" />
    
    {/* Horizontal Beams */}
    <rect x="110" y="245" width="80" height="5" fill="#3f2c22" />
    
    {/* Windows */}
    <path d="M 120 215 L 120 235 L 140 235 L 140 215 A 5 5 0 0 0 120 215" fill="#1e1b4b" />
    <path d="M 130 215 L 130 235" stroke="#3f2c22" strokeWidth="2" />
    <path d="M 120 225 L 140 225" stroke="#3f2c22" strokeWidth="2" />
    
    <path d="M 160 215 L 160 235 L 180 235 L 180 215 A 5 5 0 0 0 160 215" fill="#1e1b4b" />
    
    {/* Balcony Railing */}
    <path d="M 105 245 L 195 245" stroke="#52525b" strokeWidth="2" />
    <path d="M 115 245 L 115 235" stroke="#52525b" strokeWidth="2" />
    <path d="M 150 245 L 150 235" stroke="#52525b" strokeWidth="2" />
    <path d="M 185 245 L 185 235" stroke="#52525b" strokeWidth="2" />

    {/* --- Roof --- */}
    {/* Main Spire - Very tall and curved */}
    <path d="M 95 190 Q 150 -10 205 190 L 95 190" fill="#581c87" /> {/* Deep Purple */}
    
    {/* Tiles Texture */}
    <path d="M 115 160 Q 150 140 185 160" stroke="#7e22ce" fill="none" strokeWidth="1"/>
    <path d="M 125 130 Q 150 110 175 130" stroke="#7e22ce" fill="none" strokeWidth="1"/>
    <path d="M 135 100 Q 150 90 165 100" stroke="#7e22ce" fill="none" strokeWidth="1"/>
    <path d="M 140 70 Q 150 60 160 70" stroke="#7e22ce" fill="none" strokeWidth="1"/>

    {/* Dormer Window */}
    <path d="M 130 160 L 130 135 L 160 135 L 160 160 Z" fill="#fefce8" />
    <path d="M 125 135 L 145 105 L 165 135 Z" fill="#581c87" />
    <circle cx="145" cy="140" r="6" fill="#1e1b4b" />

    {/* Gold Spire Tip */}
    <path d="M 148 20 L 152 20 L 150 0 L 148 20" fill="#facc15" />
    <circle cx="150" cy="25" r="4" fill="#facc15" />
    <circle cx="150" cy="5" r="2" fill="#fef08a" />

    {/* Lighting Overlay (Left side highlight) */}
    <path d="M 85 900 Q 135 600 138 450 L 138 340 L 150 340 L 150 900 Z" fill="white" opacity="0.15" />
</svg>
);


// --- Corner/Hydrangea Components ---

const Floret = ({ x, y, scale, color, rotation }: { x: number, y: number, scale: number, color: string, rotation: number }) => (
    <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}>
      <g opacity="0.95">
          <path d="M0 0 C-4 -6 -6 -10 0 -14 C6 -10 4 -6 0 0" fill={color} transform="rotate(0)" />
          <path d="M0 0 C-4 -6 -6 -10 0 -14 C6 -10 4 -6 0 0" fill={color} transform="rotate(90)" />
          <path d="M0 0 C-4 -6 -6 -10 0 -14 C6 -10 4 -6 0 0" fill={color} transform="rotate(180)" />
          <path d="M0 0 C-4 -6 -6 -10 0 -14 C6 -10 4 -6 0 0" fill={color} transform="rotate(270)" />
      </g>
      <circle r="2" fill="rgba(255,255,255,0.3)" />
    </g>
  );
  
  const Leaf = ({ x, y, rotation, scale }: { x: number, y: number, rotation: number, scale: number }) => (
    <path 
      d="M0 0 C30 -30 90 -30 120 0 C90 30 30 30 0 0 Z" 
      fill="#14532d" 
      stroke="#166534"
      strokeWidth="1.5"
      transform={`translate(${x}, ${y}) rotate(${rotation}) scale(${scale})`}
      opacity="0.8"
    />
  );
  
  const HydrangeaHead = ({ type, size, x, y, delay }: { type: 'blue'|'purple'|'pink'|'white', size: number, x: number, y: number, delay: number }) => {
    const florets = useMemo(() => {
      const items = [];
      const count = 40; 
      const getBaseColor = () => {
          if (type === 'blue') return { h: 220, s: 90, l: 65 };
          if (type === 'purple') return { h: 270, s: 75, l: 70 };
          if (type === 'pink') return { h: 330, s: 85, l: 75 };
          return { h: 280, s: 30, l: 90 }; 
      };
      const base = getBaseColor();
      for (let i = 0; i < count; i++) {
          const r = Math.sqrt(Math.random()) * (size / 2);
          const theta = Math.random() * 2 * Math.PI;
          const fx = r * Math.cos(theta);
          const fy = r * Math.sin(theta);
          const h = base.h + (Math.random() * 20 - 10);
          const s = base.s + (Math.random() * 20 - 10);
          const l = base.l + (Math.random() * 20 - 10);
          const scale = 0.6 + Math.random() * 0.6;
          const rot = Math.random() * 360;
          items.push({ x: fx, y: fy, scale, color: `hsl(${h}, ${s}%, ${l}%)`, rotation: rot });
      }
      return items.sort((a,b) => Math.random() - 0.5);
    }, [type, size]);
  
    return (
      <g transform={`translate(${x}, ${y})`} className="origin-center" style={{ animation: `pulse-scale 4s ease-in-out infinite alternate`, animationDelay: `${delay}s` }}>
        <style>{`@keyframes pulse-scale { 0% { transform: translate(${x}px, ${y}px) scale(0.98); } 100% { transform: translate(${x}px, ${y}px) scale(1.03); } }`}</style>
        <circle r={size/2} fill="rgba(0,0,0,0.3)" filter="blur(8px)" />
        {florets.map((f, i) => <Floret key={i} {...f} />)}
      </g>
    );
  };
  
  const CornerBush = ({ position, color }: { position: 'tl' | 'tr' | 'bl' | 'br', color: 'blue'|'purple'|'pink'|'white' }) => {
    const isTop = position.startsWith('t');
    const isLeft = position.endsWith('l');
    const style: React.CSSProperties = {
      position: 'absolute',
      top: isTop ? '-60px' : 'auto',
      bottom: !isTop ? '-60px' : 'auto',
      left: isLeft ? '-60px' : 'auto',
      right: !isLeft ? '-60px' : 'auto',
      zIndex: 50, // Topmost layer
      transformOrigin: `${isLeft ? 'top left' : 'top right'}`,
    };
    return (
      <div style={style} className={`animate-sway`}>
        <svg width="400" height="400" viewBox="0 0 400 400" className="overflow-visible drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]">
          <g transform={
              position === 'tl' ? 'translate(50,50)' :
              position === 'tr' ? 'translate(350,50) scale(-1, 1)' :
              position === 'bl' ? 'translate(50,350) scale(1, -1)' :
              'translate(350,350) scale(-1, -1)'
          }>
              <Leaf x={0} y={0} rotation={15} scale={1.2} />
              <Leaf x={50} y={80} rotation={45} scale={1.3} />
              <Leaf x={100} y={20} rotation={-10} scale={1.1} />
              <Leaf x={20} y={120} rotation={80} scale={1.2} />
              <HydrangeaHead type={color} size={130} x={40} y={40} delay={0} />
              <HydrangeaHead type={color} size={110} x={120} y={30} delay={1.2} />
              <HydrangeaHead type={color} size={120} x={30} y={130} delay={0.5} />
              <HydrangeaHead type={color} size={90} x={110} y={110} delay={2.1} />
          </g>
        </svg>
      </div>
    );
  };

const HydrangeaIntro: React.FC<Props> = ({ onStart }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleStart = () => {
    setIsTransitioning(true);
    // Wait for the curtain to close (1.5s - 2s animation) before changing route
    setTimeout(() => {
        onStart();
    }, 1800); 
  };

  const birds = useMemo(() => Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    top: 5 + Math.random() * 30,
    delay: i * 3,
    duration: 25 + Math.random() * 15,
    scale: 0.3 + Math.random() * 0.4
  })), []);
  
  const grass = useMemo(() => Array.from({ length: 80 }).map((_, i) => ({
    id: i,
    left: (i / 80) * 100 + (Math.random() * 2 - 1),
    height: 50 + Math.random() * 40,
    rotate: Math.random() * 10 - 5,
    delay: Math.random() * 2
  })), []);

  const clouds = useMemo(() => Array.from({ length: 4 }).map((_, i) => ({
    id: i,
    top: 5 + i * 15,
    delay: i * 10,
    duration: 60 + Math.random() * 20,
    scale: 1 + Math.random() * 1
  })), []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#7dd3fc] flex flex-col items-center justify-center text-center px-4">
      
      {/* TRANSITION OVERLAY */}
      {isTransitioning && <RoseCurtain mode="close" />}

      {/* --- SCENE BACKGROUND (Canyon) --- */}
      
      {/* 1. Sky Gradient (Bright to canyon depth) */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-300 via-purple-200 to-orange-100"></div>
      
      {/* 2. Distant Back Wall of Canyon (Grayish Brown) */}
      <div className="absolute inset-x-0 top-[20%] bottom-0 bg-[#57534e] z-0" 
           style={{ clipPath: 'polygon(0% 20%, 30% 0%, 60% 15%, 80% 5%, 100% 10%, 100% 100%, 0% 100%)' }}>
          {/* Subtle texture for rock */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/rocky-wall.png')]"></div>
      </div>
      
      {/* 3. The Waterfall (Right side, falling into abyss) */}
      <div className="absolute top-[20%] right-[25%] w-10 md:w-16 h-[80%] z-0">
         {/* The falling water */}
         <div className="w-full h-full bg-cyan-100/60 animate-waterfall blur-[1px]" 
              style={{ 
                  maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
                  backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.8), rgba(255,255,255,0) 20px)'
              }}></div>
         {/* Mist/Splash zone */}
         <div className="absolute bottom-0 left-[-50%] w-[200%] h-32 bg-white/40 blur-2xl animate-mist-rise"></div>
      </div>

      {/* 4. Mid-Ground Canyon Walls (Steep, framing the tower) */}
      
      {/* Left Wall - In Shadow */}
      <div className="absolute top-0 bottom-0 left-0 w-[45%] bg-[#44403c] z-10" 
           style={{ clipPath: 'polygon(0% 0%, 80% 0%, 50% 100%, 0% 100%)' }}>
           <div className="absolute inset-0 bg-black/20"></div> {/* Deep shadow */}
      </div>

      {/* Right Wall - Lit */}
      <div className="absolute top-0 bottom-0 right-0 w-[40%] bg-[#524c46] z-10" 
           style={{ clipPath: 'polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%)' }}>
      </div>

      {/* 5. Light Rays (God Rays from Top Left - Golden Hour) */}
      <div className="absolute top-[-50%] left-[-20%] w-[100%] h-[200%] bg-gradient-to-r from-yellow-200/20 via-transparent to-transparent transform rotate-[30deg] pointer-events-none z-20 blur-xl"></div>

      {/* 6. Clouds */}
      {clouds.map(c => <Cloud key={c.id} {...c} />)}

      {/* 7. The Tower Base (Small grassy hill in the light) */}
      <div className="absolute bottom-[-10%] left-[25%] w-[50%] h-[40%] bg-[#4d7c0f] rounded-[60%] z-20 shadow-[0_-20px_40px_rgba(0,0,0,0.3)]"></div>

      {/* 8. The Tower (SVG) - Positioned in the sweet spot */}
      <div className="absolute bottom-[10%] left-[50%] -translate-x-[50%] w-[200px] md:w-[260px] h-[75vh] z-20">
         <TowerSVG />
      </div>

      {/* 9. Foreground Trees (Silhouettes) */}
      <TreeSilhouette side="left" className="-translate-x-10 scale-110" />
      <TreeSilhouette side="right" className="translate-x-20 scale-125" />

      {/* 10. Foreground Grass Strip (Very dark green for silhouette effect) */}
      <div className="absolute bottom-0 w-full h-32 z-40 overflow-hidden pointer-events-none">
          {grass.map(g => <GrassBlade key={g.id} {...g} />)}
      </div>
      
      {/* 11. Birds */}
      {birds.map(b => <Bird key={b.id} {...b} />)}


      {/* --- OVERLAYS --- */}

      {/* Realistic Live Hydrangea Corners (Still kept as requested in previous steps) */}
      <CornerBush position="tl" color="blue" />     
      <CornerBush position="tr" color="purple" />   
      <CornerBush position="bl" color="pink" />     
      <CornerBush position="br" color="white" />    

      {/* Main Content - No Background Box */}
      <div className="z-50 relative flex flex-col items-center justify-center max-w-4xl w-full mt-32 md:mt-0">
        
        <h1 className="text-7xl md:text-9xl font-script text-pink-200 mb-6 leading-tight drop-shadow-[0_5px_5px_rgba(0,0,0,0.9)]">
          Happy Valentine’s Day <br/> Sara
        </h1>
        
        <p className="text-xl md:text-2xl font-serif text-amber-50 mb-12 italic drop-shadow-[0_3px_3px_rgba(0,0,0,0.9)]">
          I made this little website just for you 💗
        </p>

        <button
          onClick={handleStart}
          className="group relative inline-flex items-center justify-center px-12 py-5 text-xl font-medium text-white transition-all duration-300 bg-gradient-to-r from-purple-700/80 to-pink-700/80 rounded-full hover:from-purple-600 hover:to-pink-600 hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400 border border-white/40 shadow-xl backdrop-blur-sm"
        >
          <span className="relative font-script text-3xl tracking-wide">Click on this princess</span>
          <svg
            className="w-6 h-6 ml-3 -mr-1 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </button>
      </div>

    </div>
  );
};

export default HydrangeaIntro;