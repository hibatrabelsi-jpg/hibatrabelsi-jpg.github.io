import { motion } from "framer-motion";

export default function Legal() {
  const cardStyle = {
    background: "rgba(0, 0, 0, 0.55)",
    backdropFilter: "blur(40px) saturate(150%)",
    WebkitBackdropFilter: "blur(40px) saturate(150%)",
    borderRadius: "30px",
    padding: "40px",
    marginBottom: "30px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.3)"
  };

  const titleStyle = {
    fontFamily: 'serif',
    fontSize: '2rem',
    color: '#f6decd',
    marginBottom: '20px',
    marginTop: '40px'
  };

  const textStyle = {
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: '1.8',
    fontSize: '16px'
  };

  return (
    <main id="main-content" style={{ padding: '120px 20px', minHeight: '100vh' }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{ maxWidth: '1000px', margin: '0 auto' }}
      >
        <h1 style={{ color: 'white', fontFamily: 'serif', fontSize: '3.5rem', marginBottom: '50px' }}>
          Mentions Légales & Politique de Confidentialité
        </h1>

        {/* MENTIONS LÉGALES */}
        <div style={cardStyle}>
          <h2 style={titleStyle}>Mentions Légales</h2>

          <h3 style={{ color: '#f6decd', marginTop: '30px', fontSize: '1.2rem' }}>Responsable du site</h3>
          <p style={textStyle}>
            <strong>Hiba Travel Planner</strong><br/>
            Email: hibatravelplanner@gmail.com<br/>
            Domaine: hibatravelplanner.com
          </p>

          <h3 style={{ color: '#f6decd', marginTop: '30px', fontSize: '1.2rem' }}>Statut juridique</h3>
          <p style={textStyle}>
            Microentrepreneur / Travailleur indépendant<br/>
            Immatriculation: [À compléter si applicable]
          </p>

          <h3 style={{ color: '#f6decd', marginTop: '30px', fontSize: '1.2rem' }}>Droits d'auteur</h3>
          <p style={textStyle}>
            Tous les contenus du site (textes, images, vidéos) sont la propriété exclusive de Hiba Travel Planner ou utilisés avec autorisation.
            Reproduction totale ou partielle sans permission est strictement interdite.
          </p>

          <h3 style={{ color: '#f6decd', marginTop: '30px', fontSize: '1.2rem' }}>Hébergement</h3>
          <p style={textStyle}>
            Ce site est hébergé sur GitHub Pages.<br/>
            GitHub, Inc., 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA
          </p>
        </div>

        {/* POLITIQUE DE CONFIDENTIALITÉ */}
        <div style={cardStyle}>
          <h2 style={titleStyle}>Politique de Confidentialité & RGPD</h2>

          <h3 style={{ color: '#f6decd', marginTop: '30px', fontSize: '1.2rem' }}>Données collectées</h3>
          <p style={textStyle}>
            <strong>Via le formulaire de contact:</strong><br/>
            • Nom complet<br/>
            • Adresse email<br/>
            • Message<br/>
            • Consentement RGPD (case à cocher)<br/><br/>

            <strong>Via Google Analytics 4 (GA4):</strong><br/>
            • Adresse IP (anonymisée)<br/>
            • Comportement de navigation<br/>
            • Type d'appareil<br/>
            • Pages visitées<br/>
            • Durée de visite<br/>
          </p>

          <h3 style={{ color: '#f6decd', marginTop: '30px', fontSize: '1.2rem' }}>Finalité du traitement</h3>
          <p style={textStyle}>
            • <strong>Formulaire:</strong> Répondre à votre demande de contact<br/>
            • <strong>GA4:</strong> Améliorer le site et comprendre son utilisation<br/>
            • <strong>Cookies:</strong> Mémoriser vos préférences et consentements
          </p>

          <h3 style={{ color: '#f6decd', marginTop: '30px', fontSize: '1.2rem' }}>Durée de conservation</h3>
          <p style={textStyle}>
            • <strong>Données formulaire:</strong> 12 mois maximum (Formspree)<br/>
            • <strong>Cookies Google Analytics:</strong> 14 mois (par défaut Google)<br/>
            • <strong>Cookies de consentement:</strong> 13 mois
          </p>

          <h3 style={{ color: '#f6decd', marginTop: '30px', fontSize: '1.2rem' }}>Vos droits RGPD</h3>
          <p style={textStyle}>
            Vous avez le droit de:<br/>
            • Accéder à vos données personnelles<br/>
            • Rectifier vos données<br/>
            • Effacer vos données (droit à l'oubli)<br/>
            • Limiter le traitement<br/>
            • Vous opposer au traitement<br/><br/>

            <strong>Pour exercer ces droits:</strong> hibatravelplanner@gmail.com
          </p>

          <h3 style={{ color: '#f6decd', marginTop: '30px', fontSize: '1.2rem' }}>Services tiers</h3>
          <p style={textStyle}>
            Ce site utilise les services suivants:<br/>
            • <strong>Formspree:</strong> Traitement des formulaires (formspree.io)<br/>
            • <strong>Google Analytics 4:</strong> Analyse de trafic (google.com/analytics)<br/>
            • <strong>Calendly:</strong> Gestion des appels découverte (calendly.com)<br/>
            • <strong>Stripe:</strong> Paiement des formules (stripe.com)<br/><br/>

            Ces services peuvent avoir leurs propres politiques de confidentialité.
          </p>

          <h3 style={{ color: '#f6decd', marginTop: '30px', fontSize: '1.2rem' }}>Cookies</h3>
          <p style={textStyle}>
            Ce site utilise des cookies pour:<br/>
            • <strong>Google Analytics:</strong> Analyse (non-consentement par défaut en EU)<br/>
            • <strong>Stripe:</strong> Paiement sécurisé<br/>
            • <strong>Calendly:</strong> Gestion des événements<br/><br/>

            Vous pouvez gérer vos préférences de cookies via la banneau cookies (première visite).
          </p>

          <h3 style={{ color: '#f6decd', marginTop: '30px', fontSize: '1.2rem' }}>Modifications de cette politique</h3>
          <p style={textStyle}>
            Cette politique peut être modifiée à tout moment. Les changements seront affichés ici avec la date de mise à jour.
          </p>

          <h3 style={{ color: '#f6decd', marginTop: '30px', fontSize: '1.2rem' }}>Dernière mise à jour</h3>
          <p style={textStyle}>
            7 juin 2026
          </p>
        </div>

        {/* CONTACT */}
        <div style={cardStyle}>
          <h2 style={titleStyle}>Questions ?</h2>
          <p style={textStyle}>
            Pour toute question concernant ces mentions légales ou votre confidentialité:<br/><br/>
            <strong>Email:</strong> hibatravelplanner@gmail.com<br/>
            <strong>Formulaire de contact:</strong> <a href="/#contact" style={{ color: '#f6decd', textDecoration: 'underline' }}>Cliquez ici</a>
          </p>
        </div>
      </motion.div>
    </main>
  );
}
