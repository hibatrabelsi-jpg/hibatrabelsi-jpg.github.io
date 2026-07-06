#!/usr/bin/env python3
"""
Incruste le texte (hook + sections + CTA) sur les frames PNG avec Pillow,
puis ré-encode en MP4 avec FFmpeg.

Pourquoi Pillow ? Le FFmpeg installé n'a pas le filtre drawtext.

Design : look cinématique minimal — dégradé doux (scrim) au lieu d'un pavé noir,
police Avenir Next Heavy avec letter-spacing, label "eyebrow" + filet beige sur le hook.

Usage:
  python3 scripts/bake-text.py instagram
  python3 scripts/bake-text.py linkedin
"""

import os
import sys
import glob
import subprocess
from PIL import Image, ImageDraw, ImageFont

# Polices (collections .ttc → index de la graisse)
FONT_FILE = "/System/Library/Fonts/Avenir Next.ttc"
IDX_HEAVY = 8     # Avenir Next Heavy  → titres
IDX_DEMI = 2      # Avenir Next Demi Bold → eyebrow / CTA secondaire
IDX_MEDIUM = 5    # Avenir Next Medium

# Couleurs (marque)
WHITE = (255, 255, 255, 255)
BEIGE = (246, 222, 205, 255)   # #f6decd
SHADOW = (0, 0, 0, 170)

W, H = 1080, 1920


def font(idx, size):
    try:
        return ImageFont.truetype(FONT_FILE, size, index=idx)
    except Exception:
        return ImageFont.load_default()


def text_width(draw, text, fnt, tracking):
    """Largeur d'une ligne avec letter-spacing (tracking en px)."""
    w = 0
    for ch in text:
        bbox = draw.textbbox((0, 0), ch, font=fnt)
        w += (bbox[2] - bbox[0]) + tracking
    if text:
        w -= tracking
    return w


def draw_tracked(draw, x, y, text, fnt, fill, tracking, shadow=True):
    """Dessine une ligne caractère par caractère avec letter-spacing."""
    cx = x
    for ch in text:
        bbox = draw.textbbox((0, 0), ch, font=fnt)
        cw = bbox[2] - bbox[0]
        if shadow:
            draw.text((cx + 2, y + 3), ch, font=fnt, fill=SHADOW)
        draw.text((cx, y), ch, font=fnt, fill=fill)
        cx += cw + tracking


def gradient_scrim(img, position):
    """Dégradé alpha doux (cinématique) au lieu d'un pavé opaque."""
    scrim = Image.new("L", (1, H), 0)
    px = scrim.load()
    band = int(H * 0.46)
    peak = 150  # opacité max du noir
    for y in range(H):
        if position == "top":
            a = peak * max(0.0, 1.0 - (y / band)) if y < band else 0
        else:  # bottom
            start = H - band
            a = peak * max(0.0, (y - start) / band) if y > start else 0
        px[0, y] = int(a)
    scrim = scrim.resize((W, H))
    black = Image.new("RGBA", (W, H), (0, 0, 0, 255))
    black.putalpha(scrim)
    img.alpha_composite(black)


def draw_block(img, ov):
    """Dessine un bloc de texte stylé (eyebrow + titre + filet)."""
    draw = ImageDraw.Draw(img, "RGBA")

    text = ov["text"]
    size = ov["size"]
    position = ov["position"]
    color = ov.get("color", WHITE)
    eyebrow = ov.get("eyebrow")
    accent = ov.get("accent", False)
    tracking = ov.get("tracking", int(size * 0.04))

    title_font = font(IDX_HEAVY, size)
    lines = text.split("\n")
    line_spacing = int(size * 0.10)

    # Hauteur de ligne basée sur les métriques réelles (ascent+descent)
    ascent, descent = title_font.getmetrics()
    line_h = ascent + descent

    line_sizes = []
    for ln in lines:
        lw = text_width(draw, ln, title_font, tracking)
        line_sizes.append((lw, line_h))

    block_h = line_h * len(lines) + line_spacing * (len(lines) - 1)

    # eyebrow
    eb_font = font(IDX_DEMI, int(size * 0.30))
    eb_track = int(size * 0.16)
    eb_h = 0
    if eyebrow:
        ebb = draw.textbbox((0, 0), eyebrow, font=eb_font)
        eb_h = (ebb[3] - ebb[1]) + int(size * 0.42)

    if position == "top":
        y0 = int(H * 0.13) + eb_h
    elif position == "bottom":
        y0 = int(H * 0.76)
    else:
        y0 = (H - block_h) // 2

    # eyebrow au-dessus du titre
    if eyebrow:
        ew = text_width(draw, eyebrow, eb_font, eb_track)
        ex = (W - ew) // 2
        ey = y0 - eb_h
        draw_tracked(draw, ex, ey, eyebrow, eb_font, BEIGE, eb_track, shadow=True)

    # lignes du titre
    y = y0
    for i, ln in enumerate(lines):
        lw, lh = line_sizes[i]
        x = (W - lw) // 2
        draw_tracked(draw, x, y, ln, title_font, color, tracking, shadow=True)
        y += lh + line_spacing

    # filet beige sous le bloc (y a déjà avancé après la dernière ligne)
    if accent:
        line_w = int(W * 0.16)
        lx0 = (W - line_w) // 2
        ly = y - line_spacing + int(size * 0.22)
        draw.rectangle([lx0, ly, lx0 + line_w, ly + 5], fill=BEIGE)


CONFIGS = {
    "instagram": {
        "frames_dir": "dist/videos/instagram",
        "clean_source": "dist/videos/instagram-reel.mp4",
        "output": "dist/videos/instagram-reel-final.mp4",
        "fps": 30,
        "overlays": [
            {"t": (0, 4),  "eyebrow": "N O U V E A U", "text": "MON SITE EST\nENFIN EN LIGNE", "size": 92, "position": "top", "accent": True, "scrim": "top"},
            {"t": (6, 10), "text": "VOYAGES\nSUR MESURE", "size": 88, "position": "top", "scrim": "top"},
            {"t": (12, 16),"text": "4 FORMULES\nPOUR VOUS", "size": 88, "position": "top", "scrim": "top"},
            {"t": (18, 22),"eyebrow": "À PARTIR DE", "text": "109€", "size": 128, "position": "top", "accent": True, "scrim": "top"},
            {"t": (24, 28),"text": "+10 AVIS GOOGLE\n★★★★★", "size": 78, "position": "top", "color": BEIGE, "scrim": "top"},
            {"t": (30, 34),"text": "100%\nPERSONNALISÉ", "size": 84, "position": "top", "scrim": "top"},
            {"t": (38, 60),"eyebrow": "LIEN EN BIO", "text": "hibatravel.com", "size": 84, "position": "bottom", "color": BEIGE, "accent": True, "scrim": "bottom"},
        ],
    },
    "linkedin": {
        "frames_dir": "dist/videos/linkedin",
        "clean_source": "dist/videos/linkedin-video.mp4",
        "output": "dist/videos/linkedin-video-final.mp4",
        "fps": 30,
        "overlays": [
            {"t": (0, 4),  "eyebrow": "LANCEMENT OFFICIEL", "text": "HIBA TRAVEL\nPLANNER", "size": 90, "position": "top", "accent": True, "scrim": "top"},
            {"t": (6, 11), "text": "VOYAGES\nSUR MESURE", "size": 86, "position": "top", "scrim": "top"},
            {"t": (13, 18),"text": "PARTICULIERS\n& ENTREPRISES", "size": 78, "position": "top", "scrim": "top"},
            {"t": (20, 25),"text": "LOGISTIQUE\n100% MANAGÉE", "size": 80, "position": "top", "scrim": "top"},
            {"t": (27, 32),"text": "+10 AVIS GOOGLE\n★★★★★", "size": 76, "position": "top", "color": BEIGE, "scrim": "top"},
            {"t": (35, 45),"eyebrow": "DÉCOUVREZ LE SITE", "text": "hibatravel.com", "size": 82, "position": "bottom", "color": BEIGE, "accent": True, "scrim": "bottom"},
        ],
    },
}


def bake(config_key):
    cfg = CONFIGS[config_key]
    frames_dir = cfg["frames_dir"]
    fps = cfg["fps"]

    frames = sorted(glob.glob(os.path.join(frames_dir, "frame-*.png")))
    if not frames:
        print(f"❌ Aucune frame trouvée dans {frames_dir}")
        return False

    print(f"\n🎬 Incrustation texte — {config_key.upper()}")
    print(f"  📁 {len(frames)} frames")

    modified = 0
    for idx, fpath in enumerate(frames):
        t = idx / fps
        active = [o for o in cfg["overlays"] if o["t"][0] <= t <= o["t"][1]]
        if not active:
            continue

        img = Image.open(fpath).convert("RGBA")
        # scrim une seule fois (le plus large)
        scrims = {o.get("scrim") for o in active if o.get("scrim")}
        for s in scrims:
            gradient_scrim(img, s)
        for o in active:
            draw_block(img, o)
        img.convert("RGB").save(fpath)
        modified += 1

        if modified % 100 == 0:
            print(f"  ✓ {modified} frames avec texte traitées")

    print(f"  ✓ {modified} frames avec texte incrusté")

    print(f"  🎥 Encodage final...")
    pattern = os.path.join(frames_dir, "frame-%05d.png")
    out = cfg["output"]
    cmd = [
        "ffmpeg", "-y",
        "-framerate", str(fps),
        "-i", pattern,
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-preset", "medium",
        "-crf", "20",
        out,
    ]
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode == 0 and os.path.exists(out):
        size_mb = os.path.getsize(out) / (1024 * 1024)
        print(f"  ✅ {out} ({size_mb:.1f} MB) — PRÊT À POSTER")
        return True
    else:
        print(f"  ❌ Erreur encodage: {res.stderr[-300:]}")
        return False


def main():
    target = sys.argv[1] if len(sys.argv) > 1 else None
    keys = [target] if target in CONFIGS else list(CONFIGS.keys())
    for k in keys:
        bake(k)


if __name__ == "__main__":
    main()
