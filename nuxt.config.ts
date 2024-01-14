export default defineNuxtConfig({
  devtools: { enabled:false },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app:{
    head:{
      script:[
        {
          async:true,
          src:"https://www.googletagmanager.com/gtag/js?id=G-BZ9R74CT2Y",
        },
        {
          innerHTML:`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-BZ9R74CT2Y');
          `
        }
      ],
      link:[
        {
            rel:"stylesheet",
            href:"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
            integrity:"sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==",
            crossorigin:"anonymous",
            referrerpolicy:"no-referrer"
        }
      ],
    }
  }
})
