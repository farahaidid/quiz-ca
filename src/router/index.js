import Vue from 'vue'
import VueRouter from 'vue-router'

// Views importer
const views = name => () => import(`@/views/${name}.vue`)
const layouts = name => () => import(`@/layouts/${name}.vue`)

Vue.use(VueRouter)

const routes = [
   {
      path: '/',
      component: views('Home'),
      children: [
         {
            path: '',
            name: 'Dashboard',
            component: views("Home/Dashboard")
         },
         {
            path: '/rooms/:name',
            component: views("Home/Room")
         },
         {
            path: '/manage-room/:name',
            component: views("ManageRoom")
         }
      ]
   },
   {
      path: '/',
      component: layouts("AuthLayout"),
      children: [
         {
            path: 'join',
            name: 'Join',
            component: views('Join')
         },
         {
            path: 'create',
            name: 'CreateRoom',
            component: views('CreateRoom')
         },
         {
            path: 'login',
            name: 'Login',
            component: views('Login')
         },
         {
            path: 'signup',
            name: 'Signup',
            component: views('SignUp')
         }
      ]
   }
]

const router = new VueRouter({
   mode: 'history',
   base: process.env.BASE_URL,
   routes
})

export default router
