import { motion } from "framer-motion";

export default function About() {
  const glassEffect = {
    background: "rgba(0, 0, 0, 0.45)", 
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "45px",
    padding: "50px", 
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%' 
  };

  return (
    <section id="about" style={{ padding: '100px 20px', color: 'white' }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        display: 'flex', 
        flexWrap: 'wrap', 
        alignItems: 'stretch', 
        gap: '40px' 
      }}>
        
        {/* BLOC PHOTO : Hauteur Signature 580px */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ flex: '1 1 450px', display: 'flex' }}
        >
          <div style={{ position: 'relative', width: '100%', height: '700px' }}>
            <img 
              src="/moi.jpg" 
              alt="Hiba - Travel Planner"
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover', 
                borderRadius: '45px',
                display: 'block',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
              }}
            />
            
            {/* LE BADGE */}
            <div style={{
              position: 'absolute',
              bottom: '25px',
              right: '-15px',
              background: '#e5b181',
              color: '#3b2a1e',
              padding: '20px 32px',
              borderRadius: '25px',
              fontFamily: 'serif',
              fontSize: '17px',
              fontStyle: 'italic',
              boxShadow: '0 12px 35px rgba(0,0,0,0.4)',
              zIndex: 10,
              lineHeight: '1.2'
            }}>
              Votre voyage, <br/> mon expertise.
            </div>
          </div>
        </motion.div>

        {/* BLOC TEXTE */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          style={{ flex: '1 1 700px' }}
        >
          <div style={glassEffect}>
            <span style={{ color: '#e5b181', fontSize: '12px', letterSpacing: '6px', fontWeight: '700px' }}>
              HIBA TRAVEL PLANNER
            </span>
            
            <h2 style={{ 
              fontFamily: 'serif', 
              fontSize: '2.8rem', 
              marginTop: '20px', 
              marginBottom: '30px', 
              lineHeight: '1.1' 
            }}>
              Confiez-moi vos rêves, <br/>
              <span style={{ fontStyle: 'italic', color: '#e5b181' }}>je m'occupe du reste.</span>
            </h2>
            
            <div style={{ 
              lineHeight: '1.8', 
              fontSize: '17px', 
              color: 'rgba(255, 255, 255, 0.9)',
              fontWeight: '300'
            }}>
              <p style={{ marginBottom: '25px' }}>
                Parce que chaque voyageur est unique, je crois fermement que votre itinéraire doit l'être aussi. Mon métier n'est pas seulement de réserver, mais de sculpter une expérience qui vous ressemble à 100%.
              </p>
              <p>
                Oubliez le stress des préparatifs. Je mets ma passion et mon carnet d'adresses à votre service pour créer une évasion sans fausse note, où votre seule mission est de profiter.
              </p>
            </div>

            <div style={{ marginTop: '50px', display: 'flex', gap: '50px', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ textAlign: 'center' }}>
                <p aria-hidden="true" style={{ fontSize: '45px', fontFamily: 'serif', color: '#e5b181', margin: 0, lineHeight: '1' }}>∞</p>
                <p style={{ fontSize: '10px', opacity: 1, letterSpacing: '2px', fontWeight: 'bold' }}>PASSION</p>
              </div>
              <div aria-hidden="true" style={{ width: '1px', height: '40px', background: 'rgba(255, 255, 255, 0.1)' }}></div>
              <div style={{ textAlign: 'center' }}>
                <p aria-hidden="true" style={{ fontSize: '35px', fontFamily: 'serif', color: '#e5b181', margin: 0, lineHeight: '1' }}>0</p>
                <p style={{ fontSize: '10px', opacity: 1, letterSpacing: '2px', fontWeight: 'bold' }}>STRESS</p>
              </div>

            </div>

            {/* Signature : logo en filigrane beige, centré, comme un cachet en fin de lettre */}
            <div style={{ marginTop: '45px', textAlign: 'center' }}>
              <img
                src="/logo-light.png"
                alt=""
                aria-hidden="true"
                loading="lazy"
                style={{ height: '120px', width: 'auto', display: 'inline-block', opacity: 0.85 }}
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}