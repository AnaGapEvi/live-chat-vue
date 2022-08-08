<template>
  <div class="homepage">
    <div style="width: 30%">
      <all-users/>
    </div>
    <div style="width: 50%">
      <b-list-group style="width: 50%; text-align: right" >
        <b-list-group-item class="d-flex  align-items-center" style="margin-bottom: 15px; box-shadow: 6px 4px #00A4BD">
          <router-link  style="text-decoration: none" :to="{ name: 'Room', params:{ id: 1}}"> <p>Room 1</p> </router-link>
        </b-list-group-item>
        <b-list-group-item class="d-flex  align-items-center" style="margin-bottom: 15px; box-shadow: 6px 4px #00A4BD">
          <router-link  style="text-decoration: none" :to="{ name: 'Room', params:{ id: 2}}"><p>Room 2</p> </router-link>
        </b-list-group-item>
        <b-list-group-item class="d-flex  align-items-center" style="margin-bottom: 15px; box-shadow: 6px 4px #00A4BD">
          <router-link  style="text-decoration: none" :to="{ name: 'Room', params:{ id: 3}}"><p>Room 3</p> </router-link>
        </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>

<script>
import allUsers from "./custom/AllUsers";
export default {
  name: 'Home',
  components: {allUsers},

  data () {
    return {
      rooms:[],
      error:''
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
    }
  }
}
</script>

<style scoped>
.homepage{
  background-image: url("https://www.dentons.com/-/media/images/website/background-images/regions/asia-pacific/asia_pacific_background_04.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
  display: flex;
  justify-content: space-around;

  align-items: center;
  padding-top: 50px
}
/*.room {*/
/*  margin-top: 300px;*/
/*  margin-right: 50px;*/
/*  background-color: rgba(100, 149, 237, 0.96);*/
/*  width: 200px;*/
/*  height: 200px;*/
/*  border-radius: 30px;*/
/*  display: flex;*/
/*  align-items: center;*/
/*  justify-content: center;*/
/*  font-size: 30px;*/
/*}*/
a{
  text-decoration: none;

}
</style>
