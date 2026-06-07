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
        background: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(246, 222, 205, 0.08)',
        padding: '30px 20px',
        marginTop: '100px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '30px',
          marginBottom: '30px',
        }}
      >
        {/* Brand */}
        <div>
          <h3
            style={{
              color: 'white',
              fontFamily: 'serif',
              fontSize: '16px',
              marginBottom: '10px',
            }}
          >
            Hiba<span style={{ color: '#f6decd' }}>Travel</span>
          </h3>
          <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px', lineHeight: '1.4', margin: 0 }}>
            Voyages sur mesure
          </p>
          <p
            style={{
              color: '#f6decd',
              fontSize: '11px',
              marginTop: '8px',
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
              fontSize: '13px',
              marginBottom: '10px',
              fontWeight: 'bold',
              margin: '0 0 10px 0'
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
            <li style={{ marginBottom: '6px' }}>
              <a
                href="/#contact"
                style={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  textDecoration: 'none',
                  fontSize: '12px',
                }}
                onMouseEnter={(e) => (e.target.style.color = '#f6decd')}
                onMouseLeave={(e) => (e.target.style.color = 'rgba(255, 255, 255, 0.8)')}
              >
                Contact
              </a>
            </li>
            <li style={{ marginBottom: '6px' }}>
              <Link
                to="/business"
                style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  textDecoration: 'none',
                  fontSize: '12px',
                }}
                onMouseEnter={(e) => (e.target.style.color = '#f6decd')}
                onMouseLeave={(e) => (e.target.style.color = 'rgba(255, 255, 255, 0.7)')}
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
              fontSize: '13px',
              marginBottom: '10px',
              fontWeight: 'bold',
              margin: '0 0 10px 0'
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
            <li style={{ marginBottom: '6px' }}>
              <Link
                to="/legal"
                style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  textDecoration: 'none',
                  fontSize: '12px',
                }}
                onMouseEnter={(e) => (e.target.style.color = '#f6decd')}
                onMouseLeave={(e) => (e.target.style.color = 'rgba(255, 255, 255, 0.7)')}
              >
                Mentions Légales
              </Link>
            </li>
            <li style={{ marginBottom: '6px' }}>
              <Link
                to="/legal"
                style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  textDecoration: 'none',
                  fontSize: '12px',
                }}
                onMouseEnter={(e) => (e.target.style.color = '#f6decd')}
                onMouseLeave={(e) => (e.target.style.color = 'rgba(255, 255, 255, 0.7)')}
              >
                Politique de Confidentialité
              </Link>
            </li>
            <li style={{ marginBottom: '6px' }}>
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
          borderTop: '1px solid rgba(246, 222, 205, 0.05)',
          paddingTop: '15px',
          textAlign: 'center',
          color: 'rgba(255, 255, 255, 0.4)',
          fontSize: '11px',
        }}
      >
        <p style={{ margin: 0 }}>
          © {currentYear} Hiba Travel Planner
        </p>
        <p style={{ margin: '3px 0 0' }}>
          Fait avec ❤️ et passion
        </p>
      </div>
    </footer>
  );
}
