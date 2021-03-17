import { useRef } from 'react';

import { IPhotoModified } from '../../hooks/usePhotos';
import PostHeader from './PostHeader';
import PostImage from './PostImage';
import PostActions from './PostActions';
import PostFooter from './PostFooter';
import PostComments from './PostComments';

interface PostProps {
  content: IPhotoModified;
}

const Post: React.FC<PostProps> = ({ content }) => {
  const commentInputRef = useRef<HTMLButtonElement>(null);

  const handleFocus = () => commentInputRef.current!.focus();
  return (
    <div className='rounded  col-span-4 border bg-white border-gray-primary mb-12'>
      <PostHeader username={content.username} />
      <PostImage src={content.imageSrc} caption={content.caption} />
      <PostActions
        docId={content.docId}
        totalLikes={content.likes.length}
        likedPhoto={content.userLikedPhoto}
        handleFocus={handleFocus}
      />
      <PostFooter caption={content.caption} username={content.username} />
      <PostComments
        docId={content.docId}
        posted={content.dateCreated}
        commentInput={commentInputRef}
        comments={content.comments}
      />
    </div>
  );
};

export default Post;
