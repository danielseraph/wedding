import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HEARTS = ['❤️', '💕', '💖', '💗', '💓', '🌹', '✨'];

function FloatingHeart({ id, x, emoji, size, duration, onDone }) {
  return (
    <motion.div
      key={id}
      className="fixed pointer-events-none select-none z-50"
      style={{ left: `${x}vw`, bottom: 0, fontSize: size }}
      initial={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
      animate={{
        y: `-${90 + Math.random() * 20}vh`,
        opacity: [1, 1, 0.8, 0],
        rotate: [0, -15, 15, -10, 10, 0],
        scale: [1, 1.1, 0.9, 0.7],
      }}
      transition={{ duration, ease: 'easeOut' }}
      onAnimationComplete={onDone}
    >
      {emoji}
    </motion.div>
  );
}

export default function FloatingHearts({ trigger, continuous = false }) {
  const hearts = useRef([]);
  const counter = useRef(0);

  // Burst on trigger change
  useEffect(() => {
    if (!trigger) return;
    spawnBurst(12);
  }, [trigger]);

  // Continuous gentle drift
  useEffect(() => {
    if (!continuous) return;
    const interval = setInterval(() => {
      spawnSingle();
    }, 1800);
    return () => clearInterval(interval);
  }, [continuous]);

  function spawnBurst(count) {
    for (let i = 0; i < count; i++) {
      setTimeout(() => spawnSingle(), i * 120);
    }
  }

  function spawnSingle() {
    counter.current += 1;
    const id = counter.current;
    hearts.current = [
      ...hearts.current,
      {
        id,
        x: 5 + Math.random() * 90,
        emoji: HEARTS[Math.floor(Math.random() * HEARTS.length)],
        size: `${1.2 + Math.random() * 1.8}rem`,
        duration: 2.5 + Math.random() * 2,
      },
    ];
    // Force re-render via a small trick — use a callback ref pattern
    // We'll handle via the DOM directly for performance
  }

  return null; // Actual rendering is in FloatingHeartsCanvas
}

// Simpler, fully self-contained canvas approach
export function HeartCanvas({ trigger, continuous = false }) {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const rafId = useRef(null);
  const lastTime = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function spawnParticle(x, y) {
      const emojis = ['❤️', '💕', '💖', '💗', '✨', '🌹', '💓'];
      particles.current.push({
        x: x ?? Math.random() * canvas.width,
        y: y ?? canvas.height + 20,
        vy: -(1.5 + Math.random() * 2),
        vx: (Math.random() - 0.5) * 1.5,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        size: 18 + Math.random() * 20,
        alpha: 1,
        fadeStart: 0.4 + Math.random() * 0.3,
        life: 0,
        maxLife: 120 + Math.random() * 80,
        rot: (Math.random() - 0.5) * 0.05,
        angle: 0,
      });
    }

    function loop(ts) {
      rafId.current = requestAnimationFrame(loop);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current = particles.current.filter(p => p.life < p.maxLife);

      particles.current.forEach(p => {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.rot;
        const lifeRatio = p.life / p.maxLife;
        p.alpha = lifeRatio < p.fadeStart
          ? 1
          : 1 - (lifeRatio - p.fadeStart) / (1 - p.fadeStart);

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.font = `${p.size}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.emoji, 0, 0);
        ctx.restore();
      });

      // Continuous gentle spawn
      if (continuous && ts - lastTime.current > 2000) {
        spawnParticle();
        lastTime.current = ts;
      }
    }

    rafId.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener('resize', resize);
    };
  }, [continuous]);

  // Burst on trigger
  useEffect(() => {
    if (!trigger) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const x = canvas.width * 0.1 + Math.random() * canvas.width * 0.8;
        const y = canvas.height * 0.3 + Math.random() * canvas.height * 0.4;
        const emojis = ['❤️', '💕', '💖', '💗', '✨', '🌹'];
        particles.current.push({
          x,
          y,
          vy: -(2 + Math.random() * 3),
          vx: (Math.random() - 0.5) * 3,
          emoji: emojis[Math.floor(Math.random() * emojis.length)],
          size: 24 + Math.random() * 24,
          alpha: 1,
          fadeStart: 0.5,
          life: 0,
          maxLife: 100 + Math.random() * 60,
          rot: (Math.random() - 0.5) * 0.08,
          angle: 0,
        });
      }, i * 80);
    }
  }, [trigger]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
}
