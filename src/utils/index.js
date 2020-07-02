import axios from 'axios'
import router from '../router'
import JSONBig from 'json-bigint'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
axios.defaults.transformResponse = [function (data) {
  return data ? JSONBig.parse(data) : {}
}]
// 请求拦截器
axios.interceptors.request.use(function (config) {
  const token = window.localStorage.getItem('user-token')
  config.headers.Authorization = `Bearer ${token}`

  return config
}, function (error) {
  return Promise.reject(error)
})
// 响应拦截器
axios.interceptors.response.use(function (response) {
  return response.data ? response.data : {}
},

function (error) {
  if (error.response.status === '401') {
    localStorage.removeItem('user-token')
    router.push('/login')
  }
  return Promise.reject(error)
})
export default axios
