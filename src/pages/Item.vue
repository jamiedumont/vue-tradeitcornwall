<template>
  <header-bar></header-bar>
  <div id="item">
    <h1>Item</h1>
    <p>{{id}}</p>

  </div>
</template>

<script>
import HeaderBar from 'src/components/HeaderBar'
export default {
  name: 'Item',
  data: function () {
    return {
      id: this.$route.params.itemUID
    }
  },
  components: {
    HeaderBar
  },
  ready () {
    // Pass the UID from route params to Vuex action which adds it to store
    console.log(this.id)
  }
}
</script>

<style>

</style>
