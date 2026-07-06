import { useEffect, useState } from 'react';

/**
 * Hook pour respecter la préférence système "prefers-reduced-motion"
 *
 * Permet aux utilisateurs sensibles aux animations (vertiges, épilepsie, etc.)
 * de désactiver les animations complexes
 *
 * @returns {boolean} true si l'utilisateur préfère réduire les animations
 */
export const usePrefersReducedMotion = () => {
  // Lire la préférence système dès l'initialisation (évite un re-render en cascade)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Écouter les changements (si l'utilisateur change les paramètres)
    const handleChange = (e) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
};

/**
 * Helper pour générer une animation adaptée
 * @param {object} normalAnimation - Animation pour motion normal
 * @param {object} reducedAnimation - Animation pour motion réduit
 * @param {boolean} prefersReducedMotion - Résultat de usePrefersReducedMotion()
 * @returns {object} L'animation appropriée
 */
export const getAnimationConfig = (normalAnimation, reducedAnimation, prefersReducedMotion) => {
  return prefersReducedMotion ? reducedAnimation : normalAnimation;
};
