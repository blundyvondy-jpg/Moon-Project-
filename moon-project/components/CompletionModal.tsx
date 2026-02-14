import React from 'react';

interface Props {
  onNext: () => void;
}

const CompletionModal: React.FC<Props> = ({ onNext }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-gradient-to-br from-rose-50 to-pink-100 rounded-3xl shadow-[0_0_50px_rgba(236,72,153,0.5)] p-10 border-4 border-rose-300 transform transition-all animate-scale-up text-center"
      >
        {/* Decorative Elements */}
        <div className="absolute -top-6 -left-6 text-6xl animate-bounce">🌹</div>
        <div className="absolute -bottom-6 -right-6 text-6xl animate-bounce" style={{ animationDelay: '0.7s' }}>✨</div>

        <h2 className="text-4xl md:text-5xl font-script text-rose-600 font-bold mb-6 drop-shadow-sm">
          Congratulations, my love.
        </h2>
        
        <p className="text-gray-800 font-serif text-xl md:text-2xl mb-10 leading-relaxed">
          You're done with this page.
        </p>

        <button
          onClick={onNext}
          className="group relative inline-flex items-center justify-center px-10 py-4 text-xl font-bold text-white transition-all duration-300 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full hover:from-rose-600 hover:to-pink-700 hover:scale-105 hover:shadow-[0_0_20px_rgba(244,63,94,0.6)] focus:outline-none focus:ring-4 focus:ring-pink-300"
        >
          <span className="font-script text-3xl mr-2">Click on this, baby</span>
          <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CompletionModal;