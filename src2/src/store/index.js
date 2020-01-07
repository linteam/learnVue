import Vue from 'vue'
import Vuex from 'vuex'
//Modules bu sekilde import edilmeli
//* ile bu namespace'deki tum public item'lari user olarak import et demis oluyoruz.
import * as user from '@/store/modules/user.js'
import * as event from '@/store/modules/event.js'
import * as notification from '@/store/modules/notification.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    //Store modullerini bu sekilde vererek kod yonetimini kolaylastirdik.
    user,
    event,
    notification
  },
  state: {
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ]
  }
})
