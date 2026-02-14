import React, { useState, useEffect } from 'react';
import HydrangeaIntro from './components/HydrangeaIntro';
import RoseBouquet from './components/RoseBouquet';
import ReasonModal from './components/ReasonModal';
import CompletionModal from './components/CompletionModal';
import RoseCurtain from './components/RoseCurtain';
import QuizPage from './components/QuizPage';
import EnvelopePage from './components/EnvelopePage';
import PasscodePage from './components/PasscodePage';
import MusicPlayerPage from './components/MusicPlayerPage';
import SeasonsPage from './components/SeasonsPage';
import PromisePage from './components/PromisePage';
import FinalMessagePage from './components/FinalMessagePage';
import ILoveYouPage from './components/ILoveYouPage';
import TangledBackground from './components/TangledBackground';
import NavigationTabs from './components/NavigationTabs';
import { REASONS } from './constants';
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom';

const STORAGE_KEY = 'alam-sara-roses-opened-v1';

const RosesPage: React.FC = () => {
  const [openedIndices, setOpenedIndices] = useState<Set<number>>(new Set());
  const [selectedReasonIndex, setSelectedReasonIndex] = useState<number | null>(null);
  const [showCompletion, setShowCompletion] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    // Load persisted state
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const loadedSet = new Set<number>(parsed);
          setOpenedIndices(loadedSet);
          
          // Check if already completed on load
          if (loadedSet.size === REASONS.length) {
             // Optional: Show it immediately or wait for user interaction?
             // Let's allow them to see the bouquet first, but maybe the modal pops up if they click anything or after a delay.
             // For now, we only trigger it on clicking the last rose.
             // If they reload the page after finishing, we can show it.
             setShowCompletion(true);
          }
        }
      } catch (e) {
        console.error("Failed to load saved state", e);
      }
    }
  }, []);

  const handleRoseClick = (index: number) => {
    // Open modal for the rose
    setSelectedReasonIndex(index);
    
    // Mark as opened
    const newSet = new Set(openedIndices);
    if (!newSet.has(index)) {
        newSet.add(index);
        setOpenedIndices(newSet);
        // Save state
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(newSet)));

        // Check if all roses are opened
        if (newSet.size === REASONS.length) {
            // Trigger completion modal after the reason modal is closed? 
            // Or show it after a delay?
            // Let's set a flag but only show it when the Reason Modal is closed?
            // Or we can just show it over everything.
            // Let's wait for the user to close the reason modal, then show completion.
            // But we can't easily track "on close" here specifically for the last one without extra state.
            // Simpler: Set showCompletion to true, but maybe the ReasonModal has higher z-index?
            // Let's use an effect or just simple logic.
        }
    }
  };

  const closeModal = () => {
    setSelectedReasonIndex(null);
    // After closing the modal, check if we should show the completion screen
    if (openedIndices.size === REASONS.length) {
        setShowCompletion(true);
    }
  };

  const handleGoToQuiz = () => {
    setIsLeaving(true); // Triggers RoseCurtain close
    setTimeout(() => {
        navigate('/quiz');
    }, 1800);
  };

  // Safe access to reason data
  const activeReason = selectedReasonIndex !== null && selectedReasonIndex < REASONS.length 
    ? REASONS[selectedReasonIndex] 
    : null;

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      {/* Exit Transition Curtain */}
      {isLeaving && <RoseCurtain mode="close" />}

      {/* Tangled Theme Background */}
      <TangledBackground />

      <header className="pt-8 px-4 text-center z-10 relative">
        <h1 className="text-3xl md:text-5xl font-script text-amber-100 mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Here are the reasons why I love you
        </h1>
        <p className="text-amber-200/90 font-sans text-sm md:text-base font-light tracking-wide drop-shadow-md">
            Click on each rose to see a reason why Alam loves you
        </p>
      </header>

      <main className="flex-1 flex items-end justify-center z-10 h-full pb-4">
        <RoseBouquet 
          openedIndices={openedIndices} 
          onRoseClick={handleRoseClick} 
        />
      </main>

      {/* Modals */}
      <ReasonModal 
        reason={activeReason} 
        onClose={closeModal} 
      />

      {/* Completion Modal - Only show if ReasonModal is NOT open, to avoid overlap clutter */}
      {showCompletion && !activeReason && !isLeaving && (
        <CompletionModal onNext={handleGoToQuiz} />
      )}
    </div>
  );
};

const IntroWrapper = () => {
  const navigate = useNavigate();
  return <HydrangeaIntro onStart={() => navigate('/roses')} />;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <NavigationTabs />
      <Routes>
        <Route path="/" element={<IntroWrapper />} />
        <Route path="/roses" element={<RosesPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/letter" element={<EnvelopePage />} />
        <Route path="/passcode" element={<PasscodePage />} />
        <Route path="/music" element={<MusicPlayerPage />} />
        <Route path="/her-page" element={<SeasonsPage />} />
        <Route path="/promise" element={<PromisePage />} />
        <Route path="/final-message" element={<FinalMessagePage />} />
        <Route path="/i-love-you" element={<ILoveYouPage />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
