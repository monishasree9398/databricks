/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        neu: {
          bg: '#EEF2F6',
          surface: '#EEF2F6',
          dark: '#CAD4E0',
          light: '#FFFFFF',
          text: '#1E293B',
          muted: '#64748B',
          dim: '#94A3B8',
        },
        dark: {
          bg: '#EEF2F6',
          surface: '#EEF2F6',
          elevated: '#E2E8F0',
          card: '#EEF2F6',
          border: 'rgba(203, 213, 225, 0.6)',
          subtle: 'rgba(226, 232, 240, 0.8)',
          text: '#0F172A',
          muted: '#64748B',
          dim: '#94A3B8',
        },
        brand: {
          orange: '#FF5500',
          orangeLight: '#FF6B1A',
          orangeHover: '#EA4C00',
          orangeGlow: 'rgba(255, 85, 0, 0.15)',
          orangeBorder: 'rgba(255, 85, 0, 0.3)',
        },
        accent: {
          emerald: '#059669',
          amber: '#D97706',
          rose: '#E11D48',
          cyan: '#0284C7',
          indigo: '#4F46E5',
        }
      },
      boxShadow: {
        // Neumorphic Soft UI Shadows
        'neu-flat': '6px 6px 14px #CAD4E0, -6px -6px 14px #FFFFFF',
        'neu-flat-hover': '8px 8px 18px #BFCBD8, -8px -8px 18px #FFFFFF',
        'neu-sm': '3px 3px 7px #CAD4E0, -3px -3px 7px #FFFFFF',
        'neu-lg': '10px 10px 24px #CAD4E0, -10px -10px 24px #FFFFFF',
        'neu-pressed': 'inset 3px 3px 6px #CAD4E0, inset -3px -3px 6px #FFFFFF',
        'neu-pressed-deep': 'inset 4px 4px 8px #BFCBD8, inset -4px -4px 8px #FFFFFF',
        'neu-orange': '4px 4px 12px rgba(255, 85, 0, 0.3), -4px -4px 10px #FFFFFF',
        'neu-orange-pressed': 'inset 3px 3px 6px #CC4400, inset -3px -3px 6px #FF7733',
        'neu-convex': 'linear-gradient(145deg, #F8FAFC, #E2E8F0)',
        'neu-concave': 'linear-gradient(145deg, #E2E8F0, #F8FAFC)',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Fira Code', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};
