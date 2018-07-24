<template>
  <div class="app">
    single
  <img src="./images/asset.svg" alt="">
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    console.log('single')
    console.log(window.config)
    return {}
  }
}
</script>

<style lang="scss">
@import '../../scss/_global.scss';
.app {
  color: $color-theme;
}
</style>
