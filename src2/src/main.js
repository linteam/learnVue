import Vue from 'vue'
import App from './App.vue'
import router from './router' //import router
import store from './store'
//Global Components
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
  './components', //Components dosyasi icinde ara
  false, //sub directory'leri arama
  /Base[A-Z]\w+\.(vue|js)$/ //arayacagin sey Base ile baslayan vue ya da js ile biten dosyalar
)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  //BaseSecond haline getiriyor.
  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'))
  )
  //
  Vue.component(componentName, componentConfig.default || componentConfig)
})

Vue.config.productionTip = false

new Vue({
  router, //use router
  store,
  render: h => h(App) //dom'u render et
}).$mount('#app') //ID'si app olan view'de mount et
