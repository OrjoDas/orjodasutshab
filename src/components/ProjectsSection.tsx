import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { ProjectItem } from '../types';
import { ProjectCaseStudyModal } from './ProjectCaseStudyModal';
import {
  ExternalLink,
  Github,
  Maximize2,
  X,
  Rocket,
  ShieldCheck,
  CheckCircle2,
  FileText,
} from 'lucide-react';

const CATEGORIES = ['All', 'Full Stack', '3D & WebGL', 'AI & Cloud'] as const;

export const ProjectsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeLightboxImage, setActiveLightboxImage] = useState<string | null>(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<ProjectItem | null>(null);

  const filteredProjects =
    activeCategory === 'All'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono uppercase tracking-widest">
            <Rocket className="w-3.5 h-3.5" /> 05. Featured Showcase
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Selected Engineering &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
              Full Stack Projects
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Explore live production web apps, interactive 3D WebGL portals, and AI-powered SaaS platforms built with clean code and modern architecture.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-xl text-xs font-mono tracking-wider transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)] scale-105'
                  : 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Large Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-slate-900/90 border border-white/15 rounded-3xl overflow-hidden backdrop-blur-xl shadow-2xl hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all group flex flex-col justify-between"
            >
              <div>
                {/* Image Preview Container */}
                <div className="relative h-52 overflow-hidden bg-slate-950">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-slate-950/80 border border-white/20 text-[10px] font-mono text-cyan-400 font-semibold backdrop-blur-md">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-[10px] font-mono text-emerald-400 font-bold">
                        FEATURED
                      </span>
                    )}
                  </div>

                  {/* Lightbox Zoom Trigger */}
                  <button
                    onClick={() => setActiveLightboxImage(project.image)}
                    className="absolute top-3 right-3 p-2 rounded-xl bg-slate-950/70 border border-white/20 text-slate-300 hover:text-white hover:bg-slate-900 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Zoom Image"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Content Details */}
                <div className="p-6 space-y-4">
                  {/* Numeric Index + Title */}
                  <div className="flex items-start gap-2.5">
                    <span className="text-sm font-black font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 rounded-lg">
                      0{index + 1}
                    </span>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors leading-snug">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Key Metrics if available */}
                  {project.metrics && (
                    <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-[11px] font-mono text-cyan-300 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      <span>{project.metrics}</span>
                    </div>
                  )}

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 flex flex-col sm:flex-row items-center gap-2">
                <button
                  onClick={() => setSelectedCaseStudy(project)}
                  className="w-full sm:flex-1 py-2.5 px-3 rounded-xl bg-purple-600/30 border border-purple-500/50 text-purple-200 hover:bg-purple-600 hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" /> Case Study
                </button>

                <div className="w-full sm:w-auto flex items-center gap-2">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 hover:scale-[1.02] transition-transform shadow-md"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Demo
                  </a>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-white/10 border border-white/15 text-white font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-white/20 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" /> Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Deep-Dive Case Study Modal */}
      <ProjectCaseStudyModal
        project={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
      />

      {/* Lightbox Preview Modal */}
      <AnimatePresence>
        {activeLightboxImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-4xl w-full max-h-[85vh] rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-slate-900 flex items-center justify-center p-2"
            >
              <button
                onClick={() => setActiveLightboxImage(null)}
                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-slate-950/80 text-white hover:bg-slate-900 border border-white/20"
              >
                <X className="w-6 h-6" />
              </button>
              <img
                src={activeLightboxImage}
                alt="Project Full Preview"
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[80vh] object-contain rounded-2xl"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
