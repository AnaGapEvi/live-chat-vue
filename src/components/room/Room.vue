<template>
  <div class="room">
    <div style="width: 100%; ">
      <h1 >Room Users</h1>
      <div style="display: flex"  v-for="item in roomUser">
        <div style="margin: 15px;padding: 5px; width: 30%; background-color: rgb(248,244,244) ">
          <router-link  style="margin-left: 10px;text-decoration: none;display: flex; align-items: center; justify-content: space-around; color: black" :to="{ name: 'HomeUser', params:{ id: user.id}}">
            <p v-if="item.user.name !== item.user.name-1">{{item.user.name}}  {{item.user.surname}}</p>
<!--            <div>-->
              <div v-if="item.user.status==='off'" style="width: 15px; height: 15px; border-radius: 50%; background-color: darkgrey "> </div>
              <div v-else style="width: 15px; height: 15px; border-radius: 50%; background-color: #36b936 "> </div>
<!--            </div>-->
          </router-link>
        </div>
      </div>
    </div>
    <div style="width: 60%; padding-top: 30px;">
      <div class="chat cart" >
        <div class="roomUser">

        </div>
        <div class="scrollable cart-body" ref="hasScrolledToBottom" style="border-radius: 7px 7px 0 0;padding: 5px; background-color: rgba(199,197,197,0.77)">
          <template v-for="message in messages" style="height: 100%">
            <div class="message message-receive" v-if="user.id !== message.user.id">
              <p>
                <strong class="primary-font">
                  {{message.user.name}} :
                </strong>
                {{message.message}}
              </p>
              <span class="hide">{{message.created_at}}</span>
            </div>
            <div class="message message-send" v-else>
              <p>
                <strong class="primary-font">
                  {{message.user.name}} :
                </strong>
                {{message.message}}
              </p>
              <span class="hide">{{message.created_at}}</span>
            </div>
          </template>
        </div>
        <div class="chat-form input-group">
          <span class="input-group-btn">
                <button class="btn btn-primary" id="btn-chat" @click="addMessage">
                   +
                </button>
            </span>
          <input id="btn-input" type="text" name="message" class="form-control input-sm message-" placeholder="Type your message here..." v-model="message" @keyup.enter="addMessage">
          <span class="input-group-btn">
                <button class="btn btn-primary" id="btn-chat" @click="addMessage">
                    Send
                </button>
            </span>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import axios from "axios";
import Echo from "laravel-echo";

export default {
  data(){
    return{
      messages:[],
      hasScrolledBottom:'',
      message:'',
      user:{},
      roomId: this.$route.params.id,
      users:{},
      roomUser:[]
    }
  },
  created() {
    this.scrollBottom()
    this.getmy()
    this.fetchMessages()
    window.Echo.channel('chat-room-channel')
      .listen('PrivateMessageEvent', (e) => {
        this.messages.push({
          // room_id: this.roomId,
          user: e.user,
          message: e.message.message,
        })
        this.$nextTick(() => {
          this.$refs.hasScrolledToBottom.scrollTo(0, this.$refs.hasScrolledToBottom.scrollHeight);
        });
      })
    this.getUsers()
  },
  methods:{
    getmy(){
      axios.get('/me').then(response =>{
        this.user = response.data.user
      });
    },
    fetchMessages (){
      axios.get('/room-messages/' + this.roomId).then(response =>{
        console.log(response.data)
        this.messages = response.data

          for(let i=0; i<this.messages.length; i++ ){
            let isHasNotEqual = true
            for(let j=0; j<this.roomUser.length; j++ ){
              if (this.roomUser[j].user_id===this.messages[i].user_id){
                isHasNotEqual=false
              }
            }
            if (isHasNotEqual){
              this.roomUser.push(this.messages[i])
              console.log(this.roomUser)
            }
          }
        console.log(this.messages)
      });
    },
    addMessage(){
      let roomMessage = {
        user:this.user,
        room_id: this.roomId,
        message:this.message
      };
      // this.message.push(roomMessage)
      axios.post('/room-messages', roomMessage).then(response =>{
        this.$nextTick(() => {
          this.$refs.hasScrolledToBottom.scrollTo(0, this.$refs.hasScrolledToBottom.scrollHeight);
        });
      });
      this.message =''
    },
    getUsers (){
      console.log(this.messages)
    },
    scrollBottom() {
      if (this.messages.length > 1){
          this.$refs.hasScrolledToBottom.scrollTo(0, this.$refs.hasScrolledToBottom.scrollHeight);
      }
    }
  }
}
</script>
<style scoped>
.room{
  padding: 20px;
  display: flex;
  justify-content: space-between;
  background-image: url("https://www.dentons.com/-/media/images/website/background-images/regions/asia-pacific/asia_pacific_background_04.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
}
.message p{
  border-radius: 10px;
  padding: 10px 20px 10px 8px;
  margin-top: 5px;
  display: inline-block;
  width: auto;
  /*margin: 0px;*/
}
.message-send p{
  background: #e0e3e6;
  color: #2f2d2d;
}
.message-send{
  text-align: right;
  margin-top: 5px;
}
.message-receive p{
  background: #328bef;
  color: #f5f5f5;
}
.message-receive p:active + .hide {
  display: block;
}
.message-send p:active + .hide {
  display: block;
  text-align: right;
}
.message-receive{
  margin-top: 5px;
}
.scrollable{
  overflow: hidden;
  overflow-y: scroll;
  height: calc(100vh - 25vh);
}
.message-input{
  border: none;
  border-radius: 0px;
  background: #f2f2f2;
}
.container{
  width: 100%;
}
.hide{
  display: none;
  font-size: 10px;
}
.roomUser{
  display: flex;
}
</style>
