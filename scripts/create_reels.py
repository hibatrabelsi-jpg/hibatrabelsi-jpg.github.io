#!/usr/bin/env python3
"""
Script pour créer les Reels Instagram et LinkedIn automatiquement
Utilise Selenium + moviepy + PIL pour tout faire

Installation:
pip install selenium moviepy pillow imageio imageio-ffmpeg

Usage:
python scripts/create_reels.py
"""

import os
import time
from pathlib import Path
from selenium import webdriver
from selenium.webdriver.common.by import By
from PIL import Image, ImageDraw, ImageFont
from moviepy import ImageClip, concatenate_videoclips, concatenate_audioclips, AudioFileClip
import numpy as np

# Configuration
INSTAGRAM_CONFIG = {
    'name': 'Instagram Reel',
    'width': 1080,
    'height': 1920,
    'duration': 60,  # secondes
    'output': 'dist/videos/instagram-reel.mp4',
    'music': None,  # Ajouter la musique avec CapCut en post-production
}

LINKEDIN_CONFIG = {
    'name': 'LinkedIn Video',
    'width': 1080,
    'height': 1920,
    'duration': 45,  # secondes
    'output': 'dist/videos/linkedin-video.mp4',
    'music': None,  # Ajouter la musique avec CapCut en post-production
}

class ReelGenerator:
    def __init__(self, config):
        self.config = config
        self.screenshots = []
        self.output_dir = 'dist/videos'

        # Créer répertoire de sortie
        Path(self.output_dir).mkdir(parents=True, exist_ok=True)

    def capture_screenshots(self):
        """Capturer les screenshots en scrollant le site"""
        print(f"\n📸 Capture des screenshots pour {self.config['name']}...")

        # Initialiser Selenium
        options = webdriver.ChromeOptions()
        options.add_argument('--headless')
        options.add_argument(f"--window-size={self.config['width']},{self.config['height']}")

        driver = webdriver.Chrome(options=options)

        try:
            # Aller sur le site
            driver.get('http://localhost:5174')
            time.sleep(3)  # Attendre le chargement

            # Obtenir la hauteur totale de la page
            page_height = driver.execute_script('return document.documentElement.scrollHeight')
            print(f"  📐 Hauteur totale: {page_height}px")

            # Nombre total de frames
            fps = 30
            total_frames = fps * self.config['duration']
            scroll_per_frame = (page_height - self.config['height']) / total_frames

            print(f"  📊 Frames à capturer: {total_frames}")
            print(f"  📍 Scroll par frame: {scroll_per_frame:.2f}px")

            # Capturer chaque frame
            for i in range(total_frames):
                # Scroller
                y = scroll_per_frame * i
                driver.execute_script(f'window.scrollTo(0, {y})')

                # Screenshot
                screenshot_path = f'{self.output_dir}/frame_{str(i).zfill(5)}.png'
                driver.save_screenshot(screenshot_path)
                self.screenshots.append(screenshot_path)

                # Progression
                if (i + 1) % 30 == 0:
                    print(f"  ✓ {i + 1}/{total_frames} frames")

            print(f"  ✓ {total_frames} screenshots capturés")

        finally:
            driver.quit()

    def add_text_overlays(self):
        """Ajouter du texte sur les screenshots"""
        print(f"✍️  Ajout des textes...")

        # Définir les textes pour chaque moment
        if 'Instagram' in self.config['name']:
            overlays = [
                (0, 3, "L'Évasion\nredéfinie.", 80),
                (5, 8, "4 Formules\npour VOUS", 70),
                (10, 15, "De 109€\nà l'infini", 70),
                (18, 22, "+10 avis\n⭐⭐⭐⭐⭐", 60),
                (25, 30, "Prêt(e) à\npartir?", 75),
                (40, 60, "hibatravel.com", 60),
            ]
        else:  # LinkedIn
            overlays = [
                (0, 3, "Organisation de\nvoyages sur mesure", 65),
                (6, 12, "Particuliers\n& Entreprises", 65),
                (15, 20, "Logistique\n100% managée", 65),
                (25, 30, "+10 avis\n⭐⭐⭐⭐⭐", 55),
                (35, 45, "hibatravelplanner\n@gmail.com", 55),
            ]

        # Appliquer les overlays
        for screenshot_path in self.screenshots:
            frame_num = int(screenshot_path.split('_')[1].split('.')[0])
            time_s = frame_num / 30  # 30 fps

            # Ouvrir l'image
            img = Image.open(screenshot_path)
            draw = ImageDraw.Draw(img, 'RGBA')

            # Chercher les overlays pour ce moment
            for start, end, text, fontsize in overlays:
                if start <= time_s <= end:
                    try:
                        # Utiliser une police système
                        font = ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', fontsize)
                    except:
                        font = ImageFont.load_default()

                    # Calculer la position (centré)
                    bbox = draw.textbbox((0, 0), text, font=font)
                    text_width = bbox[2] - bbox[0]
                    text_height = bbox[3] - bbox[1]

                    x = (self.config['width'] - text_width) // 2
                    y = self.config['height'] // 4  # En haut du tiers supérieur

                    # Ajouter un fond semi-transparent
                    draw.rectangle(
                        [(x - 20, y - 20), (x + text_width + 20, y + text_height + 20)],
                        fill=(0, 0, 0, 100)
                    )

                    # Écrire le texte
                    draw.text((x, y), text, fill=(255, 255, 255, 255), font=font)

            # Sauvegarder
            img.save(screenshot_path)

        print(f"  ✓ Textes ajoutés sur {len(self.screenshots)} frames")

    def create_video(self):
        """Créer la vidéo à partir des screenshots"""
        print(f"🎥 Création de la vidéo...")

        # Charger les images
        clips = [ImageClip(path).set_duration(1/30) for path in self.screenshots]

        # Créer la vidéo
        video = concatenate_videoclips(clips, method='chain')

        # Ajouter la musique (si elle existe)
        music_path = self.config.get('music')
        if music_path and os.path.exists(music_path):
            audio = AudioFileClip(music_path)
            # Boucler la musique si nécessaire
            if audio.duration < video.duration:
                audio = concatenate_audioclips([audio] * (int(video.duration // audio.duration) + 1))
            audio = audio.set_duration(video.duration)
            video = video.set_audio(audio)
        else:
            if music_path:
                print(f"  ⚠️  Musique non trouvée: {music_path}")
            print(f"  ℹ️  Vidéo sans musique (à ajouter avec CapCut en post-production)")

        # Écrire la vidéo
        output_path = self.config['output']
        print(f"  🎬 Encoding vidéo (peut prendre 1-2 min)...")
        video.write_videofile(output_path, fps=30, verbose=False, logger=None)

        print(f"  ✓ Vidéo créée: {output_path}")

        # Nettoyer
        self.cleanup_screenshots()

    def cleanup_screenshots(self):
        """Supprimer les screenshots temporaires"""
        for screenshot in self.screenshots:
            if os.path.exists(screenshot):
                os.remove(screenshot)
        print(f"  ✓ Fichiers temporaires supprimés")

    def generate(self):
        """Générer le reel complet"""
        print(f"\n{'='*50}")
        print(f"🎬 Génération du {self.config['name']}")
        print(f"{'='*50}")

        self.capture_screenshots()
        self.add_text_overlays()
        self.create_video()

        print(f"\n✅ {self.config['name']} généré avec succès!")
        print(f"📁 Fichier: {self.config['output']}")


def main():
    """Générer les deux reels"""
    try:
        print("\n🎥 Génération des Reels Hiba Travel Planner\n")

        # Générer Instagram
        instagram = ReelGenerator(INSTAGRAM_CONFIG)
        instagram.generate()

        # Générer LinkedIn
        linkedin = ReelGenerator(LINKEDIN_CONFIG)
        linkedin.generate()

        print(f"\n{'='*50}")
        print(f"✨ TOUS LES REELS SONT PRÊTS!")
        print(f"{'='*50}")
        print(f"\n📱 Instagram: {INSTAGRAM_CONFIG['output']}")
        print(f"💼 LinkedIn: {LINKEDIN_CONFIG['output']}")
        print(f"\n📤 Prêts à uploader sur les réseaux!\n")

    except Exception as e:
        print(f"\n❌ Erreur: {e}")
        import traceback
        traceback.print_exc()


if __name__ == '__main__':
    main()
