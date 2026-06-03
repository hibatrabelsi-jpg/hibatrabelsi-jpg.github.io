/**
 * Hook personnalisé pour tracker les événements Google Analytics 4
 * Utilise la variable globale 'gtag' injectée par le script GA4
 */

export function useAnalytics() {
  const trackEvent = (eventName, eventData = {}) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, eventData);
    } else {
      console.warn(`GA4 non disponible pour tracker: ${eventName}`);
    }
  };

  return { trackEvent };
}

// Événements prédéfinis pour la conversion
export const ANALYTICS_EVENTS = {
  // Formulaire de contact
  CONTACT_FORM_OPEN: 'contact_form_open',
  CONTACT_FORM_SUBMIT: 'contact_form_submit',
  CONTACT_FORM_ERROR: 'contact_form_error',

  // Formules / Produits
  FORMULE_VIEWED: 'formule_viewed',
  FORMULE_SELECTED: 'formule_selected',

  // Paiement
  STRIPE_CLICK: 'stripe_click',
  PAYMENT_STARTED: 'begin_checkout',

  // Chatbot
  CHATBOT_OPEN: 'chatbot_open',
  CHATBOT_FLOW_SELECTED: 'chatbot_flow_selected',
  CHATBOT_FORMULE_RECOMMENDED: 'chatbot_formule_recommended',

  // Navigation
  BUSINESS_PAGE_VIEWED: 'business_page_viewed',

  // Avis / Testimonials
  GOOGLE_REVIEWS_CLICKED: 'google_reviews_clicked',
};
