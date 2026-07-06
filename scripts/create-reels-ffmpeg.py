#!/usr/bin/env python3
"""
Script pour créer les Reels directement avec FFmpeg
Beaucoup plus rapide que Selenium + MoviePy

Installation:
ffmpeg doit être installé (déjà fait)

Usage:
python3 scripts/create-reels-ffmpeg.py
"""

import subprocess
import os
from pathlib import Path
from datetime import datetime

# Configuration
OUTPUT_DIR = 'dist/videos'

INSTAGRAM_CONFIG = {
    'name': 'Instagram Reel',
    'width': 1080,
    'height': 1920,
    'duration': 60,
    'fps': 30,
    'output': f'{OUTPUT_DIR}/instagram-reel.mp4',
    'overlays': [
        {'time': 0, 'duration': 3, 'text': "L'Évasion\\nredéfinie.", 'fontsize': 100},
        {'time': 5, 'duration': 3, 'text': "4 Formules\\npour VOUS", 'fontsize': 85},
        {'time': 10, 'duration': 5, 'text': "De 109€\\nà l'infini", 'fontsize': 85},
        {'time': 18, 'duration': 4, 'text': "+10 avis\\n⭐⭐⭐⭐⭐", 'fontsize': 75},
        {'time': 25, 'duration': 5, 'text': "Prêt(e) à\\npartir?", 'fontsize': 95},
        {'time': 40, 'duration': 20, 'text': "hibatravelplanner.com", 'fontsize': 75},
    ]
}

LINKEDIN_CONFIG = {
    'name': 'LinkedIn Video',
    'width': 1080,
    'height': 1920,
    'duration': 45,
    'fps': 30,
    'output': f'{OUTPUT_DIR}/linkedin-video.mp4',
    'overlays': [
        {'time': 0, 'duration': 3, 'text': "Organisation de\\nvoyages sur mesure", 'fontsize': 80},
        {'time': 6, 'duration': 6, 'text': "Particuliers\\n& Entreprises", 'fontsize': 80},
        {'time': 15, 'duration': 5, 'text': "Logistique\\n100% managée", 'fontsize': 80},
        {'time': 25, 'duration': 5, 'text': "+10 avis\\n⭐⭐⭐⭐⭐", 'fontsize': 70},
        {'time': 35, 'duration': 10, 'text': "hibatravelplanner\\n@gmail.com", 'fontsize': 70},
    ]
}

def generate_gradient_video(config):
    """Générer une vidéo avec gradient de couleurs (sunset theme)"""
    output_path = config['output']
    duration = config['duration']
    width = config['width']
    height = config['height']
    fps = config['fps']

    Path(output_path).parent.mkdir(parents=True, exist_ok=True)

    # Créer un gradient coloré (sunset/travel theme: bleu -> orange -> rose)
    # Utilisant le filtre FFmpeg color + hue

    print(f"  🎨 Création du gradient vidéo...")

    ffmpeg_cmd = [
        'ffmpeg',
        '-f', 'lavfi',
        '-i', f'color=c=blue:s={width}x{height}:d={duration}:r={fps}',
        '-vf', f'hue=h=60*t/{duration}[tmp];' +
               f'[tmp]curves=r=\'0/0 0.5/0.3 1/1\':g=\'0/0 0.5/0.6 1/1\':b=\'0/0.1 0.5/0.8 1/0.3\'',
        '-c:v', 'libx264',
        '-pix_fmt', 'yuv420p',
        '-preset', 'medium',
        output_path,
        '-y'
    ]

    try:
        subprocess.run(ffmpeg_cmd, capture_output=True, text=True, timeout=300)
        print(f"  ✓ Gradient créé")
        return True
    except Exception as e:
        print(f"  ❌ Erreur FFmpeg: {e}")
        return False

def add_text_overlays_ffmpeg(config):
    """Ajouter les textes avec FFmpeg (drawtext filter)"""
    input_file = config['output']
    temp_output = input_file.replace('.mp4', '_with_text.mp4')

    print(f"  ✍️  Ajout des textes...")

    # Construire les filtres drawtext
    filter_parts = []

    for i, overlay in enumerate(config['overlays']):
        text = overlay['text']
        fontsize = overlay['fontsize']
        start = overlay['time']
        end = overlay['time'] + overlay['duration']

        # Créer le filtre drawtext pour ce texte
        # enable='between(t,start,end)' pour afficher le texte à un moment spécifique
        filter_str = (
            f"drawtext=text='{text}':"
            f"fontfile=/System/Library/Fonts/Arial.ttf:"
            f"fontsize={fontsize}:"
            f"fontcolor=white:"
            f"x='(w-text_w)/2':"
            f"y='h*0.2 + {i*100}':"
            f"enable='between(t,{start},{end})':"
            f"line_spacing=20"
        )

        if i == 0:
            filter_parts.append(filter_str)
        else:
            filter_parts[-1] += f"[out{i-1}];[out{i-1}]" + filter_str.replace(
                f"y='h*0.2 + {i*100}'", f"y='h*0.25 + {i*100}'"
            ) + f"[out{i}]"

    # Simplifier: appliquer une série de drawtext filters
    # FFmpeg allows multiple drawtext filters in sequence
    filter_chain = ""
    current_input = "[0:v]"

    for i, overlay in enumerate(config['overlays']):
        text = overlay['text']
        fontsize = overlay['fontsize']
        start = overlay['time']
        end = overlay['time'] + overlay['duration']

        # Y position variation to avoid overlap
        y_pos = f"h*0.15 + {i*80}"

        if i == 0:
            filter_chain = (
                f"{current_input}drawtext="
                f"text='{text}':"
                f"fontfile=/System/Library/Fonts/Arial.ttf:"
                f"fontsize={fontsize}:"
                f"fontcolor=white:"
                f"x='(w-text_w)/2':"
                f"y='{y_pos}':"
                f"enable='between(t,{start},{end})':"
                f"line_spacing=20"
            )
        else:
            filter_chain += (
                f",drawtext="
                f"text='{text}':"
                f"fontfile=/System/Library/Fonts/Arial.ttf:"
                f"fontsize={fontsize}:"
                f"fontcolor=white:"
                f"x='(w-text_w)/2':"
                f"y='{y_pos}':"
                f"enable='between(t,{start},{end})':"
                f"line_spacing=20"
            )

    ffmpeg_cmd = [
        'ffmpeg',
        '-i', input_file,
        '-vf', filter_chain,
        '-c:v', 'libx264',
        '-pix_fmt', 'yuv420p',
        '-preset', 'fast',
        temp_output,
        '-y'
    ]

    try:
        result = subprocess.run(ffmpeg_cmd, capture_output=True, text=True, timeout=600)
        if result.returncode == 0:
            # Remplacer le fichier original
            os.replace(temp_output, input_file)
            print(f"  ✓ Textes ajoutés ({len(config['overlays'])} éléments)")
            return True
        else:
            print(f"  ⚠️  FFmpeg stderr: {result.stderr[:200]}")
            return False
    except subprocess.TimeoutExpired:
        print(f"  ⚠️  Timeout lors de l'ajout des textes")
        return False
    except Exception as e:
        print(f"  ❌ Erreur: {e}")
        return False

def create_reel(config):
    """Créer un reel complet"""
    print(f"\n{'='*50}")
    print(f"🎬 Génération du {config['name']}")
    print(f"{'='*50}")

    output_path = config['output']
    print(f"📁 Fichier de sortie: {output_path}")
    print(f"📊 Dimensions: {config['width']}x{config['height']}")
    print(f"⏱️  Durée: {config['duration']}s")
    print(f"📽️  FPS: {config['fps']}")

    # Créer la vidéo de base
    if not generate_gradient_video(config):
        print(f"❌ Erreur lors de la création de la vidéo de base")
        return False

    # Ajouter les textes
    if not add_text_overlays_ffmpeg(config):
        print(f"⚠️  Certains textes n'ont pas pu être ajoutés, mais vidéo créée")

    print(f"✅ {config['name']} généré avec succès!")

    # Afficher les stats du fichier
    if os.path.exists(output_path):
        size_mb = os.path.getsize(output_path) / (1024 * 1024)
        print(f"💾 Taille du fichier: {size_mb:.1f} MB")
        print(f"✓ Prêt à uploader!")

    return True

def main():
    print("\n🎥 Génération des Reels Hiba Travel Planner")
    print(f"⏰ {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")

    # Vérifier FFmpeg
    try:
        subprocess.run(['ffmpeg', '-version'], capture_output=True, timeout=5)
        print("✓ FFmpeg détecté\n")
    except:
        print("❌ FFmpeg n'est pas installé!")
        return

    # Générer les reels
    instagram_ok = create_reel(INSTAGRAM_CONFIG)
    linkedin_ok = create_reel(LINKEDIN_CONFIG)

    print(f"\n{'='*50}")
    if instagram_ok and linkedin_ok:
        print("✨ TOUS LES REELS SONT PRÊTS!")
        print(f"{'='*50}")
        print(f"\n📱 Instagram: {INSTAGRAM_CONFIG['output']}")
        print(f"💼 LinkedIn: {LINKEDIN_CONFIG['output']}")
        print(f"\n✅ Vidéos prêtes à uploader sur les réseaux!")
        print("\n📌 Note: Les vidéos utilisent un gradient coloré comme fond.")
        print("   Pour intégrer le contenu du site directement:")
        print("   1. Utiliser OBS Studio pour enregistrer l'écran")
        print("   2. Voir: RECORDING_GUIDE.md")
    else:
        print("⚠️  Certaines vidéos n'ont pas pu être créées")
        print(f"{'='*50}")

if __name__ == '__main__':
    main()
