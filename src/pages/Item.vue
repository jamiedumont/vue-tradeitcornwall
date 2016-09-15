<template>
  <header-bar></header-bar>
  <div class="mw8 center bg-white tc">
  <div class="pt6 vh-100" v-if="loading">
    <mdl-spinner single-color></mdl-spinner>
  </div>

  <div class="pb5" v-else>
    <div class="mb3">
      <div class="mw7 center">
        <!-- v-for="image in item.images"
        <img :src="image" alt="" style="max-height: 32rem"/> -->
        <swiper
          direction="horizontal"
          :pagination-visible="true"
          :pagination-clickable="true"
          :performance-mode="true"
        >
          <div v-for="image in item.images">
            <img :src="image" alt="" style="max-height: 32rem"/>
          </div>
        </swiper>

      </div>
    </div>
    <div class="layout">
      <div class="layout__item">
        <h1 class="f4 ma1">{{item.title}}</h1>
        <p class="f6 i silver ma1 mb3">{{item.categories.lvl0}} - {{item.categories.lvl1}}</p>
        <div class="flex w-75 mw5 center">
          <div class="f6 gold pa2 ph3 bg-black">£{{item.price}}</div>
          <div class="f6 black-80 tc pa2 bg-gold w-100">{{item.location}}</div>
        </div>
        <div class="w-80 f6 dark-gray mw6 center ma3">{{item.description}}</div>
      </div>
    </div>

    <div class="pa3 fixed bg-dark-gray bottom-0 left-0 right-0 center static-ns w4-ns">
      <span @click="fireEnquiry" class="white b">ENQUIRE</span>
    </div>

  </div>
  </div>
</template>

<script>
import HeaderBar from 'src/components/HeaderBar'
import Swiper from 'vue-swiper'
import firebase from 'src/data/Firebase'
import { newConversation } from 'src/vuex/modules/conversations/actions'

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
  vuex: {
    actions: {
      newConversation
    }
  },
  methods: {
    fireEnquiry () {
      const itemUID = this.id
      const userOther = this.item.sellerUID
      this.newConversation(itemUID, userOther)
    }
  },
  components: {
    HeaderBar,
    Swiper
  },
  created () {
    // Pass the UID from route params to Vuex action which adds it to store
    const self = this
    firebase.database().ref(`/items/${this.id}`).once('value')
    .then(function (snapshot) {
      console.log('data loaded')
      const d = snapshot.val()
      self.item = {
        title: d.title,
        description: d.description,
        images: d.images,
        categories: d.categories,
        location: d.location,
        price: d.price,
        dateListed: d.dateListed,
        sellerUID: d.sellerUID
      }
      self.loading = false
    })
  }
}
</script>
