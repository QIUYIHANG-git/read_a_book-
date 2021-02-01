import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
// 导入uview-ui
import uView from "uview-ui";
Vue.use(uView);
//vuex状态管理器
import store from './store/index.js'
Vue.prototype.$store = store;
// 网络请求
import ureq from './http/request.js'
Vue.prototype.$ureq = ureq;
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
 