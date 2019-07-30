import Vue from 'vue'
import Router from 'vue-router'
import Home from "../views/home/Home";
import Category from "../views/category/Category";
import Profile from "../views/profile/Profile";
import Cart from "../views/cart/Cart";
import Detail from "../views/detail/Detail";
Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: '/home'
        }, {
            path: '/cart',
            name: 'cart',
            component: Cart
        }, {
            path: '/profile',
            name: 'profile',
            component: Profile
        }, {
            path: '/category',
            name: 'category',
            component: Category
        }, {
            path: '/home',
            name: 'home',
            component: Home
        },{
            path: '/detail/:iid',
            name: 'detail',
            component: Detail
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
        }
    ]
})
