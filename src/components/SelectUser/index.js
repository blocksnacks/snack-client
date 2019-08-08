import React, { useState, useEffect } from 'react';
import { User, UserGroup } from 'radiks';
import { Input, MenuItem } from '@material-ui/core';

const USER_FETCH_LIMIT = 15;
const USER_FETCH_FIELDS = 'username';

export default ({ selectUser, deselectUser, selectedUsers }) => {
  const [search, setSearch] = useState('');
  const [userList, setUserList] = useState([]);

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

  return (
    <div>
      <h3>Ugly a$$ autocomplete</h3>
      <Input value={search} onChange={evt => setSearch(evt.target.value)} />
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