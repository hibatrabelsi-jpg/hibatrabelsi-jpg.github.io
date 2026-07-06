---
name: new-section
description: Créer une nouvelle section ou page du site Hiba Travel Planner en respectant les conventions du projet (Tailwind, framer-motion, analytics, SEO, accessibilité). À utiliser pour ajouter une section à la home, une nouvelle page/route, ou un nouveau composant.
disable-model-invocation: true
---

# Nouvelle section / page du site

Créer un composant conforme aux conventions du projet. L'argument de l'utilisateur décrit la section voulue (ex: `/new-section une section FAQ avec accordéon`).

## Étapes

1. **Clarifier le besoin** si l'argument est vague : section de la home (`/`) ou nouvelle page avec route ?
2. **Lire les références** avant d'écrire :
   - `src/constants/theme.js` (couleurs et effets glass de la marque)
   - Un composant existant proche du besoin (ex: `Features.jsx` pour une grille, `Testimonials.jsx` pour un carrousel, `About.jsx` pour du contenu)
3. **Créer le composant** dans `src/components/<Nom>.jsx` en suivant le template ci-dessous.
4. **L'intégrer** :
   - Section de la home → l'ajouter dans `<main id="main-content">` de `src/App.jsx` à la position logique.
   - Nouvelle page → ajouter une `<Route>` dans `AnimatedRoutes` (App.jsx) avec `motion.div` + composant `<SEO>` dédié, puis ajouter l'URL à `public/sitemap.xml`.
5. **Vérifier** : `npm run lint` (si Node dispo), puis proposer de lancer le site pour contrôle visuel.

## Template de composant

```jsx
import { motion } from "framer-motion";
import { useAnalytics, ANALYTICS_EVENTS } from "../hooks/useAnalytics";

export default function NomSection() {
  const { trackEvent } = useAnalytics();

  return (
    <section id="nom-section" aria-labelledby="nom-section-title">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 id="nom-section-title">…</h2>
        {/* contenu */}
      </motion.div>
    </section>
  );
}
```

## Règles impératives

- Contenu en **français**, ton chaleureux et pro, cohérent avec le reste du site.
- Couleurs de la marque uniquement (beige `#f6decd` / `#e5b181`, effets glass sur fond vidéo) — voir `theme.js`.
- Texte lisible sur fond vidéo : utiliser les fonds glass (`rgba(0,0,0,0.3+)`) derrière le texte.
- Animations douces, `viewport={{ once: true }}`, et respecter `usePrefersReducedMotion` pour les animations importantes.
- CTA importants : tracker avec `trackEvent` + constante dans `ANALYTICS_EVENTS`.
- Données de formules : toujours importer depuis `src/constants/formules.js`, jamais en dur.
- Accessibilité : hiérarchie de titres correcte, `aria-labelledby`, alt sur les images.
