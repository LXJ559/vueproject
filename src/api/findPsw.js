import axios from 'axios'
import { SERVICE_URL} from "../constant";

const baseApiUrl = SERVICE_URL.url;

export default {
  getVerificationCode(data,success,error){
    axios.post(baseApiUrl + '/pos/user/getVCode',data)
      .then((res)=>{
        success(res);
      },(e)=>{
        error(e);
      })
      .catch((err)=>{
        console.log(err)
      })
  },

  checkVCode(data,success,error){
    axios.post(baseApiUrl + '/pos/user/checkVCode',data)
      .then((res)=>{
        success(res);
      },(e)=>{
        error(e);
      })
      .catch((err)=>{
        console.log(err)
      })
  }
}
