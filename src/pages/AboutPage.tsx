import React from 'react';
import { motion } from 'motion/react';
import { AboutSection } from '../components/AboutSection';
import { CyberIdCard } from '../components/CyberIdCard';
import { ExperienceEducationSection } from '../components/ExperienceEducationSection';
import { CertificatesSection } from '../components/CertificatesSection';
import { AchievementsSection } from '../components/AchievementsSection';
import { PageId } from '../types';
import { User, Award, Shield, ArrowRight, Download, Send } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 sm:space-y-20 pt-24 sm:pt-28 font-sans">
      {/* Page Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest shadow-[0_0_20px_rgba(6,182,212,0.25)]"
        >
          <User className="w-3.5 h-3.5" /> Biography & Credentials
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight"
        >
          About{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400">
            Orjo Das Utshab
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-mono leading-relaxed"
        >
          Senior Full Stack Web Developer & 3D Web Architect based in Dhaka, Bangladesh. Dedicated to writing clean, high-performance code and designing immersive digital systems.
        </motion.p>
      </section>

      {/* 1. Core About Section (Who am I, Identity log, Philosophy) */}
      <AboutSection />

      {/* 2. Cyber Holographic ID Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono uppercase tracking-widest">
            <Shield className="w-3.5 h-3.5" /> Digital Verification
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Cyber Holographic ID & Card
          </h2>
        </div>
        <CyberIdCard />
      </section>

      {/* 3. Work Experience & Academic Background */}
      <ExperienceEducationSection />

      {/* 4. Verified Professional Certifications */}
      <CertificatesSection />

      {/* 5. Honors & Achievements */}
      <AchievementsSection />

      {/* Bottom CTA to Projects & Contact */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-12">
        <div className="bg-slate-900/90 border border-white/10 rounded-3xl p-8 sm:p-12 text-center backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left space-y-1">
            <h3 className="text-2xl font-bold text-white">Interested in seeing my code?</h3>
            <p className="text-sm text-slate-400 font-mono">
              Explore 120+ projects, open-source repositories, and interactive case studies.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 font-mono">
            <button
              onClick={() => onNavigate('projects')}
              data-cursor-hover="true"
              data-cursor-text="PROJECTS"
              className="px-6 py-3.5 rounded-2xl bg-cyan-500 text-slate-950 font-extrabold text-xs tracking-wider hover:bg-cyan-400 transition-all cursor-pointer uppercase flex items-center gap-2"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('contact')}
              data-cursor-hover="true"
              data-cursor-text="CONTACT"
              className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white text-white hover:text-slate-950 font-bold text-xs tracking-wider transition-all cursor-pointer uppercase border border-white/20"
            >
              <span>Hire Orjo</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
