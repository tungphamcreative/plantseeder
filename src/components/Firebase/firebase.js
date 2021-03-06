import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

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
        this.db = app.firestore();
        this.db.settings({ timestampsInSnapshots: true });
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

    // *** Plant API ***

    doGetUserInformation = (uid) =>
        this.db.collection('users').doc(uid);

    doUpdateUserInformation = (uid, money, experience, level) => {
        this.db.collection('users').doc(uid).update({money, experience, level});
    }
    
    doGetPlantInformation = (uid) =>
        this.db.collection('users').doc(uid).collection('plants').orderBy('created');

    doUpdatePlantInformation = (uid, pid, growth, life, isDeath, isDone) =>
        this.db.collection('users').doc(uid).collection('plants').doc(pid).update({growth, life, isDeath, isDone});

    doCreateNewUserInformation = (uid, data) =>
        this.db.collection('users').doc(uid).set(data);

    doAddNewPlant = (uid, plant) => {
        this.db.collection('users').doc(uid).collection('plants').add({ ...plant,  created: app.firestore.FieldValue.serverTimestamp()});
    }

    doRestorePlantHeath = (uid, pid, life) => 
        this.db.collection('users').doc(uid).collection('plants').doc(pid).update({life});
    
    doRemovePlant = (uid, pid) => 
        this.db.collection('users').doc(uid).collection('plants').doc(pid).delete();
}

export default Firebase;
