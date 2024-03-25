import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAck7dO2IktKeLtssoCXCp1nX6nSpp0ky4",
  authDomain: "senior-design-project-bb885.firebaseapp.com",
  databaseURL: "https://senior-design-project-bb885-default-rtdb.firebaseio.com/",
  projectId: "senior-design-project-bb885",
  storageBucket: "senior-design-project-bb885.appspot.com",
  messagingSenderId: "1011357809155",
  appId: "1:1011357809155:web:6be061ab4c2f89a2a12c36",
  measurementId: "G-ML88BBXMXB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { auth, db };
