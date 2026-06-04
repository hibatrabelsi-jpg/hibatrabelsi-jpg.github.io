import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useAnalytics, ANALYTICS_EVENTS } from "../hooks/useAnalytics";

export default function Contact() {
  const [status, setStatus] = useState("");
  const { trackEvent } = useAnalytics();

  // Script Calendly maintenant chargé globalement dans index.html avec async defer
  // Plus besoin de le charger dynamiquement ici

  const openCalendly = (e) => {
    e.preventDefault();
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: 'https://calendly.com/hibatravelplanner/30min' });
    } else {
      window.open('https://calendly.com/hibatravelplanner/30min', '_blank');
    }
  };

  const cardStyle = {
    background: "rgba(0, 0, 0, 0.55)", // Fond plus sombre pour faire ressortir le texte
    backdropFilter: "blur(40px) saturate(150%)",
    WebkitBackdropFilter: "blur(40px) saturate(150%)",
    borderRadius: "60px", 
    padding: "60px 40px",
    maxWidth: "850px",
    margin: "0 auto",
    boxShadow: "0 25px 80px rgba(0, 0, 0, 0.6)",
    maskImage: "radial-gradient(ellipse at center, black 85%, transparent 100%)",
    WebkitMaskImage: "radial-gradient(ellipse at center, black 85%, transparent 100%)"
  };

  const textShadowStyle = {
    textShadow: "0 2px 10px rgba(0,0,0,0.9)" 
  };

  const inputStyle = {
    width: "100%",
    padding: "20px",
    borderRadius: "15px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    background: "rgba(255, 255, 255, 0.1)",
    color: "white",
    fontSize: "16px",
    outline: "none",
    marginBottom: "20px"
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const formEmail = data.get('email');
    const formName = data.get('name');

    try {
      const response = await fetch("https://formspree.io/f/mpqylnld", {
        method: "POST",
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        setStatus("SUCCESS");
        form.reset();
        // Track successful form submission
        trackEvent(ANALYTICS_EVENTS.CONTACT_FORM_SUBMIT, {
          email: formEmail,
          status: 'success'
        });
      } else {
        setStatus("ERROR");
        trackEvent(ANALYTICS_EVENTS.CONTACT_FORM_ERROR, {
          error: 'form_submission_failed'
        });
      }
    } catch (error) {
      setStatus("ERROR");
      trackEvent(ANALYTICS_EVENTS.CONTACT_FORM_ERROR, {
        error: error.message || 'unknown_error'
      });
    }
  };

  return (
    <section id="contact" style={{ padding: '120px 20px', background: 'transparent' }}>
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} style={cardStyle}>
        
        {status === "SUCCESS" ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <h2 style={{ fontFamily: 'serif', color: '#f6decd', fontSize: '3rem', ...textShadowStyle }}>Merci !</h2>
            <p style={{ color: 'white', marginTop: '20px', ...textShadowStyle }}>Votre demande a bien été transmise.</p>
            <button onClick={() => setStatus("")} style={{ marginTop: '30px', background: 'none', border: '1px solid #f6decd', color: '#f6decd', padding: '12px 25px', borderRadius: '50px', cursor: 'pointer' }}>RETOUR</button>
          </div>
        ) : (
          <>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h2 style={{ fontFamily: 'serif', fontSize: 'clamp(2.5rem, 8vw, 4rem)', color: 'white', fontWeight: '300', ...textShadowStyle }}>
                Contactez-<span style={{ fontStyle: 'italic', color: '#f6decd' }}>moi</span>
              </h2>
            </div>

            {/* SECTION CALENDLY AVEC TON LIEN DIRECT */}
            <div style={{ marginBottom: '40px', textAlign: 'center', padding: '30px', borderRadius: '30px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(246, 222, 205, 0.3)' }}>
               <p style={{ color: 'white', fontSize: '17px', marginBottom: '15px', letterSpacing: '1px', ...textShadowStyle }}>Vous préférez un échange direct ?</p>
               <motion.button 
                onClick={openCalendly}
                whileHover={{ scale: 1.05, color: "#fff" }}
                style={{ background: 'none', border: 'none', color: '#f6decd', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold', letterSpacing: '2px', textDecoration: 'underline' }}
               >
                 RÉSERVER VOTRE APPEL DÉCOUVERTE
               </motion.button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.3)' }}></div>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', fontWeight: 'bold' }}>OU PAR MESSAGE</span>
                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.3)' }}></div>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <input type="text" name="nom" placeholder="Nom complet" required style={{ ...inputStyle, flex: '1 1 300px' }} />
                <input type="email" name="email" placeholder="Email" required style={{ ...inputStyle, flex: '1 1 300px' }} />
              </div>
              <textarea name="message" placeholder="Dites-moi en plus sur votre projet..." rows="4" required style={{ ...inputStyle, resize: 'none', fontFamily: 'inherit' }} />
              
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '30px' }}>
                <input type="checkbox" id="rgpd" required style={{ marginTop: '5px', accentColor: '#f6decd' }} />
                <label htmlFor="rgpd" style={{ color: 'rgba(255,255,255,0.9)', fontSize: '13px', cursor: 'pointer', ...textShadowStyle }}>J'accepte d'être recontacté pour ma demande de voyage.</label>
              </div>

              <motion.button 
                type="submit" 
                whileHover={{ scale: 1.02, backgroundColor: "#fff", color: "#000" }} 
                style={{ width: "100%", padding: "22px", borderRadius: "50px", border: "none", background: "#f6decd", color: "#3b2a1e", fontSize: "13px", fontWeight: "bold", letterSpacing: "3px", cursor: "pointer" }}
              >
                {status === "ERROR" ? "ERREUR, RÉESSAYEZ" : "ENVOYER LE MESSAGE"}
              </motion.button>
            </form>
          </>
        )}
      </motion.div>
    </section>
  );
}