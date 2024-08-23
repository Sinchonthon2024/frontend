// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAcc4WhAWHj_m56GBXGbQU_zI0SJH7KQM",
  authDomain: "sinchonton2024.firebaseapp.com",
  projectId: "sinchonton2024",
  storageBucket: "sinchonton2024.appspot.com",
  messagingSenderId: "381309472506",
  appId: "1:381309472506:web:584dbe5585527587064343",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
