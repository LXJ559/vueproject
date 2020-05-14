import  axios from 'axios'
import { SERVICE_URL} from "../constant";

const baseApiUrl = SERVICE_URL.url;

export default {
  getOrder(success,error){
    axios.get(baseApiUrl + '/pos/getorder')
      .then((res)=>{
        console.log(res);
        success(res);
      },(e)=>{
        error(e);
      })
      .catch((err)=>{console.log(err)})
  }
}
