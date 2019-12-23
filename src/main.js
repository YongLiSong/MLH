import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Router from 'vue-router'
import MintUI, { InfiniteScroll } from 'mint-ui'
// ----引入mintUI
import 'mint-ui/lib/style.css'

Vue.use(InfiniteScroll)
Vue.config.productionTip = false

// 解决router模块的兼容性问题
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(MintUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
