import VueRouter from 'vue-router'
// import { component } from 'vue/types/umd'

import clientPage from "../pages/clientPage"
import formPage from "../pages/formPage"

export default new VueRouter({
   
    routes: [
        {
            path: "/",
            component: formPage
        },
        {
            path: "/client",
            component: clientPage
        },
    ]
})