export default {
  head: {
    title: 'arasemr12',
    htmlAttrs: {
      lang: 'en',
      prefix: "og: https://ogp.me/ns#"
    },
    meta: [
      { property: 'og:title', content: 'arasemr12' },
      { property: 'og:description', content: "Hello, I'm arasemr12, I'm interested in coding." },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://arasemr12.tk/' },
      { property: 'og:image', content: 'https://arasemr12.tk/arasemr12.png' },
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Arasemr12 personal website.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css', integrity: "sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==", crossorigin: "anonymous", referrerpolicy: "no-referrer"}
    ]
  },

  css: [
    '@/assets/css/main.css',
  ],

  plugins: [
  ],

  components: true,

  buildModules: [
    '@nuxt/postcss8'
  ],

  modules: [

  ],

  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },

  serverMiddleware: [
    {path:'/api/',handler:"~/api/index.js"},
  ]
}
