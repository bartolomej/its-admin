import React from 'react';
import 'styled-components/macro'


export default function (props) {
  return (
    <div
      css={`
        flex: 4;
        display: flex;
        flex-direction: row;
        align-items: center;
        border-radius: 8px;
        justify-content: space-around;
        background-color: white;
        margin: 10px 0;
        padding: 15px 0;
        box-shadow: 0 4px 20px 0 rgba(0,0,0,.05);
        transition: .3s ease;
        &:hover {
          color: red;
          transform: translateY(-4px);
          -ms-transform:translateY(-4px);
          -webkit-transform:translateY(-4px);
        }
      `}>
      {props.children}
    </div>
  )
}