import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAnalytics, ANALYTICS_EVENTS } from "../hooks/useAnalytics";

const formules = [
  { 
    id: "guide-essentiel",
    nom: "Guide Essentiel", prix: "109 €", 
    desc: "Idéal pour garder la main sur ses réservations tout en ayant un expert à ses côtés.",
    points: ["Recherche d'activités", "Sélection d'adresses", "Accompagnement gain de temps"] 
  },
  { 
    id: "evasion-express",
    nom: "Évasion Express", prix: "139 €", 
    desc: "Parfait pour un week-end ou city trip de 2 nuits, avec l'essentiel bien pensé.",
    points: ["Transport & Hébergement", "Activités", "Recommandations"] 
  },
  { 
    id: "sejour-serenite",
    nom: "Séjour Sérénité", prix: "239 €", 
    desc: "Pour des séjours de 4 à 8 nuits. Une organisation complète pour voyager léger.",
    points: ["Transports A/R et sur place", "Hébergement & Activités", "Carnet digital"] 
  },
  { 
    id: "grand-voyageur",
    nom: "Grand Voyageur", prix: "339 €", 
    desc: "Pour les itinéraires ambitieux ou à plusieurs étapes. Optimisé et fluide.",
    points: ["Itinéraire cohérent", "Logistique totale", "Accompagnement complet"] 
  },
  { 
    id: "sur-mesure",
    nom: "Sur Mesure", prix: "Sur Devis", 
    desc: "Road trips, voyages multi-étapes ou projets complexes. Une création unique.",
    points: ["Projets de groupe / EVJF/G", "Logistique millimétrée", "Suivi ultra-personnalisé"],
    special: true 
  }
];

export default function Features() {
  const { trackEvent } = useAnalytics();

  const handleFormuleClick = (formuleId, formuleName) => {
    trackEvent(ANALYTICS_EVENTS.FORMULE_SELECTED, {
      formule_id: formuleId,
      formule_name: formuleName
    });
  };

  const cardStyle = {
    background: "linear-gradient(135deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.2) 100%)",
    backdropFilter: "blur(25px)",
    WebkitBackdropFilter: "blur(25px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "32px",
    padding: "clamp(30px, 5vw, 45px)", // Padding adaptatif
    display: "flex",
    flexDirection: "column",
    height: "100%",
    boxSizing: "border-box",
    flex: "1 1 300px", // Magie du mobile : prend 300px min, mais s'étire si besoin
    maxWidth: "400px" // Empêche les cartes d'être trop géantes sur grand écran
  };

  return (
    <section id="formules" style={{ padding: 'clamp(60px, 10vh, 100px) 20px', color: 'white' }}>
      <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 8vw, 80px)' }}>
        <h2 style={{ 
          fontFamily: 'serif', 
          fontSize: 'clamp(2.5rem, 8vw, 3.5rem)', // Titre plus petit sur mobile
          fontWeight: '300' 
        }}>
          Les <span style={{ fontStyle: 'italic', color: '#f6decd' }}>Collections</span>
        </h2>
      </div>

      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        gap: '25px', 
        maxWidth: '1200px', 
        margin: '0 auto' 
      }}>
        {formules.map((f, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -10 }}
            style={{ 
              ...cardStyle, 
              border: f.special ? "2px solid #e5b181" : "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: f.special ? "0 0 25px rgba(229, 177, 129, 0.3)" : "none"
            }}
          >
            {f.special && (
              <span style={{ color: '#f6decd', fontSize: '10px', letterSpacing: '4px', marginBottom: '10px', fontWeight: 'bold' }}>
                PRESTIGE
              </span>
            )}
            <h3 style={{ fontFamily: 'serif', fontSize: '26px', marginBottom: '10px' }}>{f.nom}</h3>
            <p style={{ color: '#f6decd', fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>{f.prix}</p>
            <p style={{ fontSize: '14px', opacity: 0.7, marginBottom: '30px', lineHeight: '1.6', minHeight: '60px' }}>{f.desc}</p>
            
            <ul style={{ listStyle: 'none', padding: 0, flexGrow: 1 }}>
              {f.points.map((p, idx) => (
                <li key={idx} style={{ fontSize: '13px', marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ width: '6px', height: '6px', background: '#f6decd', borderRadius: '50%', marginRight: '12px' }} />
                  {p}
                </li>
              ))}
            </ul>

            <Link
              to={f.special ? "/" : `/formule/${f.id}`}
              onClick={(e) => {
                if (f.special) {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                } else {
                  handleFormuleClick(f.id, f.nom);
                }
              }}
              style={{ textDecoration: 'none', marginTop: '30px' }}
            >
              <button style={{ 
                width: '100%', padding: '16px', borderRadius: '50px', 
                fontSize: '11px', fontWeight: 'bold', letterSpacing: '2px', cursor: 'pointer',
                border: f.special ? 'none' : '1px solid rgba(246, 222, 205, 0.3)',
                background: f.special ? '#f6decd' : 'transparent',
                color: f.special ? '#3b2a1e' : 'white',
                transition: 'all 0.3s ease'
              }}>
                {f.special ? 'DEMANDER UN DEVIS' : 'SÉLECTIONNER'}
              </button>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}