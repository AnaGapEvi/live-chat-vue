import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
require('./plugins')
require('./components/room/room')
require('./components/custom/custom')
import Echo from "laravel-echo";

window.Pusher = require("pusher-js");

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: "local",
  cluster:"mt1",
  forceTLS: false,
  wsHost: window.location.hostname,
  wsPort: 6001,

});


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
