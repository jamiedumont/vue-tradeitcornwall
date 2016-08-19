<template>
  <header-bar></header-bar>
  <div id="checkout">
    <div class="header-unit">
      <h1 class="hu__header">Checkout</h1>
      <span class="hu__info">{{ }} items</span>
      <button class="o-btn o-btn--ghost">Add another</button>
    </div>
  </div>
</template>

<script>
import HeaderBar from 'src/components/HeaderBar'
import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

export default {
  name: 'Checkout',
  data () {
    return {
      amount: 400
    }
  },
  components: {
    HeaderBar
  },
  methods: {
    open () {
      this.handler.open({
        name: 'Trade It Cornwall',
        description: 'Listing',

        zipCode: true,
        currency: 'gbp',
        amount: this.amount
      })
    }
  },
  computed: {
    handler () {
      const self = this
      return window.StripeCheckout.configure({
        key: 'pk_test_ErKvgyTZ4CYfiDNkvG0SSqqd',
        image: 'https://tactically-creative.co.uk/images/tic-logo.png',
        locale: 'auto',
        token: function (token) {
          Vue.http
            .post('https://webtask.it.auth0.com/api/run/wt-jamiedumont-icloud_com-0/stripe-test', {stripeToken: token.id, amount: self.amount}).then(function (stripeCustomer) {
              console.log(stripeCustomer)
            }, function (e) {
              console.log('Problem')
              console.log(e)
            })
        }
      })
    }
  }
}
</script>

<style lang="scss">
  @import "../scss/1_settings/settings.colours.scss";
  #checkout {
    text-align: left;
    background-color: white;
    height: 100vh;
  }
</style>
