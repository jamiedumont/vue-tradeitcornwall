<template>
  <header-bar></header-bar>
  <div class="mw8 ph4-ns center bg-white vh-100">
    <h1 class="ma4 b dib f4">Inbox</h1>

  </div>
</template>

<script>
import HeaderBar from 'src/components/HeaderBar'
export default {
  name: 'Inbox',
  components: {
    HeaderBar
  },
  vuex: {
    getters: {
      convs: state => state.conversations.convs
    }
  }
}
</script>

<style>

</style>
