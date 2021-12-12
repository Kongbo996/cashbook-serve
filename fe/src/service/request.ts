import axios, { HeadersDefaults, AxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'
import { Toast } from 'zarm'

const MODE = import.meta.env.MODE // 环境变量

type HeaderProps = HeadersDefaults & { 'X-Requested-With' : string, Authorization: string }

const AxiosHeaders =  axios.defaults.headers as HeaderProps
axios.defaults.baseURL = MODE === 'development' ? '' : 'http://api.chennick.wang'
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/json'
AxiosHeaders['X-Requested-With'] = 'XMLHttpRequest'
AxiosHeaders['Authorization'] = `${Cookies.get('token') || null}`

axios.interceptors.response.use(res => {
  if(typeof res.data !== 'object'){
    Toast.show('服务端异常')
    return Promise.reject(res)
  }
  if(res.headers['token']) {
    Cookies.set('token', res.headers['token'], { expires: 1 })
  }
  console.log(res, '123')
  if(res.data.code !== 200 ){
    if(res.data.msg) Toast.show(res.data.msg)
    if(res.data.code === 401) {
      Toast.show('登录信息已失效，请重新登录')
      window.location.href = '/login'
    }
    return Promise.reject(res.data)
  }
  return res.data
})
export default axios 