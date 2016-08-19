<template>
  <header-bar></header-bar>
  <div id="item">
  <div class="loading-spacer" v-if="loading">
    <mdl-spinner single-color></mdl-spinner>
  </div>

  <div class="full-height" v-else>
    <div class="item__images layout">
      <div class="layout__item">
        <div v-for="image in item.images">
          <img :src="image" alt="" />
        </div>

      </div>
    </div>
    <div class="layout">
      <div class="layout__item">
        <h1 class="gamma item__header">{{item.title}}</h1>
        <p class="item__category">{{item.categories.lvl0}} - {{item.categories.lvl1}}</p>
        <div class="item__meta result__meta">
          <div class="meta__price">
            <span class="item__price">£{{item.price}}</span>
          </div>
          <span class="item__location">{{item.location}}</span>
        </div>
        <div class="item__description">{{item.description}}</div>
      </div>
    </div>

    <div class="enquire">
      <span>ENQUIRE</span>
    </div>

  </div>
  </div>
</template>

<script>
import HeaderBar from 'src/components/HeaderBar'
import firebase from 'src/data/Firebase'
export default {
  name: 'Item',
  data: function () {
    return {
      id: this.$route.params.itemUID,
      loading: true,
      item: {
        title: '',
        description: '',
        images: '',
        categories: '',
        location: '',
        price: '',
        dateListed: ''
      }
    }
  },
  components: {
    HeaderBar
  },
  ready () {
    // Pass the UID from route params to Vuex action which adds it to store
    const self = this
    firebase.database().ref(`/items/${this.id}`).once('value')
    .then(function (snapshot) {
      const d = snapshot.val()
      self.item = {
        title: d.title,
        description: d.description,
        images: d.images,
        categories: d.categories,
        location: d.location,
        price: d.price,
        dateListed: d.dateListed
      }
      self.loading = false
    })
  }
}
</script>

<style lang="scss" scoped>
  @import "../scss/1_settings/settings.colours.scss";
  @import "../scss/1_settings/settings.globals.scss";
  .loading-spacer {
    min-height: 100vh;
    padding-top: 30vh;
  }
  #item {
    background-color: white;
    text-align: center;
  }

  .full-height {
    min-height: 90vh;
  }

  .item__images {
    margin-bottom: $base-spacing-unit*2.5;
  }

  .item__header {
    /* 2009 BMW 330ci Touri: */
    font-family: OpenSans-Bold;
    font-size: 16px;
    color: $black;
    letter-spacing: 0.62px;
    margin-bottom: $base-spacing-unit/4;
    text-transform: none;
  }

  .item__category {
    /* Vehicles - Cars: */
    font-family: OpenSans;
    font-size: 10px;
    color: $light-grey;
    letter-spacing: 0.38px;
    margin-bottom: $base-spacing-unit/2;
  }

  .item__description {
    margin: $base-spacing-unit auto 80px;
    /* For sale is my 2009: */
    font-family: OpenSans;
    font-size: 10px;
    color: $black;
    letter-spacing: 0.6px;
    line-height: 1.5em;
    max-width: 90%;
  }

  .enquire {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: $base-spacing-unit;
    background-color: $black;
    span {
      font-weight: $weight-bold;
      color: white;
    }
  }

</style>
