import { formatDistance } from 'date-fns';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IComment } from '../../../services/types';
import AddComment from './addComment';

interface PostCommentsProps {
  docId: string;
  comments: [IComment];
  posted: number;
  commentInput: any;
}

const PostComments: React.FC<PostCommentsProps> = ({
  commentInput,
  docId,
  posted,
  comments: allComments,
}) => {
  const [comments, setComments] = useState<IComment[]>(allComments);

  return (
    <>
      <div className='p-4 pt-1 pb-4'>
        {comments.length >= 3 && (
          <p className='text-sm text-gray-base mb-1 cursor-pointer'>
            View all {comments.length} comments
          </p>
        )}
        {comments.slice(-3).map((comment) => (
          <p
            key={`${comment.comment}-${comment.displayName}-${Math.random()}`}
            className='mb-1'>
            <Link to={`/p/${comment.displayName}`}>
              <span className='mr-1 font-bold'>{comment.displayName}</span>
            </Link>
            <span>{comment.comment}</span>
          </p>
        ))}
        <p className='text-gray-base uppercase text-xs mt-2'>
          {formatDistance(posted, new Date())} ago
        </p>
      </div>
      <AddComment
        docId={docId}
        comments={comments}
        setComments={setComments}
        commentInput={commentInput}
      />
    </>
  );
};

export default PostComments;
