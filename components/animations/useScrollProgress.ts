'use client';

import { useScroll, useSpring } from 'motion/react';

export function useScrollProgress() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.35,
  });

  return { progress };
}
