import React from 'react';
import { motion } from 'motion/react';
import { TECH_STACK_DATA } from '../data/portfolioData';
import {
  Code,
  Palette,
  FileCode,
  Atom,
  Server,
  Terminal,
  Cpu,
  Box,
  GitBranch,
  Database,
  Layers,
} from 'lucide-react';

export const TechStackSection: React.FC = () => {
  const getTechIcon = (name: string) => {
    switch (name) {
      case 'HTML5': return <Code className="w-8 h-8 text-orange-500" />;
      case 'CSS3 / Tailwind': return <Palette className="w-8 h-8 text-sky-400" />;
      case 'JavaScript ES6+': return <FileCode className="w-8 h-8 text-yellow-400" />;
      case 'React.js': return <Atom className="w-8 h-8 text-cyan-400 animate-spin-slow" />;
      case 'Node.js': return <Server className="w-8 h-8 text-emerald-500" />;
      case 'Python': return <Terminal className="w-8 h-8 text-blue-400" />;
      case 'Java': return <Cpu className="w-8 h-8 text-red-500" />;
      case 'Docker': return <Box className="w-8 h-8 text-blue-500" />;
      case 'Linux': return <Terminal className="w-8 h-8 text-amber-400" />;
      case 'Git & GitHub': return <GitBranch className="w-8 h-8 text-orange-600" />;
      case 'MongoDB': return <Database className="w-8 h-8 text-emerald-600" />;
      case 'MySQL / Postgres': return <Database className="w-8 h-8 text-blue-600" />;
      default: return <Code className="w-8 h-8 text-cyan-400" />;
    }
  };

  return (
    <section id="techstack" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-mono uppercase tracking-widest">
            <Layers className="w-3.5 h-3.5" /> 11. Core Tech Stack
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Languages, Frameworks &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400">
              DevOps Tools
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Interactive grid of primary technologies used across my full stack and cyber security projects.
          </p>
        </div>

        {/* Grid of Animated Tech Stack Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {TECH_STACK_DATA.map((tech, idx) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
              whileHover={{ y: -8, scale: 1.05 }}
              className="bg-slate-900/80 border border-white/15 rounded-3xl p-5 text-center backdrop-blur-xl shadow-xl hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all group flex flex-col items-center justify-between space-y-3"
            >
              <div className="p-3 rounded-2xl bg-white/5 group-hover:bg-cyan-500/10 transition-colors">
                {getTechIcon(tech.name)}
              </div>

              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {tech.name}
                </h3>
                <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
                  {tech.category}
                </span>
              </div>

              <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-cyan-300">
                {tech.proficiency}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
