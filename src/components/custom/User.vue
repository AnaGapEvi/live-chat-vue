<template>
  <div class="user" @click="readMessage(userItem.id)" >
    <b-list-group-item class="d-flex  align-items-center">
      <div>
        <div v-if="userItem.status==='off'" style="width: 15px; height: 15px; border-radius: 50%; background-color: darkgrey "> </div>
        <div v-else style="width: 15px; height: 15px; border-radius: 50%; background-color: #36b936 "> </div>
      </div>
      <p style="padding-left: 5px">{{userItem.name}}</p>
      <p v-if="count>0" style="color: red; padding-left: 5px " >{{count}}</p>
    </b-list-group-item>  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "User",
  props: ['user'],
  data(){
    return{
      userItem: this.user,
      count:0
    }
  },
  mounted() {
    this.messageStatus(this.userItem.id)
  },
  methods:{
    messageStatus(id){
      ///////////////////////////////////////////////////////
      axios.get(`/status/user-message/${id}`)
        .then(response => {
        this.count = response.data
        return response
      }).then(e => {
        console.log(error)
      })
    },
    readMessage(id){
      axios.put(`/status/message-read`, {userID: id})
        .then(response =>{
          this.count=0
        return response
      }).catch(e=>{
        console.log(e)
      })
    }
  }
}
</script>

<style scoped>
.user{
  /*border-style: inset;*/
  width: 100%;
  justify-content: space-between;
  margin-top: 15px;
  box-shadow: 6px 4px #00A4BD
}
</style>
