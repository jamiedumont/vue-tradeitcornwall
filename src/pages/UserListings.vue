<template>
  <header-bar></header-bar>
  <div class="mw8 ph4-ns center bg-white vh-100">
    <h1 class="ma4 b dib f4">User's Items</h1>

  </div>
</template>

<script>
import HeaderBar from 'src/components/HeaderBar'
import { getUsersItems } from 'src/vuex/modules/accounts/actions'

export default {
  name: 'UserListings',
  components: {
    HeaderBar
  },
  vuex: {
    actions: {
      getUsersItems
    }
  },
  route: {
    data () {
      this.getUsersItems()
    }
  }
}
</script>

<style>

</style>
