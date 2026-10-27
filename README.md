# Akanksha Luxe Artistry — website

Static site: open `index.html` or host the folder as-is (GitHub Pages, Netlify, Vercel).

## Publish on GitHub Pages
1. Create a new repository on GitHub and upload everything in this folder (keep the folder structure).
2. Repository **Settings → Pages → Source: Deploy from a branch → main / (root)** → Save.
3. The site goes live at `https://<your-username>.github.io/<repo-name>/` in a minute or two.

## Folder structure
- `index.html` — the whole website (styles and scripts are inside it)
- `media/img/` — photos (WebP), `media/vid/` — videos (MP4)
- `giftbox/` — the temporary birthday intro (28 October)
- `og-image.jpg` — preview image shown when the link is shared

## Removing the birthday gift box (after 28 October)
1. Delete the `giftbox/` folder.
2. In `index.html`, delete the block between `<!-- GIFTBOX START` and `<!-- GIFTBOX END -->` (5 lines near the top).

Fonts load from Google Fonts; everything else is local.
