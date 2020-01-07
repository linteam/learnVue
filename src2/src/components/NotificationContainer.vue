<template>
  <div class="notification-container">
    <NotificationBar
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<script>
import NotificationBar from '@/components/NotificationBar.vue'
import { mapState } from 'vuex'
export default {
  components: {
    NotificationBar
  }, //state'lere ulasma yerine computed'a aldik mantikli (getter sonucta)
  computed: mapState('notification', ['notifications'])
}
</script>

<style lang="scss" scoped>
.notification-container {
  position: fixed;
  bottom: 0;
  right: 0;
  padding-right: 40px;
}
</style>
