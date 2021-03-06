import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: 'instagram-clone-e37c1.firebaseapp.com',
  projectId: 'instagram-clone-e37c1',
  storageBucket: 'instagram-clone-e37c1.appspot.com',
  messagingSenderId: '903473105714',
  appId: '1:903473105714:web:018f5eb73743259da2a52b',
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

export { firebase, FieldValue };
