# Hiba Travel Planner — Site vitrine

Site professionnel de travel planning (hibatravel.com), en français. One-page marketing + pages formules, B2B et légales.

## Stack

- React 19 + Vite 7 (JSX, pas de TypeScript)
- Tailwind CSS 4 (via `@tailwindcss/postcss`) + styles inline pour les effets glass/vidéo
- react-router-dom 7, framer-motion (animations), react-helmet-async (SEO)
- ESLint 9 (flat config, `eslint.config.js`)
- Pas de tests automatisés

## Commandes

```bash
npm run dev      # serveur de dev Vite
npm run build    # build de production dans dist/
npm run lint     # eslint .
npm run preview  # prévisualiser le build
```

## Déploiement

- GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`) : chaque push sur `main` déclenche build + déploiement automatique.
- Domaine personnalisé via `public/CNAME`.
- **Ne jamais éditer `dist/`** : il est régénéré à chaque build (un hook bloque ces éditions).

## Architecture

- `src/App.jsx` — routes (`/`, `/business`, `/legal`, `/formule/:id`) + fond vidéo en crossfade (2 balises `<video>` alternées ; version MP4 spécifique pour Safari).
- `src/components/` — un fichier par section/page. Chaque page a son composant `<SEO>` (title, description, keywords, url).
- `src/constants/formules.js` — **source unique de vérité** pour les formules (titres, prix, inclusions, liens de paiement Stripe). Toute modification de prix/contenu de formule se fait ici, pas dans les composants.
- `src/constants/theme.js` — design tokens (couleurs de marque : beige `#f6decd` / `#e5b181`, effets glass).
- `src/hooks/useAnalytics.js` — tracking d'événements (`ANALYTICS_EVENTS`) ; les CTA importants appellent `trackEvent`.
- `src/hooks/usePrefersReducedMotion.js` — respecter cette préférence pour toute nouvelle animation.
- `src/utils/structuredData.js` — données structurées schema.org.
- `scripts/` — scripts Python/Node de génération de Reels Instagram (marketing, indépendants du site).

## Conventions

- Contenu du site et commentaires de code en **français**.
- Composants fonction + hooks, export default, un composant par fichier dans `src/components/`.
- Animations : framer-motion (`motion.div`, `AnimatePresence`), transitions douces (0.6–1s), respecter `prefers-reduced-motion`.
- Accessibilité : `main id="main-content"`, alt sur les images, contrastes suffisants sur fond vidéo (le site a été audité — ne pas régresser).
- SEO : toute nouvelle page/route doit inclure `<SEO>` et être ajoutée à `public/sitemap.xml`.
- Les liens de paiement sont des URLs Stripe en dur dans `formules.js` — ne pas les modifier sans demande explicite.

## Skills et agents disponibles

- `/new-section` — créer une nouvelle section/page conforme aux conventions.
- `/seo-check` — checklist SEO + accessibilité avant déploiement.
- Agent `ui-reviewer` — revue accessibilité/responsive après des changements d'UI.
