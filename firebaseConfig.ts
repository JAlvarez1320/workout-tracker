import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCKBy3tIu2JBABGAP3Q9uDeg34t56Ftaho",
  authDomain: "workouttracker-98359.firebaseapp.com",
  databaseURL: "https://workouttracker-98359-default-rtdb.firebaseio.com",
  projectId: "workouttracker-98359",
  storageBucket: "workouttracker-98359.firebasestorage.app",
  messagingSenderId: "102650884840",
  appId: "1:102650884840:web:4257a68457ad54cfe60f5d",
  measurementId: "G-B904818CGW",
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);