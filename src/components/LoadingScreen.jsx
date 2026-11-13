import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onDone }) {
  const [phase, setPhase] = useState(0); // 0 = heart, 1 = text, 2 = fade out
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress bar
    const pTimer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(pTimer); return 100; }
        return p + 2;
      });
    }, 30);

    // Phase transitions
    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 2400);
    const t3 = setTimeout(onDone, 3200);

    return () => {
      clearInterval(pTimer);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      {phase < 2 && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #1A0F08 0%, #2C1810 50%, #1A0F08 100%)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Animated heart */}
          <motion.div
            className="text-8xl mb-6"
            initial={{ scale: 0.3, opacity: 0 }}
            animate={
              phase >= 0
                ? { scale: [0.3, 1.3, 1, 1.1, 1], opacity: 1, rotate: [0, -10, 10, -5, 0] }
                : {}
            }
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            ❤️
          </motion.div>

          {/* Script text */}
          <AnimatePresence>
            {phase >= 1 && (
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <p className="font-script text-yellow-300 text-4xl md:text-5xl mb-2">
                  With Love &amp; Celebration
                </p>
                <p className="font-serif text-white/60 text-sm uppercase tracking-widest">
                  A Special Anniversary Gift
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress bar */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48">
            <div className="h-0.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #C9A84C, #E8C97A)' }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
