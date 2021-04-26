import React from 'react';
import Skeleton from 'react-loading-skeleton';

import { IPhoto } from '../../../services/types';
import HeartIcon from '../../Post/PostActions/heartIcon';
import CommentsIcon from '../../Post/PostActions/commentsIcon';

interface ProfilePhotosProps {
  photos: IPhoto[];
}

const ProfilePhotos: React.FC<ProfilePhotosProps> = ({ photos }) => {
  return (
    <div className='h-16 border-t border-gray-primary mt-12 pt-4'>
      <div className='grid grid-cols-3 gap-8 mt-4 mb-12'>
        {!photos ? (
          <>
            <Skeleton count={12} width={320} height={400} />
          </>
        ) : photos.length > 0 ? (
          photos.map((photo) => (
            <div key={photo.docId} className='relative group'>
              <img src={photo.imageSrc} alt={photo.caption} />
              <div className='absolute bottom-0 left-0 bg-gray-200 z-10 w-full justify-evenly items-center h-full bg-black-faded group-hover:flex hidden'>
                <p className='flex items-center text-white font-bold'>
                  <HeartIcon className='w-8 mr-4' />
                  {photo.likes.length}
                </p>
                <p className='flex items-center text-white font-bold'>
                  <CommentsIcon className='w-8 mr-4' />
                  {photo.comments.length}
                </p>
              </div>
            </div>
          ))
        ) : null}
      </div>

      {!photos ||
        (photos.length === 0 && (
          <p className='text-center text-2xl '>No Posts Yet</p>
        ))}
    </div>
  );
};

export default ProfilePhotos;
