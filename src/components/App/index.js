import React, { useEffect, useState } from 'react';
import { UserSession, AppConfig } from 'blockstack';
import { configure, getConfig, User, Central } from 'radiks';
import { USER_SETTINGS } from '../../constants';
import Login from '../Login';
import LandingPage from '../LandingPage';
import CircularProgress from '../CircularProgress';

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
  const [nullUsername, setNullUsername] = useState(false);

  useEffect(() => {
    const handleSignIn = async () => {
      if (!userSession.isUserSignedIn() && userSession.isSignInPending()) {
        await userSession.handlePendingSignIn();
        await User.createWithCurrentUser();
      }
      if (userSession.isUserSignedIn()) {
        if (!userSession.loadUserData().username) {
          setNullUsername(true);
          setLoggedIn(false);
          setLoading(false);
          return;
        }
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
  }, [userSession]);

  return (
    loading
      ? <CircularProgress />
      : loggedIn
        ? <LandingPage
          emailNotEntered={emailNotEntered}
          setEmailNotEntered={setEmailNotEntered}
          userSession={userSession}
        />
        : <Login userSession={userSession} nullUsername={nullUsername} />
  );
}

export default App;
