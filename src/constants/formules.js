/**
 * Données centralisées pour les formules de voyage
 * Source unique de vérité pour tous les contenus de formules
 * À updater une fois et les changements se propagent partout
 */

export const FORMULES = {
  'guide-essentiel': {
    id: 'guide-essentiel',
    titre: 'Guide Essentiel',
    prix: '109',
    description: 'Idéal pour garder la main sur ses réservations tout en ayant un expert à ses côtés.',
    inclusions: ['Recherche d\'activités', 'Sélection d\'adresses', 'Optimisation du temps', 'SAV'],
    lienStripe: 'https://buy.stripe.com/dRm9ALfDO5PU6zvcwgf3a03',
    icon: '🗺️',
    soustitre: 'Pour les voyageurs indépendants',
  },
  'evasion-express': {
    id: 'evasion-express',
    titre: 'Évasion Express',
    prix: '139',
    description: 'Parfait pour un week-end ou city trip de 2 nuits.',
    inclusions: ['Transport & Hébergement', 'Activités', 'Recommandations', 'SAV'],
    lienStripe: 'https://buy.stripe.com/00waEP3V6guy6zv8g0f3a01',
    icon: '🌍',
    soustitre: 'Pour les courtes escapades',
  },
  'sejour-serenite': {
    id: 'sejour-serenite',
    titre: 'Séjour Sérénité',
    prix: '239',
    description: 'Organisation complète pour les séjours de 4 à 8 nuits.',
    inclusions: ['Transports A/R', 'Hébergement & Activités', 'Carte interactive', 'Carnet digital', 'SAV'],
    lienStripe: 'https://buy.stripe.com/6oU6oz2R2ceif61fIsf3a02',
    icon: '🏖️',
    soustitre: 'Pour les vacances organisées',
  },
  'grand-voyageur': {
    id: 'grand-voyageur',
    titre: 'Grand Voyageur',
    prix: '339',
    description: 'Pour les itinéraires ambitieux ou à plusieurs étapes.',
    inclusions: ['Itinéraire structuré', 'Logistique totale', 'Pépites locales', 'Carnet digital', 'Paiement en 2x'],
    lienStripe: 'https://buy.stripe.com/8x2fZ93V69261fbcwgf3a00',
    icon: '✈️',
    soustitre: 'Pour les grands voyages',
  },
  'sur-mesure': {
    id: 'sur-mesure',
    titre: 'Sur Mesure',
    prix: 'Sur devis',
    description: 'Créez ensemble le voyage de vos rêves. Groupe, EVJF/EVJG, projet complexe.',
    inclusions: ['Consultation gratuite', 'Itinéraire personnalisé', 'Logistique 100% adaptée', 'Support VIP'],
    lienStripe: null, // Pas de paiement direct
    icon: '👑',
    soustitre: 'Pour les projets uniques',
  },
};

/**
 * Obtenir une formule par ID
 * @param {string} id - L'ID de la formule
 * @returns {object} La formule correspondante
 */
export const getFormuleById = (id) => FORMULES[id];

/**
 * Obtenir toutes les formules sauf sur-mesure
 * @returns {array} Tableau de formules
 */
export const getFormulesList = () => Object.values(FORMULES).filter(f => f.id !== 'sur-mesure');

/**
 * Obtenir la formule sur-mesure
 * @returns {object} La formule sur-mesure
 */
export const getSurMesureFormule = () => FORMULES['sur-mesure'];

/**
 * Mapper les formules pour une liste
 * @returns {array} Tableau optimisé pour affichage
 */
export const getFormulesByPrix = () => {
  return getFormulesList().sort((a, b) => parseInt(a.prix) - parseInt(b.prix));
};
