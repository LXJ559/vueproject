import  axios from 'axios'
export default {
  getOrder(success,error){
    axios.get('http://localhost:8888/pos/getorder')
      .then((res)=>{
        console.log(res);
        success(res);
      },(e)=>{
        error(e);
      })
      .catch((err)=>{console.log(err)})
  }
}
