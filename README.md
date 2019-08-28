This app leverages Blockstack's Gaia storage, auth, and Radiks indexing DB to allow for private, user-controlled message/file sharing between Blockstack users. Users will be able to add expiration times and maximum view counts for files as well.

# SendFriend 💌

## About
**SendFriend** is a decentralized file sending service that leverages Blockstacks indentity service, Gaia storage, as well as Radiks. It allows users with a blockstack identity to create a group consisting of other blockstack users, and securely share files with those -- and only those -- in that group.

Because it's important to be able to share data across groups, whether one is authenticated or not, and for ease of reading/writing data, we decided to use Radiks as an additional layer of secure storage.

## Using the app
The login flow is typical - the app will redirect you to authenticate, then redirect you back to the app. If it's your first time on the app, you'll be prompted to enter an email. This email is encrypted and stored in our radiks server, and it's purpose is to notify you any time you receive an invite to a new group.

The landing page holds three inputs for group selection, group creation, and user invitations. Any groups you've created will be available as options in the group selection input. The group creation input allows you to name and create a new group. The user invite input allows you to search and invite other radiks users to your existing or newly created group.

Once you've selected/created a group, you can upload files to share, by clicking the _Share With This Group_ button. This allows you to upload multiple files, which are stored as object URLs on our radiks db.

To view the files that have been shared with you, as well as download them, you can navigate to the _Shared With Me_ tab. This will display some meta data around in the files and the invitation, as well as a button to download the files locally.

## Bugs 🐞
This app currently is not fully functional. We had some troubles configuring (or figuring out how to configure) our radiks client/server/db that led to some issues. Critically, once a user logs out, they lose the key to their existing created groups, causing the existing groups to be forever encrypted and thus inaccessible. You can see the details of the issue [here](https://github.com/blockstack-radiks/radiks/issues/45). As long you never log out you'll be fine 😉.

Also critically, you can only invite yourself to created groups, likely for the same reasons you lose your existing groups - loss of the private key.

## Future development
* Self deleting files 
  - Once the file has been received by all parties - automatic deletion from the DB
* File timeouts
  - Add a lifespan to the stored files - delete after a specified set of time

## Team


<span style="float: left; margin-right: 10px;">
  <img width="200" src="https://avatars1.githubusercontent.com/u/30298111?s=460&v=4"/>
  <div style="text-align: center;"><b>Erik Larsen</b></div>
  <div style="text-align: center;">Backend/Plant Enthusiast</div>
</span>
<span style="float: left; margin-right: 10px;">  
  <img width="200" src="https://avatars0.githubusercontent.com/u/13925464?s=460&v=4"/>
    <div style="text-align: center;"><b>Mary Snow</b></div>
  <div style="text-align: center;">Dev Ops/Budding Thespian</div>
</span>
<span style="float: left; margin-right: 10px;">
  <img width="200" src="https://avatars2.githubusercontent.com/u/13630752?s=460&v=4"/>
    <div style="text-align: center;"><b>Mark Romano</b></div>
  <div style="text-align: center;">Frontend/Cat Fanatic</div>
</span>
