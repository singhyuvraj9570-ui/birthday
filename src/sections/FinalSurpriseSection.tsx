import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, RotateCcw, Sparkles } from 'lucide-react';
import { birthdayData } from '../config/birthdayConfig';
import { triggerFirecrackers } from '../components/ConfettiBurst';
import { ambientSynth } from '../utils/audioSynth';

interface FinalSurpriseSectionProps {
  onReplay: () => void;
}

export const FinalSurpriseSection: React.FC<FinalSurpriseSectionProps> = ({ onReplay }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <footer className="relative min-h-screen py-24 px-4 sm:px-6 flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Cinematic Ambient Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-midnight-950 to-transparent pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[650px] h-[500px] bg-gradient-to-t from-burgundy-900/30 via-gold-600/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        {/* Heart icon header with gesture tap */}
        <motion.button
          type="button"
          onClick={() => ambientSynth.playSoftPop()}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.2, rotate: 6 }}
          whileTap={{ scale: 0.85 }}
          transition={{ duration: 0.5 }}
          className="w-14 h-14 rounded-full bg-burgundy-950/80 border border-gold-500/30 flex items-center justify-center text-roseGold-400 mb-8 shadow-xl cursor-pointer group"
          title="With all our love"
        >
          <Heart className="w-6 h-6 fill-roseGold-400/30 text-roseGold-400 group-hover:fill-roseGold-400 animate-pulse transition-colors" />
        </motion.button>

        {/* Closing Sentences */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif italic text-xl sm:text-2xl text-gold-300/80 tracking-wide mb-4"
        >
          {birthdayData.finalSurprise.line1}
        </motion.p>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-cream-50 font-light leading-snug tracking-wide max-w-2xl mb-8"
        >
          {birthdayData.finalSurprise.line2}
        </motion.h3>

        {/* Small Elegant Portrait Vignette with Gesture Tap */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.08, rotate: 1.5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => ambientSynth.playSoftPop()}
          transition={{ duration: 0.5 }}
          className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1.5 bg-gradient-to-tr from-gold-500 via-roseGold-400 to-gold-300 shadow-2xl mb-8 cursor-pointer select-none group"
          title={`Happy Birthday, ${birthdayData.personName}!`}
        >
          <div className="w-full h-full rounded-full overflow-hidden bg-midnight-900">
            {!imageError ? (
              <img
                src={birthdayData.mainPhoto}
                alt={birthdayData.personName}
                onError={() => setImageError(true)}
                className="w-full h-full object-cover object-[center_20%] group-hover:scale-106 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-midnight-950 text-gold-300">
                <Sparkles className="w-8 h-8" />
              </div>
            )}
          </div>
        </motion.div>

        {/* Final Sign-off Headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-serif text-2xl sm:text-3xl md:text-4xl text-gold-gradient font-normal tracking-wide mb-12"
        >
          {birthdayData.finalSurprise.closingWish}
        </motion.p>

        {/* Buttons: Firecrackers & Replay with Spring Gestures */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full max-w-xs sm:max-w-none"
        >
          <motion.button
            type="button"
            onClick={() => triggerFirecrackers(6000)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            className="w-full sm:w-auto group px-7 py-3.5 rounded-full bg-gradient-to-r from-red-600 via-amber-600 to-gold-500 hover:from-red-500 hover:to-gold-400 text-cream-50 font-semibold text-sm sm:text-base tracking-wider transition-all duration-300 flex items-center justify-center gap-2.5 shadow-xl shadow-amber-500/20 border border-gold-300/40 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-yellow-200 animate-spin" style={{ animationDuration: '4s' }} />
            <span>Celebrate with Firecrackers 🎆</span>
          </motion.button>

          <motion.button
            type="button"
            onClick={onReplay}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            className="w-full sm:w-auto group px-7 py-3.5 rounded-full glass-panel border border-gold-400/40 text-cream-100 font-medium text-sm sm:text-base tracking-wider hover:border-gold-300 transition-all duration-300 flex items-center justify-center gap-2.5 shadow-xl cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-gold-400 group-hover:-rotate-90 transition-transform duration-500" />
            <span>{birthdayData.finalSurprise.replayButtonText}</span>
          </motion.button>
        </motion.div>

        {/* Subtle Bottom Credits */}
        <div className="mt-20 pt-8 border-t border-gold-500/10 w-full text-center text-xs text-cream-300/40 tracking-widest font-light">
          {birthdayData.siteTitle} • Created with Love
        </div>
      </div>
    </footer>
  );
};
