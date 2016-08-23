<template>
  <header-bar></header-bar>
  <div id="checkout">
    <div class="header-unit">
      <h1 class="hu__header">Checkout</h1>
      <span class="hu__info">{{ numberItems }} items</span>
      <button class="o-btn o-btn--ghost" v-link="'sell'">Add another</button>
    </div>
    <div class="checkout__items">
      
    </div>
  </div>
</template>

<script>
import HeaderBar from 'src/components/HeaderBar'
import Vue from 'vue'
import VueResource from 'vue-resource'
import { _ } from 'underscore'

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
  vuex: {
    getters: {
      total: state => state.checkout.total,
      items: state => state.checkout.items
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
    },
    numberItems () {
      return _.size(this.items)
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
