/**
 * Structured Data (JSON-LD) generators pour SEO
 * Aide Google à mieux comprendre le contenu
 */

/**
 * Générer schema pour une formule de voyage (Service)
 */
export const generateServiceSchema = (formule) => ({
  '@context': 'https://schema.org/',
  '@type': 'Service',
  name: formule.titre,
  description: formule.description,
  price: formule.prix,
  priceCurrency: 'EUR',
  url: `https://hibatravelplanner.com/formule/${formule.id}`,
  provider: {
    '@type': 'Organization',
    name: 'Hiba Travel Planner',
    url: 'https://hibatravelplanner.com',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '11',
    bestRating: '5',
    worstRating: '1',
  },
});

/**
 * Générer schema breadcrumb pour les pages
 */
export const generateBreadcrumbSchema = (breadcrumbs) => ({
  '@context': 'https://schema.org/',
  '@type': 'BreadcrumbList',
  itemListElement: breadcrumbs.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: crumb.url,
  })),
});

/**
 * Générer schema pour l'organisation (Local Business)
 */
export const generateOrganizationSchema = () => ({
  '@context': 'https://schema.org/',
  '@type': 'LocalBusiness',
  name: 'Hiba Travel Planner',
  description: 'Organisation de voyages sur mesure pour particuliers et entreprises',
  url: 'https://hibatravelplanner.com',
  logo: 'https://hibatravelplanner.com/favicon-512.png',
  sameAs: [
    'https://linkedin.com/company/hiba-travel-planner',
    'https://instagram.com/hiba.travel.planner',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '11',
    bestRating: '5',
    worstRating: '1',
  },
  contact: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    telephone: '+33-contact',
    email: 'hibatravelplanner@gmail.com',
  },
});

/**
 * Ajouter un script JSON-LD au head
 */
export const addStructuredData = (schema) => {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
};
