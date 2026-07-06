import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * DemoMode Component
 * Activates automatic scroll for recording demo videos
 *
 * Usage: Add ?demo=true to URL to activate
 * Example: http://localhost:5174/?demo=true
 */
export default function DemoMode() {
  const [isScrolling, setIsScrolling] = useState(false);
  const location = useLocation();

  // Mode démo dérivé directement de l'URL (?demo=true) — pas besoin d'un state
  const isDemoMode = new URLSearchParams(location.search).get('demo') === 'true';

  useEffect(() => {
    if (!isDemoMode || !isScrolling) return;

    const scrollSpeed = 1.5; // pixels per frame
    let scrollAmount = 0;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    const interval = setInterval(() => {
      scrollAmount += scrollSpeed;

      if (scrollAmount >= maxScroll) {
        // Reset to top and restart
        window.scrollTo(0, 0);
        scrollAmount = 0;
      } else {
        window.scrollTo(0, scrollAmount);
      }
    }, 30); // ~33fps

    return () => clearInterval(interval);
  }, [isDemoMode, isScrolling]);

  if (!isDemoMode) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        right: '20px',
        transform: 'translateY(-50%)',
        zIndex: 10001,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        background: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(10px)',
        padding: '20px',
        borderRadius: '12px',
        border: '2px solid #f6decd',
      }}
    >
      <div
        style={{
          color: '#f6decd',
          fontSize: '12px',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        DEMO MODE 🎬
      </div>

      <button
        onClick={() => setIsScrolling(!isScrolling)}
        style={{
          background: isScrolling ? '#f6decd' : 'rgba(246, 222, 205, 0.3)',
          color: isScrolling ? '#3b2a1e' : '#f6decd',
          border: '1px solid #f6decd',
          padding: '10px 15px',
          borderRadius: '8px',
          fontSize: '12px',
          fontWeight: 'bold',
          cursor: 'pointer',
          transition: 'all 0.3s',
        }}
        onMouseEnter={(e) => {
          e.target.style.background = '#f6decd';
          e.target.style.color = '#3b2a1e';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = isScrolling ? '#f6decd' : 'rgba(246, 222, 205, 0.3)';
          e.target.style.color = isScrolling ? '#3b2a1e' : '#f6decd';
        }}
      >
        {isScrolling ? '⏸ PAUSE' : '▶ SCROLL'}
      </button>

      <button
        onClick={() => window.scrollTo(0, 0)}
        style={{
          background: 'rgba(246, 222, 205, 0.2)',
          color: '#f6decd',
          border: '1px solid #f6decd',
          padding: '10px 15px',
          borderRadius: '8px',
          fontSize: '12px',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => (e.target.style.background = 'rgba(246, 222, 205, 0.3)')}
        onMouseLeave={(e) => (e.target.style.background = 'rgba(246, 222, 205, 0.2)')}
      >
        ⬆ TOP
      </button>

      <div
        style={{
          color: 'rgba(255, 255, 255, 0.6)',
          fontSize: '9px',
          textAlign: 'center',
          marginTop: '5px',
        }}
      >
        Recording tip: Use OBS or<br />
        iPhone Screen Recording
      </div>
    </div>
  );
}
