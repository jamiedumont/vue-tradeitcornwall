<template>
  <div class="app">
    <div class="page">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import store from 'src/vuex/store'
  // import firebase from 'firebase'
  export default {
    store
  }
</script>

<style lang="scss">
  @import "./scss/app.scss";
  
</style>
