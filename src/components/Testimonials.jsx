import { motion } from "framer-motion";
import { useAnalytics, ANALYTICS_EVENTS } from "../hooks/useAnalytics";

export default function Testimonials() {
  const { trackEvent } = useAnalytics();

  const handleGoogleReviewsClick = () => {
    trackEvent(ANALYTICS_EVENTS.GOOGLE_REVIEWS_CLICKED);
  };
  const reviews = [
    "anthony.png", "christophe.png", "erwan.png", "jocelyne.png", 
    "juliette.png", "karim.png", "loriana.png", "nour.png", 
    "raphael.png", "sarah.png", "sofia.png"
  ];

  const cardStyle = {
    background: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(25px) saturate(160%)",
    WebkitBackdropFilter: "blur(25px) saturate(160%)",
    borderRadius: "30px",
    padding: "25px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    width: "380px",
    display: "flex",
    alignItems: "center",
    boxShadow: "0 10px 40px rgba(0,0,0,0.3)"
  };

  return (
    <section id="testimonials" style={{ padding: '100px 0', overflow: 'hidden' }}>
      <div style={{ textAlign: 'center', marginBottom: '50px', padding: '0 20px' }}>
        <h2 style={{ 
          fontFamily: 'serif', fontSize: '3.5rem', color: 'white',
          textShadow: '0 4px 20px rgba(0,0,0,0.9)' 
        }}>
          Vos <span style={{ fontStyle: 'italic', color: '#f6decd' }}>Expériences</span>
        </h2>
        
        <p style={{
          color: '#ffffff',
          letterSpacing: '3px',
          fontSize: '16px',
          fontWeight: 'bold',
          marginTop: '15px',
          textShadow: '0 2px 8px rgba(0,0,0,0.8)'
        }}>
          <span aria-hidden="true">• • • • • </span>PLUS DE 10 AVIS GOOGLE
        </p>
      </div>

      {/* BANDEAU DÉFILANT */}
      <div style={{ display: 'flex', marginBottom: '60px' }}>
        <motion.div 
          animate={{ x: [0, -3200] }} // Ajusté pour 11 avis
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{ display: 'flex', gap: '30px' }}
        >
          {[...reviews, ...reviews].map((img, i) => (
            <div key={i} style={cardStyle}>
              <img 
                src={`/reviews/${img}`} 
                alt="Avis client" 
                style={{ 
                  width: '100%', 
                  height: 'auto',
                  mixBlendMode: "multiply", 
                  filter: "contrast(1.2) brightness(0.95)",
                  pointerEvents: 'none'
                }} 
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* BOUTON D'ACTION AVEC TON LIEN GOOGLE */}
      <div style={{ textAlign: 'center' }}>
        <a
          href="https://share.google/6DaRbm9cP8OphM6nb"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
          onClick={handleGoogleReviewsClick}
        >
          <motion.button 
            whileHover={{ 
              scale: 1.05, 
              backgroundColor: "rgba(246, 222, 205, 0.1)",
              boxShadow: "0 0 25px rgba(246, 222, 205, 0.4)" 
            }}
            whileTap={{ scale: 0.95 }}
            style={{ 
              background: 'transparent',
              border: '1px solid #f6decd',
              color: '#f6decd',
              padding: '18px 45px',
              borderRadius: '50px',
              fontSize: '12px',
              fontWeight: 'bold',
              letterSpacing: '3px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            VOIR TOUS LES AVIS SUR GOOGLE
          </motion.button>
        </a>
      </div>
    </section>
  );
}