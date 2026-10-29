import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQ_DATA, PERSONAL_INFO } from '../data/portfolioData';
import {
  HelpCircle,
  ChevronDown,
  Mail,
  Send,
  ArrowUp,
  Github,
  Linkedin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Shield,
  Heart,
  CheckCircle,
} from 'lucide-react';

import { PageId } from '../types';

export const FaqNewsletterFooter: React.FC<{
  onNavigate?: (page: PageId) => void;
  showFaq?: boolean;
}> = ({ onNavigate, showFaq = true }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Calculate scroll percentage for back-to-top ring
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
  };

  return (
    <>
      {/* 23. FAQ Accordion Section */}
      <section id="faq" className="py-24 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest">
              <HelpCircle className="w-3.5 h-3.5" /> 23. Frequently Asked Questions
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Got Questions?{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                I've Got Answers
              </span>
            </h2>
            <p className="text-slate-400 text-sm">
              Answers regarding project workflow, security audits, NDA agreements, and payment methods.
            </p>
          </div>

          <div className="space-y-4">
            {FAQ_DATA.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={faq.question}
                  className="bg-slate-900/80 border border-white/15 rounded-2xl overflow-hidden backdrop-blur-xl transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between text-white font-bold text-base hover:text-cyan-400 transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-cyan-400 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="p-5 pt-0 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-white/10">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 24. Newsletter Section */}
      <section className="py-16 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-white/20 rounded-3xl p-8 sm:p-12 backdrop-blur-2xl shadow-2xl relative overflow-hidden text-center space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-400/40 mx-auto flex items-center justify-center">
              <Mail className="w-6 h-6 text-cyan-400" />
            </div>

            <div className="max-w-xl mx-auto space-y-2">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Subscribe to Tech & Cyber Insights
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm">
                Get monthly deep dives on full-stack architecture, 3D WebGL graphics, and zero-day threat intelligence.
              </p>
            </div>

            {subscribed ? (
              <div className="flex items-center justify-center gap-2 text-emerald-400 text-sm font-mono font-bold bg-emerald-500/10 py-3 rounded-2xl max-w-md mx-auto border border-emerald-500/30">
                <CheckCircle className="w-5 h-5" /> You're subscribed! Thank you.
              </div>
            ) : (
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full sm:flex-1 bg-slate-950 border border-white/20 rounded-2xl px-4 py-3 text-white text-xs focus:outline-none focus:border-cyan-400 font-mono"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-xs font-mono shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 cursor-pointer"
                >
                  Subscribe <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 25. Footer */}
      <footer className="py-12 border-t border-white/10 relative z-10 bg-slate-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Col */}
            <div className="space-y-3 md:col-span-2">
              <div className="text-xl font-extrabold text-white tracking-wider font-mono">
                ORJO<span className="text-cyan-400">.DEV</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed max-w-md">
                Full Stack Developer & Cyber Security Expert based in Bangladesh. Engineering 3D interactive web experiences with robust server security.
              </p>
            </div>

            {/* Navigation Quick Links */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                Portfolio Pages
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-400 font-mono">
                <li>
                  <button
                    onClick={() => onNavigate ? onNavigate('home') : window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="hover:text-cyan-300 transition-colors cursor-pointer text-left"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      if (onNavigate) onNavigate('home');
                      setTimeout(() => {
                        const el = document.getElementById('about');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="hover:text-cyan-300 transition-colors cursor-pointer text-left"
                  >
                    About Me & Credentials
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate ? onNavigate('projects') : null}
                    className="hover:text-cyan-300 transition-colors cursor-pointer text-left"
                  >
                    Projects & Architecture (120+)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate ? onNavigate('services') : null}
                    className="hover:text-cyan-300 transition-colors cursor-pointer text-left"
                  >
                    Services & Pricing Plans
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate ? onNavigate('blog') : null}
                    className="hover:text-cyan-300 transition-colors cursor-pointer text-left"
                  >
                    Articles & Tutorials
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate ? onNavigate('contact') : null}
                    className="hover:text-cyan-300 transition-colors cursor-pointer text-left"
                  >
                    Contact & Booking
                  </button>
                </li>
              </ul>
            </div>

            {/* Socials Column */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                Direct Channels
              </h4>
              <div className="flex flex-wrap gap-2 pt-1">
                <a href={PERSONAL_INFO.socials.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-white/5 text-slate-300 hover:text-cyan-400 border border-white/10"><Github className="w-4 h-4" /></a>
                <a href={PERSONAL_INFO.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-white/5 text-slate-300 hover:text-cyan-400 border border-white/10"><Linkedin className="w-4 h-4" /></a>
                <a href={PERSONAL_INFO.socials.facebook} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-white/5 text-slate-300 hover:text-cyan-400 border border-white/10"><Facebook className="w-4 h-4" /></a>
                <a href={PERSONAL_INFO.socials.twitter} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-white/5 text-slate-300 hover:text-cyan-400 border border-white/10"><Twitter className="w-4 h-4" /></a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-4">
            <div>
              © {new Date().getFullYear()} Orjo Das Utshab. All Rights Reserved.
            </div>
            <div className="flex items-center gap-1">
              Crafted with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" /> & React 19 Three.js
            </div>
          </div>
        </div>

        {/* Back To Top Floating Ring Button */}
        <button
          onClick={scrollToTop}
          title="Back to Top"
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-slate-900 border border-white/20 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer group"
        >
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="24"
              cy="24"
              r="22"
              className="stroke-slate-800 fill-none stroke-[2]"
            />
            <circle
              cx="24"
              cy="24"
              r="22"
              className="stroke-cyan-400 fill-none stroke-[2]"
              strokeDasharray="138"
              strokeDashoffset={138 - (138 * scrollProgress) / 100}
              strokeLinecap="round"
            />
          </svg>
          <ArrowUp className="w-5 h-5 text-cyan-400 group-hover:-translate-y-1 transition-transform" />
        </button>
      </footer>
    </>
  );
};
