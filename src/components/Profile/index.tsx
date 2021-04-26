import React, { useEffect, useReducer } from 'react';
import { getUserPhotosByUserId } from '../../services/firebase';
import { IPhoto, IUser } from '../../services/types';
import ProfileHeader from './ProfileHeader';
import ProfilePhotos from './ProfilePhotos';

interface ProfileProps {
  user: IUser | null;
}

export interface ProfileState {
  profile: IUser | null;
  photosCollection: never[] | IPhoto[];
  followerCount: number;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const reducer = (state: ProfileState, newState: ProfileState) => ({
    ...state,
    ...newState,
  });
  const initialState: ProfileState = {
    profile: null,
    photosCollection: [],
    followerCount: 0,
  };
  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    const getProfileInfoAndPhotos = async () => {
      const photos = await getUserPhotosByUserId(user!.userId);

      dispatch({
        profile: user,
        photosCollection: photos,
        followerCount: user!.followers.length,
      });
    };
    getProfileInfoAndPhotos();
  }, [user]);
  return (
    <>
      <ProfileHeader
        photosCount={photosCollection ? photosCollection.length : 0}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch}
      />
      <ProfilePhotos photos={photosCollection} />
    </>
  );
};

export default Profile;
