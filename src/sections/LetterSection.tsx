import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Feather, Heart, Sparkles } from 'lucide-react';
import { birthdayData } from '../config/birthdayConfig';
import { ambientSynth } from '../utils/audioSynth';
import { triggerCandleWishConfetti } from '../components/ConfettiBurst';

export const LetterSection: React.FC = () => {
  const [blessingSent, setBlessingSent] = useState(false);

  const handleSealTap = () => {
    setBlessingSent(true);
    ambientSynth.playSoftPop();
    triggerCandleWishConfetti();
    setTimeout(() => setBlessingSent(false), 2400);
  };

  return (
    <section
      id="letter"
      className="relative min-h-screen py-24 px-4 sm:px-6 flex items-center justify-center overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-burgundy-900/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-gold-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl w-full mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 text-gold-400 text-xs sm:text-sm tracking-[0.25em] uppercase font-medium mb-3">
            <Feather className="w-4 h-4" />
            <span>Words From the Heart</span>
          </div>
          <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-cream-50 font-light">
            {birthdayData.letter.heading}
          </h3>
        </motion.div>

        {/* Paper-Inspired Luxury Letter Envelope / Card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          whileHover={{ y: -3 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-2xl sm:rounded-3xl p-6 sm:p-12 md:p-16 bg-[#131018]/90 backdrop-blur-2xl border border-gold-500/25 shadow-2xl shadow-black/80 group"
        >
          {/* Subtle Deckled / Gold Foil Inset Border */}
          <div className="absolute inset-2 sm:inset-4 border border-gold-500/20 rounded-xl sm:rounded-2xl pointer-events-none group-hover:border-gold-500/35 transition-colors" />

          {/* Interactive Wax Seal Decorative Badge at Top */}
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center z-20">
            <motion.button
              type="button"
              onClick={handleSealTap}
              whileHover={{ scale: 1.15, rotate: 6 }}
              whileTap={{ scale: 0.88 }}
              className="relative w-14 h-14 rounded-full bg-gradient-to-br from-burgundy-700 via-burgundy-900 to-midnight-950 border-2 border-gold-400/70 shadow-2xl flex items-center justify-center cursor-pointer group/seal focus:outline-none"
              title="Tap to send a blessing ❤️"
            >
              <Heart className="w-6 h-6 text-gold-400 fill-gold-400/40 group-hover/seal:scale-110 transition-transform" />
              <div className="absolute inset-0 rounded-full border border-gold-300/40 animate-ping opacity-25" />
            </motion.button>

            {/* Tap Reaction Tooltip Pill */}
            <AnimatePresence>
              {blessingSent && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.8 }}
                  className="mt-2 px-3 py-1 rounded-full bg-burgundy-950/95 border border-gold-400/60 text-[11px] text-gold-200 font-medium shadow-xl flex items-center gap-1.5 whitespace-nowrap"
                >
                  <Sparkles className="w-3 h-3 text-gold-400" />
                  <span>Blessing Sent to Anjali! ❤️</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Letter Content */}
          <div className="relative pt-4 text-cream-100">
            {/* Salutation */}
            <h4 className="font-serif italic text-xl sm:text-2xl md:text-3xl text-gold-300 font-normal mb-6 sm:mb-8">
              {birthdayData.letter.greeting}
            </h4>

            {/* Letter Paragraphs with generous line height and drop-cap on first paragraph */}
            <div className="space-y-4 sm:space-y-6 text-sm sm:text-base md:text-lg leading-relaxed text-cream-200/90 font-light font-sans">
              {birthdayData.letter.paragraphs.map((para, index) => (
                <p key={index} className="leading-relaxed sm:leading-loose">
                  {para}
                </p>
              ))}
            </div>

            {/* Sign-Off */}
            <div className="mt-12 pt-8 border-t border-gold-500/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-cream-300/60 font-light">
                  {birthdayData.letter.closing}
                </p>
                <p className="font-serif italic text-xl sm:text-2xl text-gold-200 mt-1">
                  {birthdayData.letter.signature}
                </p>
              </div>

              <div className="text-xs font-serif italic text-gold-400/70">
                Created with boundless gratitude ✨
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
