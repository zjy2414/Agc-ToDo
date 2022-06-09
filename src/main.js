import Vue from 'vue'
import App from './App.vue'

import $ from 'jquery'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import router from './router'
import './plugins/element.js'

Vue.config.productionTip = false

//设置title
router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    next()
})

new Vue({
    render: h => h(App),
    el: '#app',
    router,
    $
}).$mount('#app')
