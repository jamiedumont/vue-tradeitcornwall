<template>
  <header-bar></header-bar>
  <div class="mw8 ph4-ns center" id="checkout">
    <div class="header-unit">
      <div class="header-main">
        <h1 class="b dib f4 pr3 br b--light-gray">Checkout</h1>
        <span class="pl2 relative gray hu__info">{{numberItems}} {{numberItems | pluralize 'item'}}</span>
      </div>
      <button class="o-btn o-btn--ghost" v-link="'sell'">Add another</button>
    </div>
    <div class="container">
      <div class="checkout__inventory">
        <h2 class="checkout__header">Listings</h2>
        <div class="checkout__items">

            <div v-for="item in items" class="checkout__item layout items-baseline">
              <div class="layout__item force--70 med-force--80">
                <h3 class="co-item__header">{{ item.title }}</h3><br/>
                <span class="co-item__category">{{ item.categories.lvl0 }}: {{ item.categories.lvl1 }}</span>
              </div>
              <div class="layout__item co-item__cost">{{ item.cost | divide100 | currency '£'}}</div>
              <div @click="remove($key)" class="layout__item"><img src="../assets/red-cross.svg" alt="" class="w1 h1"></div>
            </div>

        </div>
      </div>

      <h4 class="mt2 checkout__footer">Listings are valid for 30 days after payment</h4>

      <div v-on:click="open" class="mw4-ns pa3 enquire">
        <span>Pay {{ total | divide100 | currency '£'}}</span>
      </div>

    </div>
  </div>
</template>

<script>
import HeaderBar from 'src/components/HeaderBar'
import Vue from 'vue'
import VueResource from 'vue-resource'
import { _ } from 'underscore'
import { handlePaymentSuccess, retrieveCheckoutItems, removeFromCheckout } from 'src/vuex/modules/checkout/actions'

Vue.use(VueResource)

Vue.filter('divide100', function (value) {
  return value / 100
})

export default {
  name: 'Checkout',
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
        amount: this.total
      })
    },
    remove (itemUID) {
      this.removeFromCheckout(itemUID)
    }
  },
  vuex: {
    getters: {
      items: state => state.checkout.items
    },
    actions: {
      handlePaymentSuccess,
      retrieveCheckoutItems,
      removeFromCheckout
    }
  },
  route: {
    data () {
      this.retrieveCheckoutItems()
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
            .post('https://webtask.it.auth0.com/api/run/wt-jamiedumont-icloud_com-0/stripe-test', {stripeToken: token.id, amount: self.total}).then(function (res) {
              if (res.ok === true) {
                const response = JSON.parse(res.body)
                self.handlePaymentSuccess(response)
              }
            }, function (e) {
              console.log('Problem')
              console.log(e)
              // TODO: Handle error with dispatch
            })
        }
      })
    },
    numberItems () {
      return _.size(this.items)
    },
    total () {
      return _.reduce(this.items, (sum, item) => {
        return sum + item.cost
      }, 0)
    }
  }
}
</script>

<style lang="scss">
  @import "../scss/1_settings/settings.colours.scss";
  @import "../scss/1_settings/settings.globals.scss";
  @import "../scss/1_settings/settings.breakpoints.scss";
  @import "../scss/2_tools/tools.media-queries.scss";
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
  .checkout__item {
    margin-bottom: 6  px;
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
  .co-item__cost {
    text-align: left;
    font-size: 10px;
    font-weight: 300;
    margin: 0;
    padding-top: 2px;
  }
  .checkout__footer {
    border-top: 1px solid $light-grey;
    padding-top: 6px;
    font-size: 10px;
    color: $light-grey;
    font-weight: 300;
  }
  .enquire {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: $black;
    text-align: center;
    @include media-query(med) {
      position: static;
      margin: 0 30px 0 auto;
    }
    span {
      font-weight: $weight-bold;
      color: white;
    }
  }
</style>
