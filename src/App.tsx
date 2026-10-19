import React, { useState } from 'react';
import { OpeningCurtain } from './sections/OpeningCurtain';
import { HeroSection } from './sections/HeroSection';
import { LetterSection } from './sections/LetterSection';
import { MemoryGallerySection } from './sections/MemoryGallerySection';
import { SpecialReasonsSection } from './sections/SpecialReasonsSection';
import { BirthdayCakeSection } from './sections/BirthdayCakeSection';
import { FinalSurpriseSection } from './sections/FinalSurpriseSection';
import { BackgroundParticles } from './components/BackgroundParticles';
import { AmbientSoundtrack } from './components/AmbientSoundtrack';
import { NavigationBar } from './components/NavigationBar';
import { LightboxModal } from './components/LightboxModal';
import { SectionDivider } from './components/SectionDivider';
import { birthdayData } from './config/birthdayConfig';

export const App: React.FC = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [audioTriggered, setAudioTriggered] = useState<boolean>(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const handleOpenExperience = () => {
    setIsOpened(true);
    setAudioTriggered(true);
  };

  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setIsOpened(false);
    }, 400);
  };

  return (
    <div className="relative min-h-screen bg-midnight-950 text-cream-100 selection:bg-gold-500/30 selection:text-gold-200">
      {/* Page 1: Cinematic Opening Curtain */}
      <OpeningCurtain isOpen={isOpened} onOpen={handleOpenExperience} />

      {/* Persistent Ambient Elements */}
      <BackgroundParticles />
      <AmbientSoundtrack isAutoplayTriggered={audioTriggered} />
      
      {/* Main Experience (Visible once opened) */}
      {isOpened && <NavigationBar />}

      <main className="relative z-10 flex flex-col">
        {/* Page 2: Main Birthday Hero */}
        <HeroSection />

        {/* Section Divider 1: Leading to the Letter */}
        <SectionDivider chapter="CHAPTER I" title="A HEARTFELT LETTER" />

        {/* Page 3: A Personal Birthday Letter */}
        <LetterSection />

        {/* Section Divider 2: Leading to Memories */}
        <SectionDivider chapter="CHAPTER II" title="GLIMPSES OF MEMORIES" />

        {/* Page 4: Photo Memories Gallery */}
        <MemoryGallerySection onPhotoClick={(index) => setActivePhotoIndex(index)} />

        {/* Section Divider 3: Leading to Special Reasons */}
        <SectionDivider chapter="CHAPTER III" title="WHAT MAKES YOU SPECIAL" />

        {/* Page 5: Reasons You're Special */}
        <SpecialReasonsSection />

        {/* Section Divider 4: Leading to the Cake Climax */}
        <SectionDivider chapter="CHAPTER IV" title="A MOMENT OF MAGIC" />

        {/* Page 6: Birthday Wishes & Interactive Cake */}
        <BirthdayCakeSection />

        {/* Section Divider 5: Leading to the Finale */}
        <SectionDivider chapter="CHAPTER V" title="CELEBRATION & CLOSING" />

        {/* Page 7: Final Surprise & Closing */}
        <FinalSurpriseSection onReplay={handleReplay} />
      </main>

      {/* Gallery Lightbox Modal */}
      <LightboxModal
        photos={birthdayData.galleryPhotos}
        currentIndex={activePhotoIndex}
        onClose={() => setActivePhotoIndex(null)}
        onSelectIndex={(index) => setActivePhotoIndex(index)}
      />
    </div>
  );
};

export default App;
