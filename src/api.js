import { ERROR_POSTING_EMAILS } from './constants';

export const sendEmails = async (recipients, groupName, userSession) => {
  const body = {
    recipients,
    creator: userSession.loadUserData().username,
    groupName,
  };
  try {
    return await (await fetch('/email/invite-users/', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    })).json();
  } catch (err) {
    console.error(err);
    return ERROR_POSTING_EMAILS;
  }
}