import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const PostEdit = ({ postId }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();

    await axios.post(`http://posts.com/posts/${postId}/edit`, {
      title,
    });

    setTitle('');
  };

  const refreshPage = () => setTimeout(() => {
    window.location.reload();
  }, 100);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button className='btn btn-success' onClick={openModal}>Edit</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <h2>Post Title Edit</h2>
        <button className='btn btn-light' onClick={closeModal}>close</button>
        <form onSubmit={onSubmit}>
          <input 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='form-control'
          />
          <button
            className='btn btn-primary'
            onClick={refreshPage}
          >
            save
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default PostEdit;
