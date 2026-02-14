import React, { useState, useEffect, useMemo } from 'react';

const TRANSLATIONS = [
  { lang: 'English', text: 'I love you' },
  { lang: 'Spanish', text: 'Te amo' },
  { lang: 'French', text: "Je t'aime" },
  { lang: 'German', text: 'Ich liebe dich' },
  { lang: 'Italian', text: 'Ti amo' },
  { lang: 'Japanese', text: '愛してる (Aishiteru)' },
  { lang: 'Korean', text: '사랑해 (Saranghae)' },
  { lang: 'Chinese', text: '我爱你 (Wǒ ài nǐ)' },
  { lang: 'Russian', text: 'Я тебя люблю (Ya tebya lyublyu)' },
  { lang: 'Arabic', text: 'أحبك (Uhibbuki)' },
  { lang: 'Portuguese', text: 'Eu te amo' },
  { lang: 'Hindi', text: 'मैं तुमसे प्यार करता हूँ' },
  { lang: 'Dutch', text: 'Ik hou van je' },
  { lang: 'Swedish', text: 'Jag älskar dig' },
  { lang: 'Greek', text: "S'agapo" },
  { lang: 'Filipino', text: 'Mahal kita' },
  { lang: 'Indonesian', text: 'Aku cinta kamu' },
  { lang: 'Urdu', text: 'Mujhe tumse mohabbat hai' },
  { lang: 'Turkish', text: 'Seni seviyorum' },
  { lang: 'Thai', text: 'Chan rak ter' },
  { lang: 'Vietnamese', text: 'Anh yêu em' },
  { lang: 'Swahili', text: 'Nakupenda' },
  { lang: 'Polish', text: 'Kocham cię' },
  { lang: 'Hebrew', text: 'Ani ohev otach' },
  { lang: 'Bengali', text: 'Ami tomake bhalobashi' },
];

const FloatingHearts = () => {
  const hearts = useMemo(() => Array.from({ length: 60 }).map((_, i) => ({
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
          className="absolute text-pink-400/40 drop-shadow-sm"
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

const ILoveYouPage: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % TRANSLATIONS.length);
    }, 2000); // Switch every 2 seconds

    return () => clearInterval(interval);
  }, []);

  const current = TRANSLATIONS[index];

  return (
    <div className="min-h-screen w-full bg-pink-50 flex flex-col items-center justify-center relative overflow-hidden text-center p-4">
       {/* Background */}
       <div className="absolute inset-0 bg-gradient-to-tr from-rose-100 via-pink-100 to-rose-50"></div>
       <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/hearts.png')] pointer-events-none"></div>
       
       <FloatingHearts />

       <div className="z-10 relative flex flex-col items-center justify-center h-full transition-all duration-500 ease-in-out">
          
          <div className="mb-12">
              <span className="inline-block px-4 py-1 bg-white/40 backdrop-blur-sm rounded-full text-rose-500 font-bold tracking-widest text-sm md:text-base border border-rose-200">
                  {current.lang}
              </span>
          </div>

          <h1 
            key={index} // Key change triggers animation re-mount
            className="text-5xl md:text-8xl font-script text-rose-600 drop-shadow-lg animate-fade-in leading-tight"
          >
             {current.text}
          </h1>

          <div className="mt-20 text-rose-400/60 font-serif italic text-lg">
             Forever & Always
          </div>

       </div>
    </div>
  );
};

export default ILoveYouPage;
