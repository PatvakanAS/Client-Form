import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import VueRouter from 'vue-router'
import router from "./router/index"

Vue.use(VueRouter)

Vue.config.productionTip = false
Vue.use(Vuelidate)

new Vue({
    render: h => h(App),
    router,
}).$mount('#app')