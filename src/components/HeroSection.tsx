import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  Download,
  Send,
  Terminal,
  Code2,
  Lock,
  Globe,
  FileText,
  X,
  GitBranch,
  Award,
  Activity,
  Cpu,
  Layers,
  CheckCircle,
  FileCode,
  Palette,
  Server,
  Atom,
  TrendingUp,
  Search,
  ShieldAlert,
  Sun,
  Flame,
  Zap,
  Box,
  Compass,
  ArrowUpRight,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import avatarImg from '../assets/images/orjo_avatar_1785358591560.jpg';

// 9 Orbiting Tech & Skill Items around the profile avatar
const ORBIT_ITEMS = [
  {
    name: 'HTML5',
    icon: FileCode,
    borderCol: 'border-orange-500/80',
    bgGlow: 'from-orange-500/30 to-amber-500/10',
    textCol: 'text-orange-400',
    shadow: 'shadow-[0_0_20px_rgba(249,115,22,0.5)]',
    tag: 'ADVANCED',
    level: 95,
    desc: 'Semantic HTML5 architecture, W3C standards & accessible Web UI',
  },
  {
    name: 'CSS3',
    icon: Palette,
    borderCol: 'border-blue-500/80',
    bgGlow: 'from-blue-500/30 to-sky-500/10',
    textCol: 'text-blue-400',
    shadow: 'shadow-[0_0_20px_rgba(59,130,246,0.5)]',
    tag: 'EXPERT',
    level: 98,
    desc: 'Tailwind CSS, glassmorphism, responsive grid & fluid keyframe animations',
  },
  {
    name: 'JavaScript',
    icon: Terminal,
    borderCol: 'border-yellow-400/80',
    bgGlow: 'from-yellow-500/30 to-amber-500/10',
    textCol: 'text-yellow-300',
    shadow: 'shadow-[0_0_20px_rgba(234,179,8,0.5)]',
    tag: 'MASTER',
    level: 92,
    desc: 'ES6+ JavaScript, Async/Await Promises, DOM state engines & Web APIs',
  },
  {
    name: 'Node.js',
    icon: Server,
    borderCol: 'border-emerald-500/80',
    bgGlow: 'from-emerald-500/30 to-teal-500/10',
    textCol: 'text-emerald-400',
    shadow: 'shadow-[0_0_20px_rgba(16,185,129,0.5)]',
    tag: 'PRO DEV',
    level: 90,
    desc: 'Express.js backend servers, RESTful APIs, JWT authentication & microservices',
  },
  {
    name: 'React.js',
    icon: Atom,
    borderCol: 'border-cyan-400/80',
    bgGlow: 'from-cyan-500/30 to-blue-500/10',
    textCol: 'text-cyan-300',
    shadow: 'shadow-[0_0_20px_rgba(34,211,238,0.5)]',
    tag: 'EXPERT',
    level: 96,
    desc: 'Component architecture, custom Hooks, state management & Vite tooling',
  },
  {
    name: 'Python',
    icon: Code2,
    borderCol: 'border-amber-400/80',
    bgGlow: 'from-amber-500/30 to-orange-500/10',
    textCol: 'text-amber-300',
    shadow: 'shadow-[0_0_20px_rgba(251,191,36,0.5)]',
    tag: 'ADVANCED',
    level: 88,
    desc: 'Python scripting, backend automation, web scraping & data pipelines',
  },
  {
    name: 'Marketing',
    icon: TrendingUp,
    borderCol: 'border-pink-500/80',
    bgGlow: 'from-pink-500/30 to-rose-500/10',
    textCol: 'text-pink-400',
    shadow: 'shadow-[0_0_20px_rgba(236,72,153,0.5)]',
    tag: 'STRATEGIST',
    level: 85,
    desc: 'Digital marketing campaigns, social media growth & funnel optimization',
  },
  {
    name: 'SEO',
    icon: Search,
    borderCol: 'border-teal-400/80',
    bgGlow: 'from-teal-500/30 to-cyan-500/10',
    textCol: 'text-teal-300',
    shadow: 'shadow-[0_0_20px_rgba(45,212,191,0.5)]',
    tag: 'SPECIALIST',
    level: 92,
    desc: 'Technical SEO auditing, Schema markup, keyword ranking & speed optimization',
  },
  {
    name: 'Next.js',
    icon: Globe,
    borderCol: 'border-purple-500/80',
    bgGlow: 'from-purple-500/30 to-indigo-500/10',
    textCol: 'text-purple-300',
    shadow: 'shadow-[0_0_20px_rgba(168,85,247,0.5)]',
    tag: 'FULL STACK',
    level: 95,
    desc: 'Next.js App Router, SSR, Server Components, API routes & Cloud Run deployments',
  },
];

export const HeroSection: React.FC<{
  onOpenAi?: () => void;
  onNavigate?: (page: 'projects') => void;
}> = ({ onOpenAi, onNavigate }) => {
  const [showCvModal, setShowCvModal] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState(PERSONAL_INFO.avatar || avatarImg);

  // Typewriter effect for Line 2 exactly matching the user's uploaded pictures
  const fullSecondLine = 'High-performance Web Enthusiast & Digital Marketing Strategist.';
  const [typedSecondLine, setTypedSecondLine] = useState('');
  const [isDeletingSecond, setIsDeletingSecond] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (!isDeletingSecond && typedSecondLine.length < fullSecondLine.length) {
      timeout = setTimeout(() => {
        setTypedSecondLine(fullSecondLine.slice(0, typedSecondLine.length + 1));
      }, 50);
    } else if (!isDeletingSecond && typedSecondLine.length === fullSecondLine.length) {
      timeout = setTimeout(() => {
        setIsDeletingSecond(true);
      }, 4500);
    } else if (isDeletingSecond && typedSecondLine.length > 0) {
      timeout = setTimeout(() => {
        setTypedSecondLine(fullSecondLine.slice(0, typedSecondLine.length - 1));
      }, 25);
    } else if (isDeletingSecond && typedSecondLine.length === 0) {
      timeout = setTimeout(() => {
        setIsDeletingSecond(false);
      }, 600);
    }
    return () => clearTimeout(timeout);
  }, [typedSecondLine, isDeletingSecond]);

  const handleDownloadCv = () => {
    const cvContent = `
====================================================
           ORJO DAS UTSHAB - CURRICULUM VITAE
====================================================
Title: Senior Full Stack Web Developer & 3D Web Architect
Location: Dhaka, Bangladesh
Email: ${PERSONAL_INFO.email}
Phone: ${PERSONAL_INFO.phone}
Portfolio: https://orjodasutshab.dev

SUMMARY:
Passionate Senior Full Stack Developer & 3D Web Architect with 5+ years
of experience building scalable web applications, responsive user interfaces,
and high-concurrency cloud backends. Skilled in React, Next.js, Node.js,
TypeScript, Three.js 3D WebGL, PostgreSQL, AWS, and Gemini AI.

CORE EXPERTISE:
- Frontend: React.js, Next.js, TypeScript, Tailwind CSS, Motion, Three.js 3D
- Backend: Node.js, Express, Python (FastAPI/Django), Java Spring Boot, GraphQL
- Database: PostgreSQL, MongoDB, Redis In-Memory Caching, Prisma / Drizzle
- Cloud & DevOps: Docker, Kubernetes, AWS, Ubuntu/RedHat, CI/CD Pipelines

EXPERIENCE:
1. Lead Full Stack & Cloud Solutions Engineer - 2023 - Present
2. Senior Full Stack Web Developer - 2021 - 2023
3. Junior Developer - 2019 - 2021

EDUCATION & CREDENTIALS:
- B.Sc. in Computer Science & Engineering (DUET)
- Meta Certified Senior Full Stack Engineer
- AWS Certified Solutions Architect

====================================================
`;
    const blob = new Blob([cvContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Orjo_Das_Utshab_CV.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-20 sm:pt-24 pb-16 flex items-center justify-center overflow-hidden z-10 font-sans"
    >
      {/* Lusion Aurora Ambient Glow Spheres */}
      <div className="absolute top-1/4 left-5 w-80 h-80 bg-cyan-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-5 w-96 h-96 bg-purple-600/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 pt-4 sm:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* LEFT COLUMN: Name, Subtitle Typewriter, Metrics, CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 xl:col-span-7 text-left space-y-6"
          >
            {/* Giant Name Headline (Single line on PC/desktop) */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black tracking-tight leading-tight drop-shadow-2xl font-sans lg:whitespace-nowrap">
              <span className="text-white">Orjo </span>
              <span className="text-[#38BDF8]">Das </span>
              <span className="text-[#A855F7]">Utshab</span>
            </h1>

            {/* Subtitle with Typewriter Animation (Matching User's Uploaded Frames) */}
            <div className="font-mono text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed space-y-2 pt-1 max-w-2xl">
              <p className="text-slate-200 font-medium">
                Diploma Trainee in Computer Engineering at BSPI.
              </p>
              <p className="text-slate-300 font-medium flex items-center flex-wrap min-h-[1.75rem]">
                <span>{typedSecondLine}</span>
                <span className="w-2.5 h-5 bg-[#5EE6C9] inline-block ml-1 animate-pulse" />
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap gap-3.5 pt-2 font-mono">
              <a
                href="#projects"
                onClick={(e) => {
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate('projects');
                  }
                }}
                data-cursor-hover="true"
                data-cursor-text="EXPLORE"
                className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-extrabold text-xs tracking-wider shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] hover:scale-105 transition-all flex items-center gap-2 group cursor-pointer uppercase"
              >
                <span>EXPLORE WORKS</span>
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform text-cyan-200" />
              </a>

              <button
                onClick={() => setShowCvModal(true)}
                data-cursor-hover="true"
                data-cursor-text="RESUME"
                className="px-6 py-3.5 rounded-2xl bg-slate-900/80 border border-white/15 hover:bg-white/10 text-white font-bold text-xs tracking-wider backdrop-blur-md hover:scale-105 transition-all flex items-center gap-2 cursor-pointer uppercase"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>DOWNLOAD CV</span>
              </button>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: User Photo with Orbiting Tech Nodes & Ambient Glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-5 xl:col-span-5 flex flex-col items-center justify-center relative py-6"
          >
            {/* Orbit Stage Container */}
            <div className="relative flex items-center justify-center w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] xl:w-[420px] xl:h-[420px] [--orbit-r:120px] sm:[--orbit-r:155px] xl:[--orbit-r:175px]">
              {/* Soft Ambient Multi-Color Glow */}
              <div className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-tr from-cyan-500/25 via-purple-500/20 to-emerald-400/15 blur-3xl opacity-90 pointer-events-none" />

              {/* Orbital Rings */}
              <div className="absolute w-[240px] h-[240px] sm:w-[310px] sm:h-[310px] xl:w-[350px] xl:h-[350px] rounded-full border border-cyan-500/35 border-dashed pointer-events-none shadow-[0_0_25px_rgba(6,182,212,0.25)]" />
              <div className="absolute w-[260px] h-[260px] sm:w-[330px] sm:h-[330px] xl:w-[370px] xl:h-[370px] rounded-full border border-purple-500/25 pointer-events-none animate-[spin_50s_linear_infinite]" />

              {/* Central Circular Profile Picture (User's Photo) */}
              <div
                data-cursor-hover="true"
                data-cursor-text="ORJO"
                className="relative z-20 w-44 h-44 sm:w-[220px] sm:h-[220px] xl:w-[250px] xl:h-[250px] rounded-full p-[3.5px] bg-gradient-to-tr from-[#38BDF8] via-cyan-400 to-[#A855F7] shadow-[0_0_50px_rgba(6,182,212,0.5),0_0_80px_rgba(168,85,247,0.35)] group transition-transform duration-500 hover:scale-105 cursor-pointer"
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-950 relative">
                  <img
                    src={avatarSrc}
                    alt={PERSONAL_INFO.name}
                    onError={() => setAvatarSrc(avatarImg)}
                    className="w-full h-full object-cover object-top rounded-full group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 rounded-full ring-1 ring-white/15 pointer-events-none" />
                </div>
              </div>

              {/* Orbiting Tech Badges */}
              <div className="absolute inset-0 flex items-center justify-center animate-[spin_36s_linear_infinite] pointer-events-none select-none transition-all">
                {ORBIT_ITEMS.map((item, index) => {
                  const angle = index * (360 / ORBIT_ITEMS.length);
                  const IconComponent = item.icon;
                  return (
                    <div
                      key={item.name}
                      className="absolute top-1/2 left-1/2 pointer-events-none"
                      style={{
                        transform: `rotate(${angle}deg) translateY(calc(-1 * var(--orbit-r))) rotate(-${angle}deg)`,
                      }}
                    >
                      <div className="animate-[spin_36s_linear_infinite_reverse]">
                        <div
                          className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-950/90 border border-slate-800/80 shadow-[0_4px_16px_rgba(0,0,0,0.8)] flex flex-col items-center justify-center backdrop-blur-2xl relative pointer-events-none select-none"
                        >
                          <IconComponent className={`w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 ${item.textCol}`} />
                          <span className="text-[6px] sm:text-[7px] font-mono font-bold mt-0.5 tracking-tighter truncate max-w-[30px] sm:max-w-[36px] text-slate-300">
                            {item.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

        </div>

        {/* Scroll Down Indicator */}
        <div className="pt-10 flex flex-col items-center justify-center">
          <a
            href="#about"
            data-cursor-hover="true"
            data-cursor-text="DOWN"
            className="flex flex-col items-center text-slate-400 hover:text-cyan-400 transition-colors group"
          >
            <span className="text-[10px] font-mono tracking-widest uppercase mb-1">
              Scroll to Explore
            </span>
            <div className="w-5 h-9 border-2 border-white/20 rounded-full flex items-start justify-center p-1 group-hover:border-cyan-400 transition-colors">
              <div className="w-1.5 h-2.5 rounded-full bg-cyan-400 animate-bounce" />
            </div>
          </a>
        </div>
      </div>

      {/* CV Download / Preview Modal */}
      <AnimatePresence>
        {showCvModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-slate-900 border border-white/20 rounded-3xl p-6 max-w-lg w-full shadow-2xl relative space-y-4 font-sans"
            >
              <button
                onClick={() => setShowCvModal(false)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                <FileText className="w-8 h-8 text-cyan-400" />
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Orjo Das Utshab - Resume
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    Senior Full Stack Web Developer & 3D Web Architect
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-300 font-mono bg-slate-950 p-4 rounded-xl border border-white/10 max-h-60 overflow-y-auto">
                <p className="text-cyan-400 font-bold">SUMMARY</p>
                <p>5+ years experience in React, Next.js, Node.js, Three.js 3D WebGL & Cloud.</p>
                <p className="text-cyan-400 font-bold pt-2">HIGHLIGHTS</p>
                <p>• 120+ Web Applications Delivered</p>
                <p>• Meta Certified Senior Full Stack Engineer</p>
                <p>• AWS Solutions Architect Certified</p>
                <p>• RedHat Linux Administrator (RHCSA)</p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleDownloadCv}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" /> Download CV File
                </button>
                <button
                  onClick={() => setShowCvModal(false)}
                  className="py-3 px-4 rounded-xl bg-white/10 text-white font-semibold text-xs hover:bg-white/15 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
