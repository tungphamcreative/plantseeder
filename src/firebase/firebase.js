import firebase from 'firebase/app';

const config = {
    apiKey: "AIzaSyBTAZmvIR-g0W0336mPvpXoYtXRDB3HkKY",
    authDomain: "plantseeder-creative.firebaseapp.com",
    databaseURL: "https://plantseeder-creative.firebaseio.com",
    projectId: "plantseeder-creative",
    storageBucket: "plantseeder-creative.appspot.com",
    messagingSenderId: "50393874337"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
  auth
};