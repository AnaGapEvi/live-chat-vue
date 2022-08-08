import Vue from 'vue'
import Router from 'vue-router'
import Room from '../components/room/Room'
import Register from '../components/auth/NewUser'
import Login from "../components/auth/Login";
import ForgotPassword from "../components/auth/forgotPassword";
import HomeUser from '../components/auth/HomeUser'




Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/register', name:'Register', component: Register },
    { path: '/', name:'Login', component: Login },
    { path: '/forgot-password', name:'ForgotPassword', component: ForgotPassword },
    { path: '/home-page/:id', name:'HomeUser', component: HomeUser },
    { path: '/room/:id',
      name:'Room',
      component: Room
    },

  ]
})
