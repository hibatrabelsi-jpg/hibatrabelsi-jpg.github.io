import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function B2B() {
  const cardStyle = {
    background: "linear-gradient(135deg, rgba(246, 222, 205, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(246, 222, 205, 0.2)",
    borderRadius: "40px",
    padding: "clamp(30px, 5vw, 60px)",
    maxWidth: "1100px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "40px",
    alignItems: "center"
  };

  return (
    <section id="b2b" style={{ padding: '100px 20px', color: 'white' }}>
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={cardStyle}>
        <div>
          <span style={{ color: '#f6decd', fontSize: '12px', letterSpacing: '3px', fontWeight: 'bold' }}>SOLUTIONS BUSINESS</span>
          <h2 style={{ fontFamily: 'serif', fontSize: 'clamp(2rem, 5vw, 3rem)', marginTop: '10px', fontWeight: '300' }}>
            Élevez vos <span style={{ fontStyle: 'italic', color: '#f6decd' }}>événements</span> d'entreprise
          </h2>
          <p style={{ marginTop: '25px', fontSize: '16px', opacity: 0.8, lineHeight: '1.8' }}>
            Je conçois des expériences qui renforcent la cohésion de vos équipes en gérant chaque détail logistique.
          </p>
        </div>

        <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.03)', padding: '30px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '20px' }}>Un projet spécifique ?</h3>
          <p style={{ fontSize: '14px', opacity: 0.7, marginBottom: '30px' }}>Découvrez notre offre dédiée aux professionnels.</p>
          <Link to="/business" style={{ textDecoration: 'none' }}>
            <button style={{ width: '100%', padding: '18px', borderRadius: '50px', background: '#f6decd', color: '#3b2a1e', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>
              VOIR LA BROCHURE DIGITALE
            </button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}