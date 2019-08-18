import React, { useState } from 'react';
import { Redirect } from 'react-router-dom'
// import { GroupInvitation } from 'radiks';

const noop = () => new Promise(_ => _()).then(() => ({ activate: noop }))
const GroupInvitation = { findById: noop }

const InvitationPage = ({ match: { params } }) => {
  const [isAccepted, setIsAccepted] = useState(false);

  (async function () {

    const invitation = await GroupInvitation.findById(params.invitation_id);
    await invitation.activate();
    await new Promise(_ => setTimeout(_, 3000));
    setIsAccepted(true);
  })();

  return (
    // !isAccepted
      // ? (
        <div>
          <div>Accepting the invitation to share {params.invitation_id}... Please wait!</div>
        </div>
      // )
      // : <Redirect to="/" />
  );
};

export default InvitationPage;