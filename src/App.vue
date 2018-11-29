<template>
  <div id="app"class="container">
    <head>
      <link href="https://fonts.googleapis.com/css?family=Oxygen" rel="stylesheet">
    </head>
    <router-view class="" name="header"></router-view>
    <div class="app-container">
      <router-view class="" name="home"></router-view>
      <!-- <router-view class="" name="watchlist"></router-view> -->
      <router-view></router-view>
    </div>

    <!-- <router-view class="" name="footer"></router-view> -->
  </div>
</template>

<script>
import Login from './components/Login'
import TowatchList from './components/TowatchList'
import MovieList from './components/MovieList'
import MyHeader from './components/MyHeader'
import MyFooter from './components/MyFooter'

export default {
  name: 'App',
  components: {
    // Login,
    TowatchList,
    MovieList,
    MyHeader,
    MyFooter
  },
  methods: {
    setUser: function() {
      this.$store.dispatch('setUser');
    }
  },
  created() {
    // when the app is created run the set user method
    // this uses Vuex to check if a user is signed in
    // check out mutations in the store.js file
    this.setUser();
  }
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  font-family: 'Oxygen', sans-serif;
  font-size: 14px;
}
body {
 background: #F9F9F9;
}
.container {
 margin: 0 auto;
 width: 100%;
 top: 0;
 bottom: 0;
 position: absolute;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  // margin-top: 60px;
  font-size: 24px;
}
</style>
