import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function FormuleDetail({ titre, prix, description, inclusions, lienStripe }) {
  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // Padding adaptatif : 20px sur petit écran, jusqu'à 40px sur grand
    padding: "clamp(20px, 5vw, 40px) 20px", 
    color: "white",
  };

  const cardStyle = {
    background: "linear-gradient(135deg, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.45) 100%)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "40px",
    // Padding intérieur : 25px sur mobile, 50px sur ordi
    padding: "clamp(25px, 6vw, 50px)", 
    maxWidth: "800px",
    width: "100%",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
    position: "relative"
  };

  return (
    <div style={containerStyle}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={cardStyle}
      >
        {/* BOUTON RETOUR */}
        <Link to="/" style={{ 
          display: "inline-flex", 
          alignItems: "center", 
          color: "#f6decd", 
          textDecoration: "none", 
          fontSize: "14px", 
          marginBottom: "30px",
          fontWeight: "500"
        }}>
          <span style={{ marginRight: "8px", fontSize: "18px" }}>←</span> 
          Retour aux collections
        </Link>

        {/* Titre : entre 2rem et 3rem selon l'écran */}
        <h1 style={{ 
          fontFamily: "serif", 
          fontSize: "clamp(2rem, 7vw, 3rem)", 
          marginBottom: "10px", 
          fontWeight: "300",
          lineHeight: "1.1" 
        }}>
          {titre}
        </h1>
        
        <p style={{ color: "#f6decd", fontSize: "24px", fontWeight: "bold", marginBottom: "30px" }}>
          {prix} €
        </p>

        <p style={{ 
          fontSize: "clamp(15px, 4vw, 16px)", 
          lineHeight: "1.7", 
          opacity: 0.9, 
          marginBottom: "40px" 
        }}>
          {description}
        </p>

        <div style={{ marginBottom: "40px" }}>
          <h3 style={{ fontSize: "18px", marginBottom: "20px", color: "#f6decd" }}>Ce qui est inclus :</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {inclusions.map((item, index) => (
              <li key={index} style={{ marginBottom: "15px", display: "flex", alignItems: "flex-start" }}>
                <span style={{ color: "#f6decd", marginRight: "12px" }}>✓</span>
                <span style={{ fontSize: "15px", opacity: 0.85 }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <a href={lienStripe} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
          <button style={{
            width: "100%",
            padding: "20px",
            borderRadius: "50px",
            border: "none",
            background: "#f6decd",
            color: "#3b2a1e",
            fontSize: "14px",
            fontWeight: "bold",
            letterSpacing: "2px",
            cursor: "pointer",
            transition: "transform 0.2s ease"
          }}
          onMouseOver={(e) => e.target.style.transform = "scale(1.02)"}
          onMouseOut={(e) => e.target.style.transform = "scale(1)"}
          >
            RÉSERVER CETTE FORMULE
          </button>
        </a>
      </motion.div>
    </div>
  );
}