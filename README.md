# 🔤 Word Search Game

Ad-free word search game with **6969 levels**, friends rounds, hard vocabulary, and a beautiful mobile-first UI.

## Features
- 6969 levels with increasing difficulty
- **Friends levels** every 10 levels — find your squad's names in the grid
- **Hard English word levels** every 15 levels — obscure vocabulary challenge
- All 8 directions: horizontal, vertical, diagonal, forward, backward
- Coin system with hint support
- Progress saved locally on device
- Works as a PWA — can be "Add to Home Screen" on iOS/Android

---

## 🚀 Deploy to Vercel (3 steps)

### Option A — Via GitHub (recommended)

1. **Push this folder to a GitHub repo**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/wordsearch.git
   git push -u origin main
   ```

2. **Go to [vercel.com](https://vercel.com)** → New Project → Import your GitHub repo

3. **Click Deploy** — Vercel auto-detects Next.js, no config needed ✅

---

### Option B — Via Vercel CLI

```bash
npm install -g vercel
cd wordsearch
npm install
vercel
```
Follow the prompts, and it'll be live in under a minute.

---

## 💻 Run Locally

```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

---

## 📱 Add to Home Screen (iOS)

1. Open the deployed URL in Safari
2. Tap the **Share** button
3. Tap **Add to Home Screen**
4. The game will open fullscreen like a native app!

---

## Project Structure

```
wordsearch/
├── pages/
│   ├── _app.js          # Global styles entry
│   ├── _document.js     # PWA meta tags
│   └── index.js         # Main page
├── components/
│   ├── Game.jsx          # Main game UI
│   ├── Game.module.css
│   ├── WordGrid.jsx      # The interactive letter grid
│   ├── WordGrid.module.css
│   ├── WinModal.jsx      # Level complete screen
│   └── WinModal.module.css
├── lib/
│   ├── gameData.js       # All categories, friends, hard words, level logic
│   ├── gridBuilder.js    # Word placement algorithm
│   └── useGameState.js   # Game state hook
├── public/
│   ├── manifest.json     # PWA manifest
│   └── icon-192.svg      # App icon
├── styles/
│   └── globals.css
├── vercel.json
└── package.json
```

---

## 🎮 Adding More Friends

Edit `lib/gameData.js` → `ALL_FRIENDS` array. Names are automatically batched into groups of 7 for each friends level.

## 🗂 Adding More Categories

Edit `lib/gameData.js` → `CATEGORY_POOL` array. Add a new object:
```js
{ cat: "YOUR CATEGORY", emoji: "🎯", words: ["WORD1","WORD2","WORD3","WORD4","WORD5","WORD6","WORD7"] }
```
