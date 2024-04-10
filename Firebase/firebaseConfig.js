import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCq_mffvRoYH11BZjk2hDHYODYzgErbTZY",
  authDomain: "seniordesign-e83c6.firebaseapp.com",
  databaseURL: "https://seniordesign-e83c6-default-rtdb.firebaseio.com",
  projectId: "seniordesign-e83c6",
  storageBucket: "seniordesign-e83c6.appspot.com",
  messagingSenderId: "889627653285",
  appId: "1:889627653285:web:077829d1fb91931faa094c",
  measurementId: "G-XHB3YS9Z7E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Firebase Storage and get a reference to the service
const storage = getStorage(app)

export { auth, db, storage, usersRef};