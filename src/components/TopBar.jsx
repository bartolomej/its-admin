import React from 'react';
import 'styled-components/macro'
import { faBell, faSearch, faUserAstronaut, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from 'react-router-dom'
import { DARK_FONT, HOVER } from "../styles";


export default withRouter(({ history }) => {
  return (
    <div
      css={`
        height: 50px;
        padding: 30px;
        display: flex;
        background-color: #F8F6F7;
        align-items: center;
      `}>
      <div>
        <button
          css={`
            background: none;
            border: none;
            cursor: pointer;
            outline: none;
            &:hover {
              color: ${HOVER};
            }
          `}
          onClick={history.goBack}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            css={`font-size: 20px;`}
          />
        </button>
      </div>
      <div
        css={`
          flex: 0.7;
          display: flex;
          justify-content: center;
          align-items: center;
        `}>
        <FontAwesomeIcon
          icon={faSearch}
          css={`font-size: 20px;`}
        />
        <input
          css={`
            margin-left: 10px;
            outline: none;
            flex: 0.7;
            background-color: #FFFF;
            line-height: 3;
            border: none;
            border-radius: 20px;
            padding-left: 10px;
          `}
          placeholder={'Search anything...'}
          type='text'
        />
      </div>
      <div
        css={`
          flex: 0.3;
          display: flex;
          justify-content: flex-end;
        `}>
        <FontAwesomeIcon
          css={`font-size: 20px; margin: 10px;`}
          icon={faBell}/>
        <FontAwesomeIcon
          css={`font-size: 20px; margin: 10px;`}
          icon={faUserAstronaut}/>
      </div>
    </div>
  )
})