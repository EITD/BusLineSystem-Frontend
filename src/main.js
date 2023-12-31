import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts

axios.defaults.baseURL = 'http://localhost:8080'
Vue.prototype.$axios = axios
// 将API方法绑定到全局

Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
