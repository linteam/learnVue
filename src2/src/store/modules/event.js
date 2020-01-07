import EventService from '@/services/EventService.js'

//Actions, Mutations ve Getters her zaman global namespace'de register edilirler...
//Birden fazla ayni isimde action varsa ornegin farkli modullerde hepsini cagirir?
//Asagidaki satirla tum mutations, actions ve getters event namespace'ini alir.
//Bu yuzden cagirdiklarimizi evet/actionName seklinde dispatch etmeliyiz.
export const namespaced = true

//2 cesit Vuex Module Syntax var,
//1- Exporting Constant - Burada uygulanan; state,mutations, actions, getters hepsini export ediyorsun.
//--Bunun avantaji private methods ve private'a izin verir
//2- Exporting one Object export default { state:{...}, mutations:{...}, actions:{...}, getters{...}}

export const state = {
  events: [],
  eventsTotal: 0,
  event: {}
}
//Mutations should not be called from other Vuex Modules
//Mutations should only be called from Actions inside the current module
export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENTS(state, events) {
    state.events = events
  },
  SET_EVENTS_TOTAL(state, eventsTotal) {
    state.eventsTotal = eventsTotal
  },
  SET_EVENT(state, event) {
    state.event = event
  }
}
export const actions = {
  createEvent({ commit, rootState }, event) {
    //Diger bir konu bir modul digerinin state'ine nasil erisir?
    //Yukari commit yanina state ekleyip asagidaki gibi cagirmak ise yaramaz cunku bu local state
    //console.log('User creating Event is: ' + state.user.user.name)
    //Bunun yerine rootState ile baseState'e ulasabiliriz.
    //rootstate -> user module -> user state -> name property
    console.log('User creating Event is: ' + rootState.user.user.name)

    //Diger modulun action'ini buradan nasil dispatch ederiz?
    //Yukari dispatch ekleyip; dispatch('actionInUser',null,{root:true}) seklinde cagirmak ise yarar cunku
    //Actions, Mutations ve Getters her zaman global namespace'de register edilirler...

    return EventService.postEvent(event).then(() => {
      commit('ADD_EVENT', event)
    })
  },
  fetchEvents({ commit }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then(response => {
        commit('SET_EVENTS_TOTAL', parseInt(response.headers['x-total-count']))
        commit('SET_EVENTS', response.data)
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })
  },
  fetchEvent({ commit, getters }, id) {
    //Eger daha once cekilmisse ordan aliyoruz.
    var event = getters.getEventById(id)

    if (event) {
      commit('SET_EVENT', event)
    } else {
      EventService.getEvent(id)
        .then(response => {
          commit('SET_EVENT', response.data)
        })
        .catch(error => {
          console.log('There was an error:', error.response)
        })
    }
  }
}
export const getters = {
  getEventById: state => id => {
    return state.events.find(event => event.id === id)
  }
}
