import Vue from 'vue'
import Router from 'vue-router'
import App from '../App.vue'

Vue.use(Router)

const home = () => import(/* webpackChunkName: "./pages/home" */ '../pages/home.vue')
const child = () => import(/* webpackChunkName: "./pages/child" */ '../pages/child.vue')

const routes = [
  {
    path: '/',
    redirect: 'home',
    component: App
  },
  {
    path: '/home',
    component: home
  },
  {
    path: '/child',
    component: child
  }
]

export default new Router({
  routes
})
