import React from 'react';
import { Reason } from '../constants';

interface Props {
  reason: Reason | null;
  onClose: () => void;
}

const ReasonModal: React.FC<Props> = ({ reason, onClose }) => {
  if (!reason) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rose-100/40 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border-4 border-rose-200 transform transition-all animate-scale-up"
        onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside box
        style={{
            backgroundImage: `radial-gradient(#ffe4e6 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
        }}
      >
        {/* Decorative Hearts */}
        <div className="absolute -top-4 -left-4 text-4xl animate-bounce">💖</div>
        <div className="absolute -bottom-4 -right-4 text-4xl animate-bounce" style={{ animationDelay: '0.5s' }}>💝</div>

        {/* Close Button */}
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-rose-500 transition-colors p-2"
        >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
        </button>

        {/* Content */}
        <div className="text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-script text-rose-600 font-bold leading-tight">
                {reason.title}
            </h2>
            
            <div className="w-16 h-1 bg-rose-200 mx-auto rounded-full"></div>

            <p className="text-gray-700 font-serif text-lg md:text-xl leading-relaxed whitespace-pre-line max-h-[60vh] overflow-y-auto custom-scrollbar px-2">
                {reason.summary}
            </p>
        </div>
      </div>
    </div>
  );
};

export default ReasonModal;