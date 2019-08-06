import React from 'react';
import { UserSession } from 'blockstack';

import Login from '../Login';
import UploadFile from '../UploadFile';

const userSession = new UserSession
const App = () => {
  return (
    !userSession.isUserSignedIn()
      ? <Login userSession={userSession}/>
      : <UploadFile/>
  );
}

export default App;
