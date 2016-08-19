<template>
  <header-bar></header-bar>
  <div id="uploading">
    <div class="header-unit">
      <h1 class="hu__header">Uploading</h1>
      <span class="hu__info">{{ totalUploads }} images</span>
    </div>
    <div class="upload-bar">
      <mdl-progress indeterminate></mdl-progress>
      <h2>{{percentage}}% complete</h2>
      <span>{{uploadsComplete}} of {{totalUploads}} successfully uploaded.</span>
    </div>
  </div>
</template>

<script>
import HeaderBar from 'src/components/HeaderBar'
import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

export default {
  name: 'Uploading',
  components: {
    HeaderBar
  },
  vuex: {
    getters: {
      totalUploads: state => state.uploads.totalUploads,
      uploadsComplete: state => state.uploads.uploadsComplete
    }
  },
  methods: {
  },
  computed: {
    percentage () {
      return this.$store.state.uploads.uploadProgess
    }
  }
}
</script>

<style lang="scss">
  @import "../scss/1_settings/settings.colours.scss";
  #uploading {
    text-align: left;
    background-color: white;
    height: 100vh;
  }
  .header-unit {
    padding: 30px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    * {
      margin: 0;
    }
  }
  .hu__header {
    padding-right: 20px;
    border-right: 1px solid $light-grey;
  }
  .hu__info {
    padding-left: 20px;
    color: $light-grey;
    font-size: 10px;
  }
  .upload-bar {
    max-width: 80%;
    margin: 0 auto;
    text-align: center;
    padding: 30px;
    h2 {
      margin: 20px;
    }
    span {
      font-size: 10px;
    }
  }
</style>
