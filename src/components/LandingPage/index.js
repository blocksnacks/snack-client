import React, { useContext } from 'react';
import { makeStyles, Button } from '@material-ui/core';

import EmailDialog from '../EmailDialog';
import SelectGroup from '../SelectGroup';
import { AppContext } from '../../contexts/AppContext';
import authNeeded from '../hocs/authNeeded';

const useStyles = makeStyles(theme => ({
  button: { margin: theme.spacing(1) }
}));

const LandingPage = ({ emailNotEntered, setEmailNotEntered }) => {
  const { userSession, userGroup } = useContext(AppContext);
  const classes = useStyles();

  const handleSignOut = () => {
    userSession.signUserOut('http://localhost:3000');
  };

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
      {emailNotEntered && <EmailDialog setEmailNotEntered={setEmailNotEntered} />}
      <SelectGroup />
    </div>
  );
};

export default authNeeded(LandingPage);