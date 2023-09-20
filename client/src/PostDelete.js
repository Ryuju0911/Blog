import React from 'react';
import axios from 'axios';

const PostDelete = ({ postId }) => {

  const onSubmit = async (event) => {
    event.preventDefault();

    await axios.post(`http://posts.com/posts/${postId}/delete`, {
      postId,
    });
  };

  const refreshPage = () => setTimeout(() => {
    window.location.reload();
  }, 100);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <button
          onClick={refreshPage}
          className='btn btn-danger'
        >
          Delete
        </button>
      </form>
    </div>
  );
};

export default PostDelete;
