import axios from 'axios'

// create an axios instance
const service = axios.create({
  baseURL: '/restful',
  timeout: 30000,
})

if(process.env.NODE_ENV === 'development' && process.env.VUE_ENV === 'server'){
  service.defaults.baseURL = process.env.API_BASE_URL
}

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
      return Promise.reject(res || new Error('Error'))
    }else{
      return res
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
