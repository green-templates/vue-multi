export default [
    {
        path: '/app',
        name: 'app',
        component: function(resolve) {
            require.ensure([], function() {
                resolve(require('../pages/app.vue'));
            }, './pages/app.vue');
        }
    },
    {
        path: '/page',
        name: 'page',
        component: function(resolve) {
            require.ensure([], function() {
                resolve(require('../pages/page.vue'));
            }, './pages/page.vue');
        }
    },
    {
        path: '/',
        redirect: '/app'
    },
    {
        path: '*',
        redirect: '/app'
    }
]
