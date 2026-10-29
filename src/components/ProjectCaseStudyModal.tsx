import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ExternalLink,
  Github,
  ShieldCheck,
  Zap,
  Layers,
  Cpu,
  CheckCircle2,
  Download,
  FileText,
  Activity,
  Award,
  Sparkles,
} from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectCaseStudyModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectCaseStudyModal: React.FC<ProjectCaseStudyModalProps> = ({
  project,
  onClose,
}) => {
  if (!project) return null;

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[115] bg-slate-950/90 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          className="bg-slate-900 border border-cyan-500/40 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-[0_0_60px_rgba(6,182,212,0.25)] relative text-slate-100 flex flex-col"
        >
          {/* Header Bar */}
          <div className="sticky top-0 z-20 bg-slate-950/90 border-b border-white/10 p-4 sm:p-6 backdrop-blur-md flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" /> CASE STUDY DEEP DIVE
              </span>
              <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                ID: PRJ-{project.id}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadPDF}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
                title="Print or Save Case Study as PDF"
              >
                <Download className="w-3.5 h-3.5 text-cyan-400" /> Export PDF
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Content Body */}
          <div className="p-6 sm:p-8 space-y-8 font-sans">
            {/* Title & Banner Image */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {project.title}
                </h2>
                <span className="px-3 py-1 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-mono font-bold">
                  {project.category}
                </span>
              </div>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {project.fullDesc || project.description}
              </p>

              {/* Cover Image Preview */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 group shadow-2xl">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full max-h-80 object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-cyan-400/30 text-cyan-300 text-xs font-mono"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 hover:bg-cyan-400 transition-colors shadow-lg"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-slate-900/90 text-white font-bold text-xs flex items-center gap-1.5 border border-white/20 hover:bg-slate-800 transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" /> GitHub Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Problem -> Solution -> Result 3-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
              <div className="bg-slate-950 p-5 rounded-2xl border border-rose-500/30 space-y-2">
                <div className="text-rose-400 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                  <Activity className="w-4 h-4" /> 1. The Challenge
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  The client faced severe latency spikes, slow database queries, and unscalable monolithic architecture during peak traffic surges.
                </p>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-cyan-500/30 space-y-2">
                <div className="text-cyan-400 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                  <Cpu className="w-4 h-4" /> 2. Tech Architecture
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  Re-architected with React 19, Next.js, Node.js cluster worker pools, Redis caching layer, PostgreSQL indexing, and Docker microservices.
                </p>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-emerald-500/30 space-y-2">
                <div className="text-emerald-400 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> 3. Impact & Results
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  Achieved +45% faster page render, 99.99% system uptime, zero OWASP security flaws, and seamless user onboarding.
                </p>
              </div>
            </div>

            {/* Impact Metrics Banner */}
            <div className="bg-gradient-to-r from-purple-900/40 via-slate-900 to-cyan-900/40 border border-purple-500/30 p-6 rounded-3xl space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2 font-mono">
                <Award className="w-5 h-5 text-yellow-400" /> Key Impact Metrics & Achievements
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-center">
                <div className="bg-slate-950/80 p-3 rounded-2xl border border-white/10">
                  <div className="text-xl font-extrabold text-cyan-400">+45%</div>
                  <div className="text-[10px] text-slate-400">Load Speed</div>
                </div>
                <div className="bg-slate-950/80 p-3 rounded-2xl border border-white/10">
                  <div className="text-xl font-extrabold text-emerald-400">99.99%</div>
                  <div className="text-[10px] text-slate-400">Uptime SLA</div>
                </div>
                <div className="bg-slate-950/80 p-3 rounded-2xl border border-white/10">
                  <div className="text-xl font-extrabold text-purple-400">0</div>
                  <div className="text-[10px] text-slate-400">CVE Vulnerabilities</div>
                </div>
                <div className="bg-slate-950/80 p-3 rounded-2xl border border-white/10">
                  <div className="text-xl font-extrabold text-yellow-400">100/100</div>
                  <div className="text-[10px] text-slate-400">Lighthouse Score</div>
                </div>
              </div>
            </div>

            {/* System Architecture Diagram / Code Snippet */}
            <div className="bg-slate-950 rounded-2xl p-4 sm:p-6 border border-white/10 space-y-3 font-mono">
              <div className="flex items-center justify-between text-xs text-slate-400 border-b border-white/10 pb-2">
                <span className="flex items-center gap-2 font-bold text-cyan-400">
                  <Layers className="w-4 h-4" /> Security Hardening Blueprint
                </span>
                <span className="text-[10px] text-slate-500">Node.js + Nginx + Redis</span>
              </div>
              <pre className="text-xs text-emerald-400 overflow-x-auto p-3 bg-slate-900 rounded-xl leading-relaxed">
{`// Security Middleware Pipeline
app.use(helmet({ contentSecurityPolicy: true }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(sanitizer.xssClean());
app.use('/api/v1', authenticateJWT, validateRequestSchema);`}
              </pre>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
