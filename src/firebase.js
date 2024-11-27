import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyDd_pAyCNgE2IgAto7PtVh0lxWYvbgV-q8",
  authDomain: "to--do--list-app.firebaseapp.com",
  databaseURL: "https://to--do--list-app-default-rtdb.firebaseio.com",
  projectId: "to--do--list-app",
  storageBucket: "to--do--list-app.appspot.com",
  messagingSenderId: "973939119253",
  appId: "1:973939119253:web:531aa8f40dcc35da15379c",
  measurementId: "G-HM9G4FJC4P"
};
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();