<template>
  <div v-if="email !== ''" style="padding-top: 20px; width: 100%">
    <b-navbar size="lg" style="position: fixed;z-index: 1; width: 100%; color: white" type="dark" variant="dark">
      <b-navbar-nav style="width: 100%">
        <div style="display: flex; justify-content: space-between; align-items: center;width: 100% ">
          <b-nav-item style="margin-top: 10px" href="/dashboard"><h2>LIVE CHAT</h2></b-nav-item>
          <div  class="roomRoute" style=" display: flex; justify-content: space-evenly" v-for="room in rooms">
              <router-link :to="{path: '/room/'+room.id, params:{id: room.id}}">{{room.name}}</router-link>
          </div>
          <div>
            <b-nav-item >
              <div style="color: white"  right>
                <router-link  to="/home-page/1"  style="margin-right: 15px">Messages</router-link>
                <em style="color: white">{{email}}</em>
                <button @click="logout()" class="out-btn" >
                  Sign out
                </button>
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
      rooms:[]
    }
  },
  mounted() {
    if (localStorage.getItem('access_token')){
      this.getAuth()
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
        this.email=''
        this.$router.push({path: "/"});
      }).catch(error => {
        return error
      })
    },
    getAuth(){
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
.out-btn{
  background: none;
  padding: 5px;
  width: 150px;
  border: none;
  color: white;
}
</style>
