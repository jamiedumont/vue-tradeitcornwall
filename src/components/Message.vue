<template lang="html">
  <p
    v-bind:class="iAmSender ? 'me' : 'them'"
    class=""
  >{{ message.msg }}</p>
</template>

<script>
  export default {
    name: 'Message',
    // data: function () {
    //   return {
    //     me: 'me',
    //     them: 'them'
    //   }
    // },
    props: ['message'],
    computed: {
      iAmSender () {
        return this.userUID === this.message.sender
      }
    },
    vuex: {
      getters: {
        userUID: state => state.accounts.user.uid
      }
    }
  }
</script>

<style lang="scss">

$gold: #E2B644;
$grey: #949494;

p {
  margin: 0 0 0.5em;
  border-radius: 1em;
  padding: 0.5em 1em;
  background: $grey;
  max-width: 75%;
  clear: both;
  position: relative;

  &.them {
    float: left;
    color: white;

    &:after {
      content: "";
      position: absolute;
      left: -0.5em;
      bottom: 0;
      width: 1em;
      height: 1em;
      border-right: 0.5em solid $grey;
      border-bottom-right-radius: 1em 0.5em;
    }
  }

  &.me {
    float: right;
    background-color: $gold;
    color: #333;

    &:after {
      content: "";
      position: absolute;
      right: -0.5em;
      bottom: 0;
      width: 1em;
      height: 1em;
      border-left: 0.5em solid $gold;
      border-bottom-left-radius: 1em 0.5em;
    }
  }
}


</style>
