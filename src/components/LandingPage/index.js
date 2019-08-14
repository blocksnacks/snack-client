import React, { useState } from 'react';
import EmailDialog from '../EmailDialog';
import { makeStyles, Button } from '@material-ui/core';
import UploadFile from '../UploadFile';
import SelectGroup from '../SelectGroup';

const useStyles = makeStyles(theme => ({
  button: { margin: theme.spacing(1) }
}));

export default ({ emailNotEntered, setEmailNotEntered, userSession }) => {
  const [userGroup, setUserGroup] = useState('');

  const handleSignOut = () => {
    userSession.signUserOut('http://localhost:3000');
  };

  const classes = useStyles();

  return (
    <div className="main-container">
      <div className="logout-btn-container">
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleSignOut}
        >
          Logout
      </Button>
      </div>
      {emailNotEntered ? <EmailDialog setEmailNotEntered={setEmailNotEntered} /> : null}
      {userGroup
      ? <UploadFile userSession={userSession} userGroup={userGroup} />
      : <SelectGroup
          userGroup={userGroup}
          setUserGroup={setUserGroup}
          userSession={userSession}
        />}
    </div>
  );
};
