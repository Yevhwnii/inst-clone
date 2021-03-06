import Firebase from 'firebase/app';
import { createContext } from 'react';

interface IFirebaseContext {
  firebase?: Firebase.app.App;
  FieldValue?: typeof Firebase.firestore.FieldValue;
}

const FirebaseContext = createContext<IFirebaseContext>({});

export default FirebaseContext;
