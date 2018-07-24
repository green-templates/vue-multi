<template>
  <div class="app">
    <router-link to="home">home</router-link>
    <router-link to="child">child</router-link>
    <router-view/>
    <img src="./images/account.svg" alt="">
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    console.log('multi')
    return {}
  }
}
</script>

<style lang="scss">
.app {
  color: red;
}
</style>
