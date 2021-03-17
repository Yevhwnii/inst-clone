import React, { useContext, useState } from 'react';
import AuthContext from '../../../context/auth';
import FirebaseContext from '../../../context/firebase';
import { IComment } from '../../../services/types';

interface AddCommentProps {
  docId: string;
  comments: IComment[];
  setComments: React.Dispatch<React.SetStateAction<IComment[]>>;
  commentInput: any;
}

const AddComment: React.FC<AddCommentProps> = ({
  docId,
  commentInput,
  comments,
  setComments,
}) => {
  const [comment, setComment] = useState('');
  const { FieldValue, firebase } = useContext(FirebaseContext);
  const { authUser } = useContext(AuthContext);

  const handleSubmitComment = (event: any) => {
    event.preventDefault();
    // Take new comment and add it to array of existing comments
    setComments([
      ...comments,
      { displayName: authUser!.displayName!, comment },
    ]);
    setComment('');

    return firebase
      ?.firestore()
      .collection('photos')
      .doc(docId)
      .update({
        comments: FieldValue?.arrayUnion({
          displayName: authUser!.displayName,
          comment,
        }),
      });
  };
  return (
    <div className=' border-t border-gray-primary'>
      <form
        className='flex justify-between pl-0 pr-5'
        method='POST'
        onSubmit={(event) =>
          comment.length >= 1
            ? handleSubmitComment(event)
            : event.preventDefault()
        }>
        <input
          aria-label='Add a comment'
          autoComplete='off'
          className='text-sm text-gray-base w-full mr-3 py-5 px-4 outline-none'
          type='text'
          name='add-comment'
          placeholder='Add a comment...'
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          ref={commentInput}
        />
        <button
          className={`text-sm font-bold text-blue-medium outline-none focus:outline-none  ${
            !comment && 'opacity-25'
          }`}
          type='button'
          disabled={comment.length < 1}
          onClick={handleSubmitComment}>
          Post
        </button>
      </form>
    </div>
  );
};

export default AddComment;
