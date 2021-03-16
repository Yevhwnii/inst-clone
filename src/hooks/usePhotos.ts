import { useEffect, useState } from 'react';
import { getPhotos } from '../services/firebase';
import { IPhoto, IUser } from '../services/types';

const usePhotos = (user: IUser) => {
  const [photos, setPhotos] = useState<IPhoto[] | null>(null);

  useEffect(() => {
    const getTimelinePhotos = async () => {
      // array of users(ids) which are followed by logged in user --- example: ["WgfuSUrf", "SydefaSDdgfag"]
      let followedUserPhotos = [];
      // Check if user follows anyone
      if (user.following.length > 0) {
        followedUserPhotos = await getPhotos(user.userId, user.following);
        setPhotos(followedUserPhotos);
      }
    };
    getTimelinePhotos();
  }, [user.userId, user.following]);

  return { photos };
};

export default usePhotos;
