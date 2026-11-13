import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: 'easeOut' } },
};

export default function SpecialMessageSection() {
  return (
    <section
      id="message"
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #FDF8F0 0%, #FBF0E8 100%)' }}
    >
      {/* Background watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03]">
        <span className="font-serif text-amber-900 text-[20vw] font-bold">Love</span>
      </div>

      {/* Decorative petals */}
      <div className="absolute top-10 left-10 text-5xl opacity-10 rotate-12 select-none">🌹</div>
      <div className="absolute top-20 right-10 text-4xl opacity-10 -rotate-20 select-none">🌸</div>
      <div className="absolute bottom-20 left-16 text-5xl opacity-10 rotate-6 select-none">💐</div>
      <div className="absolute bottom-10 right-16 text-4xl opacity-10 -rotate-12 select-none">🌹</div>

      <div className="section-container relative z-10 max-w-3xl">
        {/* Heading */}
        <motion.div
          className="text-center mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.p variants={itemVariants} className="font-script text-amber-600 text-4xl mb-3">
            from the heart
          </motion.p>
          <motion.h2 variants={itemVariants} className="font-serif text-3xl md:text-5xl font-bold text-amber-900">
            A Love Worth Celebrating
          </motion.h2>
          <motion.div variants={itemVariants}>
            <div className="gold-divider mt-5" />
          </motion.div>
        </motion.div>

        {/* Message card */}
        <motion.div
          className="relative rounded-3xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          {/* Card background */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, #7B2D42 0%, #A03552 40%, #7B2D42 70%, #5C1D2E 100%)',
            }}
          />

          {/* Decorative ring */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="w-72 h-72 md:w-96 md:h-96 rounded-full border border-yellow-400/10"
              style={{ boxShadow: '0 0 60px rgba(201,168,76,0.08) inset' }}
            />
          </div>

          <div className="relative z-10 p-8 md:p-14 text-center">
            {/* Opening heart */}
            <motion.div
              className="text-5xl mb-6 inline-block"
              animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              ❤️
            </motion.div>

            {/* Message paragraphs */}
            <motion.div
              className="space-y-5 text-left md:text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={containerVariants}
            >
              {[
                `Today, we celebrate more than just another year of marriage. We celebrate a beautiful journey of love, patience, sacrifice, friendship, and unwavering commitment.`,
                `Your marriage is a beautiful reminder that true love is not just about finding the right person, but about choosing each other every single day — with all your heart, without reservation, without condition.`,
                `May the years ahead bring you even greater happiness, deeper love, endless laughter, good health, peace, and countless beautiful memories that warm your hearts for a lifetime.`,
                `May God continue to strengthen your union, bless your home, guard your hearts, and keep the flame of your love burning brighter with every passing year.`,
              ].map((para, i) => (
                <motion.p
                  key={i}
                  variants={itemVariants}
                  className="text-white/90 text-base md:text-lg leading-relaxed font-light"
                >
                  {para}
                </motion.p>
              ))}

              <motion.div variants={itemVariants} className="pt-4">
                <div className="w-20 h-px bg-yellow-400/40 mx-auto mb-5" />
                <p className="font-serif text-yellow-300 text-xl md:text-2xl italic font-semibold">
                  Happy Wedding Anniversary to an amazing couple! 🎉
                </p>
              </motion.div>
            </motion.div>

            {/* Closing ornament */}
            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-yellow-400/40" />
              <span className="text-yellow-300/60 text-2xl">✦</span>
              <div className="h-px w-12 bg-yellow-400/40" />
            </div>
          </div>
        </motion.div>

        {/* Scripture quote */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          <p className="font-serif text-amber-800/70 text-sm md:text-base italic leading-relaxed">
            "Two are better than one, because they have a good reward for their labour."
          </p>
          <p className="text-amber-600/60 text-xs mt-1 tracking-widest uppercase">— Ecclesiastes 4:9</p>
        </motion.div>
      </div>
    </section>
  );
}
