import React, { useState } from 'react';
import { motion } from 'motion/react';
import { EXPERIENCE_DATA, EDUCATION_DATA } from '../data/portfolioData';
import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  CheckCircle2,
  Building2,
  Award,
  BookOpen,
} from 'lucide-react';

export const ExperienceEducationSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'experience' | 'education'>('experience');

  return (
    <section id="experience" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest">
            <Briefcase className="w-3.5 h-3.5" /> 06 & 07. Career & Academic Journey
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Work Experience &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
              Education Timeline
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Detailed timeline of professional engineering positions, client leadership, university degrees, and technical certifications.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex justify-center mb-12">
          <div className="p-1.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2 backdrop-blur-md">
            <button
              onClick={() => setActiveTab('experience')}
              className={`px-6 py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'experience'
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Briefcase className="w-4 h-4" /> Work Experience
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`px-6 py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'education'
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <GraduationCap className="w-4 h-4" /> Education & Courses
            </button>
          </div>
        </div>

        {/* Vertical Timeline Container */}
        <div className="max-w-4xl mx-auto relative">
          {/* Central Vertical Line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-cyan-400 to-emerald-400 -translate-x-1/2 hidden sm:block" />

          {activeTab === 'experience' ? (
            /* Experience Items */
            <div className="space-y-12">
              {EXPERIENCE_DATA.map((exp, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className={`relative flex flex-col sm:flex-row items-center ${
                      isEven ? 'sm:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Timeline Node Dot */}
                    <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.6)] z-20">
                      <Briefcase className="w-4 h-4 text-cyan-400" />
                    </div>

                    {/* Timeline Content Card */}
                    <div className="w-full sm:w-[calc(50%-2.5rem)] ml-10 sm:ml-0">
                      <div className="bg-slate-900/90 border border-white/15 rounded-3xl p-6 backdrop-blur-xl shadow-xl hover:border-cyan-400/40 transition-all space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                          <div>
                            <h3 className="text-lg font-bold text-white">
                              {exp.role}
                            </h3>
                            <div className="text-xs font-mono text-cyan-400 flex items-center gap-1.5 mt-0.5">
                              <Building2 className="w-3.5 h-3.5" />
                              <span>{exp.company}</span>
                            </div>
                          </div>
                          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300 flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-purple-400" />
                            {exp.period}
                          </span>
                        </div>

                        <ul className="space-y-2 text-xs text-slate-300">
                          {exp.description.map((desc, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                              <span>{desc}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {exp.skillsUsed.map((sk) => (
                            <span
                              key={sk}
                              className="px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-300 text-[10px] font-mono border border-cyan-500/20"
                            >
                              {sk}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            /* Education Items */
            <div className="space-y-12">
              {EDUCATION_DATA.map((edu, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <motion.div
                    key={edu.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className={`relative flex flex-col sm:flex-row items-center ${
                      isEven ? 'sm:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Node Dot */}
                    <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-950 border-2 border-purple-400 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.6)] z-20">
                      <GraduationCap className="w-4 h-4 text-purple-400" />
                    </div>

                    <div className="w-full sm:w-[calc(50%-2.5rem)] ml-10 sm:ml-0">
                      <div className="bg-slate-900/90 border border-white/15 rounded-3xl p-6 backdrop-blur-xl shadow-xl hover:border-purple-400/40 transition-all space-y-3">
                        <div className="flex items-center justify-between border-b border-white/10 pb-3">
                          <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-[10px] font-mono text-purple-300 font-semibold">
                            {edu.type}
                          </span>
                          <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-cyan-400" />
                            {edu.period}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-white">
                          {edu.degree}
                        </h3>

                        <div className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{edu.institution}</span>
                        </div>

                        <p className="text-xs text-slate-400 leading-relaxed pt-1">
                          {edu.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
