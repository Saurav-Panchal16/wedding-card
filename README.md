# Gaurav & Muskan – Wedding Invitation

A static, no-build website (HTML + CSS + JS). Animations use GSAP and Framer Motion,
both bundled locally in `assets/js/vendor`, so the site has no CDN dependency except Google Fonts and the Google Maps embed.

## Edit the details
Open `assets/js/config.js` and change names, date/time, venue, address and map search text.
Events, quotes and gallery captions live in `index.html`.

| What | Where |
|---|---|
| Names, date, venue, address, map | `assets/js/config.js` |
| Event cards (Haldi, Mehndi, Baraat…) | `#schedule` section in `index.html` |
| Ganesh / bride / groom photos | `assets/img/ganesh.jpg`, `bride.jpg`, `groom.jpg` (same names to replace) |
| Gallery photos | `assets/img/gallery-1.jpg … gallery-3.jpg` (add more in `IMGS` in `assets/js/app.js`) |
| Song | add `assets/audio/song.mp3` (falls back to a soft melody if missing) |

## Run locally
```bash
npm run dev      # serves the folder with `serve`, then open the printed URL
```

## Deploy to Vercel
**Option A – GitHub (recommended)**
1. Push this folder to a GitHub repo.
2. Vercel → *Add New… → Project* → import the repo.
3. Framework preset: **Other**. Leave Build Command and Output Directory empty. Deploy.

**Option B – CLI**
```bash
npm i -g vercel
vercel          # first deploy (preview)
vercel --prod   # production
```

## After the first deploy
- Open `index.html` and replace `YOUR-SITE.vercel.app` in the `og:image` meta tag with your real domain,
  so WhatsApp/Facebook link previews show the Ganesh image.
- The site is marked `noindex` (and `robots.txt` disallows crawling) because it is a private invitation.
  Delete the `robots` meta tag and `robots.txt` if you want it to appear in Google.

## Notes
- The map is a Google Maps embed searched by `mapQ` in `config.js`. Check the pin on the live site; if it is off,
  set `mapQ` to the exact address or to the place's coordinates (for example `28.6139,77.2090`).
- Only use photos and songs you have the right to use.
