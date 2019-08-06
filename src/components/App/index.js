import React from 'react';
import { UserSession } from 'blockstack';

import Login from '../Login'

const userSession = new UserSession
const App = () => {
  return (
    !userSession.isUserSignedIn()
      ? <Login userSession={userSession}/>
      : <div>File Page 🐈</div>
  );
}

export default App;
