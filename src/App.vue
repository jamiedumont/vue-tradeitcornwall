<template>
  <div class="app">
    <div class="header">
      <header-bar>
      </header-bar>
    </div>
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
  }
  .header {
    border-bottom: none;
    padding: 30px 50px;
    background-color: $primary-colour;
  }
  .page {
    width: 100%;
    padding: 30px 50px;
  }
</style>
