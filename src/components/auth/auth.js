import Register from './NewUser'
import ForgotPassword from "./forgotPassword";
import HomeUser from './HomeUser'


export default [
  { path: '/register', name:'Register', component: Register },
  { path: '/forgot-password', name:'ForgotPassword', component: ForgotPassword },
  { path: '/home-page/:id', name:'HomeUser', component: HomeUser },
]

