import React, { createContext, useState } from 'react';
import { UserSession, AppConfig } from 'blockstack';
import { configure } from 'radiks';

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
  return (
    <AppContext.Provider value={{ userSession, userGroup, setUserGroup }}>
      {children}
    </AppContext.Provider>
  )
}