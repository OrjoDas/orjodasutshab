import React from 'react';
import { motion } from 'motion/react';
import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { CyberIdCard } from '../components/CyberIdCard';
import { ExperienceEducationSection } from '../components/ExperienceEducationSection';
import { CertificatesSection } from '../components/CertificatesSection';
import { AchievementsSection } from '../components/AchievementsSection';
import { StatsSection } from '../components/StatsSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { PageId } from '../types';
import { PROJECTS_DATA, SERVICES_DATA } from '../data/portfolioData';
import {
  ArrowRight,
  Sparkles,
  Layers,
  Code2,
  Shield,
  ExternalLink,
  Github,
  CheckCircle,
  Zap,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenAi: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenAi }) => {
  const featuredProjects = PROJECTS_DATA.slice(0, 3);
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

      {/* 3. Cyber Holographic ID Card Section */}
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

      {/* 4. Selected Production Case Studies (Featured Projects) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono uppercase tracking-widest mb-3">
              <Code2 className="w-3.5 h-3.5" /> Selected Works
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Production{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                Case Studies
              </span>
            </h2>
          </div>
          <button
            onClick={() => onNavigate('projects')}
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-mono text-xs font-bold uppercase tracking-wider group cursor-pointer"
          >
            <span>View All 120+ Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-900/80 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all flex flex-col group"
            >
              <div className="relative h-48 overflow-hidden bg-slate-950">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 border border-white/20 text-[10px] font-mono text-cyan-300 backdrop-blur-md">
                  {project.category}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-bold"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-slate-400 hover:text-white"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Source</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

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

      {/* 9. Quick Stats Section */}
      <StatsSection />

      {/* 10. Client Testimonials */}
      <TestimonialsSection />

      {/* 11. Call To Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-8">
        <div className="bg-gradient-to-r from-purple-900/60 via-slate-900/90 to-cyan-900/60 border border-cyan-500/30 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden backdrop-blur-2xl shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-5 relative z-10">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Have a Project in Mind?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Whether you need an enterprise web application, high-converting 3D interactive portfolio, or cloud microservice architecture, let's talk and build it.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2 font-mono">
              <button
                onClick={() => onNavigate('contact')}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-extrabold text-xs tracking-wider shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:scale-105 transition-all cursor-pointer uppercase"
              >
                Let's Talk & Start A Project
              </button>

              <button
                onClick={onOpenAi}
                className="px-6 py-4 rounded-2xl bg-slate-950/80 border border-white/20 hover:bg-white/10 text-white font-bold text-xs tracking-wider backdrop-blur-md hover:scale-105 transition-all flex items-center gap-2 cursor-pointer uppercase"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Ask DevBot AI</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
