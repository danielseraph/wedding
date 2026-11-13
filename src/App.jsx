import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';

import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import LoveStorySection from './components/LoveStorySection';
import GallerySection from './components/GallerySection';
import SpecialMessageSection from './components/SpecialMessageSection';
import AppreciationSection from './components/AppreciationSection';
import WishCardsSection from './components/WishCardsSection';
import FinalSection from './components/FinalSection';
import MusicPlayer from './components/MusicPlayer';
import { HeartCanvas } from './components/FloatingHearts';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [heroHeartTrigger, setHeroHeartTrigger] = useState(0);

  const handleLoadingDone = useCallback(() => setLoaded(true), []);

  const handleCelebrate = useCallback(() => {
    setHeroHeartTrigger(t => t + 1);
  }, []);

  return (
    <>
      {/* Opening loading screen */}
      <AnimatePresence>
        {!loaded && <LoadingScreen onDone={handleLoadingDone} />}
      </AnimatePresence>

      {loaded && (
        <div className="min-h-screen relative">
          {/* Global ambient heart canvas (gentle continuous drift) */}
          <HeartCanvas trigger={heroHeartTrigger} continuous={false} />

          {/* Navigation */}
          <Navbar />

          {/* Page sections */}
          <main>
            <HeroSection onCelebrate={handleCelebrate} />
            <LoveStorySection />
            <GallerySection />
            <SpecialMessageSection />
            <AppreciationSection />
            <WishCardsSection />
            <FinalSection />
          </main>

          {/* Music player */}
          <MusicPlayer />
        </div>
      )}
    </>
  );
}
