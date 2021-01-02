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
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeInDown: {
          '0%': { opacity: 0, transform: 'translateY(-10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        }
      },
      animation: {
        fadeIn: 'fadeIn 300ms ease-in',
        fadeInDown: 'fadeInDown 300ms ease-in'
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
