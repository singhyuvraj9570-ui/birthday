import confetti from 'canvas-confetti';
import { ambientSynth } from '../utils/audioSynth';

export const triggerLuxuryConfetti = () => {
  // Champagne gold, burgundy, and rose gold palette
  const luxuryColors = ['#D4AF37', '#F3E5AB', '#E8A598', '#991B3A', '#FAF7F2'];

  // Left burst
  confetti({
    particleCount: 50,
    angle: 60,
    spread: 55,
    origin: { x: 0, y: 0.7 },
    colors: luxuryColors,
    ticks: 200,
    gravity: 0.8,
    scalar: 1.1,
  });

  // Right burst
  confetti({
    particleCount: 50,
    angle: 120,
    spread: 55,
    origin: { x: 1, y: 0.7 },
    colors: luxuryColors,
    ticks: 200,
    gravity: 0.8,
    scalar: 1.1,
  });

  // Center celebratory star shower
  setTimeout(() => {
    confetti({
      particleCount: 70,
      spread: 100,
      origin: { x: 0.5, y: 0.4 },
      colors: luxuryColors,
      shapes: ['circle'],
      ticks: 240,
      gravity: 0.6,
      scalar: 1.2,
    });
  }, 350);
};

export const triggerCandleWishConfetti = () => {
  const goldPalette = ['#FFE082', '#FFD54F', '#D4AF37', '#FFF9C4', '#F48FB1'];
  
  confetti({
    particleCount: 120,
    spread: 80,
    origin: { x: 0.5, y: 0.55 },
    colors: goldPalette,
    ticks: 250,
    gravity: 0.7,
    scalar: 1.15,
  });
};

// Grand Firecrackers & Fireworks Spectacle
export const triggerFirecrackers = (durationMs = 4500) => {
  const animationEnd = Date.now() + durationMs;
  const vibrantColors = [
    '#FFD700', // Gold
    '#FF3366', // Hot Ruby
    '#00F0FF', // Cyan Spark
    '#FF9900', // Neon Amber
    '#B537F2', // Royal Violet
    '#FFFFFF', // White Flash
    '#E8A598', // Rose Gold
  ];

  let soundCounter = 0;
  // Immediate first burst
  confetti({
    particleCount: 70,
    startVelocity: 42,
    spread: 360,
    origin: { x: 0.5, y: 0.25 },
    colors: vibrantColors,
    shapes: ['star', 'circle'],
    ticks: 100,
    gravity: 0.85,
    scalar: 1.3,
  });
  ambientSynth.playFirecrackerSound();

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) {
      clearInterval(interval);
      return;
    }

    const particleCount = 45 * (timeLeft / durationMs) + 20;

    // Burst at alternating left/right/center positions
    const x = Math.random() * 0.75 + 0.125;
    const y = Math.random() * 0.4 + 0.12;

    confetti({
      particleCount: Math.floor(particleCount),
      startVelocity: 36 + Math.random() * 10,
      spread: 360,
      origin: { x, y },
      colors: vibrantColors,
      shapes: ['star', 'circle'],
      ticks: 90,
      gravity: 0.9,
      scalar: 1.25,
    });

    if (soundCounter % 2 === 0) {
      ambientSynth.playFirecrackerSound();
    }
    soundCounter++;
  }, 320);
};

