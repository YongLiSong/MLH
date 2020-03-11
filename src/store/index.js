import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    bannerlist: [],
    searchlistisShow: false,
    allShow: true,
    indexList: []
  },
  mutations: {
    geibannerid (state, bannerlist) {
      state.bannerlist = bannerlist
    },
    opensearch (state) {
      state.searchlistisShow = true
      state.allShow = false
    },
    closesearch (state) {
      state.searchlistisShow = false
      state.allShow = true
    }
  },
  actions: {
    getNavId (store, id) {
      Axios({
        url: `http://www.meihigo.hk/appapi/silo/eventForH5?categoryId=${id}&pageIndex=1&timestamp=1577415486052&summary=90ae005cbed75895bae8c6dc0a72892f&platform_code=H5`
      }).then(res => {
        store.commit('geibannerid', res.data.eventList)
        console.log(res.data.eventList)
      })
    }
  },
  modules: {
  }
})
