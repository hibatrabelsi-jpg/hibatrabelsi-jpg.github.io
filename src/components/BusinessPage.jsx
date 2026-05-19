import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function BusinessPage() {
  
  const openCalendly = (e) => {
    e.preventDefault();
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/hibatravelplanner/30min'
      });
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    
    const link = document.createElement("link");
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const glassStyle = {
    background: "linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.4) 100%)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    borderRadius: "30px",
    padding: "clamp(25px, 5vw, 40px)",
    width: "100%",
    boxSizing: "border-box"
  };

  const textShadowStyle = {
    textShadow: "2px 4px 15px rgba(0, 0, 0, 0.9)" 
  };

  return (
    <div style={{ minHeight: "100vh", color: "white", padding: "clamp(40px, 8vh, 100px) 20px", display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "'Inter', sans-serif" }}>
      
      <div style={{ width: "100%", maxWidth: "1100px", marginBottom: "40px" }}>
        <Link to="/" style={{ color: "#f6decd", textDecoration: "none", fontSize: "12px", display: "flex", alignItems: "center", gap: "10px", fontWeight: "600", letterSpacing: "2px", ...textShadowStyle }}>
          ← RETOUR
        </Link>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ width: "100%", maxWidth: "1100px" }}>
        
        <header style={{ marginBottom: "60px" }}>
          <span style={{ color: "#f6decd", letterSpacing: "4px", fontSize: "11px", fontWeight: "bold", display: "block", marginBottom: "15px", ...textShadowStyle }}>OFFRE CORPORATE</span>
          <h1 style={{ 
            fontFamily: "serif", 
            fontSize: "clamp(2.5rem, 8vw, 5rem)", 
            lineHeight: "1.1", 
            fontWeight: "300",
            ...textShadowStyle 
          }}>
            L'excellence pour vos <br />
            <span style={{ fontStyle: "italic", color: "#f6decd" }}>collaborateurs.</span>
          </h1>
        </header>

        {/* PARAGRAPHE CORRIGÉ : POLICE SERIF + ESPACEMENT LUXE */}
        <section style={{ marginBottom: "60px", maxWidth: "900px" }}>
          <p style={{ 
            fontFamily: "serif", // Changement de police ici
            fontSize: "clamp(20px, 2.5vw, 26px)", 
            lineHeight: "1.6", 
            color: "white", 
            fontWeight: "300",
            letterSpacing: "0.5px",
            ...textShadowStyle
          }}>
            Un collaborateur qui se sent valorisé par son entreprise est un collaborateur engagé. En déléguant l'organisation de vos moments clés, vous garantissez une expérience sans faille qui renforce la culture d'entreprise et maximise la performance collective.
          </p>
        </section>

        {/* SIGNATURE */}
        <div style={{ 
          textAlign: "left", 
          marginBottom: "80px", 
          padding: "30px", 
          background: "rgba(0,0,0,0.3)", 
          borderRadius: "20px",
          borderLeft: "3px solid #f6decd",
          maxWidth: "850px" 
        }}>
          <p style={{ fontFamily: "serif", fontSize: "24px", fontStyle: "italic", color: "#f6decd", lineHeight: "1.5", marginBottom: "15px", ...textShadowStyle }}>
            "Ma mission est de transformer votre vision stratégique en une logistique d'exception, pour que chaque séminaire devienne un investissement rentable pour l'épanouissement de vos équipes."
          </p>
          <p style={{ fontWeight: "700", fontSize: "11px", letterSpacing: "3px", color: "white", textTransform: "uppercase", opacity: 0.9, ...textShadowStyle }}>
            — Hiba, Votre partenaire Travel Planner 
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "25px", marginBottom: "80px" }}>
          {[
            { t: "Séminaires & Retraites", d: "Conception clés en main dans des lieux inspirants pour fédérer vos équipes autour de vos objectifs stratégiques." },
            { t: "Comités de Direction", d: "Logistique de haute précision et confidentialité absolue pour vos réunions les plus décisives." },
            { t: "Expériences de Cohésion", d: "Des moments de rupture avec le quotidien pour valoriser vos talents et booster la performance collective." }
          ].map((item, i) => (
            <div key={i} style={glassStyle}>
              <h3 style={{ fontFamily: "serif", fontSize: "26px", marginBottom: "15px", color: "#f6decd", fontWeight: "300", ...textShadowStyle }}>{item.t}</h3>
              <p style={{ fontSize: "16px", opacity: 0.9, lineHeight: "1.6", fontWeight: "300", ...textShadowStyle }}>{item.d}</p>
            </div>
          ))}
        </div>

        <div style={{ ...glassStyle, background: "rgba(0, 0, 0, 0.7)", padding: "clamp(50px, 10vw, 80px) 30px", textAlign: "center", border: "1px solid rgba(246, 222, 205, 0.3)" }}>
          <h2 style={{ fontFamily: "serif", fontSize: "clamp(2rem, 5vw, 3.2rem)", marginBottom: "20px", fontWeight: "300", ...textShadowStyle }}>
            Parlons de votre prochain projet.
          </h2>
          <p style={{ marginBottom: "40px", opacity: 0.9, fontSize: "18px", fontWeight: "300", ...textShadowStyle }}>
            Optimisez votre temps et assurez le succès de votre événement.
          </p>
          
          <button onClick={openCalendly} style={{ background: "#f6decd", color: "#3b2a1e", padding: "22px 60px", borderRadius: "50px", border: "none", fontWeight: "800", fontSize: "14px", letterSpacing: "2px", cursor: "pointer", boxShadow: "0 10px 40px rgba(0,0,0,0.6)" }}>
            PRENDRE RENDEZ-VOUS
          </button>
        </div>
      </motion.div>
    </div>
  );
}