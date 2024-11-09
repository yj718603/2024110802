import i18n from "./plugins/i18n.js"

export default {
  buildDir: 'nuxtout',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'translator-app',
    htmlAttrs: {
      lang: 'en',
      "data-theme": "light"
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ],
    script: [
      {src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js'},
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "element-ui/lib/theme-chalk/index.css",
    "vue2-editor/dist/vue2-editor.css",
    "animate.css/animate.min.css",
    "~/assets/iconfont/iconfont.css",
    "~/assets/main.css"
  ],
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    //ElementUI插件
    {src: "~/plugins/ElementUI"},
    {src: "~/plugins/Filters", ssr: false},
    {src: "~/plugins/axios", ssr: false},
    {src: '~/plugins/vue-toasted', ssr: false},
    {src: '~/plugins/vue-shortkey', ssr: false},
    {src: '~/plugins/vue2-editor', ssr: false}
  ],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],
  // Modules: https://go.nuxtjs.dev/config-modules
  ssr: true,
  target: 'server',
  modules: [
    '@nuxtjs/tailwindcss',
    'cookie-universal-nuxt',
    "@nuxtjs/axios",
    ["@nuxtjs/i18n", i18n],
    "vue2-editor/nuxt"
  ],
  axios: {
    baseURL: 'https://alligator.azurewebsites.net',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    //防止elementui打包多次
    transpile: [/^element-ui/]
  }
}
