import React from 'react';
import { motion } from 'motion/react';
import {
  Award,
  Briefcase,
  Coffee,
  Users,
  CheckCircle2,
  Terminal,
  Shield,
  Cpu,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono uppercase tracking-widest">
            <Cpu className="w-3.5 h-3.5" /> 02. About Me
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Passionate Engineering &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
              Modern Web Architecture
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Combining modern React & 3D WebGL frontend design with high-performance Node.js cloud microservices to deliver scalable digital platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left 3D Interactive Card: WHO AM I? */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-400 rounded-3xl blur-lg opacity-60 group-hover:opacity-90 transition duration-500" />
              <div className="relative bg-slate-900/95 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-400 p-0.5">
                      <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                        <Terminal className="w-5 h-5 text-cyan-400" />
                      </div>
                    </div>
                    <h3 className="text-xl font-black text-white tracking-widest font-mono uppercase">
                      WHO AM I?
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-mono font-bold">
                    IDENTITY LOG
                  </span>
                </div>

                <div className="space-y-2">
                  <h4 className="text-2xl font-black text-white">
                    {PERSONAL_INFO.name}
                  </h4>
                  <p className="text-xs text-purple-400 font-mono font-bold">
                    SENIOR FULL STACK WEB DEVELOPER & 3D ARCHITECT
                  </p>
                </div>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  I build high-performance web systems, modern SaaS applications, and interactive 3D WebGL experiences. My engineering focus ensures every platform is lightning-fast, visually stunning, and production-ready.
                </p>

                {/* 4 Requested Stats */}
                <div className="grid grid-cols-2 gap-3 pt-2 font-mono">
                  <div className="bg-slate-950 p-3 rounded-2xl border border-white/10">
                    <div className="text-xl font-extrabold text-cyan-400">5+ Yrs</div>
                    <div className="text-[10px] text-slate-400">Years Experience</div>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-2xl border border-white/10">
                    <div className="text-xl font-extrabold text-purple-400">120+</div>
                    <div className="text-[10px] text-slate-400">Projects</div>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-2xl border border-white/10">
                    <div className="text-xl font-extrabold text-emerald-400">25+</div>
                    <div className="text-[10px] text-slate-400">Technologies</div>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-2xl border border-white/10">
                    <div className="text-xl font-extrabold text-indigo-400">12+</div>
                    <div className="text-[10px] text-slate-400">Certifications</div>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-white/10 text-xs text-slate-300 font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Location:</span>
                    <span className="text-white">Dhaka, Bangladesh</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Status:</span>
                    <span className="text-emerald-400">Available For Work</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right 4 Key Counters Grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-8"
          >
            {/* Short Introduction Paragraph */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md space-y-4">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <Cpu className="w-6 h-6 text-purple-400" /> Driven by Code & Performance
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Over the past 5+ years, I have architected and deployed over 120 web platforms across various industries including FinTech, Telemedicine, Cloud Analytics, and eCommerce. I take pride in combining pristine visual design with robust cloud server logic.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Clean Code & Modular Architecture</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>High Concurrency & Low Latency</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Google PageSpeed 95+ Score</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>24/7 Server Uptime & Support</span>
                </div>
              </div>
            </div>

            {/* 4 Interactive Counter Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {/* Counter 1: Experience */}
              <div className="bg-slate-900/80 border border-purple-500/20 rounded-2xl p-4 text-center space-y-1 hover:border-purple-500/50 hover:scale-105 transition-all shadow-lg group">
                <Briefcase className="w-6 h-6 text-purple-400 mx-auto group-hover:rotate-12 transition-transform" />
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                  {PERSONAL_INFO.stats.yearsExperience}+
                </div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider font-mono">
                  Years Experience
                </div>
              </div>

              {/* Counter 2: Projects */}
              <div className="bg-slate-900/80 border border-cyan-500/20 rounded-2xl p-4 text-center space-y-1 hover:border-cyan-500/50 hover:scale-105 transition-all shadow-lg group">
                <Award className="w-6 h-6 text-cyan-400 mx-auto group-hover:rotate-12 transition-transform" />
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                  {PERSONAL_INFO.stats.completedProjects}+
                </div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider font-mono">
                  Projects Done
                </div>
              </div>

              {/* Counter 3: Happy Clients */}
              <div className="bg-slate-900/80 border border-emerald-500/20 rounded-2xl p-4 text-center space-y-1 hover:border-emerald-500/50 hover:scale-105 transition-all shadow-lg group">
                <Users className="w-6 h-6 text-emerald-400 mx-auto group-hover:rotate-12 transition-transform" />
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                  {PERSONAL_INFO.stats.happyClients}+
                </div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider font-mono">
                  Happy Clients
                </div>
              </div>

              {/* Counter 4: Coffee Counter 😄 */}
              <div className="bg-slate-900/80 border border-yellow-500/20 rounded-2xl p-4 text-center space-y-1 hover:border-yellow-500/50 hover:scale-105 transition-all shadow-lg group">
                <Coffee className="w-6 h-6 text-yellow-400 mx-auto group-hover:rotate-12 transition-transform" />
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                  {PERSONAL_INFO.stats.coffeeCups}+
                </div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider font-mono">
                  Cups of Coffee 😄
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
