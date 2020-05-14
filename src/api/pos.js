import axios from 'axios'

import { SERVICE_URL} from "../constant";

const baseApiUrl = SERVICE_URL.url;

export default {
  checkoutMoney(data,success,error){
    axios.post(baseApiUrl + '/pos/checkout',data)
      .then((res)=>{
        success(res);
      },(e)=>{
        error(e);
      })
      .catch((err)=>{console.log(err)})
  }
}
