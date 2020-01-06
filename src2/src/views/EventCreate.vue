<template>
  <div>
    <h1>Create an Event, {{ user.name }}</h1>
    <p>There are {{ catLength }} categories</p>
    <ul>
      <li v-for="cat in categories" :key="cat">{{ cat }}</li>
    </ul>
    <p>This event was created by {{ user.id }}</p>
    <p>Activity: {{ getActivityById(1).title }}</p>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  //computed: mapState(['user', 'categories']) //VERSION 4
  //local computed icin spread operator kullanabilirsin
  computed: {
    catLength() {
      //return this.$store.categories.length
      return this.$store.getters.catLength
    },
    ...mapGetters(['getActivityById']),
    // getActivity() { //METHOD 1
    //   return this.$store.getters.getActivityById
    // },
    ...mapState(['user', 'categories'])
  }
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
}
</script>

<style lang="scss" scoped></style>
