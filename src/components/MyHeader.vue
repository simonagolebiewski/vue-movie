<template>
  <header class="vue-header">
    <div class="logo-container__wrapper">
      <img src="../assets/film.svg" class="logo-container__wrapper__icon">
      <div class="logo-container__wrapper__name">Movie-Vue</div>
    </div>
    <div class="logo-container__wrapper__routes">
      <router-link to="/">Home</router-link>
      <router-link to="/towatchlist">Watch-List</router-link>
    </div>
  </header>
</template>
<style lang="scss">
  .vue-header {
    height: 50px;
    // box-shadow: 0px -7px 5px 8px #6921bc;
    background: linear-gradient(to right, #6921bc , #5935dd, #b280ed);
  }
  .logo-container {
    // display: inline-block;
    width: 800px;
    margin: 40px auto;
    height: 100%;
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
        top: 5px;
        right: 20px;
        a {
          color: #ffffff;
          text-decoration: none;
          font-size: 14px;
          margin: 0 10px 0px 0;

          &:last-child{
            margin-right: 0;
          }

          &:hover{
            border: 2px solid #ffffff;
            padding: 2px 5px;
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
