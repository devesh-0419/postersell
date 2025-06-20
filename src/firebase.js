import {initializeApp} from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration


// Get a list of cities from your database

const firebaseConfig = {
  apiKey: "AIzaSyBWHNH4oCQvGEaHA_891xnrgxfXvS1kC70",
  authDomain: "posterland-165e2.firebaseapp.com",
  projectId: "posterland-165e2",
  storageBucket: "posterland-165e2.appspot.com",
  messagingSenderId: "227134161022",
  appId: "1:227134161022:web:343b8b456d14bb7ec4582f",
  databaseURL:"https://posterland-165e2-default-rtdb.firebaseio.com/"
};

export const app = initializeApp(firebaseConfig);