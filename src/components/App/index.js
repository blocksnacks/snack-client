import React, {
  useEffect,
  useState,
  useContext
} from 'react';

import { User } from 'radiks';
import { Switch, Route } from 'react-router-dom';

import { AppContext } from '../../contexts/AppContext';

import Login from '../Login';
import LandingPage from '../LandingPage';
import CircularProgress from '../CircularProgress';

const App = () => {
  const { userSession } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleSignIn = async () => {
      if (!userSession.isUserSignedIn() && userSession.isSignInPending()) {
        await userSession.handlePendingSignIn();
        await User.createWithCurrentUser();
      }
      setLoading(false);
    };
    handleSignIn();
  }, [userSession]);

  return (
    <Switch>
      <Route exact path="/" component={loading ? CircularProgress : LandingPage} />
      <Route exact path="/login" component={Login} />}
      <Route exact path="/shared" component={Shared} />
      <Route path="/invitation/:invitation_id" component={InvitationPage} />
    </Switch>
  );
}

export default App;
