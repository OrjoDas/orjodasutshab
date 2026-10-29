import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { ThreeCanvas } from './components/ThreeCanvas';
import { CyberBootLoader } from './components/CyberBootLoader';
import { CustomContextMenu } from './components/CustomContextMenu';
import { DigitalWorldModal } from './components/DigitalWorldModal';
import { CommandPalette } from './components/CommandPalette';
import { BookingModal } from './components/BookingModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { BackgroundChangerModal } from './components/BackgroundChangerModal';
import { ClientPortalModal } from './components/ClientPortalModal';
import { FaqNewsletterFooter } from './components/FaqNewsletterFooter';
import { AiAssistantModal } from './components/AiAssistantModal';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ServicesPage } from './pages/ServicesPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';

import { Bot, Sparkles, ArrowRight, ArrowUp, ArrowDown } from 'lucide-react';
import { ThemeMode, PageId } from './types';
import { PERSONAL_INFO } from './data/portfolioData';

const PAGE_ORDER: { id: PageId; title: string; subtitle: string }[] = [
  { id: 'home', title: 'Home', subtitle: 'Overview & Highlights' },
  { id: 'projects', title: 'Projects', subtitle: '120+ Web Applications' },
  { id: 'services', title: 'Services & Pricing', subtitle: 'Full-Stack Solutions' },
  { id: 'blog', title: 'Articles & Tutorials', subtitle: 'Engineering Insights' },
  { id: 'contact', title: 'Contact & Booking', subtitle: 'Let’s Build Together' },
];

export default function App() {
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [isDigitalWorldOpen, setIsDigitalWorldOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isBgChangerOpen, setIsBgChangerOpen] = useState(false);
  const [isClientPortalOpen, setIsClientPortalOpen] = useState(false);
  const [customBgUrl, setCustomBgUrl] = useState<string>('');

  // Multi-Page Routing State - Default to 'home' on initial load or browser refresh
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [bootFinished, setBootFinished] = useState(false);

  // 1-Second Continuous Scroll-to-Advance Timer
  const REQUIRED_SCROLL_TIME_MS = 1000; // Exactly 1.0 second
  const [scrollDurationMs, setScrollDurationMs] = useState(0);
  const transitionLockRef = useRef(false);
  const lastScrollTimeRef = useRef(0);
  const scrollTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Clean any accidental lingering #contact hash on initial reload
  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
    localStorage.removeItem('cyber_bg_url');
  }, []);

  // Navigate strictly to target page and sync URL hash
  const navigateTo = (page: PageId) => {
    // Lock transitions for 1.6s to absorb any inertia or momentum
    transitionLockRef.current = true;
    setScrollDurationMs(0);
    if (scrollTimerRef.current) {
      clearInterval(scrollTimerRef.current);
      scrollTimerRef.current = null;
    }

    if (page === 'about') {
      setCurrentPage('home');
      window.location.hash = '';
      setTimeout(() => {
        const el = document.getElementById('about');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : `#${page}`;

    // Immediately snap scroll to top of new page
    window.scrollTo({ top: 0, behavior: 'instant' });

    setTimeout(() => {
      transitionLockRef.current = false;
      setScrollDurationMs(0);
    }, 1600);
  };

  // Listen to browser forward/backward hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash.replace('#', '').toLowerCase().trim();
      const validPages: PageId[] = ['home', 'about', 'projects', 'services', 'blog', 'contact'];
      if (validPages.includes(rawHash as PageId)) {
        setCurrentPage(rawHash as PageId);
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Keyboard Shortcuts (1-6: Pages, A: AI Assistant) - Safely ignoring Ctrl/Cmd/Alt combinations like Ctrl+C
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // NEVER trigger navigation shortcuts when Ctrl, Meta (Cmd), or Alt is pressed (e.g. Ctrl+C copy)
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      // Don't trigger shortcuts if user is typing inside an input/textarea/contentEditable
      const targetTag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      const isEditable = (e.target as HTMLElement)?.isContentEditable;
      if (targetTag === 'input' || targetTag === 'textarea' || isEditable) return;

      const key = e.key.toLowerCase();
      if (key === '1') {
        navigateTo('home');
      } else if (key === '2') {
        navigateTo('about');
      } else if (key === '3') {
        navigateTo('projects');
      } else if (key === '4') {
        navigateTo('services');
      } else if (key === '5') {
        navigateTo('blog');
      } else if (key === '6') {
        navigateTo('contact');
      } else if (key === 'a') {
        setIsAiOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const currentPageIndex = PAGE_ORDER.findIndex((p) => p.id === currentPage);
  const nextPage = currentPageIndex >= 0 && currentPageIndex < PAGE_ORDER.length - 1 ? PAGE_ORDER[currentPageIndex + 1] : null;

  // 4-Second Continuous Scroll: User must scroll continuously at the bottom for 4 full seconds to advance
  useEffect(() => {
    let touchStartY = 0;

    const onUserScrollingDownAtBottom = () => {
      if (transitionLockRef.current) return;

      const scrollPos = window.innerHeight + window.scrollY;
      const totalHeight = document.documentElement.scrollHeight;
      // Must be at the bottom edge (within 20px)
      const isAtBottom = scrollPos >= totalHeight - 20;

      if (!isAtBottom) {
        setScrollDurationMs(0);
        if (scrollTimerRef.current) {
          clearInterval(scrollTimerRef.current);
          scrollTimerRef.current = null;
        }
        return;
      }

      // Record this active scroll event timestamp
      lastScrollTimeRef.current = Date.now();

      // Start the 50ms interval if not already active
      if (!scrollTimerRef.current) {
        scrollTimerRef.current = setInterval(() => {
          const now = Date.now();
          const idleTime = now - lastScrollTimeRef.current;

          // If user stopped scrolling for more than 400ms, pause and reset
          if (idleTime > 400) {
            setScrollDurationMs(0);
            if (scrollTimerRef.current) {
              clearInterval(scrollTimerRef.current);
              scrollTimerRef.current = null;
            }
            return;
          }

          setScrollDurationMs((prev) => {
            const nextVal = prev + 50;
            if (nextVal >= REQUIRED_SCROLL_TIME_MS) {
              if (scrollTimerRef.current) {
                clearInterval(scrollTimerRef.current);
                scrollTimerRef.current = null;
              }
              const currentIndex = PAGE_ORDER.findIndex((p) => p.id === currentPage);
              // Strictly advance 1 page only (Home -> About, About -> Projects, etc.)
              if (currentIndex >= 0 && currentIndex < PAGE_ORDER.length - 1) {
                navigateTo(PAGE_ORDER[currentIndex + 1].id);
              }
              return 0;
            }
            return nextVal;
          });
        }, 50);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) {
        onUserScrollingDownAtBottom();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const diffY = touchStartY - currentY;
      if (diffY > 5) {
        onUserScrollingDownAtBottom();
      }
      touchStartY = currentY;
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      if (scrollTimerRef.current) {
        clearInterval(scrollTimerRef.current);
        scrollTimerRef.current = null;
      }
    };
  }, [currentPage]);

  return (
    <LanguageProvider>
      <div className="bg-[#020617] text-slate-100 min-h-screen relative overflow-x-hidden selection:bg-cyan-500 selection:text-slate-950 font-sans flex flex-col justify-between">
        {/* Full-Stack Boot Animation Loading Screen */}
        {!bootFinished && (
          <CyberBootLoader onComplete={() => setBootFinished(true)} />
        )}

        {/* Custom Context Menu on Right Click */}
        <CustomContextMenu
          onOpenAi={() => setIsAiOpen(true)}
          onOpenBgChanger={() => setIsBgChangerOpen(true)}
        />

        {/* Interactive 3D Canvas Background */}
        <ThreeCanvas theme={theme} bgUrl={customBgUrl} />

        {/* Fixed Navigation Bar with Desktop Tabs & Mobile Drawer */}
        <Navbar
          currentPage={currentPage}
          onNavigate={navigateTo}
          theme={theme}
          onThemeChange={setTheme}
          onOpenAi={() => setIsAiOpen(true)}
          onOpenDigitalWorld={() => setIsDigitalWorldOpen(true)}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onOpenBooking={() => setIsBookingOpen(true)}
          onOpenBgChanger={() => setIsBgChangerOpen(true)}
          onOpenClientPortal={() => setIsClientPortalOpen(true)}
        />


        {/* Multi-Page Main Content View with Smooth Page Transitions */}
        <main className="relative z-10 flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              {currentPage === 'home' && (
                <HomePage
                  onNavigate={navigateTo}
                  onOpenAi={() => setIsAiOpen(true)}
                />
              )}

              {currentPage === 'about' && (
                <HomePage
                  onNavigate={navigateTo}
                  onOpenAi={() => setIsAiOpen(true)}
                />
              )}

              {currentPage === 'projects' && (
                <ProjectsPage onNavigate={navigateTo} />
              )}

              {currentPage === 'services' && (
                <ServicesPage
                  onNavigate={navigateTo}
                  onOpenBooking={() => setIsBookingOpen(true)}
                />
              )}

              {currentPage === 'blog' && (
                <BlogPage onNavigate={navigateTo} />
              )}

              {currentPage === 'contact' && (
                <ContactPage
                  onNavigate={navigateTo}
                  onOpenBooking={() => setIsBookingOpen(true)}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Global Footer on All Pages */}
        <FaqNewsletterFooter
          onNavigate={navigateTo}
          showFaq={currentPage === 'home' || currentPage === 'services'}
        />

        {/* Next Chapter on Scroll Dock */}
        {nextPage ? (
          <div className="border-t border-white/10 bg-gradient-to-b from-slate-950 via-slate-900 to-black py-10 px-4 relative z-20 backdrop-blur-2xl">
            <div className="max-w-2xl mx-auto text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest shadow-[0_0_20px_rgba(6,182,212,0.25)]">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>Next Step: {nextPage.title}</span>
                <ArrowDown className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />
              </div>

              {/* 1-Second Progressive Scroll Countdown & Progress Meter */}
              {(() => {
                const scrollPercent = Math.min(100, Math.round((scrollDurationMs / REQUIRED_SCROLL_TIME_MS) * 100));
                const secondsRemaining = Math.max(0, (REQUIRED_SCROLL_TIME_MS - scrollDurationMs) / 1000).toFixed(1);

                return (
                  <div className="space-y-2.5 max-w-sm mx-auto bg-slate-900/90 p-4 rounded-2xl border border-white/15 backdrop-blur-md shadow-xl">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-300 flex items-center gap-1.5">
                        {scrollDurationMs > 0 ? (
                          <span className="text-amber-300 font-bold animate-pulse">⏱️ Scrolling...</span>
                        ) : (
                          <span>Scroll at bottom for 1s:</span>
                        )}
                      </span>
                      <span className="text-cyan-300 font-extrabold text-sm">
                        {scrollDurationMs > 0 ? `${secondsRemaining}s remaining` : '1.0s'}
                      </span>
                    </div>

                    {/* Progress bar track */}
                    <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-white/10 shadow-inner">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 transition-all duration-75 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.6)]"
                        style={{ width: `${scrollPercent}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span>0s</span>
                      <span className="text-cyan-400 font-bold">{scrollPercent}%</span>
                      <span>1s</span>
                    </div>
                  </div>
                );
              })()}

              <p className="text-xs text-slate-400 font-mono">
                Keep scrolling down for 1 second or click below to proceed to <strong className="text-cyan-300">{nextPage.title}</strong>
              </p>

              <button
                onClick={() => navigateTo(nextPage.id)}
                data-cursor-hover="true"
                data-cursor-text={nextPage.title.toUpperCase()}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-extrabold text-xs tracking-wider shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.7)] hover:scale-105 transition-all inline-flex items-center justify-center gap-3 font-mono uppercase cursor-pointer"
              >
                <span>Continue to {nextPage.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="border-t border-white/10 bg-slate-950 py-8 px-4 relative z-20 text-center font-mono">
            <button
              onClick={() => navigateTo('home')}
              data-cursor-hover="true"
              data-cursor-text="HOME"
              className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white text-white hover:text-slate-950 text-xs font-bold uppercase tracking-wider transition-all border border-white/20 cursor-pointer inline-flex items-center gap-2"
            >
              <span>Back to Home</span>
              <ArrowUp className="w-4 h-4 text-cyan-400" />
            </button>
          </div>
        )}

        {/* Floating AI Chatbot Button */}
        <button
          onClick={() => setIsAiOpen(true)}
          data-cursor-hover="true"
          data-cursor-text="DEVBOT"
          className="fixed bottom-6 left-6 z-40 p-3.5 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 text-white shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:scale-110 hover:shadow-[0_0_35px_rgba(6,182,212,0.8)] transition-all cursor-pointer flex items-center gap-2 font-mono text-xs font-bold"
        >
          <Bot className="w-5 h-5 text-cyan-200 animate-bounce" />
          <span className="hidden sm:inline">Ask DevBot 2.0</span>
          <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
        </button>

        {/* Client Portal Modal */}
        <ClientPortalModal
          isOpen={isClientPortalOpen}
          onClose={() => setIsClientPortalOpen(false)}
          onOpenBooking={() => {
            setIsClientPortalOpen(false);
            setIsBookingOpen(true);
          }}
        />

        {/* 3D Cyber Space Digital World View */}
        <DigitalWorldModal
          isOpen={isDigitalWorldOpen}
          onClose={() => setIsDigitalWorldOpen(false)}
          onOpenAi={() => setIsAiOpen(true)}
        />

        {/* Command Palette (Ctrl + K) */}
        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          onOpenAi={() => setIsAiOpen(true)}
          onOpenDigitalWorld={() => setIsDigitalWorldOpen(false)}
          onOpenBgChanger={() => setIsBgChangerOpen(true)}
          onNavigate={navigateTo}
        />

        {/* Custom Background Image Link Changer Modal */}
        <BackgroundChangerModal
          isOpen={isBgChangerOpen}
          onClose={() => setIsBgChangerOpen(false)}
          currentBgUrl={customBgUrl}
          onApplyBgUrl={(url) => {
            setCustomBgUrl(url);
            localStorage.setItem('cyber_bg_url', url);
          }}
        />

        {/* Meeting Booking Modal */}
        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
        />

        {/* AI Assistant Floating Modal */}
        <AiAssistantModal
          isOpen={isAiOpen}
          onClose={() => setIsAiOpen(false)}
          onOpenAdminPanel={() => setIsAdminPanelOpen(true)}
          onOpenBooking={() => {
            setIsAiOpen(false);
            setIsBookingOpen(true);
          }}
        />

        {/* ORJO // CONTROL CENTER - Admin Panel Modal */}
        <AdminPanelModal
          isOpen={isAdminPanelOpen}
          onClose={() => setIsAdminPanelOpen(false)}
        />
      </div>
    </LanguageProvider>
  );
}
