import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import { Redirect } from 'react-router-dom';

import './Login.css';

import { AppContext } from '../../contexts/AppContext';

const Login = ({ nullUsername }) => {
  const { userSession, loggedIn } = useContext(AppContext);
  return (
    !loggedIn
      ? (
        <div className="App">
          <header className="App-header">
            <div className="sign-in">
              <h5>{`Elegant, secure file sharing \n on the blockchain`}</h5>
              <Button
                fullWidth
                onClick={() => userSession.redirectToSignIn()}
                variant="contained"
                color="primary"
              >
                Log in
              </Button>
              {nullUsername && <p>Your username is not yet registered. Please come back again once your registration process is complete.</p>}
            </div>
          </header>
        </div>
      )
      : <Redirect to="/" />
  );
}

export default Login;