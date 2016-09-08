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

const db = firebase.database()

export default {
  name: 'Conversation',
  components: {
    HeaderBar
  },
  data: function () {
    return {
      id: this.$route.params.convUID,
      loading: true,
      conv: {},
      messages: {},
      item: {},
      otherUser: {},
      otherUserUID: '',
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
      // const self = this
      const messageUID = db.ref('/convMessages').child(this.id).push().key
      console.log(messageUID)

      const message = {
        dateSent: Date.now(),
        isRead: false,
        id: messageUID,
        msg: this.tempMessage,
        readAt: '',
        sender: this.userUID
      }

      console.log(message)

      console.log(this.otherUserUID)

      const updates = {}
      updates[`/convs/${this.id}/lastMsg`] = message
      updates[`/users/${this.userUID}/convs/${this.id}/lastMsg`] = message
      updates[`/users/${this.otherUserUID}/convs/${this.id}/lastMsg`] = message
      updates[`/convMessages/${this.id}/${messageUID}`] = message

      console.log(updates)

      firebase.database().ref().update(updates)
      this.tempMessage = ''
    },
    getOtherUsersData (userUID) {
      const self = this
      self.otherUserUID = userUID
      db.ref(`/users/${userUID}`).on('value', function (snapshot) {
        const user = snapshot.val()
        self.otherUser = user
      }, function (errObject) {
        console.log(errObject)
      })
    },
    getItemData (itemUID) {
      const self = this
      db.ref(`/items/${itemUID}`).on('value', function (snapshot) {
        const item = snapshot.val()
        self.item = item
      }, function (errObject) {
        console.log(errObject)
      })
    },
    getMessages (convUID) {
      const self = this
      db.ref(`/convMessages/${convUID}`).on('value', function (snapshot) {
        const messages = snapshot.val()
        self.messages = messages
      }, function (errObject) {
        console.log(errObject)
      })
    }
  },
  created () {
    // Pass the UID from route params to Vuex action which adds it to store
    const self = this
    db.ref(`/convs/${this.id}`).on('value', function (snapshot) {
      console.log('inside firebase')
      const d = snapshot.val()

      if (d.buyer === self.userUID) {
        self.getOtherUsersData(d.seller)
      } else {
        self.getOtherUsersData(d.buyer)
      }

      self.getItemData(d.item)
      self.getMessages(self.id)

      self.conv = d
      self.loading = false
    }, function (errObject) {
      console.log(errObject)
    })
  },
  vuex: {
    getters: {
      userUID: state => state.accounts.user.uid
    }
  }
}
</script>

<style>

</style>
