import VueRouter from 'vue-router'
import Home from '../components/Home'
import About from '../components/About'

export default new VueRouter({
    routes: [
        {
            path: '/home',
            component: Home
        },
        {
            path: '/about',
            component: About
        }
    ]
})
