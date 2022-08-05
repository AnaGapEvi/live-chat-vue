<template>
  <div id="app">
    <nav-bar class="navbar" />
    <router-view/>
  </div>
</template>

<script>
import NavBar from './components/custom/NavBar'
export default {
  components:{ NavBar},
  name: 'App'
}
</script>

<style>
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/

  /*color: #2c3e50;*/
  /*margin-top: 15px;*/
}
.navbar{
  /*width: 100vh;*/
  /*position: fixed;*/
}
</style>
