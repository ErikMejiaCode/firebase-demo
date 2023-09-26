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
  orderBy,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

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
const auth = getAuth();

const collectionRef = collection(db, "movies");
const qRef = query(
  collectionRef,
  where("category", "==", "drama"),
  orderBy("createdAt")
);
const documentReference = doc(db, "movies", "rnJsgJ30dgz9pP96WhPC");

//Fetching 1 individual document
onSnapshot(documentReference, (document) => {
  console.log(document.data(), document.id);
});

//Fetching documents
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
    category: addForm.category.value,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
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

//Updating document from firebase db (updateDoc)
const updateForm = document.querySelector(".update");
updateForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const documentReference = doc(db, "movies", updateForm.id.value);
  updateDoc(documentReference, {
    name: updateForm.name.value,
    updatedAt: serverTimestamp(),
  }).then(() => {
    updateForm.reset();
  });
});

//Capturing information for Register
const registerForm = document.querySelector(".register");
registerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  createUserWithEmailAndPassword(
    auth,
    registerForm.email.value,
    registerForm.password.value
  )
    .then((credentials) => {
      //   console.log(credentials);
      registerForm.reset();
    })
    .catch((error) => {
      console.log(error);
    });
});

//Logout Button
const logoutButton = document.querySelector(".logout");
logoutButton.addEventListener("click", (event) => {
  signOut(auth)
    .then(() => {
      console.log("User Logged Out");
    })
    .catch((error) => {
      console.log(error);
    });
});

//Login Form
const loginForm = document.querySelector(".login");
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  signInWithEmailAndPassword(
    auth,
    loginForm.email.value,
    loginForm.password.value
  )
    .then((credentials) => {
      console.log(credentials.user);
      loginForm.reset();
    })
    .catch((error) => {
      console.log(error);
    });
});
