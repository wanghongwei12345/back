import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store/index"

Vue.use(VueRouter)
function fn(msg,next){
  let routeEnter = store.state.user.menus_url
  if(routeEnter.includes(msg)){
    next()
  }else{
    next("/")
  }
}

export const menurouter = [{
  path:'admini',
  meta:{
    title:"管理员管理"
  },
  beforeEnter(to,from,next){
    fn("/admini",next)
  },
  component:()=>import ('../page/admini/admini')
},{
  path:'banner',
  meta:{
    title:"轮播图管理"
  },
  beforeEnter(to,from,next){
    fn("/banner",next)
  },
  component:()=>import ('../page/banner/banner')
},{
  path:'classify',
  meta:{
    title:"商品分类"
  },
  beforeEnter(to,from,next){
    fn("/classify",next)
  },
  component:()=>import ('../page/classify/classify')
},{
  path:'commod',
  meta:{
    title:"商品规格"
  },
  beforeEnter(to,from,next){
    fn("/commod",next)
  },
  component:()=>import ('../page/commod/commod')
},{
  path:'member',
  meta:{
    title:"会员管理"
  },
  beforeEnter(to,from,next){
    fn("/member",next)
  },
  component:()=>import ('../page/member/member')
},{
  path:'menu',
  meta:{
    title:"菜单管理"
  },
  beforeEnter(to,from,next){
    fn("/menu",next)
  },
  component:()=>import ('../page/menu/menu')
},{
  path:'role',
  meta:{
    title:"角色管理"
  },
  beforeEnter(to,from,next){
    fn("/role",next)
  },
  component:()=>import ('../page/role/role')
},{
  path:'seckill',
  meta:{
    title:"秒杀活动"
  },
  beforeEnter(to,from,next){
    fn("/seckill",next)
  },
  component:()=>import ('../page/seckill/seckill')
},{
  path:'speci',
  meta:{
    title:"商品管理"
  },
  beforeEnter(to,from,next){
    fn("/speci",next)
  },
  component:()=>import ('../page/speci/speci')
}]

const routes = [
 {
   path :'/login',
   component:()=>import ('../page/login/login.vue')
 },{
   path :'/',
   component:()=>import ('../page/index/index.vue'),
   children:[{
     path:'',
     meta:{
      title:""
    },
     component:()=>import ('../page/home/home.vue')
   },
    ... menurouter 
  ]
 }
]




const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next)=>{
  if(to.path == '/login'){
    next()
    return
  }
  if(store.state.user.token){
    next()
    return
  }
  next('/login')
})
export default router
