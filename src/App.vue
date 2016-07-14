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

<style>
  html {
  }
  body {
    font-family: "HelveticaNeue", "Helvetica Neue", Helvetica, Arial, sans-serif;
    color: #333;
    margin: 0
  }
  .app {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .header {
    border-bottom: 1px solid #b3b3b3;
    padding: 30px 50px;
    /*background-color: #E2B644;*/
    background-color: #1F9193;
  }
  .page {
    width: 100%;
    padding: 30px 50px;
  }
</style>
