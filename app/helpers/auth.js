export default function auth () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: 'Ruxandra',
        avatar: 'https://pbs.twimg.com/profile_images/688980615752892417/zYEsC-f-.jpg',
        uid: 'ruxandrafed',
      }, 2000)
    })
  })
}

export function checkIfAuthed (store) {
  // Ignore Firebase
  return store.getState().isAuthed
}

export function logout () {
  console.log('Logged Out!')
}