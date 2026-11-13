import { motion } from 'framer-motion';
import { COUPLE } from '../data/content';

function ProfileCard({ person, side }) {
  const isLeft = side === 'left';

  return (
    <motion.div
      className="relative rounded-3xl overflow-hidden shadow-2xl group"
      initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
      whileHover={{ y: -6 }}
    >
      {/* Photo */}
      <div className="relative h-72 md:h-80 overflow-hidden">
        <img
          src={`/${person.photo}`}
          alt={person.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={e => {
            e.currentTarget.style.display = 'none';
            e.currentTarget.nextSibling.style.display = 'flex';
          }}
        />
        {/* Fallback placeholder */}
        <div
          className="hidden absolute inset-0 items-center justify-center text-6xl"
          style={{ background: 'linear-gradient(135deg, #F2C4CE, #E8A0B0)' }}
        >
          👤
        </div>
        {/* Gradient overlay at bottom of photo */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        {/* Name badge on photo */}
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <span className="font-script text-white text-3xl drop-shadow-lg">{person.name}</span>
        </div>
      </div>

      {/* Content card */}
      <div
        className="p-6 md:p-8"
        style={{
          background: isLeft
            ? 'linear-gradient(135deg, #FDF8F0, #FBF0E8)'
            : 'linear-gradient(135deg, #FBF0E8, #FDF8F0)',
        }}
      >
        {/* Title */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #C9A84C, #E8C97A)' }}
          >
            {person.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-amber-900">{person.name}</h3>
            <p className="text-amber-600/70 text-xs uppercase tracking-widest font-light">
              {isLeft ? 'A Wonderful Husband & Mentor' : 'A Beautiful Wife & Strength'}
            </p>
          </div>
        </div>

        {/* Gold divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-300 to-transparent mb-5" />

        {/* Appreciation text */}
        <p className="text-amber-800/80 text-sm md:text-base leading-relaxed whitespace-pre-line">
          {person.appreciation}
        </p>

        {/* Bottom tag */}
        <div className="mt-5 flex justify-end">
          <span className="font-script text-amber-500/70 text-xl">
            {isLeft ? 'With admiration & respect ✨' : 'With love & gratitude 💕'}
          </span>
        </div>
      </div>

      {/* Gold border glow on hover */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none border-2 border-transparent
          group-hover:border-yellow-400/40 transition-all duration-500"
      />
    </motion.div>
  );
}

export default function AppreciationSection() {
  return (
    <section
      id="appreciation"
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #1A0F08 0%, #2C1810 50%, #1A0F08 100%)' }}
    >
      {/* Top ornament */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />

      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none flex items-center justify-center">
        <span className="font-script text-white text-[20vw]">Forever</span>
      </div>

      <div className="section-container relative z-10">
        {/* Heading */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-script text-yellow-400/80 text-4xl mb-3">celebrating two hearts</p>
          <h2 className="font-serif text-white text-3xl md:text-5xl font-bold">
            Honouring You Both
          </h2>
          <div className="gold-divider mt-5 mb-5" />
          <p className="text-white/40 text-sm uppercase tracking-widest font-light">
            A tribute to two extraordinary people
          </p>
        </motion.div>

        {/* Two profile cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <ProfileCard person={COUPLE.husband} side="left" />
          <ProfileCard person={COUPLE.wife} side="right" />
        </div>

        {/* Closing line */}
        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <p className="font-script text-yellow-300/70 text-3xl">
            Together, you are extraordinary 💛
          </p>
        </motion.div>
      </div>

      {/* Bottom ornament */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />
    </section>
  );
}
