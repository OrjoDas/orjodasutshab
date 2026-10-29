import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(CustomEase);

interface CyberBootLoaderProps {
  onComplete: () => void;
}

export const CyberBootLoader: React.FC<CyberBootLoaderProps> = ({ onComplete }) => {
  const [isComplete, setIsComplete] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const logoWordmarkRef = useRef<HTMLDivElement>(null);
  const oRingRef = useRef<HTMLDivElement>(null);
  const rjoWrapperRef = useRef<HTMLDivElement>(null);
  const innerBlackDiscRef = useRef<HTMLDivElement>(null);
  const innerBlurRef = useRef<HTMLDivElement>(null);

  const hasCompletedRef = useRef(false);

  // Lock body scrolling while intro overlay is active, restore on finish
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const zoomCurve = CustomEase.create('zoomCurve', '0.7, 0, 0.2, 1');

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (!hasCompletedRef.current) {
            hasCompletedRef.current = true;
            setIsComplete(true);
            document.body.style.overflow = '';
            onComplete();
          }
        },
      });

      if (prefersReducedMotion) {
        // Reduced motion alternative: gentle fade-in and smooth dissolve
        tl.fromTo(
          logoWordmarkRef.current,
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 0.6, ease: 'power1.out' }
        )
          .to(logoWordmarkRef.current, { opacity: 0, duration: 0.35, ease: 'power1.in' }, 0.9)
          .to(overlayRef.current, { opacity: 0, duration: 0.45, ease: 'power1.out' }, 1.05);
      } else {
        // Measure dynamic width of the RJO letters to calculate exact centering shift
        const rjoWidth = rjoWrapperRef.current ? rjoWrapperRef.current.offsetWidth : 130;
        const centerShift = rjoWidth / 2;

        // --- STEP 1: INITIAL STATE (Pure black screen, centered ORJO logo) ---
        gsap.set(logoWordmarkRef.current, {
          opacity: 0,
          scale: 0.95,
        });

        gsap.set(oRingRef.current, {
          x: 0,
          scale: 1,
          opacity: 1,
        });

        gsap.set(rjoWrapperRef.current, {
          x: 0,
          opacity: 1,
        });

        // The inner hole starts completely opaque black during the initial logo display
        gsap.set(innerBlackDiscRef.current, {
          opacity: 1,
        });

        // The blur filter starts with initial backdrop-blur
        gsap.set(innerBlurRef.current, {
          opacity: 0,
        });

        // 1. Logo fades in cleanly and prominently in the center
        tl.to(
          logoWordmarkRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: 'power3.out',
          },
          0.1
        );

        // --- STEP 2: ORJO TRANSFORMS INTO O ---
        // Brief pause on the full wordmark (0.7s to 1.15s), then smooth morph into single O
        // RJO letters slide smoothly inward and dissolve with a soft blur
        tl.to(
          rjoWrapperRef.current,
          {
            x: -35,
            opacity: 0,
            scale: 0.85,
            filter: 'blur(5px)',
            duration: 0.7,
            ease: 'power3.inOut',
          },
          1.15
        );

        // The initial O letter glides to the exact dead-center of the screen
        tl.to(
          oRingRef.current,
          {
            x: centerShift,
            duration: 0.7,
            ease: 'power3.inOut',
          },
          1.15
        );

        // As the O reaches the center, reveal the soft blurred homepage through the circular hole
        tl.to(
          innerBlackDiscRef.current,
          {
            opacity: 0,
            duration: 0.35,
            ease: 'power2.out',
          },
          1.65
        );

        tl.to(
          innerBlurRef.current,
          {
            opacity: 1,
            duration: 0.35,
            ease: 'power2.out',
          },
          1.65
        );

        // --- STEP 3 & 4: ZOOM INTO THE O & BLURRED-TO-SHARP HOMEPAGE REVEAL ---
        // Smoothly zoom dramatically into the circular hole of the O
        tl.to(
          oRingRef.current,
          {
            scale: 44, // Zooms until the inner hole expands beyond the entire viewport
            duration: 1.45,
            ease: zoomCurve,
          },
          1.85
        );

        // Gradually reduce the blur inside the circular hole so the real homepage becomes progressively sharper
        const blurState = { blur: 16 };
        tl.to(
          blurState,
          {
            blur: 0,
            duration: 1.35,
            ease: 'power2.inOut',
            onUpdate: () => {
              if (innerBlurRef.current) {
                const b = Math.max(0, blurState.blur);
                innerBlurRef.current.style.backdropFilter = `blur(${b}px)`;
                (innerBlurRef.current.style as any).webkitBackdropFilter = `blur(${b}px)`;
              }
            },
          },
          1.85
        );

        // --- STEP 5: SEAMLESS FINAL REVEAL ---
        // As the O expands beyond the screen edges, naturally fade out the white outline
        tl.to(
          oRingRef.current,
          {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.out',
          },
          2.95
        );

        // Fade out the entire overlay container right as the zoom clears the screen
        tl.to(
          overlayRef.current,
          {
            opacity: 0,
            duration: 0.15,
            ease: 'power1.out',
          },
          3.2
        );
      }
    }, overlayRef);

    // Hard fallback safety timer ensuring the website is never blocked
    const fallbackTimer = setTimeout(() => {
      if (!hasCompletedRef.current) {
        hasCompletedRef.current = true;
        setIsComplete(true);
        document.body.style.overflow = '';
        onComplete();
      }
    }, 4200);

    return () => {
      clearTimeout(fallbackTimer);
      ctx.revert();
    };
  }, [onComplete]);

  if (isComplete) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] select-none pointer-events-auto flex items-center justify-center overflow-hidden"
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      {/* Centered Logo Wordmark Wrapper */}
      <div
        ref={logoWordmarkRef}
        className="relative flex items-center justify-center select-none font-sans pointer-events-none"
        style={{ willChange: 'transform, opacity' }}
      >
        {/* The Letter "O" (Aperture Ring with Black Box-Shadow Field & Circular Inner Hole) */}
        <div
          ref={oRingRef}
          className="relative flex items-center justify-center shrink-0 w-[72px] h-[72px] sm:w-[96px] sm:h-[96px] rounded-full border-[14px] sm:border-[18px] border-[#FFFFFF] bg-transparent"
          style={{
            // 100vmax box-shadow creates the seamless black screen everywhere outside the O
            boxShadow: '0 0 0 120vmax #000000',
            transformOrigin: '50% 50%',
            willChange: 'transform, opacity',
          }}
        >
          {/* Inner Black Disc (Hides the homepage behind the hole during Step 1) */}
          <div
            ref={innerBlackDiscRef}
            className="absolute inset-0 rounded-full bg-[#000000]"
            style={{ willChange: 'opacity' }}
          />

          {/* Inner Blur Layer (Blurs the real homepage seen through the hole, animating from blur(16px) to blur(0px)) */}
          <div
            ref={innerBlurRef}
            className="absolute inset-0 rounded-full pointer-events-none overflow-hidden"
            style={{
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              willChange: 'backdrop-filter, opacity',
            }}
          />
        </div>

        {/* The Remaining Letters: "RJO" (Morphs smoothly into the O during Step 2) */}
        <div
          ref={rjoWrapperRef}
          className="flex items-center font-black tracking-tight text-[#FFFFFF] uppercase text-[68px] sm:text-[92px] leading-none ml-1.5 sm:ml-2 overflow-visible"
          style={{
            height: '96px',
            transformOrigin: 'left center',
            willChange: 'transform, opacity, filter',
          }}
        >
          <span>R</span>
          <span>J</span>
          <span>O</span>
        </div>
      </div>
    </div>
  );
};

export const LusionLoader = CyberBootLoader;
