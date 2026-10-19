import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface SectionDividerProps {
  chapter?: string;
  title?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({ chapter, title }) => {
  return (
    <div className="relative py-14 sm:py-20 flex flex-col items-center justify-center overflow-hidden pointer-events-none select-none">
      {/* Ambient background glow */}
      <div className="absolute w-72 h-16 bg-gold-500/10 rounded-full blur-2xl" />

      {/* Decorative Chapter Tag */}
      {chapter && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-3.5 flex items-center gap-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gold-400/80 animate-ping" />
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-gold-300 font-semibold font-serif">
            {chapter}
          </span>
          {title && (
            <>
              <span className="text-gold-500/50">•</span>
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-cream-300/60 font-light">
                {title}
              </span>
            </>
          )}
          <span className="w-1.5 h-1.5 rounded-full bg-gold-400/80 animate-ping" />
        </motion.div>
      )}

      {/* Tapering Golden Divider Line with Center Ornament */}
      <div className="relative flex items-center justify-center w-full max-w-xl px-6">
        {/* Left tapering line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gold-400/60 to-gold-400 origin-right"
        />

        {/* Center Golden Diamond Ornament */}
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mx-3.5 p-1 rounded-full border border-gold-400/60 bg-midnight-950 flex items-center justify-center shadow-[0_0_12px_rgba(212,175,55,0.4)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-gold-300" />
        </motion.div>

        {/* Right tapering line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-gold-400/60 to-gold-400 origin-left"
        />
      </div>
    </div>
  );
};
