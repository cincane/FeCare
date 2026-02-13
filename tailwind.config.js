/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B6B',
          50: '#FFF5F5',
          100: '#FFE3E3',
          200: '#FFC9C9',
          300: '#FFA8A8',
          400: '#FF8787',
          500: '#FF6B6B',
          600: '#FA5252',
          700: '#F03E3E',
          800: '#E03131',
          900: '#C92A2A',
        },
        secondary: {
          DEFAULT: '#4ECDC4',
          50: '#F3FCFB',
          100: '#E6F7F5',
          200: '#C0EFEA',
          300: '#9AE7DF',
          400: '#74DFD4',
          500: '#4ECDC4',
          600: '#3BA89F',
          700: '#2C827B',
          800: '#1E5C57',
          900: '#0F3633',
        },
        dark: '#1A1E2C',
        body: '#4A5568',
      },
      animation: {
        'pulse': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-delay': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite 1s',
      },
    },
  },
  plugins: [],
}