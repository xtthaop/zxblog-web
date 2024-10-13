// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: ['@nuxt/eslint', '@nuxt/ui', 'dayjs-nuxt'],
  app: {
    head: {
      script: [{ src: 'https://hm.baidu.com/hm.js?944690b78340a043bbd379f71539745d' }],
    },
  },
  plugins: ['~/plugins/baidu.js'],
  css: [
    'normalize.css/normalize.css',
    'animate.css',
    '~/assets/styles/main.scss',
    '~/assets/styles/md.scss',
    '~/assets/styles/katex.min.css',
  ],
  nitro: {
    routeRules: {
      '/restful/**': { proxy: process.env.ROUTE_PROXY },
    },
  },
})
