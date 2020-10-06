import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';

import Modal from './Modal';

const useStyles = makeStyles({
  textRoot: {
    width: '100%',
  },
  checkboxRoot: {
    width: '100%',
    flexDirection: 'row',
    margin: 0,
  },
  sliderRoot: {
    marginTop: 40,
  }
});

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

const AddPost: React.FC<{ open: boolean, onClose: () => void }> = ({ open, onClose }) => {
  const classes = useStyles();
  if (!open) {
    return null;
  }

  const submitHandler = () => {

  }

  return (
    <Modal onClose={onClose} open={open}>
      <PostForm onSubmit={submitHandler}>
        <h3>Add a post</h3>

        <TextField className={classes.textRoot} name="title" label="Title" variant="outlined" />
        <TextField className={classes.textRoot} name="content" multiline rows={10} label="Content" variant="outlined" />

        <button type="submit">Submit</button>
      </PostForm>
    </Modal>
  );
}

export default AddPost;