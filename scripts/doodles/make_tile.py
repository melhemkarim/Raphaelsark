"""
Builds public/doodles.webp, the wallpaper tile used by the page background.

  pip install pillow numpy scipy
  python scripts/doodles/make_tile.py

It cuts the four characters out of source.png, turns the black ink into
transparency (the site tints it with CSS, so it works in light and dark mode),
and scatters them into a tile that repeats without a visible seam.
Change LAYOUT below to move, resize or rotate characters.
"""
import os
import numpy as np
from PIL import Image
from scipy import ndimage as ndi

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "source.png")
OUT = os.path.join(HERE, "..", "..", "public", "doodles.webp")

TILE = 2400  # px. The CSS shows it at roughly half this size.

# name -> a box (x0, y0, x1, y1) around that character in source.png
BOXES = {
    "polo":  (194, 17, 559, 642),
    "wine":  (875, 20, 1397, 530),
    "beard": (420, 524, 923, 931),
    "frog":  (1023, 518, 1490, 935),
}

# (character, x, y, scale, rotation in degrees). x, y is the centre in the tile.
# Rows are offset like bricks, and characters are never next to themselves.
LAYOUT = [
    ("wine",  330,  300, 0.95,  -6),
    ("polo", 1480,  330, 0.78,   5),
    ("beard", 880,  900, 1.00,   7),
    ("frog", 2060,  930, 1.00,  -7),
    ("polo",  330, 1500, 0.82,  -5),
    ("frog", 1450, 1520, 0.95,   8),
    ("wine",  880, 2090, 0.95,   6),
    ("beard",2060, 2080, 0.95,  -6),
]


def load_characters():
    gray = np.array(Image.open(SRC).convert("L"), dtype=np.float32)
    # Ink -> opaque, paper -> transparent. Soft edge so the line art keeps its texture.
    alpha = np.clip((235 - gray) / (235 - 60), 0, 1)
    ink = gray < 150
    blobs, _ = ndi.label(ndi.binary_dilation(ink, iterations=8))
    chars = {}
    for name, (x0, y0, x1, y1) in BOXES.items():
        # The drawing that fills most of the box is the character.
        counts = np.bincount(blobs[y0:y1, x0:x1].ravel())
        counts[0] = 0
        lab = int(counts.argmax())
        if lab == 0:
            raise SystemExit(f"no drawing found for {name}")
        region = ndi.binary_dilation(blobs == lab, iterations=2)  # only this character
        ys, xs = np.where(region)
        a = (alpha * region)[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
        im = Image.new("LA", a.shape[::-1], (0, 0))
        im.putdata([(0, int(v * 255)) for v in a.ravel()])
        chars[name] = im
    return chars


def main():
    chars = load_characters()
    tile = Image.new("LA", (TILE, TILE), (0, 0))
    for name, x, y, scale, rot in LAYOUT:
        im = chars[name]
        im = im.resize((round(im.width * scale), round(im.height * scale)), Image.LANCZOS)
        im = im.rotate(rot, expand=True, resample=Image.BICUBIC)
        # Paste copies on every side so anything near an edge wraps around.
        for dx in (-TILE, 0, TILE):
            for dy in (-TILE, 0, TILE):
                px, py = x - im.width // 2 + dx, y - im.height // 2 + dy
                if px < TILE and py < TILE and px + im.width > 0 and py + im.height > 0:
                    layer = Image.new("LA", (TILE, TILE), (0, 0))
                    layer.paste(im, (px, py))
                    tile = Image.alpha_composite(tile.convert("RGBA"), layer.convert("RGBA")).convert("LA")
    rgba = tile.convert("RGBA")
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    rgba.save(OUT, "WEBP", lossless=True, quality=100, method=6)
    print("wrote", os.path.normpath(OUT), os.path.getsize(OUT) // 1024, "KB")
    # Preview on a yellow background so the arrangement is easy to judge.
    prev = Image.new("RGBA", (TILE, TILE), (255, 210, 31, 255))
    ink = Image.new("RGBA", (TILE, TILE), (23, 20, 43, 255))
    ink.putalpha(rgba.getchannel("A"))
    prev.alpha_composite(ink)
    prev.convert("RGB").resize((900, 900), Image.LANCZOS).save("/home/claude/work/shots/tile-preview.png")


if __name__ == "__main__":
    main()
