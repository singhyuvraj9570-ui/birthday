import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ChevronDown, Heart, User } from 'lucide-react';
import { birthdayData } from '../config/birthdayConfig';
import { ambientSynth } from '../utils/audioSynth';

export const HeroSection: React.FC = () => {
  const [imageError, setImageError] = useState(false);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-24 pb-16 overflow-hidden"
    >
      {/* Background radial gradients */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-burgundy-900/25 via-gold-600/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Subtle top badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full glass-panel border border-gold-500/25 text-gold-300 text-[11px] sm:text-xs md:text-sm font-medium tracking-wider sm:tracking-widest uppercase mb-6 sm:mb-8 shadow-md max-w-[94vw]"
        >
          <Sparkles className="w-3.5 h-3.5 text-gold-400 shrink-0" />
          <span className="truncate">{birthdayData.relationship} • {birthdayData.birthdayDate}</span>
          <Sparkles className="w-3.5 h-3.5 text-gold-400 shrink-0" />
        </motion.div>

        {/* Central Portrait in Luxury Editorial Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          whileHover={{ scale: 1.025, y: -4 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-8 sm:mb-10 group cursor-pointer select-none"
          onClick={() => {
            ambientSynth.playSoftPop();
          }}
        >
          {/* Ambient Warm Backlight Glow */}
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-gold-500/20 via-roseGold-400/20 to-burgundy-600/30 blur-2xl opacity-75 group-hover:opacity-100 transition duration-700 pointer-events-none" />

          {/* Luxury Frame Container */}
          <div className="relative p-2 sm:p-3 rounded-3xl bg-gradient-to-b from-gold-400/30 via-burgundy-900/40 to-midnight-900 border border-gold-400/40 shadow-2xl shadow-black/80 transition-shadow duration-500 group-hover:shadow-[0_0_35px_rgba(212,175,55,0.35)]">
            <div className="relative w-[240px] h-[320px] xs:w-[260px] xs:h-[350px] sm:w-72 sm:h-96 md:w-80 md:h-[430px] rounded-2xl overflow-hidden bg-midnight-900">
              {!imageError ? (
                <img
                  src={birthdayData.mainPhoto}
                  alt={birthdayData.personName}
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover object-[center_25%] transition-transform duration-700 group-hover:scale-106"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-midnight-900 to-burgundy-950 text-cream-200">
                  <div className="w-16 h-16 rounded-full bg-gold-500/10 border border-gold-400/30 flex items-center justify-center text-gold-300 mb-3">
                    <User className="w-8 h-8" />
                  </div>
                  <p className="font-serif text-lg text-gold-200 font-medium">Portrait Ready</p>
                  <p className="text-xs text-cream-300/60 mt-1 max-w-[200px]">
                    Place your photo at <code className="text-gold-400 text-[10px]">public/images/birthday-person.jpg</code>
                  </p>
                </div>
              )}

              {/* Subtle inner shadow and shimmer border */}
              <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/15 rounded-2xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight-950/60 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Corner Decorative Accents */}
            <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-gold-400 rounded-tl-sm pointer-events-none" />
            <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-gold-400 rounded-tr-sm pointer-events-none" />
            <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-gold-400 rounded-bl-sm pointer-events-none" />
            <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-gold-400 rounded-br-sm pointer-events-none" />
          </div>

          {/* Floating heart tag with spring hover and tap */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1, rotate: 2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ delay: 0.8, type: 'spring' }}
            className="absolute -bottom-3 right-4 px-3.5 py-1.5 rounded-full glass-panel border border-gold-400/40 flex items-center gap-1.5 text-xs text-roseGold-300 shadow-xl"
          >
            <Heart className="w-3.5 h-3.5 fill-roseGold-400 text-roseGold-400 animate-pulse" />
            <span className="font-medium tracking-wide">The Star of the Day ✨</span>
          </motion.div>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
        >
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-wide text-cream-50 leading-tight mb-4">
            Happy Birthday, <br />
            <span className="font-normal italic text-gold-gradient font-serif">
              {birthdayData.personName}!
            </span>
          </h2>
          <p className="max-w-xl mx-auto text-base sm:text-lg md:text-xl text-cream-200/80 font-light leading-relaxed mb-10 px-4">
            {birthdayData.heroSubtitle}
          </p>
        </motion.div>

        {/* Smooth Scroll Indicator */}
        <motion.a
          href="#letter"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="flex flex-col items-center gap-2 text-gold-400/70 hover:text-gold-300 transition-colors cursor-pointer group"
          aria-label="Scroll to birthday letter"
        >
          <span className="text-xs uppercase tracking-[0.25em] font-light">Read Your Letter</span>
          <ChevronDown className="w-5 h-5 animate-bounce text-gold-400 group-hover:text-gold-200" />
        </motion.a>
      </div>
    </section>
  );
};
