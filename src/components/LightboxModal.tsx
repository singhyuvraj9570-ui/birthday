import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { GalleryItem } from '../config/birthdayConfig';

interface LightboxModalProps {
  photos: GalleryItem[];
  currentIndex: number | null;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  photos,
  currentIndex,
  onClose,
  onSelectIndex,
}) => {
  const isOpen = currentIndex !== null;
  const currentPhoto = isOpen ? photos[currentIndex] : null;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        onSelectIndex((currentIndex! + 1) % photos.length);
      }
      if (e.key === 'ArrowLeft') {
        onSelectIndex((currentIndex! - 1 + photos.length) % photos.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, currentIndex, photos.length, onClose, onSelectIndex]);

  return (
    <AnimatePresence>
      {isOpen && currentPhoto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-midnight-950/95 backdrop-blur-xl p-4 md:p-8"
          onClick={onClose}
        >
          {/* Top Bar with counter & close */}
          <div className="absolute top-5 inset-x-5 flex items-center justify-between z-10 max-w-6xl mx-auto pointer-events-none">
            <div className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border-gold-500/20 text-xs text-gold-300 font-medium">
              <ImageIcon className="w-3.5 h-3.5" />
              <span>{currentIndex! + 1} of {photos.length}</span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="pointer-events-auto p-2.5 rounded-full glass-panel border border-gold-500/30 text-cream-200 hover:text-white hover:border-gold-500/60 transition-all hover:scale-105"
              aria-label="Close photo view"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectIndex((currentIndex! - 1 + photos.length) % photos.length);
            }}
            className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full glass-panel border border-gold-500/30 text-gold-300 hover:text-white hover:border-gold-400 transition-all hover:scale-110 z-20 bg-midnight-950/70"
            aria-label="Previous photograph"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectIndex((currentIndex! + 1) % photos.length);
            }}
            className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full glass-panel border border-gold-500/30 text-gold-300 hover:text-white hover:border-gold-400 transition-all hover:scale-110 z-20 bg-midnight-950/70"
            aria-label="Next photograph"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Main Photo Box */}
          <div
            className="relative max-w-4xl max-h-[85vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              key={currentPhoto.id}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/80 border border-gold-500/30 max-h-[72vh] flex items-center justify-center bg-midnight-900"
            >
              <img
                src={currentPhoto.url}
                alt={currentPhoto.caption}
                className="max-h-[72vh] max-w-full w-auto object-contain select-none"
              />
              <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10 rounded-2xl" />
            </motion.div>

            {/* Captions */}
            <motion.div
              key={`caption-${currentPhoto.id}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="mt-4 text-center max-w-lg px-4"
            >
              <h4 className="font-serif text-xl md:text-2xl text-cream-50 font-normal tracking-wide">
                {currentPhoto.caption}
              </h4>
              {currentPhoto.subcaption && (
                <p className="text-xs md:text-sm text-gold-300/80 mt-1 font-light tracking-wider">
                  {currentPhoto.subcaption}
                </p>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
