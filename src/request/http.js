import Vue from "vue"
import axios from "axios"
import qs from "qs"

// 开发环境
if (process.env.NODE_ENV === "development") {
  Vue.prototype.$pre = "http://localhost:3000"
}
// 生产环境
if (process.env.NODE_ENV === "production") {
  Vue.prototype.$pre = ""
}

// 请求拦截器
axios.interceptors.request.use((config) => {
  console.log("===请求拦截器开始===");
  console.log(config);
  console.log("===请求拦截器结束===");
  return config
})
// 响应拦截器
axios.interceptors.response.use((res) => {
  console.log("===响应拦截器开始===");
  console.log(res);
  console.log("===响应拦截器结束===");
  return res
})

/* 
  封装get请求
  url：请求地址
  params：参数
*/
export let get = (url, params = {}) => {
  return new Promise((resolve,reject)=>{
    axios.get(url, {
      params: params
    }).then(res=>{
      resolve(res)
    }).catch(err=>{
      reject(err)
    })
  })
}

/* 
   封装post请求
   url：请求地址
   params：参数
   isFile：是否是文件
*/
export let post = (url,params,isFile = false)=>{
  let data = null
  if(isFile){
    data = new FormData()
    for(let i in params){
      data.append(i,params[i])
    }
  }else{
    data = qs.stringify(params)
  }
  return new Promise((resolve,reject)=>{
    axios.post(url,data).then(res=>{
      resolve(res)
    }).catch(err=>{
      reject(err)
    })
  })
}