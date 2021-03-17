import { useEffect, useState } from 'react';
import { getPhotos } from '../services/firebase';
import { IPhoto, IUser } from '../services/types';

export interface IPhotoModified extends IPhoto {
  username: string;
  userLikedPhoto: boolean;
}

const usePhotos = (user: IUser) => {
  const [photos, setPhotos] = useState<IPhotoModified[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getTimelinePhotos = async () => {
      // array of users(ids) which are followed by logged in user --- example: ["WgfuSUrf", "SydefaSDdgfag"]
      // Check if user follows anyone and it is now a default object I created
      if (user.following.length > 0 && user.following[0] !== '') {
        const followedUserPhotos = await getPhotos(user.userId, user.following);
        followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
        setPhotos(followedUserPhotos);
        setLoading(false);
      }
    };
    getTimelinePhotos();
  }, [user]);

  return { photos, loading };
};

export default usePhotos;
