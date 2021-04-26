import React, { useContext, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import UserContext from '../../../context/user';
import {
  isUserFollowingProfile,
  toggleFollow,
} from '../../../services/firebase';
import { IUser } from '../../../services/types';

interface ProfileHeaderProps {
  photosCount: number;
  profile: IUser | null;
  followerCount: number;
  setFollowerCount: React.Dispatch<any>;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  photosCount,
  profile,
  followerCount,
  setFollowerCount,
}) => {
  const { user } = useContext(UserContext);
  const [isFollowingProfile, setIsFollowingProfile] = useState<boolean>(false);
  const [shouldRenderFollowBtn, setShouldRenderFollowBtn] = useState<boolean>(
    false
  );

  const handleToggleFollow = async () => {
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
    setFollowerCount({
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1,
    });
    await toggleFollow(
      isFollowingProfile,
      user.docId,
      profile!.docId,
      profile!.userId,
      user.userId
    );
  };

  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(
        user.userId,
        profile!.userId
      );

      setIsFollowingProfile(isFollowing);
      setShouldRenderFollowBtn(
        profile! && profile!.username !== user!.username
      );
    };

    if (user && profile) {
      isLoggedInUserFollowingProfile();
    }
  }, [profile, user]);
  return (
    <>
      {profile ? (
        <div className='grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg'>
          <div className='container flex justify-center'>
            <img
              className='rounded-full h-40 w-40 flex'
              alt={`${profile.username} profile`}
              src={`/images/avatars/${profile.username}.jpg`}
            />
          </div>
          <div className='flex items-center justify-center flex-col col-span-2'>
            <div className='container flex items-center'>
              <p className='text-2xl mr-4'>{profile.username}</p>
              {shouldRenderFollowBtn && (
                <button
                  className='bg-blue-medium font-bold text-sm rounded text-white w-20 h-8 '
                  type='button'
                  onClick={handleToggleFollow}>
                  {isFollowingProfile ? 'Unfollow' : 'Follow'}
                </button>
              )}
            </div>
            <div className='container flex mt-4'>
              {!profile ? (
                <Skeleton count={1} width={677} height={24} />
              ) : (
                <>
                  <p className='mr-10'>
                    <span className='font-bold'>{photosCount} </span>photos
                  </p>
                  <p className='mr-10'>
                    <span className='font-bold'>{followerCount}</span>{' '}
                    {followerCount === 1 ? 'follower' : 'followers'}
                  </p>
                  <p className='mr-10'>
                    <span className='font-bold'>
                      {profile.following.length}
                    </span>{' '}
                    {profile.following.length === 1 ? 'follower' : 'followers'}
                  </p>
                </>
              )}
            </div>
            <div className='container mt-4'>
              <p className='font-medium'>
                {!profile.fullName ? (
                  <Skeleton height={24} width={24} />
                ) : (
                  profile.fullName
                )}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <Skeleton count={1} width={'80%'} height={'10rem'} />
      )}
    </>
  );
};

export default ProfileHeader;
