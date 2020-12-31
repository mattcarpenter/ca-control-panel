import React from 'react';
import styles from '../organisms/AlbumArtGrid.css';
import Image from '../atoms/Image';

export default function SelectableImage({ src, onClick, selected, className, local = false }): JSX.Element {
  function handleClick() {
    (onClick || (() => {}))(src);
  }

  const style = selected ? styles.selected : null;

  return (
    <div className={className}>
      <Image
        src={local ? `file://${src}` : src}
        onClick={handleClick}
        className={style}
      />
    </div>
  );
}
