import React, { useState, useContext } from 'react';
import {
  Paper,
  Tabs,
  Tab,
  Button
} from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';

import { AppContext } from '../../contexts/AppContext';

const NavBar = ({ location: { pathname } }) => {
  const { userSession } = useContext(AppContext)
  const [value, setValue] = useState(pathname);
  return (
    <Paper>
      <Tabs
        value={value}
        onChange={(_, val) => setValue(val)}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab
          label="Create Group"
          to="/"
          value="/"
          component={Link}
        />
        <Tab
          label="Shared With Me"
          to="/shared"
          value="/shared"
          component={Link}
        />
        <Tab
          label="Logout"
          variant="contained"
          color="primary"
          onClick={() => userSession.signUserOut('http://localhost:3000')}
        />
      </Tabs>
    </Paper>
  )
}

export default withRouter(NavBar);