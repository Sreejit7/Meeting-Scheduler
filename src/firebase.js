import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCWR7xyiMNVWk5OyGcGUidOiAuu99cHtFI",
  authDomain: "scheduler-c021b.firebaseapp.com",
  projectId: "scheduler-c021b",
  storageBucket: "scheduler-c021b.appspot.com",
  messagingSenderId: "188640474706",
  appId: "1:188640474706:web:b53999e127d9df0ff3918b"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };