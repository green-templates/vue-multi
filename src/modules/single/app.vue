<template>
    <div class="app-single">
        {{test}}

        <img src="../../images/vue.png" alt="">
        <img src="./images/vue.png" alt="">

        <img src="../../images/bigg.jpeg" alt="">
        <img src="./images/big.jpeg" alt="">

        <d-console></d-console>
    </div>
</template>

<script>
import DConsole from '../../components/DConsole'

export default {
  data() {
      return {
          test: 'app-single'
      }
  },
  components: {
    DConsole
  }
}
</script>


<style lang="scss">
@import '../../scss/_global.scss';

    .app-single {
        color: red;

        img {
            width: rem(200);
        }
    }
</style>
