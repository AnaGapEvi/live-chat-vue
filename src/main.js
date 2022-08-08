import Vue from 'vue'
import App from './App'
import router from './router'

require('./plugins')
require('./components/custom/custom')

import Echo from "laravel-echo";

window.Pusher = require("pusher-js");

// window.Echo = new Echo({
//   broadcaster: 'pusher',
//   key: "local",
//   cluster:"mt1",
//   forceTLS: true,
//   encrypted: true,
//   logToConsole: true,
//   // wsHost: window.location.hostname,
//   wsHost: "https://intense-forest-89445.herokuapp.com:6001" ,
//   // wsPort: 6001,
//   // wssPort: 6001,
//   enabledTransports: ['ws', 'wss']
// });

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: "local",
  cluster:"mt1",
  forceTLS: false,
  wsHost: window.location.hostname,
  wsPort: 6001,
});

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
