import { User } from 'radiks';
import React, { useState, useEffect } from 'react';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';

const USER_FETCH_LIMIT = 15;
const USER_FETCH_FIELDS = 'username';

export default () => {
  const [search, setSearch] = useState('');
  const [userList, setUserList] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    if (search.length > 2) {
      User.fetchList({
        username: { $regex: search },
        limit: USER_FETCH_LIMIT,
        fields: USER_FETCH_FIELDS
      })
        .then(userList => {
          setUserList(userList.map(user => user.attrs.username));
        });
    } else {
      setUserList([]);
    }
  }, [search]);

  const selectUser = (user) => {
    setSelectedUsers(selectedUsers.concat(user));
  };

  const deselectUser = (user) => {
    const userIndex = selectedUsers.indexOf(user);
    setSelectedUsers(selectedUsers.slice(0, userIndex).concat(selectedUsers.slice(userIndex + 1)));
  };

  return (
    <div>
      <h3>Ugly a$$ autocomplete</h3>
      <Input value={search} onChange={evt => setSearch(evt.target.value)}/>
      {selectedUsers.length ? selectedUsers.map(selected => (
        <MenuItem
          key={selected}
          value={selected}
          onClick={() => deselectUser(selected)}
        >Selected: {selected}</MenuItem>
      )) : null}
      {userList.length ? userList
        .filter(user => !selectedUsers.includes(user))
        .map(user =>
          <MenuItem
            key={user}
            value={user}
            onClick={() => selectUser(user)}
          >{user}</MenuItem>)
      : null}
    </div>
  );
}