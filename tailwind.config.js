const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./pages/**/*.js', './components/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        coolGray: {
          900: '#0A0B11'
        }
      }
    },
    spacing: {
      '0': '0px',
      '1': '8px',
      '2': '12px',
      '3': '16px',
      '4': '24px',
      '5': '32px',
      '6': '48px',
    },
    container: {
      center: true
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
