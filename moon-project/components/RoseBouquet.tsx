import React, { useState } from 'react';

interface Props {
  openedIndices: Set<number>;
  onRoseClick: (index: number) => void;
}

// Fixed positions for roses
const ROSE_POSITIONS = [
  // Back row (Top)
  { x: 200, y: 120, scale: 0.85, rotation: 0, delay: 0.1, duration: 5.5 },
  { x: 140, y: 140, scale: 0.82, rotation: -15, delay: 0.8, duration: 6.2 },
  { x: 260, y: 140, scale: 0.82, rotation: 15, delay: 1.5, duration: 5.8 },
  { x: 90,  y: 180, scale: 0.8, rotation: -30, delay: 0.4, duration: 6.5 },
  { x: 310, y: 180, scale: 0.8, rotation: 30, delay: 2.1, duration: 5.9 },
  
  // Middle row
  { x: 170, y: 190, scale: 0.9, rotation: -10, delay: 1.2, duration: 6.1 },
  { x: 230, y: 190, scale: 0.9, rotation: 10, delay: 2.5, duration: 6.3 },
  { x: 120, y: 230, scale: 0.88, rotation: -25, delay: 0.3, duration: 5.7 },
  { x: 280, y: 230, scale: 0.88, rotation: 25, delay: 1.8, duration: 6.0 },
  { x: 60,  y: 240, scale: 0.85, rotation: -45, delay: 0.9, duration: 6.6 },
  { x: 340, y: 240, scale: 0.85, rotation: 45, delay: 2.8, duration: 6.4 },

  // Front row (Bottom/Center)
  { x: 200, y: 260, scale: 1.0, rotation: 0, delay: 1.6, duration: 5.6 }, // Centerpiece
  { x: 150, y: 280, scale: 0.95, rotation: -15, delay: 0.6, duration: 6.7 },
  { x: 250, y: 280, scale: 0.95, rotation: 15, delay: 2.2, duration: 6.1 },
  { x: 100, y: 310, scale: 0.92, rotation: -35, delay: 1.1, duration: 5.9 },
  { x: 300, y: 310, scale: 0.92, rotation: 35, delay: 2.7, duration: 6.2 },
  { x: 180, y: 330, scale: 1.05, rotation: -5, delay: 0.2, duration: 6.0 }, // Very front
  { x: 220, y: 330, scale: 1.05, rotation: 5, delay: 1.9, duration: 6.5 },  // Very front
];

// Complex Realistic Rose Component based on reference
const RealisticRoseHead = ({ isOpen, isAnimating }: { isOpen: boolean, isAnimating: boolean }) => {
  // Define colors based on state
  // If isOpen, use Light Pink theme. Else use Red theme.
  const colors = isOpen ? {
    bg: "#880E4F", // Dark pink/purple for depth
    bgStroke: "#560027",
    outerRight: "#F48FB1", // Light Pink 300
    outerLeft: "#F06292",  // Pink 300
    stroke: "#C2185B",     // Darker pink for outlines
    centerGradient: "url(#pinkRoseGradient)",
    innerSpiral1: "#EC407A",
    innerSpiral2: "#E91E63",
    innerStroke: "#880E4F",
    bud: "#AD1457",
    budStroke: "#FF80AB",
    lip: "#FF80AB",        // Pink Accent 100
    lipStroke: "#C2185B"
  } : {
    bg: "#5D0000",
    bgStroke: "#3E0000",
    outerRight: "#B71C1C",
    outerLeft: "#C62828",
    stroke: "#7F0000",
    centerGradient: "url(#roseGradient)",
    innerSpiral1: "#D32F2F",
    innerSpiral2: "#D50000",
    innerStroke: "#880E4F",
    bud: "#7F0000",
    budStroke: "#FF5252",
    lip: "#E53935",
    lipStroke: "#B71C1C"
  };

  return (
    <g transform="translate(0, -10) scale(1.1)">
      {/* Sepals (Green leaves at base) */}
      <g transform="translate(0, 25)">
        <path d="M0 0 Q-10 15 -18 5 Q-8 -5 0 0 Z" fill="#33691e" transform="rotate(-30)"/>
        <path d="M0 0 Q10 15 18 5 Q8 -5 0 0 Z" fill="#33691e" transform="rotate(30)"/>
        <path d="M0 0 Q0 15 0 20" stroke="#33691e" strokeWidth="3" />
        <path d="M0 0 Q-5 12 -8 5 Z" fill="#2e7d32" />
        <path d="M0 0 Q5 12 8 5 Z" fill="#2e7d32" />
      </g>

      {/* Main Rose Body */}
      <g transform="translate(0, -5)">
        {/* Deep Background Petals (Silhouette) */}
        <path d="M-20 -15 C-25 -35, 0 -55, 20 -15 C15 5, -15 5, -20 -15" 
              fill={colors.bg} stroke={colors.bgStroke} strokeWidth="0.5"/>

        {/* Outer Right Petal (Curled) */}
        <path d="M0 20 C30 20 35 -10 15 -35 C35 -10 25 15 0 20" 
              fill={colors.outerRight} stroke={colors.stroke} strokeWidth="0.5"/>
        
        {/* Outer Left Petal (Curled) */}
        <path d="M0 20 C-30 20 -35 -10 -15 -35 C-35 -10 -25 15 0 20" 
              fill={colors.outerLeft} stroke={colors.stroke} strokeWidth="0.5"/>

        {/* Center Cup / Body */}
        <path d="M-18 -5 C-25 15, 25 15, 18 -5 C18 -30, -18 -30, -18 -5" 
              fill={colors.centerGradient} stroke={colors.stroke} strokeWidth="0.5"/>
        
        {/* Inner Spiral Layers */}
        {/* The classic "swirl" look */}
        <path d="M-5 -30 C15 -45 30 -15 5 -5 C20 -15 10 -35 -5 -30" 
              fill={colors.innerSpiral1} stroke={colors.innerStroke} strokeWidth="0.5" />
        
        <path d="M5 -25 C-15 -40 -30 -10 -5 -5 C-20 -10 -10 -30 5 -25" 
              fill={colors.innerSpiral2} stroke={colors.innerStroke} strokeWidth="0.5" />

        {/* Very Center Bud */}
        <path d="M0 -10 Q5 -15 0 -20 Q-5 -15 0 -10" fill={colors.bud} />
        <path d="M0 -10 C3 -18 6 -15 3 -8" stroke={colors.budStroke} strokeWidth="0.5" fill="none" opacity="0.6"/>

        {/* Front Lip (Folded down petal) */}
        <path d="M-15 0 Q0 15 15 0 Q0 8 -15 0" 
              fill={colors.lip} stroke={colors.lipStroke} strokeWidth="0.5" />
      </g>
    </g>
  );
};


const RoseBouquet: React.FC<Props> = ({ openedIndices, onRoseClick }) => {
  const [animatingIndex, setAnimatingIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setAnimatingIndex(index);
    setTimeout(() => {
      onRoseClick(index);
      setAnimatingIndex(null);
    }, 1000); // 1 second pulsing delay
  };

  return (
    <div className="w-full h-full flex items-end justify-center pb-2 px-2">
      <svg
        viewBox="0 0 400 650"
        className="w-full h-full max-w-lg drop-shadow-2xl"
        preserveAspectRatio="xMidYMax meet"
      >
        <defs>
          {/* Gradients for Realistic Petals */}
          <linearGradient id="roseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E53935" /> 
            <stop offset="60%" stopColor="#C62828" />
            <stop offset="100%" stopColor="#8E0000" />
          </linearGradient>

          {/* New Pink Gradient for Clicked Roses */}
          <linearGradient id="pinkRoseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F8BBD0" /> 
            <stop offset="60%" stopColor="#F48FB1" />
            <stop offset="100%" stopColor="#C2185B" />
          </linearGradient>

          <linearGradient id="stemGradientReal" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#33691e" />
            <stop offset="50%" stopColor="#558b2f" />
            <stop offset="100%" stopColor="#1b5e20" />
          </linearGradient>

          {/* Cauldron Gradients */}
          <radialGradient id="cauldronBody" cx="40%" cy="30%" r="80%">
            <stop offset="0%" stopColor="#4b5563" /> 
            <stop offset="50%" stopColor="#1f2937" /> 
            <stop offset="100%" stopColor="#020617" /> 
          </radialGradient>
          
          <linearGradient id="cauldronRim" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6b7280" />
            <stop offset="50%" stopColor="#374151" />
            <stop offset="100%" stopColor="#111827" />
          </linearGradient>
          
          <radialGradient id="magicalGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.2" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* --- CAULDRON BACK (Interior) --- */}
        {/* The back rim interior */}
        <ellipse cx="200" cy="500" rx="88" ry="18" fill="#000000" />
        <ellipse cx="200" cy="500" rx="80" ry="15" fill="#111827" />
        
        {/* Magical glow inside */}
        <ellipse cx="200" cy="500" rx="60" ry="10" fill="url(#magicalGlow)" />

        {/* 
          Main Flower Loop 
          Stems converge to 200, 580 (inside the cauldron body)
        */}
        {ROSE_POSITIONS.map((pos, i) => {
          const isOpen = openedIndices.has(i);
          const isAnimating = animatingIndex === i;

          // Determine colors based on state for the glow
          // Open (Pink) vs Closed (Red) glow
          const glowColor = isOpen ? '#EC407A' : '#D50000';
          const baseTransform = `translate(${pos.x}px, ${pos.y}px) scale(${pos.scale}) rotate(${pos.rotation}deg)`;
          
          // CSS variables for animation
          const roseStyle: React.CSSProperties = {
            transformOrigin: 'center bottom',
            transformBox: 'fill-box',
            '--base-transform': baseTransform,
            '--glow-color': glowColor,
          } as React.CSSProperties;

          if (isAnimating) {
             roseStyle.animation = 'rose-pulse 1s ease-in-out infinite';
          } else {
             // Use the petalFlutter keyframe defined in tailwind config (which maps to @keyframes petalFlutter)
             roseStyle.animation = `petalFlutter ${4 + pos.delay}s ease-in-out infinite alternate`;
             roseStyle.transform = baseTransform;
             roseStyle.filter = 'none';
          }

          return (
            <g 
              key={`flower-group-${i}`}
              className="origin-bottom"
              style={{
                transformOrigin: '200px 580px',
                animation: `wind ${pos.duration}s ease-in-out infinite alternate`,
                animationDelay: `-${pos.delay * 5}s`
              }}
            >
              {/* Stem */}
              <path
                d={`M ${pos.x} ${pos.y + 15} Q 200 450 200 580`}
                stroke="url(#stemGradientReal)"
                strokeWidth="3.5"
                fill="none"
              />
              
              {/* Thorns */}
              <path d={`M ${pos.x} ${pos.y + 50} l -4 4 L ${pos.x-2} ${pos.y+55} Z`} fill="#1b5e20" opacity="0.8"/>
              <path d={`M ${pos.x + (200-pos.x)*0.3} ${pos.y + 90} l 4 4 L ${pos.x + (200-pos.x)*0.3 + 2} ${pos.y+95} Z`} fill="#1b5e20" opacity="0.8"/>
              
              {/* Leaves */}
              <g transform={`translate(${pos.x - 5}, ${pos.y + 60}) rotate(-10)`}>
                 <path d="M0 0 C-10 5 -15 15 -5 20 C5 15 10 5 0 0" fill="#2E7D32" opacity="0.9" />
                 <path d="M0 0 L-5 20" stroke="#1B5E20" strokeWidth="0.5" />
              </g>

              {/* Rose Head Group */}
              <g
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick(i);
                }}
                className={`cursor-pointer transition-colors duration-300 ease-out`}
                style={roseStyle}
              >
                 <RealisticRoseHead isOpen={isOpen} isAnimating={isAnimating} />
              </g>
            </g>
          );
        })}

        {/* --- CAULDRON FRONT --- */}
        <g drop-shadow="0 10px 10px rgba(0,0,0,0.5)">
            {/* Feet (Behind body, but part of front structure visually) */}
            <path d="M 145 610 L 140 645 A 5 5 0 0 0 155 645 L 160 625" fill="#1f2937" />
            <path d="M 255 610 L 260 645 A 5 5 0 0 0 245 645 L 240 625" fill="#1f2937" />

            {/* Main Body */}
            <path 
                d="M 112 500
                   C 112 600, 140 635, 200 635
                   C 260 635, 288 600, 288 500
                   Z"
                fill="url(#cauldronBody)"
            />
            
            {/* Highlight on body */}
            <path 
                d="M 130 520 Q 140 580 170 610" 
                stroke="rgba(255,255,255,0.1)" 
                strokeWidth="4" 
                strokeLinecap="round" 
                fill="none"
            />

            {/* Front Rim (Lip) */}
            <path
                d="M 112 500 A 88 18 0 0 0 288 500" 
                fill="none"
                stroke="url(#cauldronRim)"
                strokeWidth="8"
                strokeLinecap="round"
            />

            {/* Handles */}
            <g stroke="#374151" strokeWidth="6" fill="none">
                {/* Left Handle */}
                <path d="M 112 520 C 90 520, 90 560, 115 550" />
                {/* Right Handle */}
                <path d="M 288 520 C 310 520, 310 560, 285 550" />
            </g>
        </g>
      </svg>
    </div>
  );
};

export default RoseBouquet;