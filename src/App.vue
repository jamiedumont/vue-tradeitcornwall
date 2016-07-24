<template>
  <div class="app">
    <div class="page">
      <router-view></router-view>
    </div>
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
