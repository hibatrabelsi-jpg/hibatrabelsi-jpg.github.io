import { Helmet } from "react-helmet-async";

export default function SEO({
  title = "Hiba Travel Planner — L'Évasion Redéfinie",
  description = "Organisation de voyages sur mesure pour particuliers et entreprises. Hiba planifie vos rêves de voyage : séjours sérénité, week-ends express, grands voyages ou projets sur mesure.",
  keywords = "voyage sur mesure, organisation voyage, travel planner, séjour vacances, weekend trip",
  image = "/og-image.jpg",
  url = "https://hibatravel.com",
  type = "website"
}) {
  const schemaOrganization = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Hiba Travel Planner",
    "url": "https://hibatravel.com",
    "logo": "https://hibatravel.com/logo.png",
    "description": "Organisation de voyages sur mesure pour particuliers et entreprises",
    "telephone": "+33647597144",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Le Pradet",
      "addressCountry": "FR",
      "addressRegion": "Provence-Alpes-Côte d'Azur"
    },
    "areaServed": "Worldwide",
    "priceRange": "€€",
    "sameAs": [
      "https://www.google.com/maps/place/Le+Pradet",
      "https://www.instagram.com/hibatravel" // À adapter si tu as Insta
    ]
  };

  const schemaProduct = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": title,
    "description": description,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Hiba Travel Planner"
    },
    "areaServed": "Worldwide",
    "availableLanguage": ["fr", "en"]
  };

  return (
    <Helmet>
      {/* Titre et Meta de base */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#0a0604" />

      {/* Open Graph (Facebook, LinkedIn, etc.) */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Hiba Travel Planner" />
      <meta property="og:locale" content="fr_FR" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrganization)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(schemaProduct)}
      </script>
    </Helmet>
  );
}
