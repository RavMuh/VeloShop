import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import { products } from '../lib/data';

// Firebase config (same as in lib/firebaseClient.ts)
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
const db = getFirestore(app);

async function importProducts() {
  for (const product of products) {
    // Convert category object to just its id for Firestore
    const productData = {
      ...product,
      category: product.category.id,
    };
    try {
      await setDoc(doc(db, 'products', product.id), productData);
      console.log(`✅ Imported: ${product.name}`);
    } catch (error) {
      console.error(`❌ Error importing ${product.name}:`, error);
    }
  }
  process.exit(0);
}

importProducts(); 