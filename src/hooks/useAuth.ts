import { useContext, useEffect, useState } from 'react';
import Firebase from 'firebase/app';
import { user } from 'rxfire/auth';

import FirebaseContext from '../context/firebase';
import { getUserById } from '../services/firebase';

const useAuth = () => {
  const [authUser, setAuthUser] = useState<Firebase.User | null>(
    JSON.parse(localStorage.getItem('authUser') || 'null')
  );
  const [userDoc, setUserDoc] = useState<any>(null);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const auth = firebase?.auth();
    const subscription = user(auth!).subscribe(async (u) => {
      if (u) {
        setAuthUser(u);
        setUserDoc(await getUserById(u.uid));
        localStorage.setItem('authUser', JSON.stringify(u));
      } else {
        setAuthUser(null);
        setUserDoc(null);
        localStorage.removeItem('authUser');
      }
    });

    return () => subscription.unsubscribe();
  }, [firebase]);

  return [authUser, userDoc] as const;
};

export default useAuth;
