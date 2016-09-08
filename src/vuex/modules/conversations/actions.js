import firebase from 'src/data/Firebase'
// import { _ } from 'underscore'
// import moment from 'moment'
import router from 'src/router'

export const newConversation = function (store, itemUID, userOther) {
  const convUID = firebase.database().ref().child('convs').push().key
  const userSelf = store.state.accounts.user.uid
  if (userSelf === userOther) {
    console.error('Throw a wobbly with store, alert, whatever!')
  }
  const newConv = {
    seller: userOther,
    buyer: userSelf,
    item: itemUID,
    lastMsg: {},
    buyerRead: false,
    sellerRead: false
  }
  firebase.database().ref('convs/' + convUID).set(newConv)
  router.go({
    name: 'message',
    params: { convUID }
  })
}
