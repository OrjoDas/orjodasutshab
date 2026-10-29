import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export type Lusion3DMode = 'chrome' | 'glass' | 'quantum' | 'crystals' | 'wireframe';

interface ThreeCanvasProps {
  theme?: string;
  bgUrl?: string;
  activeMode?: Lusion3DMode;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ bgUrl }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentMode, setCurrentMode] = useState<Lusion3DMode>('chrome');

  useEffect(() => {
    const handleModeChange = (e: CustomEvent<Lusion3DMode>) => {
      if (e.detail) {
        setCurrentMode(e.detail);
      }
    };
    window.addEventListener('lusion_3d_mode' as any, handleModeChange);
    return () => window.removeEventListener('lusion_3d_mode' as any, handleModeChange);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- 1. Scene & Camera Setup ---
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 7.5);

    // --- 2. WebGL Renderer with High-Performance Settings ---
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // --- 3. Dynamic Lusion Studio Lighting (Mint #5EE6C9, Violet #8B5CF6, Golden Sheen) ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(5, 8, 5);
    scene.add(keyLight);

    const mintPointLight = new THREE.PointLight(0x5EE6C9, 5, 30);
    mintPointLight.position.set(-4, 3, 3);
    scene.add(mintPointLight);

    const violetPointLight = new THREE.PointLight(0x8B5CF6, 4.5, 35);
    violetPointLight.position.set(5, -4, 2);
    scene.add(violetPointLight);

    const cyanRimLight = new THREE.PointLight(0x06B6D4, 3, 20);
    cyanRimLight.position.set(0, -5, -2);
    scene.add(cyanRimLight);

    // --- 4. Delicate Floating Micro-Cubes (Small ones stay, big bulky boxes removed) ---
    const tinyCubeGroup = new THREE.Group();
    const tinyCubes: THREE.Mesh[] = [];
    const tinyCubeGeo = new THREE.BoxGeometry(0.08, 0.08, 0.08);
    const tinyCubeMat = new THREE.MeshPhysicalMaterial({
      color: 0x8B5CF6,
      emissive: 0x3b0764,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.85,
      clearcoat: 1.0,
      transparent: true,
      opacity: 0.5,
    });

    const tinyCubeCount = 12;
    for (let i = 0; i < tinyCubeCount; i++) {
      const cube = new THREE.Mesh(tinyCubeGeo, tinyCubeMat);
      const angle = (i / tinyCubeCount) * Math.PI * 2;
      const radius = 3.6 + Math.sin(i * 1.5) * 2.2;
      cube.position.set(
        Math.cos(angle) * radius,
        (Math.sin(angle) * radius * 0.6) + (Math.random() - 0.5) * 1.5,
        (Math.random() - 0.5) * 3
      );
      cube.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      tinyCubeGroup.add(cube);
      tinyCubes.push(cube);
    }
    scene.add(tinyCubeGroup);

    // --- 6. Signature Lusion Quantum Particle Vortex (2,400 Dynamic Nodes) ---
    const particleCount = 2400;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleBasePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const mintCol = new THREE.Color(0x5EE6C9);
    const violetCol = new THREE.Color(0x8B5CF6);
    const cyanCol = new THREE.Color(0x06B6D4);
    const tempCol = new THREE.Color();

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.5 + Math.random() * 8.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      const px = radius * Math.cos(theta) * Math.cos(phi);
      const py = radius * Math.sin(phi) * 0.8;
      const pz = radius * Math.sin(theta) * Math.cos(phi) - 1.5;

      particlePositions[i * 3] = px;
      particlePositions[i * 3 + 1] = py;
      particlePositions[i * 3 + 2] = pz;

      particleBasePositions[i * 3] = px;
      particleBasePositions[i * 3 + 1] = py;
      particleBasePositions[i * 3 + 2] = pz;

      const colorMix = Math.random();
      if (colorMix < 0.45) {
        tempCol.copy(mintCol);
      } else if (colorMix < 0.85) {
        tempCol.copy(violetCol);
      } else {
        tempCol.copy(cyanCol);
      }

      particleColors[i * 3] = tempCol.r;
      particleColors[i * 3 + 1] = tempCol.g;
      particleColors[i * 3 + 2] = tempCol.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleCloud = new THREE.Points(particleGeo, particleMat);
    scene.add(particleCloud);

    // --- 7. Mouse Physics & Inertia lerping ---
    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      isDown: false,
    };

    const scroll = {
      y: 0,
      targetY: 0,
      progress: 0,
      targetProgress: 0,
    };

    const onMouseMove = (e: MouseEvent) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      mouse.targetX = (e.clientX - halfW) / halfW;
      mouse.targetY = -(e.clientY - halfH) / halfH;
    };

    const onMouseDown = () => {
      mouse.isDown = true;
    };

    const onMouseUp = () => {
      mouse.isDown = false;
    };

    const onScroll = () => {
      const sy = window.scrollY || window.pageYOffset;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scroll.targetY = sy;
      scroll.targetProgress = maxScroll > 0 ? sy / maxScroll : 0;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // --- 8. Animation Loop with Simplex-like Fluid Vertex Morphing ---
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Smooth Lerping
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;
      scroll.progress += (scroll.targetProgress - scroll.progress) * 0.08;

      // Dynamic Camera Parallax & Zoom on Scroll
      camera.position.x = mouse.x * 0.8;
      camera.position.y = mouse.y * 0.5 - scroll.progress * 3.5;
      camera.position.z = 7.5 + Math.sin(scroll.progress * Math.PI) * 1.5;
      camera.lookAt(0, -scroll.progress * 3.5, 0);

      // Light Tracking
      mintPointLight.position.x = mouse.x * 4 - 2;
      mintPointLight.position.y = mouse.y * 4 + 2;
      violetPointLight.position.x = -mouse.x * 3 + 3;
      violetPointLight.position.y = -mouse.y * 3 - 2;

      // Subtle Background Micro-Cubes Motion (Small ones stay, big ones deleted)
      tinyCubeGroup.rotation.y = time * 0.08;
      tinyCubeGroup.rotation.x = Math.sin(time * 0.1) * 0.04;
      tinyCubes.forEach((c) => {
        c.rotation.x += 0.01;
        c.rotation.y += 0.012;
      });

      // Quantum Particle Swarm Motion
      const pPosAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      const pPosArr = pPosAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const bx = particleBasePositions[i * 3];
        const by = particleBasePositions[i * 3 + 1];
        const bz = particleBasePositions[i * 3 + 2];

        const pWave = Math.sin(time * 1.2 + i * 0.05) * 0.25;
        pPosArr[i * 3] = bx + Math.cos(time * 0.8 + i * 0.02) * 0.2;
        pPosArr[i * 3 + 1] = by + pWave + mouse.y * 0.2;
        pPosArr[i * 3 + 2] = bz + Math.sin(time * 0.9 + i * 0.03) * 0.2;
      }
      pPosAttr.needsUpdate = true;

      particleCloud.rotation.y = time * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    // --- 9. Window Resize ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      tinyCubeGeo.dispose();
      tinyCubeMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, [currentMode]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Base Deep Luxury Dark Background */}
      <div className="absolute inset-0 bg-[#08080A] -z-20 pointer-events-none" />

      {/* 3D WebGL Canvas Layer */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full z-0" />

      {/* Lusion Deep Luxury Ambient Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(94,230,201,0.06)_0%,rgba(8,8,10,0.85)_65%,#08080A_100%)] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-500/08 rounded-full blur-[160px] pointer-events-none" />

    </div>
  );
};
