import React, { useState } from 'react';
import styled from 'styled-components';
import Slider from '@material-ui/core/Slider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';

import { ThreadInput } from '../App';
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

const AddThread: React.FC<{ open: boolean, communityPoints: number, subtractCommunityPoints: ( communityPoints:number )=>void ,onClose: () => void, onSubmit: (thread: ThreadInput) => void }> = ({ open, communityPoints ,onClose, onSubmit, subtractCommunityPoints }) => {
  const [showSlider, setShowSlider] = useState(false);
  const classes = useStyles();
  if (!open) {
    return null;
  }

  const changeHandler = (event: React.ChangeEvent) => {
    const { target } = event;
    setShowSlider((target as HTMLInputElement).checked);
  }

  const submitHandler = (event: any) => {
    event.preventDefault();
    const { target } = event;
    const { name, paid: isPaid, payAmount } = target as any;

    if (isPaid && isPaid.checked){
      subtractCommunityPoints(communityPoints - payAmount.value);
    }

    onSubmit({
      name: (name as HTMLInputElement).value,
      isPaid: isPaid && isPaid.checked,
      payAmount: payAmount && parseFloat((payAmount as HTMLInputElement).value),
    });
  }

  return (
    <Modal onClose={onClose} open={open}>
      <ThreadForm onSubmit={submitHandler}>
        <h3>Add a Thread</h3>
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
            defaultValue={5}
            aria-labelledby="Donation"
            valueLabelDisplay="on"
            step={1}
            marks
            min={0}
            max={10}
            name="payAmount"
            className={classes.sliderRoot}
          />
        }
        <button type="submit">Submit</button>
      </ThreadForm>
    </Modal>
  );
}

export default AddThread;