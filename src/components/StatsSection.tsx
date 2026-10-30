import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Briefcase, CheckCircle, Users, Trophy } from 'lucide-react';

const CountUpNumber: React.FC<{ target: number; suffix?: string; duration?: number }> = ({
  target,
  suffix = '',
  duration = 1800,
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;
    let frameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(easeOut * target));

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="tabular-nums font-mono">
      {count}
      {suffix}
    </span>
  );
};

export const StatsSection: React.FC = () => {
  const statsList = [
    {
      label: 'Years of Experience',
      value: PERSONAL_INFO.stats.yearsExperience,
      suffix: '+',
      icon: Briefcase,
      color: 'from-purple-500 to-indigo-500',
      glow: 'hover:shadow-[0_12px_35px_rgba(168,85,247,0.25)] hover:border-purple-400/60',
    },
    {
      label: 'Completed Projects',
      value: PERSONAL_INFO.stats.completedProjects,
      suffix: '+',
      icon: CheckCircle,
      color: 'from-cyan-500 to-blue-500',
      glow: 'hover:shadow-[0_12px_35px_rgba(6,182,212,0.25)] hover:border-cyan-400/60',
    },
    {
      label: 'Satisfied Clients',
      value: PERSONAL_INFO.stats.happyClients,
      suffix: '+',
      icon: Users,
      color: 'from-emerald-500 to-teal-500',
      glow: 'hover:shadow-[0_12px_35px_rgba(16,185,129,0.25)] hover:border-emerald-400/60',
    },
    {
      label: 'Awards & Honors',
      value: PERSONAL_INFO.stats.awardsCount,
      suffix: '+',
      icon: Trophy,
      color: 'from-yellow-500 to-amber-500',
      glow: 'hover:shadow-[0_12px_35px_rgba(245,158,11,0.25)] hover:border-yellow-400/60',
    },
  ];

  return (
    <section className="py-16 relative z-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {statsList.map((stat, i) => {
            const IconComp = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.03 }}
                className={`bg-slate-900/80 border border-white/15 rounded-3xl p-6 text-center backdrop-blur-xl shadow-xl transition-all group relative overflow-hidden ${stat.glow}`}
              >
                <div className={`w-12 h-12 mx-auto mb-3 rounded-2xl bg-gradient-to-r ${stat.color} p-0.5 shadow-lg group-hover:rotate-12 transition-transform`}>
                  <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                    <IconComp className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
                  <CountUpNumber target={stat.value} suffix={stat.suffix} duration={1700} />
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
