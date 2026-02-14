import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const NavigationTabs: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Define the order of pages
  const pages = ['/', '/roses', '/quiz', '/letter', '/passcode', '/music', '/her-page', '/promise', '/final-message', '/i-love-you'];
  const currentIndex = pages.indexOf(location.pathname);

  const handlePrev = () => {
    if (currentIndex > 0) {
      navigate(pages[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < pages.length - 1) {
      navigate(pages[currentIndex + 1]);
    }
  };

  // Do not render if path is unknown
  if (currentIndex === -1) return null;

  return (
    <div className="fixed top-4 left-4 z-[60] flex gap-2">
      {/* Back Button */}
      <button
        onClick={handlePrev}
        disabled={currentIndex === 0}
        className={`
          flex items-center px-4 py-2 rounded-full font-serif font-bold text-sm transition-all duration-300 border border-white/30 backdrop-blur-md shadow-lg
          ${currentIndex === 0 
            ? 'bg-gray-500/30 text-gray-300 cursor-not-allowed opacity-50' 
            : 'bg-white/20 text-white hover:bg-pink-500/40 hover:scale-105 hover:shadow-pink-500/20'
          }
        `}
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentIndex === pages.length - 1}
        className={`
          flex items-center px-4 py-2 rounded-full font-serif font-bold text-sm transition-all duration-300 border border-white/30 backdrop-blur-md shadow-lg
          ${currentIndex === pages.length - 1 
            ? 'bg-gray-500/30 text-gray-300 cursor-not-allowed opacity-50' 
            : 'bg-white/20 text-white hover:bg-pink-500/40 hover:scale-105 hover:shadow-pink-500/20'
          }
        `}
      >
        Next
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default NavigationTabs;