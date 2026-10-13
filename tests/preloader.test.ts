import { describe, it, expect } from 'vitest';
import {
  PRELOADER_BOOT_SCRIPT,
  PRELOADER_MIN_MS,
  PRELOADER_PENDING_CAP,
  PRELOADER_SESSION_KEY,
  PRELOADER_STATUSES,
  clamp,
  computeTargetProgress,
  easeInOutCubic,
  formatCounter,
  hexagonPoints,
  smoothProgress,
  statusIndexFor,
} from '@/lib/preloader';

describe('preloader progress curve', () => {
  it('clamp bounds values', () => {
    expect(clamp(5, 0, 3)).toBe(3);
    expect(clamp(-1, 0, 3)).toBe(0);
    expect(clamp(2, 0, 3)).toBe(2);
  });

  it('easeInOutCubic is 0 at start, 1 at end, 0.5 at midpoint and clamps input', () => {
    expect(easeInOutCubic(0)).toBe(0);
    expect(easeInOutCubic(1)).toBe(1);
    expect(easeInOutCubic(0.5)).toBeCloseTo(0.5, 5);
    expect(easeInOutCubic(-4)).toBe(0);
    expect(easeInOutCubic(9)).toBe(1);
  });

  it('parks at the pending cap while the page is not ready', () => {
    expect(computeTargetProgress(PRELOADER_MIN_MS * 3, false)).toBe(PRELOADER_PENDING_CAP);
  });

  it('reaches 100 once the minimum time has passed and the page is ready', () => {
    expect(computeTargetProgress(PRELOADER_MIN_MS, true)).toBe(100);
    expect(computeTargetProgress(0, true)).toBe(0);
  });

  it('is monotonic non-decreasing over time', () => {
    let prev = -1;
    for (let t = 0; t <= PRELOADER_MIN_MS * 1.2; t += 50) {
      const value = computeTargetProgress(t, true);
      expect(value).toBeGreaterThanOrEqual(prev);
      expect(value).toBeLessThanOrEqual(100);
      prev = value;
    }
  });

  it('respects a custom minimum duration', () => {
    expect(computeTargetProgress(900, true, 900)).toBe(100);
    expect(computeTargetProgress(450, true, 900)).toBeCloseTo(50, 5);
  });
});

describe('smoothProgress', () => {
  it('never moves backwards or overshoots', () => {
    expect(smoothProgress(50, 40, 16)).toBe(50);
    const next = smoothProgress(10, 60, 16);
    expect(next).toBeGreaterThan(10);
    expect(next).toBeLessThanOrEqual(60);
  });

  it('snaps onto the target when within a hair', () => {
    expect(smoothProgress(99.97, 100, 16)).toBe(100);
  });

  it('eventually converges to the target', () => {
    let value = 0;
    for (let i = 0; i < 400; i += 1) value = smoothProgress(value, 100, 16);
    expect(value).toBe(100);
  });

  it('ignores negative frame deltas', () => {
    expect(smoothProgress(10, 60, -50)).toBe(10);
  });
});

describe('counter and status helpers', () => {
  it('formats a zero-padded counter', () => {
    expect(formatCounter(0)).toBe('000');
    expect(formatCounter(7.4)).toBe('007');
    expect(formatCounter(64.6)).toBe('065');
    expect(formatCounter(100)).toBe('100');
    expect(formatCounter(250)).toBe('100');
    expect(formatCounter(-5)).toBe('000');
  });

  it('maps progress onto status indexes across the whole range', () => {
    const count = PRELOADER_STATUSES.length;
    expect(statusIndexFor(0, count)).toBe(0);
    expect(statusIndexFor(99.9, count)).toBe(count - 1);
    expect(statusIndexFor(100, count)).toBe(count - 1);
    expect(statusIndexFor(50, count)).toBe(Math.floor(count / 2));
    expect(statusIndexFor(50, 0)).toBe(0);
  });

  it('ships every status in both English and Arabic', () => {
    for (const status of PRELOADER_STATUSES) {
      expect(status.en.trim().length).toBeGreaterThan(0);
      expect(/[\u0600-\u06FF]/.test(status.ar)).toBe(true);
    }
  });
});

describe('ring geometry', () => {
  it('produces six hexagon vertices with the first one at the top', () => {
    const points = hexagonPoints(200, 205, 172).split(' ');
    expect(points).toHaveLength(6);
    expect(points[0]).toBe('200.0,33.0');
  });
});

describe('boot script', () => {
  it('references the session key and the force-replay query flag', () => {
    expect(PRELOADER_BOOT_SCRIPT).toContain(PRELOADER_SESSION_KEY);
    expect(PRELOADER_BOOT_SCRIPT).toContain("'preloader'");
    expect(PRELOADER_BOOT_SCRIPT).toContain('data-preloader');
  });
});
