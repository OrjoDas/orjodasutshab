import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Github, GitCommit, Star, GitFork, Activity, Sparkles, ExternalLink, Shield } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const GitHubActivitySection: React.FC = () => {
  const [commits, setCommits] = useState([
    { repo: 'cloudscale-microservices', msg: 'feat: add Redis cluster caching & sub-50ms API latency', time: '12 mins ago' },
    { repo: 'react-fullstack-starter', msg: 'refactor: optimize Vite bundle & lazy load route chunks', time: '1 hour ago' },
    { repo: 'threejs-3d-webgl-engine', msg: 'feat: add ACESFilmic tone mapping & custom particle shaders', time: '3 hours ago' },
    { repo: 'gemini-ai-portfolio', msg: 'docs: update AI assistant prompt context & function specs', time: '5 hours ago' },
  ]);

  // Generate simulated 365-day contribution heat grid
  const days = Array.from({ length: 120 }, (_, i) => {
    const level = Math.floor(Math.random() * 4); // 0, 1, 2, 3
    return level;
  });

  return (
    <section id="github" className="py-16 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-mono">
      <div className="bg-slate-900/90 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-[0_0_50px_rgba(99,102,241,0.15)] space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <Github className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                Live GitHub Activity & Open Source Feed
              </h3>
              <p className="text-xs text-slate-400">
                Real-Time Commit Ticker & 1,840+ Contributions Built This Year
              </p>
            </div>
          </div>

          <a
            href={PERSONAL_INFO.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-indigo-600/30 border border-indigo-500/50 text-indigo-200 text-xs font-bold hover:bg-indigo-600 hover:text-white transition-all flex items-center gap-2"
          >
            <Github className="w-4 h-4" /> View @orjodasutshab <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 4 Stats Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-slate-950 p-4 rounded-2xl border border-white/10 text-center space-y-1">
            <div className="text-[10px] text-slate-400 uppercase tracking-widest flex items-center justify-center gap-1">
              <GitCommit className="w-3.5 h-3.5 text-cyan-400" /> Commits (2026)
            </div>
            <div className="text-2xl font-extrabold text-white">1,840+</div>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-white/10 text-center space-y-1">
            <div className="text-[10px] text-slate-400 uppercase tracking-widest flex items-center justify-center gap-1">
              <Star className="w-3.5 h-3.5 text-yellow-400" /> Stars Earned
            </div>
            <div className="text-2xl font-extrabold text-yellow-300">420+</div>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-white/10 text-center space-y-1">
            <div className="text-[10px] text-slate-400 uppercase tracking-widest flex items-center justify-center gap-1">
              <GitFork className="w-3.5 h-3.5 text-purple-400" /> Repositories
            </div>
            <div className="text-2xl font-extrabold text-purple-300">68</div>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-white/10 text-center space-y-1">
            <div className="text-[10px] text-slate-400 uppercase tracking-widest flex items-center justify-center gap-1">
              <Activity className="w-3.5 h-3.5 text-emerald-400" /> Contribution Streak
            </div>
            <div className="text-2xl font-extrabold text-emerald-400">142 Days</div>
          </div>
        </div>

        {/* Contribution Graph Heatmap */}
        <div className="bg-slate-950 p-5 rounded-2xl border border-white/10 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" /> Contribution Activity Map
            </span>
            <div className="flex items-center gap-1 text-[10px]">
              <span>Less</span>
              <span className="w-2.5 h-2.5 rounded-sm bg-slate-800" />
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-900" />
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-600" />
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-400" />
              <span>More</span>
            </div>
          </div>

          <div className="grid grid-cols-20 sm:grid-cols-30 gap-1.5 overflow-x-auto py-2">
            {days.map((level, idx) => {
              const bgColors = [
                'bg-slate-800/80',
                'bg-emerald-900/90 border border-emerald-700/50',
                'bg-emerald-600 shadow-[0_0_8px_rgba(16,185,129,0.4)]',
                'bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]',
              ];
              return (
                <div
                  key={idx}
                  title={`Day ${idx + 1}: ${level * 4 + 1} contributions`}
                  className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-sm ${bgColors[level]} transition-transform hover:scale-125 cursor-pointer`}
                />
              );
            })}
          </div>
        </div>

        {/* Live Commit Stream Ticker */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-white/10 space-y-2">
          <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2">
            <GitCommit className="w-4 h-4 text-purple-400 animate-spin-slow" />
            Recent GitHub Commits
          </div>
          <div className="space-y-2 text-xs font-mono">
            {commits.map((c, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-2 rounded-xl bg-slate-900 border border-white/5 gap-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-bold">
                    {c.repo}
                  </span>
                  <span className="text-slate-200 text-xs">{c.msg}</span>
                </div>
                <span className="text-[10px] text-slate-500">{c.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
