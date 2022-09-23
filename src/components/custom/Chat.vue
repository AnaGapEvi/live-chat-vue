<template>
  <div class="chat">
    <h1>Chat</h1>
    <div class="scrollable cart-body" ref="hasScrolledToBottom">
      <template v-for="message in messages">
        <div class="message message-receive" v-if="user.id !== message.user.id">
          <p>
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
                <button class="btn btn-primary" id="btn-chat" @click="addMessage"> Send </button>
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
    this.getAuth()
    this.fetchMessages()
  },

  methods:{
    getAuth(){
      axios.get('/me').then(response =>{
        this.user = response.data.user
      });
    },
    fetchMessages (){
      axios.get('/room-messages/' + this.roomId).then(response =>{
        this.messages = response.data

      });
    },
    addMessage(){
      let roomMessage = {
        room_id: this.roomId,
        user:this.user,
        message:this.message
      };
      this.messages.push(...roomMessage);
      axios.post('/room-messages', roomMessage).then(response =>{
        if(response) {
          this.scrollBottom()
          this.message = ''
        }
      });
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
.message p{
  border-radius: 10px;
  padding: 10px 20px 10px 8px;
  margin-top: 5px;
  display: inline-block;
  width: auto;
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

.chat{
  background-image: url("https://thumbs.dreamstime.com/b/chat-seamless-pattern-vector-minimal-texture-background-made-thin-line-bubbles-66029898.jpg");
  min-height: 100vh;
}
</style>

