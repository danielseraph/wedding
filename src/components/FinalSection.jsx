import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { COUPLE, FINAL_COUPLE_PHOTO } from '../data/content';
import { HeartCanvas } from './FloatingHearts';

function launchConfetti() {
  const duration = 4000;
  const end = Date.now() + duration;

  const colors = ['#C9A84C', '#E8C97A', '#F2C4CE', '#7B2D42', '#FFFFFF'];

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors,
      shapes: ['circle', 'square'],
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors,
      shapes: ['circle', 'square'],
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();

  // Centre burst
  confetti({
    particleCount: 80,
    spread: 100,
    origin: { x: 0.5, y: 0.5 },
    colors,
    scalar: 1.2,
  });
}

export default function FinalSection() {
  const [heartTrigger, setHeartTrigger] = useState(0);
  const [celebrating, setCelebrating] = useState(false);

  const handleSendLove = useCallback(() => {
    setHeartTrigger(t => t + 1);
    launchConfetti();
    setCelebrating(true);
    setTimeout(() => setCelebrating(false), 5000);
  }, []);

  const years = COUPLE.anniversary.weddingYear
    ? COUPLE.anniversary.year - COUPLE.anniversary.weddingYear
    : null;

  return (
    <section
      id="final"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #2C1810 0%, #1A0F08 50%, #3A1A0E 100%)' }}
    >
      {/* Heart canvas overlay */}
      <HeartCanvas trigger={heartTrigger} continuous />

      {/* Top ornament */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent" />

      {/* Decorative watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.04]">
        <span className="font-script text-white text-[20vw]">Forever</span>
      </div>

      <div className="section-container relative z-10 max-w-3xl">
        <div className="text-center">
          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <p className="font-script text-yellow-300/80 text-4xl md:text-5xl mb-3">
              always &amp; forever
            </p>
            <h2 className="font-serif text-white text-3xl md:text-5xl font-bold leading-tight">
              Forever in Love,{' '}
              <span className="shimmer-text">Forever Blessed</span> ❤️
            </h2>
          </motion.div>

          {/* Animated heart */}
          <motion.div
            className="text-6xl my-8 inline-block"
            animate={{ scale: [1, 1.12, 1], rotate: [0, -6, 6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            💑
          </motion.div>

          {/* Couple photo */}
          <motion.div
            className="mx-auto mb-8 relative"
            style={{ maxWidth: '360px' }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div
              className="rounded-3xl overflow-hidden shadow-2xl"
              style={{ boxShadow: '0 0 40px rgba(201,168,76,0.3)' }}
            >
              <img
                src={`/${FINAL_COUPLE_PHOTO}`}
                alt={`${COUPLE.husband.name} & ${COUPLE.wife.name}`}
                className="w-full h-72 md:h-80 object-cover"
                onError={e => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextSibling.style.display = 'flex';
                }}
              />
              {/* Fallback */}
              <div
                className="hidden w-full h-72 items-center justify-center text-8xl"
                style={{ background: 'linear-gradient(135deg, #7B2D42, #A03552)' }}
              >
                💑
              </div>
            </div>
            {/* Names badge */}
            <div
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap
                px-6 py-2 rounded-full text-sm font-semibold text-amber-900 shadow-lg"
              style={{ background: 'linear-gradient(90deg, #C9A84C, #E8C97A, #C9A84C)' }}
            >
              {COUPLE.husband.name} &amp; {COUPLE.wife.name}
            </div>
          </motion.div>

          {/* Closing message */}
          <motion.div
            className="mt-12 space-y-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <div className="gold-divider mb-6" />

            {years && (
              <p className="font-serif text-yellow-300/80 text-xl md:text-2xl italic">
                {years} years of choosing each other — and counting 🌹
              </p>
            )}

            <p className="text-white/70 text-base md:text-lg leading-relaxed font-light max-w-xl mx-auto">
              As you celebrate another beautiful year of love, may your hearts be full, 
              your home be peaceful, and your love story continue to inspire everyone around you.
              You are living proof that beautiful love exists — and it is worth celebrating every single day.
            </p>

            <p className="font-script text-yellow-300 text-3xl md:text-4xl mt-4">
              Happy Wedding Anniversary! 🎉
            </p>

            <div className="gold-divider mt-6" />

            {/* Send Love button */}
            <motion.button
              onClick={handleSendLove}
              className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-full text-base md:text-lg font-semibold
                bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500
                text-white shadow-2xl cursor-pointer
                hover:from-rose-400 hover:to-pink-400 hover:scale-105
                active:scale-95 transition-all duration-300"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              animate={
                celebrating
                  ? { scale: [1, 1.1, 1], boxShadow: ['0 0 20px rgba(239,68,68,0.5)', '0 0 50px rgba(239,68,68,0.9)', '0 0 20px rgba(239,68,68,0.5)'] }
                  : {}
              }
              transition={celebrating ? { duration: 0.6, repeat: 3 } : {}}
            >
              Send Them More Love ❤️
            </motion.button>
          </motion.div>

          {/* Footer */}
          <motion.div
            className="mt-16 text-white/30 text-xs uppercase tracking-widest"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 1 }}
          >
            <p>Made with ❤️ as a special anniversary gift</p>
            <p className="mt-1">{COUPLE.anniversary.hashtag}</p>
          </motion.div>
        </div>
      </div>

      {/* Bottom ornament */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent" />
    </section>
  );
}
