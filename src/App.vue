<template>
  <div class="app">
    <alert
    :show.sync="alertState"
    :duration="3000"
    type="success"
    width="400px"
    placement="top-right"
    dismissable
  >
    <span class="icon-ok-circled alert-icon-float-left"></span>
    <strong>Well Done!</strong>
    <p>You successfully read this important alert message.</p>
  </alert>
    <div class="page">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import store from 'src/vuex/store'
  import Alert from 'src/components/Alert'

  export default {
    store,
    components: {
      Alert
    },
    vuex: {
      getters: {
        alertState: state => state.accounts.alert.present,
        alertType: state => state.accounts.alert.type,
        alertMsg: state => state.accounts.alert.msg
      }
    }
  }
</script>

<style lang="scss">
  @import "./scss/app.scss";

</style>
