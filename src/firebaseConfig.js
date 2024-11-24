// src/firebase-config.js

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCwCbYvc58reRxrQ69LR7ONQKGXjIj1GFQ",
  authDomain: "ms-accesorios-39e20.firebaseapp.com",
  projectId: "ms-accesorios-39e20",
  storageBucket: "ms-accesorios-39e20.firebasestorage.app",
  messagingSenderId: "804799242127",
  appId: "1:804799242127:web:d01afd6239c3f5ee3c35fa",
  measurementId: "G-X1PTWW07HS",
};

export const app = initializeApp(firebaseConfig);
