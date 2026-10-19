export interface GalleryItem {
  id: number;
  url: string;
  caption: string;
  subcaption?: string;
}

export interface SpecialReason {
  id: number;
  title: string;
  description: string;
  iconName: 'sparkles' | 'heart' | 'smile' | 'sun' | 'camera' | 'gem';
}

export interface BirthdayConfig {
  // Personal Details
  personName: string;
  nickname?: string;
  birthdayDate: string;
  relationship: string;
  siteTitle: string;
  heroSubtitle: string;

  // Visual Assets
  mainPhoto: string;
  galleryPhotos: GalleryItem[];

  // Letter Section
  letter: {
    heading: string;
    greeting: string;
    paragraphs: string[];
    closing: string;
    signature: string;
  };

  // 6 Special Reasons
  reasons: SpecialReason[];

  // Birthday Wishes & Cake Section
  wishes: {
    heading: string;
    subheading: string;
    blowCandlePrompt: string;
    blownWishMessage: string;
    cakeWishTitle: string;
  };

  // Final Closing Surprise
  finalSurprise: {
    line1: string;
    line2: string;
    closingWish: string;
    replayButtonText: string;
  };

  // Audio Settings
  music: {
    audioSrc: string; // Will fall back to gentle procedural ambient synth if file not found
    trackTitle: string;
  };
}

export const birthdayData: BirthdayConfig = {
  // 1. Personal Details (Easily change these for your special person!)
  personName: "Anjali",
  nickname: "Anju",
  birthdayDate: "November 27",
  relationship: "Best Friend / Sister",
  siteTitle: "A Little World Made for You",
  heroSubtitle: "A celebration of your warmth, grace, and the light you bring into every room.",

  // 2. Photographs
  // Place your photograph at: public/images/birthday-person.jpg
  mainPhoto: "/images/birthday-person.png",

  // Photo Memory Gallery
  // Place photographs in: public/images/gallery/
  galleryPhotos: [
    {
      id: 1,
      url: "/images/gallery/photo1.jpg",
      caption: "A Radiant Smile",
      subcaption: "The warmth, grace, and light that brightens everything"
    },
    {
      id: 2,
      url: "/images/gallery/photo2.jpg?v=2",
      caption: "Grace & Radiance",
      subcaption: "Lighting up every moment with pure elegance"
    },
    {
      id: 3,
      url: "/images/gallery/photo3.jpg?v=2",
      caption: "Timeless Charm",
      subcaption: "A beauty that shines effortlessly in every frame"
    },
    {
      id: 4,
      url: "/images/gallery/photo4.png?v=4",
      caption: "Elegance & Poise",
      subcaption: "Graceful, confident, and stunning in every detail"
    },
    {
      id: 5,
      url: "/images/gallery/photo5.png?v=4",
      caption: "Free Spirit",
      subcaption: "Walking into new chapters with courage and joy"
    },
    {
      id: 6,
      url: "/images/gallery/photo6.jpg?v=2",
      caption: "A Golden Reflection",
      subcaption: "A true queen celebrating her most magical year"
    }
  ],

  // 3. Editorial Birthday Letter
  letter: {
    heading: "A Little Letter for You",
    greeting: "Dear Anjali,",
    paragraphs: [
      "Today is all about you. I hope this new chapter of your life brings you endless happiness, beautiful memories, new opportunities, and countless reasons to smile.",
      "You deserve all the wonderful things life has to offer. Never forget how special you are, how deeply you are appreciated, and how much joy your presence brings to everyone fortunate enough to know you.",
      "May this coming year be your most extraordinary journey yet—filled with peace in your heart, laughter in your days, and the courage to pursue every single one of your dreams."
    ],
    closing: "With all my warmth & love,",
    signature: "Always by your side"
  },

  // 4. Six Reasons You're Special
  reasons: [
    {
      id: 1,
      title: "Your Beautiful Smile",
      description: "The way your eyes light up whenever you laugh makes every moment immediately brighter and warmer.",
      iconName: "smile"
    },
    {
      id: 2,
      title: "Your Genuine Kindness",
      description: "You possess a gentle, empathetic heart that notices others and makes everyone feel truly valued and seen.",
      iconName: "heart"
    },
    {
      id: 3,
      title: "Your Unique Spirit",
      description: "Authentic, curious, vibrant, and effortlessly captivating in everything you do.",
      iconName: "sparkles"
    },
    {
      id: 4,
      title: "The Happiness You Bring",
      description: "Being in your presence feels like an instant exhale. You transform ordinary days into cherished memories.",
      iconName: "sun"
    },
    {
      id: 5,
      title: "The Memories We Share",
      description: "From deep conversations under the stars to spontaneous laughter, every chapter with you is golden.",
      iconName: "camera"
    },
    {
      id: 6,
      title: "The Wonderful Person You Are",
      description: "Graceful, thoughtful, resilient, and an unending source of inspiration.",
      iconName: "gem"
    }
  ],

  // 5. Interactive Cake & Wishes
  wishes: {
    heading: "Make a Birthday Wish",
    subheading: "Close your eyes, think of your sweetest dream, and blow out the candles.",
    blowCandlePrompt: "Make a Wish ✨",
    blownWishMessage: "May all your beautiful wishes come true!",
    cakeWishTitle: "The Candles Are Blown ✨"
  },

  // 6. Final Closing Surprise
  finalSurprise: {
    line1: "And finally, one last thing...",
    line2: "You make this world a little more beautiful just by being in it.",
    closingWish: "Happy Birthday, Anjali ❤️",
    replayButtonText: "Replay Your Surprise"
  },

  // 7. Ambient Music
  music: {
    audioSrc: "/music/background.mp3",
    trackTitle: "Enchanted Birthday Melody"
  }
};
