import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Maximize2, Heart } from 'lucide-react';
import { birthdayData } from '../config/birthdayConfig';
import { ambientSynth } from '../utils/audioSynth';

interface MemoryGallerySectionProps {
  onPhotoClick: (index: number) => void;
}

export const MemoryGallerySection: React.FC<MemoryGallerySectionProps> = ({ onPhotoClick }) => {
  const [likedPhotos, setLikedPhotos] = useState<Record<number, boolean>>({});

  const handleLike = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    ambientSynth.playSoftPop();
    setLikedPhotos((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <section id="memories" className="relative py-28 px-4 sm:px-6 max-w-7xl mx-auto overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-burgundy-900/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <div className="inline-flex items-center gap-2 text-gold-400 text-xs sm:text-sm tracking-[0.25em] uppercase font-medium mb-3">
          <Camera className="w-4 h-4" />
          <span>Captured Moments</span>
        </div>
        <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-cream-50 font-light mb-4">
          Glimpses of Your Journey
        </h3>
        <p className="text-sm sm:text-base text-cream-200/70 font-light">
          Snapshots of laughter, beauty, and memories that continue to shine bright.
        </p>
        <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gold-400/70">
          <span className="w-1.5 h-1.5 rounded-full bg-gold-400/80" />
          <span>Click or select any photo to view in high-resolution</span>
        </div>
      </motion.div>

      {/* Modern Editorial Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {birthdayData.galleryPhotos.map((photo, index) => {
          const isLiked = !!likedPhotos[index];

          return (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              onClick={() => onPhotoClick(index)}
              className="group relative rounded-2xl overflow-hidden glass-panel border border-gold-500/20 cursor-pointer shadow-lg hover:shadow-2xl hover:border-gold-400/60 transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden bg-midnight-900">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  loading="lazy"
                  className="w-full h-full object-cover object-[center_20%] transform transition-transform duration-700 ease-out group-hover:scale-108"
                />

                {/* Gradient Shade */}
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/25 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                {/* Top Interactive Buttons (Heart reaction & Fullscreen expand) */}
                <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between z-10">
                  {/* Heart Reaction Gesture Button */}
                  <motion.button
                    type="button"
                    onClick={(e) => handleLike(e, index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    className={`p-2.5 rounded-full backdrop-blur-md border transition-all duration-300 ${
                      isLiked
                        ? 'bg-rose-950/90 border-rose-400 text-rose-400 shadow-[0_0_12px_rgba(251,113,133,0.5)]'
                        : 'bg-midnight-900/70 border-gold-400/30 text-cream-200/80 hover:text-gold-300 hover:border-gold-300'
                    }`}
                    title={isLiked ? 'Loved!' : 'Love this memory'}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-400 text-rose-400' : ''}`} />
                  </motion.button>

                  {/* View Fullscreen Overlay Icon */}
                  <div className="p-2.5 rounded-full bg-midnight-900/70 backdrop-blur-md border border-gold-400/30 text-gold-300 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 transform sm:translate-y-2 group-hover:translate-y-0">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                {/* Caption Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-5 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-widest text-gold-300 font-medium">
                      Memory #{index + 1}
                    </span>
                    {isLiked && (
                      <span className="text-[10px] text-rose-300 font-serif italic">
                        Cherished ❤️
                      </span>
                    )}
                  </div>
                  <h4 className="font-serif text-lg sm:text-xl text-cream-50 font-normal mt-0.5 group-hover:text-gold-200 transition-colors">
                    {photo.caption}
                  </h4>
                  {photo.subcaption && (
                    <p className="text-xs text-cream-300/70 mt-1 font-light line-clamp-1">
                      {photo.subcaption}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
