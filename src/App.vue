<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import store from 'src/vuex/store'
  // import firebase from 'src/data/Firebase'

  export default {
    store,
    route: {
      waitForData: true, // wait until data is loaded
      data (transition) {
        // authService.getUser((response) => {
        //   transition.next({ authData: response }) // set data
        // })
      }
    }
  }
</script>

<style lang="scss">
  @import "./scss/app.scss";

</style>
