import Vue from 'vue'
import Router from 'vue-router'
import Pos from "../page/Pos";
import Order from "../page/Order"
import Login from "../page/Login";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      meta: {
        title: '首页',
        requiresAuth: true,
      },
      component: Pos
    },
    {
      path: '/order',
      meta: {
        title: '订单',
        requiresAuth: true,
      },
      component: Order
    },
    {
      path:'/login',
      meta: {
        title: '登录',
      },
      component:Login
    }
  ]
})
