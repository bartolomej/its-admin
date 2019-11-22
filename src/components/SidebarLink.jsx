import React from 'react';
import { Link, Route } from "react-router-dom";
import 'styled-components/macro'
import { DARK_FONT, ACTIVE, HOVER, UNSET } from "../styles";


export default function SidebarLink ({ path, title, image, activeOnlyWhenExact }) {
  return (
    <Route
      path={path}
      exact={activeOnlyWhenExact}
      children={({ match }) => (
        <div
          css={`
            flex: 1.2;
            display: flex;
            width: 100%;
          `}
        >
          <div
            css={`
              width: 4px;
              background-color: ${match ? ACTIVE : 'unset'}
            `}
          />
          <Link
            css={`
              display: flex; 
              text-decoration: none !important;
              flex-direction: row;
              justify-content: space-around;
              flex: 1;
              padding: 15px;
              color: ${match ? ACTIVE : UNSET};
              font-weight: 500;
              &:hover {
                color: ${HOVER};
              }
            `}
            to={path}>
            <span
              css={`
                flex: 0.3;
                display: flex; 
                justify-content: center;
                align-items: center;
              `}
            >{image}</span>
            <span
              css={`
                display: flex; 
                flex: 0.7; 
                justify-content: left;
                font-size: 14px;
              `}>{title}</span>
          </Link>
        </div>
      )}
    />
  );
}
