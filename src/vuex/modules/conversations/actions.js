import firebase from 'src/data/Firebase'
import { _ } from 'underscore'
// import moment from 'moment'
import router from 'src/router'

const checkForExistingConversation = (userSelf, itemUID) => {
  return new Promise(function (resolve, reject) {
    // firebase.database().ref(`/users/${userSelf}/convs`).once('value').then(function (snapshot) {
    //   const allUserConvs = snapshot.val()
    //   console.log(allUserConvs)
    // }, function (errObj) {
    //   console.err(errObj)
    // })
    console.log(itemUID)
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

// const createNewConversation = () {
//
// }

export const newConversation = function (store, itemUID, userOther) {
  const userSelf = store.state.accounts.user.uid

  checkForExistingConversation(userSelf, itemUID).then((res) => {
    if (res) {
      router.go({ name: 'message', params: { convUID: res } })
    } else {
      const convUID = firebase.database().ref().child('convs').push().key
      if (userSelf === userOther) {
        console.error('Throw a wobbly with store, alert, whatever!')
      }
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
