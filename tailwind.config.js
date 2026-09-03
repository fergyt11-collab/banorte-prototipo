/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        banorte: {
          red: '#EB0029',
          redDark: '#C2001F',
          dark: '#1A1A1E',
          charcoal: '#2A2A30',
          gray: '#6B6B76',
          light: '#F5F5F7',
        },
        finance: {
          green: '#00C48C',
          blue: '#3D7BFF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'ui-sans-serif', 'sans-serif'],
      },
      boxShadow: {
        card: '0 20px 40px -12px rgba(0,0,0,0.35)',
        glow: '0 0 0 1px rgba(255,255,255,0.06), 0 8px 30px rgba(0,0,0,0.25)',
      },
      animation: {
        'fade-in': 'fadeIn .35s ease-out both',
        'slide-up': 'slideUp .35s cubic-bezier(0.16, 1, 0.3, 1) both',
        'pulse-soft': 'pulseSoft 2.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: {
          from: { opacity: 0, transform: 'translateY(16px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.55 },
        },
      },
    },
  },
  plugins: [],
}
