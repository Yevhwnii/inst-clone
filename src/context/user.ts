import { createContext } from 'react';

import { IUser } from '../services/types';

interface IUserContext {
  user: IUser;
}

export const defaultUserObject: IUser = {
  dateCreated: new Date(),
  docId: '',
  emailAddress: '',
  followers: [''],
  following: [''],
  fullName: '',
  userId: '',
  username: '',
};
const UserContext = createContext<IUserContext>({
  user: { ...defaultUserObject },
});

export default UserContext;
