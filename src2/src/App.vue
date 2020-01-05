<template>
  <div id="app">
    <div id="nav">
      <!-- Link Component to navigate to a route -->
      <!-- <router-link to="/">Home</router-link> -->
      <!-- Hem yukaridaki gibi hem asagidaki gibi calisir. 
      Asagidaki gibi cagirdiginda route ismine gore gitmis olur. -->
      <router-link :to="{ name: 'event-list' }">Home</router-link> |
      <router-link :to="{ name: 'event-show' }">Show Event #1</router-link> |
      <router-link :to="{ name: 'event-create' }">Create</router-link>

      <!-- Yukaridaki gibi yapmanin avantaji ileride degisiklik oldugunda PATH'in tek bir yerden
      router/index.js dosyasindan degistirilmesi yeterli olacak -->
      <!-- <router-link to="/about">About</router-link> -->
    </div>
    <!-- Tiklanan linki burada render eder -->
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
