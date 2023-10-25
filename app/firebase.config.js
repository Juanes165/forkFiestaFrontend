// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEEUcWnyqGWmQEdoDbRRs9vK2eqzU-px8",
  authDomain: "forkfiesta-66bc3.firebaseapp.com",
  projectId: "forkfiesta-66bc3",
  storageBucket: "forkfiesta-66bc3.appspot.com",
  messagingSenderId: "972608960059",
  appId: "1:972608960059:web:a221a487e8392dbec7ce1e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);