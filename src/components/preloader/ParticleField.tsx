'use client';

import React, { useEffect, useRef } from 'react';

/** Mutable channel the Preloader writes to every frame (no React re-renders). */
export interface ParticleControls {
  /** 0 → free drifting molecules, 1 → swirling in orbit around the Δ. */
  focus: number;
  /** Set to 1 to fire an outward shockwave impulse; decays on its own. */
  burst: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  orbitK: number;
}

const COLORS = ['144,195,31', '1,143,71', '65,106,168', '226,240,205'] as const;
const LINK_DISTANCE = 150;

function createParticles(width: number, height: number): Particle[] {
  const count = Math.round(Math.min(110, Math.max(44, (width * height) / 15000)));
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    radius: 1 + Math.random() * 2.2,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    orbitK: Math.random(),
  }));
}

export function ParticleField({
  controlsRef,
}: {
  controlsRef: React.RefObject<ParticleControls>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let raf = 0;
    let last = performance.now();
    const born = last;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = createParticles(width, height);
    };

    const onPointer = (event: PointerEvent) => {
      pointer.tx = event.clientX / width - 0.5;
      pointer.ty = event.clientY / height - 0.5;
    };

    const frame = (now: number) => {
      const dt = Math.min(32, now - last) / 16.67;
      last = now;
      const controls = controlsRef.current;
      const fadeIn = Math.min(1, (now - born) / 1200);
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;

      const cx = width / 2;
      const cy = height * 0.44;
      const ring = Math.min(width, height) * 0.36;
      const swirl = 0.014 * controls.focus;
      const burst = controls.burst;
      if (burst > 0.001) controls.burst = burst * Math.pow(0.93, dt);
      else controls.burst = 0;

      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.translate(pointer.x * -18, pointer.y * -18);

      for (const p of particles) {
        const dx = p.x - cx;
        const dy = p.y - cy;
        const dist = Math.hypot(dx, dy) || 1;
        const nx = dx / dist;
        const ny = dy / dist;

        if (controls.focus > 0) {
          const target = ring * (0.7 + p.orbitK * 0.75);
          const pull = (dist - target) * 0.0011 * controls.focus * dt;
          p.vx -= nx * pull;
          p.vy -= ny * pull;
          p.vx += -ny * swirl * dt;
          p.vy += nx * swirl * dt;
        }
        if (burst > 0.001) {
          p.vx += nx * burst * 0.55 * dt;
          p.vy += ny * burst * 0.55 * dt;
        }

        p.vx += (Math.random() - 0.5) * 0.012 * dt;
        p.vy += (Math.random() - 0.5) * 0.012 * dt;
        const damping = Math.pow(0.988, dt);
        p.vx *= damping;
        p.vy *= damping;
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        if (p.x < -30) p.x = width + 30;
        else if (p.x > width + 30) p.x = -30;
        if (p.y < -30) p.y = height + 30;
        else if (p.y > height + 30) p.y = -30;
      }

      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i += 1) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j += 1) {
          const b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK_DISTANCE) {
            const alpha = (1 - d / LINK_DISTANCE) * 0.32 * fadeIn;
            ctx.strokeStyle = `rgba(144,195,31,${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 5);
        glow.addColorStop(0, `rgba(${p.color},${(0.55 * fadeIn).toFixed(3)})`);
        glow.addColorStop(1, `rgba(${p.color},0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(${p.color},${(0.95 * fadeIn).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
      raf = requestAnimationFrame(frame);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointer, { passive: true });
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointer);
    };
  }, [controlsRef]);

  return <canvas ref={canvasRef} className="dc-pre__canvas" aria-hidden="true" />;
}
