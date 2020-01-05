<template>
  <router-link
    class="event-link"
    :to="{ name: 'event-show', params: { id: 1 } }"
  >
    <div class="event-card -shadow">
      <span class="eyebrow">@{{ event.time }} on {{ event.date }}</span>
      <h4 class="title">{{ event.title }}</h4>
      <BaseIcon name="users" />
      <span>{{ event.attendees.length }} attending...</span>
    </div>
  </router-link>
</template>

<script>
export default {
  //Burasi ile component baska yerde import edilebilir.
  //data: function(){} ES6 shorthand hali asagidaki
  data() {
    return {
      event: {
        id: 1,
        title: 'Cocuk Tiyatrosu',
        date: 'Tues Aug 19, 2020',
        time: '6:00',
        attendees: [
          { id: 'abs123', name: 'Fikret Cetin' },
          { id: 'dasd23', name: 'Harun Gormez' }
        ]
      }
    }
  }
}
</script>

/*Scoped ile style bu component icin gecerli olacak.*/
<style lang="css" scoped>
/* scss kullanabilirsin burada ama preloaders ayarlamali ve webpack configure edilmeli */
.event-card {
  padding: 20px;
  margin-bottom: 24px;
  transition: all 0.2s linear;
  cursor: pointer;
}
.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
}
.event-card > .title {
  margin: 0;
}

.event-link {
  color: black;
  text-decoration: none;
  font-weight: 100;
}
</style>
