import React, { useState } from 'react';
import "styled-components/macro"
import { Table, Popover, Whisper, Dropdown, Checkbox, Icon, IconButton, Divider, Panel } from 'rsuite';


const { Column, HeaderCell, Cell, Pagination } = Table;

export const NameCell = ({ rowData, dataKey, ...props }) => {
  let keys = Object.keys(rowData);
  const speaker = (
    <Popover title="Description">
      {
        keys.map( (k, index) => (
          <p key={index}>
            <b>{k.substring(0, 1).toUpperCase() + k.substring(1, k.length)}:</b> {rowData[k]}{' '}
          </p>
        ))
      }
    </Popover>
  );

  return (
    <Cell {...props}>
      <Whisper placement="top" speaker={speaker}>
        <a>{rowData[dataKey]}</a>
      </Whisper>
    </Cell>
  );
};

const ImageCell = ({ rowData, dataKey, ...props }) => (
  <Cell {...props} style={{ padding: 0 }}>
    <div
      style={{
        width: 40,
        height: 40,
        background: '#f5f5f5',
        borderRadius: 20,
        marginTop: 2,
        overflow: 'hidden',
        display: 'inline-block'
      }}
    >
      <img src={rowData[dataKey]} width="44"/>
    </div>
  </Cell>
);

const Menu = ({ onSelect }) => (
  <Dropdown.Menu onSelect={onSelect}>
    <Dropdown.Item eventKey={3}>Download As...</Dropdown.Item>
    <Dropdown.Item eventKey={4}>Export PDF</Dropdown.Item>
    <Dropdown.Item eventKey={5}>Export HTML</Dropdown.Item>
    <Dropdown.Item eventKey={6}>Settings</Dropdown.Item>
    <Dropdown.Item eventKey={7}>About</Dropdown.Item>
  </Dropdown.Menu>
);

const MenuPopover = ({ onSelect, ...rest }) => (
  <Popover {...rest} full>
    <Menu onSelect={onSelect}/>
  </Popover>
);

const CustomWhisper = ({...props}) => {
  const [trigger, setTrigger] = useState(null);
  return (
    <Whisper
      placement="autoVerticalStart"
      trigger="click"
      triggerRef={ref => setTrigger(ref)}
      container={() => tableBody}
      speaker={<MenuPopover onSelect={() => trigger.hide()}/>}
    >
      {props.children}
    </Whisper>
  );
};

const ActionCell = ({ onEdit, rowData, dataKey, ...props }) => {
  return (
    <Cell {...props} className="link-group">
      <IconButton
        appearance="subtle"
        onClick={() => onEdit(rowData)}
        icon={<Icon icon="edit2"/>}
      />
      <Divider vertical/>
      <CustomWhisper>
        <IconButton appearance="subtle" icon={<Icon icon="more"/>}/>
      </CustomWhisper>
    </Cell>
  );
};

let tableBody;
/**
 * @param data
 * @param columns = [{ type = email|text|image|action, title }]
 * @param height
 * @param isLoading
 * @param onRowClick
 * @param onAdd {function}
 * @param title
 * @param isLoading
 * @param onRowClick
 * @returns {Table}
 */
export default function ({ data, columns, height, isLoading, onRowClick, onAdd, title, style }) {
  return (
    <Panel
      css={style}
      header={
        <div css={`
          display: flex;
          justify-content: space-between;
        `}>
          <span>{title}</span>
          <button
            css={`
              background-color: transparent;
            `}
            onClick={onAdd}>ADD</button>
        </div>
      }
      bordered
      bodyFill
    >
      <Table
        loading={isLoading}
        virtualized
        height={height}
        data={data}
        id="table"
        onRowClick={onRowClick}
        bodyRef={ref => {
          tableBody = ref;
        }}
      >
        {
          columns.map((c, index) => {
            switch (c.type) {
              case 'email':
                return (
                  <Column key={index}  width={c.width}>
                    <HeaderCell>{c.title}</HeaderCell>
                    <Cell>
                      {rowData => (
                        <a href={`mailto:${rowData.email}`}>{rowData.email}</a>
                      )}
                    </Cell>
                  </Column>
                );
              case 'image':
                return (
                  <Column key={index} width={c.width} align="center">
                    <HeaderCell>{c.title}</HeaderCell>
                    <ImageCell dataKey={c.key}/>
                  </Column>
                );
              case 'text':
                return (
                  <Column key={index}  width={c.width}>
                    <HeaderCell>{c.title}</HeaderCell>
                    <NameCell dataKey={c.key}/>
                  </Column>
                );
              case 'action':
                return (
                  <Column key={index}  width={c.width}>
                    <HeaderCell>{c.title}</HeaderCell>
                    <ActionCell onEdit={c.onEdit} dataKey={c.key}/>
                  </Column>
                );
              default:
                throw new Error('Column type not matched!');
            }
          })
        }
      </Table>
    </Panel>
  );
}