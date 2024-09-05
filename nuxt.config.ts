// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: ['@nuxt/eslint', '@nuxt/ui'],
  css: ['normalize.css/normalize.css', '~/assets/styles/main.scss'],
  colorMode: {
    preference: 'light',
  },
})
