// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUPF3LhOwTTmuQ5BnGp4WMk_n34wCycTY",
  authDomain: "diploma-a5623.firebaseapp.com",
  databaseURL: "https://diploma-a5623-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "diploma-a5623",
  storageBucket: "diploma-a5623.appspot.com",
  messagingSenderId: "41844309744",
  appId: "1:41844309744:web:0b9e874349de43abce4c35"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;