export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Lako House",
    htmlAttrs: {
      lang: "ar",
      dir: "rtl",
      class: "arabic-dir",
    },
    bodyAttrs: {
      class: "light-layout",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      // { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "icon", type: "image/x-icon", href: "/img/favicon.ico" },
      { rel: "stylesheet", type: "image/x-icon", href: "/img/favicon.ico" },
      // {
      //   rel: "stylesheet",
      //   integrity:
      //     "sha384-gXt9imSW0VcJVHezoNQsP+TNrjYXoGcrqBZJpry9zJt8PCQjobwmhMGaDHTASo9N",
      //   crossorigin: "anonymous",
      //   href: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.rtl.min.css",
      // },
      // {
      //   rel: "stylesheet",
      //   href: "https://unpkg.com/light-icons/dist/light-icon.css",
      // },
    ],

    script: [],
  },

  pageTransition: {
    name: "my-page",
    mode: "out-in",
    beforeEnter(el) {
      // console.warn('Before enter...');
    },
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~/assets/css/bootstrap.css",
    "~/assets/css/bootstrap.rtl.min.css",
    "~/@core/scss/core.scss",
    "@fortawesome/fontawesome-svg-core/styles.css",
    "~/assets/scss/rtl.scss",
    "~/assets/scss/style.scss",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/auth.js", mode: "client" },
    { src: "~/plugins/settings/lottie-player.js", mode: "client" },
    "~/plugins/settings/fontawesome.js",
    "~/plugins/settings/light-vue.js",
    "~/plugins/settings/vee-validate.js",
    "~/plugins/settings/layout.js",
    "~/plugins/mixins/categories/index.js",
    "~/plugins/mixins/checkout/index.js",
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/moment", "@nuxtjs/pwa"],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/proxy",
    "@nuxtjs/axios",
    "@nuxtjs/auth-next",
    "@nuxtjs/i18n",
    "nuxt-vue-select",
    "nuxt-route-meta",
    "cookie-universal-nuxt",
    [
      "vue-toastification/nuxt",
      {
        timeout: 3000,
        draggable: false,
        position: "top-center",
      },
    ],
  ],

  router: {
    // extendRoutes(routes, resolve) {
    //   routes.forEach((r) => (r.props = true));
    //   routes.forEach((r) => (r.mode = "abstract"));
    //   console.warn("routes", routes);
    // },
    props: true,
  },

  i18n: {
    lazy: false,
    langDir: "locales/",
    // strategy: 'no_prefix',   use it when tou won’t prefix in route
    locales: [
      { code: "en", iso: "en-US", file: "en", dir: "ltr" },
      { code: "ar", iso: "ar-EG", file: "ar", dir: "rtl" },
    ],
    defaultLocale: "ar",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected_lako_house_site",
      redirectOn: "root",
    },
  },

  auth: {
    localStorage: false,
    strategies: {
      local: {
        token: {
          prefix: "_token_lako_house_site.",
          property: "token",
        },
        user: {
          property: "data.data",
        },
        endpoints: {
          login: { url: `/users/login`, method: "post" },
          user: { url: `/users/me`, method: "get" },
          // user: false,
        },
      },
    },
    redirect: {
      login: "/",
      logout: "/login",
      callback: "/",
      home: "/",
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    // proxy: true,
    // baseURL: "http://127.0.0.1:5678/api/v1",
    baseURL: "https://lakohouseapi.beingmomen.fun/api/v1",
  },

  proxy: { "/api/": "https://179.61.246.119:5678/api/v1" },
  // proxy: {
  //   "/api/": {
  //     target: "http://127.0.0.1:1234/api/v1/api",
  //     pathRewrite: { "^/api/": "" },
  //   },
  //   // proxy: true,
  //   // credentials: true,
  //   // prefix: '/api/',
  // },

  pwa: {
    icon: {
      fileName: "lako.svg",
      source: "/img/lako.svg",
    },
    manifest: {
      name: "Lako House",
      short_name: "Lako House",
      lang: "en",
      display: "standalone",
    },
  },

  generate: {
    fallback: true,
  },

  // loading: {
  //     color: ' #7367f0',
  //     height: '4px'
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  publicRuntimeConfig: {
    SITE_TITLE: "Lako House",
    i18nKey: "i18n_redirected_lako_house_site",
    // NODE_URL_images: "http://127.0.0.1:5678/images",
    NODE_URL_images: "https://lakohouseapi.beingmomen.fun/images",
  },
};
// http://179.61.246.119:1234/api/v1/players
