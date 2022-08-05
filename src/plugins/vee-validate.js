import Vue from 'vue'
import {ValidationProvider, ValidationObserver, extend} from "vee-validate";
import {required, email, min, max, alpha_spaces} from "vee-validate/dist/rules";
import forgotPassword from "../components/auth/forgotPassword";
extend("required", {
  ...required,
  message: "Filled is required"
});
extend("email", {
  ...email,
  message: "Enter correct email address"
});
// extend("password", {
//   ...forgotPassword,
//   message: "Enter correct email address"
// });
extend("min", min);
extend("max", max);
extend("alpha_spaces", {
  ...alpha_spaces,
  message: "Use only syllables and spaces"
});
Vue.component('validation', ValidationProvider)
Vue.component('validation-observer', ValidationObserver)
