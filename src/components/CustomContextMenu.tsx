import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, FileText, Mail, ArrowUp, Github, Sparkles, Image } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface CustomContextMenuProps {
  onOpenAi: () => void;
  onOpenBgChanger?: () => void;
}

export const CustomContextMenu: React.FC<CustomContextMenuProps> = ({
  onOpenAi,
  onOpenBgChanger,
}) => {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const handleClick = () => setVisible(false);

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        style={{ top: pos.y, left: pos.x }}
        className="fixed z-[120] w-56 bg-slate-900/95 border border-cyan-500/40 rounded-2xl p-2 shadow-[0_0_30px_rgba(6,182,212,0.3)] backdrop-blur-2xl font-mono text-xs text-slate-200 space-y-1"
      >
        <div className="px-3 py-1.5 border-b border-white/10 text-[10px] text-cyan-400 font-bold flex items-center justify-between">
          <span>CYBER QUICK MENU</span>
          <Sparkles className="w-3 h-3 text-yellow-300" />
        </div>

        <button
          onClick={onOpenAi}
          className="w-full text-left px-3 py-2 rounded-xl hover:bg-cyan-500/20 hover:text-cyan-300 flex items-center gap-2 transition-colors cursor-pointer"
        >
          <Bot className="w-4 h-4 text-purple-400" /> Ask AI Assistant
        </button>

        {onOpenBgChanger && (
          <button
            onClick={onOpenBgChanger}
            className="w-full text-left px-3 py-2 rounded-xl hover:bg-cyan-500/20 hover:text-cyan-300 flex items-center gap-2 transition-colors cursor-pointer text-cyan-300 font-bold"
          >
            <Image className="w-4 h-4 text-cyan-400" /> Change BG Image Link
          </button>
        )}

        <button
          onClick={handleCopyEmail}
          className="w-full text-left px-3 py-2 rounded-xl hover:bg-cyan-500/20 hover:text-cyan-300 flex items-center justify-between transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-emerald-400" /> Copy Email
          </span>
          <span className="text-[10px] text-slate-500">{copied ? 'COPIED!' : ''}</span>
        </button>

        <a
          href={PERSONAL_INFO.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full text-left px-3 py-2 rounded-xl hover:bg-cyan-500/20 hover:text-cyan-300 flex items-center gap-2 transition-colors"
        >
          <Github className="w-4 h-4 text-indigo-400" /> Open GitHub
        </a>

        <button
          onClick={handleScrollTop}
          className="w-full text-left px-3 py-2 rounded-xl hover:bg-cyan-500/20 hover:text-cyan-300 flex items-center gap-2 transition-colors cursor-pointer border-t border-white/10 mt-1"
        >
          <ArrowUp className="w-4 h-4 text-yellow-400" /> Back to Top
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
