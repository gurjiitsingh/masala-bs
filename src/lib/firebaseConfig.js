//gstadeveloper@gmail.com
//Cloud Firestore
//food-app




// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
     apiKey: "AIzaSyDSclhhaokNKKe3yMwHLDQvYeqOwb3HpU8",
     authDomain: "food-app-88776.firebaseapp.com",
     projectId: "food-app-88776",
     storageBucket: "food-app-88776.firebasestorage.app",
     messagingSenderId: "989447682967",
     appId: "1:989447682967:web:b8f9c099c2d4063b52e2d2"
};




// Initialize Firebase

let app;
try {
     app = initializeApp(firebaseConfig);
} catch (error) {
 console.log(error)   
}


export const db = getFirestore(app);

