<template>
  <header-bar></header-bar>
  <div id="uploading">
    <div class="header-unit">
      <div class="header-main">
      <h1 class="b dib f4 pr3 br b--light-gray">Uploading</h1>
      <span class="pl2 relative gray hu__info">{{ totalUploads }} images</span>
      </div>
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
  .hu__info {
    font-size: 10px;
    bottom: 3px;
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
