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
        rose: getColors('#ff4473'),
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
            '--tw-prose-links': theme('colors.primary.500'),
            '--tw-prose-bold': theme('colors.gray.900'),
            strong: {
              fontWeight: 700,
            },
            // '--tw-prose-code': theme('colors.primary.500'),
            // '--tw-prose-code': 'hsl(28, 99%, 45%)',
            '--tw-prose-code': 'hsl(338, 78%, 48%)',


            '--tw-prose-invert-body': theme('colors.neutral.300'),
            '--tw-prose-invert-lead': theme('colors.neutral.400'),
            '--tw-prose-invert-links': theme('colors.rose.500'),

            '--tw-prose-invert-headings': theme('colors.neutral.200'),
            '--tw-prose-invert-bold': theme('colors.white'),
            '--tw-prose-invert-code': theme('colors.rose.500'),
            '--tw-prose-invert-counters': theme('colors.neutral.400'),
            '--tw-prose-invert-bullets': theme('colors.neutral.600'),
            '--tw-prose-invert-hr': theme('colors.neutral.700'),
            '--tw-prose-invert-quotes': theme('colors.neutral.100'),
            '--tw-prose-invert-quote-borders': theme('colors.neutral.700'),
            '--tw-prose-invert-captions': theme('colors.neutral.400'),
            '--tw-prose-invert-pre-code': theme('colors.neutral.300'),
            '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-invert-th-borders': theme('colors.neutral.600'),
            '--tw-prose-invert-td-borders': theme('colors.neutral.700'),
          },
        },
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
