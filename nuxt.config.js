require("dotenv").config();
process.env.BOOTSTRAP_VUE_NO_WARN = true;
export default {
  env: {
    apiUrl: process.env.API_URL,
    appUrl: process.env.CLIENT_URL,
    appName: process.env.APP_NAME || "Alboukam",
    appLocale: process.env.APP_LOCALE
  },
  head: {
    title: 'Alboukam',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'JHFJ HJGJKGKJ' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
    {
      src: "~assets/sass/app.scss",
      lang: "scss"
    }
  ],

  plugins: [
  ],

  components: true,

  buildModules: [
  ],

  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    "@nuxtjs/router",
    "@nuxtjs/auth",
    "@nuxtjs/dotenv",

  ],

  axios: {
    baseURL: process.env.API_URL,
    retry: {
      retries: 3
    },
    debug: false,
    headers: {
      common: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      delete: {},
      get: {},
      post: {},
      put: {}
    },
    progress: false,
    withCredentials: false
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "/login",
            method: "post",
            propertyName: "token"
          },
          logout: {
            url: "/logout",
            method: "post"
          },
          user: {
            url: "/user",
            method: "get",
            propertyName: false
          }
        },
        // tokenRequired: true,
        tokenType: "Bearer",
        token_key: "token",
        // globalToken: true,
        autoFetchUser: true
      }
      /* 'laravel.passport': {
        url: '...',
        client_id: '...',
        client_secret: '...'
      }, */
    }
  },

  build: {
  },
  bootstrapVue: {
    bootstrapCSS: false, // Or `css: false`
    icons: true,
    enableShadows: false,
    bootstrapVueCSS: false // Or `bvCSS: false`
  },
}
