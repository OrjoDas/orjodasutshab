import React from 'react';
import { motion } from 'motion/react';
import { SkillsSection } from '../components/SkillsSection';
import { TechStackSection } from '../components/TechStackSection';
import { ServicesSection } from '../components/ServicesSection';
import { PricingSection } from '../components/PricingSection';
import { PageId } from '../types';
import { Layers, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: PageId) => void;
  onOpenBooking: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate, onOpenBooking }) => {
  return (
    <div className="space-y-16 sm:space-y-20 pt-24 sm:pt-28 font-sans">
      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono uppercase tracking-widest shadow-[0_0_20px_rgba(16,185,129,0.25)]"
        >
          <Layers className="w-3.5 h-3.5" /> Capabilities & Solutions
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight"
        >
          Services, Skills &{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
            Pricing Plans
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-mono leading-relaxed"
        >
          Transparent, high-value engineering services ranging from individual MVP sprints to enterprise full-stack architectures and 3D WebGL experiences.
        </motion.p>
      </section>

      {/* 1. Core Services with Deliverables */}
      <ServicesSection />

      {/* 2. In-Depth Technical Skills Breakdown */}
      <SkillsSection />

      {/* 3. Interactive Tech Stack */}
      <TechStackSection />

      {/* 4. Pricing Packages */}
      <PricingSection />

      {/* Bottom CTA for Direct Consultation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-12">
        <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-cyan-950/60 border border-emerald-500/30 rounded-3xl p-8 sm:p-12 text-center backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="text-left space-y-1">
            <h3 className="text-2xl font-bold text-white">Need a custom quote or scope discussion?</h3>
            <p className="text-sm text-slate-400 font-mono">
              Schedule a 1-on-1 discovery call or send your technical specification.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 font-mono">
            <button
              onClick={onOpenBooking}
              data-cursor-hover="true"
              data-cursor-text="BOOK"
              className="px-6 py-3.5 rounded-2xl bg-emerald-400 text-slate-950 font-extrabold text-xs tracking-wider hover:bg-emerald-300 transition-all cursor-pointer uppercase flex items-center gap-2"
            >
              <span>Book Kickoff Call</span>
              <Sparkles className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('contact')}
              data-cursor-hover="true"
              data-cursor-text="CONTACT"
              className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white text-white hover:text-slate-950 font-bold text-xs tracking-wider transition-all cursor-pointer uppercase border border-white/20"
            >
              <span>Contact Directly</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
