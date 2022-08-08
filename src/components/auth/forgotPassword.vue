<template>
  <div class="body">
    <b-container class="px-0 mt-5 forgot">
      <b-row>
        <b-col cols="5" md="8" lg="7" xl="5" class="mx-auto repeat"  >
          <h3> Type your Email to reset password  </h3>
          <validation-observer ref="observer">
            <b-form @submit.prevent="reset">
            <validation
              name="email"
              rules="required|email"
            >
              <b-form-group
                label-class="form-label"
                label="Email Address"
                label-for="email"
                slot-scope="{ errors }"
                :invalid-feedback="errors[0]"
              >
                <b-form-input
                  id="email"
                  v-model="user.email"
                  :state="errors[0] ? false : null"
                  trim
                />
              </b-form-group>
            </validation>
            <validation
              name="password"
              rules="required|min:8"
            >
              <b-form-group
                label-class="form-label"
                label="Password"
                label-for="password"
                slot-scope="{ errors }"
                :invalid-feedback="errors[0]"
              >
                <b-form-input
                  id="password"
                  v-model="user.password"
                  type="password"
                  :state="errors[0] ? false : null"
                  trim
                />
              </b-form-group>
            </validation>
              <validation
              name="password"
              rules="required|min:8"
            >
              <b-form-group
                label-class="form-label"
                label="Password"
                label-for="password"
                slot-scope="{ errors }"
                :invalid-feedback="errors[0]"
              >
                <b-form-input
                  id="password"
                  v-model="user.repeat"
                  type="password"
                  :state="errors[0] ? false : null"
                  trim
                />
              </b-form-group>
            </validation>
            <div class="mt-3">
              <b-button
                variant="primary"
                block
                type="submit"
              >
                Sign in
              </b-button>


            </div>
            <span style="color: #e59898" v-if="error!==''">{{error}}</span>
          </b-form>
          </validation-observer>
          <div class="d-flex justify-content-between">
            <p class="mt-5">
              <router-link to="/">Go to login page</router-link>
            </p>
            <p class="mt-5">
              <router-link to="/register">Don't have an account?</router-link>
            </p>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user:{
        email: "",
        password:"",
        repeat:""
      },
      error:''
    }
  },
  methods: {
    reset() {
      if(this.user.password===this.user.repeat){
        axios.put('/forgot', this.user)
          .then((resp) => {
            if(resp){
              this.$router.push({path: "/"});
              console.log(resp.data)
            } else {
              console.log('you not have a account')
            }
          })
          .catch((e) => {
            this.error = 'user does not exist'
            console.log(e)
          })
      } else{
        this.error='password does not match'
      }
    }
  }
}
</script>
<style scoped>
.body{
  display: flex;
  width: 100%;
  min-height: 100vh;
  background-image: url("https://www.dentons.com/-/media/images/website/background-images/regions/asia-pacific/asia_pacific_background_04.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  justify-content: center;
  align-items: center;
  color: white;
}
.forgot{

  justify-content: center;
  align-items: center;
}
.repeat{
  background-color: rgba(47, 45, 45, 0.59);
  padding: 20px;
  border-radius: 15px;
}
</style>
