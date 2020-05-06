import axios from 'axios'

export default {
  checkoutMoney(data,success,error){
    axios.post('http://localhost:8888/pos/checkout',data)
      .then((res)=>{
        success(res);
      },(e)=>{
        error(e);
      })
      .catch((err)=>{console.log(err)})
  }
}
