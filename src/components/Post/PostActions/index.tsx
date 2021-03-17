import { useContext, useState } from 'react';
import FirebaseContext from '../../../context/firebase';
import UserContext from '../../../context/user';
import CommentsIcon from './commentsIcon';
import HeartIcon from './heartIcon';

interface PostActionsProps {
  docId: string;
  totalLikes: number;
  likedPhoto: boolean;
  handleFocus: () => void;
}

const PostActions: React.FC<PostActionsProps> = ({
  docId,
  totalLikes,
  likedPhoto,
  handleFocus,
}) => {
  const { user } = useContext(UserContext);
  const { FieldValue, firebase } = useContext(FirebaseContext);
  const [toggleLiked, setToggleLiked] = useState<boolean>(likedPhoto);
  const [likes, setLikes] = useState<number>(totalLikes);

  const handleToggleLiked = async () => {
    // Toggle heart button state
    setToggleLiked((toggleLiked) => !toggleLiked);

    await firebase
      ?.firestore()
      .collection('photos')
      .doc(docId)
      .update({
        likes: toggleLiked
          ? FieldValue?.arrayRemove(user.userId)
          : FieldValue?.arrayUnion(user.userId),
      });
    // Increment/decrement likes
    setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1));
  };

  return (
    <>
      <div className='flex justify-between p-4'>
        <div className='flex'>
          <HeartIcon
            onClick={handleToggleLiked}
            onKeyDown={(event: KeyboardEvent) => {
              if (event.key === 'Enter') {
                handleToggleLiked();
              }
            }}
            className={`w-8 mr-4 select-none cursor-pointer outline-none ${
              toggleLiked ? 'fill-red text-red-primary' : 'text-black-light'
            }`}
          />
          <CommentsIcon
            onClick={handleFocus}
            onKeyDown={(event: KeyboardEvent) => {
              if (event.key === 'Enter') {
                handleFocus();
              }
            }}
            className='w-8  cursor-pointer outline-none focus:outline-none select-none text-black-light'
          />
        </div>
      </div>
      <div className='p-4 py-0'>
        <p className='font-bold'>
          {likes === 1 ? `${likes} like` : `${likes} likes`}
        </p>
      </div>
    </>
  );
};

export default PostActions;
