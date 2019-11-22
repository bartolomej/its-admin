import React from 'react';


export default function ({ options, value, onChange }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}>
      {options.map(o => <option value={o.value}>{o.name}</option>)}
    </select>
  )
}