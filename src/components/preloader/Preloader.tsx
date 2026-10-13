'use client';

import React, { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useLanguage } from '@/components/providers/LanguageContext';
import { ParticleField, type ParticleControls } from './ParticleField';
import {
  DELTA_CENTER,
  DELTA_VIEWBOX,
  PRELOADER_FAILSAFE_MS,
  PRELOADER_MIN_MS,
  PRELOADER_REDUCED_MS,
  PRELOADER_SESSION_KEY,
  PRELOADER_STATUSES,
  clamp,
  computeTargetProgress,
  formatCounter,
  hexagonPoints,
  smoothProgress,
  statusIndexFor,
} from '@/lib/preloader';
import './preloader.css';

const COLUMNS = [0, 1, 2, 3, 4] as const;
const LOGO_SRC = '/images/logo-delta-chem.png';
const LOGO_WIDTH = 1224;
const LOGO_HEIGHT = 543;

const noopSubscribe = () => () => {};

function useShouldSkip(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => document.documentElement.getAttribute('data-preloader') === 'skip',
    () => false,
  );
}

function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      if (typeof window.matchMedia !== 'function') return () => {};
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      mq.addEventListener('change', onChange);
      return () => mq.removeEventListener('change', onChange);
    },
    () =>
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false,
  );
}

/**
 * Full-screen cinematic intro: a Δ vessel fills with liquid as molecules
 * swirl into orbit, the wordmark ignites, then a five-column curtain lifts.
 */
export function Preloader() {
  const { locale } = useLanguage();
  const skip = useShouldSkip();
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(true);

  const rootRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<ParticleControls>({ focus: 0, burst: 0 });
  const localeRef = useRef(locale);

  useEffect(() => {
    localeRef.current = locale;
  }, [locale]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || skip || !visible) return;

    const html = document.documentElement;
    html.classList.add('dc-pre-lock');

    const controls = controlsRef.current;
    const minMs = reduced ? PRELOADER_REDUCED_MS : PRELOADER_MIN_MS;
    const q = <T extends Element>(selector: string) => root.querySelector<T>(selector);
    const countEl = q<HTMLElement>('.dc-pre__count-num');
    const statusEl = q<HTMLElement>('.dc-pre__status-text');

    // Real readiness: window load + webfonts.
    let ready = false;
    const loaded = new Promise<void>((resolve) => {
      if (document.readyState === 'complete') resolve();
      else window.addEventListener('load', () => resolve(), { once: true });
    });
    const fonts = document.fonts ? document.fonts.ready.then(() => undefined) : Promise.resolve();
    void Promise.all([loaded, fonts]).then(() => {
      ready = true;
    });

    const finish = () => {
      html.classList.remove('dc-pre-lock');
      if (process.env.NODE_ENV === 'production') {
        try {
          sessionStorage.setItem(PRELOADER_SESSION_KEY, '1');
        } catch {
          /* storage unavailable - intro simply replays next visit */
        }
      }
      setVisible(false);
    };

    const ctx = gsap.context(() => {
      if (reduced) return;
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
      intro
        .to('.dc-pre__hud', { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 }, 0.1)
        .to('.dc-pre__hex', { strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut' }, 0.1)
        .fromTo(
          '.dc-pre__logo',
          { opacity: 0, scale: 0.86 },
          { opacity: 1, scale: 1, duration: 1.3, ease: 'expo.out' },
          0.35,
        )
        .fromTo(
          '.dc-pre__ripple',
          { opacity: 0.8, scale: 0.3 },
          { opacity: 0, scale: 2.4, duration: 1.4, ease: 'power2.out', transformOrigin: '50% 50%' },
          0.4,
        )
        .to('.dc-pre__tag', { opacity: 1, y: 0, duration: 0.9 }, 1.5);
    }, root);

    const runExit = () => {
      controls.burst = 1;
      root.classList.add('is-done');
      if (reduced) {
        gsap.to(root, { opacity: 0, duration: 0.4, delay: 0.3, onComplete: finish });
        return;
      }
      const exit = gsap.timeline({ onComplete: finish });
      exit
        .fromTo(
          '.dc-pre__shock',
          { opacity: 0.9, scale: 0.4 },
          { opacity: 0, scale: 3.4, duration: 1.1, ease: 'power2.out', transformOrigin: '50% 50%' },
          0,
        )
        .to('.dc-pre__core', { scale: 1.07, duration: 0.5, ease: 'power2.out' }, 0)
        .fromTo('.dc-pre__logo-flash', { opacity: 0 }, { opacity: 0.9, duration: 0.2, ease: 'power2.out' }, 0.05)
        .to('.dc-pre__logo-flash', { opacity: 0, duration: 0.7, ease: 'power2.inOut' }, 0.25)
        .to('.dc-pre__stage', { opacity: 0, scale: 1.06, duration: 0.65, ease: 'power2.in' }, 1.15)
        .to(
          '.dc-pre__col',
          {
            yPercent: -100,
            duration: 1.05,
            ease: 'power4.inOut',
            stagger: { each: 0.08, from: 'center' },
          },
          1.4,
        );
    };

    const startedAt = performance.now();
    let last = startedAt;
    let shown = 0;
    let statusIdx = -1;
    let exiting = false;

    const tick = () => {
      const now = performance.now();
      const elapsed = now - startedAt;
      const dt = now - last;
      last = now;

      const target = computeTargetProgress(elapsed, ready || elapsed > PRELOADER_FAILSAFE_MS, minMs);
      shown = smoothProgress(shown, target, dt);

      root.style.setProperty('--p', shown.toFixed(2));
      if (countEl) countEl.textContent = formatCounter(shown);
      controls.focus = clamp((shown / 100) * 1.25, 0, 1);

      const idx = statusIndexFor(shown, PRELOADER_STATUSES.length);
      if (idx !== statusIdx && statusEl) {
        statusIdx = idx;
        const entry = PRELOADER_STATUSES[idx];
        statusEl.textContent = localeRef.current === 'ar' ? entry.ar : entry.en;
        if (!reduced) {
          gsap.fromTo(
            statusEl,
            { yPercent: 110, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.5, ease: 'power3.out', overwrite: true },
          );
        }
      }

      if (shown >= 100 && !exiting) {
        exiting = true;
        runExit();
      }
    };

    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      if (statusEl) gsap.killTweensOf(statusEl);
      gsap.killTweensOf(root);
      ctx.revert();
      html.classList.remove('dc-pre-lock');
    };
  }, [skip, reduced, visible]);

  if (!visible || skip) return null;

  return (
    <div
      ref={rootRef}
      className={`dc-pre${reduced ? ' is-reduced' : ''}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Loading DELTACHEM"
      dir="ltr"
    >
      <div className="dc-pre__curtain" aria-hidden="true">
        {COLUMNS.map((i) => (
          <div key={i} className="dc-pre__col" />
        ))}
      </div>

      <div className="dc-pre__stage" aria-hidden="true">
        <div className="dc-pre__grid" />
        {!reduced && <ParticleField controlsRef={controlsRef} />}
        <div className="dc-pre__vignette" />

        <span className="dc-pre__corner dc-pre__corner--tl" />
        <span className="dc-pre__corner dc-pre__corner--tr" />
        <span className="dc-pre__corner dc-pre__corner--bl" />
        <span className="dc-pre__corner dc-pre__corner--br" />

        <div className="dc-pre__hud dc-pre__hud--tl">
          <span className="dc-pre__pulse" />
          Delta Chem · Life Science
        </div>
        <div className="dc-pre__hud dc-pre__hud--tr">Cairo, EG · 30.04°N 31.24°E</div>

        <div className="dc-pre__center">
          <div className="dc-pre__core">
            <div className="dc-pre__frame">
              <svg
                className="dc-pre__svg"
                viewBox={`0 0 ${DELTA_VIEWBOX.width} ${DELTA_VIEWBOX.height}`}
                fill="none"
              >
                <circle
                  className="dc-pre__orbit"
                  cx={DELTA_CENTER.x}
                  cy={DELTA_CENTER.y}
                  r="196"
                />
                <g className="dc-pre__hexwrap">
                  <polygon
                    className="dc-pre__hex"
                    pathLength={1}
                    points={hexagonPoints(DELTA_CENTER.x, DELTA_CENTER.y, 172)}
                  />
                </g>
                <circle
                  className="dc-pre__ripple"
                  cx={DELTA_CENTER.x}
                  cy={DELTA_CENTER.y}
                  r="90"
                />
                <circle
                  className="dc-pre__shock"
                  cx={DELTA_CENTER.x}
                  cy={DELTA_CENTER.y}
                  r="120"
                />
              </svg>

              <div className="dc-pre__logo">
                <Image
                  className="dc-pre__logo-img dc-pre__logo-ghost"
                  src={LOGO_SRC}
                  alt=""
                  width={LOGO_WIDTH}
                  height={LOGO_HEIGHT}
                  priority
                />
                <Image
                  className="dc-pre__logo-img dc-pre__logo-fill"
                  src={LOGO_SRC}
                  alt="DELTACHEM"
                  width={LOGO_WIDTH}
                  height={LOGO_HEIGHT}
                  priority
                />
                <Image
                  className="dc-pre__logo-img dc-pre__logo-flash"
                  src={LOGO_SRC}
                  alt=""
                  width={LOGO_WIDTH}
                  height={LOGO_HEIGHT}
                  priority
                />
                <span className="dc-pre__scan" />
              </div>
            </div>

            <p className="dc-pre__tag">Pharmaceutical · Nutraceutical · Veterinary · Cosmetic</p>
          </div>
        </div>

        <div className="dc-pre__count dc-pre__hud dc-pre__hud--bl">
          <span className="dc-pre__count-num">000</span>
          <span className="dc-pre__count-unit">%</span>
        </div>

        <div className="dc-pre__status dc-pre__hud dc-pre__hud--br">
          <span className="dc-pre__status-label">System status</span>
          <span className="dc-pre__status-mask">
            <span className="dc-pre__status-text" />
          </span>
        </div>

        <div className="dc-pre__rail">
          <div className="dc-pre__rail-bar" />
        </div>
      </div>

      <span className="dc-pre__sr">Loading DELTACHEM…</span>
    </div>
  );
}
