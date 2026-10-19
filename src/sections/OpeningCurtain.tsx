import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { birthdayData } from '../config/birthdayConfig';
import { triggerLuxuryConfetti } from '../components/ConfettiBurst';

interface OpeningCurtainProps {
  isOpen: boolean;
  onOpen: () => void;
}

export const OpeningCurtain: React.FC<OpeningCurtainProps> = ({ isOpen, onOpen }) => {
  const handleOpenClick = () => {
    triggerLuxuryConfetti();
    onOpen();
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: -60,
            scale: 1.04,
            filter: 'blur(8px)',
            transition: { duration: 1.1, ease: [0.77, 0, 0.175, 1] }
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-midnight-950 px-4 sm:px-6 overflow-hidden select-none"
        >
          {/* Subtle Ambient Backlight Glows */}
          <div className="absolute top-1/4 -left-20 w-72 sm:w-96 h-72 sm:h-96 bg-burgundy-900/30 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 -right-20 w-72 sm:w-96 h-72 sm:h-96 bg-gold-600/15 rounded-full blur-[100px] sm:blur-[130px] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-burgundy-950/40 via-midnight-950/80 to-midnight-950 pointer-events-none" />

          {/* Luxury Card Container */}
          <div className="relative z-10 max-w-xl w-full text-center flex flex-col items-center">
            {/* Crown / Star Accent */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
              className="inline-flex items-center justify-center p-2.5 sm:p-3 rounded-full bg-midnight-900 border border-gold-500/30 text-gold-400 mb-6 sm:mb-8 shadow-xl shadow-gold-500/5"
            >
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
            </motion.div>

            {/* Introductory Lines */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="font-serif italic text-lg sm:text-xl md:text-2xl text-gold-300/80 tracking-wide mb-2 sm:mb-3"
            >
              Hey, {birthdayData.personName}...
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.9 }}
              className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-cream-100 font-light leading-tight tracking-wide mb-5 sm:mb-6 px-2"
            >
              Someone made something <br />
              <span className="text-gold-gradient font-normal italic">special for you.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="text-[11px] sm:text-xs md:text-sm text-cream-300/60 uppercase tracking-[0.25em] sm:tracking-[0.3em] font-light mb-8 sm:mb-10"
            >
              A Private Celebration • {birthdayData.birthdayDate}
            </motion.p>

            {/* Interactive Open Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="relative group max-w-xs sm:max-w-none"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-gold-500 via-roseGold-400 to-gold-400 rounded-full blur-md opacity-40 group-hover:opacity-80 transition duration-500 group-hover:duration-200 animate-pulseSubtle" />

              <motion.button
                type="button"
                onClick={handleOpenClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.94 }}
                className="relative px-7 sm:px-10 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-burgundy-900 via-burgundy-800 to-midnight-900 border border-gold-400/50 text-cream-100 font-medium text-sm sm:text-lg tracking-wider flex items-center justify-center gap-2.5 sm:gap-3 shadow-2xl hover:border-gold-300 transition-all duration-300 cursor-pointer"
                autoFocus
              >
                <Sparkles className="w-4 h-4 text-gold-300 animate-spin" style={{ animationDuration: '5s' }} />
                <span>Open Your Surprise ✨</span>
              </motion.button>
            </motion.div>

            {/* Quick Skip Link (Guarantees visitor never gets trapped) */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 2.5, duration: 1 }}
              onClick={handleOpenClick}
              className="mt-8 text-xs text-cream-200/50 hover:text-gold-300 underline underline-offset-4 tracking-widest uppercase transition-colors"
            >
              Enter directly
            </motion.button>
          </div>

          {/* Bottom subtle note */}
          <div className="absolute bottom-6 text-center text-xs text-cream-300/40 tracking-wider">
            {birthdayData.siteTitle}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
