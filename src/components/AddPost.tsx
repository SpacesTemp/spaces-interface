import React from 'react';
import styled from 'styled-components';
import Slider from '@material-ui/core/Slider';

const Modal = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.modalBackground};
`;

const Close = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
`;

const ModalBody = styled.div`
  height: 80%;
  width: 80%;
  margin: auto;
  position: relative;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 4px;
`;

const PostForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 24px;

  input, textarea {
    width: 100%;
    border: 1px solid ${({ theme }) => theme.colors.borderGrey};
    border-radius: 4px;
    padding: 8px;
    margin: 8px 0;
  }

  label {
    margin: 16px 0 0;
  }

  button {
    margin: 8px auto;
    border-radius: 8px;
    text-align: center;
    padding: 15px 60px;
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

const AddPost: React.FC<{ open: boolean, onClose: () => void, onSubmit: () => void }> = ({ open, onClose, onSubmit }) => {
  if (!open) {
    return null;
  }

  return (
    <Modal>
      <ModalBody>
        <Close onClick={onClose}>Close</Close>
        <PostForm onSubmit={onSubmit}>
          <h3>Add a post</h3>

          <label htmlFor="postTitle">Title:</label>
          <input name="postTitle" type="text" />

          <label htmlFor="content">Content:</label>
          <textarea name="content" rows={10} />
          <Slider
            defaultValue={0.5}
            aria-labelledby="Donation"
            valueLabelDisplay="on"
            step={0.1}
            marks
            min={0.00}
            max={2}
            name="donation"
          />
          <button type="submit">Submit</button>
        </PostForm>
      </ModalBody>
    </Modal>
  );
}

export default AddPost;