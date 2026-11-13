import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pause, Music2, Volume2, VolumeX } from 'lucide-react';

// ── Animated music bars (equaliser visualiser) ────────────
function MusicBars({ playing }) {
  const bars = [1, 1.6, 0.8, 1.4, 1];
  return (
    <div className="flex items-end gap-[2.5px] h-5">
      {bars.map((scale, i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full bg-gradient-to-t from-yellow-500 to-yellow-200"
          style={{ originY: 1 }}
          animate={
            playing
              ? {
                  scaleY: [0.3, scale, 0.5, scale * 0.8, 1, scale],
                  opacity: [0.7, 1, 0.8, 1],
                }
              : { scaleY: 0.3, opacity: 0.4 }
          }
          transition={
            playing
              ? {
                  duration: 0.7 + i * 0.15,
                  repeat: Infinity,
                  repeatType: 'mirror',
                  ease: 'easeInOut',
                  delay: i * 0.1,
                }
              : { duration: 0.3 }
          }
          initial={{ scaleY: 0.3, height: '20px' }}
        />
      ))}
    </div>
  );
}

// ── Main music player ─────────────────────────────────────
export default function MusicPlayer() {
  const audioRef = useRef(null);
  const fadeInterval = useRef(null);

  const [playing, setPlaying] = useState(false);
  // Start muted — browsers allow muted autoplay
  const [muted, setMuted] = useState(true);
  const [needsUnmute, setNeedsUnmute] = useState(false); // show "Tap to Unmute" prompt
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(false);

  // Show player after loading screen (≈3.5 s)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 3500);
    return () => clearTimeout(t);
  }, []);

  // ── Fade volume up ────────────────────────────────────
  const fadeIn = useCallback((audio) => {
    clearInterval(fadeInterval.current);
    // Don't touch volume while muted — just track state
    if (!audio.muted) {
      audio.volume = 0;
      fadeInterval.current = setInterval(() => {
        if (audio.volume < 0.85) {
          audio.volume = Math.min(audio.volume + 0.03, 0.85);
        } else {
          clearInterval(fadeInterval.current);
        }
      }, 60);
    }
  }, []);

  // ── Fade volume down then pause ───────────────────────
  const fadeOut = useCallback((audio, cb) => {
    clearInterval(fadeInterval.current);
    if (audio.muted) {
      audio.pause();
      cb?.();
      return;
    }
    fadeInterval.current = setInterval(() => {
      if (audio.volume > 0.03) {
        audio.volume = Math.max(audio.volume - 0.04, 0);
      } else {
        clearInterval(fadeInterval.current);
        audio.pause();
        audio.volume = 0;
        cb?.();
      }
    }, 60);
  }, []);

  // ── Autoplay muted on mount (browsers always allow this) ─
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const tryAutoplay = async () => {
      try {
        audio.muted = true;        // muted autoplay — always allowed
        audio.volume = 0.85;
        await audio.play();
        setPlaying(true);
        setMuted(true);
        setNeedsUnmute(true);      // show the "Tap to Unmute" nudge
      } catch {
        // Even muted autoplay failed (very rare) — just show prompt
        setPlaying(false);
        setNeedsUnmute(true);
      }
    };

    const t = setTimeout(tryAutoplay, 4000);
    return () => {
      clearTimeout(t);
      clearInterval(fadeInterval.current);
    };
  }, []);

  // ── Unmute: called when user taps the prompt or the volume icon ─
  const unmute = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    setNeedsUnmute(false);

    if (!playing) {
      // Wasn't playing at all — start it
      try {
        audio.muted = false;
        audio.volume = 0;
        await audio.play();
        fadeIn(audio);
        setPlaying(true);
        setMuted(false);
      } catch { /* still blocked — do nothing */ }
      return;
    }

    // Was playing muted — just unmute with fade
    audio.muted = false;
    audio.volume = 0;
    fadeIn(audio);
    setMuted(false);
  }, [playing, fadeIn]);

  // ── Play / Pause toggle ───────────────────────────────
  const toggle = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      fadeOut(audio, () => setPlaying(false));
    } else {
      try {
        audio.muted = muted;
        await audio.play();
        if (!muted) fadeIn(audio);
        setPlaying(true);
      } catch { /* blocked */ }
    }
  }, [playing, muted, fadeIn, fadeOut]);

  // ── Volume / mute toggle ──────────────────────────────
  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (muted) {
      unmute();
    } else {
      audio.muted = true;
      setMuted(true);
    }
  }, [muted, unmute]);

  if (!visible) return null;

  return (
    <>
      <audio
        ref={audioRef}
        src="/song/Westlife - Beautiful in White.mp3"
        loop
        preload="auto"
        onError={() => console.warn('Audio could not be loaded.')}
      />

      {/* ── "Tap to Unmute" elegant prompt ─────────────────── */}
      <AnimatePresence>
        {needsUnmute && (
          <motion.div
            className="fixed bottom-24 right-6 z-50"
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <motion.button
              onClick={unmute}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold
                text-amber-900 shadow-2xl cursor-pointer border border-yellow-400/30"
              style={{
                background: 'linear-gradient(135deg, #C9A84C 0%, #E8C97A 50%, #C9A84C 100%)',
                boxShadow: '0 8px 32px rgba(201,168,76,0.4)',
              }}
              animate={{
                boxShadow: [
                  '0 8px 32px rgba(201,168,76,0.3)',
                  '0 8px 48px rgba(201,168,76,0.65)',
                  '0 8px 32px rgba(201,168,76,0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-base">🔇</span>
              Tap to Unmute ❤️
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating player widget ──────────────────────────── */}
      <motion.div
        className="fixed bottom-6 right-6 z-50 select-none"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <AnimatePresence mode="wait">
          {expanded ? (
            /* ── Expanded card ── */
            <motion.div
              key="expanded"
              className="rounded-2xl overflow-hidden shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(26,15,8,0.97) 0%, rgba(44,24,16,0.97) 100%)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(201,168,76,0.25)',
                width: '248px',
              }}
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Top gold bar */}
              <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />

              <div className="p-4">
                {/* Header row */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #C9A84C, #E8C97A)' }}
                    >
                      <Music2 size={15} className="text-amber-900" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-yellow-300 text-[11px] font-semibold uppercase tracking-widest leading-none mb-0.5">
                        Now Playing
                      </p>
                      <p className="text-white/60 text-[10px] leading-none truncate">
                        Our Anniversary Song
                      </p>
                    </div>
                  </div>
                  {/* Collapse */}
                  <button
                    onClick={() => setExpanded(false)}
                    className="text-white/30 hover:text-white/70 text-xs transition-colors leading-none ml-2"
                    title="Collapse"
                  >
                    ✕
                  </button>
                </div>

                {/* Song info */}
                <div className="mb-3 px-1">
                  <p className="font-serif text-white text-sm font-semibold leading-snug">
                    Beautiful in White
                  </p>
                  <p className="text-white/40 text-xs mt-0.5">Westlife</p>
                </div>

                {/* Visualiser bars */}
                <div className="flex justify-center mb-3">
                  <MusicBars playing={playing && !muted} />
                </div>

                {/* Shimmer progress (plays while music is on) */}
                {playing && (
                  <div className="mb-3 h-0.5 rounded-full overflow-hidden bg-white/10">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: 'linear-gradient(90deg, transparent, #C9A84C, #E8C97A, #C9A84C, transparent)',
                        width: '40%',
                      }}
                      animate={{ x: ['-100%', '300%'] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                    />
                  </div>
                )}

                {/* Muted notice */}
                {muted && playing && (
                  <motion.button
                    onClick={unmute}
                    className="w-full mb-3 py-1.5 rounded-xl text-xs font-semibold text-amber-900 cursor-pointer"
                    style={{ background: 'linear-gradient(90deg, #C9A84C, #E8C97A)' }}
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    whileTap={{ scale: 0.97 }}
                  >
                    🔇 Tap to Unmute
                  </motion.button>
                )}

                {/* Controls */}
                <div className="flex items-center justify-between gap-2">
                  {/* Volume / mute */}
                  <button
                    onClick={toggleMute}
                    className="w-8 h-8 rounded-full flex items-center justify-center
                      bg-white/8 hover:bg-white/15 text-white/50 hover:text-white/90
                      transition-all duration-200"
                    title={muted ? 'Unmute' : 'Mute'}
                  >
                    {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                  </button>

                  {/* Play / Pause */}
                  <motion.button
                    onClick={toggle}
                    className="w-11 h-11 rounded-full flex items-center justify-center
                      shadow-lg cursor-pointer transition-all duration-200"
                    style={{ background: 'linear-gradient(135deg, #C9A84C 0%, #E8C97A 100%)' }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.92 }}
                  >
                    {playing
                      ? <Pause size={18} className="text-amber-900" />
                      : <span className="text-amber-900 font-bold text-lg ml-0.5">▶</span>
                    }
                  </motion.button>

                  {/* Heart */}
                  <div className="w-8 h-8 flex items-center justify-center">
                    <motion.span
                      className="text-base"
                      animate={{ scale: (playing && !muted) ? [1, 1.2, 1] : 1 }}
                      transition={{ duration: 1.4, repeat: (playing && !muted) ? Infinity : 0 }}
                    >
                      ❤️
                    </motion.span>
                  </div>
                </div>
              </div>

              {/* Bottom gold bar */}
              <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent" />
            </motion.div>
          ) : (
            /* ── Mini pill ── */
            <motion.button
              key="mini"
              onClick={() => setExpanded(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full shadow-xl cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, rgba(26,15,8,0.95), rgba(44,24,16,0.95))',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(201,168,76,0.3)',
                boxShadow: (playing && !muted)
                  ? '0 4px 24px rgba(201,168,76,0.35)'
                  : '0 4px 16px rgba(0,0,0,0.4)',
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              <MusicBars playing={playing && !muted} />
              <span className="text-white/70 text-xs font-light whitespace-nowrap">
                {muted && playing ? '🔇 Muted' : playing ? 'Now Playing' : 'Music'}
              </span>
              <motion.span
                className="text-sm"
                animate={{ scale: (playing && !muted) ? [1, 1.15, 1] : 1 }}
                transition={{ duration: 1.5, repeat: (playing && !muted) ? Infinity : 0 }}
              >
                🎵
              </motion.span>
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
