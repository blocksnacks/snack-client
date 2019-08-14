import React from 'react';
import {
  Button,
  Fab,
  makeStyles
} from '@material-ui/core';
import { Add } from '@material-ui/icons';

import './UploadFile.css';

const useStyles = makeStyles(theme => ({
  fab: { margin: theme.spacing(1) },
  button: { margin: theme.spacing(1) }
}));

const UploadFile = ({ userGroup }) => {
  const classes = useStyles();

  return (
    <div className="share-wrapper">
      <h2 className="share-header">Share with {userGroup.attrs.name}</h2>
      <div className="share-file-container">
        <section className="share-file-main">
          <div className="share-file-upload-file">
            <Fab color="primary" aria-label="add" className={classes.fab}>
              <Add />
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
    </div>
  );
}

export default UploadFile;
