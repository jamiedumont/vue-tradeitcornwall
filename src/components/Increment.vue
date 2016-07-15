<template>
  <div>
    <button @click='increment'>Increment +1</button>
  </div>
</template>

<script>
  import { incrementCounter } from 'src/vuex/actions'
  export default {
    // Options / Data
    data () {
      return {}
    },
    props: [],
    computed: {},
    methods: {},
    vuex: {
      actions: {
        increment: incrementCounter
      }
    }// ,
    // watch: {},
    // Options / DOM
    // el () {},
    // replace: true,
    // template: '',
    // Options / Lifecycle Hooks
    // init () {},
    // crated () {},
    // beforeCompile () {},
    // compiled () {},
    // ready () {},
    // attached () {},
    // detached () {},
    // beforeDestroy () {},
    // destroyed () {},
    // Options / Assets
    // directives: {},
    // elementDirectives: {},
    // filters: {},
    // components: {},
    // transitions: {},
    // partials: {},
    // Options / Misc
    // parent: null,
    // events: {},
    // mixins: [],
    // name: ''
  }
</script>
