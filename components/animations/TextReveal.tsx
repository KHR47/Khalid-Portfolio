'use client';

import { motion, useReducedMotion } from 'motion/react';

export function TextReveal({ text, className }: { text: string; className?: string }) {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(' ');

  return (
    <span className={className} aria-label={text}>
      {words.map((word, wordIndex) => (
        <span key={`${word}-${wordIndex}`} style={{ display: 'inline-block', whiteSpace: 'pre' }}>
          {shouldReduceMotion ? (
            <span>{word}</span>
          ) : (
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.18 + wordIndex * 0.08,
                ease: 'easeOut',
              }}
              style={{ display: 'inline-block' }}
            >
              {word}
            </motion.span>
          )}
          {wordIndex < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  );
}
