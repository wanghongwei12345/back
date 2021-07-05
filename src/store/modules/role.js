import { rolelist } from "../../request/api"


const state = {
    list:[]
}

const mutations ={
    changlist(state,arr){
        state.list = arr
    }
}

const actions = {
    reqchanglist(context){
        rolelist().then(res=>{
            let list = res.data.list?res.data.list : []
            context.commit('changlist',list)
        })
    }
}

const getters = {
    list(state){
        return state.list
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}