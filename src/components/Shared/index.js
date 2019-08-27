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
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        setFetching(true);
        const docs = (await SharedDocument.fetchList())
          .filter(({ attrs }) => typeof attrs.name === 'string')
          .map(({ attrs}) => ({
            id: attrs._id,
            name: attrs.name,
            createdDate: attrs.createdAt,
            size: attrs.size,
            uploadedBy: attrs.uploadedBy,
            content: attrs.content,
          }))
        setFetching(false);
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
        : docs.length
          ? (
            <div className="table-container">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>File ID</TableCell>
                    <TableCell>File Name</TableCell>
                    <TableCell>Created At</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell>Uploaded By</TableCell>
                    <TableCell>Download</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {docs.map((doc) => (
                    <TableRow key={doc.id}>
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
          )
          : fetching
            ? <CircularProgress />
            : <div>You don't have any documents</div>
        }
    </div>
  )
}

export default authNeeded(Shared);