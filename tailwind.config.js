/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          950: '#060608',
          900: '#0b0a10',
          850: '#100e17',
          800: '#171420',
          700: '#231f30',
        },
        burgundy: {
          950: '#19030a',
          900: '#2b0713',
          800: '#3e0c1d',
          700: '#541228',
          600: '#751d3b',
        },
        gold: {
          100: '#fcf8ee',
          200: '#f8f0dc',
          300: '#efdfb6',
          400: '#e3ca89',
          500: '#d4af37',
          600: '#b89224',
          700: '#94721a',
        },
        cream: {
          50: '#faf8f5',
          100: '#f5f0e8',
          200: '#ebe2d3',
          300: '#ded1bb',
        },
        roseGold: {
          100: '#fdf3f2',
          200: '#fae4e1',
          300: '#f4cbc5',
          400: '#e8a598',
          500: '#d97d8b',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['"Montserrat"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        handwriting: ['"Great Vibes"', '"Dancing Script"', 'cursive'],
      },
      animation: {
        'float-slow': 'float 7s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'flicker': 'flicker 1.5s infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.9', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        flicker: {
          '0%': { opacity: '0.85', transform: 'scale(0.98)' },
          '100%': { opacity: '1', transform: 'scale(1.03)' },
        }
      }
    },
  },
  plugins: [],
}
