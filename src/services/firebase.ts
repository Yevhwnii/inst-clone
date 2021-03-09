import { firebase, FieldValue } from '../lib/firebase';
import { collection } from 'rxfire/firestore';
import { map } from 'rxjs/operators';

export const doesUserExists = (username: string) => {
  const db = firebase.firestore();
  const userCollectionRef = db
    .collection('users')
    .where('username', '==', username);

  return collection(userCollectionRef).pipe(
    map((user) => (user.length > 0 ? true : false))
  );
};
