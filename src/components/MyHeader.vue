<template>
  <!-- <header class="vue-header">
    <div class="app-container__wrapper">
      <img src="../assets/film.svg" class="app-container__wrapper__icon">
      <div class="app-container__wrapper__name">Movie-Vue</div>
    </div>
    <div class="app-container__wrapper__routes">
      <router-link to="/" v-if="user">Home</router-link>
      <router-link to="/towatchlist">Watch-List</router-link>
      <a v-on:click="logout" v-if="user">Logout</a>
    </div>
  </header> -->
</template>
<script type="text/javascript">
  import firebase from 'firebase';
  export default {
    computed: {
      user () {
        return this.$store.getters.getUser;
      }
    },
    methods : {
      logout: function() {
        firebase.auth().signOut().then(() => {
          this.$router.replace('login');
        })
      }
    }
  }
</script>
<style lang="scss">
  .vue-header {
  }
  .app-container {

    h1 {
      // text-transform: uppercase;
      font-size: 25px;
      margin-bottom: 10px;
      letter-spacing: 0.5px;
      @media only screen and (max-width: 768px) {
        font-size: 20px;
      }
    }
    &__wrapper {
      position: relative;
      top: 6px;
      margin-left: 20px;
      display: inline-block;
      &__icon {
        display: inline-block;
        height: 35px;
        vertical-align: middle;
      }
      &__name {
        display: inline;
        vertical-align: middle;
        text-transform: uppercase;
        color: #ffffff;
      }
    }
    &__wrapper {
      &__routes {
        display: inline-block;
        float: right;
        position: relative;
        top: 17px;
        right: 20px;
        a {
          text-decoration: none;
          font-size: 12px;
          margin: 0 5px 0px 0;
          padding: 10px;
          border-radius: 3px;
          cursor: pointer;
          text-transform: uppercase;
          color: #4D6AEB;
          border: 1px solid #4D6AEB;

          &:hover{
            font-weight: bold;
          }

          &:last-child{
            margin-right: 0;
          }
        }
      }
    }
  }
  .router-link-exact-active {
    border: 2px solid #ffffff;
    padding: 2px 5px;
  }
</style>
