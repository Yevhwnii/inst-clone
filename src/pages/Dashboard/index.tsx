import React, { useEffect } from 'react';

import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Timeline from '../../components/Timeline';

const Dashboard: React.FC = () => {
  useEffect(() => {
    document.title = 'Dashboard - Instagram';
  }, []);

  // UserContext outputs user document in users collection and shares it in whole application whilst authUser is user object from firebase.auth()
  return (
    <div className='bg-gray-background'>
      <Header />
      <div className='grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg'>
        <Timeline />
        <Sidebar />
      </div>
    </div>
  );
};

export default Dashboard;
