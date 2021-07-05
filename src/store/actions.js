export const actions ={
    reqChangeUser(context,obj){
        // 1、将用户信息派发给mutations，mutations把用户信息存起来
        context.commit("changeUser",obj)
    
        if(obj.token){
          // 如果token存在说明你刚才是登录的操作
          // 将用户信息存储到本地
          sessionStorage.setItem("user",JSON.stringify(obj))
        }else{
          // 如果token不存在说明你刚才是退出的操作
          // 删除本地存储的用户信息
          sessionStorage.removeItem("user")
        }
      }
}