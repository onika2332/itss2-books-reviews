// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBd48Fb2UTflHX-3vbp20AMR5xRjUY76c",
  authDomain: "itjapanese-505aa.firebaseapp.com",
  projectId: "itjapanese-505aa",
  storageBucket: "itjapanese-505aa.appspot.com",
  messagingSenderId: "25198631487",
  appId: "1:25198631487:web:394e449a516aee1432b68a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
