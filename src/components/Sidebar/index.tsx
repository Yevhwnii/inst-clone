import React, { useContext } from 'react';

import UserContext from '../../context/user';
import Suggestions from './Suggestions';
import User from './User';

const Sidebar = () => {
  const { user } = useContext(UserContext);

  if (!user.docId) {
    return null;
  }

  return (
    <div className='p-4 '>
      <User username={user.username} fullName={user.fullName} />
      <Suggestions
        userId={user.userId}
        following={user.following}
        loggedInUserDocId={user.docId}
      />
    </div>
  );
};

export default Sidebar;
