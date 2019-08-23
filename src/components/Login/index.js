import React, { useContext } from 'react';

import './Login.css';

import { AppContext } from '../../contexts/AppContext';

const Login = ({  nullUsername }) => {
  const { userSession } = useContext(AppContext);
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

export default Login;