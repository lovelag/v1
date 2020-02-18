import firebase from '@firebase/app'
import 'firebase/firestore'
import 'firebase/firebase-auth'
import 'firebase/storage'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyAnWlqThwVm2WK-l3KtKv8TmrvUZ1a_L7U',
  authDomain: 'shopmine3.firebaseapp.com',
  databaseURL: 'https://shopmine3.firebaseio.com',
  projectId: 'shopmine3',
  storageBucket: 'shopmine3.appspot.com',
  messagingSenderId: '970085739220',
  appId: '1:970085739220:web:654e695e232ea4df64a941',
  measurementId: 'G-71L1B3Y54C'
}
const fb = firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
export { fb, db }
