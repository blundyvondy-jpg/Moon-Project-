import React, { useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lantern } from './TangledBackground';

// Floating Hearts Component
const FloatingHearts = () => {
  // Increased count to 100
  const hearts = useMemo(() => Array.from({ length: 100 }).map((_, i) => ({
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
          className="absolute text-pink-400/30 drop-shadow-sm"
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

interface SectionProps {
    text: string;
    subtext?: string;
    isBold?: boolean;
    children?: React.ReactNode;
    hideArrow?: boolean;
}

const Section = ({ text, subtext, isBold, children, hideArrow }: SectionProps) => (
    <section className="min-h-screen w-full flex flex-col items-center justify-center relative snap-start px-6">
        <h1 className={`text-4xl md:text-6xl font-script text-pink-100 text-center drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)] leading-relaxed animate-fade-in max-w-4xl ${isBold ? 'font-bold' : ''}`}>
            {text}
        </h1>
        {subtext && (
            <p className="mt-6 text-xl md:text-2xl font-serif text-pink-200/90 text-center animate-pulse max-w-2xl">
                {subtext}
            </p>
        )}
        
        {children}
        
        {!hideArrow && (
            <div className="absolute bottom-10 animate-bounce text-pink-300 opacity-60">
                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7"></path>
                 </svg>
            </div>
        )}
    </section>
);

const PromisePage: React.FC = () => {
    const navigate = useNavigate();

    // Increased lanterns to 60
    const lanterns = useMemo(() => Array.from({ length: 60 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * -20,
        duration: 15 + Math.random() * 10,
        size: 20 + Math.random() * 25
      })), []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="relative w-full h-screen bg-pink-950 overflow-y-scroll snap-y snap-mandatory scroll-smooth">
            
            {/* Background Layers (Fixed) - Darkish Pinkish Theme */}
            <div className="fixed inset-0 bg-gradient-to-br from-pink-900 via-rose-900 to-pink-800 pointer-events-none -z-20"></div>
            <div className="fixed inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none -z-15"></div>
            
            {/* Animated Background Elements */}
            <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
                 <FloatingHearts />
                 {/* Reusing the lantern component but wrapping it to ensure visibility */}
                 {lanterns.map(l => (
                    <Lantern key={l.id} {...l} />
                 ))}
            </div>

            {/* Content Sections Sequence */}
            
            {/* 1 */}
            <Section text="Sometimes I may not be able to show it." />
            
            {/* 2 */}
            <Section text="But my love for you is the same." />
            
            {/* 3 */}
            <Section text="I may run out of things to talk about." />
            
            {/* 4 */}
            <Section text="But I'll still love you always." subtext="My love for you will always be the same." />
            
            {/* 5 */}
            <Section text="I will be boring sometimes." />

            {/* 6 */}
            <Section text="But I'll still love you." />

            {/* 7 */}
            <Section text="Our relationship will feel dry sometimes." />

            {/* 8 */}
            <Section text="And I will love you through the dryness." />

            {/* 9 - Reprise */}
            <Section text="I may not be able to show it sometimes." />

            {/* 10 - Reprise */}
            <Section text="But I'll still love you the same." />

            {/* 11 - Final Bold with Button */}
            <Section text="My love for you will always be infinite." isBold={true} hideArrow={true}>
                <div className="mt-12">
                    <button 
                        onClick={() => navigate('/final-message')}
                        className="group relative px-10 py-4 bg-gradient-to-r from-rose-600 to-pink-600 rounded-full border-2 border-pink-300 text-white font-script text-3xl shadow-[0_0_30px_rgba(244,63,94,0.6)] hover:scale-105 hover:shadow-[0_0_50px_rgba(244,63,94,0.8)] transition-all duration-300"
                    >
                        Click on this My Love
                        <span className="absolute -top-2 -right-2 text-2xl animate-bounce">❤️</span>
                    </button>
                </div>
            </Section>

        </div>
    );
};

export default PromisePage;