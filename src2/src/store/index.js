import Vue from 'vue'
import Vuex from 'vuex'
import EventService from '@/services/EventService'
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
    events: [],
    count: 0
  },
  mutations: {
    //can update/mutate Vuex State
    INCREMENT_COUNT(state, value) {
      state.count += value
    },
    ADD_EVENT(state, event) {
      state.events.push(event)
    }
  },
  actions: {
    //Mutations synchronous, Actions are asynchronous
    //Always put mutations within Actions
    //Ilk degisken contect object, onu destructring ile aliyoruz.
    updateCount({ state, commit }, value) {
      if (state.user) {
        commit('INCREMENT_COUNT', value)
      }
    },
    createEvent({ commit }, event) {
      return EventService.postEvent(event).then(() => {
        commit('ADD_EVENT', event)
      })
    }
  },
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
    getEventById: state => id => {
      return state.events.find(event => event.id === id)
    },
    count: state => {
      return state.count
    }
  },
  modules: {}
})
