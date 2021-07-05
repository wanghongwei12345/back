
export const state = {
    user: sessionStorage.getItem("user")?JSON.parse(sessionStorage.getItem("user")):{}
  }
  
  export const mutations = {
    changeUser(state,obj){
      state.user = obj
    }
  }
  
  export const getters = {
    user(state){
      return state.user
    }
  }