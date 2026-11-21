'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { SPRING_SMOOTH, CROSSFADE_REDUCED } from '@/lib/motion';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  className?: string;
}

/** Restrained Apple spring entrance; cross-fades cleanly under prefers-reduced-motion. */
export const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  y = 14,
  x = 0,
  className,
}) => {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ ...CROSSFADE_REDUCED, delay }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ ...SPRING_SMOOTH, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
