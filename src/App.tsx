import { useState, useEffect, useCallback } from 'react';
import { PageType, ClubHouse, Segment } from './types';
import { FOUR_HOUSES } from './data/festData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SnowfallCanvas } from './components/SnowfallCanvas';
import { LoadingScreen } from './components/LoadingScreen';
import { TickifyModal } from './components/TickifyModal';
import { SortingQuizModal } from './components/SortingQuizModal';
import { SegmentRulesModal } from './components/SegmentRulesModal';

// Pages
import { Home } from './pages/Home';
import { FestDescription } from './pages/FestDescription';
import { Clubs } from './pages/Clubs';
import { Segments } from './pages/Segments';
import { Sponsorships } from './pages/Sponsorships';
import { Organizers } from './pages/Organizers';

export function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [targetPage, setTargetPage] = useState<PageType>('home');
  const [isLoading, setIsLoading] = useState<boolean>(true); // Initial winter loading
  const [snowMode, setSnowMode] = useState<'gentle' | 'blizzard' | 'off'>('gentle');
  
  // Modals state
  const [tickifyModalOpen, setTickifyModalOpen] = useState(false);
  const [selectedSegmentForTickify, setSelectedSegmentForTickify] = useState<string | undefined>();
  const [sortingQuizOpen, setSortingQuizOpen] = useState(false);
  const [rulesModalOpen, setRulesModalOpen] = useState(false);
  const [selectedSegmentForRules, setSelectedSegmentForRules] = useState<Segment | null>(null);

  // House Allegiance state
  const [userPledgedHouse, setUserPledgedHouse] = useState<ClubHouse | null>(null);

  // Load saved pledged house from localStorage on mount
  useEffect(() => {
    try {
      const savedHouseId = localStorage.getItem('cdcc_pledged_house');
      if (savedHouseId) {
        const found = FOUR_HOUSES.find(h => h.id === savedHouseId);
        if (found) setUserPledgedHouse(found);
      }
    } catch {
      // localStorage policy
    }
  }, []);

  const handlePledgeHouse = (house: ClubHouse) => {
    setUserPledgedHouse(house);
    try {
      localStorage.setItem('cdcc_pledged_house', house.id);
    } catch {}
  };

  // Page Navigation with Cinematic "Winter is Coming" Loading Screen
  const handleNavigate = useCallback((page: PageType) => {
    if (page === currentPage) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setTargetPage(page);
    setIsLoading(true);
  }, [currentPage]);

  const handleLoadingFinish = useCallback(() => {
    setCurrentPage(targetPage);
    setIsLoading(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [targetPage]);

  // Snow intensity toggle
  const handleToggleSnow = () => {
    setSnowMode(prev => {
      if (prev === 'gentle') return 'blizzard';
      if (prev === 'blizzard') return 'off';
      return 'gentle';
    });
  };

  // Open rules modal
  const handleOpenRules = (segment: Segment) => {
    setSelectedSegmentForRules(segment);
    setRulesModalOpen(true);
  };

  // Open Tickify modal for general or specific segment
  const handleOpenTickify = (segmentName?: string) => {
    setSelectedSegmentForTickify(segmentName);
    setTickifyModalOpen(true);
  };

  const getPageTitleName = (page: PageType): string => {
    switch (page) {
      case 'home': return 'The Iron Throne Room';
      case 'description': return 'The Citadel Chronicle';
      case 'clubs': return 'The Four Great Houses';
      case 'segments': return 'The Tournament Arenas';
      case 'sponsorships': return 'The Iron Bank Vault';
      case 'organizers': return 'The Small Council Chamber';
      default: return 'The Citadel';
    }
  };

  return (
    <div className="min-h-screen bg-[#040812] text-slate-100 selection:bg-sky-500 selection:text-slate-950 flex flex-col relative font-sans">
      
      {/* Dynamic Falling Snow Simulation */}
      <SnowfallCanvas intensity={snowMode} />

      {/* Cinematic Winter Loading Screen */}
      <LoadingScreen
        isLoading={isLoading}
        targetPageName={getPageTitleName(targetPage)}
        onFinish={handleLoadingFinish}
      />

      {/* Main Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        snowMode={snowMode}
        onToggleSnow={handleToggleSnow}
        onOpenTickifyModal={() => handleOpenTickify()}
      />

      {/* Page Content Body */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <Home
            onNavigate={handleNavigate}
            onOpenTickify={() => handleOpenTickify()}
            onOpenSortingQuiz={() => setSortingQuizOpen(true)}
            userPledgedHouse={userPledgedHouse}
          />
        )}

        {currentPage === 'description' && (
          <FestDescription
            onOpenTickify={() => handleOpenTickify()}
          />
        )}

        {currentPage === 'clubs' && (
          <Clubs
            onNavigate={handleNavigate}
            onOpenTickify={() => handleOpenTickify()}
            onPledgeHouse={handlePledgeHouse}
            userPledgedHouse={userPledgedHouse}
          />
        )}

        {currentPage === 'segments' && (
          <Segments
            onOpenRulesModal={handleOpenRules}
            onRegisterTickify={(name) => handleOpenTickify(name)}
          />
        )}

        {currentPage === 'sponsorships' && (
          <Sponsorships />
        )}

        {currentPage === 'organizers' && (
          <Organizers />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenTickifyModal={() => handleOpenTickify()}
      />

      {/* ========================================================
          MODALS & DRAWERS
      ======================================================== */}
      {/* Tickify Pass & Ticket Selection Modal */}
      <TickifyModal
        isOpen={tickifyModalOpen}
        onClose={() => setTickifyModalOpen(false)}
        preselectedSegment={selectedSegmentForTickify}
      />

      {/* GoT House Sorting Quiz Modal */}
      <SortingQuizModal
        isOpen={sortingQuizOpen}
        onClose={() => setSortingQuizOpen(false)}
        onPledgeHouse={handlePledgeHouse}
      />

      {/* Segment Detailed Rules Modal */}
      <SegmentRulesModal
        segment={rulesModalOpen ? selectedSegmentForRules : null}
        onClose={() => {
          setRulesModalOpen(false);
          setSelectedSegmentForRules(null);
        }}
        onRegisterTickify={(name) => {
          setRulesModalOpen(false);
          handleOpenTickify(name);
        }}
      />

    </div>
  );
}

export default App;
