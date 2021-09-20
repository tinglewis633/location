// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
import { toast } from "./toast";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGB1oKQI6zPMPvN3Fg3OEzkCZkB7eP02Y",
  authDomain: "tut-ionic.firebaseapp.com",
  projectId: "tut-ionic",
  storageBucket: "tut-ionic.appspot.com",
  messagingSenderId: "173911022142",
  appId: "1:173911022142:web:69adabe1043f8d14770f6f",
  measurementId: "G-R434C8WZWR",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export function loginUser(username: string, password: string) {
  const email = `${username}@123.com`;

  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      return true;
    })
    .catch((error) => {
      toast(error.message);
      return false;
    });
}

export async function registerUser(username: string, password: string) {
  const email = `${username}@123.com`;
  const auth = getAuth();
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    toast("registeration successful", 4000);
    return res;
  } catch (error: any) {
    toast(error.message, 4000);
    return false;
  }
}

// export function getCurrentUser() {
//   const user = getAuth().currentUser;

//   return user;
// }
export function loginGoogle() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  signInWithRedirect(auth, provider)
    .then((result: any) => {
      toast("Successful sign in with google", 4000);
    })
    .catch((error) => {
      toast(error.message, 4000);
    });
}

export function loginFacebook() {
  const provider = new FacebookAuthProvider();
  const auth = getAuth();
  signInWithRedirect(auth, provider)
    .then((result) => {
      toast("Successful sign in with facebook", 4000);
    })
    .catch((error) => {
      toast(error.message, 4000);
    });
}

export async function addTestData() {
  const db = getFirestore();
  const docRef = doc(db, "Places", "Places");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().places;
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    return false;
  }
}

export async function addTestData2() {
  const db = getFirestore();
  const dataArr: any = [];
  const querySnapshot = await getDocs(collection(db, "Places"));
  querySnapshot.forEach((doc: any) => {
    dataArr.push(doc.data());
  });
  return dataArr;
}

export async function addPlaceData(formDoc:any) {
  const db = getFirestore();
  const docRef = await addDoc(collection(db, "Places"), {
    formDoc,
  });
  await setDoc(doc(db, "Places", docRef.id), {
    ...formDoc,
    id: docRef.id,
  });
}
