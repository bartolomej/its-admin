import React, { useState } from 'react';
import 'styled-components/macro'
import Button from "./Button";
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {BarLoader} from "react-spinners";


export default function ({ columns, rows, title, styles, onAdd, isLoading }) {

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const nPages = rows.length / rowsPerPage;

  let records = rows.slice(
    (currentPage-1) * rowsPerPage,
    (currentPage-1) * rowsPerPage + rowsPerPage
  );
  let pageNumbers = new Array(Math.ceil(nPages))
    .fill(0)
    .map((ele, i) => i + 1)
    .slice(currentPage < 2 ? 0 : currentPage - 2, currentPage < 2 ? 2 : currentPage + 1);

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
          margin-bottom: 20px;
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
          ${isLoading ? `
            align-items: center;
            justify-content: center;
          ` : ''}
        `}>
        {isLoading && (
          <BarLoader
            sizeUnit={"px"}
            size={30}
            color={'#ef4c48'}
            loading={isLoading}
          />
        )}
        {!isLoading && columns.map(col => {
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
          <ColumnArrow
            onClick={() => setCurrentPage(
              currentPage > 1 ? currentPage-1 : 1
            )}
            direction={'left'}
          />
          {pageNumbers.map((n, index) => (
            <PageNumber
              pageNumber={n}
              onClick={n => setCurrentPage(n)}
              selected={n === currentPage}
            />
            )
          )}
          <ColumnArrow
            onClick={() => setCurrentPage(
              currentPage === nPages ? currentPage : currentPage+1
            )}
            direction={'right'}
          />
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

function ColumnArrow ({ direction, onClick }) {
  return (
    <button
      css={`
        background: 'red';
        cursor: pointer;
        outline: none;
        display: block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 2px solid #FFFF;
        margin: 10px;
      `}
      onClick={() => onClick()}>
      {direction === 'left' ?
        <FontAwesomeIcon icon={faArrowLeft} /> :
        <FontAwesomeIcon icon={faArrowRight} />
      }
    </button>
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