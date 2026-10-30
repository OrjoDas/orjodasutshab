import React, { useEffect, useRef } from 'react';

export const CtaSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trailCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const pileCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const trailCanvas = trailCanvasRef.current;
    const pileCanvas = pileCanvasRef.current;
    const heading = headingRef.current;
    if (!section || !trailCanvas || !pileCanvas || !heading) return;

    // NAMED TUNABLE CONSTANTS
    const SHAPE_DENSITY = 6.2; // W / SHAPE_DENSITY for dense pile
    const GRAVITY = 0.55; // px/frame²
    const RESTITUTION = 0.25; // bounce factor
    const AIR_DAMPING = 0.995;
    const FRICTION = 0.9;
    const ANGULAR_DAMPING = 0.98;
    const PUSH_RADIUS = 130; // px
    const PUSH_FORCE = 2.4;
    const JUMP_RADIUS = 90; // px
    const JUMP_AMOUNT = 0.35; // em

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Split Heading into lines and letters
    const lines = heading.querySelectorAll<HTMLSpanElement>('.cta-line');
    interface LetterItem {
      el: HTMLSpanElement;
      currentY: number;
      targetY: number;
      currentRot: number;
      targetRot: number;
      sign: number;
    }
    const letters: LetterItem[] = [];

    lines.forEach((line) => {
      const text = line.getAttribute('data-text') || line.textContent || '';
      line.innerHTML = '';
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const span = document.createElement('span');
        span.className = 'ch';
        span.setAttribute('aria-hidden', 'true');
        span.textContent = char === ' ' ? '\u00A0' : char;
        line.appendChild(span);

        letters.push({
          el: span,
          currentY: 0,
          targetY: 0,
          currentRot: 0,
          targetRot: 0,
          sign: Math.random() < 0.5 ? -1 : 1,
        });
      }

      // Dynamic Underline element
      const bar = document.createElement('span');
      bar.className = 'cta-underline';
      bar.setAttribute('aria-hidden', 'true');
      line.appendChild(bar);
    });

    // Device Pixel Ratio capped at 2
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = section.clientWidth;
    let H = section.clientHeight;

    const trailCtx = trailCanvas.getContext('2d');
    const pileCtx = pileCanvas.getContext('2d');
    if (!trailCtx || !pileCtx) return;

    function resizeCanvases() {
      if (!section || !trailCanvas || !pileCanvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = section.clientWidth;
      H = section.clientHeight;

      trailCanvas.width = Math.round(W * dpr);
      trailCanvas.height = Math.round(H * dpr);
      pileCanvas.width = Math.round(W * dpr);
      pileCanvas.height = Math.round(H * dpr);

      trailCtx?.resetTransform?.();
      trailCtx?.scale(dpr, dpr);
      pileCtx?.resetTransform?.();
      pileCtx?.scale(dpr, dpr);

      if (trailCtx) {
        trailCtx.fillStyle = '#f1f3fa';
        trailCtx.fillRect(0, 0, W, H);
      }
    }
    resizeCanvases();

    // SHAPES SETUP
    type ShapeType = 'circle' | 'ring' | 'pentagon' | 'bowtie' | 'capsule' | 'triangle' | 'bar';
    const shapeTypes: ShapeType[] = ['circle', 'ring', 'pentagon', 'bowtie', 'capsule', 'triangle', 'bar'];

    // Weighted Color Palette matching screenshot
    const palette = [
      // 30% near-black / charcoal
      '#181920', '#181920', '#181920', '#22242e', '#22242e', '#181920',
      // 30% muted blue-grey
      '#6e7f90', '#7a8c9e', '#647686', '#6e7f90', '#7a8c9e', '#647686',
      // 25% pale ice blue-grey
      '#dbe4ec', '#dbe4ec', '#cddae5', '#d4e0eb', '#e2eaf1',
      // 15% vibrant pops
      '#0026ff', // Electric Blue
      '#ff2a3b', // Bright Red
      '#00ff59', // Neon Green
      '#aa00ff', // Vivid Purple
      '#d5ff10', // Lime Yellow
    ];

    interface Shape {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      type: ShapeType;
      color: string;
      rot: number;
      vRot: number;
    }

    let shapes: Shape[] = [];

    function initShapes() {
      const isMobile = W < 760;
      const count = Math.min(
        isMobile ? 160 : 320,
        Math.max(90, Math.round(W / SHAPE_DENSITY))
      );

      const scale = Math.max(0.75, Math.min(1.2, W / 1100));
      shapes = [];

      for (let i = 0; i < count; i++) {
        const r = (16 + Math.random() * 14) * scale;
        const type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
        const color = palette[Math.floor(Math.random() * palette.length)];

        // Initial distribution: place directly in the bottom 42% pile
        // so it matches image_32d01e7f.png immediately on screen
        const pileTop = H * 0.58;
        const spawnY = pileTop + Math.random() * (H - pileTop + 20);
        const spawnX = Math.random() * (W + 80) - 40;

        shapes.push({
          x: spawnX,
          y: spawnY,
          vx: (Math.random() - 0.5) * 0.5,
          vy: Math.random() * 0.5,
          r,
          type,
          color,
          rot: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.04,
        });
      }

      // Fast-forward physics 120 steps so pile settles into natural ball pit
      for (let step = 0; step < 120; step++) {
        updatePhysics(false);
      }
    }

    initShapes();

    // SHAPE DRAWING FUNCTION
    function drawShape(ctx: CanvasRenderingContext2D, s: Shape) {
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.rot);
      ctx.fillStyle = s.color;
      ctx.strokeStyle = s.color;

      const r = s.r;

      switch (s.type) {
        case 'circle': {
          ctx.beginPath();
          ctx.arc(0, 0, r, 0, Math.PI * 2);
          ctx.fill();
          break;
        }
        case 'ring': {
          ctx.beginPath();
          ctx.arc(0, 0, r * 0.85, 0, Math.PI * 2);
          ctx.lineWidth = r * 0.3;
          ctx.stroke();
          break;
        }
        case 'pentagon': {
          ctx.beginPath();
          for (let i = 0; i < 5; i++) {
            const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
            const px = Math.cos(angle) * r;
            const py = Math.sin(angle) * r;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.fill();
          break;
        }
        case 'bowtie': {
          ctx.beginPath();
          ctx.moveTo(-r, -r * 0.75);
          ctx.lineTo(r, -r * 0.75);
          ctx.lineTo(-r, r * 0.75);
          ctx.lineTo(r, r * 0.75);
          ctx.closePath();
          ctx.fill();
          break;
        }
        case 'capsule': {
          ctx.beginPath();
          ctx.ellipse(0, 0, r * 1.15, r * 0.65, 0, 0, Math.PI * 2);
          ctx.fill();
          break;
        }
        case 'triangle': {
          ctx.beginPath();
          ctx.moveTo(0, -r);
          ctx.lineTo(r * 0.95, r * 0.8);
          ctx.lineTo(-r * 0.95, r * 0.8);
          ctx.closePath();
          ctx.fill();
          break;
        }
        case 'bar': {
          const bw = r * 2.2;
          const bh = r * 0.55;
          const br = bh / 2;
          ctx.beginPath();
          if (ctx.roundRect) {
            ctx.roundRect(-bw / 2, -bh / 2, bw, bh, br);
          } else {
            ctx.rect(-bw / 2, -bh / 2, bw, bh);
          }
          ctx.fill();
          break;
        }
      }
      ctx.restore();
    }

    // POINTER TRACKING & TRAIL
    let pointerX = -9999;
    let pointerY = -9999;
    let lastPointerX = -9999;
    let lastPointerY = -9999;
    let pointerSpeed = 0;
    let hue = 200;

    function onPointerMove(e: PointerEvent | MouseEvent | TouchEvent) {
      if (prefersReducedMotion) return;
      const rect = section!.getBoundingClientRect();
      let clientX = 0;
      let clientY = 0;

      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }

      const x = clientX - rect.left;
      const y = clientY - rect.top;

      if (lastPointerX > -1000) {
        pointerSpeed = Math.min(40, Math.hypot(x - lastPointerX, y - lastPointerY));
      }

      lastPointerX = pointerX;
      lastPointerY = pointerY;
      pointerX = x;
      pointerY = y;

      // Soft Holographic / Iridescent Trail
      if (trailCtx) {
        hue = (hue + 1.2) % 360;
        const blobRadius = 120 + Math.random() * 100;
        const alpha = 0.10 + Math.random() * 0.08;

        const grad = trailCtx.createRadialGradient(x, y, 0, x, y, blobRadius);
        grad.addColorStop(0, `hsla(${hue}, 70%, 85%, ${alpha})`);
        grad.addColorStop(1, `hsla(${hue}, 70%, 85%, 0)`);

        trailCtx.save();
        trailCtx.globalCompositeOperation = 'source-over';
        trailCtx.fillStyle = grad;
        trailCtx.beginPath();
        trailCtx.arc(x, y, blobRadius, 0, Math.PI * 2);
        trailCtx.fill();
        trailCtx.restore();
      }

      // Mouse Push Impulse
      const pushSpeedBoost = pointerSpeed * 0.06;
      for (let i = 0; i < shapes.length; i++) {
        const s = shapes[i];
        const dx = s.x - pointerX;
        const dy = s.y - pointerY;
        const dist = Math.hypot(dx, dy);

        if (dist < PUSH_RADIUS && dist > 0.001) {
          const nx = dx / dist;
          const ny = dy / dist;
          const impulse = (1 - dist / PUSH_RADIUS) * PUSH_FORCE + pushSpeedBoost;

          s.vx += nx * impulse * 1.8;
          s.vy += ny * impulse * 1.8;
          s.vRot += (Math.random() - 0.5) * 0.25;
        }
      }

      // Heading Letter Jump Targets
      updateLetterTargets(clientX, clientY);
    }

    function onPointerLeave() {
      pointerX = -9999;
      pointerY = -9999;
      lastPointerX = -9999;
      lastPointerY = -9999;
      pointerSpeed = 0;

      letters.forEach((item) => {
        item.targetY = 0;
        item.targetRot = 0;
      });
    }

    function updateLetterTargets(clientX: number, clientY: number) {
      if (prefersReducedMotion) return;
      letters.forEach((item) => {
        const rect = item.el.getBoundingClientRect();
        const letterCenterX = rect.left + rect.width / 2;
        const letterCenterY = rect.top + rect.height / 2;
        const dist = Math.hypot(clientX - letterCenterX, clientY - letterCenterY);

        if (dist < JUMP_RADIUS) {
          const ratio = 1 - dist / JUMP_RADIUS;
          item.targetY = item.sign * ratio * JUMP_AMOUNT;
          item.targetRot = item.sign * ratio * 18;
        } else {
          item.targetY = 0;
          item.targetRot = 0;
        }
      });
    }

    section.addEventListener('pointermove', onPointerMove);
    section.addEventListener('touchmove', onPointerMove, { passive: true });
    section.addEventListener('pointerleave', onPointerLeave);

    lines.forEach((line) => {
      line.addEventListener('pointerenter', () => line.classList.add('hovered'));
      line.addEventListener('pointerleave', () => line.classList.remove('hovered'));
    });

    // PHYSICS SOLVER
    function updatePhysics(allowVelDamping: boolean = true) {
      const floor = H;

      for (let i = 0; i < shapes.length; i++) {
        const s = shapes[i];
        s.vy += GRAVITY;
        if (allowVelDamping) {
          s.vx *= AIR_DAMPING;
          s.vy *= AIR_DAMPING;
          s.vRot *= ANGULAR_DAMPING;
        }

        s.x += s.vx;
        s.y += s.vy;
        s.rot += s.vRot;

        // Wall collisions
        if (s.x - s.r < -s.r * 0.4) {
          s.x = -s.r * 0.4 + s.r;
          s.vx = -s.vx * RESTITUTION;
        } else if (s.x + s.r > W + s.r * 0.4) {
          s.x = W + s.r * 0.4 - s.r;
          s.vx = -s.vx * RESTITUTION;
        }

        // Floor collision
        if (s.y + s.r > floor + s.r * 0.25) {
          s.y = floor + s.r * 0.25 - s.r;
          s.vy = -s.vy * RESTITUTION;
          s.vx *= FRICTION;
        }
      }

      // Circle-Circle collisions
      const ITERATIONS = 3;
      for (let iter = 0; iter < ITERATIONS; iter++) {
        for (let i = 0; i < shapes.length; i++) {
          const s1 = shapes[i];
          for (let j = i + 1; j < shapes.length; j++) {
            const s2 = shapes[j];
            const dx = s2.x - s1.x;
            const dy = s2.y - s1.y;
            const dist = Math.hypot(dx, dy);
            const minDist = (s1.r + s2.r) * 0.94;

            if (dist < minDist && dist > 0.001) {
              const nx = dx / dist;
              const ny = dy / dist;
              const overlap = (minDist - dist) * 0.5;

              s1.x -= nx * overlap;
              s1.y -= ny * overlap;
              s2.x += nx * overlap;
              s2.y += ny * overlap;

              const kx = s1.vx - s2.vx;
              const ky = s1.vy - s2.vy;
              const p = nx * kx + ny * ky;

              s1.vx -= p * nx * (1 + RESTITUTION) * 0.5;
              s1.vy -= p * ny * (1 + RESTITUTION) * 0.5;
              s2.vx += p * nx * (1 + RESTITUTION) * 0.5;
              s2.vy += p * ny * (1 + RESTITUTION) * 0.5;
            }
          }
        }
      }
    }

    // OBSERVER & ANIMATION LOOP
    let isVisible = false;
    let rafId: number | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            if (!rafId) {
              rafId = requestAnimationFrame(loop);
            }
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(section);

    function loop() {
      if (!isVisible) {
        rafId = null;
        return;
      }

      // 1. Trail fade (~1.5s smoothly)
      if (trailCtx) {
        trailCtx.save();
        trailCtx.fillStyle = 'rgba(241, 243, 250, 0.035)';
        trailCtx.fillRect(0, 0, W, H);
        trailCtx.restore();
      }

      // 2. Physics & Pile Rendering
      if (pileCtx) {
        pileCtx.clearRect(0, 0, W, H);
        if (!prefersReducedMotion) {
          updatePhysics(true);
        }
        for (let i = 0; i < shapes.length; i++) {
          drawShape(pileCtx, shapes[i]);
        }
      }

      // 3. Heading Letter Jump Lerp
      if (!prefersReducedMotion) {
        letters.forEach((item) => {
          item.currentY += (item.targetY - item.currentY) * 0.14;
          item.currentRot += (item.targetRot - item.currentRot) * 0.14;

          if (Math.abs(item.currentY) > 0.001 || Math.abs(item.currentRot) > 0.01) {
            item.el.style.transform = `translateY(${item.currentY.toFixed(3)}em) rotate(${item.currentRot.toFixed(2)}deg)`;
          } else {
            item.el.style.transform = '';
          }
        });
      }

      rafId = requestAnimationFrame(loop);
    }

    let resizeTimer: NodeJS.Timeout | null = null;
    function onResize() {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resizeCanvases();
        initShapes();
      }, 150);
    }
    window.addEventListener('resize', onResize);

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      if (resizeTimer) clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      section.removeEventListener('pointermove', onPointerMove);
      section.removeEventListener('touchmove', onPointerMove);
      section.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return (
    <>
      <style>{`
        /* CTA Section matching image_32d01e7f.png */
        .cta {
          min-height: 100vh;
          min-height: 100svh;
          position: relative;
          overflow: hidden;
          background: #f1f3fa;
          color: #000000;
          text-align: center;
          font-family: inherit;
          box-sizing: border-box;
          user-select: none;
        }

        /* Iridescent Trail Canvas */
        .cta-trail-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          filter: blur(18px);
          pointer-events: none;
        }

        /* Physics Pile Canvas */
        .cta-pile-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 2;
          pointer-events: none;
        }

        /* Top Bar Container aligning crosshairs & label on the exact same row */
        .cta-top-row {
          position: absolute;
          top: clamp(22px, 3.8vw, 40px);
          left: 0;
          right: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20%;
          z-index: 4;
          pointer-events: none;
          box-sizing: border-box;
        }

        .cta-top-label {
          font-size: clamp(.68rem, .85vw, .82rem);
          letter-spacing: .08em;
          text-transform: uppercase;
          color: #000000;
          font-weight: 500;
          white-space: nowrap;
          margin: 0;
          padding: 0 16px;
        }

        /* Thin "+" Crosshair Marks */
        .cta-crosshair-icon {
          width: 14px;
          height: 14px;
          color: #000000;
          flex-shrink: 0;
        }

        .cta-crosshair-abs {
          position: absolute;
          width: 14px;
          height: 14px;
          pointer-events: none;
          z-index: 4;
          transform: translate(-50%, -50%);
        }

        /* Centered Heading: Scaled smaller and raised higher */
        .cta-title {
          position: absolute;
          top: 29%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          max-width: 1500px;
          margin: 0;
          padding: 0 4vw;
          box-sizing: border-box;
          font-weight: 400;
          font-size: clamp(2.6rem, 8.8vw, 7.8rem);
          line-height: .88;
          letter-spacing: -.03em;
          color: #000000;
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .cta-line {
          position: relative;
          display: inline-block;
          white-space: nowrap;
          cursor: default;
        }

        .cta-line .ch {
          display: inline-block;
          will-change: transform;
          transform-origin: center bottom;
        }

        /* Dynamic Line Underline */
        .cta-underline {
          position: absolute;
          left: 0;
          right: 0;
          bottom: -0.04em;
          height: 0.07em;
          background: #000000;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform .45s cubic-bezier(.2, .7, .2, 1);
          pointer-events: none;
        }

        .cta-line.hovered .cta-underline {
          transform: scaleX(1);
          transform-origin: left;
        }

        /* Bottom Pill Button */
        .cta-btn-wrap {
          position: absolute;
          bottom: 7%;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
        }

        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: #ffffff;
          color: #1a1a1a;
          border-radius: 9999px;
          padding: 16px 30px;
          text-decoration: none;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: .07em;
          text-transform: uppercase;
          border: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.07);
          transition: transform .3s ease, box-shadow .3s ease;
          cursor: pointer;
        }

        .cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(20, 24, 60, .14);
        }

        .cta-arrow {
          width: 14px;
          height: 14px;
          stroke: currentColor;
          stroke-width: 2.2;
          flex-shrink: 0;
        }

        /* Mobile Screens */
        @media (max-width: 760px) {
          .cta-top-row {
            padding: 0 8%;
          }
          .cta-title {
            top: 27%;
            font-size: clamp(2.2rem, 11vw, 4.2rem);
          }
          .cta-btn {
            padding: 14px 22px;
            gap: 8px;
          }
        }

        /* Prefers Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
          .cta-line .ch {
            transform: none !important;
          }
          .cta-underline {
            transition: none !important;
          }
          .cta-btn {
            transition: none !important;
          }
        }
      `}</style>

      <section ref={sectionRef} className="cta">
        {/* Layer 1: Iridescent Mouse Trail Canvas */}
        <canvas ref={trailCanvasRef} className="cta-trail-canvas" />

        {/* Layer 2: Physics Shape Pile Canvas */}
        <canvas ref={pileCanvasRef} className="cta-pile-canvas" />

        {/* Top Aligned Row: Left Crosshair, Center Label, Right Crosshair */}
        <div className="cta-top-row">
          <svg
            className="cta-crosshair-icon"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <line x1="7" y1="0" x2="7" y2="14" />
            <line x1="0" y1="7" x2="14" y2="7" />
          </svg>

          <p className="cta-top-label">IS YOUR BIG IDEA READY TO GO WILD?</p>

          <svg
            className="cta-crosshair-icon"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <line x1="7" y1="0" x2="7" y2="14" />
            <line x1="0" y1="7" x2="14" y2="7" />
          </svg>
        </div>

        {/* Crosshair Marks (Row 2 at 75% height directly resting in the top layer of the pile) */}
        <svg
          className="cta-crosshair-abs"
          style={{ top: '75%', left: '20%' }}
          viewBox="0 0 14 14"
          fill="none"
          stroke="#000"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <line x1="7" y1="0" x2="7" y2="14" />
          <line x1="0" y1="7" x2="14" y2="7" />
        </svg>

        <svg
          className="cta-crosshair-abs"
          style={{ top: '75%', left: '50%' }}
          viewBox="0 0 14 14"
          fill="none"
          stroke="#000"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <line x1="7" y1="0" x2="7" y2="14" />
          <line x1="0" y1="7" x2="14" y2="7" />
        </svg>

        <svg
          className="cta-crosshair-abs"
          style={{ top: '75%', left: '80%' }}
          viewBox="0 0 14 14"
          fill="none"
          stroke="#000"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <line x1="7" y1="0" x2="7" y2="14" />
          <line x1="0" y1="7" x2="14" y2="7" />
        </svg>

        {/* Giant Centered Heading (Sitting cleanly above pile) */}
        <h2
          ref={headingRef}
          className="cta-title"
          aria-label="Let's work together!"
        >
          <span className="cta-line" data-text="Let's work">
            Let's work
          </span>
          <span className="cta-line" data-text="together!">
            together!
          </span>
        </h2>

        {/* Pill Button (Centrally positioned at bottom ~7%) */}
        <div className="cta-btn-wrap">
          <a
            href="#contact"
            className="cta-btn"
            onClick={(e) => {
              const contactEl = document.getElementById('contact');
              if (contactEl) {
                e.preventDefault();
                contactEl.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <svg
              className="cta-arrow"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
            <span>CONTINUE TO SCROLL</span>
            <svg
              className="cta-arrow"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
          </a>
        </div>
      </section>
    </>
  );
};
