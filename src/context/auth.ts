import Firebase from 'firebase/app';
import { createContext } from 'react';

interface IAuthContext {
  authUser: Firebase.User | null;
}
const AuthContext = createContext<IAuthContext>({
  authUser: null,
});

export default AuthContext;
