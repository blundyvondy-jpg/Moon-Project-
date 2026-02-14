import React, { useMemo, useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoseCurtain from './RoseCurtain';

// Icons
const PlayIcon = () => (
  <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const SkipBackIcon = () => (
  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
    <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
  </svg>
);

const SkipForwardIcon = () => (
  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
    <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
  </svg>
);

const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg className={`w-6 h-6 ${filled ? 'fill-green-500 text-green-500' : 'fill-none text-white'}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

// --- Custom Animated Animal Components ---

const AnimalContainer = ({ children }: { children?: React.ReactNode }) => (
  <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-white/40 rounded-full blur-[60px] animate-pulse"></div>
    <div className="relative w-full h-full animate-float">
      {children}
    </div>
  </div>
);

const AnimatedSeal = () => (
  <AnimalContainer>
    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl overflow-visible">
      {/* Back Tail/Flippers */}
      <path d="M100 160 Q 130 180, 110 150" fill="#e2e8f0" transform="rotate(-10 100 100)" />
      <path d="M100 160 Q 70 180, 90 150" fill="#e2e8f0" transform="rotate(10 100 100)" />
      {/* Body */}
      <ellipse cx="100" cy="125" rx="68" ry="52" fill="#ffffff" />
      {/* Front Flippers (Animated) */}
      <g className="origin-center" style={{ animation: 'sway 3s ease-in-out infinite' }}>
        <path d="M40 135 C 20 145, 20 115, 45 120" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
      </g>
      <g className="origin-center" style={{ animation: 'sway 3s ease-in-out infinite reverse' }}>
        <path d="M160 135 C 180 145, 180 115, 155 120" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
      </g>
      {/* Head */}
      <circle cx="100" cy="78" r="44" fill="#ffffff" />
      {/* Face */}
      <g transform="translate(0, 4)">
          <circle cx="84" cy="70" r="5.5" fill="#1e293b" />
          <circle cx="116" cy="70" r="5.5" fill="#1e293b" />
          <circle cx="86" cy="68" r="2" fill="white" />
          <circle cx="118" cy="68" r="2" fill="white" />
          <ellipse cx="100" cy="82" rx="7" ry="5" fill="#334155" />
          <path d="M96 86 Q 90 92, 94 94" stroke="#334155" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M104 86 Q 110 92, 106 94" stroke="#334155" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <circle cx="78" cy="84" r="7" fill="#f472b6" opacity="0.3" />
          <circle cx="122" cy="84" r="7" fill="#f472b6" opacity="0.3" />
          <path d="M70 86 L55 84 M70 90 L55 90 M70 94 L55 96" stroke="#cbd5e1" strokeWidth="1" opacity="0.8" />
          <path d="M130 86 L145 84 M130 90 L145 90 M130 94 L145 96" stroke="#cbd5e1" strokeWidth="1" opacity="0.8" />
      </g>
    </svg>
  </AnimalContainer>
);

const AnimatedPenguin = () => (
  <AnimalContainer>
    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl overflow-visible">
      {/* Feet */}
      <ellipse cx="80" cy="170" rx="15" ry="10" fill="#fb923c" />
      <ellipse cx="120" cy="170" rx="15" ry="10" fill="#fb923c" />
      
      {/* Body */}
      <g className="origin-bottom" style={{ animation: 'sway 2s ease-in-out infinite' }}>
        <ellipse cx="100" cy="110" rx="55" ry="70" fill="#334155" />
        <ellipse cx="100" cy="120" rx="40" ry="55" fill="#f8fafc" />
        
        {/* Wings */}
        <path d="M45 100 Q 30 120 40 140" stroke="#334155" strokeWidth="12" strokeLinecap="round" fill="none" />
        <path d="M155 100 Q 170 120 160 140" stroke="#334155" strokeWidth="12" strokeLinecap="round" fill="none" />
        
        {/* Face */}
        <g transform="translate(0, -10)">
          <circle cx="85" cy="80" r="4" fill="#1e293b" />
          <circle cx="115" cy="80" r="4" fill="#1e293b" />
          {/* Beak */}
          <path d="M90 90 L110 90 L100 105 Z" fill="#fb923c" />
          <circle cx="75" cy="95" r="5" fill="#f472b6" opacity="0.4" />
          <circle cx="125" cy="95" r="5" fill="#f472b6" opacity="0.4" />
        </g>
      </g>
    </svg>
  </AnimalContainer>
);

const AnimatedHippo = () => (
  <AnimalContainer>
    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl overflow-visible">
       {/* Ears (Wiggling) */}
       <g style={{ animation: 'sway 1s ease-in-out infinite' }}>
          <circle cx="60" cy="60" r="12" fill="#a5b4fc" />
          <circle cx="60" cy="60" r="6" fill="#818cf8" />
       </g>
       <g style={{ animation: 'sway 1s ease-in-out infinite reverse' }}>
          <circle cx="140" cy="60" r="12" fill="#a5b4fc" />
          <circle cx="140" cy="60" r="6" fill="#818cf8" />
       </g>

       {/* Head */}
       <rect x="50" y="70" width="100" height="90" rx="40" fill="#a5b4fc" />
       
       {/* Snout */}
       <rect x="40" y="110" width="120" height="70" rx="35" fill="#c7d2fe" />
       
       {/* Nostrils */}
       <ellipse cx="75" cy="135" rx="6" ry="10" fill="#4338ca" />
       <ellipse cx="125" cy="135" rx="6" ry="10" fill="#4338ca" />
       
       {/* Eyes */}
       <circle cx="70" cy="95" r="5" fill="#1e1b4b" />
       <circle cx="130" cy="95" r="5" fill="#1e1b4b" />

       {/* Teeth */}
       <path d="M70 180 L70 170 L80 170 L80 180 Z" fill="white" />
       <path d="M120 180 L120 170 L130 170 L130 180 Z" fill="white" />
    </svg>
  </AnimalContainer>
);

const AnimatedLlama = () => (
  <AnimalContainer>
    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl overflow-visible">
       <g className="origin-bottom" style={{ animation: 'sway 4s ease-in-out infinite' }}>
         {/* Neck */}
         <rect x="85" y="80" width="30" height="80" fill="#fefce8" />
         
         {/* Body fluff */}
         <circle cx="100" cy="160" r="40" fill="#fefce8" />
         
         {/* Head */}
         <ellipse cx="100" cy="80" rx="25" ry="35" fill="#fefce8" />
         
         {/* Ears */}
         <path d="M85 55 L80 20 L95 50 Z" fill="#fefce8" stroke="#fef08a" strokeWidth="2" />
         <path d="M115 55 L120 20 L105 50 Z" fill="#fefce8" stroke="#fef08a" strokeWidth="2" />

         {/* Snout */}
         <ellipse cx="100" cy="95" rx="12" ry="10" fill="#fde68a" />
         <path d="M95 95 Q100 100 105 95" stroke="#713f12" strokeWidth="1.5" fill="none" />
         <line x1="100" y1="92" x2="100" y2="96" stroke="#713f12" strokeWidth="1.5" />

         {/* Eyes (Chill) */}
         <path d="M85 75 Q90 70 95 75" stroke="#422006" strokeWidth="2" fill="none" />
         <path d="M105 75 Q110 70 115 75" stroke="#422006" strokeWidth="2" fill="none" />
         
         {/* Hair tuft */}
         <path d="M100 50 Q110 30 120 50" stroke="#fefce8" strokeWidth="5" fill="none" />
       </g>
    </svg>
  </AnimalContainer>
);

const AnimatedChowChow = () => (
  <AnimalContainer>
    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl overflow-visible">
      {/* Mane (Fluff ring) */}
      <g className="origin-center" style={{ animation: 'pulse-slow 2s ease-in-out infinite' }}>
          {Array.from({ length: 12 }).map((_, i) => (
             <circle 
                key={i} 
                cx={100 + 60 * Math.cos(i * Math.PI / 6)} 
                cy={100 + 60 * Math.sin(i * Math.PI / 6)} 
                r="25" 
                fill="#d97706" 
             />
          ))}
      </g>
      
      {/* Head */}
      <circle cx="100" cy="100" r="55" fill="#fbbf24" />
      
      {/* Ears (Hidden in fluff but visible tips) */}
      <path d="M60 70 L70 40 L85 65 Z" fill="#d97706" />
      <path d="M140 70 L130 40 L115 65 Z" fill="#d97706" />

      {/* Face */}
      <circle cx="80" cy="90" r="4" fill="#451a03" />
      <circle cx="120" cy="90" r="4" fill="#451a03" />
      
      {/* Snout */}
      <ellipse cx="100" cy="115" rx="15" ry="12" fill="#92400e" />
      <ellipse cx="100" cy="110" rx="6" ry="4" fill="#292524" /> {/* Nose */}

      {/* Tongue (Blue/Purple signature) */}
      <path d="M95 125 Q100 145 105 125" fill="#4c1d95" />
    </svg>
  </AnimalContainer>
);

const AnimatedCapybara = () => (
  <AnimalContainer>
    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl overflow-visible">
       {/* Body/Head (Boxy) */}
       <rect x="50" y="60" width="100" height="80" rx="25" fill="#a16207" />
       
       {/* Ears */}
       <path d="M60 60 Q50 40 70 60" stroke="#713f12" strokeWidth="4" fill="#a16207" />
       <path d="M140 60 Q150 40 130 60" stroke="#713f12" strokeWidth="4" fill="#a16207" />

       {/* Face Features */}
       <g transform="translate(0, 10)">
         {/* Eyes (Closed/Chill lines) */}
         <line x1="70" y1="90" x2="85" y2="90" stroke="#451a03" strokeWidth="3" strokeLinecap="round" />
         <line x1="115" y1="90" x2="130" y2="90" stroke="#451a03" strokeWidth="3" strokeLinecap="round" />
         
         {/* Snout Block */}
         <rect x="80" y="100" width="40" height="30" rx="10" fill="#713f12" opacity="0.2" />
         
         {/* Nose */}
         <path d="M90 110 L110 110 L100 120 Z" fill="#451a03" />
         <line x1="100" y1="120" x2="100" y2="125" stroke="#451a03" strokeWidth="2" />
         <path d="M95 125 Q100 130 105 125" stroke="#451a03" strokeWidth="2" fill="none" />
       </g>
       
       {/* Grass in mouth */}
       <path d="M105 125 L130 140 L125 110" stroke="#4ade80" strokeWidth="3" fill="none" transform="rotate(10 105 125)" />
    </svg>
  </AnimalContainer>
);

const AnimatedCat = () => (
  <AnimalContainer>
    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl overflow-visible">
       <g className="origin-bottom-center">
         {/* Tail */}
         <path d="M140 130 Q180 100 150 70" stroke="#fbbf24" strokeWidth="12" fill="none" strokeLinecap="round">
            <animate attributeName="d" values="M140 130 Q180 100 150 70; M140 130 Q190 140 160 90; M140 130 Q180 100 150 70" dur="3s" repeatCount="indefinite" />
         </path>

         {/* Head */}
         <circle cx="100" cy="100" r="50" fill="#fcd34d" />
         
         {/* Ears */}
         <path d="M60 70 L50 30 L80 60 Z" fill="#fcd34d" />
         <path d="M140 70 L150 30 L120 60 Z" fill="#fcd34d" />
         <path d="M62 65 L55 40 L75 60 Z" fill="#fbbf24" />
         <path d="M138 65 L145 40 L125 60 Z" fill="#fbbf24" />

         {/* Face */}
         <circle cx="80" cy="95" r="5" fill="#1e1b4b" />
         <circle cx="120" cy="95" r="5" fill="#1e1b4b" />
         <circle cx="82" cy="93" r="2" fill="white" />
         <circle cx="122" cy="93" r="2" fill="white" />
         
         {/* Nose */}
         <path d="M95 105 L105 105 L100 110 Z" fill="#f472b6" />
         
         {/* Mouth */}
         <path d="M100 110 Q90 115 95 120" stroke="#1e1b4b" strokeWidth="1.5" fill="none" />
         <path d="M100 110 Q110 115 105 120" stroke="#1e1b4b" strokeWidth="1.5" fill="none" />
         
         {/* Whiskers */}
         <path d="M60 100 L40 95 M60 105 L40 105 M60 110 L40 115" stroke="#78350f" strokeWidth="1" opacity="0.6" />
         <path d="M140 100 L160 95 M140 105 L160 105 M140 110 L160 115" stroke="#78350f" strokeWidth="1" opacity="0.6" />
       </g>
    </svg>
  </AnimalContainer>
);

interface SongPlayerProps {
  title: string;
  artist: string;
  coverUrl: string;
  boxTitle: string;
  youtubeUrl: string;
}

const SongPlayer: React.FC<SongPlayerProps> = ({ title, artist, coverUrl, boxTitle, youtubeUrl }) => {
  return (
    <div className="bg-black/40 backdrop-blur-md border border-white/20 rounded-xl p-6 w-full max-w-sm flex flex-col gap-4 text-white shadow-xl relative overflow-hidden group hover:border-pink-400/50 transition-colors duration-300">
        
        {/* Glass Reflection Effect */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>

        <h3 className="text-pink-300 font-script text-2xl mb-2 text-center drop-shadow-md">{boxTitle}</h3>

        {/* Album Art - Clickable Link */}
        <a 
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block aspect-square w-full relative shadow-2xl rounded-md overflow-hidden bg-gray-800 cursor-pointer"
        >
             <img src={coverUrl} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" />
             
             {/* Overlay Play Icon on Hover */}
             <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                    <PlayIcon />
                </div>
             </div>
        </a>

        {/* Track Info */}
        <div className="flex justify-between items-end mt-2">
            <div>
                <h4 className="font-bold text-xl tracking-tight">{title}</h4>
                <p className="text-gray-300 text-sm font-medium">{artist}</p>
            </div>
            <HeartIcon filled={true} />
        </div>

        {/* Fake Progress Bar for Aesthetic */}
        <div className="w-full bg-gray-600 rounded-full h-1 mt-2 mb-1">
            <div 
                className="bg-white rounded-full h-1 w-1/3"
            ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-400 font-mono">
            <span>1:20</span>
            <span>3:45</span>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between px-4 mt-2">
            <button className="text-gray-300 hover:text-white"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg></button>
            <div className="flex items-center gap-6">
                <button className="text-gray-300 hover:text-white"><SkipBackIcon /></button>
                <a 
                    href={youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg hover:shadow-pink-500/50"
                    title="Watch on YouTube"
                >
                    <PlayIcon />
                </a>
                <button className="text-gray-300 hover:text-white"><SkipForwardIcon /></button>
            </div>
             <button className="text-gray-300 hover:text-white"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/></svg></button>
        </div>
    </div>
  );
};

// Component to handle fade-in on scroll
const ScrollReveal: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-24 scale-90'} ${className}`}
    >
      {children}
    </div>
  );
};

const ANIMALS = [
  {
    name: "Sara's favorite animals",
    Component: AnimatedSeal,
  },
  {
    name: "Penguin",
    Component: AnimatedPenguin,
  },
  {
    name: "Hippopotamus",
    Component: AnimatedHippo,
  },
  {
    name: "Llama",
    Component: AnimatedLlama,
  },
  {
    name: "Chow Chow",
    Component: AnimatedChowChow,
  },
  {
    name: "Capybara",
    Component: AnimatedCapybara,
  },
  {
    name: "Cat",
    Component: AnimatedCat,
  },
];

const MusicPlayerPage: React.FC = () => {
  const navigate = useNavigate();
  const [showNextButton, setShowNextButton] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  // Generate random hearts for background
  const hearts = useMemo(() => Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    animationDuration: 3 + Math.random() * 4,
    delay: Math.random() * 5,
    scale: 0.8 + Math.random() * 1.5,
    rotation: Math.random() * 360,
    opacity: 0.1 + Math.random() * 0.4
  })), []);

  useEffect(() => {
    const handleScroll = () => {
        // Show button when user is near bottom (e.g. 150px from end)
        const isBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 150;
        setShowNextButton(isBottom);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNextClick = () => {
    setIsLeaving(true);
    setTimeout(() => {
        navigate('/her-page');
    }, 1800); 
  };

  return (
    <div className="w-full relative overflow-x-hidden bg-[#F48FB1] flex flex-col items-center animate-slide-in-right">
        {/* Exit Transition */}
        {isLeaving && <RoseCurtain mode="close" />}
        
        {/* --- Background Elements --- */}
        <div className="fixed inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/wall-4-light.png')] pointer-events-none mix-blend-multiply"></div>
        <div className="fixed top-10 left-[-50px] w-64 h-64 bg-pink-500 rounded-full blur-[80px] opacity-60 pointer-events-none"></div>
        <div className="fixed bottom-10 right-[-50px] w-80 h-80 bg-rose-600 rounded-full blur-[100px] opacity-60 pointer-events-none"></div>

        {/* Floating Hearts Background Layer */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {hearts.map((heart) => (
                <div 
                    key={heart.id}
                    className="absolute text-pink-200/50"
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
        
        {/* Decorative Graffiti Elements (Fixed) */}
        <div className="fixed top-20 right-10 rotate-12 opacity-30 pointer-events-none">
             <div className="border-4 border-white w-24 h-24 rounded-full skew-x-12"></div>
        </div>
        <div className="fixed bottom-40 left-10 -rotate-12 opacity-30 pointer-events-none">
             <div className="border-4 border-yellow-300 w-32 h-12 skew-y-6"></div>
        </div>
        
        {/* --- SECTION 1: MUSIC PLAYERS --- */}
        <div className="min-h-screen w-full flex flex-col items-center justify-center py-12 px-4 relative z-10">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-5xl md:text-7xl font-script text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,0.2)] stroke-black" 
                    style={{ textShadow: '4px 4px 0px #e11d48' }}>
                    Our Mixtape
                </h1>
                <p className="text-pink-100 font-sans text-lg tracking-widest uppercase mt-4 font-bold bg-black/20 inline-block px-4 py-1 rounded">
                    Songs that reminds us of each other
                </p>
            </div>

            {/* Players Container */}
            <div className="w-full max-w-5xl flex flex-col md:flex-row gap-12 items-center justify-center">
                <div className="transform md:-rotate-3 hover:rotate-0 transition-transform duration-500 hover:z-20">
                    <SongPlayer 
                        boxTitle="Song that reminds me of you"
                        title="Hide"
                        artist="Juice WRLD, Seezyn"
                        coverUrl="https://i.ytimg.com/vi/uYHNdTPV7pM/hqdefault.jpg"
                        youtubeUrl="https://www.youtube.com/watch?v=uYHNdTPV7pM" 
                    />
                </div>
                <div className="transform md:rotate-3 hover:rotate-0 transition-transform duration-500 hover:z-20">
                    <SongPlayer 
                        boxTitle="The song that reminds you of me"
                        title="Alone"
                        artist="Avenoir"
                        coverUrl="https://images.unsplash.com/photo-1514525253440-b393452e3383?q=80&w=2000&auto=format&fit=crop"
                        youtubeUrl="https://www.youtube.com/watch?v=eMvAmuhpKZY"
                    />
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 right-8 z-20 animate-bounce cursor-pointer" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
                <p className="font-script text-3xl text-pink-500 bg-white/90 px-6 py-2 rounded-full shadow-lg transform -rotate-3 hover:scale-110 transition-transform">
                    Scroll down, baby ⬇️
                </p>
            </div>
        </div>

        {/* --- SECTION 2: FAVORITE ANIMALS --- */}
        <div className="w-full max-w-6xl px-6 pb-40 z-10 flex flex-col gap-32">
            {ANIMALS.map((animal, index) => (
                <ScrollReveal key={index} className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center justify-center gap-12 md:gap-20`}>
                    
                    {/* Render Animated Component directly */}
                    <div className="transition-transform duration-500 hover:scale-105 hover:z-20">
                       <animal.Component />
                    </div>

                    {/* Text */}
                    <h2 className="text-5xl md:text-8xl font-script text-white text-center md:text-left drop-shadow-[5px_5px_0px_rgba(225,29,72,0.6)]"
                        style={{ textShadow: '4px 4px 0px #be123c' }}>
                        {animal.name}
                    </h2>

                </ScrollReveal>
            ))}
        </div>

        {/* --- FIXED BOTTOM RIGHT BUTTON (POP-UP) --- */}
        <div className={`fixed bottom-8 right-8 z-50 transition-all duration-700 transform ${showNextButton ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0'}`}>
            <button 
                onClick={handleNextClick}
                className="group relative flex items-center gap-3 bg-white/90 backdrop-blur-md px-8 py-4 rounded-full shadow-[0_0_30px_rgba(236,72,153,0.5)] border-2 border-pink-300 hover:border-pink-500 hover:scale-105 transition-all duration-300"
            >
                <span className="font-script text-2xl text-rose-600">Click on this cutie</span>
                <span className="text-2xl group-hover:translate-x-1 transition-transform">➡️</span>
            </button>
        </div>

        <style>{`
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            .animate-slide-in-right {
                animation: slideInRight 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
            }
        `}</style>
    </div>
  );
};

export default MusicPlayerPage;