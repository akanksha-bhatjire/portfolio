# Akanksha Luxe Artistry — website

Static site: open `index.html` or host the folder as-is (GitHub Pages, Netlify, Vercel).

## Publish on GitHub Pages
1. Create a new repository on GitHub and upload everything in this folder (keep the folder structure).
2. Repository **Settings → Pages → Source: Deploy from a branch → main / (root)** → Save.
3. The site goes live at `https://<your-username>.github.io/<repo-name>/` in a minute or two.

## Folder structure
- `index.html` — the whole website (styles and scripts are inside it)
- `media/img/` — photos (WebP), `media/vid/` — videos (MP4)
- `og-image.jpg` — preview image shown when the link is shared

## Removing the birthday gift box (after 28 October)
In `index.html`, delete everything from `<!-- GIFTBOX START` to `<!-- GIFTBOX END -->` near the top. The gift box's styles and script are inside that block.

Fonts load from Google Fonts; everything else is local.
