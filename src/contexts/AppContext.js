import React, { 
  createContext, 
  useState, 
  useEffect 
} from 'react';
import { UserSession, AppConfig } from 'blockstack';
import { configure, Central } from 'radiks';
import { USER_SETTINGS } from '../constants';

const userSession = new UserSession({
  appConfig: new AppConfig(['store_write', 'publish_data'])
});

configure({
  apiServer: process.env.DOMAIN || 'https://sendfriend.herokuapp.com',
  userSession
});

export const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
  const [userGroup, setUserGroup] = useState(null);
  const [loggedIn, setLoggedIn] = useState(userSession.isUserSignedIn());
  const [emailNotEntered, setEmailNotEntered] = useState(false);

  useEffect(() => {
    (async () => {
      if (loggedIn) {
        const userSettings = await Central.get(USER_SETTINGS);
        // check to see if user is missing email in central collection
        setEmailNotEntered(!userSettings || !userSettings.email);
      } else setLoggedIn(false);
    })();
  }, [loggedIn]);

  return (
    <AppContext.Provider
      value={{
        userSession,
        userGroup,
        setUserGroup,
        emailNotEntered,
        setEmailNotEntered,
        loggedIn
      }}
    >
      {children}
    </AppContext.Provider>
  )
}