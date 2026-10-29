import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { SKILLS_DATA } from '../data/portfolioData';
import {
  Code,
  FileCode,
  Palette,
  Boxes,
  Server,
  Terminal,
  Cpu,
  Database,
  Zap,
  ShieldAlert,
  Network,
  Lock,
  Command,
  Cloud,
  Container,
  Sparkles,
  Bot,
  ThumbsUp,
  CheckCircle,
} from 'lucide-react';

const CATEGORIES = [
  'All',
  'Frontend',
  'Backend',
  'Database',
  'DevOps & Architecture',
  'Linux',
  'Cloud',
  'AI Tools',
] as const;

export const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [endorsements, setEndorsements] = useState<Record<string, number>>({});
  const [endorsedSkills, setEndorsedSkills] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Load existing endorsements from localStorage
    const savedEndorsements = localStorage.getItem('orjo_skill_endorsements');
    const savedUserEndorsed = localStorage.getItem('orjo_user_endorsed');

    const initialCounts: Record<string, number> = savedEndorsements
      ? JSON.parse(savedEndorsements)
      : {
          'React.js & Next.js': 142,
          TypeScript: 118,
          'Tailwind CSS & Motion': 135,
          'Node.js & Express': 129,
          'REST & GraphQL Architecture': 164,
          'Performance & Web Vitals': 152,
          'Ubuntu / RedHat Enterprise': 110,
          'Gemini AI API & SDK': 148,
        };

    setEndorsements(initialCounts);

    if (savedUserEndorsed) {
      setEndorsedSkills(JSON.parse(savedUserEndorsed));
    }
  }, []);

  const handleEndorse = (skillName: string) => {
    if (endorsedSkills[skillName]) return;

    const newCounts = {
      ...endorsements,
      [skillName]: (endorsements[skillName] || 45) + 1,
    };
    const newEndorsed = { ...endorsedSkills, [skillName]: true };

    setEndorsements(newCounts);
    setEndorsedSkills(newEndorsed);

    localStorage.setItem('orjo_skill_endorsements', JSON.stringify(newCounts));
    localStorage.setItem('orjo_user_endorsed', JSON.stringify(newEndorsed));
  };

  const filteredSkills =
    selectedCategory === 'All'
      ? SKILLS_DATA
      : SKILLS_DATA.filter((s) => s.category === selectedCategory);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code': return <Code className="w-5 h-5 text-purple-400" />;
      case 'FileCode': return <FileCode className="w-5 h-5 text-cyan-400" />;
      case 'Palette': return <Palette className="w-5 h-5 text-indigo-400" />;
      case 'Boxes': return <Boxes className="w-5 h-5 text-purple-400" />;
      case 'Server': return <Server className="w-5 h-5 text-emerald-400" />;
      case 'Terminal': return <Terminal className="w-5 h-5 text-yellow-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-rose-400" />;
      case 'Database': return <Database className="w-5 h-5 text-blue-400" />;
      case 'Zap': return <Zap className="w-5 h-5 text-amber-400" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5 text-red-400" />;
      case 'Network': return <Network className="w-5 h-5 text-cyan-400" />;
      case 'Lock': return <Lock className="w-5 h-5 text-emerald-400" />;
      case 'Command': return <Command className="w-5 h-5 text-amber-400" />;
      case 'Cloud': return <Cloud className="w-5 h-5 text-sky-400" />;
      case 'Container': return <Container className="w-5 h-5 text-blue-400" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-fuchsia-400" />;
      case 'Bot': return <Bot className="w-5 h-5 text-cyan-400" />;
      default: return <Code className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="skills" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest">
            <Zap className="w-3.5 h-3.5" /> 03. Technical Skills
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            3D Technology{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400">
              Network
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Interactive full-stack technology node graph. Hover or click nodes to trace connection flows from fundamentals to cloud architecture.
          </p>
        </div>

        {/* 3D Interactive Technology Network Flow Diagram */}
        <div className="mb-16 bg-slate-950/90 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-[0_0_40px_rgba(6,182,212,0.15)] relative overflow-hidden font-mono">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-widest">
              <Network className="w-4 h-4 text-purple-400 animate-pulse" /> FULL-STACK DATA PIPELINE GRAPH
            </div>
            <span className="text-[10px] text-slate-400">SELECT NODE TO INSPECT</span>
          </div>

          {/* Node Flow Chain */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 relative z-10">
            {[
              { id: 'html', label: 'HTML5', color: 'from-orange-500 to-amber-400', level: '98%', desc: 'Semantic layout, accessibility, SEO structure & microdata standards.' },
              { id: 'css', label: 'CSS3 / Tailwind', color: 'from-sky-500 to-cyan-400', level: '96%', desc: 'Fluid design, CSS Grid, 3D transforms, glassmorphism & responsive mechanics.' },
              { id: 'js', label: 'JavaScript / TS', color: 'from-yellow-400 to-amber-500', level: '95%', desc: 'ES6+, async pipelines, strict typing, functional programming & WebGL.' },
              { id: 'react', label: 'React / Next.js', color: 'from-cyan-400 to-indigo-500', level: '98%', desc: 'React 18, Server Components, Zustand, Motion, custom hooks & performance.' },
              { id: 'node', label: 'Node / Express', color: 'from-emerald-500 to-teal-400', level: '94%', desc: 'REST & GraphQL APIs, JWT Auth, microservices, websockets & middleware.' },
              { id: 'db', label: 'PostgreSQL / Mongo', color: 'from-indigo-500 to-purple-500', level: '92%', desc: 'Relational schemas, ORM optimization, Firestore, Redis caching & indexing.' },
              { id: 'cloud', label: 'AWS / Docker / K8s', color: 'from-purple-500 to-pink-500', level: '90%', desc: 'Container orchestration, CI/CD pipelines, server hardening & HTTPS.' },
            ].map((node, i) => (
              <div
                key={node.id}
                className="group relative flex flex-col items-center cursor-pointer"
              >
                {/* Connector Arrow for Desktop */}
                {i < 6 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] right-[-40%] h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500 z-0 opacity-40 group-hover:opacity-100 group-hover:scale-x-110 transition-all" />
                )}

                {/* Circular Glowing Node */}
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${node.color} p-0.5 shadow-lg group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] transition-all relative z-10 flex items-center justify-center`}>
                  <div className="w-full h-full bg-slate-950 rounded-[14px] flex flex-col items-center justify-center p-2 text-center">
                    <span className="text-[11px] font-black text-white group-hover:text-cyan-300 transition-colors">
                      {node.label.split(' ')[0]}
                    </span>
                    <span className="text-[9px] font-bold text-cyan-400">{node.level}</span>
                  </div>
                </div>

                <span className="mt-3 text-[11px] font-bold text-slate-300 group-hover:text-white text-center">
                  {node.label}
                </span>

                {/* Hover Details Floating Tooltip Box */}
                <div className="absolute bottom-24 hidden group-hover:block w-48 bg-slate-900 border border-cyan-500/50 p-3 rounded-2xl shadow-2xl z-30 text-[10px] text-slate-200 pointer-events-none animate-fadeIn">
                  <div className="font-bold text-cyan-400 mb-1">{node.label} Node</div>
                  <p className="text-slate-300 leading-tight">{node.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)] scale-105'
                  : 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3D Skill Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="bg-slate-900/80 border border-white/15 rounded-3xl p-6 backdrop-blur-xl shadow-xl hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(6,182,212,0.25)] transition-all group relative overflow-hidden"
            >
              {/* Top Row: Icon + Skill Name + Circular Meter */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-cyan-500/10 group-hover:border-cyan-400/40 transition-colors">
                    {getIcon(skill.iconName)}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base group-hover:text-cyan-400 transition-colors">
                      {skill.name}
                    </h3>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                      {skill.category}
                    </span>
                  </div>
                </div>

                {/* Circular Skill Meter SVG */}
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <svg className="w-12 h-12 -rotate-90">
                    <circle
                      cx="24"
                      cy="24"
                      r="18"
                      className="stroke-slate-800 fill-none stroke-[3.5]"
                    />
                    <circle
                      cx="24"
                      cy="24"
                      r="18"
                      className="stroke-cyan-400 fill-none stroke-[3.5] transition-all duration-1000"
                      strokeDasharray="113"
                      strokeDashoffset={113 - (113 * skill.level) / 100}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute text-[10px] font-mono font-bold text-white">
                    {skill.level}%
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-400 text-xs leading-relaxed mb-4">
                {skill.description}
              </p>

              {/* Animated Horizontal Progress Bar & Endorse Button */}
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>Proficiency</span>
                  <span className="text-cyan-400 font-bold">{skill.level}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden p-0.5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400"
                  />
                </div>

                {/* Endorsement Interactive Row */}
                <div className="pt-2 flex items-center justify-between border-t border-white/5 text-[11px] font-mono">
                  <span className="text-slate-400 text-[10px]">
                    {endorsements[skill.name] || 52} Endorsements
                  </span>
                  <button
                    onClick={() => handleEndorse(skill.name)}
                    disabled={endorsedSkills[skill.name]}
                    className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                      endorsedSkills[skill.name]
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default'
                        : 'bg-white/5 border border-white/10 hover:bg-cyan-500/20 hover:text-cyan-300 text-slate-300'
                    }`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${endorsedSkills[skill.name] ? 'fill-emerald-400 text-emerald-400' : ''}`} />
                    <span>{endorsedSkills[skill.name] ? 'Endorsed!' : 'Endorse'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
