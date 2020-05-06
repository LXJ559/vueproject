// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from "axios";

Vue.config.productionTip = false
Vue.use(ElementUI);


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

axios.interceptors.request.use(config=>{
  let token = localStorage.getItem('token');
  if (token){
    config.headers['Content-Type'] = "application/json;chartset=UTF-8;"
    config.headers['Authorization']= token;
  }
  return config;
},error=>{
  return Promise.reject(error);
})

axios.interceptors.response.use(response=>{
  if(response.headers.status === 'fail'){
    console.log(response.headers);
    router.replace({
      path: '/login'
    })
  }
  return Promise.resolve(response);
},error => {
  return Promise.reject(error)
})

router.beforeEach((to,from,next)=>{
  if (to.matched.some(record=>record.meta.requiresAuth)){
    if (!localStorage.getItem("token")){
      next({
        path:'/login',
      })
    }else{
      next()
    }
  }else {
    next()
  }
})
