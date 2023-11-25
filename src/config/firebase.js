import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjcWHQ2wTL--qPZcbXp6K8DA67v4LYxgo",
  authDomain: "nextjs-14.firebaseapp.com",
  projectId: "nextjs-14",
  storageBucket: "nextjs-14.appspot.com",
  messagingSenderId: "596214663576",
  appId: "1:596214663576:web:11ad0555b73267952dc3ed",
  measurementId: "G-9GEYJTRF28"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const firebaseAnalytics = getAnalytics(app);
const firebaseAuth = getAuth(app);
const firebaseDb = getFirestore(app);

// export { firebaseAnalytics, firebaseAuth, firebaseDb }
export { firebaseAuth, firebaseDb }