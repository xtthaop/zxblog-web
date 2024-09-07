// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: ['@nuxt/eslint', '@nuxt/ui', 'dayjs-nuxt'],
  css: ['normalize.css/normalize.css', '~/assets/styles/main.scss'],
  nitro: {
    routeRules: {
      '/restful/**': { proxy: 'http://zxctb.me:8888/**' },
    },
  },
})
