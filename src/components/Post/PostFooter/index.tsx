import React from 'react';

interface PostFooterProps {
  caption: string;
  username: string;
}

const PostFooter: React.FC<PostFooterProps> = ({ caption, username }) => {
  return (
    <div className='p-4 pt-2 pb-0'>
      <span className='mr-1 font-bold'>{username}</span>
      <span>{caption}</span>
    </div>
  );
};

export default PostFooter;
