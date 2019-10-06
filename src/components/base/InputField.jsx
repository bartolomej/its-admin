import React from 'react';
import 'styled-components/macro'

const inputStyles = `
  border: none;
  border-radius: 20px;
  padding: 10px;
  outline: none;
  border: 1px solid #FFFF;
  transition: 0.3s;
  &:hover {
    border: 1px solid red;
  }
`;

export default function ({ description, placeholder, onInput, value, disable = false }) {
  return (
    <div
      css={`
        display: flex;
        flex-direction: column;
        margin: 5px;
      `}>
      <span css={`padding: 10px;`}>{description}:</span>
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