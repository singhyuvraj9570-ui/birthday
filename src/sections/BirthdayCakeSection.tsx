import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RotateCcw, Flame, Wind, Star, Crown } from 'lucide-react';
import { birthdayData } from '../config/birthdayConfig';
import { triggerCandleWishConfetti, triggerFirecrackers } from '../components/ConfettiBurst';
import { ambientSynth } from '../utils/audioSynth';

export const BirthdayCakeSection: React.FC = () => {
  // Individual state for the 3 candles [left, middle, right]
  const [blownCandles, setBlownCandles] = useState<boolean[]>([false, false, false]);
  const [isBlowingEffect, setIsBlowingEffect] = useState<boolean>(false);

  const allCandlesBlown = blownCandles.every(Boolean);

  const handleMakeWish = () => {
    setIsBlowingEffect(true);
    ambientSynth.playBlowSound();

    setTimeout(() => {
      setBlownCandles([true, true, true]);
      setIsBlowingEffect(false);
      triggerFirecrackers(5500);
      ambientSynth.playWishChime();
    }, 450);
  };

  const handleCandleClick = (index: number) => {
    const newCandles = [...blownCandles];
    const isCurrentlyBlown = newCandles[index];
    newCandles[index] = !isCurrentlyBlown;
    setBlownCandles(newCandles);

    if (!isCurrentlyBlown) {
      // Blowing this candle out
      ambientSynth.playBlowSound();
      if (newCandles.every(Boolean)) {
        setTimeout(() => {
          triggerFirecrackers(5000);
          ambientSynth.playWishChime();
        }, 300);
      }
    } else {
      // Relighting this candle
      ambientSynth.playIgniteSound();
    }
  };

  const handleRelightAll = () => {
    ambientSynth.playIgniteSound();
    setBlownCandles([false, false, false]);
  };

  return (
    <section id="wishes" className="relative py-16 sm:py-24 px-3 sm:px-6 max-w-4xl mx-auto">
      {/* 🌟 ENCHANTED SHOWCASE CARD (Highlights the Climax of the Website) 🌟 */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-3xl sm:rounded-[44px] p-6 sm:p-12 md:p-14 bg-gradient-to-b from-[#190712]/95 via-[#250918]/90 to-[#12030a]/95 backdrop-blur-2xl border-2 border-gold-400/40 shadow-[0_0_80px_rgba(212,175,55,0.22),0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden"
      >
        {/* Inner Gold Foil Filigree Inset Border */}
        <div className="absolute inset-2 sm:inset-3 border border-gold-400/25 rounded-2xl sm:rounded-[36px] pointer-events-none" />

        {/* Elegant Gold Corner Ornaments */}
        <div className="absolute top-3 left-3 sm:top-5 sm:left-5 w-7 h-7 sm:w-10 sm:h-10 border-t-2 border-l-2 border-gold-400/60 rounded-tl-xl pointer-events-none" />
        <div className="absolute top-3 right-3 sm:top-5 sm:right-5 w-7 h-7 sm:w-10 sm:h-10 border-t-2 border-r-2 border-gold-400/60 rounded-tr-xl pointer-events-none" />
        <div className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 w-7 h-7 sm:w-10 sm:h-10 border-b-2 border-l-2 border-gold-400/60 rounded-bl-xl pointer-events-none" />
        <div className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 w-7 h-7 sm:w-10 sm:h-10 border-b-2 border-r-2 border-gold-400/60 rounded-br-xl pointer-events-none" />

        {/* Warm Golden Candlelight Backlight (dims when candles are blown) */}
        <motion.div
          animate={{
            opacity: allCandlesBlown ? 0.15 : [0.45, 0.75, 0.5, 0.7],
            scale: allCandlesBlown ? 0.9 : [1, 1.1, 0.98, 1.05],
          }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-gold-500/35 via-amber-400/25 to-roseGold-400/15 rounded-full blur-[140px] pointer-events-none"
        />

        {/* Floating Celebration Balloons */}
        <div className="absolute inset-x-3 sm:inset-x-6 top-12 pointer-events-none">
          {/* Left Floating Balloon Cluster */}
          <motion.div
            animate={{ y: [0, -16, 0], rotate: [-2, 3, -2] }}
            transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
            className="absolute left-1 sm:left-4 -top-2 flex flex-col items-center opacity-80"
          >
            <div className="w-12 sm:w-15 h-15 sm:h-19 rounded-[50%_50%_50%_50%_/_40%_40%_60%_60%] bg-gradient-to-tr from-burgundy-800 via-roseGold-400 to-roseGold-300 shadow-xl shadow-burgundy-900/40 relative">
              <div className="absolute top-2 left-2.5 w-3 h-5 bg-white/45 rounded-full blur-[1px]" />
            </div>
            <div className="w-1.5 h-1 bg-burgundy-900 rounded-b" />
            <div className="w-[1px] h-24 bg-gradient-to-b from-gold-400/50 to-transparent" />
          </motion.div>

          {/* Right Floating Balloon Cluster */}
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [2, -3, 2] }}
            transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 1 }}
            className="absolute right-1 sm:right-4 -top-4 flex flex-col items-center opacity-80"
          >
            <div className="w-13 sm:w-16 h-16 sm:h-20 rounded-[50%_50%_50%_50%_/_40%_40%_60%_60%] bg-gradient-to-tr from-gold-700 via-gold-400 to-amber-200 shadow-xl shadow-gold-900/40 relative">
              <div className="absolute top-2.5 left-3 w-3 h-6 bg-white/55 rounded-full blur-[1px]" />
            </div>
            <div className="w-1.5 h-1 bg-gold-700 rounded-b" />
            <div className="w-[1px] h-28 bg-gradient-to-b from-gold-400/50 to-transparent" />
          </motion.div>
        </div>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/15 border border-gold-400/40 text-gold-300 text-xs sm:text-sm tracking-[0.25em] uppercase font-semibold mb-3 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
            <span>A Moment of Magic</span>
          </div>

          <h3 className="font-serif text-3xl sm:text-5xl md:text-6xl text-cream-50 font-light mb-3 tracking-wide">
            Make a <span className="text-gold-gradient font-normal italic">Birthday Wish</span>
          </h3>

          <p className="text-sm sm:text-base text-cream-200/80 font-light max-w-md mx-auto">
            {birthdayData.wishes.subheading}
          </p>
        </div>

        {/* Interactive Birthday Cake Experience */}
        <div className="relative flex flex-col items-center z-10">
          
          {/* Wind Gust Wave during Blow */}
          <AnimatePresence>
            {isBlowingEffect && (
              <motion.div
                initial={{ opacity: 0, x: -120, scaleY: 0.8 }}
                animate={{ opacity: [0, 0.8, 0], x: 140, scaleY: 1.2 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="absolute top-1/4 z-30 pointer-events-none flex items-center gap-3 text-gold-200"
              >
                <Wind className="w-14 h-14" />
                <div className="w-32 h-1 bg-gradient-to-r from-white via-gold-200 to-transparent rounded-full blur-[2px]" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Cake Container (Proper Proportions, Standard Dimensions) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.015 }}
            transition={{ duration: 0.8 }}
            className="relative w-72 sm:w-80 h-76 flex flex-col items-center justify-end mb-10 select-none"
          >
            {/* Floating Candles */}
            <div className="relative flex justify-center items-end gap-7 mb-0 z-20">
              {[0, 1, 2].map((i) => {
                const isBlown = blownCandles[i];

                return (
                  <motion.div
                    key={i}
                    onClick={() => handleCandleClick(i)}
                    whileHover={{ scale: 1.15, y: -4 }}
                    whileTap={{ scale: 0.88 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    className="flex flex-col items-center cursor-pointer group"
                    title={isBlown ? "Tap to relight candle" : "Tap to blow out candle"}
                  >
                    {/* Floating Flame or Smoke Wisps */}
                    <div className="h-10 flex items-center justify-center relative">
                      <AnimatePresence mode="wait">
                        {!isBlown ? (
                          <motion.div
                            key={`flame-${i}`}
                            initial={{ scale: 0 }}
                            animate={{
                              scale: [1, 1.15, 0.95, 1],
                              y: [0, -2, 1, 0]
                            }}
                            exit={{
                              scale: 0,
                              opacity: 0,
                              transition: { duration: 0.25 }
                            }}
                            transition={{
                              repeat: Infinity,
                              duration: 1.2 + i * 0.2,
                              ease: 'easeInOut'
                            }}
                            className="relative flex items-center justify-center group-hover:scale-120 transition-transform"
                          >
                            {/* Outer Glow Halo */}
                            <div className="absolute w-8 h-8 rounded-full bg-amber-400/40 blur-md animate-pulse" />
                            
                            {/* Core Teardrop Flame */}
                            <div className="w-3.5 h-6 rounded-full bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 shadow-[0_0_14px_#ffbf00]" />
                            
                            {/* Blue Base */}
                            <div className="absolute bottom-0 w-2 h-2.5 rounded-full bg-blue-400/80 blur-[1px]" />

                            {/* Rising Spark */}
                            <motion.div
                              animate={{ y: [-1, -14], opacity: [0.8, 0], scale: [0.8, 0.3] }}
                              transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.3 }}
                              className="absolute -top-1 w-1 h-1 rounded-full bg-yellow-200 blur-[0.5px]"
                            />
                          </motion.div>
                        ) : (
                          <motion.div
                            key={`smoke-${i}`}
                            initial={{ opacity: 0.9, y: 0, scale: 0.8 }}
                            animate={{
                              opacity: 0,
                              y: -28,
                              scale: 1.8
                            }}
                            transition={{ duration: 1.4, ease: 'easeOut' }}
                            className="w-2.5 h-4 rounded-full bg-white/40 blur-[2px]"
                          />
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Candle Wick */}
                    <div className="w-0.5 h-2 bg-neutral-700" />

                    {/* Candle Stick */}
                    <div className="w-4 h-14 rounded-t-sm bg-gradient-to-b from-roseGold-200 via-gold-200 to-roseGold-300 border-x border-gold-400/50 shadow-md relative overflow-hidden group-hover:border-gold-300 transition-colors">
                      {/* Candle gold spiral stripes */}
                      <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,rgba(212,175,55,0.45)_4px,rgba(212,175,55,0.45)_8px)]" />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Cake Tier 1 (Top Tier) */}
            <div className="relative w-44 h-16 rounded-t-2xl bg-gradient-to-r from-[#240c14] via-[#38101e] to-[#240c14] border-t-2 border-x-2 border-gold-400/50 shadow-xl flex items-center justify-center z-10 overflow-hidden">
              {/* Candlelight sheen */}
              <motion.div
                animate={{ opacity: allCandlesBlown ? 0.05 : [0.2, 0.5, 0.25] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 bg-gradient-to-b from-amber-400/25 via-transparent to-transparent pointer-events-none"
              />
              {/* Cream Frosting Drips */}
              <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-r from-cream-100 via-gold-100 to-cream-100 rounded-t-2xl opacity-90 shadow-sm" />
              <div className="flex gap-2 text-gold-400/80">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>

            {/* Cake Tier 2 (Bottom Tier) */}
            <div className="relative w-64 sm:w-72 h-24 rounded-t-2xl bg-gradient-to-r from-[#1b080f] via-[#2d0a17] to-[#1b080f] border-t-2 border-x-2 border-gold-400/60 shadow-2xl flex items-center justify-center overflow-hidden">
              {/* Cream Frosting Drips on Bottom Tier */}
              <div className="absolute top-0 inset-x-0 h-5 bg-gradient-to-r from-cream-100 via-gold-200 to-cream-100 rounded-t-2xl opacity-95 shadow-sm" />
              
              {/* Elegant Calligraphy */}
              <div className="text-center pt-2">
                <span className="font-serif italic text-gold-200 text-sm sm:text-base tracking-wider font-normal">
                  Happy Birthday, {birthdayData.personName}
                </span>
              </div>
            </div>

            {/* Cake Serving Stand (Luxury Gold Platter) */}
            <div className="w-72 sm:w-80 h-4 rounded-full bg-gradient-to-r from-gold-600 via-gold-300 to-gold-600 shadow-2xl border-t border-white/40" />
            <div className="w-32 h-3.5 bg-gradient-to-r from-gold-700 via-gold-400 to-gold-700 rounded-b-md shadow-lg" />
          </motion.div>

          {/* Action Controls & Dynamic Message */}
          <div className="text-center min-h-[140px] flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              {!allCandlesBlown ? (
                <motion.div
                  key="make-wish-btn"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col items-center"
                >
                  {/* Glowing Button Container with Star Aura */}
                  <div className="relative group">
                    <div className="absolute -inset-1.5 bg-gradient-to-r from-gold-400 via-amber-300 to-roseGold-400 rounded-full blur-lg opacity-60 group-hover:opacity-100 transition duration-300 animate-pulseSubtle" />

                    <motion.button
                      type="button"
                      onClick={handleMakeWish}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.94 }}
                      className="relative px-10 py-4 rounded-full bg-gradient-to-r from-gold-400 via-amber-400 to-gold-500 text-midnight-950 font-semibold text-base sm:text-lg tracking-wide shadow-2xl transition-all duration-300 flex items-center gap-3 cursor-pointer"
                    >
                      <Sparkles className="w-5 h-5 text-midnight-950 animate-bounce" />
                      <span>{birthdayData.wishes.blowCandlePrompt}</span>
                    </motion.button>
                  </div>

                  <div className="mt-3.5 flex items-center gap-3">
                    <motion.button
                      type="button"
                      onClick={() => triggerFirecrackers(4500)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-1.5 text-xs text-gold-300/90 hover:text-gold-200 transition-colors uppercase tracking-wider font-medium hover:underline underline-offset-4 cursor-pointer"
                    >
                      <span>🎆 Launch Firecrackers</span>
                    </motion.button>
                    <span className="text-gold-500/40">•</span>
                    <span className="text-xs text-cream-300/60 tracking-wider">
                      Or tap any candle to blow
                    </span>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="blown-message"
                  initial={{ opacity: 0, scale: 0.9, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center max-w-lg px-4"
                >
                  {/* Magical Gilded Wish Reveal Card */}
                  <div className="relative p-6 sm:p-8 rounded-3xl glass-panel border border-gold-400/50 shadow-2xl text-center bg-midnight-900/90 backdrop-blur-xl">
                    {/* Floating Star Badges */}
                    <div className="flex justify-center gap-2 text-gold-400 mb-3">
                      <Star className="w-4 h-4 fill-gold-400 animate-pulse" />
                      <Sparkles className="w-5 h-5 text-amber-300" />
                      <Star className="w-4 h-4 fill-gold-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
                    </div>

                    <p className="font-serif italic text-2xl sm:text-3xl text-gold-gradient font-normal mb-2 leading-snug">
                      {birthdayData.wishes.blownWishMessage}
                    </p>
                    
                    <p className="text-sm text-cream-200/80 font-light leading-relaxed">
                      Every candle carried a wish meant only for you, {birthdayData.personName}. May the universe grant every dream in your heart.
                    </p>
                  </div>

                  {/* Actions: Launch Firecrackers + Re-light candles */}
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-3.5">
                    <motion.button
                      type="button"
                      onClick={() => triggerFirecrackers(5500)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.94 }}
                      className="inline-flex items-center gap-2 text-xs text-cream-50 hover:text-white transition-all uppercase tracking-widest font-semibold py-2.5 px-5 rounded-full bg-gradient-to-r from-red-600 via-amber-600 to-gold-500 hover:from-red-500 hover:to-gold-400 border border-gold-300/40 shadow-xl shadow-amber-500/25 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-yellow-200 animate-spin" style={{ animationDuration: '4s' }} />
                      <span>Launch Firecrackers 🎆</span>
                    </motion.button>

                    <motion.button
                      type="button"
                      onClick={handleRelightAll}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.94 }}
                      className="inline-flex items-center gap-2 text-xs text-gold-400 hover:text-gold-200 transition-all uppercase tracking-widest font-medium py-2.5 px-5 rounded-full border border-gold-500/30 hover:border-gold-400/60 hover:bg-gold-500/10 shadow-md group cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5 group-hover:-rotate-90 transition-transform duration-300" />
                      <span>Light Candles Again</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
