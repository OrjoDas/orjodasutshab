import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Shield, Terminal, Trophy, Send, Bot, X, Sparkles, ExternalLink, Zap } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface DigitalWorldModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAi: () => void;
}

export const DigitalWorldModal: React.FC<DigitalWorldModalProps> = ({
  isOpen,
  onClose,
  onOpenAi,
}) => {
  const [activeStation, setActiveStation] = useState<string | null>(null);

  if (!isOpen) return null;

  const stations = [
    {
      id: 'about',
      name: '🌐 About Planet',
      role: 'Identity & Bio Station',
      desc: 'Discover Orjo Das Utshab’s journey, experience statistics, and cyber security origin story.',
      color: 'from-purple-500 to-indigo-600',
      actionHref: '#about',
    },
    {
      id: 'skills',
      name: '💻 Code Station',
      role: 'Interactive Tech Universe',
      desc: 'Explore 3D skill clusters in React, Node.js, Linux hardening, and Ethical Hacking.',
      color: 'from-cyan-500 to-blue-600',
      actionHref: '#skills',
    },
    {
      id: 'projects',
      name: '🚀 Project Hub',
      role: 'Full-Stack Showcase',
      desc: 'Inspect 120+ deployed web applications with live metrics and GitHub source code.',
      color: 'from-emerald-500 to-teal-600',
      actionHref: '#projects',
    },
    {
      id: 'certificates',
      name: '🏆 Achievement Vault',
      role: 'Security Certs & Trophies',
      desc: 'Verify CEH v12, AWS Solutions Architect, and Linux RHCSA credentials.',
      color: 'from-yellow-500 to-amber-600',
      actionHref: '#certificates',
    },
    {
      id: 'contact',
      name: '📡 Communication Center',
      role: 'Encrypted Contact Gateway',
      desc: 'Send direct messages, schedule direct meeting slots, or trigger instant email transmission.',
      color: 'from-rose-500 to-pink-600',
      actionHref: '#contact',
    },
    {
      id: 'ai',
      name: '🤖 AI Core',
      role: 'CyberBot Intelligence',
      desc: 'Engage with Orjo’s custom Gemini-powered AI Assistant for instant project estimates.',
      color: 'from-violet-500 to-purple-600',
      isAi: true,
    },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] bg-slate-950/95 backdrop-blur-3xl flex flex-col items-center justify-between p-4 sm:p-8 font-mono overflow-y-auto">
        {/* Ambient Orbit Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-600/10 rounded-full blur-[180px] pointer-events-none" />
        <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />

        {/* Top Header Navigation */}
        <div className="w-full max-w-7xl flex items-center justify-between relative z-10 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-500 to-cyan-400 p-0.5 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Globe className="w-5 h-5 text-cyan-400 animate-spin" />
              </div>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                CYBER SPACE WORLD <Zap className="w-4 h-4 text-cyan-400" />
              </h2>
              <p className="text-xs text-slate-400">Interactive 3D Digital Twin Navigation</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-2xl bg-white/10 text-slate-300 hover:text-white hover:bg-white/20 transition-all flex items-center gap-2 text-xs"
          >
            <X className="w-5 h-5" /> Exit Cyber Space
          </button>
        </div>

        {/* Main Station Planets Orbit Grid */}
        <div className="max-w-6xl w-full my-auto py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {stations.map((station) => (
            <motion.div
              key={station.id}
              whileHover={{ scale: 1.03, y: -5 }}
              onClick={() => setActiveStation(station.id)}
              className="bg-slate-900/80 border border-white/15 rounded-3xl p-6 relative overflow-hidden group cursor-pointer shadow-xl backdrop-blur-xl hover:border-cyan-400/50 transition-all"
            >
              {/* Planet Gradient Backdrop */}
              <div
                className={`absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br ${station.color} rounded-full blur-2xl opacity-30 group-hover:opacity-70 transition-opacity`}
              />

              <div className="space-y-3 relative z-10">
                <div className="text-xs text-cyan-400 font-bold uppercase tracking-widest flex items-center justify-between">
                  <span>{station.role}</span>
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                </div>

                <h3 className="text-2xl font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                  {station.name}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {station.desc}
                </p>

                <div className="pt-2 flex items-center gap-2 text-xs font-bold text-cyan-400">
                  {station.isAi ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                        onOpenAi();
                      }}
                      className="px-4 py-2 rounded-xl bg-purple-600 text-white flex items-center gap-2 hover:bg-purple-500 transition-colors"
                    >
                      <Bot className="w-4 h-4" /> Launch AI Core
                    </button>
                  ) : (
                    <a
                      href={station.actionHref}
                      onClick={onClose}
                      className="px-4 py-2 rounded-xl bg-white/10 text-white flex items-center gap-2 hover:bg-cyan-500 hover:text-slate-950 transition-all"
                    >
                      Enter Station <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Orbit Footer */}
        <div className="w-full max-w-7xl border-t border-white/10 pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2 relative z-10">
          <span>SYSTEM ONLINE • CYBER NODE: DHAKA-HQ-01</span>
          <span>Press ESC or click exit to return to standard view</span>
        </div>
      </div>
    </AnimatePresence>
  );
};
