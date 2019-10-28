import React from 'react';
import 'styled-components/macro';
import { HOVER } from "../../styles";


const inputStyles = `
  flex: 2.5;
  border: none;
  border-radius: 20px;
  padding: 10px;
  outline: none;
  border: 1px solid #FFFF;
  transition: 0.3s;
  &:hover {
    border: 1px solid ${HOVER};
  }
`;

export default function ({ description, placeholder, onInput, value, disable = false }) {
  return (
    <div
      css={`
        margin: 10px;
        display: flex;
        flex-direction: row;
        flex: 3;
      `}>
      <span
        css={`
          padding: 10px; 
          flex: 0.5; 
          font-weight: 500;
          font-size: 15px;
        `}>
        {description}:
      </span>
      {disable ?
        <input
          css={inputStyles}
          type={'text'}
          value={value}
          disabled
        /> :
        <input
          css={inputStyles}
          type={'text'}
          onChange={event => onInput(event.target.value)}
          value={value}
        />
      }
    </div>
  )
}