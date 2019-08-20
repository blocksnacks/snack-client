import React, { useState, useEffect } from 'react';
import { UserGroup } from 'radiks';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@material-ui/core';

import LoadingScreen from '../LoadingScreen';

import './Shared.css';

const Shared = (props) => {
  const [groups, setGroups] = useState([]);
  const [errorFetching, setErrorFetching] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        const groups = await UserGroup.myGroups();
        setGroups(groups.map(({ attrs }) => ({ id: attrs._id, name: attrs.name })));
      } catch (err) {
        console.error(err);
        setErrorFetching(true)
      }
    })();
  }, [])

  return (
    <div className="content-container">
      <h2>
        Files Shared with me
      </h2>
      {errorFetching
        ? <div>Error retrieving shared files</div>
        : !groups.length
          ? <LoadingScreen />
          : (
            <div className="table-container">
              <Table>
                <TableHead>
                  <TableCell>File Name</TableCell>
                  <TableCell>File ID</TableCell>
                </TableHead>
                <TableBody>
                  {groups.map(({ id, name }) => (
                    <TableRow>
                      <TableCell>{name}</TableCell>
                      <TableCell>{id}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
    </div>
  )
}

export default Shared;