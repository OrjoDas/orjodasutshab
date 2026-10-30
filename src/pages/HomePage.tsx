import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { ExperienceEducationSection } from '../components/ExperienceEducationSection';
import { CertificatesSection } from '../components/CertificatesSection';
import { AchievementsSection } from '../components/AchievementsSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { PageId } from '../types';
import { SERVICES_DATA } from '../data/portfolioData';
import {
  ArrowRight,
  Layers,
  CheckCircle,
  Zap,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenAi: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenAi }) => {
  const coreServices = SERVICES_DATA.slice(0, 4);

  return (
    <div className="space-y-20 sm:space-y-28 font-sans">
      {/* 1. Hero Section with Interactive Cyber Avatar Orbit */}
      <HeroSection
        onOpenAi={onOpenAi}
        onNavigate={() => onNavigate('projects')}
      />

      {/* 2. Full About & Biography Section */}
      <AboutSection />

      {/* 5. Career Experience & Education Timeline */}
      <ExperienceEducationSection />

      {/* 6. Professional Industry Certifications */}
      <CertificatesSection />

      {/* 7. Honors & Achievements */}
      <AchievementsSection />

      {/* 8. Core Services & Capabilities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-widest">
            <Zap className="w-3.5 h-3.5" /> Solutions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            What I Bring To{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Your Team & Product
            </span>
          </h2>
          <p className="text-slate-400 text-sm">
            End-to-end software development with modern speed, pristine design, and bulletproof security.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreServices.map((svc) => (
            <div
              key={svc.id}
              className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 backdrop-blur-xl hover:border-emerald-400/40 hover:scale-105 transition-all flex flex-col justify-between space-y-4 shadow-xl"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">{svc.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{svc.shortDesc}</p>
              </div>

              <ul className="space-y-1.5 text-[11px] text-slate-300 font-mono">
                {svc.deliverables.slice(0, 3).map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span className="truncate">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center pt-8">
          <button
            onClick={() => onNavigate('services')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 border border-white/15 hover:border-emerald-400 text-white font-mono text-xs font-bold uppercase tracking-wider backdrop-blur-md hover:scale-105 transition-all cursor-pointer shadow-lg"
          >
            <span>Explore All Services & Pricing Plans</span>
            <ArrowRight className="w-4 h-4 text-emerald-400" />
          </button>
        </div>
      </section>

      {/* 9. Client Testimonials */}
      <TestimonialsSection />
    </div>
  );
};
