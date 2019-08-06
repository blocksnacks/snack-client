import React from 'react';
import './App.css';
import { UserSession } from 'blockstack';

const login = () => {
  const userSession = new UserSession();
  if (!userSession.isUserSignedIn() && userSession.isSignInPending()) {
    userSession.handlePendingSignIn().then(console.log);
  } else {
    userSession.redirectToSignIn();
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={login}>Log in!!!</button>
      </header>
    </div>
  );
}

export default App;
