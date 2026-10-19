/**
 * Web Audio Ambient Music Synthesizer
 * Generates an enchanting, cinematic ambient piano / music box melody
 * completely offline with zero external audio assets needed.
 */

class AmbientMusicEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timer: number | null = null;
  private masterGain: GainNode | null = null;
  private noteIndex: number = 0;

  // Romantic Pentatonic Chord Progression in C/G/Am/F
  private melodyNotes: number[] = [
    261.63, // C4
    329.63, // E4
    392.00, // G4
    523.25, // C5
    440.00, // A4
    392.00, // G4
    329.63, // E4
    293.66, // D4
    349.23, // F4
    440.00, // A4
    523.25, // C5
    659.25, // E5
    587.33, // D5
    493.88, // B4
    392.00, // G4
    329.63  // E4
  ];

  public init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public play() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;

    const playNextNote = () => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;

      const freq = this.melodyNotes[this.noteIndex % this.melodyNotes.length];
      this.noteIndex++;

      // Create warm oscillator (triangle with gentle sine chime)
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      // Soft tone shaping
      osc.type = this.noteIndex % 3 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Lowpass filter for dreamy warm sound
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      noteGain.gain.setValueAtTime(0.001, now);
      noteGain.gain.exponentialRampToValueAtTime(0.18, now + 0.12);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

      osc.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 3.0);

      // Schedule next note with humanized timing
      const delay = (this.noteIndex % 4 === 0 ? 1200 : 750) + (Math.random() * 80 - 40);
      this.timer = window.setTimeout(playNextNote, delay);
    };

    playNextNote();
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
        this.masterGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
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
