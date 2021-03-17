import { useContext } from 'react';
import Skeleton from 'react-loading-skeleton';

import UserContext from '../../context/user';
import usePhotos from '../../hooks/usePhotos';
import Post from '../Post';

const Timeline = () => {
  const { user } = useContext(UserContext);
  const { photos } = usePhotos(user);

  return (
    <div className='container col-span-2'>
      {!photos ? (
        <>
          <Skeleton count={2} width={640} height={400} className='mb-5' />
        </>
      ) : photos.length > 0 ? (
        photos.map((content) => <Post key={content.docId} content={content} />)
      ) : (
        <p className='text-center text-2xl'>
          Start following people to see photos!
        </p>
      )}
    </div>
  );
};

export default Timeline;
