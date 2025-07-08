import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBSkW-Rb02vj_fjR-fFWLI9WqWPzi3M808",
  authDomain: "veloshop-fa26b.firebaseapp.com",
  projectId: "veloshop-fa26b",
  storageBucket: "veloshop-fa26b.firebasestorage.app",
  messagingSenderId: "1080797647081",
  appId: "1:1080797647081:web:daa9bca71a938854c4e078",
  measurementId: "G-60T1GK78M8"
};


const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app); 