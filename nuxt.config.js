import {data} from "autoprefixer";

const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');


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


  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    },
    icon: {
      source: '~/static/icon.png'
    }
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-one-light.css'
      }
    }
  },

  serverMiddleware: [
    '~/server-middleware/redirect-example.js',
  ],

  hooks: {
    'content:file:beforeParse': (file) => {
      if (file.extension !== '.md') {
        return
      }
      // const window = new JSDOM('').window;
      // const DOMPurify = createDOMPurify(window);
      // file.data = DOMPurify.sanitize(file.data, {
      //   ADD_TAGS: [
      //     'tricks-paste-markdown',
      //   ],
      // });
      file.data = file.data.replace(/\[ ] (.*)/g, '<smart-check variable="test" :value="1===2">$1</smart-check>');
      file.data = file.data.replace(/(\[x]|\[X]) (.*)/g, '<smart-check variable="test" :value="true">$2</smart-check>');
    },
    "content:file:beforeInsert": (document, database) => {
      // console.log(JSON.stringify(document));
    },
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
