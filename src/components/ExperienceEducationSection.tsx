import React from 'react';
import { motion } from 'motion/react';
import {
  GraduationCap,
  TrendingUp,
  Calendar,
  Building2,
  CheckCircle2,
  Sparkles,
  Compass,
} from 'lucide-react';

interface TimelineItem {
  id: string;
  year: string;
  role: string;
  organization: string;
  description: string;
  isCurrent?: boolean;
  type: string;
  icon: 'education' | 'marketing';
  tags: string[];
}

const TIMELINE_ITEMS: TimelineItem[] = [
  {
    id: 'bspi-diploma',
    year: '2025 — Present',
    role: 'Diploma in Computer Engineering',
    organization: 'Bangladesh Sweden Polytechnic Institute (BSPI)',
    description: 'Specializing in computer systems, networking, and software development fundamentals.',
    isCurrent: true,
    type: 'Academic Program',
    icon: 'education',
    tags: ['Computer Systems', 'Networking', 'Software Development', 'BSPI'],
  },
  {
    id: 'digital-marketing',
    year: '2025',
    role: 'Digital Marketing Strategist',
    organization: 'Freelance / Projects',
    description: 'Developing high-conversion strategies for various digital platforms and optimizing web presence.',
    isCurrent: false,
    type: 'Professional Practice',
    icon: 'marketing',
    tags: ['Marketing Strategy', 'Web Optimization', 'Conversion Growth', 'Freelance'],
  },
];

export const ExperienceEducationSection: React.FC = () => {
  return (
    <section id="experience" className="py-20 sm:py-28 relative z-10 font-sans overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest shadow-[0_0_20px_rgba(6,182,212,0.2)]">
            <Compass className="w-3.5 h-3.5" /> Journey & Timeline
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Journey &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400">
              Timeline
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-mono">
            Academic milestones and professional marketing & engineering pursuits.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="max-w-3xl mx-auto relative">
          {/* Vertical Glowing Line */}
          <div className="absolute left-6 sm:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-cyan-400 via-purple-500 to-emerald-400 -translate-x-1/2 opacity-70" />

          <div className="space-y-12 sm:space-y-16">
            {TIMELINE_ITEMS.map((item, idx) => {
              const isTopItem = idx === 0;
              const isEven = idx % 2 === 0;
              // User requirement: Top item slides in from right side (x: +200), bottom item slides in from left side (x: -200)
              const slideFromX = isTopItem ? 200 : -200;

              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Central Node Dot with Animated Scale & Glow */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: idx * 0.15, type: 'spring', stiffness: 220 }}
                    className="absolute left-6 sm:left-1/2 -translate-x-1/2 top-6 w-10 h-10 rounded-full bg-[#0B0B0D] border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_20px_rgba(94,230,201,0.5)] z-20"
                  >
                    {item.icon === 'education' ? (
                      <GraduationCap className="w-5 h-5 text-cyan-300" />
                    ) : (
                      <TrendingUp className="w-5 h-5 text-purple-400" />
                    )}
                  </motion.div>

                  {/* Timeline Card with Slide-in Animation (Top from right, Bottom from left) */}
                  <motion.div
                    initial={{ opacity: 0, x: slideFromX, scale: 0.94 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{
                      duration: 0.85,
                      delay: isTopItem ? 0.05 : 0.15,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="w-full sm:w-[calc(50%-2.5rem)] pl-16 sm:pl-0"
                  >
                    <div className="bg-[#0f1118]/90 border border-white/12 rounded-3xl p-6 sm:p-7 backdrop-blur-2xl shadow-2xl hover:border-cyan-400/50 hover:shadow-[0_0_35px_rgba(6,182,212,0.15)] transition-all space-y-4 group">
                      {/* Top Badges */}
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-cyan-300 font-semibold uppercase tracking-wider">
                          {item.type}
                        </span>

                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono font-bold text-cyan-300">
                          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{item.year}</span>
                          {item.isCurrent && (
                            <span className="ml-1 inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          )}
                        </div>
                      </div>

                      {/* Role & Organization */}
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {item.role}
                        </h3>
                        <div className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-purple-400" />
                          <span>{item.organization}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                        {item.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-0.5 rounded-md bg-white/5 text-slate-300 text-[11px] font-mono border border-white/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
