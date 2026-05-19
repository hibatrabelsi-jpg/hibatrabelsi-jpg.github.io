import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Hero() {
  const cardStyle = {
    background: "rgba(0, 0, 0, 0.3)",
    backdropFilter: "blur(40px) saturate(150%)",
    WebkitBackdropFilter: "blur(40px) saturate(150%)",
    width: "85%", 
    maxWidth: "900px",
    padding: "50px 80px",
    borderRadius: "100px", 
    border: "none",
    textDecoration: "none",
    textAlign: "center",
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    maskImage: "radial-gradient(ellipse at center, black 40%, transparent 95%)",
    WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 95%)",
    transition: "all 0.8s ease",
    cursor: "pointer"
  };

  return (
    <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ color: 'white', fontFamily: 'serif', fontSize: 'clamp(3rem, 10vw, 6.5rem)', fontWeight: '300' }}>
          L'Évasion <span style={{ fontStyle: 'italic', color: '#f6decd' }}>redéfinie.</span>
        </h1>
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <Link to="/#formules" style={{ textDecoration: 'none', width: '100%', display: 'flex', justifyContent: 'center' }}>
            <motion.div whileHover={{ scale: 1.02, backgroundColor: "rgba(0, 0, 0, 0.4)" }} style={cardStyle}>
            <span style={{ color: '#f6decd', fontSize: '10px', letterSpacing: '8px', marginBottom: '10px', fontWeight: 'bold' }}>PARTICULIERS</span>
            <h2 style={{ color: 'white', fontFamily: 'serif', fontSize: '38px', fontWeight: '300', margin: 0 }}>Formules & Sur-Mesure</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', marginTop: '10px' }}>L'expertise d'un voyage unique, conçu pour vous.</p>
            </motion.div>
        </Link>

        <Link to="/business" style={{ textDecoration: 'none', width: '100%', display: 'flex', justifyContent: 'center' }}>
            <motion.div whileHover={{ scale: 1.02, backgroundColor: "rgba(0, 0, 0, 0.4)" }} style={{ ...cardStyle, border: "1px solid rgba(246, 222, 205, 0.1)" }}>
            <span style={{ color: '#f6decd', fontSize: '10px', letterSpacing: '8px', marginBottom: '10px', fontWeight: 'bold' }}>BUSINESS</span>
            <h2 style={{ color: 'white', fontFamily: 'serif', fontSize: '38px', fontWeight: '300', margin: 0 }}>Vos Événements Pro</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', marginTop: '10px' }}>Séminaires, retraites et logistique corporate haut de gamme.</p>
            </motion.div>
        </Link>
      </div>
    </section>
  );
}