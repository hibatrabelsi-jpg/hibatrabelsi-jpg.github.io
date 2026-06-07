import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, lazy, Suspense } from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import Features from "./components/Features";
import B2B from "./components/B2B";
import Testimonials from "./components/Testimonials";
import FormuleDetail from "./components/FormuleDetail";
import BusinessPage from "./components/BusinessPage";
import ChatBot from "./components/ChatBot";
import SEO from "./components/SEO";
import ErrorBoundary from "./components/ErrorBoundary";
import Legal from "./components/Legal";
import CookieBanner from "./components/CookieBanner";
import Footer from "./components/Footer";
import { FORMULES } from "./constants/formules";

// Lazy-load Contact component pour optimiser les performances
const Contact = lazy(() => import("./components/Contact"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Utiliser les formules centralisées
const detailsFormules = Object.fromEntries(
  Object.entries(FORMULES).map(([key, formule]) => [
    key,
    {
      titre: formule.titre,
      prix: formule.prix,
      description: formule.description,
      inclusions: formule.inclusions,
      lienStripe: formule.lienStripe
    }
  ])
);

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        
        <Route path="/" element={
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
            <SEO
              title="Hiba Travel Planner — L'Évasion Redéfinie"
              description="Organisation de voyages sur mesure pour particuliers et entreprises. Séjours sérénité, week-ends express, grands voyages ou projets sur mesure. Hiba planifie vos rêves."
              keywords="voyage sur mesure, travel planner, organisation voyage, séjour vacances, weekend trip, agence voyage"
              url="https://hibatravel.com"
            />
            <main id="main-content">
              <Hero />
              <Features />
              <B2B />
              <Testimonials />
              <About />
              <Suspense fallback={<div style={{ height: '600px' }} />}>
                <Contact />
              </Suspense>
            </main>
          </motion.div>
        } />

        <Route path="/business" element={
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
            <SEO
              title="Hiba Travel Planner B2B — Voyages d'entreprise sur mesure"
              description="Solutions de voyages d'entreprise, séminaires et incentives. Hiba organise les déplacements professionnels et événements d'équipe pour maximiser l'impact et le bien-être."
              keywords="voyage entreprise, séminaire, incentive, voyage B2B, team building"
              url="https://hibatravel.com/business"
            />
            <main>
              <BusinessPage />
            </main>
          </motion.div>
        } />

        <Route path="/legal" element={
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
            <SEO
              title="Mentions Légales & Politique de Confidentialité — Hiba Travel Planner"
              description="Mentions légales, politique de confidentialité RGPD et conditions d'utilisation de Hiba Travel Planner."
              keywords="mentions légales, politique confidentialité, RGPD, conditions utilisation"
              url="https://hibatravel.com/legal"
            />
            <Legal />
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

  // Détecter Safari et utiliser la vidéo appropriée
  const isSafari = () => {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  };

  const getVideoSrc = () => {
    // Safari a besoin d'une version spécifique avec le bon codec
    return isSafari() ? '/videos/desert-sunset-safari-fixed.mp4' : '/videos/desert-sunset-optimized.mp4';
  };

  const videoSrc = getVideoSrc();

  useEffect(() => {
    const a = videoA.current;
    const b = videoB.current;
    if (!a || !b) return;

    // Les vidéos se chargent avec preload="metadata" (optimal)
    // Les crossfades se déclenchent automatiquement via timeupdate events

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
      next.play().catch(() => {
        // Ignorer les erreurs de lecture automatique (certains navigateurs/contextes)
      });

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

    return () => {
      a.removeEventListener('timeupdate', onA);
      b.removeEventListener('timeupdate', onB);
    };
  }, []);

  // Style pour les vidéos avec background placeholder pour améliorer le LCP perceptuel
  const vStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    objectFit: 'cover',
    zIndex: -1,
    background: 'linear-gradient(135deg, #8B4513 0%, #D2691E 50%, #CD853F 100%)' // Couleur sunset comme placeholder
  };

  return (
    <ErrorBoundary>
      <Router>
        <ScrollToTop />
        <div style={{ position: 'relative', width: '100%' }}>
        {/* Vidéos optimisées pour performance : preload metadata + chargement déféré */}
        <video ref={videoA} autoPlay muted playsInline preload="metadata" webkit-playsinline style={{ ...vStyle, opacity: 1 }}>
          {!isSafari() && <source src="/videos/desert-sunset-optimized.webm" type="video/webm" />}
          <source src={videoSrc} type="video/mp4" />
        </video>
        <video ref={videoB} muted playsInline preload="metadata" webkit-playsinline style={{ ...vStyle, opacity: 0 }}>
          {!isSafari() && <source src="/videos/desert-sunset-optimized.webm" type="video/webm" />}
          <source src={videoSrc} type="video/mp4" />
        </video>
        <AnimatedRoutes />
        <Footer />
        <ChatBot />
        <CookieBanner />
      </div>
      </Router>
    </ErrorBoundary>
  );
}