# 🎂 Premium Birthday Surprise Website

A complete, high-end, personalized birthday-wishing website that feels like a luxury digital experience designed by a creative agency.

Built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, and **Framer Motion**.

---

## ✨ Features

- **Page 1: Cinematic Opening Screen** — "Hey, [NAME]... Someone made something special for you" with a golden glowing entrance button and smooth celebratory confetti.
- **Page 2: Main Birthday Hero** — Framed centerpiece portrait with champagne gold accents, ambient backlight glow, and elegant typography.
- **Page 3: Personal Birthday Letter** — Editorial paper-styled card with wax seal badge, drop-cap typography, and customizable heartfelt message.
- **Page 4: Photo Memories Gallery** — Modern masonry grid with zoom effects and a full-screen interactive lightbox supporting keyboard navigation (Esc, Left, Right).
- **Page 5: Six Reasons You're Special** — Six interactive luxury cards with micro-animations and custom iconography.
- **Page 6: Interactive Birthday Cake** — Animated candle flames that blow out when the user taps *"Make a Wish ✨"*, releasing smoke wisps and champagne confetti, with a relight option.
- **Page 7: Final Surprise & Closing** — Cinematic message with framed vignette and a smooth *"Replay Your Surprise"* rewind button.
- **Ambient Music Experience** — Floating sound equalizer pill. Uses an offline procedural Web Audio synthesizer so audio plays immediately with zero missing-file errors, while seamlessly supporting custom MP3 tracks placed in `public/music/background.mp3`.

---

## 🎨 How to Personalize

All personalization is managed from a **single file**:
👉 [`src/config/birthdayConfig.ts`](src/config/birthdayConfig.ts)

Open this file to customize:
1. **Birthday Person's Name & Nickname** (`personName`, `nickname`)
2. **Birthday Date** (`birthdayDate`)
3. **Relationship** (`relationship`)
4. **Hero Subtitle** (`heroSubtitle`)
5. **Personal Letter Message** (`letter.paragraphs`)
6. **Six Special Reasons** (`reasons`)
7. **Cake Wish Messages** (`wishes`)
8. **Final Sign-off** (`finalSurprise`)

---

## 📸 Adding Real Photographs

### 1. Main Portrait:
Place the birthday person's photograph in:
```
public/images/birthday-person.jpg
```

### 2. Photo Gallery Memories:
Place your photos in:
```
public/images/gallery/
  ├── photo1.jpg
  ├── photo2.jpg
  ├── photo3.jpg
  ├── photo4.jpg
  ├── photo5.jpg
  └── photo6.jpg
```
You can edit the captions in `src/config/birthdayConfig.ts`.

---

## 🎵 Adding Custom Music (Optional)

Place your MP3 audio file at:
```
public/music/background.mp3
```
*Note: If no MP3 is placed, the website automatically plays an enchanting built-in procedural ambient piano synthesizer melody!*

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
```

Open your browser at `http://localhost:5173`.

---

## 🌐 Deploying to Vercel & GitHub

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "feat: personalized birthday surprise website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and log in.
2. Click **"Add New Project"** and select **"Continue with GitHub"**.
3. Select your repository.
4. Vercel automatically detects **Vite**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **"Deploy"**.

Your personalized website will be live worldwide with an HTTPS URL in under a minute!
