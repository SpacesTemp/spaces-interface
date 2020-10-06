import React, { useState } from 'react';
import styled from 'styled-components';
import Slider from '@material-ui/core/Slider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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
})

const ThreadForm = styled.form`
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

const AddThread: React.FC<{ open: boolean, onClose: () => void }> = ({ open, onClose }) => {
  const [showSlider, setShowSlider] = useState(false);
  const classes = useStyles();
  if (!open) {
    return null;
  }

  const changeHandler = (event: React.ChangeEvent) => {
    const { target } = event;
    setShowSlider((target as HTMLInputElement).checked);
  }

  const submitHandler = () => {

  }

  return (
    <Modal onClose={onClose} open={open}>
      <ThreadForm onSubmit={submitHandler}>
        <h3>Add a post</h3>
        <TextField className={classes.textRoot} name="name" label="Name" variant="outlined" />

        <FormControlLabel
          className={classes.checkboxRoot}
          value="paid"
          control={<Checkbox
            name="paid" checked={showSlider} onChange={changeHandler}
            inputProps={{ 'aria-label': 'Want to create a paid thread?' }}
          />}
          label="Want to create a paid thread?"
          labelPlacement="start"
        />

        {
          showSlider &&
          < Slider
            defaultValue={0.5}
            aria-labelledby="Donation"
            valueLabelDisplay="on"
            step={0.1}
            marks
            min={0.00}
            max={2}
            name="donation"
            className={classes.sliderRoot}
          />
        }
        <button type="submit">Submit</button>
      </ThreadForm>
    </Modal>
  );
}

export default AddThread;