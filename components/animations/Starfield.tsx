'use client';

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  speed: number;
  color: string;
}

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const colors = [
      '255, 255, 255', // Pure white
      '125, 211, 252', // Electric Ice Blue
      '165, 180, 252', // Soft Lavender
      '110, 231, 183', // Subtle Emerald
    ];

    const starCount = Math.min(Math.floor((width * height) / 16000), 90);
    const stars: Star[] = [];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.2 + 0.4,
        alpha: Math.random() * 0.6 + 0.1,
        targetAlpha: Math.random() * 0.75 + 0.15,
        speed: Math.random() * 0.007 + 0.002,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        if (Math.abs(star.alpha - star.targetAlpha) < 0.01) {
          star.targetAlpha = Math.random() * 0.8 + 0.1;
        } else {
          star.alpha += (star.targetAlpha - star.alpha) * star.speed;
        }

        ctx.fillStyle = `rgba(${star.color}, ${star.alpha.toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="starfield-canvas"
      aria-hidden="true"
    />
  );
}
