const defaultTheme = require('tailwindcss/defaultTheme')
const { getColors } = require('theme-colors')


module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        mono: ['JetBrains Mono', 'DM Mono', ...defaultTheme.fontFamily.mono]
      },
      colors: {
        primary: getColors('#0070f3'),
      },
      maxHeight: {
        '(screen-16)': 'calc(100vh - 4rem)'
      },
      inset: {
        16: '4rem'
      },
      transitionProperty: {
        padding: 'padding'
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.primary.500')
            },
            pre: {

            },
            code: {

            },
          }
        }
      }),

    },

  },
  variants: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
