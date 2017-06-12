import routes from './routes'
import validate from './service'
import '../../scss/layout.scss'

Vue.use(VueRouter)
Vue.use(validate)

const router = new VueRouter({
    routes
})

router.afterEach(route => {
    document.title = route.name;
    window.scrollTo(0, 0);
    layer.closeAll()
})

new Vue({
    el: '#app',
    router
})
