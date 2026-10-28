import { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { PageType, ClubHouse, Segment } from './types';
import { FOUR_HOUSES } from './data/festData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SnowfallCanvas } from './components/SnowfallCanvas';
import { LoadingScreen } from './components/LoadingScreen';
import { TickifyModal } from './components/TickifyModal';
import { SortingQuizModal } from './components/SortingQuizModal';
import { SegmentRulesModal } from './components/SegmentRulesModal';
import { ClubLoreModal } from './components/ClubLoreModal';
import { ScrollToTop } from './components/ScrollToTop';
import { AncientScriptureBackground } from './components/AncientScriptureBackground';
import { InAppBrowserGate } from './components/InAppBrowserGate';
import { ErrorBoundary } from './components/ErrorBoundary';
// Pages — Home loads eagerly (landing page), others lazy-loaded for smaller initial bundle
import { Home } from './pages/Home';
const FestDescription = lazy(() => import('./pages/FestDescription'));
const Clubs = lazy(() => import('./pages/Clubs'));
const Segments = lazy(() => import('./pages/Segments'));
const Sponsorships = lazy(() => import('./pages/Sponsorships'));
const Organizers = lazy(() => import('./pages/Organizers'));

const PAGE_TYPES: PageType[] = [
  'home',
  'description',
  'clubs',
  'segments',
  'sponsorships',
  'organizers',
];

const pageToHash = (page: PageType): string => (page === 'home' ? '#/' : `#/${page}`);

const pageFromLocation = (): PageType => {
  if (window.location.hash.startsWith('#/')) {
    const hash = window.location.hash.slice(2).toLowerCase();
    return PAGE_TYPES.includes(hash as PageType) ? (hash as PageType) : 'home';
  }
  const path = window.location.pathname.replace(/^\/+|\/+$/g, '').split('/').pop()?.toLowerCase() ?? '';
  return PAGE_TYPES.includes(path as PageType) ? (path as PageType) : 'home';
};

const initialPage = pageFromLocation();

export function App() {
  const [currentPage, setCurrentPage] = useState<PageType>(initialPage);
  const [targetPage, setTargetPage] = useState<PageType>(initialPage);
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

  // House the Clubs page should open its chronicle on (set from the
  // home page's "View Lore" archive → "Enter the House Chronicle").
  const [focusHouseId, setFocusHouseId] = useState<string | null>(null);

  const handleOpenClubChronicle = (houseId: string) => {
    setFocusHouseId(houseId);
    handleNavigate('clubs');
  };
  // House archive modal state. IMPORTANT: the modal itself is rendered at
  // the App ROOT (below, next to the Sorting Quiz) — never inside <Home> —
  // because <main> is a z-10 stacking context and would trap the modal
  // beneath the fixed navbar (z-40), hiding its top and close button.
  const [loreHouse, setLoreHouse] = useState<ClubHouse | null>(null);

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

  useEffect(() => {
    const handleLocationChange = () => {
      const page = pageFromLocation();
      setTargetPage(page);
      setCurrentPage(page);
      setIsLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Page Navigation with Cinematic "Winter is Coming" Loading Screen
  const handleNavigate = useCallback((page: PageType) => {
    if (page === currentPage) {
      window.history.replaceState(null, '', pageToHash(page));
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.history.pushState(null, '', pageToHash(page));
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
    const next = snowMode === 'gentle' ? 'blizzard' : snowMode === 'blizzard' ? 'off' : 'gentle';
    setSnowMode(next);
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
    <div className="min-h-screen bg-ink text-bone selection:bg-crimson selection:text-ink flex flex-col relative font-sans">

      {/* Ancient Scripture Background */}
      <AncientScriptureBackground />

      {/* Dynamic Falling Snow Simulation */}
      <SnowfallCanvas intensity={snowMode} aboveLoader={isLoading} />

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
      />

      {/* Page Content Body — `overflow-x-clip` keeps the scroll-reveal
          transforms (3D flips, sideways sweeps) from widening the document
          and dragging the fixed header/loader out of the viewport. */}
      <main className="flex-1 relative z-10 overflow-x-clip">
        <ErrorBoundary
          fallback={
            <div className="min-h-[60vh] flex flex-col items-center justify-center pt-24 text-crimson font-cinzel text-xl text-center px-6">
              <p>Failed to load this realm.</p>
              <p className="mt-2 text-bone/60 text-sm">
                Check the browser console (F12 → Console) for details.
              </p>
            </div>
          }
        >
          <Suspense fallback={<div className="min-h-[60vh] flex flex-col items-center justify-center pt-24 text-bone/60 font-cinzel text-xl">Loading realm...</div>}>
          {currentPage === 'home' && (
            <Home
              onNavigate={handleNavigate}
              onOpenSortingQuiz={() => setSortingQuizOpen(true)}
              onOpenLore={setLoreHouse}
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
              onPledgeHouse={handlePledgeHouse}
              userPledgedHouse={userPledgedHouse}
              focusHouseId={focusHouseId}
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
        </Suspense>
        </ErrorBoundary>
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Back to top button */}
      <ScrollToTop />

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
      {/* House Archive Modal — "View Lore" from the home page cards.
          Rendered at the root (like the quiz) so it covers the navbar. */}
      <ClubLoreModal
        house={loreHouse}
        onClose={() => setLoreHouse(null)}
        onEnterChronicle={handleOpenClubChronicle}
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


      {/* In-App Browser Gate — detects Instagram/Facebook/TikTok etc.
          in-app browsers and hands the visitor over to a real browser
          (Chrome / Firefox / device default), or offers a copy-link. */}
      <InAppBrowserGate />


    </div>
  );
}
export default App;
