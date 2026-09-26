/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brown: {
          50: '#fdfaf6',
          100: '#f5ebe0',
          200: '#d7ccc8',
          300: '#bcaaa4',
          400: '#8d6e63',
          500: '#6d4c41',
          600: '#5d4037',
          700: '#4e342e',
          800: '#3e2723',
          900: '#2c1b13',
        },
      },
        fontFamily: {
          sans: ['Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
        },
      },
    },
  plugins: [],
}
