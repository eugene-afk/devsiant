import axios from 'axios'
import { baseURL } from './baseURL'

export default (history = null) => {
  const URL = baseURL
  let headers = {accept: 'application/json'}

  if (localStorage.token) {
    headers.Authorization = `Bearer ${localStorage.token}`;
  }

  const axiosInstance = axios.create({
    baseURL: URL,
    headers: headers
})

axiosInstance.interceptors.response.use(function (response) {
    return response
  }, function (error) {
    if (error.response.status === 401) {
      localStorage.removeItem('token')
      if(history){
         history.push("/login")

      }
      // else{
      //   window.open('/login')
      // }
    }
    if (error.response.status === 429) {
    
    }
    return Promise.reject(error)
  })

  return axiosInstance
}
