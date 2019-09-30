import React from 'react';
import { Link, Route } from "react-router-dom";
import 'styled-components/macro'


export default function RouteTab ({ path, title, image, props, activeOnlyWhenExact}) {
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
              background-color: ${match ? 'red' : 'unset'}
            `}
          />

          <Link
            css={`
              display: flex; 
              text-decoration: none;
              flex-direction: row;
              justify-content: space-around;
              flex: 1;
              padding: 20px;
              color: ${match ? 'red' : 'black'};
              font-weight: 500;
              &:hover {
                color: grey;
              }
            `}
            to={path}>
            <span
              css={`
              flex: 0.3;
              display: flex; 
              justify-content: center;
              align-items: center;
            `}>{image}</span>
            <span
              css={`
                display; flex; 
                flex: 0.7; 
                justify-content: left
              `}>{title}</span>
          </Link>
        </div>
      )}
    />
  );
}
