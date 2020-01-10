import Vue from 'vue'
import VueRouter from 'vue-router' //vue routier library cagrilir
//Route edilen component'ler View klasoru altina konur.
import EventCreate from '../views/EventCreate.vue'
import EventList from '@/views/EventList.vue'
import EventShow from '@/views/EventShow.vue'
import NetworkIssue from '@/views/NetworkIssue.vue'
import NProgress from 'nprogress'
import Example from '@/views/Example.vue'
Vue.use(VueRouter) //Use the router
import store from '@/store'
import NotFound from '@/views/NotFound.vue'

const routes = [
  {
    path: '/', //url
    name: 'event-list', //name of the route
    component: EventList, //component to render
    props: true
  },
  {
    path: '/event/:id', //url
    name: 'event-show', //name of the route
    component: EventShow, //component to render
    props: true, //bu sayede degiskenler props olarak yollanabilir
    beforeEnter(to, from, next) {
      store
        .dispatch('event/fetchEvent', to.params.id)
        .then(event => {
          //NProgress.done()
          to.params.event = event //yukarida props true dememiz onemli
          next()
        })
        .catch(error => {
          console.log('Error Code: ', error.message)
          if (error.response && error.response.status === 404)
            next({ name: '404', params: { resource: 'event' } })
          else next({ name: 'network-issue' })
        })
    }
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
  },
  // { //Redirect ile eski path yonlendirme yapilabilir ya da yukaridaki gibi alias atanir.
  //   path: '/about', //eski path
  //   redirect: { name: 'about' }
  // }
  // {path:'*', component: NotFoundComponent}
  {
    path: '/404',
    name: '404',
    component: NotFound,
    props: true
  },
  { path: '/example', name: 'example', component: Example },
  { path: '/network-issue', name: 'network-issue', component: NetworkIssue },
  {
    path: '*',
    redirect: { name: 404, params: { resource: 'page' } }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})
router.afterEach(() => {
  NProgress.done()
})
export default router
