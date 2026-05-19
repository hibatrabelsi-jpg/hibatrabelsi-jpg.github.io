export default function Header() {
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '40px 60px',
    }}>
      <div style={{ 
        color: 'white', 
        fontFamily: 'serif', 
        fontSize: '22px', 
        fontWeight: '300',
        letterSpacing: '-0.5px' 
      }}>
        Hiba<span style={{ color: '#f6decd', fontStyle: 'italic' }}>Travel</span>
      </div>
      
      <a href="#contact" style={{ 
        color: 'white', 
        textDecoration: 'none', 
        fontSize: '9px', 
        letterSpacing: '4px', 
        fontWeight: 'bold',
        opacity: 0.8,
        transition: 'opacity 0.3s'
      }}
      onMouseEnter={(e) => e.target.style.opacity = 1}
      onMouseLeave={(e) => e.target.style.opacity = 0.8}
      >
        CONTACT
      </a>
    </nav>
  );
}
