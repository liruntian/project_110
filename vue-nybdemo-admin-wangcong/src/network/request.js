import axios from "axios"
export function request (config) {
  // 1.创建axios的实例
  const instance = axios.create({
    // baseURL: "http://192.168.1.105:8445/api",
    baseURL: "http://8.140.21.128:8445/api",
    timeout: 30000
  })
  // 2.axios拦截器
  // 2.1.请求拦截
  instance.interceptors.request.use(config => {
    return config
  }, error => {
    // 请求错误处理
    console.log(error)
  })
  // 2.2响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, error => {
    // 响应错误处理
    // console.log(error)
  })
  // 发送真正的网络请求
  return instance(config)
}
