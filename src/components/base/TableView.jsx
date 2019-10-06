import React, { useState } from 'react';
import 'styled-components/macro'
import Button from "./Button";


export default function ({ columns, rows, title, styles, onAdd }) {

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  let records = rows.slice((currentPage-1) * rowsPerPage, (currentPage-1) * rowsPerPage + rowsPerPage);
  let pageNumbers = new Array(Math.ceil(rows.length / rowsPerPage)).fill(0);

  return (
    <div
      css={`
        display: flex;
        flex-direction: column;
        flex: 3;
        ${styles ? styles : ''}
      `}>
      <div
        css={`
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          margin: 20px 0;
        `}>
        <h1 css={`padding: 0; margin: 0;`}>{title}</h1>
        <Button title={`ADD ${title.toUpperCase()}`} onClick={() => onAdd()} />
      </div>
      <div
        css={`
          display: flex;
          flex-direction: row;
          flex: 10;
          margin: 2px;
        `}>
        {columns.map(col => {
          const isObj = () => col instanceof Object;
          return (
            <ColumnHeader
             title={isObj() ? col.title : col}
             flex={isObj() ? col.flex: 1}
            />
          )
        })}
      </div>
      <div
        css={`
          flex: 2;
        `}>
        {records}
      </div>
      <div
        css={`
          display: flex;
          flex: 3;
          flex-direction: row;
          justify-content: center;
        `}>
        <div
          css={`
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
          `}>
          Showing:
          <select onChange={e => setRowsPerPage(Number.parseInt(e.target.value))}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
        <div
          css={`
            flex: 1;
            display: flex;
            justify-content: center;
          `}>
          {pageNumbers.map((ele, index) => (
            <PageNumber
              pageNumber={index+1}
              onClick={n => setCurrentPage(n)}
              selected={index+1 === currentPage}
            />
            )
          )}
        </div>
        <div
          css={`
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
          `}>
          Total: {rows.length}
        </div>
      </div>
    </div>
  )
}

function ColumnHeader({ title, flex }) {
  return (
    <div
      css={`
        flex: ${flex};
      `}>
      <span
        css={`
          font-size: 12px;
          font-weight: bold;
          color: grey;
        `}>
        {title.toUpperCase()}
      </span>
    </div>
  )
}

function PageNumber({ pageNumber, onClick, selected }) {
  return (
    <button
      css={`
        background: ${selected ? '#FFFF': 'none'};
        cursor: pointer;
        outline: none;
        display: block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 2px solid #FFFF;
        margin: 10px;
      `}
      onClick={() => onClick(pageNumber)}>
      {pageNumber}
    </button>
  )
}