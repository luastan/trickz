import {beforeInsert, beforeParse, highlighter} from './contentEnhancements/content-tricks-extensions';
import tricksConfig from './tricks.config.js';

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Tricks',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // Tailwind
    '~/assets/css/tailwind.css',

    // Global CSS
    '~/assets/css/main.css',

    // Transition animations
    '~/assets/css/transitions.css',

    // Fonts
    '~/assets/fonts/inter/inter.css',

    // Snippets css
    '~/assets/css/code-snippets-theme.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [

    // Plugin to save Vuex store state into the browser's localStorage
    '@/plugins/storage',

    // Plugin to highlight current section while scrolling through a page
    '@/plugins/vue-scrollactive',

    // Initializes the app (Loads categories and settings to the store)
    '@/plugins/init',

  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [

    '@nuxt/postcss8',

    '@nuxtjs/color-mode',

    ['nuxt-storm', {
      nested: true,
      alias: true,
    }],
  ],


  // Enables dark mode
  colorMode: {
    classSuffix: ''
  },


  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',

    // https://go.nuxtjs.dev/content
    '@nuxt/content',


    '~/modules/tricks',
  ],

  tricks: {
    ...tricksConfig
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
      theme_color: 'rgb(17 24 39)'
    },
    icon: {
      source: '~/static/icon.png'
    }
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {
    liveEdit: true,  // No worries. It will only work in development
    editor: '~/components/tricks/ContentEditor.vue',
    markdown: {
      prism: {
        theme: '~/assets/css/code-snippets-theme.css'
      },
      highlighter
    },
  },

  serverMiddleware: [
    '~/server-middleware/content-images.js',
  ],

  hooks: {
    'content:file:beforeParse': beforeParse,
    'content:file:beforeInsert': beforeInsert(process.env['GH_TKN']),
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  }
}
