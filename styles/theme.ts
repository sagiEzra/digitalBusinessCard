// Theme and design tokens for luxury 2025 UI/UX
// Update this file to change colors, gradients, radii, shadows, and animations globally

export const theme = {
  // Typography
  fontFamily: `'Plus Jakarta Sans', 'Inter', 'Manrope', 'Segoe UI', 'Arial', sans-serif`,
  fontWeightBold: 700,
  fontWeightRegular: 400,

  // Colors
  colors: {
    primary: '#2563EB', // blue-600
    primaryLight: '#3B82F6', // blue-500
    primaryDark: '#1E40AF', // blue-800
    accent: '#FBBF24', // yellow-400
    background: '#F8FAFC', // blue-50
    backgroundSoft: '#F1F5F9', // blue-100
    white: '#FFFFFF',
    black: '#111827',
    gray: '#E5E7EB',
    grayDark: '#64748B',
    error: '#F43F5E',
    success: '#22C55E',
    info: '#0EA5E9',
    gold: '#FFD700',
    glass: 'rgba(255,255,255,0.7)',
    glassDark: 'rgba(30,64,175,0.7)',
  },

  // Gradients
  gradients: {
    primary: 'linear-gradient(90deg, #3B82F6 0%, #2563EB 100%)',
    accent: 'linear-gradient(90deg, #FBBF24 0%, #F59E42 100%)',
    glass: 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(241,245,249,0.7) 100%)',
    hero: 'linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)',
    card: 'linear-gradient(135deg, #FFFFFF 0%, #F1F5F9 100%)',
    blueSoft: 'linear-gradient(135deg, #E0E7FF 0%, #F1F5F9 100%)',
  },

  // Shadows
  shadows: {
    card: '0 8px 32px 0 rgba(44, 120, 220, 0.18), 0 1.5px 8px 0 rgba(0,0,0,0.08)',
    cardHover: '0 12px 40px 0 rgba(44, 120, 220, 0.22), 0 2px 12px 0 rgba(0,0,0,0.10)',
    glass: '0 4px 24px 0 rgba(44, 120, 220, 0.10), 0 1.5px 8px 0 rgba(0,0,0,0.06)',
    input: '0 1.5px 8px 0 rgba(44, 120, 220, 0.06)',
    tooltip: '0 4px 16px 0 rgba(30,64,175,0.18)',
    glow: '0 0 0 4px #3B82F633',
  },

  // Radii
  radii: {
    card: '1.5rem', // 2xl
    button: '9999px', // pill
    input: '1.25rem', // xl
    modal: '2rem', // 3xl
  },

  // Animations
  animations: {
    fadeIn: 'fadeIn 0.7s cubic-bezier(0.4,0,0.2,1)',
    fadeInUp: 'fadeInUp 0.7s cubic-bezier(0.4,0,0.2,1)',
    bounce: 'bounce 1.2s infinite',
    pulse: 'pulse 1.5s infinite',
    glow: 'glow 1.5s infinite',
  },
};

// Add keyframes to your global CSS (styles/globals.css) for fadeIn, fadeInUp, bounce, pulse, glow
// Example:
// @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
// @keyframes fadeInUp { from { opacity: 0; transform: translateY(24px);} to { opacity: 1; transform: none; } }
// @keyframes bounce { ... }
// @keyframes pulse { ... }
// @keyframes glow { ... } 