<template>
  <header-bar></header-bar>
  <div class="mw8 ph4-ns center bg-white vh-100">
    <h1 class="ma4 b dib f4">Billing History</h1>

  </div>
</template>

<script>
import HeaderBar from 'src/components/HeaderBar'
// import { getBillingHistory } from 'src/vuex/modules/accounts/actions'

export default {
  name: 'UserBilling',
  components: {
    HeaderBar
  },
  vuex: {
    getters: {
      billingHistory: state => state.accounts.user.billingHistory
    }
  }
  // route: {
  //   data () {
  //     console.log('In component "route => data" function')
  //     this.getBillingHistory()
  //   }
  // }
}
</script>

<style>

</style>
