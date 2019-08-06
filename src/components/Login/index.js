import React from 'react'

import './Login.css'

export default ({ userSession }) => {
  
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => userSession.redirectToSignIn()}>Log in!!!</button>
      </header>
    </div>
  );
}