export default defineNuxtPlugin((app) => {
  app.$router.afterEach((to) => {
    try {
      window._hmt = window._hmt || []
      window._hmt.push(['_trackPageview', to.fullPath])
    } catch {
      // err
    }
  })
})
