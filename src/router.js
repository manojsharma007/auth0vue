import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home.vue'
import Callback from './views/callback.vue'
import logout from './views/logout.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
        path: '/logout',
        name: 'logout',
        component: logout
      },
    {
      path: '/callback',
      name: 'callback',
      component: Callback
    }
  ]
})

// very basic "setup" of a global guard
router.beforeEach((to, from, next) => {
  if(to.name == 'callback') { // check if "to"-route is "callback" and allow access
    next()
  } else if (router.app.$auth.isAuthenticated()) { // if authenticated allow access
    next()
  } else { // trigger auth0 login
   router.app.$auth.login()
  }
})

export default router