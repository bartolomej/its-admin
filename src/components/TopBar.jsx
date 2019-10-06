import React from 'react';
import 'styled-components/macro'
import { faBell, faSearch, faUserAstronaut, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";


export default function () {
  return (
    <div
      css={`
        height: 50px;
        padding: 30px;
        display: flex;
        background-color: #FFFF;
        align-items: center;
      `}>
      <div>
        <Link
          css={`
            color: inherit;
            text-decoration: none
          `}
          to={{pathname: `/user/`,}}
        >
          <FontAwesomeIcon css={`font-size: 20px; color: grey;`} icon={faArrowLeft} />
        </Link>
      </div>
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
            border-radius: 20px;
            padding-left: 10px;
          `}
          placeholder={'Search anything...'}
          type='text'/>
      </div>
      <div
        css={`
          flex: 0.3;
          display: flex;
          justify-content: flex-end;
        `}>
        <FontAwesomeIcon
          css={`font-size: 20px; margin: 10px;`}
          icon={faBell} />
        <FontAwesomeIcon
          css={`font-size: 20px; margin: 10px;`}
          icon={faUserAstronaut} />
      </div>
    </div>
  )
}