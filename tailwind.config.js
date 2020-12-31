const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./pages/**/*.jsx', './components/**/*.jsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        green: {
          default: '#048B89',
          light: '#04A09D'
        },
        coolGray: {
          ...colors.coolGray,
          900: '#0A0B11'
        }
      }
    },
    fontFamily: {
      sans: ['Raleway', 'sans-serif'],
    },
    fontWeight: {
      normal: 200,
      bold: 200,
    },
    container: {
      center: true
    }
  },
  variants: {
    extend: {},
    zIndex: ['responsive', 'hover'],
    animation: ['responsive', 'motion-safe', 'motion-reduce'],
  },
  plugins: [],
}
