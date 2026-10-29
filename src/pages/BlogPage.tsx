import React from 'react';
import { motion } from 'motion/react';
import { BlogSection } from '../components/BlogSection';
import { PageId } from '../types';
import { BookOpen, Sparkles, ArrowRight } from 'lucide-react';

interface BlogPageProps {
  onNavigate: (page: PageId) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 sm:space-y-20 pt-24 sm:pt-28 font-sans">
      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono uppercase tracking-widest shadow-[0_0_20px_rgba(168,85,247,0.25)]"
        >
          <BookOpen className="w-3.5 h-3.5" /> Engineering Articles & Tutorials
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight"
        >
          Insights, Tech &{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
            Tutorials
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-mono leading-relaxed"
        >
          Technical write-ups exploring Three.js 3D WebGL optimization, React 19 architecture, microservices concurrency, and zero-trust cloud server security.
        </motion.p>
      </section>

      {/* 1. Blog Articles Catalog */}
      <BlogSection />

      {/* Bottom CTA to Discuss an idea */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-12">
        <div className="bg-slate-900/90 border border-white/10 rounded-3xl p-8 sm:p-12 text-center backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left space-y-1">
            <h3 className="text-2xl font-bold text-white">Have a technical challenge to solve?</h3>
            <p className="text-sm text-slate-400 font-mono">
              Let's connect and discuss your architecture and development requirements.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 font-mono">
            <button
              onClick={() => onNavigate('contact')}
              data-cursor-hover="true"
              data-cursor-text="CONTACT"
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-400 text-slate-950 font-extrabold text-xs tracking-wider hover:opacity-90 transition-all cursor-pointer uppercase flex items-center gap-2"
            >
              <span>Get In Touch</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
