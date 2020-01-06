import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
//Global Storage
export default new Vuex.Store({
  state: {
    //Buradaki verileri her component'ten ulasabiliriz.
    //$store.state.user.name gibi
    user: { id: 'abd123', name: 'Hakan Pekdemir' },
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ],
    activities: [
      { id: 1, title: 'Tiyatro' },
      { id: 2, title: 'Sinema' }
    ]
  },
  mutations: {},
  actions: {},
  getters: {
    catLength: state => {
      return state.categories.length
    },
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    //getters icinde getters kullanabilirsin
    activeTodosCount: (state, getters) => {
      return state.todos.length - getters.doneTodos.length
      //return state.todos.filter(todo => !todo.done).length
    },
    getActivityById: state => id => {
      return state.activities.find(activity => activity.id === id)
    }
  },
  modules: {}
})
