import React from 'react';
import 'styled-components/macro'
import { faBell, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function () {
  return (
    <div
      css={`
        height: 50px;
        padding: 10px;
        display: flex;
        background-color: #F3F5FA;
        align-items: center;
      `}>
      <div
        css={`
          flex: 0.7;
          display: flex;
          justify-content: center;
          align-items: center;
        `}>
        <FontAwesomeIcon css={`font-size: 20px; color: grey;`} icon={faSearch} />
        <input
          css={`
            margin-left: 10px;
            outline: none;
            flex: 0.7;
            background-color: #F3F5FA;
            line-height: 3;
            border: none;
          `}
          placeholder={'Search anything...'}
          type='text'/>
      </div>
      <div
        css={`
          flex: 0.3;
          display: flex;
          justify-content: center;
        `}>
        <FontAwesomeIcon icon={faBell} />
      </div>
    </div>
  )
}