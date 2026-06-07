import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Hero() {
  const cardStyle = {
    background: "rgba(0, 0, 0, 0.3)",
    backdropFilter: "blur(40px) saturate(150%)",
    WebkitBackdropFilter: "blur(40px) saturate(150%)",
    width: "85%",
    maxWidth: "900px",
    padding: "clamp(18px, 4vw, 50px) clamp(16px, 6vw, 80px)",
    borderRadius: "100px",
    border: "none",
    textDecoration: "none",
    textAlign: "center",
    marginBottom: "16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    maskImage: "radial-gradient(ellipse at center, black 40%, transparent 95%)",
    WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 95%)",
    transition: "all 0.8s ease",
    cursor: "pointer"
  };

  return (
    <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px 0' }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', marginBottom: 'clamp(20px, 4vh, 60px)' }}>
        <h1 style={{ color: 'white', fontFamily: 'serif', fontSize: 'clamp(2.2rem, 8vw, 6.5rem)', fontWeight: '300', lineHeight: '1.1', padding: '0 10px' }}>
          L'Évasion <span style={{ fontStyle: 'italic', color: '#f6decd' }}>redéfinie.</span>
        </h1>
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <motion.button
            type="button"
            aria-label="Voir les formules particuliers"
            whileHover={{ scale: 1.02, backgroundColor: "rgba(0, 0, 0, 0.4)" }}
            style={{ ...cardStyle, width: '85%', maxWidth: '900px', display: 'flex', justifyContent: 'center' }}
            onClick={() => document.getElementById('formules')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span style={{ color: '#f6decd', fontSize: '10px', letterSpacing: '8px', marginBottom: '8px', fontWeight: 'bold' }}>PARTICULIERS</span>
            <h2 style={{ color: 'white', fontFamily: 'serif', fontSize: 'clamp(1.4rem, 5vw, 2.4rem)', fontWeight: '300', margin: 0 }}>Formules & Sur-Mesure</h2>
            <p style={{ color: 'rgba(255,255,255,0.95)', fontSize: 'clamp(12px, 3vw, 14px)', marginTop: '8px' }}>L'expertise d'un voyage unique, conçu pour vous.</p>
        </motion.button>

        <Link to="/business" style={{ textDecoration: 'none', width: '100%', display: 'flex', justifyContent: 'center' }}>
            <motion.div whileHover={{ scale: 1.02, backgroundColor: "rgba(0, 0, 0, 0.4)" }} style={{ ...cardStyle, border: "1px solid rgba(246, 222, 205, 0.1)" }}>
            <span style={{ color: '#f6decd', fontSize: '10px', letterSpacing: '8px', marginBottom: '8px', fontWeight: 'bold' }}>BUSINESS</span>
            <h2 style={{ color: 'white', fontFamily: 'serif', fontSize: 'clamp(1.4rem, 5vw, 2.4rem)', fontWeight: '300', margin: 0 }}>Vos Événements Pro</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(12px, 3vw, 14px)', marginTop: '8px' }}>Séminaires, retraites et logistique corporate haut de gamme.</p>
            </motion.div>
        </Link>
      </div>
    </section>
  );
}
