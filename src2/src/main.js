import Vue from 'vue'
import App from './App.vue'
import router from './router' //import router
import store from './store'

Vue.config.productionTip = false

new Vue({
  router, //use router
  store,
  render: h => h(App) //dom'u render et
}).$mount('#app') //ID'si app olan view'de mount et
