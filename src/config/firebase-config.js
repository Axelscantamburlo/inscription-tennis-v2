// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2JVq96oMMcAtuolNe5tZkAmDMN-z9fIo",
  authDomain: "inscription-tennis-bis.firebaseapp.com",
  projectId: "inscription-tennis-bis",
  storageBucket: "inscription-tennis-bis.appspot.com",
  messagingSenderId: "978024570582",
  appId: "1:978024570582:web:40e2532945ae7a8e73b377"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore(app)