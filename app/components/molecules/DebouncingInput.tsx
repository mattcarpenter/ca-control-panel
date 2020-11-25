import React from 'react';
import { Input } from 'semantic-ui-react';

export default function DebouncingInput({ placeholder, onChange, onBlur }): JSX.Element {
  const handleChange = debounceEvent((value) => {
    onChange(value);
  }, 50);

  const handleBlur = debounceEvent(() => {
    (onBlur || (() => {}))();
  }, 51);

  return (
    <Input
      type="text"
      placeholder={placeholder}
      fluid
      onBlur={handleBlur}
      onChange={handleChange}
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
