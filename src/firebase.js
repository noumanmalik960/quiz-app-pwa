import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyCdy5fcNksRK633pXFaahHRR8BUn-08G0g",
  authDomain: "quiz-app-2-6e1f0.firebaseapp.com",
  databaseURL: "https://quiz-app-2-6e1f0.firebaseio.com",
  projectId: "quiz-app-2-6e1f0",
  storageBucket: "quiz-app-2-6e1f0.appspot.com",
  messagingSenderId: "176177200402",
  appId: "1:176177200402:web:186839e28fef4c536407cb"
}

firebase.initializeApp(config)

export default firebase;