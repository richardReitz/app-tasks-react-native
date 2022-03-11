import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAN65n3YUUPD7pa8DA9cv-N5QwOdiUrlxA",
    authDomain: "meuapp-a52b1.firebaseapp.com",
    databaseURL: "https://meuapp-a52b1-default-rtdb.firebaseio.com",
    projectId: "meuapp-a52b1",
    storageBucket: "meuapp-a52b1.appspot.com",
    messagingSenderId: "482319045508",
    appId: "1:482319045508:web:b3a656044ee237339a03d1",
    measurementId: "G-J8MF89RPRV"
  };
  
  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }
  export default firebase;