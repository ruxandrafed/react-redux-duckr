import { ref } from 'config/constants'

function saveToDucks (duck) {
  const duckId = ref.child('ducks').push().key;
  const duckPromise = ref.child(`ducks/${duckId}`).set({...duck, duckId})

  return {
    duckId,
    duckPromise
  }
}

function saveToUsersDucks (duck, duckId) {
  return ref.child(`usersDucks/${duck.uid}/${duckId}`)
    .set({...duck, duckId})
}

function saveLikeCount (duckId) {
  return ref.child(`likeCount/${duckId}`)
    .set(0)
}

export function saveDuck (duck) {
  const { duckId, duckPromise } = saveToDucks(duck)

  return Promise.all([
    duckPromise,
    saveToUsersDucks(duck, duckId), // we don't have duckId
    saveLikeCount(duckId),
  ]).then(() => ({...duck, duckId}))
}

export function listenToFeed (callback, errorCallback) {
  ref.child('ducks').on('value', (snapshot) => {
    const feed = snapshot.val() || {}
    const sortedIds = Object.keys(feed).sort((a,b) => {
      return feed[b].timestamp - feed[a].timestamp
    })
    callback({feed, sortedIds})
  }, errorCallback)
}

export function fetchUsersLikes (uid) {
  return ref.child(`usersLikes/${uid}`).once('value')
    .then((snapshot) => snapshot.val() || {})
}

export function saveToUsersLikes (uid, duckId) {
  return ref.child(`usersLikes/${uid}/${duckId}`).set(true)
}

export function deleteFromUsersLikes (uid, duckId) {
  return ref.child(`usersLikes/${uid}/${duckId}`).set(null)
}

export function incrementNumberOfLikes (duckId) {
  return ref.child(`likeCount/${duckId}`)
    .transaction((currentValue = 0) => currentValue + 1)
}

export function decrementNumberOfLikes (duckId) {
  return ref.child(`likeCount/${duckId}`)
    .transaction((currentValue = 0) => currentValue - 1)
}