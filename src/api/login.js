import axios from 'axios'
import { SERVICE_URL} from "../constant";

const baseApiUrl = SERVICE_URL.url;


export default {
  register(data,success,error){
    axios.post(baseApiUrl + '/pos/user/register',data)
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
    axios.post(baseApiUrl + '/pos/user/login',data)
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
