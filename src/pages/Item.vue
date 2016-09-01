<template>
  <header-bar></header-bar>
  <div class="bg-white tc">
  <div class="loading-spacer" v-if="loading">
    <mdl-spinner single-color></mdl-spinner>
  </div>

  <div class="full-height" v-else>
    <div class="mb3 layout">
      <div class="layout__item">
        <div v-for="image in item.images">
          <img :src="image" alt="" />
        </div>

      </div>
    </div>
    <div class="layout">
      <div class="layout__item">
        <h1 class="ma1">{{item.title}}</h1>
        <p class="f6 i silver ma1 mb3">{{item.categories.lvl0}} - {{item.categories.lvl1}}</p>
        <div class="flex w-75 mw5 center">
          <div class="f6 gold pa2 ph3 bg-black">£{{item.price}}</div>
          <div class="f6 black-80 tc pa2 bg-gold w-100">{{item.location}}</div>
        </div>
        <div class="f6 dark-gray mw6 center ma3">{{item.description}}</div>
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

  .full-height {
    min-height: 90vh;
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
