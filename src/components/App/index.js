import React from 'react';
import { UserSession, AppConfig } from 'blockstack';
import { configure, User, getConfig, Model } from 'radiks';

import Login from '../Login'

const userSession = new UserSession({
  appConfig: new AppConfig(['store_write', 'publish_data'])
})

configure({ userSession });

const App = () => {
  const { userSession } = getConfig();

  // User.createWithCurrentUser()
  class Todo extends Model {
    static className = 'Todo';
    static schema = { // all fields are encrypted by default
      title: String,
      completed: Boolean,
    }
  };

  // after authentication:
  const todo = new Todo({ title: 'Use Radiks in an app' });
  (async () => {
    await todo.save();
    todo.update({
      completed: true,
    });
    await todo.save();
  })()
  return (
    !userSession.isUserSignedIn()
      ? <Login userSession={userSession} />
      : <div>File Page 🐈</div>
  );
}

export default App;
