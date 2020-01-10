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
    <BaseSelect
      label="Select a category"
      :options="categories"
      v-model="event.category"
      :class="{ error: $v.event.category.$error }"
      @blur="$v.event.category.$touch()"
    />
    <template v-if="$v.event.category.$error">
      <!-- Hata mesajini field -> invalid ve dirty ise gostermek istiyoruz -->
      <p v-if="!$v.event.category.required" class="errorMessage">
        Category is required
      </p>
    </template>
    <h3>Name & describe your event</h3>
    <!-- v-model input event'ini dinler
    ve payload'u event.title'a atar.
    -->
    <BaseInput
      label="Title"
      v-model="event.title"
      type="text"
      placeholder="Add a title"
      class="field"
      :class="{ error: $v.event.title.$error }"
      @blur="$v.event.title.$touch()"
    />
    <template v-if="$v.event.title.$error">
      <p v-if="!$v.event.title.required" class="errorMessage">
        Title is required
      </p>
    </template>
    <BaseInput
      label="Description"
      v-model="event.description"
      type="text"
      placeholder="Add a description"
      class="field"
      :class="{ error: $v.event.description.$error }"
      @blur="$v.event.description.$touch()"
    />
    <template v-if="$v.event.description.$error">
      <p v-if="!$v.event.description.required" class="errorMessage">
        Description is required
      </p>
    </template>
    <h3>Where is your event?</h3>
    <BaseInput
      label="Location"
      v-model="event.location"
      type="text"
      placeholder="Add a location"
      class="field"
      :class="{ error: $v.event.location.$error }"
      @blur="$v.event.location.$touch()"
    />
    <template v-if="$v.event.location.$error">
      <p v-if="!$v.event.location.required" class="errorMessage">
        Location is required
      </p>
    </template>
    <h3>When is your event?</h3>
    <div class="field">
      <label>Date</label>
      <!-- vue js date picker input-class ve opened sunuyor. 
      opened ya da closed iyi calismiyor maalesef -->
      <datepicker
        v-model="event.date"
        placeholder="Select a date"
        :input-class="{ error: $v.event.date.$error }"
        @opened="dateOpened"
      />
    </div>
    <template v-if="$v.event.date.$error">
      <p v-if="!$v.event.date.required" class="errorMessage">
        Date is required.
      </p>
    </template>

    <BaseSelect
      label="Select a time"
      :options="times"
      v-model="event.time"
      class="field"
      :class="{ error: $v.event.time.$error }"
      @blur="$v.event.time.$touch()"
    />
    <template v-if="$v.event.time.$error">
      <p v-if="!$v.event.time.required" class="errorMessage">
        Time is required
      </p>
    </template>
    <!-- <input type="submit" class="button -fill-gradient" value="Submit" /> -->
    <BaseButton
      type="submit"
      buttonClass="-fill-gradient"
      :disabled="$v.$anyError"
      >Submit</BaseButton
    >
    <p v-if="$v.$anyError" class="errorMessage">
      Please fill out the required field(s)
    </p>
  </form>
</template>

<script>
//import { mapState, mapGetters } from 'vuex'
import Datepicker from 'vuejs-datepicker'
import NProgress from 'nprogress'
import { required } from 'vuelidate/lib/validators'
//import EventService from '@/services/EventService'
export default {
  //computed: mapState(['user', 'categories']) //VERSION 4
  //local computed icin spread operator kullanabilirsin
  computed: {
    // catLength() {
    //   //return this.$store.categories.length
    //   return this.$store.getters.catLength
    // }
    //...mapGetters('event', ['getEventById']),
    // getActivity() { //METHOD 1
    //   return this.$store.getters.getActivityById
    // },
    //...mapState(['user', 'categories'])
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
      categories: this.$store.state.categories
    }
  },
  validations: {
    event: {
      category: { required },
      title: { required },
      description: { required },
      location: { required },
      date: { required },
      time: { required }
    }
  },
  methods: {
    createEvent() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        NProgress.start()
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
            NProgress.done()
          })
      }
    },
    createFreshEventObject() {
      const user = this.$store.state.user.user
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
    },
    dateOpened() {
      console.log('Datepicker Opened')
      try {
        this.$v.event.date.$touch()
      } catch (error) {
        console.log('Hata: ', error.message)
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
