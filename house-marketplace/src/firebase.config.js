// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCryb3aFh66J2lcmssnnScijWLtooBeKJc',
  authDomain: 'house-marketplace-app-332aa.firebaseapp.com',
  projectId: 'house-marketplace-app-332aa',
  storageBucket: 'house-marketplace-app-332aa.appspot.com',
  messagingSenderId: '85443613224',
  appId: '1:85443613224:web:70afa88b5eaa9d5fef5b1d',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
