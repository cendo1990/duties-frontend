import axios from "axios";

console.log(process.env)

export class DataProvider{
  
  get(type:string)
  {
    return axios.get(`${process.env.REACT_APP_API_URL}/${type}`);
  }
}
