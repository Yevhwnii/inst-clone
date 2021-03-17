import React from 'react';

interface PostImageProps {
  src: string;
  caption: string;
}

const PostImage: React.FC<PostImageProps> = ({ src, caption }) => {
  return <img src={src} alt={caption} />;
};

export default PostImage;
