<template>
  <div class="all-user" >
    <b-list-group style="width: 50%;" v-for="user in users" :key="user.id">
        <router-link  style="text-decoration: none" :to="{ name: 'HomeUser', params:{ id: user.id}}"><one-user :user="user"/></router-link>
    </b-list-group>
  </div>
</template>

<script>
import axios from "axios";
import User from "./User";
export default {
  name: "AllUsers",
  components:{User},
  data(){
    return{
      users:{}
    }
  },
  mounted() {
    this.getUser()
  },
  methods:{

    getUser(){
      axios.get('/users').then(response =>{
        this.users = response.data
      }).catch( e => {
        return e
      })
    },

  }
}
</script>

<style scoped>
.all-user{
  /*width: 400px;*/
}
</style>

