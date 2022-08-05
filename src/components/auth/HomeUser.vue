<template>
  <div class="home">
    <div style="display: flex; flex-wrap: wrap; justify-content: space-between">
      <div style="width: 50%;">
        <all-users />
      </div>
      <div style="width: 30%; padding: 10px; border-radius: 10px">
        <div class="d-flex" style="background-color: #435f7a; padding: 5px; border-radius: 7px 7px 0  0">
          <b-icon icon="three-dots" animation="cylon" font-scale="2"></b-icon>
        </div>

        <div class="scrollable cart-body chat" ref="hasScrolledToBottom">
        <div v-for="message in messages" >
          <div class="message message-receive" v-if="data.id !== message.user.id">
            <p>
              <strong class="primary-font" v-model="message.user.name">
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
        </div>
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

    </div>

  </div>
</template>
<script>
import RoomOne from "../custom/Rooms";
import Chat from "../custom/Chat";
import AllUsers from "../custom/AllUsers";
import axios from "axios";
import Rooms from "../custom/Rooms";

window.Pusher = require("pusher-js");
import Echo from "laravel-echo";

export default {
  name: 'HomeUser',
  components:{Rooms, RoomOne, Chat, AllUsers},
  data () {
    return {
      messages:[],
      message:'',
      data: {},
      hasScrolledBottom:0,
      receiver:this.$route.params.id,
      name:'',
      user:{},
      id:this.$route.params.id
    }
  },
  watch: {
    receiverId(newValue, old){
      this.fetchMessages()
    }
  },
  computed: {
    receiverId(){
      return this.$route.params.id
    },

  },
  created() {
    this.fetchMessages()
  },
  mounted() {
    this.getMy()
    // this.getUser(this.id)
    window.Echo.channel('chat-channel')
      .listen('SendMessage', (e)=>{
        this.messages.push({
          user: e.user,
          message: e.message.message,
          receiver: this.receiver
        })
        this.$nextTick(() => {
          this.$refs.hasScrolledToBottom.scrollTo(0, this.$refs.hasScrolledToBottom.scrollHeight);
        });
      })
  },
  methods:{
    fetchMessages (){
      axios.get('/messages/' + this.receiverId).then(response =>{
        this.messages = response.data
        this.$refs.hasScrolledToBottom.scrollTo(0, this.$refs.hasScrolledToBottom.scrollHeight);

      });

    },
    addMessage(){
      console.log(this.receiverId)
      let userMessage = {
        receiverId: this.receiverId,
        user:this.data,
        message:this.message
      };
      axios.post('/messages', userMessage).then(response =>{
        this.$nextTick(() => {
          this.$refs.hasScrolledToBottom.scrollTo(0, this.$refs.hasScrolledToBottom.scrollHeight);
        });
        this.message =''
      });

    },
    // getUser(id) {
    //   console.log(id)
    //   axios.get(`/user/${id}`)
    //     .then(response => {
    //       console.log(response)
    //       this.user = response.data
    //       // console.log(response.data)
    //     }).catch(error => {
    //     console.log(error)
    //   })
    // },
    getMy(){
      return new Promise((resolve, reject) => {
        axios.get('/me')
          .then(result => {
            this.data = result.data.user

            resolve(true)
          }).catch(error => {
          reject(error)
        })
      })
    },
    // scrollBottom(){
    //   if(this.messages.length > 1){
    //     let el = this.hasScrolledBottom.value;
    //     el.scrollTop = el.scrollHeight;
    //   }
    // }
  }
}
</script>

<style scoped>
.home{
  padding: 50px;
  background-image: url("https://wac-cdn.atlassian.com/dam/jcr:3619d9d0-904a-4d47-89d0-e339000c9d2e/user_manual_metadata@2x.png");
  background-repeat: no-repeat;
  background-size: cover;
  /*display: flex;*/
  /*justify-content: space-between;*/
  min-height: 100vh
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
  margin-top: 5px;
  text-align: right;
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
.hide{
  display: none;
  font-size: 10px;
  position: fixed;
}
.message-receive p:active + .hide {
  display: block;
}
.message-send p:active + .hide {
  display: block;
}
.chat{
  padding: 5px;
  background-color: rgba(182, 243, 243, 0.7);
}
</style>
