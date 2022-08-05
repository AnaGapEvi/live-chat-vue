import Vue from 'vue'

import NavBar from './NavBar'
import Rooms from "./Rooms";
import ChatUser from "./Chat";
import OneUser from "./User";
import AllUser from "./AllUsers";

Vue.component('nav-bar', NavBar)
Vue.component('RoomOne', Rooms);
Vue.component('ChatUser', ChatUser);
Vue.component('OneUser', OneUser);
Vue.component('AllUser', AllUser);
