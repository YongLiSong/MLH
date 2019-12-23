import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    bannerlist: [],
    searchlistisShow: false,
    allShow: true
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
        url: `http://www.meihigo.hk/appapi/home/mktBannerApp/v3?silo_id=${id}&platform_code=PLATEFORM_H5`
      }).then(res => {
        store.commit('geibannerid', res.data.banners)
      })
    }
  },
  modules: {
  }
})
