const getUsersItems = (userUID) => {
  const itemsRef = firebase.database().ref(`/users/${userUID}/items`)
  itemsRef.on('value', (snapshot) => {
    const itemUIDs = _.keys(snapshot.val())
    const items = []

    _.each(itemUIDs, (item) => {
      firebase.database()
        .ref(`/items/${item}`)
        .once('value')
        .then(function (snapshot) {
          const itemObject = snapshot.val()

          if (itemObject !== null) {
            items.push(itemObject)
            if (items.length === itemUIDs.length) {
              store.dispatch('GET_USER_ITEMS', items)
            }
          }
        })
    })
  })
}
