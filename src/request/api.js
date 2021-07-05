import {get, post} from "./http"

//==========================================菜单管理======================================
//添加
export const menuadd = (params) => post('/api/menuadd',params)
//列表
export const menulist = (params) => get('/api/menulist',params)
//删除
export const menudelete   = (params) =>post ('/api/menudelete',params)
//获取一条信息
export const menuinfo = (params) =>get ('/api/menuinfo',params)
//编辑
export const menuedit  = (params) =>post ('/api/menuedit',params)

//==========================================角色管理======================================
//添加
export const roleadd  = (params) => post('/api/roleadd',params)
//列表
export const rolelist = () => get('/api/rolelist')
//删除
export const roledelete = (params) => post('/api/roledelete',params)
//获取一条信息
export const roleinfo = (params) => get('/api/roleinfo',params)
//编辑
export const roleedit = ( params) => post ('/api/roleedit',params)

//==========================================管理员管理======================================
//添加
export const useradd  = (params) => post('/api/useradd',params)
//列表
export const userlist = (params) => get('/api/userlist',params)
//删除
export const userdel = (params) => post('/api/userdelete',params)
//总条数
export const usercount =() =>get('/api/usercount')
//获取一条信息
export const userinfo  = (params) => get('/api/userinfo',params)
//编辑
export const useredit = (params) => post('/api/useredit',params)
//登录
export const userlogin = (params) =>post('/api/userlogin',params)

//==========================================商品分类管理======================================
//添加
export const cateadd = (params) => post('/api/cateadd',params,true)
//列表
export const catelist = (params) => get('/api/catelist',params)
//删除
export const catedelete   = (params) =>post ('/api/catedelete',params)
//获取一条信息
export const cateinfo = (params) =>get ('/api/cateinfo',params)
//编辑
export const cateedit  = (params) =>post ('/api/cateedit',params,true)

//==========================================商品规格======================================
//添加
export const specsadd  = (params) => post('/api/specsadd',params)
//列表
export const specslist = (params) => get('/api/specslist',params)
//删除
export const specsdel = (params) => post('/api/specsdelete',params)
//总条数
export const specscount =() =>get('/api/specscount')
//获取一条信息
export const specsinfo  = (params) => get('/api/specsinfo',params)
//编辑
export const specsedit = (params) => post('/api/specsedit',params)

//==========================================商品管理======================================
//添加
export const goodsadd  = (params) => post('/api/goodsadd',params,true)
//列表
export const goodslist = (params) => get('/api/goodslist',params)
//删除
export const goodsdel = (params) => post('/api/goodsdelete',params)
//总条数
export const goodscount =() =>get('/api/goodscount')
//获取一条信息
export const goodsinfo  = (params) => get('/api/goodsinfo',params)
//编辑
export const goodsedit = (params) => post('/api/goodsedit',params,true)

//==========================================轮播图管理======================================
//添加
export const banneradd = (params) => post('/api/banneradd',params,true)
//列表
export const bannerlist = () => get('/api/bannerlist')
//删除
export const bannerdelete   = (params) =>post ('/api/bannerdelete',params)
//获取一条信息
export const bannerinfo = (params) =>get ('/api/bannerinfo',params)
//编辑
export const banneredit  = (params) =>post ('/api/banneredit',params,true)

//==========================================秒杀活动======================================
//添加
export const seckadd = (params) => post('/api/seckadd',params)
//列表
export const secklist = () => get('/api/secklist')
//删除
export const seckdelete   = (params) =>post ('/api/seckdelete',params)
//获取一条信息
export const seckinfo = (params) =>get ('/api/seckinfo',params)
//编辑
export const seckedit  = (params) =>post ('/api/seckedit',params)

//==========================================会员======================================
//添加
export const register = (params) => post('/api/register',params)


//列表
export const memberlist = () => get('/api/memberlist')

//获取一条信息
export const memberinfo = (params) =>get ('/api/memberinfo',params)
//编辑
export const memberedit  = (params) =>post ('/api/memberedit',params)