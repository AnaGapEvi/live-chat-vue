import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import auth from '../components/auth/auth'
import room from '../components/room/room'



Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    ...auth,
    ...room
  ]
})
