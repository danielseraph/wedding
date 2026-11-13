import { useRef } from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

function AnimatedSection({ children, className = '' }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={containerVariants}
    >
      {children}
    </motion.div>
  );
}

function AnimatedItem({ children, className = '' }) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

export default function LoveStorySection() {
  return (
    <section
      id="love-story"
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #FDF8F0 0%, #FBF0E8 50%, #F9EBE0 100%)' }}
    >
      {/* Decorative background text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03]"
        aria-hidden
      >
        <span className="font-script text-amber-900 text-[18vw] leading-none">Love</span>
      </div>

      {/* Top ornament */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent" />

      <div className="section-container relative z-10">
        {/* Section heading */}
        <AnimatedSection className="text-center mb-16">
          <AnimatedItem>
            <p className="font-script text-amber-600 text-4xl md:text-5xl mb-3">their journey</p>
          </AnimatedItem>
          <AnimatedItem>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-amber-900 leading-tight">
              Two Hearts, One Beautiful Journey
            </h2>
          </AnimatedItem>
          <AnimatedItem>
            <div className="gold-divider mt-5 mb-6" />
            <p className="text-amber-700/70 text-sm uppercase tracking-widest font-light">
              A love story written in grace &amp; devotion
            </p>
          </AnimatedItem>
        </AnimatedSection>

        {/* Story paragraphs arranged with decorative layout */}
        <div className="max-w-3xl mx-auto space-y-10">

          <AnimatedSection>
            <AnimatedItem>
              <div className="relative pl-6 border-l-2 border-amber-300">
                <span className="font-script text-amber-500 text-6xl absolute -left-4 -top-4 opacity-30">❝</span>
                <p className="font-serif text-lg md:text-xl text-amber-900/85 leading-relaxed italic">
                  There are love stories told in the pages of books, celebrated in the frames of films — 
                  and then there are love stories that simply live and breathe before our very eyes, 
                  reminding us every day that true love is not fiction. It is real, it is patient, 
                  and it is extraordinary.
                </p>
              </div>
            </AnimatedItem>
          </AnimatedSection>

          <AnimatedSection>
            <AnimatedItem>
              <p className="text-amber-800/80 text-base md:text-lg leading-relaxed">
                Their love did not arrive with the fanfare of fireworks or the rush of a perfect fairy tale. 
                It grew the way the most beautiful things in life grow — quietly, steadily, and with 
                unshakeable roots. It was built on early mornings and late evenings, on 
                laughter shared over ordinary meals, on the grace to forgive, and the courage to stay.
              </p>
            </AnimatedItem>
          </AnimatedSection>

          {/* Featured quote card */}
          <AnimatedSection>
            <AnimatedItem>
              <div
                className="rounded-3xl p-8 md:p-10 text-center shadow-xl relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #7B2D42 0%, #A03552 60%, #C06070 100%)',
                }}
              >
                <div className="absolute inset-0 opacity-10 pointer-events-none select-none flex items-center justify-center">
                  <span className="font-script text-white text-[12rem] leading-none">∞</span>
                </div>
                <p className="font-script text-yellow-200 text-5xl mb-2">❤️</p>
                <p className="font-serif text-white text-xl md:text-2xl italic leading-relaxed relative z-10">
                  "True love is not about finding the perfect person — it is about choosing each other, 
                  every single day, through every season of life."
                </p>
              </div>
            </AnimatedItem>
          </AnimatedSection>

          <AnimatedSection>
            <AnimatedItem>
              <p className="text-amber-800/80 text-base md:text-lg leading-relaxed">
                They have known each other through seasons of abundance and seasons of stretching — 
                through the joy of celebrations and the quiet strength required during life's harder chapters. 
                And through it all, they have been each other's safe harbour. 
                They have held hands across every storm and danced together in every sunlight.
              </p>
            </AnimatedItem>
          </AnimatedSection>

          <AnimatedSection>
            <AnimatedItem>
              <p className="text-amber-800/80 text-base md:text-lg leading-relaxed">
                Their marriage is not just a legal union — it is a covenant, a commitment renewed with 
                every sunrise. It is friendship deep enough to weather silence. 
                It is patience worn not as a burden but as a beautiful choice. 
                It is sacrifice offered not with reluctance, but with love.
              </p>
            </AnimatedItem>
          </AnimatedSection>

          {/* Stats / milestones row */}
          <AnimatedSection>
            <AnimatedItem>
              <div className="grid grid-cols-3 gap-4 py-8">
                {[
                  { icon: '🤝', label: 'One Promise' },
                  { icon: '💑', label: 'Two Souls' },
                  { icon: '♾️', label: 'Endless Love' },
                ].map(({ icon, label }) => (
                  <div
                    key={label}
                    className="text-center p-4 rounded-2xl"
                    style={{ background: 'rgba(201,168,76,0.12)' }}
                  >
                    <div className="text-4xl mb-2">{icon}</div>
                    <p className="font-serif text-amber-800 font-semibold text-sm md:text-base">{label}</p>
                  </div>
                ))}
              </div>
            </AnimatedItem>
          </AnimatedSection>

          <AnimatedSection>
            <AnimatedItem>
              <p className="text-amber-800/80 text-base md:text-lg leading-relaxed">
                What makes their love truly remarkable is not the grand gestures — it is the quiet consistency. 
                It is the hand reached out in the dark, the prayer whispered for each other before sleep, 
                the inside jokes only they understand, and the way they still look at each other with eyes 
                that say "I am still so glad it is you."
              </p>
            </AnimatedItem>
          </AnimatedSection>

          <AnimatedSection>
            <AnimatedItem>
              <div className="text-center pt-4">
                <p className="font-script text-amber-600 text-3xl md:text-4xl">
                  And the most beautiful chapter is still being written…
                </p>
              </div>
            </AnimatedItem>
          </AnimatedSection>
        </div>
      </div>

      {/* Bottom ornament */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
    </section>
  );
}
