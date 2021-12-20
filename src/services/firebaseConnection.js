import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDR1QO6mYWpNxg4rtM8UEpG5wsou4WswzA",
    authDomain: "walletappf.firebaseapp.com",
    databaseURL: "https://walletappf-default-rtdb.firebaseio.com",
    projectId: "walletappf",
    storageBucket: "walletappf.appspot.com",
    messagingSenderId: "1079800392719",
    appId: "1:1079800392719:web:9fca448409ac95afba877a",
    measurementId: "G-TDKLD8SF31"
  };
  
const app = initializeApp(firebaseConfig)

export const db      = getFirestore(app)
export const auth    = getAuth(app)
export const storage = getStorage(app)

