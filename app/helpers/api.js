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

}

function saveLikeCount (duckId) {

}

function saveDuck (duck) {
  const { duckId, duckPromise } = saveToDucks(duck)

  return Promise.all([
    duckPromise,
    saveToUsersDucks(duck, duckId), // we don't have duckId
    saveLikeCount(duckId),
  ]).then(() => ({...duck, duckId}))
}