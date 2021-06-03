import axios from 'axios'

// create an axios instance
const service = axios.create({
  baseURL: 'http://zxctb.top/restful',
  timeout: 30000,
})

// request interceptor
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data

    // if the custom code is not 0, it is judged as an error.
    if(res.code !== 0){
      // message.error(res.message || 'Error')
      return Promise.reject(res || new Error('Error'))
    }else{
      return res
    }
  },
  error => {
    // message.error(error.response.data.message || error.message || 'Error')
    return Promise.reject(error)
  }
)

export default service
