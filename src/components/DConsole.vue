<!-- vConsole
<d-console></d-console>
-->
<template>
    <section class="d-console" @click="showConsole()"></section>
</template>

<script>

export default {
    data() {
        return {
            count: 0,
            tid: null
        }
    },
    methods: {
        showConsole() {
            var _this = this

            _this.count++;
            !_this.tid && (_this.tid = setInterval(function() {
                if (_this.count > 10) {
                    console.log('vConsole ok')

                    var vConsole = document.createElement('script')
                    vConsole.setAttribute('src', '/static/vconsole.min.js')
                    document.body.appendChild(vConsole)

                    var tid = setTimeout(function() {
                        clearInterval(_this.tid)
                        clearTimeout(tid)
                    }, 0);
                } else {
                    _this.count = 0
                    clearInterval(_this.tid)
                    _this.tid = null
                }
            }, 3000))
        }
    }
}

</script>

<style lang="scss">
@import "../scss/_global.scss";
.d-console {
    height: rem(50);
}

</style>
