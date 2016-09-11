<template>
  <header-bar></header-bar>
  <div class="mw8 ph4-ns center bg-white vh-100">
    <h1 class="ma4 b dib f4">Conversation: {{id}}</h1>
    <div>
      <div class="cf" v-for="message in messages">
        <p class="bg-gold white tr fr mw6 br2 ph2 pv1 mb2">{{ message.msg }}</p>
      </div>
    </div>

    <textarea class="bg-dark-gray white" v-model="tempMessage" rows="8" cols="40" @keyup.enter="sendMessage"></textarea>
    <div class="pa3 fixed bg-dark-gray bottom-0 left-0 right-0 center static-ns w4-ns">
      <span @click="sendMessage" class="white b">SEND</span>
    </div>
  </div>
</template>

<script>
import HeaderBar from 'src/components/HeaderBar'
import firebase from 'src/data/Firebase'
import moment from 'moment'
import { _ } from 'underscore'
import { retrieveConversation, streamMessages, sendMessageAction } from 'src/vuex/modules/conversations/actions'

export default {
  name: 'Conversation',
  components: {
    HeaderBar
  },
  data: function () {
    return {
      tempMessage: ''
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
    findForeignMessages (messages) {
      const self = this
      _.each(messages, function (message) {
        if (self.userUID !== message.sender && message.isRead === false) {
          message.isRead = true
          message.readAt = Date.now()
          self.updateMessageStatus(message)
        }
      })
    },
    updateMessageStatus (message) {
      console.log('updating message: ', message.id)
      const updates = {}
      updates[`/convs/${this.id}/lastMsg`] = message
      updates[`/users/${this.userUID}/convs/${this.id}/lastMsg`] = message
      updates[`/users/${this.otherUserUID}/convs/${this.id}/lastMsg`] = message
      updates[`/convMessages/${this.id}/${message.id}`] = message

      firebase.database().ref().update(updates)
    }
  },
  ready () {
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

<style>

</style>
