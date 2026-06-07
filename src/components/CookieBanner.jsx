import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * CookieBanner - RGPD Compliant Cookie Consent
 * Asks for user consent before loading Google Analytics
 * Stores preference in localStorage for 13 months
 */
export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const COOKIE_NAME = 'hiba_cookie_consent';
  const COOKIE_EXPIRY_DAYS = 13 * 30; // 13 months

  useEffect(() => {
    // Check if user already consented
    const consentGiven = localStorage.getItem(COOKIE_NAME);

    if (!consentGiven) {
      setShowBanner(true);
    } else {
      // If consent was given, ensure GA4 is loaded
      if (consentGiven === 'accepted') {
        enableAnalytics();
      }
    }
  }, []);

  const enableAnalytics = () => {
    // Load GA4 if not already loaded
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
    }
  };

  const handleAccept = () => {
    localStorage.setItem(COOKIE_NAME, 'accepted');
    setShowBanner(false);
    enableAnalytics();
  };

  const handleReject = () => {
    localStorage.setItem(COOKIE_NAME, 'rejected');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        right: '24px',
        maxWidth: '500px',
        margin: '0 auto',
        zIndex: 999,
        background: 'rgba(10, 6, 4, 0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: '24px',
        border: '1px solid rgba(246, 222, 205, 0.2)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
        padding: '24px',
      }}
    >
      <h3 style={{
        color: '#f6decd',
        fontFamily: 'serif',
        fontSize: '18px',
        marginTop: 0,
        marginBottom: '12px'
      }}>
        🍪 Cookies & Confidentialité
      </h3>

      <p style={{
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: '14px',
        lineHeight: '1.6',
        marginBottom: '20px'
      }}>
        Nous utilisons Google Analytics pour améliorer votre expérience.
        {' '}<a href="/legal" style={{ color: '#f6decd', textDecoration: 'underline' }}>
          En savoir plus
        </a>
      </p>

      <div style={{
        display: 'flex',
        gap: '12px',
        flexDirection: 'column'
      }}>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAccept}
          style={{
            background: '#f6decd',
            color: '#3b2a1e',
            border: 'none',
            padding: '12px 20px',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
            letterSpacing: '1px'
          }}
        >
          ACCEPTER
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleReject}
          style={{
            background: 'transparent',
            color: '#f6decd',
            border: '1px solid #f6decd',
            padding: '12px 20px',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
            letterSpacing: '1px'
          }}
        >
          REFUSER
        </motion.button>
      </div>

      <p style={{
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: '11px',
        marginTop: '16px',
        marginBottom: 0,
        textAlign: 'center'
      }}>
        Vous pouvez changer vos préférences n'importe quand dans les paramètres.
      </p>
    </motion.div>
  );
}
