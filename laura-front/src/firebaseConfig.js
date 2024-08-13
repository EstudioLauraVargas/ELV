
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';



const firebaseConfig = {
  apiKey: "AIzaSyBZN1zCODMRr1tYQHbGl-LvEZz-sdf0xJA",
  authDomain: "academialv-5f05b.firebaseapp.com",
  projectId: "academialv-5f05b",
  storageBucket: "academialv-5f05b.appspot.com",
  messagingSenderId: "717699670752",
  appId: "1:717699670752:web:ed178b261f549d19746685"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };