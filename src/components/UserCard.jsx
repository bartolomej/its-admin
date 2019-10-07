import React from 'react';
import 'styled-components/macro'
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {far} from "@fortawesome/free-regular-svg-icons";
import {Link} from "react-router-dom";
import TableCard from "./base/TableCard";


export default function ({ uid, username, email, type, avatar, createdDate, interests }) {
  let card = (
    <TableCard>
      {avatar ?
        <img css={`flex: 0.5`} src={avatar} alt={username}/> :
        <FontAwesomeIcon css={`flex: 0.5`} mask={far} icon={faUser} />
      }
      <span
        css={`
          flex: 0.5;
          font-weight: 700; 
          font-size: 14px; 
        `}>{username}</span>
      <span
        css={`
          flex: 1;
          font-weight: 700; 
          font-size: 14px; 
        `}>{email}</span>
      <span
        css={`
          flex: 1;
          font-weight: 700; 
          font-size: 14px; 
        `}>{type}</span>
      <span
        css={`
          flex: 1;
          font-weight: 700; 
          font-size: 14px; 
        `}>{interests.join(', ')}</span>
      <span
        css={`
          flex: 0.5;
          font-weight: 700; 
          font-size: 14px; 
        `}>{createdDate}</span>
      <button
        css={`
          flex: 0.5;
          background: none;
          border: none;
          cursor: pointer;
          outline: none;
        `}>
        <FontAwesomeIcon icon={faEllipsisV} />
      </button>
    </TableCard>
  );
  return (
    <Link
      key={uid}
      css={`
        color: inherit;
        text-decoration: none
      `}
      to={{pathname: `/user/${uid}`,}}
    >
      {card}
    </Link>
  )
}