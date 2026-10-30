import React, { useEffect, useRef, useState } from 'react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { ProjectItem } from '../types';
import { ProjectCaseStudyModal } from './ProjectCaseStudyModal';

export const ProjectsSection: React.FC = () => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<ProjectItem | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const cards = root.querySelectorAll<HTMLElement>('.p-card');
    if (!cards.length) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. ENTRANCE: IntersectionObserver
    let observer: IntersectionObserver | null = null;
    if (!prefersReduced && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in');
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      cards.forEach((card) => observer?.observe(card));
    } else {
      cards.forEach((card) => card.classList.add('in'));
    }

    if (prefersReduced) return;

    // 2. SCROLL-VELOCITY WARP & 3. IMAGE PARALLAX
    let lastScrollY = window.scrollY || window.pageYOffset;
    let vel = 0;
    let rafId: number;

    const onFrame = () => {
      const currentScrollY = window.scrollY || window.pageYOffset;
      const dy = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      // clamp(dy, -70, 70)
      const clampedDy = Math.max(-70, Math.min(70, dy));
      vel += (clampedDy - vel) * 0.1;

      const viewportHeight = window.innerHeight;

      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();

        // Skip if far off-screen
        if (rect.bottom < -200 || rect.top > viewportHeight + 200) {
          return;
        }

        const media = card.querySelector('.p-media') as HTMLElement | null;
        const img = card.querySelector('img.bg') as HTMLImageElement | null;

        // side = +1 for even-index (left column) and -1 for odd-index (right column)
        const side = index % 2 === 0 ? 1 : -1;

        if (media) {
          media.style.transform = `perspective(900px) rotateX(${vel * -0.18}deg) rotateY(${vel * 0.14 * side}deg) skewY(${vel * 0.1 * side}deg)`;
          media.style.transformOrigin = '50% 50%';
        }

        if (img) {
          const cardCenterY = rect.top + rect.height / 2;
          const t = (cardCenterY - viewportHeight / 2) / viewportHeight;
          img.style.transform = `translateY(${t * -6}%)`;
        }
      });

      rafId = requestAnimationFrame(onFrame);
    };

    rafId = requestAnimationFrame(onFrame);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (observer) observer.disconnect();
    };
  }, []);

  const totalCount = String(PROJECTS_DATA.length).padStart(2, '0');

  return (
    <>
      <style>{`
        /* Scoped Projects Section Styles */
        .projects-section-wrap {
          max-width: 1500px;
          margin: 0 auto;
          padding: clamp(60px, 9vw, 120px) 3vw;
          box-sizing: border-box;
          position: relative;
          z-index: 10;
        }

        .projects-header-row {
          display: flex;
          justify-content: space-between;
          align-items: stretch;
          margin-bottom: clamp(40px, 6vw, 80px);
        }

        .projects-giant-title {
          margin: 0;
          font-weight: 400;
          line-height: .9;
          letter-spacing: -.045em;
          font-size: clamp(3rem, 15.5vw, 14rem);
          color: #ffffff;
          text-transform: uppercase;
        }

        .projects-meta-col {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-end;
          padding-bottom: clamp(10px, 1.5vw, 24px);
        }

        .projects-count-num {
          font-size: clamp(1.4rem, 3.4vw, 3rem);
          font-weight: 400;
          line-height: 1;
          color: #9a9cb5;
        }

        .projects-arrow-icon {
          width: clamp(28px, 4vw, 52px);
          height: clamp(28px, 4vw, 52px);
          color: #ffffff;
        }

        .projects-stagger-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(40px, 6vw, 90px) 2vw;
        }

        /* Even cards (right column, 2nd, 4th, 6th) staggered */
        .projects-stagger-grid .p-card:nth-child(2n) {
          margin-top: clamp(0px, 6vw, 90px);
        }

        @media (max-width: 760px) {
          .projects-stagger-grid {
            grid-template-columns: 1fr;
          }
          .projects-stagger-grid .p-card:nth-child(2n) {
            margin-top: 0;
          }
        }

        .p-card {
          display: block;
          text-decoration: none;
          color: inherit;
          cursor: pointer;
          opacity: 0;
          transform: translateY(70px);
          transition: opacity .8s ease, transform .9s cubic-bezier(.2, .7, .2, 1);
        }

        .p-card.in {
          opacity: 1;
          transform: none;
        }

        .p-media {
          position: relative;
          aspect-ratio: 16/11;
          border-radius: 22px;
          overflow: hidden;
          will-change: transform;
          background: #101426;
          transform-origin: 50% 50%;
        }

        .p-media img.bg {
          position: absolute;
          inset: -8% 0;
          width: 100%;
          height: 116%;
          object-fit: cover;
          display: block;
          will-change: transform;
        }

        .p-tags {
          font-size: .78rem;
          letter-spacing: .04em;
          color: #9a9cb5;
          margin: 18px 0 6px;
          text-transform: uppercase;
        }

        .p-title {
          display: flex;
          align-items: center;
          font-size: clamp(1.6rem, 3.2vw, 3rem);
          letter-spacing: -.03em;
          font-weight: 400;
          margin: 0;
          color: #ffffff;
        }

        .p-title .ar {
          display: inline-block;
          width: 0;
          opacity: 0;
          overflow: hidden;
          white-space: nowrap;
          transition: width .45s cubic-bezier(.2, .7, .2, 1), opacity .3s, margin .45s;
        }

        .p-card:hover .p-title .ar,
        .p-card:focus-visible .p-title .ar {
          width: 1.1em;
          opacity: 1;
          margin-right: .35em;
        }

        @media (prefers-reduced-motion: reduce) {
          .p-card {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
          .p-media,
          .p-media img.bg,
          .p-title .ar {
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>

      <section
        id="projects"
        ref={sectionRef}
        className="projects projects-section-wrap"
      >
        {/* Header row */}
        <div className="projects-header-row">
          <h2 className="projects-giant-title">PROJECTS</h2>
          <div className="projects-meta-col">
            <span className="projects-count-num">{totalCount}</span>
            <svg
              className="projects-arrow-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="7" y1="7" x2="17" y2="17" />
              <polyline points="7 17 17 17 17 7" />
            </svg>
          </div>
        </div>

        {/* Staggered Grid */}
        <div className="projects-stagger-grid">
          {PROJECTS_DATA.map((project) => {
            const formattedTags = project.tags && project.tags.length > 0
              ? project.tags.slice(0, 3).join(' • ')
              : 'Web • Architecture • Design';

            return (
              <a
                key={project.id}
                href={`#/projects/${project.id}`}
                data-slug={project.id}
                onClick={(e) => {
                  // Let the Case Study engine or case study modal handle it
                  const slug = project.id;
                  const event = new CustomEvent('open-case-study', { detail: { slug, card: e.currentTarget } });
                  window.dispatchEvent(event);
                }}
                className="p-card"
                aria-label={`View case study for ${project.title}`}
              >
                <div className="p-media">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="bg"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>
                <div className="p-tags">{formattedTags}</div>
                <h3 className="p-title">
                  <span className="ar">→</span>
                  <span>{project.title}</span>
                </h3>
              </a>
            );
          })}
        </div>
      </section>

      {/* Case Study Modal */}
      <ProjectCaseStudyModal
        project={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
      />
    </>
  );
};
