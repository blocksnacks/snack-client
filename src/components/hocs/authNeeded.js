import React, { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import { Redirect } from 'react-router-dom';

export const authNeeded = (Component) => (props) => {
  const { loggedIn } = useContext(AppContext);
  return loggedIn ? <Component {...props} /> : <Redirect to="/login" />
}