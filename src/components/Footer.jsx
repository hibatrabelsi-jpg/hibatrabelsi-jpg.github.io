import { Link } from 'react-router-dom';

/**
 * Footer Component
 * Contains links to legal pages and contact info
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background: 'rgba(0, 0, 0, 0.6)',
        borderTop: '1px solid rgba(246, 222, 205, 0.1)',
        padding: '40px 20px',
        marginTop: '100px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '40px',
          marginBottom: '40px',
        }}
      >
        {/* Brand */}
        <div>
          <h3
            style={{
              color: 'white',
              fontFamily: 'serif',
              fontSize: '20px',
              marginBottom: '15px',
            }}
          >
            Hiba<span style={{ color: '#f6decd' }}>Travel</span>
          </h3>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>
            Organisation de voyages sur mesure pour particuliers et entreprises.
          </p>
          <p
            style={{
              color: '#f6decd',
              fontSize: '14px',
              marginTop: '15px',
              fontWeight: 'bold',
            }}
          >
            hibatravelplanner@gmail.com
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4
            style={{
              color: '#f6decd',
              fontSize: '16px',
              marginBottom: '15px',
              fontWeight: 'bold',
            }}
          >
            Navigation
          </h4>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
            }}
          >
            <li style={{ marginBottom: '10px' }}>
              <a
                href="/#contact"
                style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  textDecoration: 'none',
                  fontSize: '14px',
                }}
                onMouseEnter={(e) => (e.target.style.color = '#f6decd')}
                onMouseLeave={(e) => (e.target.style.color = 'rgba(255, 255, 255, 0.8)')}
              >
                Contact
              </a>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <Link
                to="/business"
                style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  textDecoration: 'none',
                  fontSize: '14px',
                }}
                onMouseEnter={(e) => (e.target.style.color = '#f6decd')}
                onMouseLeave={(e) => (e.target.style.color = 'rgba(255, 255, 255, 0.8)')}
              >
                B2B / Business
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h4
            style={{
              color: '#f6decd',
              fontSize: '16px',
              marginBottom: '15px',
              fontWeight: 'bold',
            }}
          >
            Légal & Confidentialité
          </h4>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
            }}
          >
            <li style={{ marginBottom: '10px' }}>
              <Link
                to="/legal"
                style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  textDecoration: 'none',
                  fontSize: '14px',
                }}
                onMouseEnter={(e) => (e.target.style.color = '#f6decd')}
                onMouseLeave={(e) => (e.target.style.color = 'rgba(255, 255, 255, 0.8)')}
              >
                Mentions Légales
              </Link>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <Link
                to="/legal"
                style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  textDecoration: 'none',
                  fontSize: '14px',
                }}
                onMouseEnter={(e) => (e.target.style.color = '#f6decd')}
                onMouseLeave={(e) => (e.target.style.color = 'rgba(255, 255, 255, 0.8)')}
              >
                Politique de Confidentialité
              </Link>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <a
                href="#"
                onClick={() => localStorage.removeItem('hiba_cookie_consent')}
                style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  textDecoration: 'none',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => (e.target.style.color = '#f6decd')}
                onMouseLeave={(e) => (e.target.style.color = 'rgba(255, 255, 255, 0.8)')}
              >
                Paramètres Cookies
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div
        style={{
          borderTop: '1px solid rgba(246, 222, 205, 0.1)',
          paddingTop: '20px',
          textAlign: 'center',
          color: 'rgba(255, 255, 255, 0.5)',
          fontSize: '12px',
        }}
      >
        <p style={{ margin: 0 }}>
          © {currentYear} Hiba Travel Planner. Tous droits réservés.
        </p>
        <p style={{ margin: '5px 0 0' }}>
          Fait avec ❤️ et organisé avec passion
        </p>
      </div>
    </footer>
  );
}
