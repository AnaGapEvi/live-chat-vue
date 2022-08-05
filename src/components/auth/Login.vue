<template>
  <div class="login">
    <b-container class="px-0 mt-5" >
      <b-row>
        <b-col
          cols="5"
          md="8"
          lg="7"
          xl="5"
          class="mx-auto signIn"
        >
          <h3>
            Sign in
          </h3>
          <validation-observer ref="observer">
            <b-form @submit.prevent="login_user">
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
                    v-model="form.email"
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
                    v-model="form.password"
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
              <router-link to="/forgot-password">Forgot your password?</router-link>
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
  name: 'Login',
  data () {
    return {
      form:{
        email:'',
        password:''
      },
      token:'',
      error:''
    }
  },
  methods:{
    login_user() {
      return new Promise((resolve, reject) => {
        axios.post('/login', this.form)
          .then(result => {
            localStorage.setItem('access_token', result.data.token);
            resolve(true)
            console.log(result.data.token)
            this.$router.push({name: "HomeUser"})
            window.location.reload()
          }).catch(error => {
            this.error=error.response.data.message
            this.form.password = ''
          })
      })
    },
  }
}
</script>
<style scoped>
.login{
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
.signIn{
  background-color: rgba(47, 45, 45, 0.59);
  padding: 20px;
  border-radius: 15px;
}
</style>
