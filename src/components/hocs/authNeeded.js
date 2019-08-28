import React, { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import { Redirect } from 'react-router-dom';

export const authNeeded = (Component) => (props) => {
  const { userSession } = useContext(AppContext);
  return userSession.isUserSignedIn() ? <Component {...props} /> : <Redirect to="/login" />
}