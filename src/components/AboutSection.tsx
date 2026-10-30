import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import {
  Award,
  Briefcase,
  Coffee,
  Users,
  CheckCircle2,
  Cpu,
} from 'lucide-react';
import kowshikPortrait from '../assets/images/kowshik_portrait.png';
import { PERSONAL_INFO } from '../data/portfolioData';

// Interactive rolling number counter animation
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
      // Smooth cubic ease-out
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

const CLOUDINARY_AVATAR =
  'https://res.cloudinary.com/amfof9ka/image/upload/f_auto,q_auto/ChatGPT_Image_Aug_1__2026__11_32_31_PM-removebg-preview';

export const AboutSection: React.FC = () => {
  const [avatarSrc, setAvatarSrc] = useState(CLOUDINARY_AVATAR);

  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const marksTopRef = useRef<HTMLDivElement>(null);
  const marksBottomRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const slot = slotRef.current;
    const card = cardRef.current;
    const textEl = textRef.current;
    const marksTop = marksTopRef.current;
    const marksBottom = marksBottomRef.current;
    const cover = coverRef.current;
    const iframe = iframeRef.current;

    if (!section || !stage || !slot || !card || !textEl || !marksTop || !marksBottom || !cover) {
      return;
    }

    let S = { x: 0, y: 0, w: 0, h: 0 };
    let E = { x: 0, y: 0, w: 0, h: 0 };
    let sectionTop = 0;
    let sectionHeight = 0;
    let cur = 0;
    let rafId: number;

    const measure = () => {
      const stageRect = stage.getBoundingClientRect();
      const slotRect = slot.getBoundingClientRect();
      const secRect = section.getBoundingClientRect();

      // Cache section position in document to prevent layout thrashing in RAF tick
      sectionTop = secRect.top + window.scrollY;
      sectionHeight = secRect.height;

      const stageWidth = stage.clientWidth || window.innerWidth;
      const stageHeight = stage.clientHeight || window.innerHeight;

      // Robust fallback so S always has valid dimensions
      const slotW = slotRect.width > 20 ? slotRect.width : Math.min(420, stageWidth * 0.38);
      const slotH = slotRect.height > 20 ? slotRect.height : slotW * 1.25;
      const slotX = slotRect.width > 20 ? slotRect.left - stageRect.left : stageWidth * 0.08;
      const slotY = slotRect.height > 20 ? slotRect.top - stageRect.top : (stageHeight - slotH) / 2;

      S = {
        x: slotX,
        y: slotY,
        w: slotW,
        h: slotH,
      };

      // Exact 16:9 ratio matching YouTube video so card border matches video perfectly with NO black bars
      let eW = Math.min(1160, stageWidth * 0.92);
      let eH = eW * (9 / 16);
      if (eH > stageHeight * 0.78) {
        eH = stageHeight * 0.78;
        eW = eH * (16 / 9);
      }
      const eX = (stageWidth - eW) / 2;
      const eY = (stageHeight - eH) / 2 + 8;

      E = {
        x: eX,
        y: eY,
        w: eW,
        h: eH,
      };
    };

    measure();
    window.addEventListener('resize', measure);
    window.addEventListener('load', measure);

    const smoothstep = (x: number) => {
      const clamped = Math.max(0, Math.min(1, x));
      return clamped * clamped * (3 - 2 * clamped);
    };

    const tick = () => {
      const currentScrollY = window.scrollY;

      // Re-measure on initial frames if dimensions were zero
      if (S.w <= 20 || sectionHeight === 0) {
        measure();
      }

      // Compute scroll progress without calling getBoundingClientRect() to avoid forced reflows
      const scrollableHeight = sectionHeight - window.innerHeight;
      const p = scrollableHeight > 0 ? Math.max(0, Math.min(1, (currentScrollY - sectionTop) / scrollableHeight)) : 0;

      // Smooth, deliberate expansion over 65% of the scroll; comfortable hold for remaining 35%
      const q = smoothstep(Math.max(0, Math.min(1, p / 0.65)));

      // Snappy and responsive interpolation without lagging behind or drifting
      cur += (q - cur) * 0.14;

      // Interpolate card dimensions
      const x = S.x + (E.x - S.x) * cur;
      const y = S.y + (E.y - S.y) * cur;
      const w = S.w + (E.w - S.w) * cur;
      const h = S.h + (E.h - S.h) * cur;
      const br = 28 + (22 - 28) * cur;

      card.style.width = `${w.toFixed(1)}px`;
      card.style.height = `${h.toFixed(1)}px`;
      card.style.borderRadius = `${br.toFixed(1)}px`;

      // Stable GPU translation with subtle perspective tilt based solely on cur (eliminating mousewheel velocity shudder)
      const rotY = (1 - cur) * -3;
      card.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) perspective(1200px) rotateY(${rotY.toFixed(2)}deg)`;

      // Text opacity and translation
      const textOpacity = Math.max(0, 1 - cur * 2.2);
      const textTranslateY = -cur * 50;
      textEl.style.opacity = `${textOpacity.toFixed(2)}`;
      textEl.style.transform = `translate3d(0, ${textTranslateY.toFixed(1)}px, 0)`;
      textEl.style.pointerEvents = textOpacity > 0.1 ? 'auto' : 'none';

      // Marks opacity
      const a = smoothstep(Math.max(0, Math.min(1, (cur - 0.40) / 0.35)));

      // Gradual dissolve of photo cover into auto-playing video
      const videoReveal = smoothstep(Math.max(0, Math.min(1, (cur - 0.25) / 0.40)));
      cover.style.opacity = `${(1 - videoReveal).toFixed(2)}`;
      cover.style.pointerEvents = videoReveal > 0.8 ? 'none' : 'auto';

      // Rows of "+" marks
      marksTop.style.width = `${w.toFixed(1)}px`;
      marksTop.style.transform = `translate3d(${x.toFixed(1)}px, ${(y - 32).toFixed(1)}px, 0)`;
      marksTop.style.opacity = `${a.toFixed(2)}`;

      marksBottom.style.width = `${w.toFixed(1)}px`;
      marksBottom.style.transform = `translate3d(${x.toFixed(1)}px, ${(y + h + 10).toFixed(1)}px, 0)`;
      marksBottom.style.opacity = `${a.toFixed(2)}`;

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', measure);
      window.removeEventListener('load', measure);
    };
  }, []);

  return (
    <>
      <style>{`
        .who {
          position: relative;
          height: 310vh;
        }
        .who-stage {
          position: sticky;
          top: 0;
          height: 100vh;
          width: 100%;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          contain: paint;
        }
        .who-grid {
          display: grid;
          width: 100%;
          max-width: 1280px;
          padding: 0 clamp(16px, 4vw, 40px);
          margin: 0 auto;
          gap: clamp(32px, 5vw, 72px);
          grid-template-columns: 0.9fr 1.3fr;
          align-items: center;
          box-sizing: border-box;
        }
        @media (max-width: 820px) {
          .who-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }
        .who-slot {
          width: 100%;
          aspect-ratio: 4 / 5;
          max-height: 72vh;
          border-radius: 28px;
          pointer-events: none;
        }
        @media (max-width: 820px) {
          .who-slot {
            width: 70%;
            max-height: 46vh;
            margin: 0 auto;
          }
        }
        .who-text {
          will-change: transform, opacity;
        }
        .who-card {
          position: absolute;
          left: 0;
          top: 0;
          overflow: hidden;
          border-radius: 28px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 30px 80px -20px rgba(0, 0, 0, 0.9), 0 0 50px rgba(94, 230, 201, 0.15);
          z-index: 20;
          transform-origin: 50% 50%;
          will-change: transform, width, height;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          pointer-events: auto;
          background: #000000;
        }
        .who-video-container {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: #000000;
          border-radius: inherit;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
        }
        .who-iframe-wrap {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
          z-index: 10;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          backface-visibility: hidden;
        }
        .who-iframe {
          position: absolute;
          top: 50%;
          left: 50%;
          /* 120% width and 144% height scales past YouTube header, footer and any sidebars */
          width: 120%;
          height: 144%;
          transform: translate(-50%, -50%) translateZ(0);
          -webkit-transform: translate(-50%, -50%) translateZ(0);
          border: none;
          pointer-events: none;
          backface-visibility: hidden;
        }
        .who-cover {
          position: absolute;
          inset: 0;
          z-index: 20;
          width: 100%;
          height: 100%;
          background: #0b0b0d;
          border-radius: inherit;
          overflow: hidden;
          will-change: opacity;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
        }
        .who-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 50% 18%;
          display: block;
        }
        .who-marks {
          position: absolute;
          left: 0;
          top: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 22px;
          line-height: 1;
          font-family: monospace;
          color: rgba(255, 255, 255, 0.5);
          pointer-events: none;
          z-index: 20;
          opacity: 0;
          will-change: transform, width, opacity;
        }
      `}</style>

      {/* ======================================================== */}
      {/* 1. SCROLL-DRIVEN CARD EXPAND WHO IS ORJO SECTION         */}
      {/* ======================================================== */}
      <section id="about" ref={sectionRef} className="who font-sans">
        <div ref={stageRef} className="who-stage">
          {/* Top '+' Marks Row (5 marks spread evenly across card width) */}
          <div ref={marksTopRef} className="who-marks who-marks-top">
            <span>+</span>
            <span>+</span>
            <span>+</span>
            <span>+</span>
            <span>+</span>
          </div>

          {/* Interactive Expanding 3D Card with Embedded Full Border-to-Border Video */}
          <div ref={cardRef} className="who-card">
            <div className="who-video-container">
              {/* Full Border-to-Border Video (Preloaded, Zero Black Bars, Muted & Autoplay) */}
              <div className="who-iframe-wrap">
                <iframe
                  ref={iframeRef}
                  src="https://www.youtube-nocookie.com/embed/oGPHU8sEhc0?autoplay=1&mute=1&loop=1&playlist=oGPHU8sEhc0&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&disablekb=1"
                  title="Campus Video"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="who-iframe"
                />
              </div>

              {/* Photo Cover (visible at start, smoothly dissolves to reveal auto-playing video) */}
              <div ref={coverRef} className="who-cover">
                <img
                  src={avatarSrc}
                  alt="Orjo Das Utshab"
                  onError={() => setAvatarSrc(kowshikPortrait)}
                  className="who-card-img"
                />
              </div>
            </div>
          </div>

          {/* Bottom '+' Marks Row (5 marks spread evenly across card width) */}
          <div ref={marksBottomRef} className="who-marks who-marks-bottom">
            <span>+</span>
            <span>+</span>
            <span>+</span>
            <span>+</span>
            <span>+</span>
          </div>

          {/* 2-Column Grid Inside Stage */}
          <div className="who-grid">
            {/* Left Slot: Empty placeholder defining start position S */}
            <div ref={slotRef} className="who-slot" />

            {/* Right: Bio Text and Badges */}
            <div ref={textRef} className="who-text text-left space-y-6">
              {/* Tagline */}
              <div className="flex items-center gap-2">
                <span className="text-cyan-400 font-mono text-xs sm:text-sm tracking-widest font-semibold uppercase">
                  {'// ORIGIN STORY'}
                </span>
              </div>

              {/* Main Headline */}
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
                Who is{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-cyan-400 to-[#A855F7]">
                  Orjo?
                </span>
              </h2>

              {/* Bio Paragraphs */}
              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  I'm <strong className="text-white font-bold">Orjo Das Utshab</strong>, a passionate{' '}
                  <span className="text-cyan-400 underline decoration-cyan-400/50 underline-offset-4 font-medium">
                    Diploma Trainee in Computer Engineering
                  </span>{' '}
                  at BSPI.
                </p>

                <p>
                  My journey is fueled by a curiosity for how{' '}
                  <strong className="text-white font-bold">Digital Systems</strong> and{' '}
                  <strong className="text-white font-bold">Marketing Strategies</strong> evolve. I specialize in building high-performance web solutions and crafting marketing hooks that convert.
                </p>

                <p>
                  As a member of{' '}
                  <strong className="text-purple-400 font-bold">BSPICC</strong>, I thrive in environments that challenge my technical and creative boundaries.
                </p>
              </div>

              {/* 5 Tag Badges */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                <span className="px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-white/10 text-xs text-slate-300 flex items-center gap-1.5 backdrop-blur-md hover:border-pink-500/40 hover:text-white transition-all">
                  <span className="text-pink-400">📍</span> Bangladesh
                </span>

                <span className="px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-white/10 text-xs text-slate-300 flex items-center gap-1.5 backdrop-blur-md hover:border-cyan-500/40 hover:text-white transition-all">
                  <span className="text-cyan-400">🎓</span> Diploma • Comp. Eng.
                </span>

                <span className="px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-white/10 text-xs text-slate-300 flex items-center gap-1.5 backdrop-blur-md hover:border-purple-500/40 hover:text-white transition-all">
                  <span className="text-purple-400">🏛</span> BSPICC Member
                </span>

                <span className="px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-white/10 text-xs text-slate-300 flex items-center gap-1.5 backdrop-blur-md hover:border-amber-500/40 hover:text-white transition-all">
                  <span className="text-amber-400">💡</span> Web & Marketing
                </span>

                <span className="px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-white/10 text-xs text-slate-300 flex items-center gap-1.5 backdrop-blur-md hover:border-cyan-400/40 hover:text-white transition-all">
                  <span className="text-slate-400 text-[10px]">◽</span> Lifelong Learner
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. DRIVEN BY CODE & 4 COUNTER METRICS SECTION            */}
      {/* ======================================================== */}
      <section className="py-20 sm:py-24 relative z-10 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Subtle Section Divider */}
          <div className="relative flex items-center justify-center">
            <div className="w-full border-t border-white/10" />
            <div className="absolute px-4 bg-[#0B0B0D] text-[10px] font-mono uppercase tracking-widest text-slate-500">
              PERFORMANCE & METRICS
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Driven by Code & Performance Main Card with Animated Gradient Aura */}
            <div className="relative rounded-3xl p-[1.5px] overflow-hidden bg-gradient-to-r from-cyan-500/30 via-purple-500/40 to-emerald-500/30 shadow-[0_10px_40px_rgba(6,182,212,0.12)] group hover:shadow-[0_15px_50px_rgba(6,182,212,0.22)] transition-all duration-500">
              <div className="bg-slate-900/90 rounded-[22px] p-6 sm:p-8 lg:p-10 backdrop-blur-xl space-y-6 relative overflow-hidden">
                {/* Animated Ambient Light Orbs */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-bl from-purple-500/25 via-cyan-500/15 to-transparent rounded-full blur-3xl pointer-events-none"
                />
                <motion.div
                  animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.25, 0.1] }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-20 -left-20 w-72 h-72 bg-gradient-to-tr from-emerald-500/20 via-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none"
                />

                {/* Card Header with Animated CPU badge and High Efficiency beacon */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4 relative z-10">
                  <h3 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
                    <motion.div
                      animate={{ y: [0, -3, 0], rotate: [0, 3, -3, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                      whileHover={{ scale: 1.15, rotate: 180 }}
                      className="w-11 h-11 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.3)] cursor-pointer"
                    >
                      <Cpu className="w-5 h-5 text-purple-400" />
                    </motion.div>
                    <span>Driven by Code & Performance</span>
                  </h3>

                  <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold self-start sm:self-auto flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.25)] backdrop-blur-md">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    HIGH EFFICIENCY
                  </span>
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-4xl relative z-10">
                  Over the past 5+ years, I have architected and deployed over 120 web platforms across various industries including FinTech, Telemedicine, Cloud Analytics, and eCommerce. I take pride in combining pristine visual design with robust cloud server logic.
                </p>

                {/* 4 Feature Badges with Staggered Entrance & Interactive Hover Glow */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2 relative z-10">
                  {[
                    { text: 'Clean Code & Modular Architecture', delay: 0 },
                    { text: 'High Concurrency & Low Latency', delay: 0.08 },
                    { text: 'Google PageSpeed 95+ Score', delay: 0.16 },
                    { text: '24/7 Server Uptime & Support', delay: 0.24 },
                  ].map((badge) => (
                    <motion.div
                      key={badge.text}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: badge.delay }}
                      whileHover={{ scale: 1.03, y: -2 }}
                      className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-950/80 border border-white/10 text-xs text-slate-200 hover:border-emerald-400/50 hover:bg-slate-900/90 hover:shadow-[0_4px_20px_rgba(16,185,129,0.18)] transition-all cursor-default group/pill"
                    >
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.25 }}
                        transition={{ duration: 0.4 }}
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 group-hover/pill:text-emerald-300" />
                      </motion.div>
                      <span className="font-medium">{badge.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* 4 Counter Metric Cards with Animated Count-up, Spring Hover & Floating Icons */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* Counter 1: Experience */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 }}
                whileHover={{ y: -8, scale: 1.03 }}
                className="relative bg-slate-900/90 border border-purple-500/25 rounded-2xl p-5 sm:p-6 text-center space-y-2.5 hover:border-purple-400/70 hover:shadow-[0_12px_35px_rgba(168,85,247,0.25)] transition-all group backdrop-blur-xl overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  whileHover={{ rotate: 20, scale: 1.2 }}
                >
                  <Briefcase className="w-7 h-7 text-purple-400 mx-auto transition-transform" />
                </motion.div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
                  <CountUpNumber target={PERSONAL_INFO.stats.yearsExperience} suffix="+" duration={1600} />
                </div>
                <div className="text-xs sm:text-sm text-slate-400 uppercase tracking-wider font-mono font-medium">
                  Years Experience
                </div>
              </motion.div>

              {/* Counter 2: Projects */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.12 }}
                whileHover={{ y: -8, scale: 1.03 }}
                className="relative bg-slate-900/90 border border-cyan-500/25 rounded-2xl p-5 sm:p-6 text-center space-y-2.5 hover:border-cyan-400/70 hover:shadow-[0_12px_35px_rgba(6,182,212,0.25)] transition-all group backdrop-blur-xl overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
                  whileHover={{ rotate: 20, scale: 1.2 }}
                >
                  <Award className="w-7 h-7 text-cyan-400 mx-auto transition-transform" />
                </motion.div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
                  <CountUpNumber target={PERSONAL_INFO.stats.completedProjects} suffix="+" duration={1800} />
                </div>
                <div className="text-xs sm:text-sm text-slate-400 uppercase tracking-wider font-mono font-medium">
                  Projects Done
                </div>
              </motion.div>

              {/* Counter 3: Happy Clients */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.19 }}
                whileHover={{ y: -8, scale: 1.03 }}
                className="relative bg-slate-900/90 border border-emerald-500/25 rounded-2xl p-5 sm:p-6 text-center space-y-2.5 hover:border-emerald-400/70 hover:shadow-[0_12px_35px_rgba(16,185,129,0.25)] transition-all group backdrop-blur-xl overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                  whileHover={{ rotate: 20, scale: 1.2 }}
                >
                  <Users className="w-7 h-7 text-emerald-400 mx-auto transition-transform" />
                </motion.div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
                  <CountUpNumber target={PERSONAL_INFO.stats.happyClients} suffix="+" duration={1800} />
                </div>
                <div className="text-xs sm:text-sm text-slate-400 uppercase tracking-wider font-mono font-medium">
                  Happy Clients
                </div>
              </motion.div>

              {/* Counter 4: Cups of Coffee 😄 */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.26 }}
                whileHover={{ y: -8, scale: 1.03 }}
                className="relative bg-slate-900/90 border border-yellow-500/25 rounded-2xl p-5 sm:p-6 text-center space-y-2.5 hover:border-yellow-400/70 hover:shadow-[0_12px_35px_rgba(245,158,11,0.25)] transition-all group backdrop-blur-xl overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                  whileHover={{ rotate: 20, scale: 1.2 }}
                >
                  <Coffee className="w-7 h-7 text-yellow-400 mx-auto transition-transform" />
                </motion.div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
                  <CountUpNumber target={PERSONAL_INFO.stats.coffeeCups} suffix="+" duration={2000} />
                </div>
                <div className="text-xs sm:text-sm text-slate-400 uppercase tracking-wider font-mono font-medium">
                  Cups of Coffee 😄
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};
