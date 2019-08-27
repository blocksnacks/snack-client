import React from 'react';

import Navbar from '../Navbar';

export const addNavbar = (Component) => (props) => (
  <>
    <Navbar/>
    <Component {...props}/>
  </>
)