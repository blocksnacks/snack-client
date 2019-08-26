import React from 'react';

import EmailDialog from '../EmailDialog';
import SelectGroup from '../SelectGroup';
import { authNeeded, addNavbar } from '../hocs';

const LandingPage = ({ emailNotEntered, setEmailNotEntered }) => {
  return (
    <div className="main-container">
      {emailNotEntered && <EmailDialog setEmailNotEntered={setEmailNotEntered} />}
      <SelectGroup />
    </div>
  );
};

export default authNeeded(addNavbar(LandingPage));