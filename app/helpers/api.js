function saveToDucks (duck) {

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