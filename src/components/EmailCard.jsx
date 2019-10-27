import React from 'react';
import 'styled-components/macro'
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { far } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import TableCard from "./base/TableCard";


export default function ({ uid, fromAddress, toAddress, subject, avatar, datetime, text }) {
  let card = (
    <TableCard>
      {avatar ?
        <img css={`flex: 0.5`} src={avatar} alt={fromAddress}/> :
        <FontAwesomeIcon css={`flex: 0.5`} mask={far} icon={faEnvelope}/>
      }
      <span
        css={`
          flex: 1;
          font-weight: 700; 
          font-size: 14px; 
        `}>{fromAddress}</span>
      <span
        css={`
          flex: 1;
          font-weight: 700; 
          font-size: 14px; 
        `}>{toAddress}</span>
      <span
        css={`
          flex: 0.5;
          font-weight: 700; 
          font-size: 14px; 
        `}>{subject}</span>
      <span
        css={`
          flex: 1;
          font-weight: 700; 
          font-size: 14px; 
        `}>{text.substring(0, 20) + '...'}</span>
      <span
        css={`
          flex: 0.5;
          font-weight: 700; 
          font-size: 14px; 
        `}>{new Date(datetime).toLocaleString()}</span>
      <button
        css={`
          flex: 0.5;
          background: none;
          border: none;
          cursor: pointer;
          outline: none;
        `}>
        <FontAwesomeIcon icon={faEllipsisV}/>
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
      to={{ pathname: `/email/${uid}`, }}
    >
      {card}
    </Link>
  )
}