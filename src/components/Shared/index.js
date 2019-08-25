import React, { useState, useEffect } from 'react';
import { UserGroup } from 'radiks';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@material-ui/core';
import bytes from 'bytes';
import './Shared.css';

import CircularProgress from '../CircularProgress';
import authNeeded from '../hocs/authNeeded';

import SharedDocument from '../../models/SharedDocument';

const Shared = () => {
  const [docs, setDocs] = useState([]);
  const [errorFetching, setErrorFetching] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        const groups = await UserGroup.myGroups();
        const docs = (await SharedDocument.fetchList({ userGroupId: groups[0].id }))
          .filter(({ attrs }) => typeof attrs.name === 'string')
          .map(({ attrs}) => ({
            id: attrs._id,
            name: attrs.name,
            createdDate: attrs.createdAt,
            size: attrs.size,
            uploadedBy: attrs.uploadedBy,
            content: attrs.content,
          }))
        setDocs(docs);
      } catch (err) {
        console.error(err);
        setErrorFetching(true)
      }
    })();
  }, [])

  return (
    <div>
      <h2 className="table-title">
        Files Shared with me
      </h2>
      {errorFetching
        ? <div>Error retrieving shared files</div>
        : !docs.length
          ? <CircularProgress />
          : (
            <div className="table-container">
              <Table>
                <TableHead>
                  <TableCell>File ID</TableCell>
                  <TableCell>File Name</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Size</TableCell>
                  <TableCell>Uploaded By</TableCell>
                  <TableCell>Download</TableCell>
                </TableHead>
                <TableBody>
                  {docs.map((doc) => (
                    <TableRow>
                      <TableCell>{doc.id}</TableCell>
                      <TableCell>{doc.name}</TableCell>
                      <TableCell>{doc.createdDate}</TableCell>
                      <TableCell>{bytes(doc.size)}</TableCell>
                      <TableCell>{doc.uploadedBy}</TableCell>
                      <TableCell>DL</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
    </div>
  )
}

export default authNeeded(Shared);