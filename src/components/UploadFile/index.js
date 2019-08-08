import React, { useState } from 'react';
import {
  Button,
  Input,
  Fab,
  makeStyles
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { UserGroup } from 'radiks';

import './UploadFile.css';
import { sendEmails } from '../../api';

import SelectUser from '../SelectUser';
import EmailDialog from '../EmailDialog';

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
})
);

const UploadFile = ({ emailNotEntered, setEmailNotEntered, userSession }) => {
  const [groupName, setGroupName] = useState('');
  const [groupId, setGroupId] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [invites, setInvites] = useState([]);

  const handleSignOut = () => {
    userSession.signUserOut('http://localhost:3000');
  };

  const selectUser = (user) => setSelectedUsers(selectedUsers.concat(user));

  const deselectUser = (user) => {
    const userIndex = selectedUsers.indexOf(user);
    setSelectedUsers(selectedUsers.slice(0, userIndex).concat(selectedUsers.slice(userIndex + 1)));
  };

  const createUserGroup = async () => {
    if (!groupName) return;
    const { _id } = await new UserGroup({ name: groupName }).create();
    setGroupId(_id);
  };

  const inviteUsers = async () => {
    debugger;
    try {
      const group = await UserGroup.findById(groupId);
      const newInvites = await Promise.all(selectedUsers.map(async (blockstackId) => {
        const { _id: inviteId } = await group.makeGroupMembership(blockstackId)
        return { blockstackId, inviteId };
      }));
      setInvites(invites => [...invites, newInvites]);
      sendEmails(newInvites, groupName, userSession);
    } catch (err){
      console.error('fail to send invites: %o', err);
    }
  };

  const classes = useStyles();
  return (
    <div>
      <div className="share-file-container">
        <section className="share-file-main">
          <div className="share-file-upload-file">
            <Fab color="primary" aria-label="add" className={classes.fab}>
              <Add />
            </Fab>
            <p className="no-margin">Drag and drop files</p>
            <p className="no-margin"> or click to send up to X FILE SIZE</p>
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
      {emailNotEntered ? <EmailDialog setEmailNotEntered={setEmailNotEntered} /> : null}
      <Input
        value={groupName}
        onChange={({ target }) => setGroupName(target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={createUserGroup}
        disabled={!!groupId}
      >
        Create User Group
      </Button>
      <SelectUser
        groupId={groupId}
        selectUser={selectUser}
        deselectUser={deselectUser}
        selectedUsers={selectedUsers}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={inviteUsers}
        disabled={!selectedUsers.length && !groupId}
      >
        Invite Users
      </Button>
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
