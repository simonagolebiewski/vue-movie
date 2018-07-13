<template>
  <div class="">
    <towatch-list></towatch-list>
    <button class="go-home" @click="goHome">Go Home</button>
  </div>
</template>


<script>
import TowatchList from './components/TowatchList'

  export default {
    methods: {
      goHome() {
        this.$router.push('/');
      }
    },
    components: {
      TowatchList
    }
  }
</script>
<style lang="scss">
  .go-home {
    float: right;
    color: #6921bc;

    &:hover {
      border: none;
      color: #3b0577;
    }
  }
</style>
