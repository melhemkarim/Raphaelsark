# Raphael Sark (unofficial concept site by Linky)

Next.js 15 (App Router) + TypeScript. No UI libraries, just CSS and small hooks.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Edit things

| What | Where |
| --- | --- |
| Add or change TikToks | `src/data/videos.ts` (paste the full video URL) |
| Add Raphael's photo | Put an approved photo in `public/` and set `PHOTO_SRC` in `src/data/content.ts` (for example `"/raphael.jpg"`) |
| Mom phrases, family quiz questions, Iris lines | `src/data/content.ts` |
| Background doodles | `public/doodles.webp` is the repeating wallpaper. To change the drawings or layout, edit `scripts/doodles/make_tile.py` and run it. Strength and size are `--doodle-a` and `--tile` at the top of `globals.css` |
| El moteur game lines and ranks | `src/data/content.ts` |
| Colors, spacing, animations | `src/app/globals.css` (colors are variables at the top, dark mode included) |
| Iris's colors (she is drawn as a husky) | `IRIS_LOOK` in `src/data/content.ts` (she is drawn in code, so there is no photo to upload) |
| Clothing brand name and link | `BRAND` in `src/data/content.ts` |
| Contact email and social links | `src/data/content.ts` |

## Notes

- TikTok videos load only after a tap, so the page stays fast and no TikTok scripts run until then.
- The "Add photo" and "Remove" buttons are for previewing while you build. Delete the `photo-tools` block in `src/components/PhotoSlot.tsx` before sending it to Raphael.
- Fonts (Bricolage Grotesque and Rubik) load from Google Fonts in `src/app/layout.tsx`.
- Animations respect "reduce motion" and the page works without JavaScript animations.
- `robots` is set to noindex because this is an unofficial concept. Remove it in `layout.tsx` once Raphael approves.
- Check the Lebanese Arabizi spelling with a native speaker before showing it to him.
