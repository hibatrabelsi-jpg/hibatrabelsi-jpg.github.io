#!/usr/bin/env node

/**
 * Script pour créer les Reels avec le contenu réel du site
 * Utilise Puppeteer pour capturer le site, puis FFmpeg pour la vidéo finale
 *
 * Usage: node scripts/generate-reels-complete.js
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CONFIG = {
  instagram: {
    name: 'Instagram Reel',
    width: 1080,
    height: 1920,
    duration: 60,
    fps: 30,
    outputDir: './dist/videos/instagram',
    output: './dist/videos/instagram-reel.mp4',
    scrollDuration: 65, // un peu plus que la durée vidéo
  },
  linkedin: {
    name: 'LinkedIn Video',
    width: 1080,
    height: 1920,
    duration: 45,
    fps: 30,
    outputDir: './dist/videos/linkedin',
    output: './dist/videos/linkedin-video.mp4',
    scrollDuration: 50,
  }
};

async function captureScreenshots(configType) {
  const config = CONFIG[configType];
  console.log(`\n📸 Capture des screenshots pour ${config.name}...`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-gpu',
      '--disable-dev-shm-usage'
    ]
  });

  const page = await browser.newPage();
  page.setDefaultTimeout(120000); // 2 minutes timeout
  page.setDefaultNavigationTimeout(120000);

  // Set viewport
  await page.setViewport({
    width: config.width,
    height: config.height,
    deviceScaleFactor: 1
  });

  // Masquer le bandeau cookies UNIQUEMENT dans la vidéo promo
  // (le site live garde le bandeau RGPD conforme pour les vrais visiteurs).
  // On pré-remplit le consentement + un CSS de secours.
  await page.evaluateOnNewDocument(() => {
    try { localStorage.setItem('hiba_cookie_consent', 'accepted'); } catch (e) {}
    const style = document.createElement('style');
    style.textContent = '[data-cookie-banner],#cookie-banner{display:none!important;}';
    document.documentElement.appendChild(style);
  });

  // Navigate to site with longer timeout
  await page.goto('http://localhost:5174', { waitUntil: 'networkidle2', timeout: 60000 });
  console.log(`  ✓ Site chargé`);

  // Filet de sécurité : retire tout bandeau cookies résiduel du DOM avant capture
  await page.evaluate(() => {
    document.querySelectorAll('div').forEach((el) => {
      const t = (el.textContent || '');
      if (el.querySelector && /Google Analytics/.test(t) && /Accepter/.test(t) && t.length < 200) {
        el.style.display = 'none';
      }
    });
  });

  // Create output directory
  if (!fs.existsSync(config.outputDir)) {
    fs.mkdirSync(config.outputDir, { recursive: true });
  }

  // Get total scroll height
  const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  console.log(`  📏 Hauteur totale: ${pageHeight}px`);

  const totalFrames = config.fps * config.duration;
  // Défilement plus dynamique : couvrir 85% de la page sur la durée
  const maxScroll = (pageHeight - config.height) * 0.85;
  const scrollPerFrame = maxScroll / totalFrames;

  console.log(`  📊 Frames à capturer: ${totalFrames}`);
  console.log(`  📍 Scroll par frame: ${scrollPerFrame.toFixed(2)}px`);

  // Capture frames (avec résilience: retry si la frame se détache)
  let lastGoodFrame = null;
  for (let i = 0; i < totalFrames; i++) {
    const scrollY = scrollPerFrame * i;
    // Temps vidéo piloté par le numéro de frame → les <video> jouent à vitesse RÉELLE
    // (sinon elles paraissent ~12x trop rapides car la capture est lente en temps réel)
    const videoTime = i / config.fps;
    const filename = path.join(config.outputDir, `frame-${String(i).padStart(5, '0')}.png`);

    let success = false;
    for (let attempt = 0; attempt < 3 && !success; attempt++) {
      try {
        await page.evaluate((y, vt) => {
          window.scrollTo(0, y);
          document.querySelectorAll('video').forEach((v) => {
            try {
              v.pause();
              if (v.duration && isFinite(v.duration)) {
                v.currentTime = vt % v.duration;
              }
            } catch (e) {}
          });
        }, scrollY, videoTime);
        // Delay to let rendering settle - balance between speed and quality
        await new Promise(r => setTimeout(r, 15));
        await page.screenshot({ path: filename });
        lastGoodFrame = filename;
        success = true;
      } catch (e) {
        // Frame détachée / contexte perdu : on attend que ça se stabilise puis on réessaie
        await new Promise(r => setTimeout(r, 300));
      }
    }

    // Si la frame a échoué 3x, on duplique la dernière bonne frame (invisible à l'œil)
    if (!success && lastGoodFrame) {
      fs.copyFileSync(lastGoodFrame, filename);
    }

    if ((i + 1) % 30 === 0) {
      console.log(`  ✓ ${i + 1}/${totalFrames} frames`);
    }
  }

  await browser.close();
  console.log(`  ✓ ${totalFrames} screenshots capturés`);
  return config.outputDir;
}

function createVideoFromScreenshots(configType, screenshotsDir) {
  const config = CONFIG[configType];
  console.log(`\n🎥 Création de la vidéo pour ${config.name}...`);

  const inputPattern = path.join(screenshotsDir, 'frame-%05d.png');
  const tempVideo = config.output.replace('.mp4', '_temp.mp4');

  console.log(`  ⏱️  Encodage vidéo (peut prendre 1-2 min)...`);

  const ffmpegCmd = `ffmpeg -y -framerate ${config.fps} -i "${inputPattern}" -c:v libx264 -pix_fmt yuv420p "${tempVideo}"`;

  try {
    execSync(ffmpegCmd, { stdio: 'pipe' });
    console.log(`  ✓ Vidéo créée: ${tempVideo}`);
    return tempVideo;
  } catch (e) {
    console.error(`  ❌ Erreur FFmpeg: ${e.message}`);
    throw e;
  }
}

function addTextOverlays(configType, videoPath) {
  const config = CONFIG[configType];
  console.log(`\n✍️  Ajout des textes pour ${config.name}...`);

  const overlays = configType === 'instagram'
    ? [
        { time: 0, duration: 3, text: "L'Évasion\\nredéfinie.", fontsize: 90 },
        { time: 5, duration: 3, text: "4 Formules\\npour VOUS", fontsize: 80 },
        { time: 10, duration: 5, text: "De 109€\\nà l'infini", fontsize: 80 },
        { time: 18, duration: 4, text: "+10 avis\\n⭐⭐⭐⭐⭐", fontsize: 70 },
        { time: 25, duration: 5, text: "Prêt(e) à\\npartir?", fontsize: 85 },
        { time: 40, duration: 20, text: "hibatravel.com", fontsize: 70 },
      ]
    : [
        { time: 0, duration: 3, text: "Organisation de\\nvoyages sur mesure", fontsize: 75 },
        { time: 6, duration: 6, text: "Particuliers\\n& Entreprises", fontsize: 75 },
        { time: 15, duration: 5, text: "Logistique\\n100% managée", fontsize: 75 },
        { time: 25, duration: 5, text: "+10 avis\\n⭐⭐⭐⭐⭐", fontsize: 65 },
        { time: 35, duration: 10, text: "hibatravelplanner\\n@gmail.com", fontsize: 65 },
      ];

  let filterChain = '[0:v]';

  overlays.forEach((overlay, idx) => {
    const yOffset = 150 + (idx * 90);
    filterChain += `drawtext=text='${overlay.text}':fontfile=/System/Library/Fonts/Arial.ttf:fontsize=${overlay.fontsize}:fontcolor=white:x='(w-text_w)/2':y=${yOffset}:enable='between(t,${overlay.time},${overlay.time + overlay.duration})':line_spacing=15`;

    if (idx < overlays.length - 1) {
      filterChain += ',';
    }
  });

  const outputPath = config.output;
  const ffmpegCmd = `ffmpeg -y -i "${videoPath}" -vf "${filterChain}" -c:v libx264 -pix_fmt yuv420p -preset fast "${outputPath}"`;

  try {
    execSync(ffmpegCmd, { stdio: 'pipe' });
    console.log(`  ✓ Textes ajoutés (${overlays.length} éléments)`);

    // Clean up temp file
    if (fs.existsSync(videoPath)) {
      fs.unlinkSync(videoPath);
    }

    return true;
  } catch (e) {
    console.error(`  ⚠️  Textes non intégrés: ${e.message.substring(0, 100)}`);
    // Fallback: just rename temp to output
    if (fs.existsSync(videoPath)) {
      fs.renameSync(videoPath, outputPath);
    }
    return false;
  }
}

async function generateReel(configType) {
  const config = CONFIG[configType];

  console.log(`\n${'='.repeat(50)}`);
  console.log(`🎬 Génération du ${config.name}`);
  console.log(`${'='.repeat(50)}`);
  console.log(`📁 Sortie: ${config.output}`);
  console.log(`📊 Dimensions: ${config.width}x${config.height}`);
  console.log(`⏱️  Durée: ${config.duration}s @ ${config.fps}fps`);

  try {
    // Step 1: Capture screenshots
    const screenshotsDir = await captureScreenshots(configType);

    // Step 2: Create base video
    const tempVideo = createVideoFromScreenshots(configType, screenshotsDir);

    // Step 3: Add text overlays
    addTextOverlays(configType, tempVideo);

    // Verify output
    if (fs.existsSync(config.output)) {
      const sizeKB = fs.statSync(config.output).size / 1024;
      console.log(`\n✅ ${config.name} généré!`);
      console.log(`💾 Taille: ${sizeKB.toFixed(1)} KB`);
      console.log(`✓ Prêt à uploader!`);
    }

    return true;
  } catch (e) {
    console.error(`\n❌ Erreur: ${e.message}`);
    return false;
  }
}

async function main() {
  console.log('\n🎥 Génération des Reels Hiba Travel Planner');
  console.log('Avec contenu réel du site\n');

  // Check if server is running
  try {
    const http = require('http');
    await new Promise((resolve, reject) => {
      const req = http.get('http://localhost:5174', (res) => {
        resolve();
      });
      req.on('error', reject);
      setTimeout(() => reject(new Error('timeout')), 5000);
    });
  } catch (e) {
    console.error('❌ Le serveur de dev n\'est pas actif!');
    console.error('Lancez: npm run dev');
    process.exit(1);
  }

  console.log('✓ Serveur détecté\n');

  // Permet de choisir quel(s) reel(s) générer: node ... instagram | linkedin | (rien = les deux)
  const target = process.argv[2];
  let allOk = true;

  if (!target || target === 'instagram') {
    allOk = await generateReel('instagram') && allOk;
  }
  if (!target || target === 'linkedin') {
    allOk = await generateReel('linkedin') && allOk;
  }

  console.log(`\n${'='.repeat(50)}`);
  if (allOk) {
    console.log('✨ REEL(S) PRÊT(S)!');
    console.log(`${'='.repeat(50)}`);
    console.log(`\n📱 Instagram: ${CONFIG.instagram.output}`);
    console.log(`💼 LinkedIn: ${CONFIG.linkedin.output}`);
    console.log(`\n✅ Vidéos prêtes à uploader sur les réseaux!`);
  } else {
    console.log('⚠️  Certains reels ont eu des problèmes');
    console.log(`${'='.repeat(50)}`);
  }

  process.exit(allOk ? 0 : 1);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
