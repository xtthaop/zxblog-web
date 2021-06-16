import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter(){
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/home.vue'),
      },
      {
        path: '/note/:id',
        name: 'note',
        component: () => import('@/views/note/index'),
      }
    ],
  })
}
