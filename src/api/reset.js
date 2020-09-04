import axios from 'axios'
import { SERVICE_URL} from "../constant";

const baseApiUrl = SERVICE_URL.url;

export default {
  reset(data,success,error){
    axios.post(baseApiUrl + '/pos/user/reset',data)
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
