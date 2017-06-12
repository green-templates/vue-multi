import App from './app.vue'
import validate from './service'
import '../../scss/layout.scss'

Vue.use(validate)

new Vue({
    el: '#app',
    render: h => h(App)
})
