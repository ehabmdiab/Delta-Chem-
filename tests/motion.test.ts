import { describe, expect, it } from 'vitest';

import {
  CROSSFADE_REDUCED,
  SPRING_MOMENTUM,
  SPRING_SMOOTH,
  SPRING_SNAPPY,
  projectVelocity,
  rubberband,
} from '@/lib/motion';

describe('motion physics constants and helpers', () => {
  it('defines critically damped UI spring constants and bouncy momentum spring', () => {
    expect(SPRING_SMOOTH).toEqual({ type: 'spring', bounce: 0, duration: 0.4 });
    expect(SPRING_SNAPPY).toEqual({ type: 'spring', bounce: 0, duration: 0.3 });
    expect(SPRING_MOMENTUM).toEqual({ type: 'spring', bounce: 0.2, duration: 0.38 });
    expect(CROSSFADE_REDUCED).toEqual({ duration: 0.18, ease: 'easeOut' });
  });

  it('projects inertial distance monotonically with velocity sign preservation', () => {
    expect(projectVelocity(0)).toBe(0);

    const positive = projectVelocity(1000);
    const negative = projectVelocity(-1000);
    expect(positive).toBeCloseTo(499, 5);
    expect(negative).toBeCloseTo(-499, 5);
    expect(positive).toBeGreaterThan(0);
    expect(negative).toBeLessThan(0);

    const lowerDecel = projectVelocity(1000, 0.99);
    expect(lowerDecel).toBeCloseTo(99, 5);
    expect(lowerDecel).toBeLessThan(positive);
  });

  it('returns 0 from projectVelocity for out-of-range deceleration rates', () => {
    expect(projectVelocity(1000, 1)).toBe(0);
    expect(projectVelocity(1000, 1.2)).toBe(0);
    expect(projectVelocity(1000, 0)).toBe(0);
    expect(projectVelocity(1000, -0.5)).toBe(0);
  });

  it('applies progressive rubber-band resistance that compresses overshoot and preserves sign', () => {
    expect(rubberband(0, 320)).toBe(0);

    const smallPos = rubberband(20, 320);
    const largePos = rubberband(200, 320);
    expect(smallPos).toBeGreaterThan(0);
    expect(smallPos).toBeLessThan(20);
    expect(largePos).toBeGreaterThan(smallPos);
    expect(largePos).toBeLessThan(200);

    const neg = rubberband(-80, 320);
    expect(neg).toBeLessThan(0);
    expect(Math.abs(neg)).toBeLessThan(80);
    expect(neg).toBeCloseTo(-rubberband(80, 320), 8);
  });

  it('returns 0 from rubberband when dimension is non-positive', () => {
    expect(rubberband(100, 0)).toBe(0);
    expect(rubberband(-50, -10)).toBe(0);
  });
});

