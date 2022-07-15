
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARZtvgT45jOv9X7tGiRD8nyRvzM3AUnmA",
  authDomain: "espace-maison.firebaseapp.com",
  projectId: "espace-maison",
  storageBucket: "espace-maison.appspot.com",
  messagingSenderId: "513838199746",
  appId: "1:513838199746:web:5bae7882420b6ef87ddc5b"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export  const db=getFirestore()
//we use the export so we can import the module later on 
