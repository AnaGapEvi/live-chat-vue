import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import auth from '../components/auth/auth'
import Room from '../components/room/Room'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    { path: '/room/:id',
      name:'Room',
      component: Room
    },
    ...auth,
  ]
})
