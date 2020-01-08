<template>
  <div>
    <h1>Events for {{ user.user.name }}</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />
    <template v-if="page != 1">
      <router-link :to="{ name: 'event-list', query: { page: page - 1 } }" rel="prev">Prev Page</router-link>
      <template v-if="hasNextPage">|</template>
    </template>
    <!-- Next'e tiklayip bir sonraki sayfaya navigate ettiginde Vue ayni sayfada oldugu icin
    component'i reload etmez. Bunun icin;
    1. Yontem: watch the page computed property and call fetchEvent what it changes
    2. Yontem: reload components when the URL changes, including query parameters
    -->
    <router-link
      v-if="hasNextPage"
      :to="{ name: 'event-list', query: { page: page + 1 } }"
      rel="next"
    >Next Page</router-link>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex'
import store from '@/store'

function getPageEvents(to, next) {
  const currentPage = parseInt(to.query.page) || 1
  store
    .dispatch('event/fetchEvents', {
      page: currentPage
    })
    .then(() => {
      to.params.page = currentPage
      next()
    })
}
export default {
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  components: {
    EventCard
  },
  //EventList'de EventShow gibi Vuex i kaldirmadik, bunlari router kisminda tanimlamadik.
  //Oyle de olabilirdi tercih meselesi.
  beforeRouteEnter(to, from, next) {
    getPageEvents(to, next)
  },
  beforeRouteUpdate(to, from, next) {
    //Pagination sebebiyle ayni component uzerindeki route'i yakalamak icin.
    getPageEvents(to, next)
  },
  created() {
    this.perPage = 3 // Setting perPage here and not in data means it won't be reactive.
    // We don't need it to be reactive, and this way our component has access to it.
  },
  computed: {
    hasNextPage() {
      return this.event.eventsTotal > this.page * this.event.perPage
    },
    ...mapState(['event', 'eventsTotal', 'user'])
  }
}
</script>
