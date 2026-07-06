import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * CookieBanner - RGPD Compliant Cookie Consent
 * Asks for user consent before loading Google Analytics
 * Stores preference in localStorage for 13 months
 */
const COOKIE_NAME = 'hiba_cookie_consent';
const COOKIE_EXPIRY_DAYS = 13 * 30; // 13 months

export default function CookieBanner() {
  // Afficher la bannière uniquement si aucun consentement n'est enregistré
  const [showBanner, setShowBanner] = useState(
    () => !localStorage.getItem(COOKIE_NAME)
  );

  const enableAnalytics = () => {
    // Load GA4 if not already loaded
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
    }
  };

  useEffect(() => {
    // If consent was given, ensure GA4 is loaded
    if (localStorage.getItem(COOKIE_NAME) === 'accepted') {
      enableAnalytics();
    }
  }, []);

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
        right: '24px',
        maxWidth: '320px',
        zIndex: 999,
        background: 'rgba(10, 6, 4, 0.6)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderRadius: '16px',
        border: '1px solid rgba(246, 222, 205, 0.15)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        padding: '16px',
      }}
    >
      <h3 style={{
        color: '#f6decd',
        fontFamily: 'serif',
        fontSize: '14px',
        marginTop: 0,
        marginBottom: '8px'
      }}>
        🍪 Cookies
      </h3>

      <p style={{
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: '12px',
        lineHeight: '1.5',
        marginBottom: '12px'
      }}>
        Nous utilisons Google Analytics.
        {' '}<a href="/legal" style={{ color: '#f6decd', textDecoration: 'underline' }}>
          En savoir plus
        </a>
      </p>

      <div style={{
        display: 'flex',
        gap: '8px',
        flexDirection: 'row'
      }}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAccept}
          style={{
            background: '#f6decd',
            color: '#3b2a1e',
            border: 'none',
            padding: '8px 12px',
            borderRadius: '8px',
            fontSize: '11px',
            fontWeight: 'bold',
            cursor: 'pointer',
            flex: 1
          }}
        >
          ✓ Accepter
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleReject}
          style={{
            background: 'transparent',
            color: '#f6decd',
            border: '1px solid rgba(246, 222, 205, 0.5)',
            padding: '8px 12px',
            borderRadius: '8px',
            fontSize: '11px',
            fontWeight: 'bold',
            cursor: 'pointer',
            flex: 1
          }}
        >
          Refuser
        </motion.button>
      </div>
    </motion.div>
  );
}
