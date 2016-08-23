<template>
  <header-bar></header-bar>
  <div id="checkout">
    <div class="header-unit">
      <h1 class="hu__header">Checkout</h1>
      <span class="hu__info">{{numberItems}} {{numberItems | pluralize 'item'}}</span>
      <button class="o-btn o-btn--ghost" v-link="'sell'">Add another</button>
    </div>
    <div class="container">
      <div class="checkout__inventory">
        <h2 class="checkout__header">Listings</h2>
        <div class="checkout__items">

            <div v-for="item in items" class="checkout__item layout">
              <div class="layout__item force--70 med-force--80">
                <h3 class="co-item__header">{{ item.title }}</h3><br/>
                <span class="co-item__category">{{ item.categories.lvl0 }}: {{ item.categories.lvl1 }}</span>
              </div>
              <div class="layout__item co-item__cost">{{ item.cost | divide100 | currency '£'}}</div>
              <div class="layout__item co-item__icon"><img src="../assets/account-icon.svg" alt=""></div>
            </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBar from 'src/components/HeaderBar'
import Vue from 'vue'
import VueResource from 'vue-resource'
import { _ } from 'underscore'

Vue.use(VueResource)

Vue.filter('divide100', function (value) {
  return value / 100
})

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
  .container {
    padding: 0 20px;
  }
  .checkout__inventory {
    text-align: left;
  }
  .checkout__header {
    font-weight: 600;
    font-size: 12px;
    padding-bottom: 3px;
    border-bottom: 1px solid $light-grey;
    text-align: left;
    padding-left: 3px;
    margin-bottom: 0;
  }
  .checkout__items {
    padding: 6px;
    text-align: left;
  }
  .checkout-item {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    align-content: flex-start;
  }
  .co-item__header {
    text-align: left;
    font-size: 10px;
    font-weight: 300;
    margin: 0;
    display: inline-block;
  }
  .co-item__category {
    text-align: left;
    font-size: 9px;
    color: $light-grey;
    padding-left: 3px;
  }
  .co-item__icon {
    img {
      display: block;
      margin: 0 auto;
      width: 20px;
    }
  }
  .co-item__cost {
    text-align: left;
    font-size: 10px;
    font-weight: 300;
    margin: 0;
    padding-top: 2px;
  }
</style>
