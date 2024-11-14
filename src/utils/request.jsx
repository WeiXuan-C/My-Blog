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
    // 获取 token
    const token = getToken();
    
    // 定义正则表达式，确保 token 以 ":wx" 结尾
    const regex = /wx$/;
    
    // 判断 token 是否符合格式
    if (token) {
      if (regex.test(token)) {
        // 如果包含 ":wx"，则设置 Authorization
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        // 如果没有 ":wx" 部分，删除 token 并重定向到登录页面
        removeToken();
        window.location.href = "/login";
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


//4. 响应拦截器 -> 在响应返回到客户端之前 做拦截，重点处理返回的数据
request.interceptors.response.use(
  function (response) {
    return response;
  }, (error) => {
    return Promise.reject(error)
  })

export{ request }