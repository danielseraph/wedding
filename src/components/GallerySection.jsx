import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GALLERY_IMAGES } from '../data/content';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

// ── Lightbox ──────────────────────────────────────────────
function Lightbox({ images, startIndex, onClose }) {
  const [current, setCurrent] = useState(startIndex);
  const [loaded, setLoaded] = useState(false);

  const prev = useCallback(() => {
    setLoaded(false);
    setCurrent(i => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const next = useCallback(() => {
    setLoaded(false);
    setCurrent(i => (i + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    const handleKey = e => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, prev, next]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const img = images[current];

  return (
    <motion.div
      className="lightbox-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25
          flex items-center justify-center text-white transition-all duration-200"
        onClick={onClose}
      >
        <X size={22} />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 text-white/60 text-sm">
        {current + 1} / {images.length}
      </div>

      {/* Prev */}
      <button
        className="absolute left-3 md:left-6 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25
          flex items-center justify-center text-white transition-all duration-200"
        onClick={e => { e.stopPropagation(); prev(); }}
      >
        <ChevronLeft size={26} />
      </button>

      {/* Image */}
      <motion.div
        key={current}
        className="relative max-w-5xl max-h-[85vh] w-full px-16"
        initial={{ opacity: 0, scale: 0.93 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.35 }}
        onClick={e => e.stopPropagation()}
      >
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 border-2 border-yellow-400/40 border-t-yellow-400 rounded-full animate-spin" />
          </div>
        )}
        <img
          src={`/${img.src}`}
          alt={img.caption}
          className="w-full h-auto max-h-[80vh] object-contain rounded-xl shadow-2xl"
          style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.3s' }}
          onLoad={() => setLoaded(true)}
          onError={e => { e.currentTarget.style.display = 'none'; }}
        />
        {/* Caption */}
        {loaded && img.caption && (
          <motion.p
            className="text-center text-white/80 text-sm font-light mt-3 italic"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
          >
            ✨ {img.caption}
          </motion.p>
        )}
      </motion.div>

      {/* Next */}
      <button
        className="absolute right-3 md:right-6 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25
          flex items-center justify-center text-white transition-all duration-200"
        onClick={e => { e.stopPropagation(); next(); }}
      >
        <ChevronRight size={26} />
      </button>

      {/* Thumbnail strip */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 px-4 overflow-x-auto">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={e => { e.stopPropagation(); setLoaded(false); setCurrent(i); }}
            className={`flex-shrink-0 w-10 h-10 rounded-lg overflow-hidden transition-all duration-200
              ${i === current ? 'ring-2 ring-yellow-400 scale-110' : 'opacity-50 hover:opacity-80'}`}
          >
            <img
              src={`/${img.src}`}
              alt=""
              className="w-full h-full object-cover"
              onError={e => { e.currentTarget.style.display = 'none'; }}
            />
          </button>
        ))}
      </div>
    </motion.div>
  );
}

// ── Gallery Card ──────────────────────────────────────────
function GalleryCard({ image, index, onClick }) {
  const [imgError, setImgError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (imgError) return null;

  return (
    <motion.div
      className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-md hover:shadow-2xl
        transition-shadow duration-300"
      style={{
        // Masonry-like varying heights
        gridRowEnd: `span ${index % 5 === 0 ? 2 : index % 3 === 0 ? 3 : 2}`,
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.07 }}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
    >
      {/* Loading shimmer */}
      {!loaded && !imgError && (
        <div className="absolute inset-0 bg-gradient-to-r from-amber-100 via-amber-50 to-amber-100
          animate-pulse rounded-2xl" />
      )}

      <img
        src={`/${image.src}`}
        alt={image.caption}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.4s', minHeight: '180px' }}
        onLoad={() => setLoaded(true)}
        onError={() => setImgError(true)}
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent
        opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <div className="flex items-center gap-2 text-white">
          <ZoomIn size={16} className="text-yellow-300" />
          <p className="text-sm font-light italic truncate">{image.caption}</p>
        </div>
      </div>

      {/* Heart badge on hover */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-lg drop-shadow-lg">❤️</span>
      </div>
    </motion.div>
  );
}

// ── Main Gallery Section ──────────────────────────────────
export default function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Filter out any that might 404 — we gracefully handle this per-card
  const images = GALLERY_IMAGES;

  return (
    <section
      id="gallery"
      className="py-24 md:py-32 relative"
      style={{ background: 'linear-gradient(180deg, #2C1810 0%, #1A0F08 100%)' }}
    >
      {/* Top ornament */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent" />

      <div className="section-container">
        {/* Heading */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-script text-yellow-400/80 text-4xl mb-3">moments captured</p>
          <h2 className="font-serif text-white text-3xl md:text-5xl font-bold">
            A Gallery of Beautiful Memories
          </h2>
          <div className="gold-divider mt-5 mb-5" />
          <p className="text-white/50 text-sm uppercase tracking-widest font-light">
            Click any photo to view in full screen
          </p>
        </motion.div>

        {/* Masonry grid */}
        <div
          className="grid gap-3"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gridAutoRows: '130px',
          }}
        >
          {images.map((image, index) => (
            <GalleryCard
              key={image.src}
              image={image}
              index={index}
              onClick={() => setLightboxIndex(index)}
            />
          ))}
        </div>
      </div>

      {/* Bottom ornament */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent" />

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={images}
            startIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
