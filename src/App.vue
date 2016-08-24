<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import store from 'src/vuex/store'

  export default {
    store
  }
</script>

<style lang="scss">
  @import "./scss/app.scss";

</style>
