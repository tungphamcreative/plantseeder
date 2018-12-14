import app from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBTAZmvIR-g0W0336mPvpXoYtXRDB3HkKY",
    authDomain: "plantseeder-creative.firebaseapp.com",
    databaseURL: "https://plantseeder-creative.firebaseio.com",
    projectId: "plantseeder-creative",
    storageBucket: "plantseeder-creative.appspot.com",
    messagingSenderId: "50393874337"
};

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
    }

    // *** Auth API ***

    doSignUpWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordChange = password =>
        this.auth.currentUser.updatePassword(password);
}

export default Firebase;
