<template>
  <div id="app"class="container">
    <my-header></my-header>
    <div class="logo-container">
      <router-view></router-view>
    </div>

    <my-footer></my-footer>
  </div>
</template>

<script>
import TowatchList from './components/TowatchList'
import MovieList from './components/MovieList'
import MyHeader from './components/MyHeader'
import MyFooter from './components/MyFooter'

export default {
  name: 'App',
  components: {
    TowatchList,
    MovieList,
    MyHeader,
    MyFooter
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
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
