import firebase from 'firebase'

// Initialize Firebase
const config = {
  apiKey: "AIzaSyDetsADEZf5zWOe3j5G8Ykxt9j_7Q2-Igk",
  authDomain: "duckr-765e0.firebaseapp.com",
  databaseURL: "https://duckr-765e0.firebaseio.com",
  storageBucket: "duckr-765e0.appspot.com",
  messagingSenderId: "545267889126",
}

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth