import Register from './NewUser'
import Login from "./Login";
import ForgotPassword from "./forgotPassword";
import HomeUser from './HomeUser'


export default [
  { path: '/register', name:'Register', component: Register },
  { path: '/login', name:'Login', component: Login },
  { path: '/forgot-password', name:'ForgotPassword', component: ForgotPassword },
  { path: '/home-page/:id', name:'HomeUser', component: HomeUser },
]
