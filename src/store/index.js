import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import {actions} from './actions'
import { mutations,state,getters } from './mutations'
import menu from './modules/menu'
import role from './modules/role'
import admini from './modules/admini'
import classify from './modules/classify'
import commod from './modules/commod'
import speci from './modules/speci'
import banner from './modules/banner'
import seckill from './modules/seckill'
import member from './modules/member'


export default new Vuex.Store({
  state,
  actions,
  mutations,
  state,
  getters,
  modules:{
    menu,
    role,
    admini,
    classify,
    commod,
    speci,
    banner,
    seckill,
    member
  }
})
