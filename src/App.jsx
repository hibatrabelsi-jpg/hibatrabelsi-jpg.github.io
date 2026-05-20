import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import Features from "./components/Features";
import B2B from "./components/B2B"; 
import Contact from "./components/Contact";
import Testimonials from "./components/Testimonials";
import FormuleDetail from "./components/FormuleDetail";
import BusinessPage from "./components/BusinessPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const detailsFormules = {
  "guide-essentiel": {
    titre: "Guide Essentiel",
    prix: "109",
    description: "Idéal pour garder la main sur ses réservations tout en ayant un expert à ses côtés.",
    inclusions: ["Recherche d’activités", "Sélection d’adresses", "Optimisation du temps", "SAV"],
    lienStripe: "#"
  },
  "evasion-express": {
    titre: "Évasion Express",
    prix: "139",
    description: "Parfait pour un week-end ou city trip de 2 nuits.",
    inclusions: ["Transport & Hébergement", "Activités", "Recommandations", "SAV"],
    lienStripe: "#"
  },
  "sejour-serenite": {
    titre: "Séjour Sérénité",
    prix: "239",
    description: "Organisation complète pour les séjours de 4 à 8 nuits.",
    inclusions: ["Transports A/R", "Hébergement & Activités", "Carte interactive", "Carnet digital", "SAV"],
    lienStripe: "#"
  },
  "grand-voyageur": {
    titre: "Grand Voyageur",
    prix: "339",
    description: "Pour les itinéraires ambitieux ou à plusieurs étapes.",
    inclusions: ["Itinéraire structuré", "Logistique totale", "Pépites locales", "Carnet digital", "Paiement en 2x"],
    lienStripe: "#"
  }
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        
        <Route path="/" element={
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
            <Hero />
            <Features />
            <B2B /> 
            <Testimonials />
            <About />
            <Contact />
          </motion.div>
        } />

        <Route path="/business" element={
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
            <BusinessPage />
          </motion.div>
        } />

        {Object.entries(detailsFormules).map(([id, info]) => (
          <Route key={id} path={`/formule/${id}`} element={<FormuleDetail {...info} />} />
        ))}
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const videoA = useRef(null);
  const videoB = useRef(null);
  const active = useRef('a');

  useEffect(() => {
    const a = videoA.current;
    const b = videoB.current;
    if (!a || !b) return;

    const CROSSFADE = 0.5; // secondes
    const TRIGGER = 1;

    const handle = (current, next) => {
      if (!current.duration) return;
      if (current.currentTime < current.duration - TRIGGER) return;
      if (active.current !== (current === a ? 'a' : 'b')) return;

      active.current = current === a ? 'b' : 'a';
      next.currentTime = 0;
      next.style.transition = 'none';
      next.style.opacity = '0';
      next.play();

      setTimeout(() => {
        next.style.transition = `opacity ${CROSSFADE}s ease`;
        current.style.transition = `opacity ${CROSSFADE}s ease`;
        next.style.opacity = '1';
        current.style.opacity = '0';
      }, 50);
    };

    const onA = () => handle(a, b);
    const onB = () => handle(b, a);
    a.addEventListener('timeupdate', onA);
    b.addEventListener('timeupdate', onB);
    return () => { a.removeEventListener('timeupdate', onA); b.removeEventListener('timeupdate', onB); };
  }, []);

  const vStyle = { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', objectFit: 'cover', zIndex: -1 };

  return (
    <Router>
      <ScrollToTop />
      <div style={{ position: 'relative', width: '100%' }}>
        <video ref={videoA} autoPlay muted playsInline style={{ ...vStyle, opacity: 1 }}>
          <source src="/videos/desert-sunset.mp4" type="video/mp4" />
        </video>
        <video ref={videoB} muted playsInline style={{ ...vStyle, opacity: 0 }}>
          <source src="/videos/desert-sunset.mp4" type="video/mp4" />
        </video>
        <AnimatedRoutes />
      </div>
    </Router>
  );
}