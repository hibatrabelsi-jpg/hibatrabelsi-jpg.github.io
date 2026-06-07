/**
 * Animation presets et utilities
 * Utilitaires pour animations Framer Motion réutilisables
 */

export const ANIMATIONS = {
  // Fade in animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.5 }
  },

  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
    viewport: { once: true }
  },

  fadeInDown: {
    initial: { opacity: 0, y: -30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  },

  fadeInLeft: {
    initial: { opacity: 0, x: -30 },
    whileInView: { opacity: 1, x: 0 },
    transition: { duration: 0.8 },
    viewport: { once: true }
  },

  // Hover effects
  buttonHover: {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 }
  },

  scaleHover: {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 }
  },

  // Hero animations
  heroTitle: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 1 }
  },

  // Card animations
  cardHover: {
    whileHover: { scale: 1.02, backgroundColor: "rgba(0, 0, 0, 0.4)" },
    transition: { duration: 0.3 }
  },
};

/**
 * Créer une animation adaptée aux préférences réduites de mouvement
 * @param {boolean} prefersReducedMotion - Résultat de usePrefersReducedMotion()
 * @param {object} fullAnimation - Animation complète
 * @param {object} reducedAnimation - Animation réduite (optionnel)
 * @returns {object} Animation adaptée
 */
export const getAdaptiveAnimation = (
  prefersReducedMotion,
  fullAnimation,
  reducedAnimation = { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.3 } }
) => {
  return prefersReducedMotion ? reducedAnimation : fullAnimation;
};

/**
 * Combiner plusieurs animations
 * @param {...object} animations - Animations à combiner
 * @returns {object} Animation fusionnée
 */
export const combineAnimations = (...animations) => {
  return animations.reduce((combined, anim) => ({ ...combined, ...anim }), {});
};
