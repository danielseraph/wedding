import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HERO_IMAGES, COUPLE } from '../data/content';

const fadeVariants = {
  enter: { opacity: 0, scale: 1.04 },
  center: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.97 },
};

export default function HeroSection({ onCelebrate }) {
  const [currentImg, setCurrentImg] = useState(0);
  const [heartBeat, setHeartBeat] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg(i => (i + 1) % HERO_IMAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleCelebrate = () => {
    setHeartBeat(true);
    setTimeout(() => setHeartBeat(false), 1000);
    onCelebrate();
    document.getElementById('love-story')?.scrollIntoView({ behavior: 'smooth' });
  };

  const years = COUPLE.anniversary.weddingYear
    ? COUPLE.anniversary.year - COUPLE.anniversary.weddingYear
    : null;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={currentImg}
            className="absolute inset-0"
            variants={fadeVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 1.4, ease: 'easeInOut' }}
          >
            <img
              src={`/${HERO_IMAGES[currentImg]}`}
              alt="Anniversary"
              className="w-full h-full object-cover"
              onError={e => { e.currentTarget.style.display = 'none'; }}
            />
          </motion.div>
        </AnimatePresence>
        {/* Layered overlays for depth and readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 z-10" />
      </div>

      {/* Decorative gold corner ornaments */}
      <div className="absolute top-6 left-6 z-20 opacity-70">
        <div className="w-12 h-12 border-t-2 border-l-2 border-yellow-300/70 rounded-tl-sm" />
      </div>
      <div className="absolute top-6 right-6 z-20 opacity-70">
        <div className="w-12 h-12 border-t-2 border-r-2 border-yellow-300/70 rounded-tr-sm" />
      </div>
      <div className="absolute bottom-6 left-6 z-20 opacity-70">
        <div className="w-12 h-12 border-b-2 border-l-2 border-yellow-300/70 rounded-bl-sm" />
      </div>
      <div className="absolute bottom-6 right-6 z-20 opacity-70">
        <div className="w-12 h-12 border-b-2 border-r-2 border-yellow-300/70 rounded-br-sm" />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        {/* Script tagline */}
        <motion.p
          className="font-script text-yellow-200 text-4xl md:text-5xl mb-4 drop-shadow-lg"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1.2, ease: 'easeOut' }}
        >
          Celebrating a Beautiful Journey of Love
        </motion.p>

        {/* Animated heart */}
        <motion.div
          className="text-5xl md:text-6xl my-4 inline-block"
          animate={
            heartBeat
              ? { scale: [1, 1.5, 1.2, 1.4, 1], rotate: [0, -10, 10, -5, 0] }
              : { scale: [1, 1.08, 1], rotate: [0, -3, 3, 0] }
          }
          transition={
            heartBeat
              ? { duration: 0.8, ease: 'easeInOut' }
              : { duration: 2, repeat: Infinity, ease: 'easeInOut' }
          }
        >
          ❤️
        </motion.div>

        {/* Names */}
        <motion.div
          className="mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          <h1 className="font-serif text-white text-5xl md:text-7xl lg:text-8xl font-bold drop-shadow-2xl leading-tight">
            <span className="shimmer-text">{COUPLE.husband.name}</span>
            <span className="text-yellow-200/80 mx-3 md:mx-5 font-light text-4xl md:text-6xl">&amp;</span>
            <span className="shimmer-text">{COUPLE.wife.name}</span>
          </h1>
        </motion.div>

        {/* Anniversary label */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
        >
          {years && (
            <p className="text-yellow-300 font-serif text-xl md:text-2xl italic mb-1">
              {years} Beautiful Years Together
            </p>
          )}
          <div className="gold-divider my-3" />
          <h2 className="font-serif text-white text-2xl md:text-3xl font-light tracking-widest uppercase drop-shadow-lg">
            Happy Wedding Anniversary
          </h2>
          <div className="gold-divider my-3" />
        </motion.div>

        {/* Intro message */}
        <motion.p
          className="text-white/85 text-base md:text-lg font-light max-w-xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          Two hearts, one extraordinary love story. Today we pause to honour a 
          union that is a testament to grace, commitment, and the kind of love 
          that only grows more beautiful with time.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          onClick={handleCelebrate}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base md:text-lg font-semibold
            bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500
            text-amber-900 shadow-2xl glow-gold
            hover:from-yellow-300 hover:to-amber-400 hover:scale-105
            active:scale-95 transition-all duration-300 cursor-pointer"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
        >
          Celebrate Their Love ❤️
        </motion.button>

        {/* Scroll indicator */}
        <motion.div
          className="mt-10 flex flex-col items-center gap-1 text-white/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
        >
          <span className="text-xs tracking-widest uppercase">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.4, repeat: Infinity }}
            className="text-yellow-300/60 text-xl"
          >
            ↓
          </motion.div>
        </motion.div>
      </div>

      {/* Dot indicators for slideshow */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentImg(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === currentImg ? 'bg-yellow-300 scale-125 w-5' : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
