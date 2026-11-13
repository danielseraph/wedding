import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WISH_CARDS } from '../data/content';

function WishCard({ card, index }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      className="flip-card h-52 cursor-pointer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={() => setFlipped(f => !f)}
      whileHover={{ scale: flipped ? 1 : 1.03 }}
    >
      <div className={`flip-card-inner h-full ${flipped ? 'flipped' : ''}`}>
        {/* Front */}
        <div
          className={`flip-card-front h-full rounded-2xl border-2 ${card.borderColor}
            bg-gradient-to-br ${card.color}
            flex flex-col items-center justify-center gap-3 p-6 shadow-lg`}
        >
          <span className="text-5xl">{card.icon}</span>
          <p className="font-serif text-center text-amber-900 font-semibold text-base md:text-lg leading-snug">
            {card.front}
          </p>
          <p className="text-amber-600/60 text-xs uppercase tracking-widest mt-1">
            Tap to reveal ✨
          </p>
        </div>

        {/* Back */}
        <div
          className="flip-card-back h-full rounded-2xl
            flex flex-col items-center justify-center gap-3 p-6 shadow-xl"
          style={{
            background: 'linear-gradient(135deg, #7B2D42 0%, #A03552 100%)',
          }}
        >
          <span className="text-3xl mb-1">{card.icon}</span>
          <p className="text-white/90 text-sm md:text-base text-center leading-relaxed italic font-light">
            {card.back}
          </p>
          <div className="mt-2 text-yellow-300/60 text-lg">❤️</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function WishCardsSection() {
  return (
    <section
      id="wishes"
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #FDF8F0 0%, #FBF0E8 100%)' }}
    >
      {/* Background watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03]">
        <span className="font-script text-amber-900 text-[18vw]">Wishes</span>
      </div>

      {/* Top ornament */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent" />

      <div className="section-container relative z-10">
        {/* Heading */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-script text-amber-600 text-4xl mb-3">with all our love</p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-amber-900">
            Sending You Love & Beautiful Wishes
          </h2>
          <div className="gold-divider mt-5 mb-5" />
          <p className="text-amber-700/60 text-sm font-light">
            Tap each card to reveal a special message for you 💌
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {WISH_CARDS.map((card, i) => (
            <WishCard key={i} card={card} index={i} />
          ))}
        </div>

        {/* Footer tagline */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          <p className="font-script text-amber-600/70 text-2xl md:text-3xl">
            May every wish find its way to your hearts 💛
          </p>
        </motion.div>
      </div>

      {/* Bottom ornament */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
    </section>
  );
}
