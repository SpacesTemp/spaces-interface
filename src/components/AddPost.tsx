import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';

import { PostInput } from '../App';
import Modal from './Modal';

const useStyles = makeStyles({
  textRoot: {
    width: '100%',
    marginBottom: 10,
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

  button {
    margin: 8px auto;
    border-radius: 8px;
    text-align: center;
    padding: 15px 60px;
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

const AddPost: React.FC<{ open: boolean, onClose: () => void, onSubmit: (post: PostInput) => void }> = ({ open, onClose, onSubmit }) => {
  const classes = useStyles();

  if (!open) {
    return null;
  }

  const submitHandler = (event: any) => {
    event.preventDefault();
    const { title, content } = event.target;

    onSubmit({
      title: title.value,
      content: content.value,
    })
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