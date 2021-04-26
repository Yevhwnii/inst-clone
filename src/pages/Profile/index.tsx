import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';

import * as ROUTES from '../../constants/routes';
import { getUserByUsername } from '../../services/firebase';
import { IUser } from '../../services/types';
import Profile from '../../components/Profile';
import Header from '../../components/Header';

const ProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const history = useHistory();
  const [userExists, setUserExists] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const checkUserExists = async () => {
      const doesUserExists = await getUserByUsername(username);
      if (doesUserExists.length > 0) {
        setUser(doesUserExists[0]);
        setUserExists(true);
      } else {
        setUserExists(false);
        history.push(ROUTES.NOT_FOUND);
      }
    };

    checkUserExists();
  }, [username, history]);
  return userExists ? (
    <div className='bg-gray-background'>
      <Header />
      <div className='mx-auto max-w-screen-lg'>
        {user && <Profile user={user} />}
      </div>
    </div>
  ) : null;
};

export default ProfilePage;
