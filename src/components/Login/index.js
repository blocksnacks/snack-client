import React from 'react'
import {Button } from '@material-ui/core';

import './Login.css'

export default ({ userSession, nullUsername }) => {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <Button 
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
  );
}