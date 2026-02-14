import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EnvelopePage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showFullLetter, setShowFullLetter] = useState(false);
  const [hearts, setHearts] = useState<{id: number, left: number, top: number, delay: number, scale: number}[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Generate static hearts for background
    const newHearts = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      scale: 0.5 + Math.random() * 1
    }));
    setHearts(newHearts);
  }, []);

  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      // Wait for envelope animation to finish before showing full letter modal
      setTimeout(() => {
        setShowFullLetter(true);
      }, 1500);
    }
  };

  const handleClose = () => {
    setShowFullLetter(false);
    setIsOpen(false);
  };

  const goToNextPage = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent closing the modal
    navigate('/passcode');
  };

  return (
    <div className="min-h-screen w-full bg-pink-200 relative overflow-hidden flex flex-col items-center justify-center p-4">
      
      {/* Floating Hearts Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {hearts.map((heart) => (
            <div
                key={heart.id}
                className="absolute text-pink-400/40 animate-pulse"
                style={{
                    left: `${heart.left}%`,
                    top: `${heart.top}%`,
                    fontSize: `${heart.scale * 2}rem`,
                    animationDelay: `${heart.delay}s`,
                    animationDuration: `${3 + heart.scale}s`
                }}
            >
                ♥
            </div>
        ))}
      </div>

      <div className="z-10 flex flex-col items-center gap-8">
        
        {/* Helper Text */}
        <div className={`transition-opacity duration-500 ${isOpen ? 'opacity-0' : 'opacity-100'}`}>
            <p className="font-script text-4xl text-rose-600 animate-bounce">Click on me</p>
        </div>

        {/* Envelope Container */}
        <div 
            className="relative cursor-pointer group transition-transform hover:scale-105"
            onClick={handleOpen}
            style={{ width: '300px', height: '200px' }}
        >
            {/* Envelope Body (Back) */}
            <div className="absolute bottom-0 w-full h-full bg-rose-700 rounded-lg shadow-2xl overflow-hidden"></div>
            
            {/* The Letter (Inside) */}
            <div 
                className={`absolute left-4 right-4 bg-white p-4 shadow-md transition-all duration-[1000ms] ease-in-out flex flex-col items-center justify-start
                    ${isOpen ? 'bottom-24 transform -translate-y-10 z-20 h-40' : 'bottom-0 h-32 z-0'}
                `}
            >
                <div className="w-full h-2 bg-gray-200 mb-2 rounded"></div>
                <div className="w-3/4 h-2 bg-gray-200 mb-2 rounded"></div>
                <div className="w-5/6 h-2 bg-gray-200 rounded"></div>
                {/* Micro text representation */}
                <p className="mt-4 text-[4px] text-gray-400 text-center leading-tight">
                    To the love of my life...
                </p>
            </div>

            {/* Envelope Flaps (Front) */}
            {/* Bottom Flap */}
            <div className="absolute bottom-0 w-0 h-0 border-l-[150px] border-r-[150px] border-b-[100px] border-l-transparent border-r-transparent border-b-rose-600 z-30 pointer-events-none"></div>
            {/* Left Flap */}
            <div className="absolute top-0 left-0 w-0 h-0 border-t-[100px] border-l-[150px] border-b-[100px] border-t-transparent border-l-rose-800 border-b-transparent z-20 pointer-events-none"></div>
            {/* Right Flap */}
            <div className="absolute top-0 right-0 w-0 h-0 border-t-[100px] border-r-[150px] border-b-[100px] border-t-transparent border-r-rose-800 border-b-transparent z-20 pointer-events-none"></div>
            
            {/* Top Flap (The one that opens) */}
            <div 
                className={`absolute top-0 w-0 h-0 border-l-[150px] border-r-[150px] border-t-[100px] border-l-transparent border-r-transparent border-t-rose-700 z-40 transform-gpu origin-top transition-transform duration-700 ease-in-out
                    ${isOpen ? 'rotate-x-180 z-10' : ''}
                `}
                style={{ transformStyle: 'preserve-3d' }}
            >
            </div>
        </div>

      </div>

      {/* Full Screen Letter Modal */}
      {showFullLetter && (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
            onClick={handleClose}
        >
            <div 
                className="bg-white/95 relative w-full max-w-2xl p-8 md:p-12 rounded-sm shadow-[0_0_50px_rgba(255,255,255,0.8)] animate-scale-up flex flex-col"
                onClick={(e) => e.stopPropagation()}
                style={{
                    backgroundImage: 'linear-gradient(rgba(244, 63, 94, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(244, 63, 94, 0.05) 1px, transparent 1px)',
                    backgroundSize: '30px 30px',
                    maxHeight: '90vh'
                }}
            >
                 {/* Paper Texture Effect */}
                 <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] pointer-events-none"></div>

                 <button 
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-rose-500 transition-colors z-20"
                 >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                 </button>

                 <div className="text-center overflow-y-auto custom-scrollbar px-2 py-4">
                    <h2 className="text-3xl md:text-4xl font-script text-rose-600 mb-8">To the love of my life</h2>
                    
                    <div className="font-serif text-lg md:text-xl text-gray-800 leading-relaxed space-y-4 text-justify md:text-center">
                        <p>
                            You make my life so meaningful, and I am so grateful to have you. I love you with all my heart, and I can't wait to love you for the rest of my life.
                        </p>
                        <p>
                            I know I tell you this every day, and you might get tired of it, but I'll keep telling you again and again. 
                        </p>
                        <p className="font-bold text-rose-700 text-2xl mt-4">
                            You're literally the most beautiful girl in the world, and I will always love you.
                        </p>
                    </div>

                    <div className="mt-8 text-rose-500 text-4xl animate-pulse">
                        ❤️
                    </div>

                    <div className="mt-12 pt-8 border-t border-rose-100 flex justify-center pb-4">
                        <button 
                            onClick={goToNextPage}
                            className="font-script text-3xl text-rose-500 hover:text-rose-700 transition-all hover:scale-105 border-b-2 border-transparent hover:border-rose-300 animate-bounce"
                            style={{ animationDuration: '2s' }}
                        >
                            Click on me, Love
                        </button>
                    </div>
                 </div>
            </div>
        </div>
      )}

      {/* Global Style for Rotate X if needed, though Tailwind rotate-x-180 might not be default in all versions, adding custom */}
      <style>{`
        .rotate-x-180 {
            transform: rotateX(180deg);
        }
      `}</style>
    </div>
  );
};

export default EnvelopePage;