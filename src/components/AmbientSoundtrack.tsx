import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { ambientSynth } from '../utils/audioSynth';
import { birthdayData } from '../config/birthdayConfig';

interface AmbientSoundtrackProps {
  isAutoplayTriggered: boolean;
}

export const AmbientSoundtrack: React.FC<AmbientSoundtrackProps> = ({ isAutoplayTriggered }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [usingSynthesizer, setUsingSynthesizer] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio tag
  useEffect(() => {
    const audio = new Audio(birthdayData.music.audioSrc);
    audio.loop = true;
    audio.volume = 0.5;

    // If custom audio errors (e.g. 404 because user hasn't added MP3 yet), fallback to synth
    audio.addEventListener('error', () => {
      setUsingSynthesizer(true);
    });

    audioRef.current = audio;

    return () => {
      audio.pause();
      ambientSynth.pause();
    };
  }, []);

  // When user clicks "Open Your Surprise ✨", trigger music
  useEffect(() => {
    if (isAutoplayTriggered && !isPlaying) {
      startPlayback();
    }
  }, [isAutoplayTriggered]);

  const startPlayback = () => {
    if (usingSynthesizer) {
      ambientSynth.play();
      setIsPlaying(true);
    } else if (audioRef.current) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Browser audio policy or missing MP3 file: fallback to synth
          setUsingSynthesizer(true);
          ambientSynth.play();
          setIsPlaying(true);
        });
    }
  };

  const togglePlayback = () => {
    if (isPlaying) {
      if (usingSynthesizer) {
        ambientSynth.pause();
      } else if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
    } else {
      startPlayback();
    }
  };

  return (
    <aside aria-label="Music Controls" className="fixed bottom-5 right-4 sm:bottom-auto sm:top-5 sm:right-5 z-40">
      <button
        onClick={togglePlayback}
        className="flex items-center gap-2.5 px-3 py-2 sm:px-3.5 rounded-full glass-panel border border-gold-500/25 text-cream-100 hover:border-gold-500/60 transition-all duration-300 shadow-xl shadow-black/60 group hover:scale-105 active:scale-95 bg-midnight-950/90 backdrop-blur-md"
        aria-label={isPlaying ? "Pause background music" : "Play background music"}
        title={isPlaying ? "Pause soundtrack" : "Play soundtrack"}
      >
        <div className="relative flex items-center justify-center w-6 h-6 text-gold-400 group-hover:text-gold-300">
          {isPlaying ? (
            <div className="flex items-end gap-[3px] h-3.5">
              <span className="w-[3px] bg-gold-400 rounded-full animate-[bounce_1.1s_infinite_ease-in-out] h-full" />
              <span className="w-[3px] bg-gold-300 rounded-full animate-[bounce_0.8s_infinite_ease-in-out_0.2s] h-2/3" />
              <span className="w-[3px] bg-gold-400 rounded-full animate-[bounce_1.2s_infinite_ease-in-out_0.4s] h-4/5" />
            </div>
          ) : (
            <VolumeX className="w-4 h-4 opacity-75" />
          )}
        </div>

        <span className="text-xs font-medium tracking-wider text-cream-200 hidden sm:inline-block">
          {isPlaying ? "Birthday Melody 🎵" : "Play Birthday Music"}
        </span>

        {isPlaying && (
          <Volume2 className="w-3.5 h-3.5 text-gold-400/80 animate-pulse hidden sm:inline-block" />
        )}
      </button>
    </aside>
  );
};
