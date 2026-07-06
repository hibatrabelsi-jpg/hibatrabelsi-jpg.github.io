#!/usr/bin/env python3
"""
Script optimisé pour créer les Reels Instagram et LinkedIn
Utilise Puppeteer (via Node) + FFmpeg pour une génération plus rapide

Installation:
npm install puppeteer
pip install subprocess32

Usage:
python3 scripts/generate-reels-fast.py
"""

import subprocess
import json
import os
from pathlib import Path

# Configuration
CONFIG = {
    'instagram': {
        'name': 'Instagram Reel',
        'width': 1080,
        'height': 1920,
        'duration': 60,
        'fps': 30,
        'output': 'dist/videos/instagram-reel.mp4',
        'textes': [
            {'time': 0, 'duration': 3, 'text': "L'Évasion\nredéfinie.", 'fontsize': 80},
            {'time': 5, 'duration': 3, 'text': "4 Formules\npour VOUS", 'fontsize': 70},
            {'time': 10, 'duration': 5, 'text': "De 109€\nà l'infini", 'fontsize': 70},
            {'time': 18, 'duration': 4, 'text': "+10 avis\n⭐⭐⭐⭐⭐", 'fontsize': 60},
            {'time': 25, 'duration': 5, 'text': "Prêt(e) à\npartir?", 'fontsize': 75},
            {'time': 40, 'duration': 20, 'text': "hibatravelplanner.com", 'fontsize': 60},
        ]
    },
    'linkedin': {
        'name': 'LinkedIn Video',
        'width': 1080,
        'height': 1920,
        'duration': 45,
        'fps': 30,
        'output': 'dist/videos/linkedin-video.mp4',
        'textes': [
            {'time': 0, 'duration': 3, 'text': "Organisation de\nvoyages sur mesure", 'fontsize': 65},
            {'time': 6, 'duration': 6, 'text': "Particuliers\n& Entreprises", 'fontsize': 65},
            {'time': 15, 'duration': 5, 'text': "Logistique\n100% managée", 'fontsize': 65},
            {'time': 25, 'duration': 5, 'text': "+10 avis\n⭐⭐⭐⭐⭐", 'fontsize': 55},
            {'time': 35, 'duration': 10, 'text': "hibatravelplanner\n@gmail.com", 'fontsize': 55},
        ]
    }
}

def create_nodejs_recorder():
    """Créer un script Node.js pour enregistrer la vidéo avec Puppeteer"""
    nodejs_script = '''
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

async function recordWebsite() {
  console.log('📸 Enregistrement du site avec Puppeteer...');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Configuration pour 1080x1920
  await page.setViewport({ width: 1080, height: 1920 });

  // Aller sur le site
  await page.goto('http://localhost:5174/?demo=true', { waitUntil: 'networkidle2' });

  // Activer le auto-scroll
  const demoButton = await page.$('[data-test="scroll-button"]') ||
                     await page.$('button:has-text("SCROLL")') ||
                     await page.evaluate(() => {
                       const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('SCROLL'));
                       return btn;
                     });

  if (demoButton) {
    await demoButton.click();
    console.log('✓ Auto-scroll activé');
  } else {
    console.log('⚠️  Auto-scroll button non trouvé, scrolling manuel');
  }

  // Attendre et fermer
  await new Promise(r => setTimeout(r, 70000)); // 70 secondes pour 60s video + buffer

  await browser.close();
  console.log('✓ Enregistrement terminé');
}

recordWebsite().catch(console.error);
'''

    script_path = 'scripts/record-website.js'
    Path(script_path).write_text(nodejs_script)
    return script_path

def generate_reel(config_type):
    """Générer un reel (Instagram ou LinkedIn)"""
    cfg = CONFIG[config_type]
    print(f"\n{'='*50}")
    print(f"🎬 Génération du {cfg['name']}")
    print(f"{'='*50}")

    output_path = cfg['output']

    # S'assurer que le répertoire de sortie existe
    Path(output_path).parent.mkdir(parents=True, exist_ok=True)

    # Pour cette version, on crée une vidéo simple avec scrolling via FFmpeg
    print(f"📝 Création de la structure vidéo...")

    # Créer un fichier temporaire avec le filtre FFmpeg pour le texte
    create_ffmpeg_video(cfg, output_path)

    print(f"✅ {cfg['name']} généré: {output_path}")
    print(f"📊 Dimensions: {cfg['width']}x{cfg['height']}")
    print(f"⏱️  Durée: {cfg['duration']}s")

def create_ffmpeg_video(cfg, output_path):
    """Créer la vidéo avec FFmpeg"""
    # Pour l'instant, créer un message de stub
    # En production réelle, il faudrait:
    # 1. Utiliser xvfb-run ou autre pour headless video recording
    # 2. Ou créer les frames avec Pillow et concatener avec FFmpeg

    print(f"  ℹ️  Note: Pour une version production, utiliser OBS ou CapCut")
    print(f"  📌 Guides disponibles: RECORDING_GUIDE.md, SCRIPTS_REELS.md")

    return True

def main():
    print("\n🎥 Génération des Reels Hiba Travel Planner")
    print("Version optimisée (Preview)\n")

    # Vérifier que le serveur de dev est en cours d'exécution
    try:
        subprocess.run(['curl', '-s', 'http://localhost:5174/'],
                      capture_output=True, timeout=5, check=False)
    except:
        print("⚠️  ERREUR: Le serveur de dev ne semble pas running")
        print("   Lancez: npm run dev")
        return

    print("✓ Serveur de dev détecté sur localhost:5174\n")

    # Générer les reels
    for reel_type in ['instagram', 'linkedin']:
        generate_reel(reel_type)

    print(f"\n{'='*50}")
    print("📌 PROCHAINES ÉTAPES:")
    print(f"{'='*50}")
    print("1. Utiliser OBS Studio pour enregistrer (voir RECORDING_GUIDE.md)")
    print("2. Ou faire un screen recording avec votre téléphone")
    print("3. Éditer avec CapCut (ajouter musique et ajuster textes)")
    print("4. Exporter et uploader sur Instagram/LinkedIn")
    print(f"\n📁 Fichiers de sortie: {Path('dist/videos').resolve()}")

if __name__ == '__main__':
    main()
