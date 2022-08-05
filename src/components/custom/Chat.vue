<template>
  <div class="chat">
    <h1>Chat</h1>
    <div class="scrollable cart-body" ref="hasScrolledToBottom">
      <template v-for="message in messages">
        <div class="message message-receive" v-if="user.id != message.user.id">
          <p>
<!--            <img :src="`https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=898&q=80`"  class="shadow-lg p-3 bg-white rounded" height="30px" width="30px" >-->
            <strong class="primary-font">
              {{message.user.name}} :
            </strong>
            {{message.message}}
          </p>
        </div>
        <div class="message message-send" v-else>
          <p>
            <strong class="primary-font">
              {{message.user.name}} :
            </strong>
            {{message.message}}
          </p>
        </div>
      </template>
    </div>
    <div class="chat-form input-group">
      <input id="btn-input" type="text" name="message" class="form-control input-sm message-" placeholder="Type your message here..." v-model="message" @keyup.enter="addMessage">
      <span class="input-group-btn">
                <button class="btn btn-primary" id="btn-chat" @click="addMessage">
                    Send
                </button>

            </span>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "chat",
  props:['user'],
  data(){
    return{
      messages:[],
      hasScrolledBottom:'',
      message:'',
      user:{},
      roomId: this.$route.params.id
    }
  },
  created() {
    this.scrollBottom()
  },
  mounted() {
    this.getmy()
    this.fetchMessages()
    // window.Echo.private('private-chat-room')
    //   .listen('PrivateMessageEvent', (e) => {
    //     this.messages.push({
    //       message: e.message.message,
    //       user: e.user,
    //     })
    //   })
    //
    // Echo.private('App.Models.User.1')
    //   .notification((notification) => {
    //     console.log(notification.message);
    //   });
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
      });
    },
    addMessage(){
      let roomMessage = {
        room_id: this.roomId,
        user:this.user,
        message:this.message
      };
      console.log(roomMessage)
      this.messages.push(...roomMessage);
      axios.post('/room-messages', roomMessage).then(response =>{
        console.log(response.data)
      });
      this.message =''
    },
    scrollBottom(){
      if(this.messages.length > 1){
        let el = this.hasScrolledBottom.value;
        el.scrollTop = el.scrollHeight;
      }
    }
  }
}
</script>
<style scoped>
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
  background: #435f7a;
  color: #f5f5f5;
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
.chat{
  background-image: url("https://thumbs.dreamstime.com/b/chat-seamless-pattern-vector-minimal-texture-background-made-thin-line-bubbles-66029898.jpg");
  min-height: 100vh;
}
</style>

