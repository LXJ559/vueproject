import Vue from 'vue'
import Router from 'vue-router'
import Pos from "../page/Pos";
import Order from "../page/Order"
import Login from "../page/Login";
import Register from "../page/Register"
import FindPsw from "../page/FindPsw";
import Reset from "../page/Reset";

Vue.use(Router);

//在路由中添加了相同的路由.报错：Navigating to current location (XXX) is not allowed
// 解决：重写路由的push方法
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

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
    },
    {
      path:'/register',
      meta: {
        title: '注册',
      },
      component:Register
    },
    {
      path:'/findPsw',
      meta: {
        title: '注册',
      },
      component:FindPsw
    },
    {
      path:'/reset',
      meta: {
        title: '注册',
      },
      component:Reset
    }
  ]
})
