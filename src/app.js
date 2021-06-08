import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'
import { sync } from 'vuex-router-sync'

import 'normalize.css/normalize.css'

Vue.mixin({
  beforeRouteUpdate(to, from, next){
    const { asyncData } = this.$options
    if(asyncData){
      asyncData({
        store: this.$store,
        route: to
      }).then(next).catch(next)
    }else{
      next()
    }
  }
})

export function createApp(){
  const router = createRouter()
  const store = createStore()

  sync(store, router)

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  return { app, router, store }
}
