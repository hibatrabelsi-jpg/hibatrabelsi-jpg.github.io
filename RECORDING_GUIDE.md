# 🎥 Guide Complet - Enregistrer tes Reels Hiba Travel Planner

---

## ⚡ **TL;DR - Version Rapide (5 min)**

```
1. Va sur: http://localhost:5174/?demo=true
2. Ouvre ton téléphone et fais Settings → Screen Recording
3. Lance Screen Recording
4. Clique "▶ SCROLL" dans le panel bleu en haut à droite
5. Laisse scroller 60 secondes
6. Arrête et sauvegarde
7. Upload sur CapCut → Ajoute musique + texte → Export
```

---

## 📱 **INSTAGRAM REEL - Enregistrement Complet**

### **Equipment Needed:**
- ✅ iPhone/Android
- ✅ 5-10 min de batterie
- ✅ WiFi ou mobile internet

### **Step-by-Step:**

**SETUP (2 min):**
```
1. iPhone:
   Settings → Control Center → Customize Controls
   → Add "Screen Recording"

2. Android (Samsung):
   Settings → Advanced → Screen Recorder
   → Activate

3. Brille l'écran (max brightness)
   Settings → Display → Brightness → Max

4. Active le WiFi pour meilleure connexion
```

**RECORDING (3 min):**
```
1. Ouvre Safari ou Chrome sur ton téléphone

2. Va sur: http://localhost:5174/?demo=true
   (Ou: hibatravel.com?demo=true si en production)

3. Fullscreen le navigateur (swipe jusqu'en bas du navigateur)

4. Swipe vers le haut depuis les contrôles
   → Clique le point rouge "Screen Recording"
   → Wait 3 seconds (compte: 3...2...1...)

5. Tu verras un bouton bleu sur la droite "▶ SCROLL"
   → Clique dessus

6. L'écran va scroller automatiquement! 🎉
   → Laisse-le faire pendant 60 secondes

7. Une fois terminé, swipe vers le haut
   → Clique "Stop" en rouge

8. Vidéo sauvegardée! ✅
```

---

## 💻 **AVEC OBS (Windows/Mac) - Qualité Professionnelle**

### **Installation:**
```
1. Télécharge OBS: obsproject.com
2. Installe et lance
3. Crée une nouvelle "Scene"
```

### **Configuration:**
```
Settings → Output → Video:
- Base Resolution: 1080x1920 (vertical!)
- Output Resolution: 1080x1920
- FPS: 30

Settings → Recording:
- Format: MP4
- Encoder: NVENC ou Apple VT (plus rapide)
```

### **Recording:**
```
1. Sources → + → Display Capture
   → Sélectionne ton écran

2. Va sur: localhost:5174/?demo=true
   (Dans un navigateur en fullscreen)

3. Clique "▶ SCROLL" dans le panel DemoMode

4. Dans OBS → File → Start Recording

5. Laisse scroller 60 secondes

6. Stop Recording

7. Fichier sauvegardé dans: Documents/OBS
```

---

## 🎬 **POST-PRODUCTION AVEC CAPCUT**

### **Download:**
```
iOS: App Store → "CapCut" (gratuit)
Android: Google Play → "CapCut" (gratuit)
Mac/Windows: capcut.com
```

### **INSTAGRAM REEL Edition (10 min):**

```
STEP 1: Import
├─ Ouvre CapCut
├─ Tap: + (New Project)
├─ Select: Video
├─ Choose ta vidéo enregistrée
└─ Aspect Ratio: 9:16 (vertical)

STEP 2: Trim & Pacing
├─ Si trop long (>60s), coupe la fin
├─ Speed: Gardez à 1x (normal)
├─ Effectue des cut all 2-3 seconds si statique

STEP 3: Add Music
├─ Bottom: Music
├─ Browse: "Travel", "Cinematic", "Uplifting"
├─ Choisis une qui match les vibes
├─ Duration: Sync avec ta vidéo (60s)
└─ Volume: 70% (laisse le son original 30%)

STEP 4: Add Text Overlays
├─ Bottom: Text
├─ Add text all les 3-4 secondes
├─ Font: "Poppins Bold" ou "Montserrat"
├─ Color: White (#FFFFFF) ou Beige (#f6decd)
├─ Animation: Pop or Fade
└─ Examples:
    - "L'Évasion Redéfinie 🌅"
    - "4 Formules Pour VOUS"
    - "De 109€"
    - "+10 avis ⭐⭐⭐⭐⭐"
    - "hibatravel.com"

STEP 5: Transitions
├─ Between clips: Simple cut ou fade
├─ Duration: 0.5s
└─ Keep it clean!

STEP 6: Effects (Optional)
├─ Color: Add slight vignette (dark edges)
├─ No filters (keep colors natural)
└─ Brightness: +10% if needed

STEP 7: Export
├─ Top right: Export
├─ Resolution: 1080p (best quality)
├─ Frame rate: 30fps
├─ Codec: H.264
└─ File: Instagram_Reel_HibaTravel.mp4
```

### **LINKEDIN VIDEO Edition (8 min):**

```
Même process MAIS:

STEP 3: Music
├─ Choose: "Corporate" ou "Business"
├─ Plus discret, moins énergique
├─ Volume: 50% seulement

STEP 4: Text Overlays
├─ Plus de contexte et chiffres
├─ Alignement: Center
├─ Examples:
    - "Organisation de voyages"
    - "Particuliers & Entreprises"
    - "Logistique 100% managée"
    - "4.9⭐ - +10 avis Google"
    - "📞 Appel gratuit 30 min"
    - "hibatravelplanner@gmail.com"

STEP 5: Subtitle
├─ Tools → Auto Captions
├─ Language: French
├─ Style: White
├─ LinkedIn users watch mutée!
```

---

## 📤 **UPLOAD SUR INSTAGRAM**

```
1. Ouvre Instagram app sur ton téléphone
2. Bottom: Create (+ icon)
3. Select: Reel
4. Upload: Sélectionne ton fichier MP4
5. Trim: 60s max (Instagram cut automat après)
6. Edit: Ajoute filters/brightness si besoin
7. Next: Add music (optionnel si déjà dans vidéo)
8. Next: Write Caption (copie de SCRIPTS_REELS.md)
9. Advanced settings:
   └─ Hide like count: OFF
   └─ Allow commenting: ON
   └─ Allow sharing: ON
10. Share → Post!
```

---

## 📤 **UPLOAD SUR LINKEDIN**

```
1. Ouvre LinkedIn sur ton téléphone ou desktop
2. Click: Post
3. Select: Video
4. Upload: Ton fichier MP4
5. Caption: Copie de SCRIPTS_REELS.md
6. Add: #hashtags
7. Who can see: Public
8. Publish!
```

---

## 🎯 **TROUBLESHOOTING**

### **Problem: Vidéo trop rapide**
- **Fix:** Dans DemoMode, scroll speed est fixée à 1.5px/frame
- Changer en app si besoin: `const scrollSpeed = 0.8`

### **Problem: Son mauvaise qualité**
- **Fix:** Garde volume original à 50-70%
- N'ajoute de musique que si son original mauvais

### **Problem: Text pas lisible**
- **Fix:** Toujours white (#FFFFFF) ou #f6decd
- Fond semi-transparent ou shadow

### **Problem: Écran gelé à mi-scroll**
- **Fix:** F5 = refresh la page
- Restart l'enregistrement

### **Problem: OBS lag**
- **Fix:** Lower resolution à 720x1280
- Drop FPS à 24
- Close other apps

---

## 📊 **VIDEO SPECS FINALES**

### **Instagram Reel:**
```
Format: MP4
Resolution: 1080x1920 (9:16)
Frame rate: 30fps
Duration: 15-60s (optimal: 60s)
File size: 50-200MB
Codec: H.264
Audio: AAC 128kbps
```

### **LinkedIn Video:**
```
Format: MP4
Resolution: 1080x1920 (9:16) ou 1080x1080 (1:1)
Frame rate: 30fps
Duration: 15-60s (optimal: 45s)
File size: 50-200MB
Codec: H.264
Audio: AAC 128kbps
Captions: REQUIRED
```

---

## 🔥 **PRO TIPS**

1. **Record multiple takes** - Au moins 2-3 essais pour avoir la meilleure

2. **Lighting:** Bright room (natural light best)

3. **Music choice:**
   - Instagram: Energetic, motivational
   - LinkedIn: Professional, subtle

4. **Text timing:**
   - Appear: 0.5s avant changement visuel
   - Disappear: 0.5s après

5. **Call-to-action:**
   - Toujours à la fin
   - Clickable link in bio (Instagram)
   - Email + website (LinkedIn)

6. **Hashtag strategy:**
   - Instagram: 15-20 hashtags relevant
   - LinkedIn: 5-10 hashtags (less is more)

7. **Post timing:**
   - Instagram: 8am, 12pm, 7pm (best engagement)
   - LinkedIn: 8am, 12pm (week days only)

8. **Engagement:**
   - Instagram: Reply ALL comments within 1 hour
   - LinkedIn: Comment on similar content first

---

## ✅ **CHECKLIST PRE-UPLOAD**

```
□ Vidéo enregistrée et trimée à 60s
□ Audio clair (aucun bruit de fond)
□ Text overlays visibles et lisibles
□ Musique sync avec le contenu
□ Captions ajoutés (LinkedIn obligatoire)
□ Couleurs vibrant et contraste élevé
□ Aucun lag ou freeze
□ File size < 500MB
□ Format correct (MP4, H.264)
□ Caption rédigé (Copié de SCRIPTS_REELS.md)
□ Hashtags ajoutés
□ Call-to-action clair
□ Test preview avant publication
□ Link in bio updated (Instagram)
```

---

## 🎬 **READY? LET'S GO!**

**Recap rapide:**
1. ✅ Ouvre DemoMode: `?demo=true`
2. ✅ Record avec ton téléphone (60 sec)
3. ✅ Edit avec CapCut (10 min)
4. ✅ Upload + Caption
5. ✅ Track analytics

**Résultats attendus:**
- Instagram: 5-10% engagement (60-200 likes pour 1000 followers)
- LinkedIn: 2-5% engagement (20-50 likes pour 1000 followers)

**Questions?** → hibatravelplanner@gmail.com

---

**Bonne chance! 🎥✨**
