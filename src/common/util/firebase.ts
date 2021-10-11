import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: 'AIzaSyAxFnYXbzEqhZySH0Iczb1-hwIy3q0HZ_4',
  authDomain: 'kaizen-journey.firebaseapp.com',
  projectId: 'kaizen-journey',
  storageBucket: 'kaizen-journey.appspot.com',
  messagingSenderId: '634911927220',
  appId: '1:634911927220:web:70e18c0177e209273b60e1'
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
