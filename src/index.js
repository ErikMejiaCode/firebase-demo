import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

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
const qRef = query(collectionRef, where("category", "==", "drama"));

//Fetching documents
getDocs(qRef)
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

//Adding snapshot
// onSnapshot(collectionRef, (data) => {
//   let movies = [];
//   data.docs.forEach((document) => {
//     movies.push({ ...document.data(), id: document.id });
//   });
//   console.log(movies);
// });

//Adding document to firebase db (addDoc)
const addForm = document.querySelector(".add");
addForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addDoc(collectionRef, {
    name: addForm.name.value,
    desciption: addForm.description.value,
    category: addForm.category.value,
  }).then(() => {
    addForm.reset();
  });
});

//Deleting document from firebase db (deleteDoc)
const deleteForm = document.querySelector(".delete");
deleteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const documentReference = doc(db, "movies", deleteForm.id.value);
  deleteDoc(documentReference).then(() => {
    deleteForm.reset();
  });
});
