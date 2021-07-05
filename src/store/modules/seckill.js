import { secklist } from "../../request/api"


const state = {
    list:[]
}

const mutations ={
    chenglist(state,arr){
        state.list = arr
    }
}

const actions = {
    reqchenglist(context){
        secklist().then(res=>{
            let list = res.data.list?res.data.list : []
            context.commit('chenglist',list)
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