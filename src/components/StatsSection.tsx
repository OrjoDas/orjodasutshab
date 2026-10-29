import React from 'react';
import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Briefcase, CheckCircle, Users, Trophy, Coffee } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const statsList = [
    {
      label: 'Years of Experience',
      value: PERSONAL_INFO.stats.yearsExperience,
      suffix: '+',
      icon: Briefcase,
      color: 'from-purple-500 to-indigo-500',
    },
    {
      label: 'Completed Projects',
      value: PERSONAL_INFO.stats.completedProjects,
      suffix: '+',
      icon: CheckCircle,
      color: 'from-cyan-500 to-blue-500',
    },
    {
      label: 'Satisfied Clients',
      value: PERSONAL_INFO.stats.happyClients,
      suffix: '+',
      icon: Users,
      color: 'from-emerald-500 to-teal-500',
    },
    {
      label: 'Awards & Honors',
      value: PERSONAL_INFO.stats.awardsCount,
      suffix: '+',
      icon: Trophy,
      color: 'from-yellow-500 to-amber-500',
    },
  ];

  return (
    <section className="py-16 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {statsList.map((stat, i) => {
            const IconComp = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-slate-900/80 border border-white/15 rounded-3xl p-6 text-center backdrop-blur-xl shadow-xl hover:border-cyan-400/40 hover:scale-105 transition-all group"
              >
                <div className={`w-12 h-12 mx-auto mb-3 rounded-2xl bg-gradient-to-r ${stat.color} p-0.5 shadow-lg group-hover:rotate-12 transition-transform`}>
                  <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                    <IconComp className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
