import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Terminal, Code2, FolderGit2, Shield, Bot, Mail, Globe, Sparkles, X, FileText, Download, Image } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS_DATA, SKILLS_DATA } from '../data/portfolioData';

import { PageId } from '../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAi: () => void;
  onOpenDigitalWorld: () => void;
  onOpenBgChanger?: () => void;
  onNavigate?: (page: PageId) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenAi,
  onOpenDigitalWorld,
  onOpenBgChanger,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProjects = PROJECTS_DATA.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  const filteredSkills = SKILLS_DATA.filter((s) =>
    s.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] bg-slate-950/80 backdrop-blur-md flex items-start justify-center pt-20 p-4 font-mono">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="bg-slate-900 border border-cyan-500/40 rounded-3xl max-w-2xl w-full overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.3)] flex flex-col space-y-0"
        >
          {/* Command Search Input Bar */}
          <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-slate-950">
            <Search className="w-5 h-5 text-cyan-400 animate-pulse" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command or search projects & skills... (e.g. 'React', 'Three.js', 'Node')"
              className="w-full bg-transparent border-none outline-none text-white font-mono text-sm placeholder:text-slate-500 focus:ring-0"
            />
            <button onClick={onClose} className="p-1 rounded bg-white/10 text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Action Buttons */}
          <div className="p-4 space-y-4 max-h-[400px] overflow-y-auto">
            {!query && (
              <div className="space-y-2">
                <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-yellow-400" /> QUICK COMMANDS
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      onClose();
                      onOpenDigitalWorld();
                    }}
                    className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-500/10 text-left flex items-center gap-2 text-xs text-slate-200 transition-colors"
                  >
                    <Globe className="w-4 h-4 text-cyan-400" />
                    <span>Enter 3D Digital World</span>
                  </button>

                  <button
                    onClick={() => {
                      onClose();
                      onOpenAi();
                    }}
                    className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-400/50 hover:bg-purple-500/10 text-left flex items-center gap-2 text-xs text-slate-200 transition-colors"
                  >
                    <Bot className="w-4 h-4 text-purple-400" />
                    <span>Ask AI Assistant</span>
                  </button>

                  {onOpenBgChanger && (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenBgChanger();
                      }}
                      className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-500/10 text-left flex items-center gap-2 text-xs text-slate-200 transition-colors"
                    >
                      <Image className="w-4 h-4 text-cyan-400" />
                      <span>Change Background Image Link</span>
                    </button>
                  )}

                  <a
                    href="#contact"
                    onClick={onClose}
                    className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-400/50 hover:bg-emerald-500/10 text-left flex items-center gap-2 text-xs text-slate-200 transition-colors"
                  >
                    <Mail className="w-4 h-4 text-emerald-400" />
                    <span>Send Direct Message</span>
                  </a>

                  <a
                    href={PERSONAL_INFO.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onClose}
                    className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-400/50 hover:bg-indigo-500/10 text-left flex items-center gap-2 text-xs text-slate-200 transition-colors"
                  >
                    <FolderGit2 className="w-4 h-4 text-indigo-400" />
                    <span>GitHub Profile</span>
                  </a>
                </div>

                {/* Page Navigation Jumps */}
                {onNavigate && (
                  <div className="pt-2">
                    <div className="text-[10px] text-purple-400 font-bold uppercase tracking-widest mb-1.5 flex items-center gap-1">
                      <Terminal className="w-3 h-3 text-cyan-400" /> NAVIGATE PAGES
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        { id: 'home', label: 'Home Page' },
                        { id: 'projects', label: 'Projects (120+)' },
                        { id: 'services', label: 'Services & Pricing' },
                        { id: 'blog', label: 'Articles & Tutorials' },
                        { id: 'contact', label: 'Contact & Booking' },
                      ].map((pg) => (
                        <button
                          key={pg.id}
                          onClick={() => {
                            onClose();
                            onNavigate(pg.id as PageId);
                          }}
                          className="px-3 py-2 rounded-xl bg-slate-950 border border-white/10 hover:border-cyan-400 hover:text-cyan-300 text-left text-xs text-slate-300 transition-colors flex items-center justify-between"
                        >
                          <span className="truncate">{pg.label}</span>
                          <span className="text-[10px] text-slate-500 font-mono">↵</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Filtered Search Results */}
            {query && (
              <div className="space-y-4">
                {/* Projects */}
                {filteredProjects.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">
                      MATCHING PROJECTS ({filteredProjects.length})
                    </div>
                    {filteredProjects.map((p) => (
                      <a
                        key={p.id}
                        href="#projects"
                        onClick={onClose}
                        className="block p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/50 text-xs space-y-1"
                      >
                        <div className="text-white font-bold flex items-center justify-between">
                          <span>{p.title}</span>
                          <span className="text-[10px] text-purple-400 font-mono">{p.category}</span>
                        </div>
                        <p className="text-slate-400 line-clamp-1">{p.description}</p>
                      </a>
                    ))}
                  </div>
                )}

                {/* Skills */}
                {filteredSkills.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">
                      MATCHING SKILLS ({filteredSkills.length})
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {filteredSkills.map((s) => (
                        <span key={s.name} className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-200">
                          {s.name} ({s.level}%)
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer Shortcuts */}
          <div className="p-3 bg-slate-950 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-500">
            <span>Navigation Palette</span>
            <span>Press <kbd className="px-1 bg-white/10 text-cyan-400 rounded">ESC</kbd> to exit</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
