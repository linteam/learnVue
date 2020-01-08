<template>
  <div>
    <div class="event-header">
      <span class="eyebrow">@{{ event.time }} on {{ event.date }}</span>
      <h1 class="title">{{ event.title }}</h1>
      <h5>Organized by {{ event.organizer ? event.organizer.name : '' }}</h5>
      <h5>Category: {{ event.category }}</h5>
    </div>
    <BaseIcon name="map">
      <h2>Location</h2>
    </BaseIcon>
    <address>{{ event.location }}</address>
    <h2>Event details</h2>
    <p>{{ event.description }}</p>
    <h2>
      Attendees
      <span class="badge -fill-gradient">
        {{
        event.attendees ? event.attendees.length : 0
        }}
      </span>
    </h2>
    <ul class="list-group">
      <li v-for="(attendee, index) in event.attendees" :key="index" class="list-item">
        <b>{{ attendee.name }}</b>
      </li>
    </ul>
  </div>
</template>

<script>
//import { mapState } from 'vuex'
//import NProgress from 'nprogress'
//import store from '@/store'
export default {
  props: {
    //Vuex'i burdan kaldirdim event'i routes'dan prop ile verdim.
    event: { type: Object, required: true }
  },

  //Start islemini router'a almak 2. yontem
  // beforeRouteEnter(routeTo, routeFrom, next) {
  //   // called before the route that renders this component is confirmed.
  //   // does NOT have access to `this` component instance,
  //   // because it has not been created yet when this guard is called!
  //   // windows.confirm() ile ayrilmak istediginize emin misiniz sorusu sorulabilir.
  //   // cevaba gore next() ya da next(false) denebilir.

  //   //Start islemini beforeEach isine tasimak ilk yontem
  //   //NProgress.start()
  //   //this'e erisimimiz yok this.fetchevent diyemeyiz.
  //   //bunun icin yukari store'u import ediyoruz.
  //   store.dispatch('event/fetchEvent', routeTo.params.id).then(() => {
  //     //NProgress.done()
  //     next()
  //   })
  // },
  // beforeRouteUpdate(routeTo, routeFrom, next) {
  //   // called when the route that renders this component has changed,
  //   // but this component is reused in the new route.
  //   // For example, for a route with dynamic params `/foo/:id`, when we
  //   // navigate between `/foo/1` and `/foo/2`, the same `Foo` component instance
  //   // will be reused, and this hook will be called when that happens.
  //   // has access to `this` component instance.
  // },
  // beforeRouteLeave(routeTo, routeFrom, next) {
  //   // called when the route that renders this component is about to
  //   // be navigated away from.
  //   // has access to `this` component instance.
  // },
  created() {
    //this.$store.dispatc('event/fetchEvent',this.id)
    //this.fetchEvent(this.id) buna ihtiyac yok burda
  },
  // computed: mapState({
  //   event: state => state.event.event
  // }),
  methods: {
    //...mapActions(['event/fetchEvent'])
    //event namespace,fetchEvent action to map
    //...mapActions('event', ['fetchEvent'])
  }
}
</script>

<style scoped>
.location {
  margin-bottom: 0;
}
.location > .icon {
  margin-left: 10px;
}
.event-header > .title {
  margin: 0;
}
.list-group {
  margin: 0;
  padding: 0;
  list-style: none;
}
.list-group > .list-item {
  padding: 1em 0;
  border-bottom: solid 1px #e5e5e5;
}
</style>
