import { useContext, useEffect, useState } from 'react';
import Firebase from 'firebase/app';
import { user } from 'rxfire/auth';

import FirebaseContext from '../context/firebase';

// Returns logged in user object
const useAuth = () => {
  const [authUser, setAuthUser] = useState<Firebase.User | null>(
    JSON.parse(localStorage.getItem('authUser') || 'null')
  );
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const auth = firebase?.auth();
    const subscription = user(auth!).subscribe(async (u) => {
      if (u) {
        setAuthUser(u);
        localStorage.setItem('authUser', JSON.stringify(u));
      } else {
        setAuthUser(null);
        localStorage.removeItem('authUser');
      }
    });

    return () => subscription.unsubscribe();
  }, [firebase]);

  return [authUser] as const;
};

export default useAuth;
