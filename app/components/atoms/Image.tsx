import React from 'react';

export default function Image({ src, onClick }): JSX.Element {
  function handleClick(event: any) {
    event.stopPropagation();
    (onClick || (() => {}))(src);
  }

  return (
    <img src={src} onClick={handleClick} alt="Image" />
  );
}
