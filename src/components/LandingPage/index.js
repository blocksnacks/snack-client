import React, { useContext } from 'react';

import { authNeeded, addNavbar } from '../hocs';
import { AppContext } from '../../contexts/AppContext';

import EmailDialog from '../EmailDialog';
import SelectGroup from '../SelectGroup';

const LandingPage = () => {
  const { emailNotEntered, setEmailNotEntered } = useContext(AppContext);
  return (
    <div className="main-container">
      {emailNotEntered && <EmailDialog setEmailNotEntered={setEmailNotEntered} />}
      <SelectGroup />
    </div>
  );
};

export default authNeeded(addNavbar(LandingPage));