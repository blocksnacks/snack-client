import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Container } from '@material-ui/core';
import CircularProgress from '../CircularProgress';

import './InvitationPage.css';

import authNeeded from '../hocs/authNeeded';
// import { GroupInvitation } from 'radiks';

const noop = () => new Promise(_ => _()).then(() => ({ activate: noop }))
const GroupInvitation = { findById: noop }

const InvitationPage = ({ match: { params } }) => {
  const [isAccepted, setIsAccepted] = useState(false);

  useEffect(() => {
    (async () => {
      const invitation = await GroupInvitation.findById(params.invitation_id);
      await invitation.activate();
      await new Promise(_ => setTimeout(_, 3000));
      setIsAccepted(true);
    })();
  }, [params.invitation_id]);

  return (
    !isAccepted
      ? (
        <Container>
          <div className="content-container">
            <h3 className="invite-header">Accepting the invitation to share {params.invitation_id}... Please wait!</h3>
            <CircularProgress />
          </div>
        </Container>
      )
      : <Redirect to="/shared" />
  );
};

export default authNeeded(InvitationPage);