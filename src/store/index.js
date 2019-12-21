import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    navId: ''
  },
  mutations: {
    getNavId (state, id) {
      state.navId = id
    }

  },
  actions: {

  },
  modules: {
  }
})
