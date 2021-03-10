import Firebase from 'firebase/app';
import { createContext } from 'react';

interface IUserContext {
  authUser: Firebase.User | null;
  userDoc: any;
}

const UserContext = createContext<IUserContext>({
  authUser: null,
  userDoc: null,
});

export default UserContext;
