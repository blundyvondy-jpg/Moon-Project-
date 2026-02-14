import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TangledBackground from './TangledBackground';
import RoseCurtain from './RoseCurtain';

interface Option {
  text: string;
  isCorrect: boolean;
}

interface Question {
  question: string;
  options: Option[];
  successTitle?: string;
  successMessage?: string;
  errorTitle?: string;
  errorMessage?: string;
}

const QUESTIONS: Question[] = [
  {
    question: "Does Alam love you more?",
    options: [
      { text: "True", isCorrect: true },
      { text: "False", isCorrect: false }
    ]
  },
  {
    question: "What is my favorite thing about you?",
    options: [
      { text: "Your eyes", isCorrect: true },
      { text: "Your hair", isCorrect: true },
      { text: "Your personality", isCorrect: true },
      { text: "All of the above", isCorrect: true }
    ]
  },
  {
    question: "When did we first meet?",
    options: [
      { text: "February 1, 1985", isCorrect: false },
      { text: "August 10, 2023", isCorrect: false },
      { text: "June 10, 2023", isCorrect: false },
      { text: "July 10, 2023", isCorrect: true }
    ],
    successTitle: "Good job, baby",
    successMessage: "You completed this question.",
    errorTitle: "Wrong",
    errorMessage: "You are wrong, baby, please try again."
  }
];

// Simple Firework Component using CSS
const FireworkDisplay = () => {
  // Generate random positions for fireworks
  const fireworks = Array.from({ length: 5 }).map((_, i) => ({
    id: i,
    left: Math.random() * 80 + 10 + '%',
    top: Math.random() * 60 + 10 + '%',
    delay: Math.random() * 2 + 's',
    color: ['#ef4444', '#3b82f6', '#22c55e', '#eab308', '#d946ef'][Math.floor(Math.random() * 5)]
  }));

  return (
    <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
      <style>
        {`
          @keyframes firework-burst {
            0% { transform: scale(0); opacity: 1; }
            50% { opacity: 1; }
            100% { transform: scale(1.5); opacity: 0; }
          }
          .firework {
            position: absolute;
            width: 150px;
            height: 150px;
            border-radius: 50%;
            background: radial-gradient(circle, var(--color) 10%, transparent 60%);
            animation: firework-burst 1.5s ease-out infinite;
            filter: blur(2px) brightness(1.5);
          }
          .spark {
             position: absolute;
             width: 4px; 
             height: 4px;
             background: var(--color);
             border-radius: 50%;
             animation: spark-fly 1s ease-out infinite;
          }
          @keyframes spark-fly {
            0% { transform: translate(0,0); opacity: 1; }
            100% { transform: translate(var(--dx), var(--dy)); opacity: 0; }
          }
        `}
      </style>
      {fireworks.map((fw) => (
        <div 
            key={fw.id} 
            className="firework"
            style={{ 
                left: fw.left, 
                top: fw.top, 
                animationDelay: fw.delay,
                '--color': fw.color 
            } as React.CSSProperties}
        >
             {/* Add some sparks for detail */}
             {Array.from({length: 8}).map((_, j) => (
                <div 
                    key={j}
                    className="spark"
                    style={{
                        top: '50%',
                        left: '50%',
                        animationDelay: fw.delay,
                        '--dx': `${Math.cos(j * 45 * (Math.PI/180)) * 100}px`,
                        '--dy': `${Math.sin(j * 45 * (Math.PI/180)) * 100}px`,
                        '--color': fw.color
                    } as React.CSSProperties}
                />
             ))}
        </div>
      ))}
    </div>
  );
};

const QuizPage: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [curtainMode, setCurtainMode] = useState<'open' | 'close' | null>(null); 
  const navigate = useNavigate();
  
  // Quiz State
  const [answerState, setAnswerState] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === QUESTIONS.length - 1;

  const handleAnswer = (isCorrect: boolean, index: number) => {
    setSelectedOptionIndex(index);
    
    if (isCorrect) {
      setAnswerState('correct');
    } else {
      setAnswerState('incorrect');
    }
  };

  const handleTryAgain = () => {
    setAnswerState('idle');
    setSelectedOptionIndex(null);
  };

  const handleNextQuestion = () => {
    // Start transition
    setCurtainMode('close');
  };

  const handleCurtainComplete = () => {
    if (curtainMode === 'close') {
      // Curtain fully closed.
      if (currentQuestionIndex < QUESTIONS.length - 1) {
          // Next question
          setCurrentQuestionIndex((prev) => prev + 1);
          setAnswerState('idle');
          setSelectedOptionIndex(null);
          setCurtainMode('open');
      } else {
          // Finished last question, navigate to letter page
          navigate('/letter');
          // No need to set curtain open here as the new page will handle its own entrance or layout transition
      }
    } else {
      // Curtain finished opening
      setCurtainMode(null);
    }
  };

  // Helper to style buttons based on state
  const getButtonStyle = (index: number) => {
    const baseClass = "group relative overflow-hidden rounded-xl p-1 border transition-all duration-300 w-full h-full ";
    
    if (answerState !== 'idle' && selectedOptionIndex === index) {
        if (answerState === 'correct') {
            return baseClass + "bg-green-600 border-green-400 shadow-[0_0_30px_rgba(34,197,94,0.6)] scale-105 z-20";
        }
        if (answerState === 'incorrect') {
            return baseClass + "bg-red-600 border-red-400 shadow-[0_0_30px_rgba(239,68,68,0.6)] scale-105 z-20";
        }
    }
    
    return baseClass + "bg-gradient-to-br from-indigo-900/80 to-purple-900/80 border-white/20 hover:border-pink-400 hover:scale-105 active:scale-95";
  };

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center text-center">
      <TangledBackground />
      
      {/* Rose Curtain Overlay for transitions */}
      {curtainMode && (
        <RoseCurtain mode={curtainMode} onComplete={handleCurtainComplete} />
      )}

      {/* FIREWORKS (Only when correct) */}
      {answerState === 'correct' && <FireworkDisplay />}

      <div className="z-10 relative max-w-4xl px-4 w-full">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 md:p-12 rounded-3xl shadow-[0_0_40px_rgba(253,224,71,0.2)] animate-fade-in transition-all duration-500">
          
          <div className="mb-8">
             <span className="inline-block px-4 py-1 rounded-full bg-pink-500/20 text-pink-200 text-sm font-serif tracking-widest border border-pink-500/30 mb-4">
               QUESTION {currentQuestionIndex + 1}
             </span>
             <h2 className="text-3xl md:text-5xl font-script text-amber-100 drop-shadow-md leading-tight">
               {currentQuestion.question}
             </h2>
          </div>

          <div className={`grid gap-6 mt-8 ${currentQuestion.options.length > 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2'}`}>
            {currentQuestion.options.map((option, index) => (
                <button
                    key={index}
                    onClick={() => handleAnswer(option.isCorrect, index)}
                    disabled={answerState !== 'idle'}
                    className={getButtonStyle(index)}
                >
                    <div className="relative h-full w-full bg-black/20 rounded-lg px-6 py-5 transition-all group-hover:bg-white/10 flex items-center justify-center">
                        <span className="text-xl md:text-2xl font-serif text-white group-hover:text-pink-100">
                            {option.text}
                        </span>
                    </div>
                </button>
            ))}
          </div>

        </div>
      </div>

      {/* MODALS / POPUPS */}
      
      {/* Incorrect Modal */}
      {answerState === 'incorrect' && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
           <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center border-4 border-red-200 shadow-2xl animate-scale-up">
              <div className="text-4xl mb-4">😢</div>
              <h3 className="text-2xl font-serif font-bold text-red-600 mb-2">
                {currentQuestion.errorTitle || "Oops!"}
              </h3>
              <p className="text-gray-600 mb-6 text-lg">
                {currentQuestion.errorMessage || "Please try again."}
              </p>
              <button 
                onClick={handleTryAgain}
                className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full font-bold transition-transform hover:scale-105"
              >
                Try again
              </button>
           </div>
        </div>
      )}

      {/* Correct Modal */}
      {answerState === 'correct' && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-transparent">
           {/* Modal Container with slight background but letting fireworks show through */}
           <div className="bg-white/90 backdrop-blur-md rounded-2xl p-10 max-w-md w-full text-center border-4 border-yellow-200 shadow-[0_0_50px_rgba(234,179,8,0.5)] animate-scale-up z-50">
              <div className="text-6xl mb-4 animate-bounce">🎆</div>
              <h3 className="text-4xl font-script font-bold text-purple-700 mb-4">
                {currentQuestion.successTitle || "Congratulations!"}
              </h3>
              <p className="text-gray-700 mb-8 text-xl font-serif">
                {currentQuestion.successMessage || "You got it right, my love! ❤️"}
              </p>
              <button 
                onClick={handleNextQuestion}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold text-xl transition-all hover:scale-105 hover:shadow-lg hover:shadow-pink-500/40"
              >
                {isLastQuestion ? "Finish" : "Next question"}
              </button>
           </div>
        </div>
      )}

    </div>
  );
};

export default QuizPage;