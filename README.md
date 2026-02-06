# Valentine's Day Surprise for Prabesh's Girlfriend

A personalized, mobile-responsive single-page website created for Valentine's Day 2026.

## 📂 Project Structure
- `index.html`: The main page containing all content.
- `style.css`: The styling, colors, and animations.
- `script.js`: The interactive logic (countdown, music, confetti).

## 🛠️ How to Customize

### 1. Photos
Open `index.html` and look for the `<!-- Photo Gallery -->` section.
Replace the `src` attribute of the `<img>` tags with your own photo URLs.
- **Option A**: Upload photos to [Imgur](https://imgur.com/) or another image host and copy the direct link (ending in .jpg or .png).
- **Option B**: If hosting locally, create an `images` folder, put your photos there, and link them like `images/photo1.jpg`.

### 2. Personal Messages
You can edit the text in `index.html`:
- Look for `<section id="message">` to change the main paragraph.
- Look for `<ul>` under "Why I Love You" to add or change reasons.

### 3. Music (YouTube Playlist)
Currently, it plays a Nepali Love Songs playlist.
To change it, open `script.js` and find:
```javascript
playerVars: { 'listType': 'playlist', 'list': 'YOUR_PLAYLIST_ID', ... }
```
Replace `PLgamhZJXK0RAA5NLmofHguWB9wBS-S38S` with your desired YouTube Playlist ID.

### 4. Music (Local MP3 — Autoplay)
If you prefer to play a local MP3 automatically, place your file at `audio/nepali-love.mp3` relative to the project root.
The site will attempt to autoplay and loop the track on page load. Note: modern browsers may block autoplay with sound until the user interacts with the page — the script will then start playback on the first click/tap.

Alternatively, use an absolute URL in `script.js` (replace the `bgAudio.src` value) to stream from a remote MP3 host.

## 🚀 How to Host for Free (Netlify)

1.  **Go to [Netlify Drop](https://app.netlify.com/drop)**.
2.  Drag and drop the folder containing these files onto the page.
3.  Netlify will upload and give you a random URL (e.g., `cranky-wozniak-123456.netlify.app`).
4.  **Rename the site**:
    - Click "Site Settings" > "Change site name".
    - Change it to something like `prabesh-valentine-2026`.
    - Your new URL will be: `https://prabesh-valentine-2026.netlify.app`.

## 📱 Features
- **Countdown**: Automatically counts down to Feb 14, 2026 (Nepal Time).
- **Confetti**: Explodes on load and when the poem is revealed.
- **Mobile Friendly**: Looks great on phones.
- **Nepali Touch**: Cultural hints in the design and content.

Happy Valentine's Day! ❤️
