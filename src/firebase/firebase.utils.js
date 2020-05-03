import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDj8tgy8_ZdQziS917KP7zV-6Ax7B00fuY",
    authDomain: "bloggerspoint-12.firebaseapp.com",
    databaseURL: "https://bloggerspoint-12.firebaseio.com",
    projectId: "bloggerspoint-12",
    storageBucket: "bloggerspoint-12.appspot.com",
    messagingSenderId: "1084922125225",
    appId: "1:1084922125225:web:420f496b9b9a585c68c2b8",
    measurementId: "G-K865BCLKL2"

}


export const createUserProfileDocument = async (userAuth, additionalData) => {
if(!userAuth) return;

const userRef = firestore.doc(`users/${userAuth.uid}`);
const snapShot = await userRef.get();

if(!snapShot.exists){
    const {displayName,email} = userAuth;
    const createdAt = new Date();

    try{
        await userRef.set({
            displayName,
            email,
            createdAt,
            ...additionalData
        })
    }catch(error){
        console.log("Error Creating User", error.message);
    }
}
return userRef;
}

export const a = () => {
    const movieRef = firestore.doc(`movies/`);
const snapShot =  movieRef.get();
console.log(snapShot);

}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({
    'prompt': 'select_account'
  });


  export const signInWithGoogle = () => auth.signInWithPopup(provider);
  export default firebase;