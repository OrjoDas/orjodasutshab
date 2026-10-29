import React from 'react';
import { motion } from 'motion/react';
import { ContactSection } from '../components/ContactSection';
import { MapSection } from '../components/MapSection';
import { AvailabilitySection } from '../components/AvailabilitySection';
import { PageId } from '../types';
import { Mail, Calendar, MessageSquare, Sparkles } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
  onOpenBooking: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate, onOpenBooking }) => {
  return (
    <div className="space-y-16 sm:space-y-20 pt-24 sm:pt-28 font-sans">
      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest shadow-[0_0_20px_rgba(6,182,212,0.25)]"
        >
          <Mail className="w-3.5 h-3.5" /> Direct Inquiries & Collaboration
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight"
        >
          Let's Build Something{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400">
            Extraordinary
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-mono leading-relaxed"
        >
          Available worldwide for freelance projects, remote senior engineering roles, and custom web application consulting.
        </motion.p>

        {/* Quick Booking Call Action Pill */}
        <div className="pt-2">
          <button
            onClick={onOpenBooking}
            data-cursor-hover="true"
            data-cursor-text="BOOK"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 border border-cyan-400/50 hover:bg-cyan-500 hover:text-slate-950 text-cyan-300 font-mono text-xs font-bold uppercase tracking-wider backdrop-blur-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.25)] cursor-pointer hover:scale-105"
          >
            <Calendar className="w-4 h-4" />
            <span>Schedule A 1-on-1 Video Consultation</span>
          </button>
        </div>
      </section>

      {/* 1. Interactive Contact Form & Direct Channels */}
      <ContactSection />

      {/* 2. Interactive Dhaka Headquarters Map & Remote Reach */}
      <MapSection />

      {/* 3. Availability Calendar */}
      <AvailabilitySection />
    </div>
  );
};
