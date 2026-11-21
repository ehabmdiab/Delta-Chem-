import type { Transition } from 'motion/react';

/** Apple critically damped default (damping 1.0, response 0.4s) — zero overshoot. */
export const SPRING_SMOOTH: Transition = {
  type: 'spring',
  bounce: 0,
  duration: 0.4,
};

/** Apple critically damped snappy spring (damping 1.0, response 0.3s) for chrome & pills. */
export const SPRING_SNAPPY: Transition = {
  type: 'spring',
  bounce: 0,
  duration: 0.3,
};

/** Apple momentum spring (damping ~0.8) reserved for flick/drag release gestures. */
export const SPRING_MOMENTUM: Transition = {
  type: 'spring',
  bounce: 0.2,
  duration: 0.38,
};

/** Non-vestibular crossfade fallback for prefers-reduced-motion. */
export const CROSSFADE_REDUCED: Transition = {
  duration: 0.18,
  ease: 'easeOut',
};

/**
 * Apple WWDC 2018 exponential momentum projection:
 * estimates resting offset from release velocity (px/s).
 */
export function projectVelocity(initialVelocity: number, decelerationRate = 0.998): number {
  if (decelerationRate <= 0 || decelerationRate >= 1) {
    return 0;
  }
  return ((initialVelocity / 1000) * decelerationRate) / (1 - decelerationRate);
}

/**
 * Apple soft-boundary rubber-banding:
 * progressively resists overshoot past bounds instead of hard-stopping.
 */
export function rubberband(overshoot: number, dimension: number, constant = 0.55): number {
  if (dimension <= 0) {
    return 0;
  }
  return (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot));
}

