import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PasscodePage: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [error, setError] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const navigate = useNavigate();

  const PASSCODE = '080604';

  useEffect(() => {
    if (isUnlocked) {
        // Redirect to Music page after showing success message
        const timer = setTimeout(() => {
            navigate('/music');
        }, 3000);
        return () => clearTimeout(timer);
    }
  }, [isUnlocked, navigate]);

  const handleNumClick = (num: string) => {
    if (input.length < 6) {
      const newInput = input + num;
      setInput(newInput);
      
      if (newInput.length === 6) {
        if (newInput === PASSCODE) {
          // Success
          setTimeout(() => {
              setIsUnlocked(true);
          }, 300);
        } else {
          // Failure
          setTimeout(() => {
            setError(true);
            // Reset after shake
            setTimeout(() => {
              setInput('');
              setError(false);
            }, 500);
          }, 200);
        }
      }
    }
  };

  const handleDelete = () => {
    if (input.length > 0) {
        setInput(prev => prev.slice(0, -1));
    }
  };

  if (isUnlocked) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-4">
        <div className="animate-fade-in text-center">
            <div className="text-6xl mb-6 animate-bounce">🎉</div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-pink-300">
                Correct!
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-light max-w-lg mx-auto leading-relaxed">
                You know the magic numbers! ❤️
            </p>
            <p className="mt-8 text-sm text-gray-500 animate-pulse">Loading next surprise...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white relative overflow-hidden select-none">
        
        {/* Background Image with Blur */}
        <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=2788&auto=format&fit=crop')] bg-cover bg-center blur-2xl opacity-40 transform scale-110"></div>
        
        <div className="z-10 w-full max-w-md px-6 flex flex-col items-center">
            
            <div className="mb-16 text-center">
                <div className="w-10 h-10 mx-auto mb-6 text-white/80">
                    <svg fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                    </svg>
                </div>
                <h2 className="text-2xl font-light tracking-wide mb-2">Enter Passcode</h2>
                <p className="text-sm text-white/60 font-medium tracking-wide uppercase">Enter Alam's birthday to unlock this page</p>
            </div>

            {/* Passcode Dots */}
            <div className={`flex gap-6 mb-24 transition-transform ${error ? 'animate-shake' : ''}`}>
                {Array.from({ length: 6 }).map((_, i) => (
                    <div 
                        key={i} 
                        className={`w-4 h-4 rounded-full border border-white transition-all duration-200 ${i < input.length ? 'bg-white' : 'bg-transparent'}`}
                    ></div>
                ))}
            </div>

            {/* Keypad */}
            <div className="grid grid-cols-3 gap-x-8 gap-y-6 w-full max-w-[280px]">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                    <button 
                        key={num}
                        onClick={() => handleNumClick(num.toString())}
                        className="w-20 h-20 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border-none text-3xl font-light transition-all active:bg-white/40 flex flex-col items-center justify-center outline-none"
                    >
                        {num}
                    </button>
                ))}
                
                <div className="w-20 h-20"></div> {/* Spacer */}
                
                <button 
                    onClick={() => handleNumClick('0')}
                    className="w-20 h-20 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border-none text-3xl font-light transition-all active:bg-white/40 flex items-center justify-center outline-none"
                >
                    0
                </button>
                
                <button 
                    onClick={handleDelete}
                    className="w-20 h-20 flex items-center justify-center text-sm font-semibold tracking-wide text-white/80 active:text-white outline-none"
                >
                    Cancel
                </button>
            </div>
        </div>
        
        <style>{`
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
                20%, 40%, 60%, 80% { transform: translateX(10px); }
            }
            .animate-shake {
                animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
            }
        `}</style>
    </div>
  );
};

export default PasscodePage;