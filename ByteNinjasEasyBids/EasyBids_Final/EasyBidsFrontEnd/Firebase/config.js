import { getFirestore } from '@firebase/firestore';
// import * as firebase from 'firebase/compat';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
const firebase = require('firebase/compat');
require('firebase/compat/auth');
require('firebase/compat/firestore');

const axios = require('axios');

const firebaseConfig = {
  apiKey: "AIzaSyDrnQM3wP9Y-GIa38wqudEjBXbRjnTXSXY",
  authDomain: "easybids-515a2.firebaseapp.com",
  projectId: "easybids-515a2",
  storageBucket: "easybids-515a2.appspot.com",
  messagingSenderId: "182436239437",
  appId: "1:182436239437:web:6b51e0353b181323702404",
  measurementId: "G-GEWR6ML79C"
};

firebase.initializeApp(firebaseConfig);

let currentUser = {};
let MongoCurUser = {};
firebase.auth().onAuthStateChanged(
    (user) => {
        currentUser = user;

        axios.get('http://localhost:3000/users/email/'+currentUser.email)
        .then(function (response) {
          console.log("***userEmail email***"+JSON.stringify(response.data));
          MongoCurUser = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });

        
    }
);

export const { db } = firebase.firestore();
export { firebase };
export { currentUser };
export { MongoCurUser };