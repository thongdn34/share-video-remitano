import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database"

const app = firebase.initializeApp({
  databaseURL: "https://share-video-remitano-default-rtdb.firebaseio.com/",
  apiKey: "AIzaSyCNHzGu6R7Osd6hfMYJjn0JocVY-0b5Vxo",
  authDomain: "share-video-remitano.firebaseapp.com",
  projectId: "share-video-remitano",
  storageBucket: "share-video-remitano.appspot.com",
  messagingSenderId: "1064066696968",
  appId: "1:1064066696968:web:6ea84774b51ce4146c0ebd",
  measurementId: "G-M186C986TN"
});

export const auth = app.auth();
export const database = app.database();
export default app;
