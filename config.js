import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBy6511Wz3mD0qsDFzewN_xL5MeOJj7se0",
  authDomain: "testapp-8294c.firebaseapp.com",
  projectId: "testapp-8294c",
  storageBucket: "testapp-8294c.appspot.com",
  messagingSenderId: "974792979420",
  appId: "1:974792979420:web:2403a2c7c48ff537641519",
  measurementId: "G-VCZ9WNN9NE"
}


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase }

/*
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBy6511Wz3mD0qsDFzewN_xL5MeOJj7se0",
  authDomain: "testapp-8294c.firebaseapp.com",
  projectId: "testapp-8294c",
  storageBucket: "testapp-8294c.appspot.com",
  messagingSenderId: "974792979420",
  appId: "1:974792979420:web:2403a2c7c48ff537641519",
  measurementId: "G-VCZ9WNN9NE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
*/ 