import { useState, useEffect } from 'react';

/**
 * Hook pour réduire les animations framer-motion au démarrage de la page
 * Cela améliore le TBT (Total Blocking Time) et le Lighthouse score
 * Les animations sont désactivées pendant 2 secondes après le chargement
 */
export const useInitialAnimation = (initialConfig = {}) => {
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    // Marquer la fin du chargement initial après 2 secondes
    const timer = setTimeout(() => setIsInitialLoad(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Si c'est le chargement initial, retourner les animations réduites
  if (isInitialLoad) {
    return {
      initial: { opacity: 0 },
      whileInView: { opacity: 1 },
      transition: { duration: 0.3 }, // Animation plus rapide
      viewport: { once: true, margin: "0px 0px -100px 0px" } // Se déclenche plus tard
    };
  }

  // Après le chargement initial, utiliser les animations complètes
  return {
    initial: initialConfig.initial || { opacity: 0, y: 30 },
    whileInView: initialConfig.whileInView || { opacity: 1, y: 0 },
    transition: initialConfig.transition || { duration: 1.2 },
    viewport: initialConfig.viewport || { once: true }
  };
};
