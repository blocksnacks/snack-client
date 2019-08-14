import React, { useRef, useEffect, useState } from 'react';
import {
  Button,
  Fab,
  makeStyles
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import SharedDocument from '../../models/SharedDocument';

import './UploadFile.css';

const useStyles = makeStyles(theme => ({
  fab: { margin: theme.spacing(1) },
  button: { margin: theme.spacing(1) }
}));

const UploadFile = ({ userGroup, userSession }) => {
  const classes = useStyles();
  const fileInput = useRef(null);
  const [fileList, setFileList] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const submitDocuments = async () => {
      if (submitted) {
        setSubmitted(false);
        // TODO add error catching to this async mess
        await Promise.all(fileList.map(fileObj => new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = async (evt) => {
            const fileStr = evt.target.result;
            const sharedDoc = new SharedDocument({
              name: fileObj.name,
              extension: fileObj.name.split('.').pop(),
              mimeType: fileObj.type,
              userGroupId: userGroup._id,
              uploadedBy: userSession.loadUserData().username,
              size: fileObj.size,
              content: fileStr,
            });
            await sharedDoc.save();
            resolve();
          };
          reader.readAsDataURL(fileObj);
        })));
        // Print some sort of success message here
        setFileList(null);
      }
    };
    submitDocuments();
  }, [fileList, userGroup._id, userSession, submitted]);

  const handleFileSubmit = () => {
    setFileList(Array.from(fileInput.current.files));
    if (!fileList || !fileList.length) {
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="share-wrapper">
      <h2 className="share-header">Share with {userGroup.attrs.name}</h2>
      <div className="share-file-container">
        <section className="share-file-main">
          <div className="share-file-upload-file">
            <input
              id="hidden-file-input"
              multiple
              type="file"
              ref={fileInput}
              onChange={() => setFileList(Array.from(fileInput.current.files))}
            />
            <label htmlFor="hidden-file-input">
              <Fab aria-label="add" component="span" color="primary" className={classes.fab}>
                <Add />
              </Fab>
            </label>
            <p className="no-margin">Drag and drop files</p>
            <p className="no-margin center"> or click to send up to X FILE SIZE</p>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleFileSubmit}
            >
              Upload Shiz
            </Button>
            {fileList && fileList.length ? fileList.map(file => <p key={file.name}>{file.name}</p>) : null}
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
