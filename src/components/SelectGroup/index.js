import React, { 
  useState, 
  useEffect, 
  useContext 
} from 'react';
import { withRouter } from 'react-router-dom';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { UserGroup } from 'radiks';

import SelectUser from '../SelectUser';
import { sendEmails } from '../../api';
import { AppContext } from '../../contexts/AppContext';

const SelectGroup = ({ history }) => {
  const { userSession, setUserGroup } = useContext(AppContext);
  const [groupName, setGroupName] = useState('');
  const [group, setGroup] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [tempUserGroup, setTempUserGroup] = useState('');
  const [, setInvites] = useState([]);
  const [possibleGroups, setPossibleGroups] = useState([]);

  useEffect(() => {
    UserGroup.myGroups().then(setPossibleGroups);
  }, []);

  const selectUser = (user) => setSelectedUsers(selectedUsers.concat(user));

  const deselectUser = (user) => {
    const userIndex = selectedUsers.indexOf(user);
    setSelectedUsers(selectedUsers.slice(0, userIndex).concat(selectedUsers.slice(userIndex + 1)));
  };

  const createUserGroup = async () => {
    if (!groupName) return;
    const newGroup = await new UserGroup({ name: groupName }).create();
    setGroup(newGroup);
    setTempUserGroup(newGroup);
    setPossibleGroups(prevGroups => prevGroups.concat(newGroup));
  };

  const inviteUsers = async () => {
    try {
      const newInvites = await Promise.all(selectedUsers.map(async (blockstackId) => {
        const { _id: inviteId } = await group.makeGroupMembership(blockstackId)
        return { blockstackId, inviteId };
      }));
      setInvites(invites => [...invites, newInvites]);
      sendEmails(newInvites, groupName, userSession);
    } catch (err) {
      console.error('fail to send invites: %o', err);
    }
  };

  return (
    <div>
      <div className="form-container">
        <h2>Choose a group to share with</h2>
        <Select
          onChange={evt => setTempUserGroup(evt.target.value)}
          value={tempUserGroup}
        >
          {possibleGroups.map(pGroup => (
            typeof pGroup.attrs.name === 'string' && (
              <MenuItem value={pGroup} key={pGroup._id}>{pGroup.attrs.name}</MenuItem>
            )
          ))}
        </Select>
        <h2>...or create a new group</h2>
        <div>
          <h3>
            Enter Usergroup Name
          </h3>
          <div className="input-container">
            <Input
              autoFocus              
              fullWidth
              value={groupName}
              onChange={({ target }) => setGroupName(target.value)}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={createUserGroup}
            disabled={(!group && !groupName.length) || !!group}
          >
            Create User Group
          </Button>
        </div>
        <div>
          <h3>Select Recipients</h3>
          <div className="input-container">
            <SelectUser
              selectUser={selectUser}
              deselectUser={deselectUser}
              selectedUsers={selectedUsers}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={inviteUsers}
            disabled={!group || !selectedUsers.length}
          >
            Invite Users
          </Button>
        </div>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            setUserGroup(tempUserGroup)
            history.push('/upload')
          }}
          disabled={!tempUserGroup}
        >
          Share With This Group
        </Button>
      </div>
    </div>
  );
};

export default withRouter(SelectGroup);