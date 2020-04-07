import Vue from 'vue'
import VueRouter from 'vue-router'

// Views importer
const views = name => () => import(`@/views/${name}.vue`)

Vue.use(VueRouter)

const routes = [
   {
      path: '/',
      name: 'Dashboard',
      component: views('Dashboard')
   },
   {
      path: '/join',
      name: 'Join',
      component: views('Join')
   }
]

const router = new VueRouter({
   mode: 'history',
   base: process.env.BASE_URL,
   routes
})

export default router
