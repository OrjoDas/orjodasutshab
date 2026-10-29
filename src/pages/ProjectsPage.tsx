import React from 'react';
import { motion } from 'motion/react';
import { ProjectsSection } from '../components/ProjectsSection';
import { GitHubActivitySection } from '../components/GitHubActivitySection';
import { GallerySection } from '../components/GallerySection';
import { PageId } from '../types';
import { FolderGit2, ArrowRight, Zap, Send } from 'lucide-react';

interface ProjectsPageProps {
  onNavigate: (page: PageId) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onNavigate }) => {
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
          <FolderGit2 className="w-3.5 h-3.5" /> 120+ Applications Delivered
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight"
        >
          Featured Works &{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
            Case Studies
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-mono leading-relaxed"
        >
          Explore interactive WebGL applications, enterprise React/Next.js SaaS solutions, and microservices built with production reliability.
        </motion.p>
      </section>

      {/* 1. Full Projects Showcase with Filter Tabs & Search */}
      <ProjectsSection />

      {/* 2. Live GitHub Activity Graph & Commit Tracker */}
      <GitHubActivitySection />

      {/* 3. Visual UI Screenshots & Design Gallery */}
      <GallerySection />

      {/* Bottom CTA to Services & Contact */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-12">
        <div className="bg-slate-900/90 border border-white/10 rounded-3xl p-8 sm:p-12 text-center backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left space-y-1">
            <h3 className="text-2xl font-bold text-white">Need a custom solution built?</h3>
            <p className="text-sm text-slate-400 font-mono">
              From conception to deployment, I build web software tailored to your business goals.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 font-mono">
            <button
              onClick={() => onNavigate('services')}
              data-cursor-hover="true"
              data-cursor-text="SERVICES"
              className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white text-white hover:text-slate-950 font-bold text-xs tracking-wider transition-all cursor-pointer uppercase border border-white/20"
            >
              <span>View Services & Pricing</span>
            </button>
            <button
              onClick={() => onNavigate('contact')}
              data-cursor-hover="true"
              data-cursor-text="CONTACT"
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-extrabold text-xs tracking-wider hover:opacity-90 transition-all cursor-pointer uppercase flex items-center gap-2"
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
