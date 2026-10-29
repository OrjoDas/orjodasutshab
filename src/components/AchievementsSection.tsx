import React from 'react';
import { motion } from 'motion/react';
import { ACHIEVEMENTS_DATA } from '../data/portfolioData';
import { Trophy, Award, ShieldAlert, Star, Crown, Flame } from 'lucide-react';

export const AchievementsSection: React.FC = () => {
  return (
    <section id="achievements" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-mono uppercase tracking-widest">
            <Crown className="w-3.5 h-3.5" /> 20 & 21. Honors & Badges
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Hackathons, Web Awards &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-300 to-cyan-400">
              Industry Honors
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Recognitions earned in global developer hackathons, open source contributions, and 5-star client ratings.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ACHIEVEMENTS_DATA.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="bg-slate-900/90 border border-white/15 rounded-3xl p-6 backdrop-blur-xl shadow-xl hover:border-yellow-400/50 hover:shadow-[0_0_25px_rgba(234,179,8,0.25)] transition-all group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-yellow-500 to-amber-300 p-0.5 shadow-lg group-hover:scale-110 transition-transform">
                  <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-yellow-400" />
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                    {item.organization} • {item.year}
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors mt-0.5">
                    {item.title}
                  </h3>
                </div>

                <p className="text-slate-300 text-xs leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 mt-4 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1 text-emerald-400">
                  <Flame className="w-3.5 h-3.5" /> Verifiable
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                  {item.badgeIcon}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
