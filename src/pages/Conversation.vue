<template>
  <header-bar></header-bar>
  <div class="mw8 ph4-ns center bg-white minus-header">


    <div class="ph2 ph4-ns">
      <div class="ph2 minus-both overflow-scroll">
        <span @click="getMoreMessages">More messages</span>
        <div class="" v-for="message in messages">
          <message :message="message"></message>
        </div>
      </div>

      <div class="fixed bottom-0 right-0 left-0 flex">
        <input class="ma0 h3 bg-light-gray" v-model="tempMessage" @keyup.enter="sendMessage"></input>
        <div class="dt pa3 bg-dark-gray h3 w4-ns tc">
          <span @click="sendMessage" class="dtc v-mid white b">SEND</span>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import HeaderBar from 'src/components/HeaderBar'
import Message from 'src/components/Message'
import moment from 'moment'
import { retrieveConversation, streamMessages, sendMessageAction } from 'src/vuex/modules/conversations/actions'

export default {
  name: 'Conversation',
  components: {
    HeaderBar,
    Message
  },
  data: function () {
    return {
      tempMessage: '',
      limit: 5
    }
  },
  directives: {
    formatdate: function (date) {
      const output = moment(date).fromNow()
      this.el.innerText = output
    }
  },
  methods: {
    sendMessage () {
      const params = {
        convUID: this.convUID,
        senderUID: this.userUID,
        recipientUID: this.otherUser.uid,
        message: this.tempMessage
      }
      console.log('params', params)
      this.sendMessageAction(params)
      this.tempMessage = ''
    },
    getMoreMessages () {
      this.limit = this.limit + 10
      this.streamMessages(this.limit)
    }
  },
  route: {
    data () {
      this.retrieveConversation()
      this.streamMessages()
    }
  },
  vuex: {
    getters: {
      convUID: state => state.route.params.convUID,
      userUID: state => state.accounts.user.uid,
      otherUser: state => state.conversations.otherUser,
      item: state => state.conversations.item,
      messages: state => state.conversations.messages
    },
    actions: {
      retrieveConversation,
      streamMessages,
      sendMessageAction
    }
  }
}
</script>

<style lang="scss">
  .minus-header {
    height: calc(100vh - 64px);
  }
  .minus-both {
    height: calc(100vh - 128px);
  }
</style>
