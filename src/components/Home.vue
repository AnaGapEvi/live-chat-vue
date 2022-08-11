<template>
  <div class="homepage">
    <div style="width: 30%">
      <all-users/>
    </div>
      <b-list-group >
          <b-list-group-item class="d-flex  align-items-center" style="margin-bottom: 15px; box-shadow: 6px 4px #00A4BD">
<!--            <router-link :to="{ name: 'Room', params:{ id: room.id}}" >{{room.name}}</router-link>-->
            <router-link to="/room/1" >Room1</router-link>
            <div v-if="room1==1"  style="width: 15px; height: 15px; border-radius: 50%; background-color: red "> </div>
          </b-list-group-item>
        </b-list-group>
    <b-list-group >
      <b-list-group-item class="d-flex  align-items-center" style="margin-bottom: 15px; box-shadow: 6px 4px #00A4BD">
        <!--            <router-link :to="{ name: 'Room', params:{ id: room.id}}" >{{room.name}}</router-link>-->
        <router-link to="/room/2" >Room2</router-link>
        <div v-if="room2==2"  style="width: 15px; height: 15px; border-radius: 50%; background-color: red "> </div>
      </b-list-group-item>
    </b-list-group>
    <b-list-group >
      <b-list-group-item class="d-flex  align-items-center" style="margin-bottom: 15px; box-shadow: 6px 4px #00A4BD">
        <router-link to="/room/3" >Room3</router-link>
        <div v-if="room3==3" style="width: 15px; height: 15px; border-radius: 50%; background-color: red "> </div>
      </b-list-group-item>
    </b-list-group>

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
      error:'',
      room1:'',
      room2:'',
      room3:'',
      event:0,

    }
  },
  created(){
    this.room()
    window.Echo.channel('chat')
      .listen('NewTrade', (e)=>{
        if(e.room==1){
          this.event =e.room
          localStorage.setItem('newMessageRoom1', this.event)
          this.room1=localStorage.getItem('newMessageRoom1')
        }else if(e.room==2){
          this.event =e.room
          localStorage.setItem('newMessageRoom2', this.event)
          this.room2=localStorage.getItem('newMessageRoom2')
        }else if(e.room==3){
          this.event =e.room
          localStorage.setItem('newMessageRoom3', this.event)
          this.room3 = localStorage.getItem('newMessageRoom3')
        }else{
          console.log(e.room)
        }
      })
  },
  mounted() {
    this.room1=localStorage.getItem('newMessageRoom2')
    this.room3 = localStorage.getItem('newMessageRoom3')
    this.room2=localStorage.getItem('newMessageRoom2')

  },
  methods:{
    room(){
      this.axios.get('/rooms').then(response =>{
        this.rooms = response.data
        console.log(this.rooms)
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
