<template>
  <div style="padding-top: 20px; width: 100%">
    <b-navbar size="lg" style="position: fixed;z-index: 1; width: 100%; color: white" type="dark" variant="dark">
      <b-navbar-nav style="width: 100%">
        <div style="display: flex; justify-content: space-between; align-items: center;width: 100% ">
          <b-nav-item href="/"><h2>LIVE CHAT</h2></b-nav-item>
          <div class="roomRoute" style=" display: flex">
            <router-link @click="window.location.reload()"  to="/room/1" >Group 1</router-link>
            <router-link  to="/room/2" >Group 2</router-link>
            <a  href="/room/3" >Group 3</a>
          </div>
          <div>
            <b-nav-item >
              <div v-if="email === ''" class="d-flex justify-content-between align-items-center">
                <b-nav-item :to="{ name: 'Register' }"> Sign up </b-nav-item>
                <b-nav-item :to="{ name: 'Login' }"> Sign in </b-nav-item>
              </div>
              <div v-if="email !== ''" style="color: white"  right>
                <router-link  to="/home-page/1"  style="margin-right: 15px">Messages</router-link>
                <em style="color: white">{{email}}</em>
                <a href="/login" @click.prevent="logout()" >
                  Sign out
                </a>
              </div>
            </b-nav-item>
          </div>
        </div>

      </b-navbar-nav>
    </b-navbar>
  </div>
</template>
<script>
import axios from "axios";
export default {

  data(){
    return{
      email:'',
    }
  },
  mounted() {
    if (localStorage.getItem('access_token')){
      this.getMy()
    }
  },
  created(){
    this.room()
  },

  methods:{
    room(){
      this.axios.get('/rooms').then(response =>{
        this.rooms = response.data
      }).catch( e => {
        return e
      })
    },
    logout(){
      axios.get('/logout').then(result => {
        localStorage.removeItem('access_token');
        this.$router.push({name: "Home"});
        window.location.reload()
      }).catch(error => {
        return error
      })
    },
    getMy(){
      return new Promise((resolve, reject) => {
        axios.get('/me')
          .then(result => {
            this.email = result.data.user.email
            resolve(true)
          }).catch(error => {
          reject(error)
        })
      })
    },
  }
}
</script>
<style scoped>
a{

  text-decoration: none;
  color: white;
  margin-left: 30px;
}
a:active{
  color: #e59898;
}

</style>
