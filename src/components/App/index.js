import React, { useEffect, useState } from 'react';
import { UserSession, AppConfig } from 'blockstack';
import { configure, getConfig, User, Central } from 'radiks';
import { USER_SETTINGS } from '../../constants';
import Login from '../Login';
import UploadFile from '../UploadFile';
import LoadingScreen from '../LoadingScreen';

const userSession = new UserSession({
  appConfig: new AppConfig(['store_write', 'publish_data'])
});

configure({
  apiServer: process.env.RADIKS_SERVER || 'http://localhost:1260',
  userSession
});

const App = () => {
  const { userSession } = getConfig();
  const [loggedIn, setLoggedIn] = useState(false);
  const [emailNotEntered, setEmailNotEntered] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleSignIn = async () => {
      console.log({ userSession })
      if (!userSession.isUserSignedIn() && userSession.isSignInPending()) {
        await userSession.handlePendingSignIn();
        await User.createWithCurrentUser();
      }
      if (userSession.isUserSignedIn()) {
        setLoggedIn(true);
        const userSettings = await Central.get(USER_SETTINGS);
        // check to see if user is missing email in central collection
        setEmailNotEntered(!userSettings || !userSettings.email);
      } else {
        setLoggedIn(false);
      }
      setLoading(false);
    };
    handleSignIn();
  }, []);

  return (
    loading
      ? <LoadingScreen />
      : loggedIn
        ? <UploadFile
          emailNotEntered={emailNotEntered}
          setEmailNotEntered={setEmailNotEntered}
          userSession={userSession}
        />
        : <Login userSession={userSession} />
  );
}

export default App;
