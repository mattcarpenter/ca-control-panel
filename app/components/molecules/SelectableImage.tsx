import React from 'react';
import styles from '../organisms/AlbumArtGrid.css';
import Image from '../atoms/Image';

export default function SelectableImage({ src, onClick, selected, className, local = false }): JSX.Element {
  function handleClick() {
    (onClick || (() => {}))(src);
  }

  return (
    <div className={className}>
      <Image src={local ? `file://${src}` : src} onClick={handleClick} />
      {selected && <div className={styles.cellBorder} />}
    </div>
  );
}
