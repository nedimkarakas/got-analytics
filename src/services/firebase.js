import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyBlFEgp-x93QsnzdUB0J7G_h-pLk0yzoMo",
  authDomain: "got-analytics.firebaseapp.com",
  databaseURL: "https://got-analytics.firebaseio.com",
  projectId: "got-analytics",
  storageBucket: "got-analytics.appspot.com",
  messagingSenderId: "953410490273"
};

firebase.initializeApp(config);

export default firebase;