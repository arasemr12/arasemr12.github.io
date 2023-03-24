// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app:{
        head:{
            title: 'arasemr12',
        }
    },
    modules:[
        "@nuxtjs/tailwindcss"
    ],
    css:[
        "assets/css/main.css"
    ],
    tailwindcss:{
        viewer:false,
        configPath: 'tailwind.config.js'
    },
    nitro:{
        plugins:[
            "~/server/index.js"
        ]
    },
})
