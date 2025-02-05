/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'button': '0px 1px 5px rgba(0, 0, 0, 0.05)',
        'elemen': '-2px -2px 8px rgba(0, 0, 0, 0.08), 2px 2px 8px rgba(0, 0, 0, 0.08)',
        'fly-elemen': '0px 2px 10px rgba(0, 0, 0, 0.2)',
        'navbar': '0px 2px 8px rgba(0, 0, 0, 0.03)',
        'notif': '0px 2px 20px rgba(0, 0, 0, 0.2)',
      },
      height: {
        'navbar-default': '0px',
        'navbar-md': '100px',
      },
      padding: {
        'navbar-default': '0px',
        'navbar-md': '100px',
      },
      colors: {
        primary: {
          100: '#EAFAEA',
          200: '#CAE0BC',
          300: '#AEE08E',
          400: '#8FB874',
          500: '#6E8E59',
          600: '#4D643E',
        },
        secondary: {
          100: '#F6E2E6',
          200: '#EBA8B9',
          300: '#D55979',
          400: '#A90A33',
          500: '#780C28',
          600: '#4D081A',
        },
        neutral: {
          100: '#F0F0F0',
          200: '#D9D9D9',
          300: '#BFBFBF',
          400: '#8C8C8C',
          500: '#595959',
          600: '#1F1F1F',
        },
        background: '#FAFAFA',
        system: {
          success: '#00D589',
          error: '#F83B3F',
          warning: '#E7B100',
          highlight: '#6D99FF',
          tautan: '#6D99FF',
        }
      },
      animation: {
        'grow': 'grow 1.75s ease-in-out infinite',
        'navbar-hide': 'hide 0.3s ease-in-out forwards',
      },
      keyframes: {
        'grow': {
          '0%': { transform: 'scale(0.3)' },
          '20%': { transform: 'scale(1)' },
          '40%': { transform: 'scale(0.3)' },
          '100%': { transform: 'scale(0.3)' },
        },
        'hide': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}