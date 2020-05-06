import axios from 'axios'

export default {
  register(data,success,error){
    axios.post('http://localhost:8888/pos/user/register',data)
      .then((res)=>{
        success(res);
      },(e)=>{
        error(e);
      })
      .catch((err)=>{
        console.log(err)
      })
  },

  login(data,success,error) {
    axios.post('http://localhost:8888/pos/user/login',data)
      .then((res)=>{
        success(res);
      },(e)=>{
        error(e);
      })
      .catch((err)=>{
        console.log(err);
      })
  }
}
