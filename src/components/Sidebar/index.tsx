import React, { useContext } from 'react';

import UserContext from '../../context/user';
import Suggestions from './Suggestions';
import User from './User';

const Sidebar = () => {
  const { userDoc } = useContext(UserContext);

  console.log(userDoc);

  return (
    <div className='p-4'>
      <User username={userDoc?.username} fullName={userDoc?.fullName} />
      <Suggestions
        userId={userDoc?.userId}
        following={userDoc?.following}
        loggedInUserDocId={userDoc?.docId}
      />
    </div>
  );
};

export default Sidebar;
