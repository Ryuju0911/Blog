import React, { useState } from 'react';
import axios from 'axios';

const CommentCreate = ({ postId }) => {
  const [content, setContent] = useState('')

  const onSubmit = async (event) => {
    event.preventDefault();

    await axios.post(`http://posts.com/posts/${postId}/comments`, {
      content,
    });

    setContent("");
  };

  const refreshPage = () => setTimeout(() => {
    window.location.reload();
  }, 100);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>New Comment</label>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className='form-control'
          />
        </div>
        <button
          onClick={refreshPage}
          className='btn btn-primary'
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CommentCreate;
