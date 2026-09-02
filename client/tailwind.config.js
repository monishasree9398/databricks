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
        dark: {
          bg: '#F8FAFC',
          surface: '#FFFFFF',
          elevated: '#F1F5F9',
          card: '#FFFFFF',
          border: 'rgba(226, 232, 240, 0.9)',
          subtle: 'rgba(241, 245, 249, 0.8)',
          text: '#0F172A',
          muted: '#64748B',
          dim: '#94A3B8',
        },
        brand: {
          orange: '#FF5500',
          orangeLight: '#FF6B1A',
          orangeHover: '#EA4C00',
          orangeGlow: 'rgba(255, 85, 0, 0.08)',
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
        'glow-sm': '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
        'glow-md': '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        'glow-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.05)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 4px 12px 0 rgba(0, 0, 0, 0.06)',
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
