import React from 'react';

export default function Label({ text }): JSX.Element {
  return <div style={{ display: 'inline-block', border: 'solid 1px #000', padding: 20 }}>{text}</div>;
}
