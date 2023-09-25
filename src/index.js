import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCR4NA1mV2xaN2qZJGCHOz_3OPzfSSuOAE",
  authDomain: "notnotion-fdcbb.firebaseapp.com",
  projectId: "notnotion-fdcbb",
  storageBucket: "notnotion-fdcbb.appspot.com",
  messagingSenderId: "603450231808",
  appId: "1:603450231808:web:aaec7cd752eff03f81dce5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const collectionRef = collection(db, "movies");

getDocs(collectionRef)
  .then((data) => {
    let movies = [];
    data.docs.forEach((document) => {
      movies.push({ ...document.data(), id: document.id });
    });
    console.log(movies);
  })
  .catch((error) => {
    console.log(error);
  });
