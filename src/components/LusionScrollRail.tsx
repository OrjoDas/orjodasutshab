import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp, Compass, Flame } from 'lucide-react';

const SECTIONS = [
  { id: 'hero', label: 'HERO' },
  { id: 'about', label: 'ABOUT' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'contact', label: 'CONTACT' },
];

export const LusionScrollRail: React.FC = () => {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const pct = totalScroll > 0 ? Math.min(100, Math.max(0, Math.round((scrollY / totalScroll) * 100))) : 0;
      setScrollPercent(pct);
      setShowScrollTop(scrollY > 400);

      // Check current active section based on scroll position
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= 0) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-4 select-none pointer-events-auto">
      {/* Percentage Counter Badge */}
      <div
        data-cursor-hover="true"
        data-cursor-text="PROGRESS"
        className="px-2.5 py-1 rounded-full bg-slate-950/90 border border-cyan-500/40 text-[10px] font-mono font-extrabold text-cyan-300 backdrop-blur-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] flex items-center gap-1.5"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        <span>{String(scrollPercent).padStart(3, '0')}%</span>
      </div>

      {/* Lusion Vertical Neon Progress Track */}
      <div className="relative w-1 h-44 bg-slate-900/80 rounded-full border border-white/10 overflow-hidden backdrop-blur-md">
        <motion.div
          className="w-full bg-gradient-to-b from-cyan-400 via-purple-500 to-amber-400 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.8)]"
          style={{ height: `${scrollPercent}%` }}
          transition={{ ease: 'easeOut', duration: 0.1 }}
        />
      </div>

      {/* Section Quick Nav Nodes */}
      <div className="flex flex-col gap-2.5 py-1">
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              data-cursor-hover="true"
              data-cursor-text={sec.label}
              className="group relative flex items-center justify-end cursor-pointer focus:outline-none"
            >
              {/* Floating Section Label on Hover/Active */}
              <span
                className={`absolute right-7 px-2 py-0.5 rounded-md text-[9px] font-mono font-extrabold whitespace-nowrap transition-all duration-200 pointer-events-none ${
                  isActive
                    ? 'opacity-100 translate-x-0 bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                    : 'opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 bg-slate-950/90 text-slate-300 border border-white/10'
                }`}
              >
                {sec.label}
              </span>

              {/* Node Indicator Dot */}
              <span
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-cyan-400 scale-130 shadow-[0_0_15px_rgba(6,182,212,0.9)] ring-2 ring-cyan-400 ring-offset-2 ring-offset-slate-950'
                    : 'bg-slate-700 group-hover:bg-cyan-300 group-hover:scale-110'
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            data-cursor-hover="true"
            data-cursor-text="TOP"
            className="p-2.5 rounded-full bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 hover:bg-cyan-400 hover:text-slate-950 transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.4)] backdrop-blur-xl cursor-pointer"
          >
            <ChevronUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
