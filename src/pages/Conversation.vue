<template>
  <header-bar></header-bar>
  <div class="mw8 ph4-ns center bg-white vh-100">
    <h1 class="ma4 b dib f4">Conversation: {{id}}</h1>
    <ul id="example-1">
      <li v-for="message in messages">
        {{ message.msg }} Sent <span v-formatdate="message.dateSent"></span>
      </li>
    </ul>
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
      const message = {
        dateSent: Date.now(),
        isRead: false,
        msg: this.tempMessage,
        readAt: '',
        sender: this.userUID
      }
      db.ref('/convMessages').child(this.id).push(message)
      this.tempMessage = ''
    },
    getOtherUsersData (userUID) {
      const self = this
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
