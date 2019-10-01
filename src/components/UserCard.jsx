import React from 'react';
import 'styled-components/macro'
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {far} from "@fortawesome/free-regular-svg-icons";


export default function ({ uid, username, email, avatar, createdDate }) {
  return (
    <div
      css={`
        flex: 4;
        display: flex;
        flex-direction: row;
        align-items: center;
        border-radius: 8px;
        justify-content: space-around;
        background-color: white;
        margin: 10px 0;
        padding: 20px 0;
        &:hover {
          color: red;
         }
      `}>
      {avatar ?
        <img css={`flex: 0.5`} src={avatar} alt={username}/> :
        <FontAwesomeIcon css={`flex: 0.5`} mask={far} icon={faUser} />
      }
      <span
        css={`
          flex: 1;
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
          flex: 0.6;
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
    </div>
  );
}