<template>
  <div class="homepage">
    <router-link  to="/room/1" ><div class="room">Room 1</div></router-link>
    <router-link  to="/room/2" ><div class="room">Room 2</div></router-link>
    <router-link to="/room/3" ><div class="room">Room 3</div></router-link>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.homepage{
  background-image: url("https://www.dentons.com/-/media/images/website/background-images/regions/asia-pacific/asia_pacific_background_04.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
}
.room {
  margin-top: 300px;
  margin-right: 50px;
  background-color: rgba(100, 149, 237, 0.96);
  width: 200px;
  height: 200px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
}
a{
  text-decoration: none;
}
</style>
