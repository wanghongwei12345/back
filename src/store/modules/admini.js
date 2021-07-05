import { userlist,usercount } from "../../request/api"

const state = { 
    list : [],
    //总条数
    total:0,
    //每页条数
    size:2,
    //当前页数
    page:1
}
const mutations = {
    chenglist(state,arr){
        state.list = arr
    },
    chengtotal(state,arr){
        state.total = arr
    },
    chengpage(state,num){
        state.page = num
    }
}

const actions = {
    reqchenglist(context){
        userlist({size:context.state.size,page:context.state.page}).then(res=>{
            let list = res.data.list? res.data.list : []
            if(list.length == 0 && context.state.page>1 ){
                context.commit('chengpage',context.state.page-1)
                context.dispatch('reqchenglist')
            }
            context.commit ("chenglist",list)
        })
    },
    //总条数
    reqchengtotal(context){
        usercount().then(res=>{
            context.commit('chengtotal',res.data.list[0].total)
        })
    },
    reqchegnpage(context,num){
        context.commit ('chengpage',num)
        context.dispatch('reqchenglist')
    }

}



const getters = {
    list(state) {
        return state.list
    },
    total(state){
        return state.total
    },
    size(state){
        return state.size
    }
}

export default {
    state,
    actions,
    mutations,
    getters,
    namespaced: true
}   