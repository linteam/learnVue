<template>
  <!-- <div>
    <h1>Create an Event, {{ user.name }}</h1>
    <p>There are {{ catLength }} categories</p>
    <ul>
      <li v-for="cat in categories" :key="cat">{{ cat }}</li>
    </ul>
    <p>This event was created by {{ user.id }}</p>
    <p>Activity: {{ getActivityById(1).title }}</p>
    <input type="number" v-model.number="incrementBy" />
    <button @click="incrementCount">Increment</button>
    <p>{{ $store.getters.count }}</p>
  </div>-->
  <form @submit.prevent="createEvent">
    <label>Select a category</label>
    <select v-model="event.category">
      <option v-for="cat in categories" :key="cat">{{ cat }}</option>
    </select>
    <h3>Name & describe your event</h3>
    <div class="field">
      <label>Title</label>
      <input
        v-model="event.title"
        type="text"
        placeholder="Add an event title"
      />
    </div>
    <div class="field">
      <label>Description</label>
      <input
        v-model="event.description"
        type="text"
        placeholder="Add a description"
      />
    </div>
    <h3>Where is your event?</h3>
    <div class="field">
      <label>Location</label>
      <input
        v-model="event.location"
        type="text"
        placeholder="Add a location"
      />
    </div>
    <h3>When is your event?</h3>
    <div class="field">
      <label>Date</label>
      <datepicker v-model="event.date" placeholder="Select a date" />
    </div>
    <div class="field">
      <label>Select a time</label>
      <select v-model="event.time">
        <option v-for="time in times" :key="time">{{ time }}</option>
      </select>
    </div>
    <input type="submit" class="button -fill-gradient" value="Submit" />
  </form>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Datepicker from 'vuejs-datepicker'
//import EventService from '@/services/EventService'
export default {
  //computed: mapState(['user', 'categories']) //VERSION 4
  //local computed icin spread operator kullanabilirsin
  computed: {
    catLength() {
      //return this.$store.categories.length
      return this.$store.getters.catLength
    },
    ...mapGetters(['getEventById']),
    // getActivity() { //METHOD 1
    //   return this.$store.getters.getActivityById
    // },
    ...mapState(['user', 'categories'])
    // computed: mapState({ //VERSION 3
    //   user: 'user',
    //   categories: 'categories'
    // })
    // computed: mapState({ //VERSION 2
    //   username: state => state.user.name,
    //   userID: state => state.user.ID,
    //   categories: state => state.categories
    // })
    //computed: { //VERSION 1
    //   username() {
    //     //Global nesneyi bu component icinde birden cok yerde kullanmak icin buraya koyabiliriz.
    //     return this.$store.state.user.name
    //   },
    //   userID() {
    //     return this.$store.state.user.id
    //   }
    // }
  },
  data() {
    const times = []
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00')
    }
    return {
      event: this.createFreshEventObject(),
      times,
      incrementBy: 10
    }
  },
  methods: {
    createEvent() {
      this.$store
        .dispatch('event/createEvent', this.event)
        .then(() => {
          this.$router.push({
            name: 'event-show',
            params: { id: this.event.id }
          })
          this.event = this.createFreshEventObject()
        })
        .catch(() => {
          console.log('There was a problem creating your event')
        })
    },
    incrementCount() {
      //this.$store.commit('INCREMENT_COUNT', this.incrementBy)
      //Direkt mutations cagirmak yerine action cagiririz
      this.$store.dispatch('updateCount', this.incrementBy)
    },
    createFreshEventObject() {
      const user = this.$store.state.user
      const id = Math.floor(Math.random() * 10000000)

      return {
        id: id,
        user: user,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: []
      }
    }
  },
  components: {
    Datepicker
  }
}
</script>

<style lang="css" scoped>
.field {
  margin-bottom: 24px;
}
</style>
