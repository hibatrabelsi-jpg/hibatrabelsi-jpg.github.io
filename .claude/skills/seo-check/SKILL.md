---
name: seo-check
description: Vérifier le SEO et l'accessibilité du site Hiba Travel Planner avant un déploiement — meta tags, Open Graph, sitemap, données structurées, accessibilité. À utiliser avant de pousser sur main ou après avoir ajouté/modifié des pages.
disable-model-invocation: true
---

# Checklist SEO & accessibilité pré-déploiement

Passer chaque point, signaler ✅/❌ avec le fichier concerné, et proposer les corrections pour chaque ❌. Ne rien modifier sans accord.

## 1. Meta tags par page

Pour chaque `<Route>` de `src/App.jsx` :
- [ ] Un composant `<SEO>` est présent avec `title`, `description`, `keywords`, `url` uniques.
- [ ] `title` ≤ 60 caractères, `description` entre 120 et 160 caractères.
- [ ] `url` correspond bien à la route (domaine `https://hibatravel.com`).

## 2. Open Graph / réseaux sociaux

Dans `src/components/SEO.jsx` :
- [ ] `og:title`, `og:description`, `og:image`, `og:url`, `twitter:card` présents.
- [ ] L'image OG référencée existe dans `public/` (vérifier le fichier réel).

## 3. Sitemap & robots

- [ ] Chaque route de `App.jsx` (y compris les `/formule/<id>` générées depuis `src/constants/formules.js`) figure dans `public/sitemap.xml`.
- [ ] Pas d'URL en trop dans le sitemap (pages supprimées).
- [ ] `public/robots.txt` référence le sitemap.

## 4. Données structurées

- [ ] Le JSON-LD (`SEO.jsx`, `src/utils/structuredData.js`) est un schema.org valide (LocalBusiness) et les infos (téléphone, adresse, liens sociaux) sont à jour.
- [ ] Les prix des formules dans les données structurées correspondent à `src/constants/formules.js`.

## 5. Accessibilité (ne pas régresser)

- [ ] `<main id="main-content">` présent sur chaque page.
- [ ] Toutes les images ont un `alt` pertinent.
- [ ] Un seul `<h1>` par page, hiérarchie h1→h2→h3 sans saut.
- [ ] Les animations respectent `prefers-reduced-motion` (hook `usePrefersReducedMotion`).
- [ ] Liens et boutons ont un libellé accessible (pas d'icône seule sans `aria-label`).

## 6. Build

- [ ] Si Node est disponible : `npm run lint` puis `npm run build` passent sans erreur.

## Rapport final

Terminer par un tableau récapitulatif ✅/❌ et la liste priorisée des corrections proposées.
