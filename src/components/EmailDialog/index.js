import React, { useState, useEffect } from 'react';
import { Central } from 'radiks';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { USER_SETTINGS } from '../../constants';

export default ({ setEmailNotEntered }) => {
  const [emailAddress, setEmailAddress] = useState('');
  const [open, setOpen] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    const submitEmail = async () => {
      try {
        await Central.save(USER_SETTINGS, { email: emailAddress });
        setOpen(false);
        setEmailNotEntered(false);
      } catch (err) {
        console.error(err);
        setErrored(true);
      }
    };
    if (submitting) {
      submitEmail();
    }
  }, [submitting, emailAddress, setEmailNotEntered]);

  return (
    <Dialog open={open}>
      <DialogTitle>Please Enter Your Email</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {errored
            ? 'Something went wrong. Please reload the page.'
            : 'In order to share files with other users, you must enter your email address.'}
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Email Address"
          type="email"
          fullWidth
          onChange={evt => setEmailAddress(evt.target.value)}
          value={emailAddress}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setSubmitting(true)}
          color="primary"
          disabled={submitting || !emailAddress}
        >Sign Up</Button>
      </DialogActions>
    </Dialog>
  );
};
