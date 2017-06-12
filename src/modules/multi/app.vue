<template>
    <div class="app-multi">
        {{test}}

        <img src="../../images/vue.png" alt="">
        <img src="./images/vue.png" alt="">

        <router-link to="page">page</router-link>

        <d-console></d-console>
    </div>
</template>

<script>
import DConsole from '../../components/DConsole'

export default {
    data() {
        return {
            test: 'app-multi'
        }
    },
    components: {
        DConsole
    }
}

</script>

<style lang="scss">
@import '../../scss/_global.scss';

.app-multi {
    color: blue;

    img {
        width: rem(200);
    }
}

</style>
