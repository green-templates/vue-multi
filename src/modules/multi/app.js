import routes from './router/routes'
import './service/service'
import './scss/layout.scss'

Vue.use(VueRouter)

const router = new VueRouter({
    routes
})

router.afterEach(route => {
    title(route.name)
    window.scrollTo(0, 0);
    layer.closeAll()
})

new Vue({
    el: '#app',
    router
})
