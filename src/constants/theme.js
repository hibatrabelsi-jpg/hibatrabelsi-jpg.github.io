/**
 * Design Tokens - Centralized theme constants
 * Update values here instead of scattered throughout components
 */

export const COLORS = {
  // Primary
  primary: '#f6decd',        // Beige clair (marque)
  primaryAlt: '#e5b181',     // Beige plus foncé

  // Neutral
  white: '#ffffff',
  black: '#000000',
  darkBrown: '#3b2a1e',      // Couleur texte sombre

  // Text
  textPrimary: '#ffffff',
  textSecondary: 'rgba(255, 255, 255, 0.9)',
  textTertiary: 'rgba(255, 255, 255, 0.7)',
  textDisabled: 'rgba(255, 255, 255, 0.5)',
};

export const BACKGROUNDS = {
  // Glass effects
  glass_light: 'rgba(255, 255, 255, 0.15)',
  glass_medium: 'rgba(0, 0, 0, 0.3)',
  glass_dark: 'rgba(0, 0, 0, 0.55)',

  // Overlays
  overlay_light: 'rgba(0, 0, 0, 0.05)',
  overlay_medium: 'rgba(0, 0, 0, 0.4)',
};

export const EFFECTS = {
  // Blur effects
  blur_light: 'blur(18px)',
  blur_medium: 'blur(25px)',
  blur_heavy: 'blur(40px)',

  // Saturation
  saturate: 'saturate(150%)',

  // Backdrop filters
  backdropFilter_light: 'blur(18px) saturate(150%)',
  backdropFilter_medium: 'blur(25px) saturate(160%)',
  backdropFilter_heavy: 'blur(40px) saturate(150%)',
};

export const SPACING = {
  xs: '8px',
  sm: '12px',
  md: '16px',
  lg: '20px',
  xl: '30px',
  xxl: '40px',
  xxxl: '60px',
};

export const BORDER_RADIUS = {
  sm: '15px',
  md: '30px',
  lg: '45px',
  full: '50px',
  circle: '50%',
};

export const TYPOGRAPHY = {
  // Font families
  serif: 'serif',
  sans: 'inherit',

  // Font sizes (using clamp for responsivity)
  h1: 'clamp(2.2rem, 8vw, 6.5rem)',
  h2: 'clamp(1.4rem, 5vw, 2.4rem)',
  h3: 'clamp(1.2rem, 4vw, 2rem)',
  body: '16px',
  small: '14px',
  xs: '12px',

  // Font weights
  light: 300,
  normal: 400,
  bold: 700,
};

export const SHADOWS = {
  sm: '0 4px 20px rgba(0,0,0,0.3)',
  md: '0 10px 40px rgba(0,0,0,0.3)',
  lg: '0 20px 40px rgba(0,0,0,0.3)',
  xl: '0 25px 80px rgba(0,0,0,0.6)',
};

export const TRANSITIONS = {
  fast: '0.2s ease',
  normal: '0.3s ease',
  smooth: '0.5s ease',
  slow: '0.8s ease',
};

export const Z_INDEX = {
  header: 100,
  dropdown: 200,
  modal: 500,
  chatbot: 1000,
  skipLink: 10000,
};

// Gradient presets
export const GRADIENTS = {
  sunset: 'linear-gradient(135deg, #8B4513 0%, #D2691E 50%, #CD853F 100%)',
  warm: 'linear-gradient(135deg, rgba(246, 222, 205, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%)',
  neutralDark: 'linear-gradient(135deg, #f6decd, #e5b181)',
};

// Common component styles
export const STYLES = {
  glassEffect: {
    background: BACKGROUNDS.glass_dark,
    backdropFilter: EFFECTS.backdropFilter_heavy,
    WebkitBackdropFilter: EFFECTS.backdropFilter_heavy,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.xxxl,
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: SHADOWS.xl,
    maskImage: 'radial-gradient(ellipse at center, black 85%, transparent 100%)',
    WebkitMaskImage: 'radial-gradient(ellipse at center, black 85%, transparent 100%)',
  },

  inputField: {
    width: '100%',
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.sm,
    border: '1px solid rgba(255, 255, 255, 0.2)',
    background: 'rgba(255, 255, 255, 0.1)',
    color: COLORS.textPrimary,
    fontSize: TYPOGRAPHY.body,
    outline: 'none',
    marginBottom: SPACING.lg,
  },

  button: {
    padding: `${SPACING.md} ${SPACING.lg}`,
    borderRadius: BORDER_RADIUS.full,
    border: 'none',
    fontSize: TYPOGRAPHY.xs,
    fontWeight: TYPOGRAPHY.bold,
    letterSpacing: '2px',
    cursor: 'pointer',
    transition: TRANSITIONS.normal,
  },

  focusOutline: {
    outline: `2px solid ${COLORS.primary}`,
    outlineOffset: '2px',
  },
};
