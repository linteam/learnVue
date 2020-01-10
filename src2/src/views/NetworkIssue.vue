<template>
  <div>
    <h1>Uh-Oh!</h1>
    <h3>
      It looks likes you're experiencing some network issues, please click the
      back button
    </h3>
    <!-- eslint-disable prettier/prettier -->
    <router-link :to="{ name: 'event-list' }">Or go back to the home page</router-link>
  </div>
</template>

<script>
export default {}
</script>

<style lang="css" scoped></style>
