import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  updateFollowedUserFollowers,
  updateLoggedInUserFollowing,
} from '../../../../services/firebase';

interface SuggestedProfileProps {
  username: string;
  userId: string;
  userDocId: string;
  profileId: string;
  loggedInUserDocId: string;
}

const SuggestedProfile: React.FC<SuggestedProfileProps> = ({
  userId,
  username,
  profileId,
  userDocId,
  loggedInUserDocId,
}) => {
  const [followed, setFollowed] = useState(false);

  const handleFollowUser = async () => {
    setFollowed(true);

    // Update "following" array of current logged in user
    await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);
    // Update "followers" array of the user who is being followed
    await updateFollowedUserFollowers(userDocId, userId, false);
  };
  return !followed ? (
    <div className='flex flex-row items-center align-items justify-between '>
      <div className='flex items-center justify-between'>
        <img
          src={`/images/avatars/${username}.jpg`}
          alt={`${username} avatar`}
          className='rounded-full w-8 flex mr-3'
        />
        <Link to={`/p/${username}`}>
          <p className='font-bold text-sm'>{username}</p>
        </Link>
      </div>
      <button
        type='button'
        className='text-xs font-bold text-blue-medium'
        onClick={handleFollowUser}>
        Follow
      </button>
    </div>
  ) : null;
};

export default SuggestedProfile;
