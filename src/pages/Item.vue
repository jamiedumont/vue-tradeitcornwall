<template>
  <header-bar></header-bar>
  <div id="item">
    <h1>Item</h1>
    <p>{{id}}</p>

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

<style>

</style>
