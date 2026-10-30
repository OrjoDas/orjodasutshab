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

const PAGE_ORDER: { id: PageId; title: string; displayTitle: string; subtitle: string }[] = [
  { id: 'home', title: 'Home', displayTitle: 'HOME', subtitle: 'Overview & Highlights' },
  { id: 'projects', title: 'Projects', displayTitle: 'PROJECTS', subtitle: '120+ Web Applications' },
  { id: 'services', title: 'Services & Pricing', displayTitle: 'SERVICES', subtitle: 'Full-Stack Solutions' },
  { id: 'blog', title: 'Articles & Tutorials', displayTitle: 'BLOG', subtitle: 'Engineering Insights' },
  { id: 'contact', title: 'Contact & Booking', displayTitle: 'CONTACT US', subtitle: 'Let’s Build Together' },
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
    // Lock transitions for 1.2s to absorb any inertia or momentum
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
      setTimeout(() => {
        transitionLockRef.current = false;
      }, 1200);
      return;
    }

    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : `#${page}`;

    // Immediately snap scroll to top of new page
    window.scrollTo({ top: 0, behavior: 'instant' });

    setTimeout(() => {
      transitionLockRef.current = false;
      setScrollDurationMs(0);
    }, 1200);
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
      <div className="bg-[#020617] text-slate-100 min-h-screen relative overflow-x-clip selection:bg-cyan-500 selection:text-slate-950 font-sans flex flex-col justify-between">
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
                <AboutPage onNavigate={navigateTo} />
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

        {/* Footer only on Contact Page */}
        {currentPage === 'contact' && (
          <FaqNewsletterFooter onNavigate={navigateTo} />
        )}

        {/* Lusion-Style Next Page Transition Dock */}
        {nextPage ? (
          <section
            onClick={() => navigateTo(nextPage.id)}
            data-cursor-hover="true"
            data-cursor-text={nextPage.displayTitle || nextPage.title.toUpperCase()}
            className="w-full bg-[#0c0c0e] border-t border-white/[0.08] text-white pt-14 sm:pt-20 pb-8 px-6 sm:px-12 lg:px-24 relative z-20 font-sans cursor-pointer group select-none transition-colors duration-300 hover:bg-[#111114]"
          >
            <div className="max-w-7xl mx-auto">
              {/* Top Left: Keep Scrolling / To Learn More */}
              <div className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.22em] text-white/90 leading-tight">
                <p>KEEP SCROLLING</p>
                <p>TO LEARN MORE</p>
              </div>

              {/* Main Row: Big Next Page Title on Left, Next Page label + Animated Progress Track + Arrow on Right */}
              <div className="mt-8 sm:mt-12 flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8">
                <h2 className="text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-white group-hover:text-slate-100 transition-colors">
                  {nextPage.displayTitle || nextPage.title.toUpperCase()}
                </h2>

                <div className="flex items-center gap-3 sm:gap-4 md:pb-2">
                  <span className="text-xs sm:text-sm font-sans uppercase tracking-[0.2em] text-white font-medium">
                    NEXT PAGE
                  </span>

                  {/* Horizontal Scroll Progress Track */}
                  <div className="w-24 sm:w-36 md:w-48 h-[2px] bg-white/20 relative rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white transition-all duration-75 ease-linear rounded-full"
                      style={{
                        width: `${Math.min(100, Math.round((scrollDurationMs / REQUIRED_SCROLL_TIME_MS) * 100))}%`,
                      }}
                    />
                  </div>

                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white transition-transform duration-300 group-hover:translate-x-2" />
                </div>
              </div>

              {/* Bottom Row of 5 Evenly Distributed Plus Marks (+) */}
              <div className="mt-14 sm:mt-20 pt-6 border-t border-white/[0.08] grid grid-cols-5 text-center text-white/40 text-base sm:text-lg font-light select-none">
                <span>+</span>
                <span>+</span>
                <span>+</span>
                <span>+</span>
                <span>+</span>
              </div>
            </div>
          </section>
        ) : null}

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
