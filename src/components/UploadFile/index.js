import React from 'react';
import './UploadFile.css';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import { User, getConfig } from 'radiks';
import SelectUser from '../SelectUser';

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
})
);

const handleSignIn = async () => {
  const { userSession } = getConfig();
  if (userSession.isSignInPending()) {
    await userSession.handlePendingSignIn();
    await User.createWithCurrentUser();
  }
};

const handleSignOut = () => {
  const { userSession } = getConfig();
  userSession.signUserOut('http://localhost:3000');
}

const UploadFile = () => {
  handleSignIn();
  const classes = useStyles();
  return (
    <div>
      <div className="share-file-container">
        <section className="share-file-main">
          <div className="share-file-upload-file">
            <Fab color="primary" aria-label="add" className={classes.fab}>
              <AddIcon />
            </Fab>
            <p className="no-margin">Drag and drop files</p>
            <p className="no-margin center"> or click to send up to X FILE SIZE</p>
            <Button variant="contained" color="primary" className={classes.button}>
              Upload Shiz
          </Button>
          </div>
          <div className="share-file-description">
            <h1 className="no-margin"> Simple Private BlockSnack File Sharing</h1>
            <p>Juicy meatballs brisket slammin' baked shoulder. Juicy smoker soy sauce burgers brisket. polenta mustard hunk greens. Wine technique snack skewers chuck excess. Oil heat slowly.</p>
          </div>
        </section>
      </div>
      <SelectUser />
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleSignOut}
      >
        Logout
      </Button>
    </div>
  );
}

export default UploadFile;
