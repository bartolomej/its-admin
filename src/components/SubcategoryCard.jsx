import React from 'react';
import 'styled-components/macro'
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { far } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import TableCard from "./base/TableCard";


export default function ({ uid, name, description, image }) {
  let card = (
    <TableCard>
      {image ?
        <img css={`flex: 0.5`} src={image} alt={name}/> :
        <FontAwesomeIcon css={`flex: 0.5`} mask={far} icon={faBookmark}/>
      }
      <span
        css={`
          flex: 1;
          font-weight: 700; 
          font-size: 14px; 
        `}>{name}</span>
      <span
        css={`
          flex: 1;
          font-weight: 700; 
          font-size: 14px; 
        `}>{description}</span>
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
      to={{ pathname: `/subcategory/${uid}`, }}
    >
      {card}
    </Link>
  )
}