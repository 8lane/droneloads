const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./pages/**/*.jsx', './components/**/*.jsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        coolGray: {
          900: '#0A0B11'
        }
      }
    },
    container: {
      center: true
    }
  },
  variants: {
    zIndex: ['responsive', 'hover'],
    extend: {},
  },
  plugins: [],
}
