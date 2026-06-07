import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAnalytics, ANALYTICS_EVENTS } from "../hooks/useAnalytics";

const FLOWS = {
  start: {
    bot: "Bonjour ! Je suis l'assistante virtuelle de Hiba ✨\nComment puis-je vous aider ?",
    options: [
      { label: "Quelle formule me correspond ?", next: "choix_projet" },
      { label: "Comment ça marche ?", next: "comment_ca_marche" },
      { label: "Les tarifs", next: "tarifs" },
      { label: "Payer en plusieurs fois ?", next: "paiement" },
      { label: "Contacter Hiba", next: "contact" },
    ],
  },
  choix_projet: {
    bot: "Parfait ! Pour mieux vous orienter, quel est votre projet ?",
    options: [
      { label: "Un week-end ou city trip", next: "rec_evasion" },
      { label: "Un séjour de 4 à 8 nuits", next: "rec_serenite" },
      { label: "Un grand voyage multi-étapes", next: "rec_voyageur" },
      { label: "Juste des conseils, je réserve moi-même", next: "rec_essentiel" },
      { label: "Voyage de groupe / EVJF / EVJG", next: "rec_mesure" },
    ],
  },
  rec_evasion: {
    bot: "L'Évasion Express à 139€ est faite pour vous ! 🌍\nTransport, hébergement et activités organisés pour 2 nuits. Vous n'avez qu'à profiter.",
    formule: "evasion-express",
    options: [
      { label: "Voir la formule", action: "formule", id: "evasion-express" },
      { label: "Retour au menu", next: "start" },
    ],
  },
  rec_serenite: {
    bot: "Le Séjour Sérénité à 239€ correspond parfaitement ! 🏖️\nOrganisation complète de 4 à 8 nuits avec carnet digital inclus.",
    options: [
      { label: "Voir la formule", action: "formule", id: "sejour-serenite" },
      { label: "Retour au menu", next: "start" },
    ],
  },
  rec_voyageur: {
    bot: "Le Grand Voyageur à 339€ est votre formule idéale ! ✈️\nItinéraire structuré, logistique totale, pépites locales. Paiement en 2x possible !",
    options: [
      { label: "Voir la formule", action: "formule", id: "grand-voyageur" },
      { label: "Retour au menu", next: "start" },
    ],
  },
  rec_essentiel: {
    bot: "Le Guide Essentiel à 109€ est parfait pour vous ! 🗺️\nHiba fait les recherches et vous donne l'expertise, vous gardez la main sur les réservations.",
    options: [
      { label: "Voir la formule", action: "formule", id: "guide-essentiel" },
      { label: "Retour au menu", next: "start" },
    ],
  },
  rec_mesure: {
    bot: "La formule Sur Mesure est exactement ce qu'il vous faut ! 👑\nHiba conçoit un voyage unique pour votre groupe, EVJF/G ou projet complexe. Tout est géré pour vous.",
    options: [
      { label: "Demander un devis", action: "contact_section" },
      { label: "Retour au menu", next: "start" },
    ],
  },
  comment_ca_marche: {
    bot: "C'est très simple ✨\n\n1. Vous choisissez votre formule\n2. Hiba vous contacte pour un appel découverte gratuit\n3. Elle organise tout selon vos envies\n4. Vous voyagez sans stress !",
    options: [
      { label: "Réserver un appel découverte", action: "contact_section" },
      { label: "Voir les formules", action: "formules_section" },
      { label: "Retour au menu", next: "start" },
    ],
  },
  tarifs: {
    bot: "Voici les formules disponibles 💫\n\n• Guide Essentiel — 109€\n• Évasion Express — 139€\n• Séjour Sérénité — 239€\n• Grand Voyageur — 339€\n• Sur Mesure — Sur devis",
    options: [
      { label: "Quelle formule me correspond ?", next: "choix_projet" },
      { label: "Retour au menu", next: "start" },
    ],
  },
  paiement: {
    bot: "Le paiement en 2 fois est disponible pour la formule Grand Voyageur (339€) 🙌\n\nPour les autres formules, le paiement s'effectue en une seule fois.",
    options: [
      { label: "Voir le Grand Voyageur", action: "formule", id: "grand-voyageur" },
      { label: "Retour au menu", next: "start" },
    ],
  },
  contact: {
    bot: "Vous pouvez joindre Hiba de deux façons 🤍\n\n📅 Un appel découverte gratuit de 30 min\n📧 Via le formulaire de contact",
    options: [
      { label: "Réserver un appel / Envoyer un message", action: "contact_section" },
      { label: "Retour au menu", next: "start" },
    ],
  },
};

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentFlow, setCurrentFlow] = useState("start");
  const [started, setStarted] = useState(false);
  const bottomRef = useRef(null);
  const navigate = useNavigate();
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    if (open && !started) {
      setStarted(true);
      setMessages([{ from: "bot", text: FLOWS.start.bot }]);
      setCurrentFlow("start");
      trackEvent(ANALYTICS_EVENTS.CHATBOT_OPEN);
    }
  }, [open, started, trackEvent]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleOption = (option) => {
    setMessages((prev) => [...prev, { from: "user", text: option.label }]);

    // Track chaque sélection d'option
    trackEvent(ANALYTICS_EVENTS.CHATBOT_FLOW_SELECTED, {
      flow_name: currentFlow,
      option_label: option.label,
      action_type: option.action || 'flow_navigation'
    });

    if (option.action === "formule") {
      trackEvent(ANALYTICS_EVENTS.CHATBOT_FORMULE_RECOMMENDED, {
        formule_id: option.id
      });
      setTimeout(() => {
        setOpen(false);
        navigate(`/formule/${option.id}`);
      }, 400);
      return;
    }
    if (option.action === "contact_section") {
      setTimeout(() => {
        setOpen(false);
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      }, 400);
      return;
    }
    if (option.action === "formules_section") {
      setTimeout(() => {
        setOpen(false);
        document.getElementById("formules")?.scrollIntoView({ behavior: "smooth" });
      }, 400);
      return;
    }

    const next = FLOWS[option.next];
    if (!next) return;
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "bot", text: next.bot }]);
      setCurrentFlow(option.next);
    }, 350);
  };

  const currentOptions = FLOWS[currentFlow]?.options || [];

  return (
    <>
      {/* Bouton d'ouverture */}
      <motion.button
        aria-label={open ? "Fermer l'assistant Hiba" : "Ouvrir l'assistant Hiba"}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: "fixed", bottom: "24px", right: "24px", zIndex: 1000,
          width: "56px", height: "56px", borderRadius: "50%",
          background: "linear-gradient(135deg, #f6decd, #e5b181)",
          border: "none", cursor: "pointer",
          boxShadow: "0 4px 20px rgba(246,222,205,0.4)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "28px", fontWeight: "bold", color: "white",
        }}
      >
        {open ? "✕" : "?"}
      </motion.button>

      {/* Fenêtre du chatbot */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed", bottom: "92px", right: "24px", zIndex: 1000,
              width: "min(340px, calc(100vw - 48px))",
              maxHeight: "520px",
              background: "rgba(10, 6, 4, 0.88)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderRadius: "24px",
              border: "1px solid rgba(246,222,205,0.2)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
              display: "flex", flexDirection: "column", overflow: "hidden",
            }}
          >
            {/* Header */}
            <div style={{
              padding: "16px 20px",
              borderBottom: "1px solid rgba(246,222,205,0.1)",
              background: "rgba(246,222,205,0.05)",
            }}>
              <p style={{ margin: 0, color: "#f6decd", fontFamily: "serif", fontSize: "15px", fontWeight: "600" }}>
                Assistante Hiba Travel ✨
              </p>
              <p style={{ margin: "2px 0 0", color: "rgba(255,255,255,0.4)", fontSize: "11px" }}>
                Réponse instantanée
              </p>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    alignSelf: msg.from === "bot" ? "flex-start" : "flex-end",
                    maxWidth: "85%",
                    background: msg.from === "bot"
                      ? "rgba(246,222,205,0.1)"
                      : "linear-gradient(135deg, #f6decd, #e5b181)",
                    color: msg.from === "bot" ? "rgba(255,255,255,0.9)" : "#3b2a1e",
                    padding: "10px 14px",
                    borderRadius: msg.from === "bot" ? "4px 16px 16px 16px" : "16px 4px 16px 16px",
                    fontSize: "13px",
                    lineHeight: "1.6",
                    whiteSpace: "pre-line",
                  }}
                >
                  {msg.text}
                </motion.div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Options */}
            {currentOptions.length > 0 && (
              <div style={{ padding: "10px 12px 14px", display: "flex", flexDirection: "column", gap: "7px" }}>
                {currentOptions.map((opt, i) => (
                  <motion.button
                    key={i}
                    aria-label={opt.label}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleOption(opt)}
                    style={{
                      background: "rgba(246,222,205,0.08)",
                      border: "1px solid rgba(246,222,205,0.25)",
                      borderRadius: "50px",
                      color: "#f6decd",
                      padding: "9px 14px",
                      fontSize: "12px",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.2s",
                    }}
                  >
                    {opt.label}
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
