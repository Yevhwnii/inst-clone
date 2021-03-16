import { useEffect, useState } from 'react';

import { defaultUserObject } from '../context/user';
import { getUserById } from '../services/firebase';
import { IUser } from '../services/types';

// Returns user by requested id
const useUser = (userId: string) => {
  const [activeUser, setActiveUser] = useState<IUser>(defaultUserObject);

  useEffect(() => {
    const getUserObjectByUserId = async (userId: string) => {
      const user = await getUserById(userId);
      setActiveUser(user || defaultUserObject);
    };

    getUserObjectByUserId(userId);
  }, [userId]);

  return { user: activeUser };
};

export default useUser;
