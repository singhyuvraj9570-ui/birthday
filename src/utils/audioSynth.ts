/**
 * Web Audio Ambient Music Synthesizer
 * Plays an enchanting, emotional music box & warm piano arrangement
 * of "Happy Birthday to You" with accompaniment chords and celestial sound effects.
 */

interface ScoreNote {
  freq: number;
  duration: number; // in beats (1 beat = ~540ms)
  chord?: number[];  // Accompaniment harmony frequencies
}

// Frequencies (Hz)
const G2 = 98.00;
const C3 = 130.81;
const F2 = 87.31;
const G3 = 196.00;
const A3 = 220.00;
const B3 = 246.94;
const C4 = 261.63;
const D4 = 293.66;
const E4 = 329.63;
const F4 = 349.23;
const G4 = 392.00;
const A4 = 440.00;
const B4 = 493.88;
const C5 = 523.25;
const D5 = 587.33;
const E5 = 659.25;
const F5 = 698.46;
const G5 = 783.99;
const C6 = 1046.50;

class AmbientMusicEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timer: number | null = null;
  private masterGain: GainNode | null = null;
  private noteIndex: number = 0;
  private readonly beatDurationMs: number = 520; // ~115 BPM 3/4 tempo

  // The beloved "Happy Birthday to You" score with lush music-box chords
  private birthdayScore: ScoreNote[] = [
    // Phrase 1: "Happy Birthday to You"
    { freq: G4, duration: 0.75 },
    { freq: G4, duration: 0.25 },
    { freq: A4, duration: 1.0 },
    { freq: G4, duration: 1.0 },
    { freq: C5, duration: 1.0, chord: [C3, G3, E4] },
    { freq: B4, duration: 2.0 },

    // Phrase 2: "Happy Birthday to You"
    { freq: G4, duration: 0.75 },
    { freq: G4, duration: 0.25 },
    { freq: A4, duration: 1.0 },
    { freq: G4, duration: 1.0 },
    { freq: D5, duration: 1.0, chord: [G2, D4, B4] },
    { freq: C5, duration: 2.0 },

    // Phrase 3: "Happy Birthday Dear [Special One]"
    { freq: G4, duration: 0.75 },
    { freq: G4, duration: 0.25 },
    { freq: G5, duration: 1.0, chord: [C3, E4, G4] },
    { freq: E5, duration: 1.0 },
    { freq: C5, duration: 1.0 },
    { freq: B4, duration: 1.0 },
    { freq: A4, duration: 2.0, chord: [F2, C4, F4, A4] },

    // Phrase 4: "Happy Birthday to You ✨"
    { freq: F5, duration: 0.75 },
    { freq: F5, duration: 0.25 },
    { freq: E5, duration: 1.0, chord: [C3, G3, E4] },
    { freq: C5, duration: 1.0 },
    { freq: D5, duration: 1.0, chord: [G2, D4, B4] },
    { freq: C5, duration: 2.5, chord: [C3, G3, C4, E4] },

    // Gentle Sparkle Interlude before looping
    { freq: 0, duration: 0.8 },
    { freq: E5, duration: 0.5 },
    { freq: G5, duration: 0.5 },
    { freq: C6, duration: 1.2, chord: [C3, E4, G4] },
    { freq: 0, duration: 1.5 } // Poetic breath pause
  ];

  public init() {
    if (!this.ctx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.38, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Plays a note with a delicate Swiss music box & warm acoustic chime timbre
  private playVoice(freq: number, durationBeats: number, isChord: boolean = false) {
    if (!this.ctx || !this.masterGain || freq <= 0) return;

    const now = this.ctx.currentTime;
    const noteDurationSec = (durationBeats * this.beatDurationMs) / 1000;

    // 1. Primary fundamental oscillator
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = isChord ? 'triangle' : 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    // 2. Bell chime overtone (gives that magical music box sparkle)
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, now); // Octave overtone shimmer

    // 3. Gentle Lowpass filter for dreamy acoustic warmth
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(isChord ? 900 : 2200, now);

    const baseGain = isChord ? 0.08 : 0.22;
    gain1.gain.setValueAtTime(0.001, now);
    gain1.gain.linearRampToValueAtTime(baseGain, now + 0.018);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + Math.max(noteDurationSec * 1.5, 1.6));

    gain2.gain.setValueAtTime(0.001, now);
    gain2.gain.linearRampToValueAtTime(baseGain * 0.35, now + 0.012);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + Math.max(noteDurationSec * 0.8, 0.9));

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain1);
    gain1.connect(this.masterGain);

    osc1.start(now);
    osc1.stop(now + 2.5);
    osc2.start(now);
    osc2.stop(now + 1.8);
  }

  public play() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;

    const playNext = () => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;

      const current = this.birthdayScore[this.noteIndex % this.birthdayScore.length];
      this.noteIndex++;

      // Play main melody note
      if (current.freq > 0) {
        this.playVoice(current.freq, current.duration, false);
      }

      // Play accompaniment chords if available
      if (current.chord && current.chord.length > 0) {
        current.chord.forEach((chordFreq, idx) => {
          window.setTimeout(() => {
            if (this.isPlaying) {
              this.playVoice(chordFreq, current.duration * 1.8, true);
            }
          }, idx * 45); // Subtle arpeggiation for realism
        });
      }

      const delay = current.duration * this.beatDurationMs;
      this.timer = window.setTimeout(playNext, delay);
    };

    playNext();
  }

  public pause() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.ctx && this.masterGain) {
      this.masterGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.2);
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      if (this.ctx && this.masterGain) {
        this.masterGain.gain.setValueAtTime(0.38, this.ctx.currentTime);
      }
      this.play();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  // Magical Sparkle Chime Sound Effect
  public playWishChime() {
    this.init();
    if (!this.ctx) return;

    const chimeNotes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98, 2093.00];
    const now = this.ctx.currentTime;

    chimeNotes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.0001, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.2, now + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 1.3);
    });
  }

  // Soft Wind / Candle Blow Sound Effect
  public playBlowSound() {
    this.init();
    if (!this.ctx) return;

    const bufferSize = this.ctx.sampleRate * 0.6;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(600, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.5);
    filter.Q.setValueAtTime(2.5, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.55);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    whiteNoise.start(now);
    whiteNoise.stop(now + 0.6);
  }

  // Relight Twinkle Sound
  public playIgniteSound() {
    this.init();
    if (!this.ctx) return;

    const notes = [440, 554.37, 659.25, 880];
    const now = this.ctx.currentTime;

    notes.forEach((freq, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.06);

      gain.gain.setValueAtTime(0.001, now + i * 0.06);
      gain.gain.linearRampToValueAtTime(0.12, now + i * 0.06 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.06 + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + i * 0.06);
      osc.stop(now + i * 0.06 + 0.7);
    });
  }

  // Realistic Firecracker Pop & Crackle Sound
  public playFirecrackerSound() {
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    // 1. Initial Muffled Boom
    const boomOsc = this.ctx.createOscillator();
    const boomGain = this.ctx.createGain();
    boomOsc.type = 'sine';
    boomOsc.frequency.setValueAtTime(140, now);
    boomOsc.frequency.exponentialRampToValueAtTime(35, now + 0.35);

    boomGain.gain.setValueAtTime(0.3, now);
    boomGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    boomOsc.connect(boomGain);
    boomGain.connect(this.ctx.destination);
    boomOsc.start(now);
    boomOsc.stop(now + 0.4);

    // 2. Crackle Sparks
    const crackleCount = 5;
    for (let i = 0; i < crackleCount; i++) {
      const crackleTime = now + 0.08 + Math.random() * 0.35;
      const noiseBuffer = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.04, this.ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let j = 0; j < data.length; j++) {
        data[j] = (Math.random() * 2 - 1) * Math.exp(-j / (this.ctx.sampleRate * 0.01));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = noiseBuffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(1200 + Math.random() * 1500, crackleTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.15 + Math.random() * 0.1, crackleTime);
      gain.gain.exponentialRampToValueAtTime(0.001, crackleTime + 0.04);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(crackleTime);
      noise.stop(crackleTime + 0.05);
    }
  }

  // Soft Pop / Celestial chime for gesture taps
  public playSoftPop() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(659.25, now); // E5
    osc.frequency.exponentialRampToValueAtTime(1046.50, now + 0.09); // C6

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.09, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.35);
  }
}

export const ambientSynth = new AmbientMusicEngine();
