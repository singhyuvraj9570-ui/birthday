import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Smile, Sun, Camera, Gem, Check } from 'lucide-react';
import { birthdayData, SpecialReason } from '../config/birthdayConfig';
import { ambientSynth } from '../utils/audioSynth';

const iconMap = {
  smile: Smile,
  heart: Heart,
  sparkles: Sparkles,
  sun: Sun,
  camera: Camera,
  gem: Gem,
};

export const SpecialReasonsSection: React.FC = () => {
  const [selectedCards, setSelectedCards] = useState<Record<number, boolean>>({});

  const toggleCard = (id: number) => {
    ambientSynth.playSoftPop();
    setSelectedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="reasons" className="relative py-28 px-4 sm:px-6 max-w-7xl mx-auto overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-gold-500/5 via-burgundy-900/15 to-transparent rounded-full blur-[160px] pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <div className="inline-flex items-center gap-2 text-gold-400 text-xs sm:text-sm tracking-[0.25em] uppercase font-medium mb-3">
          <Sparkles className="w-4 h-4" />
          <span>Endless Admiration</span>
        </div>
        <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-cream-50 font-light mb-4">
          Six Reasons You Are Extraordinary
        </h3>
        <p className="text-sm sm:text-base text-cream-200/70 font-light">
          Out of countless reasons, here are just a few that make having you in this world such a blessing.
        </p>
      </motion.div>

      {/* 6 Luxury Interactive Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {birthdayData.reasons.map((reason: SpecialReason, index: number) => {
          const IconComponent = iconMap[reason.iconName] || Sparkles;
          const isSelected = !!selectedCards[reason.id];

          return (
            <motion.div
              key={reason.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              whileHover={{ y: -8, scale: 1.025 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              onClick={() => toggleCard(reason.id)}
              className={`group relative rounded-3xl p-8 glass-panel cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                isSelected
                  ? 'border-2 border-gold-400 bg-midnight-900/90 shadow-[0_0_30px_rgba(212,175,55,0.35)]'
                  : 'border border-gold-500/20 hover:border-gold-400/60 hover:shadow-xl'
              }`}
            >
              {/* Subtle Card Background Shimmer */}
              <div
                className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl transition-all duration-500 pointer-events-none ${
                  isSelected ? 'bg-gold-500/25' : 'bg-gold-500/5 group-hover:bg-gold-500/15'
                }`}
              />

              <div>
                {/* Top Row: Icon and Number */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all duration-300 shadow-md ${
                      isSelected
                        ? 'bg-gold-500 text-midnight-950 border-gold-300 scale-110'
                        : 'bg-midnight-900 border-gold-400/30 text-gold-400 group-hover:text-gold-300 group-hover:scale-110 group-hover:border-gold-300'
                    }`}
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="font-serif italic text-2xl text-gold-500/40 font-light group-hover:text-gold-400/70 transition-colors">
                    0{index + 1}
                  </span>
                </div>

                {/* Card Title */}
                <h4 className="font-serif text-xl sm:text-2xl text-cream-50 font-normal tracking-wide mb-3 group-hover:text-gold-200 transition-colors">
                  {reason.title}
                </h4>

                {/* Card Description */}
                <p className="text-sm sm:text-base text-cream-200/75 font-light leading-relaxed">
                  {reason.description}
                </p>
              </div>

              {/* Bottom Subtle Accent Line */}
              <div className="mt-8 pt-4 border-t border-gold-500/10 flex items-center justify-between text-[11px] uppercase tracking-widest font-medium">
                <div className="flex items-center gap-2 text-gold-400/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400/80" />
                  <span>Cherished Forever</span>
                </div>
                {isSelected && (
                  <span className="text-gold-300 font-serif italic text-xs normal-case flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-gold-400" /> Illuminating
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
