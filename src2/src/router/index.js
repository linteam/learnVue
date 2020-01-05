import Vue from 'vue'
import VueRouter from 'vue-router' //vue routier library cagrilir
//Route edilen component'ler View klasoru altina konur.
import EventCreate from '../views/EventCreate.vue'
import EventList from '../views/EventList.vue'
import EventShow from '../views/EventShow.vue'

Vue.use(VueRouter) //Use the router

const routes = [
  {
    path: '/', //url
    name: 'event-list', //name of the route
    component: EventList //component to render
  },
  {
    path: '/event', //url
    name: 'event-show', //name of the route
    component: EventShow //component to render
  },
  {
    path: '/event/create', //url
    name: 'event-create', //name of the route
    component: EventCreate //component to render
  },
  {
    path: '/about-us', //path degistikten sonra eski path'i redirect olarak eklemek mantikli
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
    alias: '/about'
  }
  // { //Redirect ile eski path yonlendirme yapilabilir ya da yukaridaki gibi alias atanir.
  //   path: '/about', //eski path
  //   redirect: { name: 'about' }
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
