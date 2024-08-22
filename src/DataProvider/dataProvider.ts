import axios from "axios";

console.log(process.env)

export class DataProvider{
  
  get(type:string, offset:number = 0, limit:number = 5)
  {
    return axios.get(`${process.env.REACT_APP_API_URL}/${type}?offset=${offset}&limit=${limit}`);
  }

  getOne(type:string, id:number)
  {
    return axios.get(`${process.env.REACT_APP_API_URL}/${type}/${id}`);
  }

  updateOne(type:string, data:any)
  {
    return axios.put(`${process.env.REACT_APP_API_URL}/${type}/${data.id}`, data);
  }

  createOne(type:string, data:any)
  {
    return axios.post(`${process.env.REACT_APP_API_URL}/${type}`, data);
  }

  deleteOne(type:string, id:number)
  {
    return axios.delete(`${process.env.REACT_APP_API_URL}/${type}/${id}`);
  }
}
