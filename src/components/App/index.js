import React, { useEffect, useState, useContext } from 'react';

import { getConfig, User, Central } from 'radiks';
import { Switch, Route } from 'react-router-dom';

import { USER_SETTINGS } from '../../constants';
import Login from '../Login';
import { AppContext } from '../../contexts/AppContext';

import LandingPage from '../LandingPage';
import CircularProgress from '../CircularProgress';



const App = () => {
  const { userSession } = useContext(AppContext);
  // const { userSession } = getConfig();
  const [loggedIn, setLoggedIn] = useState(false);
  const [emailNotEntered, setEmailNotEntered] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleSignIn = async () => {
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
  }, [userSession]);

  return (
    <Switch>
      <Route exact path="/" render={() => (
        loading
          ? <LoadingScreen />
          : loggedIn
            ? (
              <LandingPage
                emailNotEntered={emailNotEntered}
                setEmailNotEntered={setEmailNotEntered}
                userSession={userSession}
              />
            )
            : <Login userSession={userSession} />
      )}
      />
      <Route exact path="/shared" component={Shared} />
      <Route path="/invitation/:invitation_id" component={InvitationPage} />
    </Switch>
  );
}

export default App;
