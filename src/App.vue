<template>
  <div class="app">
    <header-bar></header-bar>
    <div class="page">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import HeaderBar from './components/HeaderBar'
  import store from 'src/vuex/store'
  // import firebase from 'firebase'
  export default {
    components: {
      HeaderBar
    },
    store
  }
</script>

<style lang="scss">
  @import "./scss/app.scss";
  .app {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100%;
    background: url(./assets/cornwall.jpg);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  .page {
    width: 100%;
    padding: 30px;
  }
</style>
