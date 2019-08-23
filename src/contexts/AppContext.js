import React, { createContext, useState, useContext, useEffect } from 'react';
import { UserSession, AppConfig } from 'blockstack';
import { configure, Central } from 'radiks';
import { USER_SETTINGS } from '../constants';

const userSession = new UserSession({
  appConfig: new AppConfig(['store_write', 'publish_data'])
});

configure({
  apiServer: process.env.RADIKS_SERVER || 'http://localhost:1260',
  userSession
});

export const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
  const [userGroup, setUserGroup] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [emailNotEntered, setEmailNotEntered] = useState(false);

  console.log('userSession.isUserSignedIn()', userSession.isUserSignedIn())
  useEffect(() => {
    (async () => {
      if (userSession.isUserSignedIn()) {
        setLoggedIn(true);
        const userSettings = await Central.get(USER_SETTINGS);
        // check to see if user is missing email in central collection
        setEmailNotEntered(!userSettings || !userSettings.email);
      } else setLoggedIn(false);
    })();
  }, []);

  return (
    <AppContext.Provider
      value={{
        userSession,
        userGroup,
        setUserGroup,
        emailNotEntered,
        loggedIn
      }}
    >
      {children}
    </AppContext.Provider>
  )
}