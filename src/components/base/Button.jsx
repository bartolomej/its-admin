import React from 'react';
import 'styled-components/macro'


export default function ({ title, onClick, style }) {
  return (
    <button
      css={`
        background: none;
        border: 1px solid black;
        cursor: pointer;
        outline: none;
        padding: 10px;
        background-color: white;
        border-radius: 20px;
        border: none;
        margin: 10px 0 0 0;
        font-weight: bold;
        &:hover {
          color: red;
          transform: translateZ(-4px);
          -ms-transform:translateZ(-4px);
          -webkit-transform:translateZ(-4px);
        }
        ${style}
    `}
      onClick={() => onClick()}
    >
      { title }
    </button>
  )
}