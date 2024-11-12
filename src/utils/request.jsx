//axios的封装处理
import axios from "axios";
import { getToken, removeToken } from "./token";


//1. 根域名配置
//2. 超时时间
const request = axios.create({
    baseURL:'http://localhost:3000/',
    timeout:3000,
})

//3. 请求拦截器 -> 在请求发送之前 做拦截，插入自定义的配置
request.interceptors.request.use(
  function (config) {
  //操作config 注入token数据
  //1. 获取token
  //2. 按照后端格式要求，进行token拼接
    const token = getToken()
    if(token){
      config.headers.Authorization = `Bearer ${token}`
    }
    return config;
  }, (error) => {
    
    return Promise.reject(error);
  })

//4. 响应拦截器 -> 在响应返回到客户端之前 做拦截，重点处理返回的数据
request.interceptors.response.use(
  function (response) {
   
    return response;
  }, (error) => {
    if(error.response){
      const status = error.response.status;
      console.log("Response status: ", status)

      if(status === 401)
      {
        removeToken()
        window.location.href = "/login"
      }
    }
    return Promise.reject(error)
  })

export{ request }