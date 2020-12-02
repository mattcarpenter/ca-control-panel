import React from 'react';
import { Input } from 'semantic-ui-react';

export default function DebouncingInput({ placeholder, onChange, onBlur, value }): JSX.Element {
  const handleChange = debounceEvent((value) => {
    onChange(value);
  }, 1);

  const handleBlur = debounceEvent(() => {
    (onBlur || (() => {}))();
  }, 2);

  return (
    <Input
      type="text"
      placeholder={placeholder}
      fluid
      onBlur={handleBlur}
      onChange={handleChange}
      value={value || ''}
    />
  );
}

function debounceEvent(callback, time: number, interval) {
  return (event: any) => {
    const {value} = event.target;
    clearTimeout(interval);
    interval = setTimeout(() => callback(value), time);
  };
}
