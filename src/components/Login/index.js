import React from 'react'

import './Login.css'

export default ({ userSession, nullUsername }) => {
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => userSession.redirectToSignIn()}>Log in!!!</button>
        {nullUsername && <p>Your username is not yet registered. Please come back again once your registration process is complete.</p>}
      </header>
    </div>
  );
}