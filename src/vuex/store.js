import Vue from 'vue'
import Vuex from  'vuex'
Vue.use(Vuex);

const state={
  username:''
}

const mutations={
  add(state,n){
      state.username = n;
  }
}

export default new Vuex.Store({
  state,
  mutations
})
