import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Minus,
  ArrowRight,
  ArrowUpRight,
  Check,
  Volume2,
  VolumeX,
  Sparkles,
} from 'lucide-react';
import { ThemeMode, PageId } from '../types';

interface NavbarProps {
  currentPage?: PageId;
  onNavigate?: (page: PageId) => void;
  theme?: ThemeMode;
  onThemeChange?: (theme: ThemeMode) => void;
  onOpenAi?: () => void;
  onOpenAiChat?: () => void;
  onOpenDigitalWorld?: () => void;
  onOpenCommandPalette?: () => void;
  onOpenBooking?: () => void;
  onOpenBgChanger?: () => void;
  onOpenClientPortal?: () => void;
}

interface MenuItem {
  id: PageId;
  label: string;
  badge?: string;
}

const MENU_ITEMS: MenuItem[] = [
  { id: 'home', label: 'HOME' },
  { id: 'projects', label: 'PROJECTS', badge: '120+' },
  { id: 'services', label: 'SERVICES' },
  { id: 'blog', label: 'BLOG' },
  { id: 'contact', label: 'CONTACT' },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentPage = 'home',
  onNavigate,
  onOpenClientPortal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSoundActive, setIsSoundActive] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Track scroll state for glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on Escape or click outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        const target = e.target as HTMLElement;
        if (!target.closest('[data-menu-toggle="true"]')) {
          setIsMenuOpen(false);
        }
      }
    };

    if (isMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handlePageClick = (pageId: PageId) => {
    setIsMenuOpen(false);
    if (onNavigate) {
      onNavigate(pageId);
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => {
      setSubscribed(false);
    }, 3500);
  };

  const toggleSound = () => {
    setIsSoundActive((prev) => !prev);
  };

  return (
    <>
      {/* Top Navbar Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans ${
          isScrolled
            ? 'bg-slate-950/85 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-2xl'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand Logo (Left) */}
          <button
            onClick={() => handlePageClick('home')}
            className="group flex items-center gap-1.5 select-none cursor-pointer text-left bg-transparent border-none p-0 focus:outline-none"
          >
            <span className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase font-sans">
              ORJO
            </span>
          </button>


          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Minimal Round Audio / Ambience Toggle Button */}
            <button
              onClick={toggleSound}
              title={isSoundActive ? 'Ambience active' : 'Toggle ambience'}
              aria-label="Sound ambience toggle"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white text-slate-950 flex items-center justify-center font-bold shadow-md hover:scale-105 transition-all cursor-pointer"
            >
              {isSoundActive ? (
                <Volume2 className="w-4 h-4 text-slate-950 animate-pulse" />
              ) : (
                <Minus className="w-4 h-4 text-slate-950 stroke-[2.5]" />
              )}
            </button>

            {/* Dark Pill: LET'S TALK (Switches to Contact page) */}
            <button
              onClick={() => handlePageClick('contact')}
              data-cursor-hover="true"
              data-cursor-text="TALK"
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#18181B] hover:bg-black text-white text-xs sm:text-sm font-extrabold tracking-wider uppercase border border-white/10 shadow-md flex items-center gap-2 hover:scale-105 transition-all cursor-pointer font-sans"
            >
              <span>LET'S TALK</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block animate-ping" />
            </button>

            {/* Light Pill: MENU (Toggles Dropdown) */}
            <button
              data-menu-toggle="true"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-extrabold tracking-wider uppercase shadow-md flex items-center gap-2 transition-all cursor-pointer font-sans ${
                isMenuOpen
                  ? 'bg-white text-slate-950 shadow-[0_0_25px_rgba(255,255,255,0.4)] scale-105'
                  : 'bg-[#ECEEF2] hover:bg-white text-slate-950 hover:scale-105'
              }`}
            >
              {isMenuOpen ? (
                <>
                  <span>CLOSE</span>
                  <span className="font-mono text-base font-extrabold leading-none -mt-0.5">:</span>
                </>
              ) : (
                <>
                  <span>MENU</span>
                  <span className="tracking-tighter text-base font-extrabold leading-none -mt-0.5">• •</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Floating Menu Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Ambient Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm"
            />

            {/* Floating Dropdown Cards */}
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, y: -12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-20 sm:top-24 right-4 sm:right-8 z-50 w-[300px] sm:w-[350px] max-h-[calc(100vh-6rem)] overflow-y-auto overscroll-contain pr-1.5 pb-6 flex flex-col gap-3 font-sans [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent"
            >
              {/* CARD 1: Main Navigation Pages */}
              <div className="bg-white text-slate-950 rounded-[26px] p-4 sm:p-5 shadow-[0_25px_60px_rgba(0,0,0,0.4)] space-y-1 select-none">
                <div className="px-3 pb-2 text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">
                  Navigation Pages
                </div>
                {MENU_ITEMS.map((item) => {
                  const isCurrent = currentPage === item.id;
                  const isHovered = hoveredItem === item.id;
                  const showCapsule = isHovered || isCurrent;

                  return (
                    <div
                      key={item.id}
                      onClick={() => handlePageClick(item.id)}
                      onMouseEnter={() => setHoveredItem(item.id)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[15px] sm:text-[16px] font-bold tracking-tight transition-all cursor-pointer ${
                        showCapsule
                          ? 'bg-[#EAEFFE] text-slate-950 font-extrabold'
                          : 'text-slate-800 hover:text-black'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="uppercase">{item.label}</span>
                        {item.badge && (
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-bold">
                            {item.badge}
                          </span>
                        )}
                      </div>

                      {showCapsule ? (
                        <ArrowRight className="w-4 h-4 text-slate-950 stroke-[2.2]" />
                      ) : isCurrent ? (
                        <span className="text-xl leading-none text-slate-950">•</span>
                      ) : null}
                    </div>
                  );
                })}
              </div>

              {/* CARD 2: Newsletter Subscription Box */}
              <div className="bg-white text-slate-950 rounded-[26px] p-5 shadow-[0_25px_60px_rgba(0,0,0,0.4)] space-y-3">
                <h3 className="text-[20px] sm:text-[22px] font-bold text-slate-950 tracking-tight leading-snug">
                  Subscribe to newsletter
                </h3>

                <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                  <div className="bg-[#F0F2F6] rounded-full p-1.5 pl-4 flex items-center justify-between border border-transparent focus-within:border-slate-300 focus-within:bg-white transition-all shadow-inner">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      required
                      className="bg-transparent border-none outline-none text-slate-900 placeholder:text-slate-400 text-sm font-medium w-full pr-2 focus:ring-0"
                    />
                    <button
                      type="submit"
                      aria-label="Submit newsletter subscription"
                      className="w-8 h-8 rounded-full bg-transparent hover:bg-white flex items-center justify-center text-slate-800 transition-colors cursor-pointer shrink-0"
                    >
                      {subscribed ? (
                        <Check className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                      ) : (
                        <ArrowRight className="w-4 h-4 text-slate-800 stroke-[2.2]" />
                      )}
                    </button>
                  </div>

                  {subscribed && (
                    <p className="text-xs text-emerald-600 font-bold pl-3 animate-fade-in flex items-center gap-1">
                      <span>✓</span> Subscribed successfully!
                    </p>
                  )}
                </form>
              </div>

              {/* CARD 3: Client Portal / Labs Banner */}
              <div
                onClick={() => {
                  setIsMenuOpen(false);
                  if (onOpenClientPortal) {
                    onOpenClientPortal();
                  } else {
                    handlePageClick('projects');
                  }
                }}
                className="bg-[#0B0B0D] hover:bg-black text-white rounded-[18px] px-5 py-3.5 flex items-center justify-between shadow-[0_15px_40px_rgba(0,0,0,0.6)] transition-all cursor-pointer group select-none border border-white/10"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold font-mono tracking-tight leading-none text-cyan-400">ö</span>
                  <span className="font-extrabold tracking-widest text-sm font-sans uppercase">CLIENT PORTAL</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform stroke-[2.2]" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
