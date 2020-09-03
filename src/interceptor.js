import router from "./router";
import axios from "axios";


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
