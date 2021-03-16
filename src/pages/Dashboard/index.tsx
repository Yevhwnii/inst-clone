import React, { useContext, useEffect } from 'react';

import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Timeline from '../../components/Timeline';
import AuthContext from '../../context/auth';
import UserContext from '../../context/user';
import useUser from '../../hooks/useUser';

const Dashboard: React.FC = () => {
  const { authUser } = useContext(AuthContext);
  const { user: loggedInUser } = useUser(authUser?.uid || '');
  useEffect(() => {
    document.title = 'Dashboard - Instagram';
  }, []);

  // UserContext outputs user document in users collection and shares it in whole application whilst authUser is user object from firebase.auth()
  return (
    <UserContext.Provider value={{ user: loggedInUser }}>
      <div className='bg-gray-background'>
        <Header />
        <div className='grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg'>
          <Timeline />
          <Sidebar />
        </div>
      </div>
    </UserContext.Provider>
  );
};

export default Dashboard;
