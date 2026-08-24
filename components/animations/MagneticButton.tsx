'use client';

import { motion, useReducedMotion, useSpring } from 'motion/react';
import type { MouseEvent, ReactNode } from 'react';

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  target?: string;
  rel?: string;
  onClick?: () => void;
};

export function MagneticButton({
  children,
  className,
  href,
  type = 'button',
  target,
  rel,
  onClick,
}: MagneticButtonProps) {
  const shouldReduceMotion = useReducedMotion();
  const x = useSpring(0, { stiffness: 180, damping: 18, mass: 0.4 });
  const y = useSpring(0, { stiffness: 180, damping: 18, mass: 0.4 });

  const handleMouseMove = (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (shouldReduceMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;

    x.set(offsetX * 0.12);
    y.set(offsetY * 0.12);
  };

  const commonProps = {
    className,
    onClick,
    onMouseMove: handleMouseMove,
    onMouseLeave: () => {
      x.set(0);
      y.set(0);
    },
    whileHover: shouldReduceMotion ? undefined : { scale: 1.01 },
    style: shouldReduceMotion ? undefined : { x, y },
    transition: { type: 'spring' as const, stiffness: 220, damping: 18 },
  };

  if (href) {
    return (
      <motion.a href={href} target={target} rel={rel} {...commonProps}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button type={type} {...commonProps}>
      {children}
    </motion.button>
  );
}
