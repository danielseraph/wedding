import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COUPLE } from '../data/content';

const NAV_ITEMS = [
  { label: 'Home', href: '#hero' },
  { label: 'Love Story', href: '#love-story' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Message', href: '#message' },
  { label: 'Tribute', href: '#appreciation' },
  { label: 'Wishes', href: '#wishes' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = href => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'backdrop-blur-md border-b border-yellow-400/20'
            : ''
        }`}
        style={{
          background: scrolled
            ? 'rgba(26, 15, 8, 0.90)'
            : 'transparent',
        }}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo / names */}
          <button
            onClick={() => handleNav('#hero')}
            className="font-script text-yellow-300 text-2xl hover:text-yellow-200 transition-colors"
          >
            {COUPLE.husband.shortName} &amp; {COUPLE.wife.shortName}
          </button>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map(item => (
              <li key={item.href}>
                <button
                  onClick={() => handleNav(item.href)}
                  className="text-white/70 hover:text-yellow-300 text-sm font-light tracking-wide
                    transition-colors duration-200 uppercase"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <motion.span
              className="block w-6 h-0.5 bg-white/80"
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
            />
            <motion.span
              className="block w-6 h-0.5 bg-white/80"
              animate={{ opacity: menuOpen ? 0 : 1 }}
            />
            <motion.span
              className="block w-6 h-0.5 bg-white/80"
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-30 flex flex-col pt-16"
            style={{ background: 'rgba(26,15,8,0.97)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="flex flex-col items-center justify-center flex-1 gap-7">
              {NAV_ITEMS.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <button
                    onClick={() => handleNav(item.href)}
                    className="text-white/80 hover:text-yellow-300 text-2xl font-light tracking-widest uppercase transition-colors"
                  >
                    {item.label}
                  </button>
                </motion.li>
              ))}
            </ul>
            <p className="text-center text-white/20 text-xs pb-6 font-script">
              {COUPLE.husband.name} &amp; {COUPLE.wife.name} ❤️
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
