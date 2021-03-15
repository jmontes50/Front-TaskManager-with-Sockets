import firebase from "firebase/app";
import "firebase/auth";

const config = {
    // apiKey: process.env.REACT_APP_API_KEY,
    // authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    // // databaseURL: process.env.REACT_APP_DATABASE_URL,
    // projectId: process.env.REACT_APP_PROJECT_ID,
    // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    // messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    apiKey: "AIzaSyBdUcuM_LSunx9Lj7PkNsnZUI0_Vxdr3eM",
    authDomain: "tasks-e039f.firebaseapp.com",
    projectId: "tasks-e039f",
    storageBucket: "tasks-e039f.appspot.com",
    messagingSenderId: "975064861677",
    appId: "1:975064861677:web:33878d934762745e3f35e4"
};

firebase.initializeApp(config);
const auth = firebase.auth();

export {
  firebase,
  auth
}