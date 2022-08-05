<template>
  <div class="room">
    <div v-for="room in rooms" :key="room.id">
      <router-link :to="{ name: 'Room', params:{ id: room.id}}">{{room.name}}</router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Rooms',
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
.room{
  padding-top: 150px;
}
</style>
