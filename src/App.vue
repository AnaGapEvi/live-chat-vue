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
}
</style>
