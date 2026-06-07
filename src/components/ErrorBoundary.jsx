import { Component } from 'react';

/**
 * Error Boundary Component
 * Catches errors in child components and displays fallback UI
 * Prevents entire app crash if a component fails
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '400px',
            padding: '40px 20px',
            textAlign: 'center',
            color: 'white',
          }}
        >
          <div
            style={{
              background: 'rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(25px)',
              padding: '40px',
              borderRadius: '30px',
              maxWidth: '500px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <h2 style={{ fontFamily: 'serif', fontSize: '2rem', marginTop: 0 }}>
              Oups ! Une erreur est survenue
            </h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '20px' }}>
              Nous nous excusons. Veuillez rafraîchir la page ou réessayer plus tard.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                background: '#f6decd',
                color: '#3b2a1e',
                padding: '12px 30px',
                borderRadius: '50px',
                border: 'none',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer',
                letterSpacing: '2px',
              }}
            >
              RAFRAÎCHIR LA PAGE
            </button>
          </div>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details style={{ marginTop: '30px', color: '#ff6b6b' }}>
              <summary style={{ cursor: 'pointer' }}>Error Details (Dev Only)</summary>
              <pre style={{ textAlign: 'left', fontSize: '12px' }}>
                {this.state.error.toString()}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
