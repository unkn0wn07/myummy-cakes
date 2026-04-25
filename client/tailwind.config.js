/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        rose: {
          50: '#fdf2ee',
          100: '#fae5d9',
          200: '#f5cab3',
          300: '#eea88a',
          400: '#e68460',
          500: '#E8C4B8',
          DEFAULT: '#E8C4B8',
          600: '#d4957e',
          700: '#b87060',
          800: '#934f43',
          900: '#6e3530',
        },
        mocha: {
          50: '#f7f0ee',
          100: '#e8d5cc',
          200: '#d0aa99',
          300: '#b07f6a',
          400: '#7a4f3a',
          500: '#3B1F14',
          DEFAULT: '#3B1F14',
          600: '#321a10',
          700: '#27130c',
          800: '#1c0e08',
          900: '#120904',
        },
        cream: {
          50: '#ffffff',
          100: '#fefcf9',
          200: '#fdf8f3',
          300: '#fdf6ee',
          DEFAULT: '#FDF6EE',
          400: '#f8edd9',
          500: '#f0dfc0',
          600: '#e5cc9d',
        },
        gold: {
          50: '#fdf8ec',
          100: '#f9efc7',
          200: '#f3dd8f',
          300: '#ecc459',
          400: '#C9A84C',
          DEFAULT: '#C9A84C',
          500: '#b0902f',
          600: '#8d7020',
          700: '#66501a',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        accent: ['"Great Vibes"', 'cursive'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #FDF6EE 0%, #f5ead9 50%, #eddcc6 100%)',
        'mocha-gradient': 'linear-gradient(135deg, #3B1F14 0%, #5a3020 100%)',
        'gold-gradient': 'linear-gradient(135deg, #C9A84C 0%, #e8c56a 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'card': '0 4px 20px rgba(59, 31, 20, 0.08)',
        'card-hover': '0 12px 40px rgba(59, 31, 20, 0.15)',
        'gold': '0 4px 20px rgba(201, 168, 76, 0.3)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
