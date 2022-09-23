<template>
  <div class="reg">
    <div class="signUp">
      <h3 style="text-align: center"> Create new account </h3>
      <validation-observer ref="observer">
        <b-form v-on:submit.prevent="formSubmit" enctype="multipart/form-data">
          <validation
            name="name"
            rules="required"
          >
            <b-form-group
              id="input-group-1"
              label="Name:"
              label-for="input-1"
              description=""
              slot-scope="{ errors }"
              :invalid-feedback="errors[0]"
            >
              <b-form-input
                id="input-1"
                v-model="form.name"
                type="text"
                placeholder="name..."
                :state="errors[0] ? false : null"
                trim

              ></b-form-input>
            </b-form-group>
          </validation>
          <validation
            name="surname"
            rules="required"
          >
            <b-form-group
              id="input-group-2"
              label="Surname:"
              label-for="input-2"
              description=""
              slot-scope="{ errors }"
              :invalid-feedback="errors[0]"
            >
              <b-form-input
                id="input-3"
                v-model="form.surname"
                type="text"
                placeholder="surname"
                :state="errors[0] ? false : null"
                trim
              ></b-form-input>
            </b-form-group>
          </validation>
          <validation
            name="email"
            rules="required|email"
          >
            <b-form-group
              id="input-group-3"
              label="Email address:"
              label-for="input-1"
              description=""
              slot-scope="{ errors }"
              :invalid-feedback="errors[0]"
            >
              <b-form-input
                id="input-3"
                v-model="form.email"
                type="email"
                placeholder="Enter email"
                :state="errors[0] ? false : null"
                trim
              ></b-form-input>
            </b-form-group>
          </validation>
          <validation
            name="password"
            rules="required|min:6"
          >
            <b-form-group
              id="input-group-4"
              label="Password:"
              label-for="input-4"
              description=""
              slot-scope="{ errors }"
              :invalid-feedback="errors[0]"
            >
              <b-form-input
                id="input-4"
                v-model="form.password"
                type="password"
                placeholder="***********"
                :state="errors[0] ? false : null"
                trim
              ></b-form-input>
            </b-form-group>
          </validation>
          <validation
            name="password"
            rules="required|min:6"
          >
            <b-form-group
              id="input-group-4"
              label="Password:"
              label-for="input-4"
              description=""
              slot-scope="{ errors }"
              :invalid-feedback="errors[0]"
            >
              <b-form-input
                id="input-4"
                v-model="form.repeat"
                type="password"
                placeholder="***********"
                :state="errors[0] ? false : null"
                trim
              ></b-form-input>
            </b-form-group>
          </validation>
          <validation
            name="birthday"
            rules="required"
          >
            <b-form-group
              id="input-group-5"
              label="Date of birthday:"
              label-for="input-5"
              description=""
              slot-scope="{ errors }"
              :invalid-feedback="errors[0]"
            >
              <b-form-input
                id="input-5"
                v-model="form.birthday"
                type="date"
                :min="1900-12-31"
                :max="2011-12-31"
                :state="errors[0] ? false : null"
                trim
              ></b-form-input>
            </b-form-group>
            <input type="date" id="start" name="trip-start"
                   value="2018-07-22"
                   min="2018-01-01" max="2018-12-31">

          </validation>

          <validation
            name="gender"
            rules="required"
          >
            <b-form-group label="Gender:" >
              <b-form-radio v-model="form.gender" style="display: flex"  name="gender" value="Male"> Male </b-form-radio>
              <b-form-radio v-model="form.gender" style="display: flex" name="gender" value="Female">Female </b-form-radio>
            </b-form-group>
          </validation>
          <div><span style="color: red" v-if="error!==''">{{error}}</span></div>

          <b-button type="submit" variant="primary">Sign up</b-button>
        </b-form>
      </validation-observer>
      <router-link to="/" style="margin-top: 15px">Go to login page</router-link>

    </div>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'SignUp',
  data () {
    return {
      form:{
        name:'',
        surname:'',
        email:'',
        password:'',
        repeat:'',
        gender: '',
      },
      error:'',
      age:'',
      birthday:'',
      mount:'',
      year:'',
      day:''

    }
  },
  methods:{
    formSubmit(e) {
      if(this.form.email!=='' && this.form.name!=='' && this.form.surname!=='' && this.form.password!=='' && this.form.gender!== ''){
        if(this.form.password===this.form.repeat){
          this.birthday = new Date(this.form.birthday);
          this.mount = Date.now() - this.birthday.getTime();
          this.age = new Date(this.mount);
          this.year = this.age.getUTCFullYear();
          this.day = Math.abs(this.year - 1970);
          if(this.form.birthday!=='' && this.day>7){
              axios.post('/register', this.form)
              .then((response) => {
                if(response){
                  this.$router.push({path: "/"})
                }
              }).catch( error => {
              this.error=error.response.data.message;
              });
          } else {
            this.error='Your age does not qualify  for registration 7+'
            this.form.password = ""
            this.form.repeatPassword = ""
          }
        }else {
          this.error= "passwords do not match"
          this.form.password = ""
          this.form.repeatPassword = ""
        }
      } else {
        this.error = 'fill in all fields'
      }

    }

  }
}
</script>

<style scoped>
.reg{
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
.signUp{
  width: 50%;
  background-color: rgba(47, 45, 45, 0.59);
  padding: 20px;
  border-radius: 15px;
}
</style>
