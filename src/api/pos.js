import axios from 'axios'

import { SERVICE_URL} from "../constant";

const baseApiUrl = SERVICE_URL.url;

export default {
  getAllGoods(success,error){
    axios.get(baseApiUrl + '/pos/goods/findAllGoods')
      .then((res)=>{
        success(res);
      },(e)=>{
        error(e);
      })
      .catch((err)=>{console.log(err)})
  },

  checkoutMoney(data,success,error){
    axios.post(baseApiUrl + '/pos/order/checkout',data)
      .then((res)=>{
        success(res);
      },(e)=>{
        error(e);
      })
      .catch((err)=>{console.log(err)})
  }
}
