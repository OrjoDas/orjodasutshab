import React, { useEffect, useRef, useState } from 'react';

export interface CaseStudyMedia {
  type: 'img' | 'video';
  src: string;
  w: number; // width in vw (40 - 70)
}

export interface CaseStudyProject {
  slug: string;
  name: string;
  bg: string;
  accent: string;
  ink: string;
  tags: string;
  description: string;
  services: string[];
  links: { label: string; href: string }[];
  launchUrl: string;
  media: CaseStudyMedia[];
}

export const CASE_STUDY_PROJECTS: CaseStudyProject[] = [
  {
    slug: 'oryzo-ai',
    name: 'Oryzo AI',
    bg: '#1a1210',
    accent: '#d9460f',
    ink: '#fbf0d9',
    tags: 'AI • Autonomous Agents • Cloud Engine',
    description:
      '<p>A real-time generative intelligence workspace orchestrating multi-agent systems for high-scale enterprise engineering teams.</p><p>Featuring low-latency token streaming, zero-overhead WebAssembly pipelines, and automated CI/CD code auditing with <a href="https://example.com" target="_blank" rel="noopener noreferrer">deep neural reasoning</a>.</p>',
    services: ['AI Agent Architecture', 'Real-Time Streaming Systems', 'Next.js & WebGL UI', 'Serverless Cloud Infrastructure'],
    links: [
      { label: 'GitHub Repository', href: 'https://github.com/orjodasutshab' },
      { label: 'Design System & Figma', href: 'https://figma.com' },
      { label: 'Technical Documentation', href: 'https://example.com' },
    ],
    launchUrl: 'https://oryzo.ai.example.com',
    media: [
      { type: 'img', src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1400&q=80', w: 58 },
      { type: 'img', src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80', w: 52 },
      { type: 'img', src: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1400&q=80', w: 64 },
    ],
  },
  {
    slug: 'atlas-motion',
    name: 'Atlas Motion',
    bg: '#161616',
    accent: '#e8408a',
    ink: '#fffbd9',
    tags: '3D WebGL • Kinetic Typography • Interaction',
    description:
      '<p>An award-winning interactive 3D physics showcase designed to push browser rendering beyond conventional boundaries.</p><p>Powered by custom WebGL fragment shaders, continuous touch-responsive inertia, and buttery-smooth <a href="https://example.com" target="_blank" rel="noopener noreferrer">quaternion camera kinematics</a>.</p>',
    services: ['Three.js & GLSL Shaders', 'Kinetic Web Experience', 'Interactive Sound FX', 'GPU Performance Optimization'],
    links: [
      { label: 'Live Demonstration', href: 'https://atlasmotion.example.com' },
      { label: 'Open Source Shaders', href: 'https://github.com/orjodasutshab' },
      { label: 'Case Study on Awwwards', href: 'https://awwwards.com' },
    ],
    launchUrl: 'https://atlasmotion.example.com',
    media: [
      { type: 'img', src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80', w: 60 },
      { type: 'img', src: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=1400&q=80', w: 50 },
      { type: 'img', src: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=1400&q=80', w: 62 },
    ],
  },
  {
    slug: 'cloudscale-saas',
    name: 'CloudScale',
    bg: '#0d141e',
    accent: '#00d2ff',
    ink: '#e8f7ff',
    tags: 'Full Stack • Microservices • Real-Time Metrics',
    description:
      '<p>Real-time distributed telemetry engine monitoring server latency, database query times, and traffic surges across multi-region cloud clusters.</p><p>Built with enterprise security, sub-50ms WebSocket feeds, and instant incident triage dashboards.</p>',
    services: ['Distributed Telemetry', 'Sub-50ms WebSocket Mesh', 'Next.js App Router', 'PostgreSQL Timeseries Engine'],
    links: [
      { label: 'GitHub Repository', href: 'https://github.com/orjodasutshab' },
      { label: 'Live Sandbox', href: 'https://cloudscale-demo.example.com' },
    ],
    launchUrl: 'https://cloudscale-demo.example.com',
    media: [
      { type: 'img', src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80', w: 62 },
      { type: 'img', src: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1400&q=80', w: 52 },
    ],
  },
  {
    slug: 'ai-code-auditor',
    name: 'DevGuard AI',
    bg: '#12131a',
    accent: '#7c3aed',
    ink: '#f3e8ff',
    tags: 'AI & Cloud • Gemini API • Security Scanner',
    description:
      '<p>Automated static vulnerability detection and architectural refactoring engine powered by Google Gemini API.</p><p>Scanning entire codebases in seconds to generate unit tests, identify OWASP Top 10 flaws, and propose clean PR fixes.</p>',
    services: ['Gemini LLM Integration', 'Docker Container Sandbox', 'Automated AST Parsing', 'Developer Workflow Automation'],
    links: [
      { label: 'GitHub Repository', href: 'https://github.com/orjodasutshab' },
      { label: 'Live Demo', href: 'https://devguard-ai.example.com' },
    ],
    launchUrl: 'https://devguard-ai.example.com',
    media: [
      { type: 'img', src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1400&q=80', w: 60 },
      { type: 'img', src: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1400&q=80', w: 54 },
    ],
  },
];

export const CaseStudyOverlay: React.FC = () => {
  const [activeProject, setActiveProject] = useState<CaseStudyProject | null>(null);
  const [nextProject, setNextProject] = useState<CaseStudyProject | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const spacerRef = useRef<HTMLDivElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);
  const nextBlockRef = useRef<HTMLDivElement | null>(null);
  const lastActiveCardRef = useRef<HTMLElement | null>(null);
  const savedScrollYRef = useRef<number>(0);
  const isTransitioningRef = useRef<boolean>(false);

  // Close Case Study
  const handleClose = () => {
    if (isTransitioningRef.current || !isOpen) return;
    isTransitioningRef.current = true;

    setIsOpen(false);

    // Reset document title & URL
    document.title = 'Orjo Das Utshab — Senior Full Stack Developer & 3D Web Architect';
    if (window.location.hash.startsWith('#/projects/')) {
      window.history.pushState(null, '', window.location.pathname);
    }

    // Unlock body scroll
    document.body.style.overflow = '';
    window.scrollTo({ top: savedScrollYRef.current, behavior: 'instant' });

    // Return focus to last clicked card
    setTimeout(() => {
      lastActiveCardRef.current?.focus();
      setActiveProject(null);
      isTransitioningRef.current = false;
    }, 500);
  };

  // Open Case Study for a project slug
  const handleOpen = (slug: string, sourceCard?: HTMLElement) => {
    if (isTransitioningRef.current) return;
    const project =
      CASE_STUDY_PROJECTS.find((p) => p.slug === slug) ||
      CASE_STUDY_PROJECTS[0];

    const projectIndex = CASE_STUDY_PROJECTS.findIndex((p) => p.slug === project.slug);
    const next = CASE_STUDY_PROJECTS[(projectIndex + 1) % CASE_STUDY_PROJECTS.length];

    isTransitioningRef.current = true;
    lastActiveCardRef.current = sourceCard || document.querySelector(`[data-slug="${slug}"]`);

    savedScrollYRef.current = window.scrollY || window.pageYOffset;
    document.body.style.overflow = 'hidden';

    // FLIP Clone Animation
    const mediaEl = lastActiveCardRef.current?.querySelector('.p-media');
    const imgEl = lastActiveCardRef.current?.querySelector('img.bg') as HTMLImageElement | null;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (mediaEl && imgEl && !prefersReduced) {
      const rect = mediaEl.getBoundingClientRect();
      const clone = document.createElement('div');
      clone.className = 'case-clone-transition';
      clone.style.position = 'fixed';
      clone.style.top = `${rect.top}px`;
      clone.style.left = `${rect.left}px`;
      clone.style.width = `${rect.width}px`;
      clone.style.height = `${rect.height}px`;
      clone.style.borderRadius = '22px';
      clone.style.zIndex = '1000';
      clone.style.overflow = 'hidden';
      clone.style.pointerEvents = 'none';

      const cloneImg = document.createElement('img');
      cloneImg.src = imgEl.src;
      cloneImg.style.width = '100%';
      cloneImg.style.height = '100%';
      cloneImg.style.objectFit = 'cover';
      cloneImg.style.transition = 'transform 1000ms cubic-bezier(.7,0,.2,1), filter 1000ms cubic-bezier(.7,0,.2,1)';
      clone.appendChild(cloneImg);
      document.body.appendChild(clone);

      // Trigger FLIP to full screen
      requestAnimationFrame(() => {
        clone.style.transition = 'top 1000ms cubic-bezier(.7,0,.2,1), left 1000ms cubic-bezier(.7,0,.2,1), width 1000ms cubic-bezier(.7,0,.2,1), height 1000ms cubic-bezier(.7,0,.2,1), border-radius 1000ms cubic-bezier(.7,0,.2,1)';
        clone.style.top = '0px';
        clone.style.left = '0px';
        clone.style.width = '100vw';
        clone.style.height = '100vh';
        clone.style.borderRadius = '0px';

        // Blur & scale zoom effect during motion
        cloneImg.style.filter = 'blur(10px)';
        cloneImg.style.transform = 'scale(1.12)';

        setTimeout(() => {
          cloneImg.style.filter = 'blur(0px)';
        }, 600);
      });

      // Fade overlay in underneath clone at 1000ms
      setTimeout(() => {
        setActiveProject(project);
        setNextProject(next);
        setIsOpen(true);
        setScrollProgress(0);

        // Fade clone out over 400ms
        clone.style.transition = 'opacity 400ms ease';
        clone.style.opacity = '0';
        setTimeout(() => {
          clone.remove();
          isTransitioningRef.current = false;
        }, 400);
      }, 1000);
    } else {
      // Reduced motion fallback
      setActiveProject(project);
      setNextProject(next);
      setIsOpen(true);
      setScrollProgress(0);
      isTransitioningRef.current = false;
    }

    // Update URL & Title
    window.history.pushState({ caseStudy: project.slug }, '', `#/projects/${project.slug}`);
    document.title = `${project.name} — Project Case Study`;
  };

  // Switch to Next Project smoothly
  const handleTransitionToNext = () => {
    if (!nextProject || isTransitioningRef.current) return;
    isTransitioningRef.current = true;

    const nextSlug = nextProject.slug;
    const nextData = nextProject;
    const nextIndex = CASE_STUDY_PROJECTS.findIndex((p) => p.slug === nextSlug);
    const futureNext = CASE_STUDY_PROJECTS[(nextIndex + 1) % CASE_STUDY_PROJECTS.length];

    // Expand next block to full viewport
    const nextEl = nextBlockRef.current;
    if (nextEl) {
      nextEl.classList.add('expanding');
    }

    setTimeout(() => {
      setActiveProject(nextData);
      setNextProject(futureNext);
      setScrollProgress(0);

      if (scrollerRef.current) {
        scrollerRef.current.scrollTop = 0;
      }
      if (trackRef.current) {
        trackRef.current.style.transform = 'translate3d(0px, 0, 0)';
      }

      if (nextEl) {
        nextEl.classList.remove('expanding');
      }

      window.history.pushState({ caseStudy: nextData.slug }, '', `#/projects/${nextData.slug}`);
      document.title = `${nextData.name} — Project Case Study`;
      isTransitioningRef.current = false;
    }, 700);
  };

  // Global Listeners for card clicks & hash navigation
  useEffect(() => {
    const handleOpenEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ slug: string; card?: HTMLElement }>;
      if (customEvent.detail && customEvent.detail.slug) {
        handleOpen(customEvent.detail.slug, customEvent.detail.card);
      }
    };

    window.addEventListener('open-case-study', handleOpenEvent);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    const handlePopState = () => {
      if (window.location.hash.startsWith('#/projects/')) {
        const slug = window.location.hash.replace('#/projects/', '');
        handleOpen(slug);
      } else if (isOpen) {
        handleClose();
      }
    };
    window.addEventListener('popstate', handlePopState);

    // Initial check for direct hash navigation
    if (window.location.hash.startsWith('#/projects/')) {
      const initialSlug = window.location.hash.replace('#/projects/', '');
      handleOpen(initialSlug);
    }

    return () => {
      window.removeEventListener('open-case-study', handleOpenEvent);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isOpen]);

  // Smooth Horizontal Track Movement Loop
  useEffect(() => {
    if (!isOpen || !activeProject) return;

    let targetX = 0;
    let currentX = 0;
    let rafId: number;

    const isMobile = window.innerWidth < 760;
    if (isMobile) return;

    const updateSpacer = () => {
      const track = trackRef.current;
      const spacer = spacerRef.current;
      if (!track || !spacer) return;

      const trackWidth = track.scrollWidth;
      const innerW = window.innerWidth;
      const innerH = window.innerHeight;
      const totalH = trackWidth - innerW + innerH;
      spacer.style.height = `${totalH}px`;
    };

    updateSpacer();
    window.addEventListener('resize', updateSpacer);

    const onScroll = () => {
      const scroller = scrollerRef.current;
      const spacer = spacerRef.current;
      const track = trackRef.current;
      if (!scroller || !spacer || !track) return;

      const scrollTop = scroller.scrollTop;
      const innerW = window.innerWidth;
      const innerH = window.innerHeight;
      const maxScroll = Math.max(1, spacer.offsetHeight - innerH);
      const progress = Math.max(0, Math.min(1, scrollTop / maxScroll));

      setScrollProgress(progress);
      targetX = -progress * (track.scrollWidth - innerW);

      // If at 100% and user keeps scrolling
      if (progress >= 0.999) {
        handleTransitionToNext();
      }
    };

    const scrollerEl = scrollerRef.current;
    if (scrollerEl) {
      scrollerEl.addEventListener('scroll', onScroll, { passive: true });
    }

    // Smooth Lerp loop (x += (target - x) * 0.08)
    const loop = () => {
      currentX += (targetX - currentX) * 0.08;
      const track = trackRef.current;
      if (track) {
        track.style.transform = `translate3d(${currentX.toFixed(2)}px, 0, 0)`;

        // Media Item Parallax
        const mediaItems = track.querySelectorAll('.case-media-box') as NodeListOf<HTMLElement>;
        const innerW = window.innerWidth;

        mediaItems.forEach((box) => {
          const rect = box.getBoundingClientRect();
          const itemCenterX = rect.left + rect.width / 2;
          const shiftX = (itemCenterX - innerW / 2) * -0.06;
          const innerMedia = box.querySelector('img, video') as HTMLElement | null;
          if (innerMedia) {
            innerMedia.style.transform = `scale(1.15) translateX(${shiftX.toFixed(2)}px)`;
          }
        });
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', updateSpacer);
      if (scrollerEl) {
        scrollerEl.removeEventListener('scroll', onScroll);
      }
    };
  }, [isOpen, activeProject, nextProject]);

  if (!activeProject) return null;

  return (
    <>
      <style>{`
        /* CASE STUDY OVERLAY */
        .case {
          position: fixed;
          inset: 0;
          z-index: 1050;
          background: ${activeProject.bg};
          color: #ffffff;
          opacity: 0;
          visibility: hidden;
          transition: opacity 500ms ease, visibility 500ms ease;
          overflow: hidden;
          font-family: inherit;
        }

        .case.is-open {
          opacity: 1;
          visibility: visible;
        }

        /* Subtle Noise Texture Overlay */
        .case-noise {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 0);
          background-size: 24px 24px;
          opacity: 0.04;
          pointer-events: none;
          z-index: 1;
        }

        /* Fixed Header Bar matching image_d9459cff.png */
        .case-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1100;
          padding: 24px 4vw;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          pointer-events: none;
          box-sizing: border-box;
        }

        .case-nav-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          pointer-events: auto;
        }

        /* The exact white BACK pill button matching image_d9459cff.png */
        .case-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          background: #ffffff;
          color: #000000;
          padding: 12px 26px;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 0.82rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
          transition: transform 300ms ease, box-shadow 300ms ease, background-color 300ms ease;
        }

        .case-back-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.35);
          background: #f4f4f6;
        }

        /* Round "-" Button */
        .case-circle-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #ffffff;
          color: #000000;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          transition: transform 300ms ease, background-color 300ms ease;
        }

        .case-circle-btn:hover {
          transform: translateY(-2px);
          background: #f4f4f6;
        }

        /* Dark LET'S TALK Button */
        .case-talk-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #1b1e2b;
          color: #ffffff;
          padding: 12px 24px;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 0.82rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          border: 1px solid rgba(255, 255, 255, 0.12);
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);
          transition: transform 300ms ease, background-color 300ms ease;
        }

        .case-talk-btn:hover {
          transform: translateY(-2px);
          background: #252a3d;
        }

        .case-dot-pulse {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #ffffff;
          display: inline-block;
        }

        /* White MENU Button */
        .case-menu-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #ffffff;
          color: #000000;
          padding: 12px 24px;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 0.82rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          transition: transform 300ms ease, background-color 300ms ease;
        }

        .case-menu-btn:hover {
          transform: translateY(-2px);
          background: #f4f4f6;
        }

        .case-dots {
          letter-spacing: -1.5px;
          font-size: 1rem;
          line-height: 1;
        }

        /* Vertical Scroller Engine */
        .case-scroller {
          position: absolute;
          inset: 0;
          overflow-y: auto;
          overflow-x: hidden;
          scrollbar-width: none;
          -ms-overflow-style: none;
          z-index: 2;
        }

        .case-scroller::-webkit-scrollbar {
          display: none;
        }

        .case-stage {
          position: sticky;
          top: 0;
          height: 100vh;
          width: 100%;
          overflow: hidden;
        }

        /* Horizontal Track */
        .case-track {
          display: flex;
          align-items: center;
          height: 100vh;
          width: max-content;
          will-change: transform;
        }

        /* 1. Intro Block (~52vw wide, 5vw left padding) */
        .case-intro {
          width: 52vw;
          min-width: 52vw;
          padding-left: 5vw;
          display: flex;
          gap: 4vw;
          align-items: flex-start;
          box-sizing: border-box;
          opacity: ${1 - Math.min(0.85, scrollProgress * 3.4)};
          transition: opacity 200ms ease;
        }

        .case-intro-left {
          width: 25vw;
          min-width: 25vw;
        }

        .case-intro-mid {
          width: 14vw;
          min-width: 14vw;
        }

        .case-title {
          font-size: clamp(2.6rem, 4.6vw, 5rem);
          font-weight: 400;
          line-height: 1;
          color: ${activeProject.ink};
          margin: 0 0 40px 0;
          letter-spacing: -0.04em;
        }

        .case-desc {
          font-size: clamp(0.72rem, 0.95vw, 0.9rem);
          line-height: 1.45;
          color: #ffffff;
          max-width: 300px;
          margin: 0;
        }

        .case-desc p {
          margin: 0 0 16px 0;
        }

        .case-desc a {
          color: ${activeProject.accent};
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .case-launch-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #f3f1ee;
          color: #0f1a33;
          padding: 16px 26px;
          border-radius: 999px;
          font-weight: 700;
          text-transform: uppercase;
          font-size: 0.85rem;
          letter-spacing: 0.05em;
          text-decoration: none;
          margin-top: 40px;
          transition: transform 300ms ease, background-color 300ms ease;
        }

        .case-launch-btn:hover {
          transform: translateY(-2px);
          background: #ffffff;
        }

        .case-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #0f1a33;
        }

        .case-meta-label {
          color: ${activeProject.accent};
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .case-meta-list {
          list-style: none;
          padding: 0;
          margin: 0;
          color: #ffffff;
          font-size: 0.8rem;
          line-height: 1.7;
        }

        .case-meta-list a {
          color: #ffffff;
          text-decoration: none;
          transition: color 200ms ease;
        }

        .case-meta-list a:hover {
          color: ${activeProject.accent};
        }

        /* 2. Media Showcase Items */
        .case-media-box {
          height: 64vh;
          border-radius: 16px;
          overflow: hidden;
          margin-right: 5vw;
          flex-shrink: 0;
          position: relative;
          background: #000000;
          clip-path: inset(0);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
        }

        .case-media-box img,
        .case-media-box video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1.15);
          will-change: transform;
        }

        /* 3. Next Project Block at Track End */
        .case-next-block {
          width: 55vw;
          min-width: 55vw;
          height: 100vh;
          background: #eef0fb;
          color: #0f1a33;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 8vh 5vw;
          box-sizing: border-box;
          cursor: pointer;
          overflow: hidden;
          transition: width 700ms cubic-bezier(.7,0,.2,1);
        }

        .case-next-block.expanding {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          z-index: 1200;
        }

        .case-next-ghost {
          font-size: clamp(4rem, 12vw, 13rem);
          font-weight: 900;
          line-height: 0.9;
          letter-spacing: -0.05em;
          color: rgba(15, 26, 51, 0.10);
          text-transform: uppercase;
          pointer-events: none;
          user-select: none;
        }

        .case-next-footer {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .case-next-label {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: ${activeProject.accent};
        }

        .case-next-line-track {
          width: 90px;
          height: 1px;
          background: rgba(15, 26, 51, 0.2);
          position: relative;
          overflow: hidden;
        }

        .case-next-line-fill {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          background: ${activeProject.accent};
          width: ${Math.max(0, Math.min(100, (scrollProgress - 0.92) / 0.08 * 100))}%;
          transition: width 100ms linear;
        }

        .case-explore-hint {
          position: fixed;
          bottom: 6vh;
          right: 5vw;
          z-index: 10;
          color: ${activeProject.accent};
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          pointer-events: none;
          opacity: ${scrollProgress > 0.05 ? 0 : 1};
          transition: opacity 300ms ease;
        }

        /* Mobile Screens Below 760px */
        @media (max-width: 760px) {
          .case-stage {
            position: relative;
            height: auto;
          }

          .case-track {
            flex-direction: column;
            width: 100%;
            height: auto;
            padding: 100px 6vw 60px;
            box-sizing: border-box;
            transform: none !important;
          }

          .case-intro {
            width: 100%;
            min-width: 100%;
            padding-left: 0;
            flex-direction: column;
            gap: 32px;
            opacity: 1 !important;
          }

          .case-intro-left,
          .case-intro-mid {
            width: 100%;
            min-width: 100%;
          }

          .case-media-box {
            width: 100% !important;
            height: 48vh;
            margin-right: 0;
            margin-bottom: 24px;
          }

          .case-next-block {
            width: 100% !important;
            min-width: 100% !important;
            height: 60vh;
            margin-top: 40px;
            border-radius: 20px;
          }
        }
      `}</style>

      <div className={`case ${isOpen ? 'is-open' : ''}`} role="dialog" aria-modal="true" aria-label={activeProject.name}>
        {/* Film-grain texture */}
        <div className="case-noise" />

        {/* Floating Top Navigation with ← BACK Button matching image_d9459cff.png */}
        <header className="case-nav">
          <div className="case-nav-actions">
            {/* White Pill: ← BACK Button */}
            <button
              className="case-back-btn"
              onClick={handleClose}
              aria-label="Back to projects"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              <span>BACK</span>
            </button>

            {/* Circular "-" Button */}
            <button
              className="case-circle-btn"
              aria-label="Toggle minimal mode"
              onClick={() => {
                const audioBtn = document.querySelector('[aria-label="Sound ambience toggle"]') as HTMLButtonElement | null;
                if (audioBtn) audioBtn.click();
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>

            {/* Dark Pill: LET'S TALK */}
            <button
              className="case-talk-btn"
              onClick={() => {
                handleClose();
                setTimeout(() => {
                  const contactEl = document.getElementById('contact');
                  if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
                }, 300);
              }}
            >
              <span>LET'S TALK</span>
              <span className="case-dot-pulse" />
            </button>

            {/* White Pill: MENU •• */}
            <button
              className="case-menu-btn"
              onClick={() => {
                handleClose();
                setTimeout(() => {
                  const menuToggle = document.querySelector('[data-menu-toggle="true"]') as HTMLButtonElement | null;
                  if (menuToggle) menuToggle.click();
                }, 300);
              }}
            >
              <span>MENU</span>
              <span className="case-dots">• •</span>
            </button>
          </div>
        </header>

        {/* Vertical Scroller moving horizontal track */}
        <div ref={scrollerRef} className="case-scroller">
          <div className="case-stage">
            <div ref={trackRef} className="case-track">
              {/* 1. Intro Panel */}
              <div ref={introRef} className="case-intro">
                <div className="case-intro-left">
                  <h1 className="case-title">{activeProject.name}</h1>
                  <div
                    className="case-desc"
                    dangerouslySetInnerHTML={{ __html: activeProject.description }}
                  />
                  <a
                    href={activeProject.launchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="case-launch-btn"
                  >
                    <span className="case-dot" />
                    <span>LAUNCH PROJECT</span>
                  </a>
                </div>

                <div className="case-intro-mid">
                  <div className="case-meta-label">SERVICES</div>
                  <ul className="case-meta-list">
                    {activeProject.services.map((svc) => (
                      <li key={svc}>{svc}</li>
                    ))}
                  </ul>

                  <div style={{ height: '36px' }} />

                  <div className="case-meta-label">LINKS</div>
                  <ul className="case-meta-list">
                    {activeProject.links.map((link) => (
                      <li key={link.label}>
                        <a href={link.href} target="_blank" rel="noopener noreferrer">
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 2. Media Showcase Elements */}
              {activeProject.media.map((item, idx) => (
                <div
                  key={idx}
                  className="case-media-box"
                  style={{ width: `${item.w}vw` }}
                >
                  {item.type === 'video' ? (
                    <video
                      src={item.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    <img
                      src={item.src}
                      alt={`${activeProject.name} showcase ${idx + 1}`}
                      loading="lazy"
                    />
                  )}
                </div>
              ))}

              {/* 3. Next Project Panel */}
              {nextProject && (
                <div
                  ref={nextBlockRef}
                  className="case-next-block"
                  onClick={handleTransitionToNext}
                  role="button"
                  tabIndex={0}
                  aria-label={`Next project: ${nextProject.name}`}
                >
                  <div className="case-next-ghost">{nextProject.name}</div>
                  <div className="case-next-footer">
                    <span className="case-next-label">NEXT PROJECT</span>
                    <div className="case-next-line-track">
                      <div className="case-next-line-fill" />
                    </div>
                    <span style={{ color: activeProject.accent, fontSize: '1.2rem' }}>→</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Spacer generating vertical scroll height equal to horizontal track */}
          <div ref={spacerRef} />
        </div>

        {/* Scroll hint in bottom right */}
        <div className="case-explore-hint">SCROLL TO EXPLORE »</div>
      </div>
    </>
  );
};
