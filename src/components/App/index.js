import React from 'react';
import { UserSession, AppConfig } from 'blockstack';
import { configure } from 'radiks';

import Login from '../Login';
import UploadFile from '../UploadFile';

const userSession = new UserSession({
  appConfig: new AppConfig(['store_write', 'publish_data'])
});

configure({
  apiServer: process.env.RADIKS_SERVER || 'http://localhost:1260',
  userSession
});

const App = () => {
  return (
    !userSession.isUserSignedIn() && !userSession.isSignInPending()
      ? <Login userSession={userSession}/>
      : <UploadFile/>
  );
}

export default App;
