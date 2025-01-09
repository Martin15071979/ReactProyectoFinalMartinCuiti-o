import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTjGQNhyMzUwhAa2hz-pcYQS4SwfzE8a0",
  authDomain: "entrega-react-martin-c.firebaseapp.com",
  projectId: "entrega-react-martin-c",
  storageBucket: "entrega-react-martin-c.firebasestorage.app",
  messagingSenderId: "680212623764",
  appId: "1:680212623764:web:f7a35222db956fe9605f81"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


ReactDOM.createRoot(document.getElementById('root')).render(

      <App />


)
