import React from 'react';
import 'styled-components/macro'
import { MdErrorOutline, MdClose, MdInfoOutline, MdDone } from "react-icons/md";


export default ({ style, options, message, close }) => (
  <div
    css={`
      border-radius: 10px;
      padding: 15px;
      display: flex;
      flex-direction: row;
      align-items: center;
      background-color: black;
      color: red;
    `}
    style={style}>
    {options.type === 'info' && <MdInfoOutline css={'font-size: 20px;'}/>}
    {options.type === 'success' && <MdDone css={'font-size: 20px;'}/>}
    {options.type === 'error' && <MdErrorOutline css={'font-size: 20px;'}/>}
    <p
      css={`
        margin: 0 5px;
        font-weight: bold;
        font-size: 15px;
        color: white;
      `}
    >{message}</p>
    <button
      css={`
        background: none;
        border: 1px solid black;
        cursor: pointer;
        outline: none;
        border: none;
        color: red;
      `}
      onClick={close}>
      <MdClose css={'font-size: 20px;'}/>
    </button>
  </div>
)