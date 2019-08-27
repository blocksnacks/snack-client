import React, {
  useRef,
  useEffect,
  useState,
  useContext
} from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import {
  Button,
  Fab,
  makeStyles
} from '@material-ui/core';
import { Add } from '@material-ui/icons';

import './UploadFile.css';

import SharedDocument from '../../models/SharedDocument';
import { AppContext } from '../../contexts/AppContext';
import { authNeeded, addNavbar } from '../hocs';

const useStyles = makeStyles(theme => ({
  fab: { margin: theme.spacing(1) },
  button: { margin: theme.spacing(1) }
}));

const UploadFile = ({ history }) => {
  const { userGroup, userSession } = useContext(AppContext);
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
            history.push('/shared');
            resolve();
          };
          reader.readAsDataURL(fileObj);
        })));
        // Print some sort of success message here
        setFileList(null);
      }
    };
    submitDocuments();
  }, [fileList, userGroup, userSession, submitted]);

  const handleFileSubmit = () => {
    setFileList(Array.from(fileInput.current.files));
    if (!fileList || !fileList.length) {
      return;
    }
    setSubmitted(true);
  };

  return (
    userGroup
      ? (
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
                <p className="no-margin">Click to add</p>
                <p className="no-margin center">files to share</p>
                {fileList && fileList.length && (
                  <>
                    <div className="file-list">
                      <h4>Files to share:</h4>
                      <ul>
                        {fileList.map(file => <li className="no-margin" key={file.name}>{file.name}</li>)}
                      </ul>
                    </div>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={handleFileSubmit}
                      fullWidth
                    >
                      Send Files
                    </Button>
                  </>
                )}
              </div>
              <div className="share-file-description">
                <h1 className="no-margin"> Simple Private BlockSnack File Sharing</h1>
                <p>Add the files you'd like to share with your group</p>
              </div>
            </section>
          </div>
        </div>)
      : <Redirect to="/" />
  );
}

export default authNeeded(addNavbar(withRouter(UploadFile)));
