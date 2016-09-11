import firebase from 'src/data/Firebase'
import { _ } from 'underscore'
// import moment from 'moment'
import router from 'src/router'

export const getUsersConversations = ({dispatch, state}, userUID) => {
  console.log('conversation action', userUID)
  return new Promise(function (resolve, reject) {
    const convsRef = firebase.database().ref(`/users/${userUID}/convs`)
    convsRef.on('value', (snapshot) => {
      const convs = snapshot.val()
      dispatch('GET_USER_CONVS', convs)
      resolve()
    })
  })
}

const checkForExistingConversation = (userSelf, itemUID) => {
  return new Promise(function (resolve, reject) {
    const ref = firebase.database().ref(`/users/${userSelf}/convs`)
    ref.orderByChild('item').equalTo(itemUID).once('value').then(function (snapshot) {
      const result = snapshot.val()
      if (_.isObject(result)) {
        const asArray = _.keys(result)
        resolve(asArray[0])
      } else {
        resolve(null)
      }
    })
  })
}

export const newConversation = function (store, itemUID, userOther) {
  const userSelf = store.state.accounts.user.uid
  if (userSelf === userOther) {
    return window.alert('Did you know that trying to talk to yourself is a sign of madness?')
  }
  checkForExistingConversation(userSelf, itemUID).then((res) => {
    if (res) {
      router.go({ name: 'message', params: { convUID: res } })
    } else {
      const convUID = firebase.database().ref().child('convs').push().key
      const newConv = {
        seller: userOther,
        buyer: userSelf,
        item: itemUID,
        lastMsg: {}
      }
      firebase.database().ref('convs/' + convUID).set(newConv)
      firebase.database().ref(`/users/${userSelf}/convs/${convUID}`).set(newConv)
      firebase.database().ref(`/users/${userOther}/convs/${convUID}`).set(newConv)
      router.go({
        name: 'message',
        params: { convUID }
      })
    }
  })
}

export const retrieveConversation = ({dispatch, state}) => {
  /*

  I need to retrieve the following:
  > base conv data (from Vuex)
  > my profile details (from Vuex)
    > name
    > avatar
  > other user's details (from Firebase)
    > name
    > avatar
  > the item's details (from Firebase)
    > Title
    > Image
    > Asking Price
  > The conversation messages (from Firbase)

  */

  // Get the current conversationUID from route params
  const convUID = state.route.params.convUID

  // Retrieve the base data for the conversation from the Vuex store
  const conv = state.conversations.all[convUID]

  const myself = {
    uid: state.accounts.user.uid,
    name: state.accounts.user.displayName,
    avatar: state.accounts.user.photoURL,
    role: _determineUserRole(state.accounts.user.uid, conv)
  }

  const otherUsersUID = _otherUsersUID(myself, conv)

  // Include in Promise.all
  const otherUser = _retrievePublicUserData(otherUsersUID)

  console.log(otherUser)

  // Include in Promise.all
  const item = _retrievePublicItemData(conv.item)

  console.log(item)
}

export const sendMessageAction = ({dispatch, state}, params) => {
  /*
    Params object = {
        convUID: The UID of the conversation
        senderUID: The UID of the sender
        recipientUID: The UID of the recipient
        message: The message content (as String)
      }
  */

  const messageUID = firebase.database().ref('/convMessages').child(params.convUID).push().key

  const message = {
    dateSent: Date.now(),
    isRead: false,
    id: messageUID,
    msg: params.message,
    readAt: '',
    sender: params.senderUID
  }

  const updates = {}
  updates[`/convs/${params.convUID}/lastMsg`] = message
  updates[`/users/${params.senderUID}/convs/${params.convUID}/lastMsg`] = message
  updates[`/users/${params.recipientUID}/convs/${params.convUID}/lastMsg`] = message
  updates[`/convMessages/${params.convUID}/${messageUID}`] = message

  return firebase.database().ref().update(updates)
}

export const streamMessages = ({dispatch, state}) => {
  // Get the current conversationUID from route params
  const convUID = state.route.params.convUID
  firebase.database().ref(`/convMessages/${convUID}`).on('value', function (snapshot) {
    const messages = snapshot.val()
    console.log(messages)
  }, function (errObject) {
  })
  // _getConversationMessages(convUID).then(function (messages) {
  //   console.log(messages)
  // })
}

export const updateMessageStatus = (message) => {
  console.log('updating message: ', message.id)
  const updates = {}
  updates[`/convs/${this.id}/lastMsg`] = message
  updates[`/users/${this.userUID}/convs/${this.id}/lastMsg`] = message
  updates[`/users/${this.otherUserUID}/convs/${this.id}/lastMsg`] = message
  updates[`/convMessages/${this.id}/${message.id}`] = message

  firebase.database().ref().update(updates)
}

// PRIVATE FUNCTIONS

// const _getConversationMessages = (convUID) => {
//   return new Promise(function (resolve, reject) {
//     firebase.database().ref(`/convMessages/${convUID}`).on('value', function (snapshot) {
//       const messages = snapshot.val()
//       console.log();
//       resolve(messages)
//     }, function (errObject) {
//       reject(errObject)
//     })
//   })
// }

const _retrievePublicItemData = (itemUID) => {
  return new Promise(function (resolve, reject) {
    firebase.database().ref(`/items/${itemUID}`).once('value').then((snapshot) => {
      const data = snapshot.val()
      const item = {
        title: data.title,
        price: data.price,
        image: data.images[0],
        location: data.location
      }
      resolve(item)
    }, function (errObject) {
      reject(errObject)
    })
  })
}

const _retrievePublicUserData = (userUID) => {
  return new Promise(function (resolve, reject) {
    firebase.database().ref(`/users/${userUID}`).once('value').then((snapshot) => {
      const data = snapshot.val()
      const user = {
        uid: userUID,
        name: data.displayName,
        avatar: data.photoURL
      }
      resolve(user)
    }, function (errObject) {
      reject(errObject)
    })
  })
}

const _determineUserRole = (userUID, conv) => {
  // Function takes in a UID and a conversation. It then returns the role of the
  // user in that conversation
  if (userUID === conv.buyer) {
    return 'buyer'
  }
  if (userUID === conv.seller) {
    return 'seller'
  }
}

const _otherUsersUID = (myself, conv) => {
  // function returns the userUID of the other party
  if (myself.role === 'buyer') {
    return conv.seller
  }
  if (myself.role === 'seller') {
    return conv.buyer
  }
}